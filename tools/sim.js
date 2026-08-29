/* Headless logic simulation of the VIDHI engine.
   jsdom/Chrome can't boot SugarCube 2.37 in this environment, so we load the
   engine module with a minimal shim and drive a full intended playthrough,
   asserting every Day-1 main objective completes and the day-end is reachable. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

/* ---- shims for the SugarCube globals the engine touches ---- */
Math.clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi);

const toasts = [];
const sandbox = {
  console,
  setTimeout: (fn) => 0,
  Math,
  Object, Array, String, Number, JSON, RegExp, parseInt, parseFloat, isNaN,
  jQuery: Object.assign(() => ({ append() {}, on() {}, addClass() {}, removeClass() {}, fadeOut() {} }), {}),
  $: Object.assign(() => ({ on() {}, append() {} }), {}),
  document: {},
  Config: { history: {}, passages: {}, saves: {}, ui: {} },
  Dialog: { setup() {}, wiki() {}, open() {}, close() {} },
  Engine: { play() {} },
  window: {},
};
sandbox.window = sandbox;
sandbox.State = { variables: {} };
vm.createContext(sandbox);

const engineSrc = fs.readFileSync(
  path.join(__dirname, "..", "game", "js", "game-engine.js"),
  "utf8"
);
vm.runInContext(engineSrc, sandbox, { filename: "game-engine.js" });
const setup = sandbox.setup;
const S = sandbox.State.variables;

/* ---- init (mirror StoryInit) ---- */
Object.assign(S, {
  pov: "arjun", day: 1,
  time: { arjun: 392, kavya: 330 },
  loc: { arjun: "katraj_pg_room", kavya: "hostel_room_304" },
  povUnlocked: { arjun: true, kavya: false },
  flags: {}, objectives: {}, sideDiscovered: [], firedEvents: [], eventQueue: [],
  inventory: { arjun: [], kavya: [] }, intimateSeen: [], swapCount: 0, swapActive: false, barrierIntegrity: 100,
  mood: { arjun: "melancholy", kavya: "guarded" },
  stats: {
    money_arjun: 500, money_kavya: 800,
    a_coding: 85, a_med: 5, a_femComfort: 0, a_energy: 60,
    k_coding: 70, k_med: 45, k_mascComfort: 0, k_energy: 55,
    rel_arjun_meera: 90, rel_arjun_rohit: 30, rel_arjun_raju: 0, rel_arjun_ananya: 0,
    rel_kavya_meera: 85, rel_kavya_priya: 5, rel_kavya_sneha: 3, rel_kavya_divya: 0, rel_kavya_messdidi: 0,
    trust_meera: 0, karma: 0, susp_priya: 0, susp_colonel: 0, susp_rohit: 0, susp_warden: 0,
  },
});
setup.refreshObjectives();

/* ---- scene effects: what each trigger passage sets when visited ----
   (derived from the .twee content; only the story-critical ones matter) */
