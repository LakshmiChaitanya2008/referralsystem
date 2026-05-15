import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const profilePath = resolve(dirname(fileURLToPath(import.meta.url)), "../src/pages/Profile.jsx");
let content = readFileSync(profilePath, "utf8");

const start = content.indexOf("function buildReferralTree(");
const end = content.indexOf("export default function Profile()");

if (start === -1 || end === -1) {
  console.log("Nothing to remove from Profile.jsx");
  process.exit(0);
}

content = content.slice(0, start) + content.slice(end);
writeFileSync(profilePath, content, "utf8");
console.log("Removed duplicate tree code from Profile.jsx");
