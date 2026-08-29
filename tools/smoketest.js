/* Boot VIDHI in jsdom and walk the opening path. */
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("/tmp/vtest/node_modules/jsdom");

const htmlPath = path.join(__dirname, "..", "dist", "index.html");
const html = fs.readFileSync(htmlPath, "utf8");

const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) => errors.push("jsdomError: " + (e.stack || e.message)));
vc.on("error", (m) => errors.push("console.error: " + m));

const dom = new JSDOM(html, {
  url: "https://vidhi.test/",
  runScripts: "dangerously",
  pretendToBeVisual: true,
  virtualConsole: vc,
  beforeParse(window) {
    window.alert = () => {};
    window.scrollTo = () => {};
    window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
  },
});
const { window } = dom;

window.addEventListener("error", (e) =>
  errors.push("window.error: " + (e.error && e.error.stack || e.message))
);
window.addEventListener("unhandledrejection", (e) =>
  errors.push("unhandledrejection: " + (e.reason && e.reason.stack || e.reason))
);

function passageText() {
  const p = window.document.querySelector("#passages");
  return p ? p.textContent.replace(/\s+/g, " ").trim() : "(no #passages)";
}
function links() {
  return [...window.document.querySelectorAll("#passages a, #passages .link-internal")].map(
    (a) => a.textContent.trim()
  );
}
function clickByText(re) {
  const a = [...window.document.querySelectorAll("#passages a")].find((x) =>
    re.test(x.textContent)
  );
  if (!a) throw new Error("no link matching " + re + "   have: " + JSON.stringify(links()));
  a.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  await wait(600);
  const SC = window.SugarCube;
  console.log("SugarCube present:", !!SC, "| State:", !!(SC && SC.State));
  if (SC && SC.State) console.log("start passage text:", passageText().slice(0, 120));

  const steps = [
    [/Continue/i, "Start -> ContentWarning"],
    [/I understand/i, "ContentWarning -> Intro"],
    [/Wake up/i, "Intro -> Hub"],
  ];
  for (const [re, label] of steps) {
    try {
      clickByText(re);
      await wait(250);
      console.log("OK  " + label + "  ::  " + passageText().slice(0, 90));
    } catch (e) {
      console.log("FAIL " + label + "  ::  " + e.message);
    }
  }

  console.log("\nHUB state:");
  console.log("  loc text  :", passageText().slice(0, 140));
  console.log("  actions   :", JSON.stringify(links()));
  console.log("  header    :", (window.document.querySelector("#vh-header") || {}).textContent);
  console.log("  sidebar   :", (window.document.querySelector("#vh-side") || {}).textContent?.replace(/\s+/g, " ").trim().slice(0, 160));
  console.log("  stats     :", (window.document.querySelector("#vh-stats") || {}).textContent?.replace(/\s+/g, " ").trim().slice(0, 120));

  // exercise: check phone
  try {
    window.setup.openPhone("arjun");
    await wait(150);
    const dlg = window.document.querySelector("#ui-dialog-body");
    console.log("  phone dlg :", dlg ? dlg.textContent.replace(/\s+/g, " ").trim().slice(0, 120) : "(none)");
  } catch (e) { console.log("  phone err :", e.message); }

  console.log("\nERRORS (" + errors.length + "):");
  errors.slice(0, 25).forEach((e) => console.log("  - " + String(e).split("\n")[0]));
  process.exit(errors.length ? 1 : 0);
})();