const EFFECTS = {
  clothing_choice: () => setup.flag("morning_routine_complete"),
  arjun_self_explore: () => setup.flag("arjun_self_explored"),
  kavya_self_explore: () => setup.flag("kavya_self_explored"),
  "PH_arjun_gallery": () => setup.flag("phone_checked"),
  chai_scene: () => setup.flag("talked_to_raju"),
  raju_phone_sidequest: () => setup.flag("raju_phone_fixed"),
  vit_entry: () => setup.flag("entered_vit"),
  dbms_lecture_scene: () => setup.flag("dbms_lecture_done"),
  nikhil_notes_scene: () => setup.flag("nikhil_notes_obtained"),
  rohit_canteen_confrontation: () => setup.flag("rohit_confrontation_done"),
  rohit_cad_scene: () => { setup.flag("rohit_cad_fixed"); setup.flag("rohit_reveals_meera_sighting"); },
  panwala_interaction: () => { setup.flag("talked_to_panwala"); setup.addItem("panwala_packet"); },
  panwala_delivery_scene: () => setup.flag("panwala_delivery_done"),
  ananya_library_scene: () => { setup.flag("ananya_conversation_done"); setup.flag("ananya_has_bj_connection"); },
  stray_dog_scene: () => setup.flag("dog_fed"),
  laptop_night_dbms: () => setup.flag("dbms_assignment_submitted"),
  hostel_landline_call: () => setup.flag("meera_contact_attempted"),
  arjun_watches_hostel: () => setup.flag("meera_contact_attempted"),
  meera_call_attempt_sinhagad: () => setup.flag("meera_contact_attempted"),
  arjun_night_end: () => setup.flag("arjun_day1_complete"),

  kavya_shower_day1: () => setup.flag("kavya_morning_done"),
  hostel_sign_out: () => setup.flag("signed_out_hostel"),
  anatomy_dissection_scene: () => { setup.flag("in_dissection"); setup.flag("anatomy_lab_done"); },
  note_passing_anatomy: () => setup.flag("meera_note_read"),
  dr_sharma_quiz_scene: () => setup.flag("spot_quiz_aced"),
  sneha_room_visit: () => { setup.flag("talked_to_sneha"); setup.flag("sneha_helped"); setup.flag("surprise_test_info"); },
  dosage_build_scene: () => setup.flag("dosage_app_built"),
  find_redmi_phone: () => {},
  redmi_phone_menu: () => setup.flag("github_checked"),
  priya_status_check: () => { if (setup.clock() >= 780) setup.flag("priya_asks"); },
  priya_instagram_scene: () => setup.flag("priya_photos_taken"),
  manuscript_reveal_scene: () => { setup.flag("manuscript_revealed"); setup.flag("meera_shows_manuscript"); },
  priya_sleep_scene: () => { setup.advanceTime(1380 - setup.clock()); setup.flag("priya_asleep"); },
  test_swap_scene: () => { setup.doSwap(); setup.flag("test_swap_complete"); },
  mess_didi_scene: () => setup.flag("mess_stock_helped"),
  senior_divya_scene: () => setup.flag("divya_conversation_done"),
  samosa_vendor_npc: () => setup.flag("samosa_bought"),
  library_computer_coding: () => setup.flag("library_coding_done"),

  /* ---- Day 2 ---- */
  EV_a2_unknown_call: () => { setup.flag("arjun_morning_d2"); setup.flag("arjun_received_call"); },
  EV_a2_unknown_call_answer: () => setup.flag("arjun_received_call"),
  EV_a2_aai_call: () => setup.flag("sunday_decision_made"),
  EV_a2_callback: () => { setup.flag("arjun_briefed"); setup.flag("full_briefing_done"); },
  arjun_shower_d2: () => setup.flag("arjun_morning_d2"),
  os_lecture_d2: () => { setup.flag("os_lecture_done"); setup.flag("vit_day_survived_d2"); },
  nikhil_canteen_d2: () => { setup.flag("os_lecture_done"); setup.flag("icpc_agreed"); },
  arjun_set_alarm_d2: () => { setup.flag("alarm_set_4am"); prepCheck(); },
  arjun_wardrobe_d2: () => { setup.flag("arjun_outfit_chosen"); prepCheck(); },
  rohit_choice_d2: () => setup.flag("rohit_told_decision"),
  arjun_night_d2: () => setup.flag("arjun_day2_complete"),
  raju_followup_d2: () => setup.flag("raju_followup_done"),
  kulkarni_uncle_d2: () => { setup.flag("kulkarni_talked"); setup.flag("temple_info"); },
  gym_punching_d2: () => setup.flag("gym_workout_done"),
  temple_priest_d2: () => { setup.flag("visited_pataleshwar"); setup.flag("temple_scouted"); },
  crossword_d2: () => setup.flag("skiena_bought"),

  EV_a2_priya_class: () => setup.flag("priya_left_for_class"),
  EV_a2_priya_gossip: () => setup.flag("priya_has_gossip"),
  EV_a2_priya_common: () => setup.flag("priya_in_common_room"),
  meera_full_plan_d2: () => setup.flag("meera_plan_heard"),
  swap_rules_d2: () => setup.flag("swap_rules_established"),
  pharmacology_lecture_d2: () => { setup.flag("in_pharma_lecture"); setup.flag("college_survived_d2"); },
  mhatre_test_d2: () => setup.flag("surprise_test_passed"),
  sneha_pharma_d2: () => setup.flag("study_group_joined"),
  schedule_study_d2: () => setup.flag("schedule_memorized"),
  journal_d2: () => setup.flag("journal_decision"),
  chant_practice_d2: () => setup.flag("chant_practiced"),
  priya_gossip_d2: () => { setup.flag("priya_gossip_heard"); setup.flag("hostel_security_intel"); setup.flag("kitchen_gap_known"); },
  anjali_d2: () => { setup.flag("anjali_visited"); setup.flag("kitchen_route_detailed"); },
  last_coding_d2: () => setup.flag("last_kavya_coding"),
  kavya_calls_arjun_d2: () => { setup.flag("kavya_called_arjun"); setup.flag("full_briefing_done"); },
  kavya_body_catalogue_d2: () => setup.flag("kavya_day2_complete"),
};
function prepCheck() {
  if (S.flags.alarm_set_4am && S.flags.arjun_outfit_chosen) setup.flag("preparation_complete");
}

