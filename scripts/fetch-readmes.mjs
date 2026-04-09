import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseGitHubRepo(repoUrl) {
  if (!repoUrl) return null;

  try {
    const parsed = new URL(repoUrl);
    if (parsed.hostname !== "github.com") {
      return null;
    }

    const pathParts = parsed.pathname.split("/").filter(Boolean);
    if (pathParts.length < 2) {
      return null;
    }

    const owner = pathParts[0];
    const repo = pathParts[1].replace(/\.git$/, "");
    return { owner, repo };
  } catch {
    return null;
  }
}

async function fetchReadme(owner, repo) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    );

    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch README for ${owner}/${repo}`);
      return null;
    }

    const data = await response.json();
    if (typeof data.content === "string") {
      const binaryString = atob(data.content);
      const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    }

    return null;
  } catch (error) {
    console.warn(
      `⚠️  Error fetching README for ${owner}/${repo}:`,
      error.message,
    );
    return null;
  }
}

async function main() {
  try {
    const projectsPath = path.join(__dirname, "../src/data/projects.json");
    const projectsData = JSON.parse(await fs.readFile(projectsPath, "utf-8"));

    const readmesData = {};

    console.log("📖 Fetching READMEs from GitHub...");

    for (const project of projectsData) {
      if (!project.codeUrl) {
        console.log(`⏭️  Skipping ${project.title} (no codeUrl)`);
        continue;
      }

      console.log(`\nProcessing: ${project.title}`);
      console.log(`  codeUrl: ${project.codeUrl}`);

      const repoInfo = parseGitHubRepo(project.codeUrl);
      console.log(`  repoInfo: `, repoInfo);

      if (!repoInfo) {
        console.log(`⏭️  Skipping ${project.title} (invalid GitHub URL)`);
        continue;
      }

      const key = `${repoInfo.owner}/${repoInfo.repo}`;
      console.log(`📥 Fetching README for ${key}...`);

      const readme = await fetchReadme(repoInfo.owner, repoInfo.repo);
      if (readme) {
        readmesData[key] = readme;
        console.log(`✓ Successfully fetched ${key}`);
      } else {
        console.log(`✗ Failed to fetch ${key}`);
      }
    }

    const readmesPath = path.join(__dirname, "../src/data/readmes.json");
    await fs.writeFile(readmesPath, JSON.stringify(readmesData, null, 2));
    console.log(
      `\n✅ Saved ${Object.keys(readmesData).length} README files to ${readmesPath}`,
    );
  } catch (error) {
    console.error("❌ Error fetching READMEs:", error);
    process.exit(1);
  }
}

main();
