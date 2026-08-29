#!/usr/bin/env node
/* Crude passage/link checker for the VIDHI Twee source. */
const fs = require("fs");
const path = require("path");

const root = process.argv[2] || path.join(__dirname, "..", "game");

function walk(dir, ext, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, acc);
    else if (ext.some((x) => e.name.endsWith(x))) acc.push(p);
  }
  return acc;
}

const tweeFiles = walk(root, [".twee", ".tw"], []);
const jsFiles = walk(root, [".js"], []);

const passages = new Set();
const passageRe = /^::\s*([^\[\|\n]+?)\s*(\[[^\]]*\])?\s*$/gm;

for (const f of tweeFiles) {
  const src = fs.readFileSync(f, "utf8");
  let m;
  while ((m = passageRe.exec(src))) passages.add(m[1].trim());
}

const missing = [];
const seen = new Set();
function check(name, where) {
  name = name.trim();
  if (!name || name.startsWith("$") || name.startsWith("_")) return;
  if (passages.has(name)) return;
  const key = name + " @ " + where;
  if (seen.has(key)) return;
  seen.add(key);
  missing.push({ name, where });
}

for (const f of tweeFiles) {
  const src = fs.readFileSync(f, "utf8");
  const rel = path.relative(root, f);
  let m;
  const linkRe = /\[\[([^\]]+)\]\]/g;
  while ((m = linkRe.exec(src))) {
    let t = m[1];
    if (t.includes("|")) t = t.split("|").pop();
    else if (t.includes("->")) t = t.split("->").pop();
    else if (t.includes("<-")) t = t.split("<-")[0];
    check(t, rel);
  }
  const gotoRe = /<<(?:goto|display|include)\s+["']([^"']+)["']/g;
  while ((m = gotoRe.exec(src))) check(m[1], rel);
}

for (const f of jsFiles) {
  const src = fs.readFileSync(f, "utf8");
  const rel = path.relative(root, f);
  let m;
  const re = /(?:triggers|passage|passageName)\s*:\s*["']([^"']+)["']/g;
  while ((m = re.exec(src))) {
    // engine special-cases some triggers to "Hub"; skip known specials
    check(m[1], rel + " (data)");
  }
  const re2 = /(?:goto|Engine\.play)\(["']([^"']+)["']\)/g;
  while ((m = re2.exec(src))) check(m[1], rel);
}

const SPECIAL = new Set([
  "phone_menu","samsung_phone_menu","redmi_phone_menu","meera_gallery","grab_bike_keys",
  "buy_biscuit","vending_purchase","bike_travel_menu","auto_travel_menu","sassoon_auto_travel",
  "find_redmi_phone","bj_canteen_food","bj_canteen_chai","canteen_menu","mess_meal_scene",
  "stationery_shopping","hostel_sign_out"
]);

const realMissing = missing.filter((x) => !SPECIAL.has(x.name));

console.log(`\npassages defined: ${passages.size}`);
if (!realMissing.length) {
  console.log("link check: OK   no missing targets\n");
} else {
  console.log(`link check: ${realMissing.length} missing target(s):\n`);
  for (const x of realMissing) console.log(`  MISSING  ${x.name}   <-- ${x.where}`);
  console.log("");
  process.exitCode = 1;
}