/* ---- generic action driver ---- */
function loc() { return setup.locations[S.pov][S.loc[S.pov]]; }
function step(desc, fn) {
  try { fn(); } catch (e) { fail(desc + "  -> THREW " + e.message); }
  log(desc + "   [" + S.pov + " " + setup.clockStr() + "]");
}
let failures = 0;
function log(m) { console.log("  " + m); }
function fail(m) { failures++; console.log("  ✗ " + m); }

function use(objId) {
  const L = loc();
  const o = (L.objects || []).find((x) => x.id === objId);
  if (!o) return fail("object '" + objId + "' not at " + S.loc[S.pov]);
  if (!setup.objVisible(o)) return fail("object '" + objId + "' not visible (cond: " + o.unlockCondition + " / " + setup.clockStr() + ")");
  if (!setup.objInWindow(o)) return fail("object '" + objId + "' outside time window " + o.timeWindow + " (now " + setup.clockStr() + ")");
  const r = setup.useObject(o);
  if (r === "block") return fail("object '" + objId + "' blocked");
  const tgt = setup.objTarget(o);
  if (EFFECTS[o.triggers]) EFFECTS[o.triggers]();
  else if (EFFECTS[tgt]) EFFECTS[tgt]();
  log("· " + objId + " -> " + o.triggers);
}
function go(toId) {
  const L = loc();
  const ex = (L.exits || []).concat(L.travelDestinations || []).find((x) => x.to === toId);
  const mins = ex ? (ex.travelTime || 2) : 3;
  const method = ex ? ex.method : undefined;
  const r = setup.travel(toId, mins, method);
  if (r === "block") return fail("travel to " + toId + " blocked");
  log("→ " + toId + "  [" + setup.clockStr() + "]");
}
function pov(p) { S.pov = p; setup.refreshWorld(); log("== switch POV -> " + p); }
function wait(untilMin) { if (setup.clock() < untilMin) setup.advanceTime(untilMin - setup.clock()); }
function drainEvents() { while (S.eventQueue.length) { const e = S.eventQueue.shift(); if (EFFECTS[e]) EFFECTS[e](); } }

function objDone(id) { return S.objectives[id] === "complete"; }
function assertObj(id) {
  if (objDone(id)) log("✓ objective " + id);
  else fail("objective NOT complete: " + id + "  (state=" + (S.objectives[id] || "locked") + ")");
}

/* ================= ARJUN PLAYTHROUGH ================= */
console.log("\n=== ARJUN   Day 1 ===");
use("phone"); use("meera_photos");           // phone_checked, gallery
use("mirror");
go("pg_bathroom"); use("shower"); use("toothbrush");
go("katraj_pg_room"); use("wardrobe");        // morning_routine_complete
go("pg_bathroom"); use("arjun_alone"); go("katraj_pg_room");  // a_sq_self
use("pulsar_keys");
assertObj("a_obj_wake");
go("pg_stairs"); go("tapri_chai");
use("chai_order");                            // talked_to_raju
use("raju_phone");                            // side quest
use("biscuit_jar");                           // biscuit (at tapri)
go("katraj_street"); use("panwala");          // packet
use("stray_dog");                             // dog_fed
wait(9 * 60);
go("vit_gate"); use("id_card");               // entered_vit
use("deliver_packet");                        // panwala_delivery_done
go("vit_cblock"); wait(10 * 60); use("classroom_door");  // dbms_lecture_done
use("nikhil_notes");
drainEvents();
go("vit_canteen"); use("rohit_table");        // rohit_confrontation_done
go("vit_gate"); go("vit_library"); use("ananya");
drainEvents();
go("vit_gate"); go("katraj_street"); go("katraj_pg_room");
use("rohit_cad");                             // rohit_reveals_meera_sighting
wait(19 * 60); use("dbms_work");              // dbms_assignment_submitted
wait(21 * 60); use("night_call");             // meera_contact_attempted
drainEvents();
use("end_day");                               // (choice) -> arjun_night_end
setup.flag("arjun_day1_complete");
["a_obj_wake","a_obj_vit","a_obj_rohit","a_obj_meera","a_obj_night"].forEach(assertObj);
(() => {
  const sleep = findObj("arjun", "katraj_pg_room", "sleep_next_day");
  if (!sleep) fail("sleep_next_day object missing");
  else if (!setup.objVisible(sleep)) fail("'Sleep   end the day' not visible after Arjun's mains are done");
  else log("✓ 'Sleep   end the day' available in Arjun's room");
})();
console.log("  side discovered:", S.sideDiscovered.join(", ") || "(none)");
console.log("  a_coding", S.stats.a_coding, "rel_rohit", S.stats.rel_arjun_rohit, "money", setup.money("arjun"));

/* ================= KAVYA PLAYTHROUGH ================= */
console.log("\n=== KAVYA   Day 1 ===");
pov("kavya");
if (!S.povUnlocked.kavya) fail("Kavya POV never unlocked");
use("under_mattress");                        // redmi
use("phone_redmi");                           // github_checked
use("meera_bed");
go("hostel_corridor"); go("hostel_bathroom");
use("period_check"); use("shower_stall");      // kavya_morning_done
use("kavya_alone");                            // k_sq_self
go("hostel_corridor"); use("sneha_door");     // talked_to_sneha + sneha_helped
go("hostel_room_304"); use("build_dosage");   // dosage_app_built
go("hostel_corridor"); go("hostel_stairs"); go("hostel_entrance"); use("sign_out_register"); // signed_out
go("bj_campus_path"); use("samosa_stall");    // samosa_bought
wait(9 * 60);
go("bj_anatomy_hall"); use("dissection_table"); // in_dissection, anatomy_lab_done
use("meera_table");                           // meera_note_read
use("sharma_quiz");                           // spot_quiz_aced
go("bj_campus_path"); go("bj_library"); wait(16 * 60); use("computer_section"); // library_coding_done
drainEvents();
go("bj_campus_path"); go("hostel_entrance"); go("hostel_stairs");
go("hostel_common_room"); wait(18 * 60); use("divya_sofa");
go("hostel_stairs"); wait(19 * 60); go("hostel_mess"); use("mess_didi_favor");
go("hostel_stairs"); go("hostel_corridor"); go("hostel_room_304");
use("priya_bed");                             // priya_asks (>=13:00)
use("priya_photo_req");                       // priya_photos_taken
wait(19 * 60 + 20); drainEvents();            // priya_out_jogging via event
use("manuscript_reveal_obj");                 // manuscript_revealed
wait(22 * 60 + 40);
use("wait_priya_sleep");                      // priya_asleep + time -> 23:00
use("test_swap_obj");                         // test_swap_complete
setup.flag("test_swap_complete");
["k_obj_morning","k_obj_anatomy","k_obj_note","k_obj_manuscript","k_obj_swap"].forEach(assertObj);
console.log("  side discovered:", S.sideDiscovered.join(", ") || "(none)");
console.log("  k_coding", S.stats.k_coding, "k_med", S.stats.k_med, "trust_meera", S.stats.trust_meera, "swaps", S.swapCount);

/* ================= DAY 2 ================= */
console.log("\n=== DAY 2   beginDay(2) ===");
setup.beginDay(2);
console.log("  day", S.day, "pov", S.pov, "arjun@", S.loc.arjun, setup.clockStr("arjun"), "| kavya@", S.loc.kavya, setup.fmtHM(S.time.kavya));

/* Day-1 finale objects must be hidden on Day 2 */
function findObj(pov, loc, id) { return (setup.locations[pov][loc].objects || []).find((o) => o.id === id); }
[["arjun", "katraj_pg_room", "end_day"], ["arjun", "vit_cblock", "classroom_door"],
 ["kavya", "hostel_room_304", "test_swap_obj"], ["kavya", "bj_anatomy_hall", "dissection_table"]
].forEach((r) => {
  const o = findObj(r[0], r[1], r[2]);
  if (!o) fail("Day-1 object " + r[2] + " vanished entirely");
  else { S.pov = r[0]; if (setup.objVisible(o)) fail("Day-1 object " + r[2] + " still visible on Day 2"); }
});
/* new Day 2 locations resolve */
["katraj_general_store", "katraj_gym", "pataleshwar_temple", "jm_road"].forEach((id) => {
  if (!setup.locations.arjun[id]) fail("Day 2 location missing: " + id);
});
["hostel_room_308", "bj_pharmacology_hall"].forEach((id) => {
  if (!setup.locations.kavya[id]) fail("Day 2 location missing: " + id);
});
console.log("  Day-1 finale objects hidden; Day 2 locations present.");

console.log("\n--- Arjun Day 2 ---");
pov("arjun");
go("pg_bathroom"); use("a2_shower");            // arjun_morning_d2
assertObj("a2_obj_morning");
wait(8 * 60 + 5); drainEvents();                // 08:00 morning call (Kavya + Meera)
assertObj("a2_obj_call");
use("a2_stress_pee");
go("katraj_pg_room"); use("a2_rohit_morning");
go("pg_stairs"); go("tapri_chai"); use("a2_raju_followup");
go("katraj_street"); go("katraj_general_store"); use("kulkarni_counter");
go("katraj_street"); go("katraj_gym"); use("gym_bag");
go("katraj_street");
wait(9 * 60 + 20);
go("vit_gate"); use("id_card");
go("vit_cblock"); wait(10 * 60); use("a2_os_class");   // vit_day_survived_d2
assertObj("a2_obj_vit");
go("vit_canteen"); use("a2_nikhil_icpc");        // icpc_agreed
drainEvents();
go("vit_gate"); go("katraj_street");
wait(16 * 60 + 30);
go("pataleshwar_temple"); use("temple_priest");  // visited_pataleshwar (afternoon recon)
go("jm_road"); use("jm_bookshop");               // skiena_bought
go("katraj_street"); go("katraj_pg_room");
wait(21 * 60 + 15); drainEvents();               // 21:15 callback -> arjun_briefed
use("a2_alarm"); use("a2_wardrobe");             // preparation_complete
assertObj("a2_obj_prep");
use("a2_rohit_choice");
wait(21 * 60 + 45);
use("a2_night");
setup.flag("arjun_day2_complete");
["a2_obj_morning","a2_obj_call","a2_obj_vit","a2_obj_prep","a2_obj_night"].forEach(assertObj);
console.log("  a_coding", S.stats.a_coding, "rel_kavya", S.stats.rel_arjun_kavya, "rel_rohit", S.stats.rel_arjun_rohit);

console.log("\n--- Kavya Day 2 ---");
pov("kavya");
wait(7 * 60 + 5); drainEvents();                 // 07:00 priya leaves
use("k2_meera_plan");                            // meera_plan_heard
assertObj("k2_obj_plan");
use("k2_rules");                                 // swap_rules_established
assertObj("k2_obj_rules");
use("k2_schedule"); use("k2_journal"); use("k2_period");
setup.flag("amma_called_back");                  // via PH_amma_chat_d2 "Call her"
go("hostel_corridor"); go("hostel_stairs"); go("hostel_entrance"); use("sign_out_register");
go("bj_campus_path"); go("bj_pharmacology_hall");
wait(9 * 60 + 30);
use("pharma_seat");                              // college_survived_d2
assertObj("k2_obj_college");
use("pharma_test"); use("pharma_sneha");         // surprise_test_passed, study_group_joined
go("bj_campus_path"); go("bj_library"); wait(15 * 60); use("k2_last_coding");
drainEvents();
go("bj_campus_path"); go("hostel_entrance"); go("hostel_stairs"); go("hostel_corridor"); go("hostel_room_304");
wait(18 * 60 + 30); drainEvents();               // priya returns w/ gossip
use("k2_priya_gossip");                          // hostel_security_intel
go("hostel_corridor"); go("hostel_room_308"); use("anjali_talk");
go("hostel_corridor"); go("hostel_room_304");
wait(19 * 60 + 30); use("k2_chant");
wait(20 * 60 + 15); drainEvents();               // priya to common room
use("k2_call_arjun");                            // kavya_called_arjun
assertObj("k2_obj_call");
wait(23 * 60 + 5);
use("k2_body_catalogue");                        // kavya_day2_complete
["k2_obj_plan","k2_obj_rules","k2_obj_college","k2_obj_call","k2_obj_body"].forEach(assertObj);
console.log("  k_coding", S.stats.k_coding, "k_med", S.stats.k_med, "rel_arjun", S.stats.rel_kavya_arjun);

function sideReport(who) {
  const side = setup.objectives[who].side.filter((o) => o.day === S.day);
  const done = side.filter((o) => S.objectives[o.id] === "complete").map((o) => o.id);
  const disc = side.filter((o) => S.sideDiscovered.includes(o.id)).map((o) => o.id);
  console.log("  " + who + " side quests: " + done.length + "/" + side.length + " complete  {" + done.join(", ") + "}");
  const stuck = disc.filter((id) => !done.includes(id));
  if (stuck.length) console.log("    discovered but not completed: " + stuck.join(", "));
}
console.log("\n--- side quest summary ---");
sideReport("arjun"); sideReport("kavya");

/* inventory is per-character and must not bleed across */
(() => {
  const a = S.inventory.arjun || [], k = S.inventory.kavya || [];
  console.log("  arjun bag: {" + a.join(", ") + "}");
  console.log("  kavya bag: {" + k.join(", ") + "}");
  if (!a.includes("bike_keys")) fail("Arjun should be carrying bike_keys");
  if (a.includes("redmi_phone")) fail("Arjun should NOT have Kavya's redmi_phone");
  if (!k.includes("redmi_phone")) fail("Kavya should be carrying redmi_phone");
  if (k.includes("bike_keys")) fail("Kavya should NOT have Arjun's bike_keys");
})();

/* ---- bedroom self-play + porn: every-day room actions, time-gated ---- */
(() => {
  const check = (pov, locId, id, t, cond) => {
    S.pov = pov; S.loc[pov] = locId; S.time[pov] = t;
    const o = findObj(pov, locId, id);
    if (!o) return fail("intimacy object missing: " + id);
    const vis = setup.objVisible(o) && setup.objInWindow(o);
    if (vis !== cond) fail(id + " visibility=" + vis + " expected " + cond + " at " + setup.clockStr(pov));
  };
  // Arjun: night after 23:00, morning before 07:00, hidden midday
  check("arjun", "katraj_pg_room", "a_bed_night", 23 * 60 + 20, true);
  check("arjun", "katraj_pg_room", "a_bed_night", 15 * 60, false);
  check("arjun", "katraj_pg_room", "a_bed_morning", 6 * 60 + 45, true);
  check("arjun", "katraj_pg_room", "a_porn_night", 23 * 60 + 20, true);
  // Kavya: same windows (06:00 morning cutoff) + needs the Redmi for porn
  check("kavya", "hostel_room_304", "k_bed_night", 23 * 60 + 10, true);
  check("kavya", "hostel_room_304", "k_bed_morning", 5 * 60 + 30, true);
  check("kavya", "hostel_room_304", "k_porn_morning", 5 * 60 + 30, true); // redmi in bag from playthrough

  // helpers resolve without throwing
  if (typeof setup.habit("arjun").self !== "number") fail("setup.habit() malformed");
  setup.stat("sex_f", 1, "arjun"); setup.stat("sex_m", 1, "kavya");
  if ((S.stats.a_sexF || 0) < 1) fail("sex_f stat did not resolve to a_sexF");
  if ((S.stats.k_sexM || 0) < 1) fail("sex_m stat did not resolve to k_sexM");
  console.log("  arjun intimPhase=" + setup.intimPhase("arjun") +
              " · kavya intimPhase=" + setup.intimPhase("kavya") +
              " · a_sexF=" + S.stats.a_sexF + " k_sexM=" + S.stats.k_sexM);
})();

console.log("\n" + (failures ? "✗ " + failures + " FAILURE(S)" : "✓ full critical path completes for both characters"));
process.exit(failures ? 1 : 0);
