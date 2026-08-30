# VIDHI   The Body Swap Chronicles

An objective-driven **open-world** Twine / SugarCube game. The player does **not**
pick a character up front   they wake up somewhere, get objectives, and must
explore locations, interact with objects, talk to NPCs and satisfy unlock
conditions to reach the next story beat. Scenes never auto-advance.

Two playable characters, **Arjun** (VIT, engineering) and **Kavya** (B.J. Medical),
run parallel threads on the same day. Kavya's perspective unlocks after Arjun's
morning routine; from then on the header toggle switches between them freely.
Day 1 ends with Kavya's body-swap ritual   the hinge the rest of the story turns on.

> **Adult content (18+).** Explicit sexual content, nudity and body description are
> part of the narrative and appear in context as you explore. A content warning
> gates the start of the game; there is no per-scene toggle.

---

## Build & run

Requires [Tweego](https://www.motoslave.net/tweego/) with the `sugarcube-2`
(2.37.x) story format.

```bash
./build.sh            # compiles game/ -> dist/index.html  (+ copies images)
open dist/index.html  # play in any modern browser (Chrome / Firefox / Safari)
```

`build.sh` honours `TWEEGO=/path/to/tweego` if it isn't at `~/tweego/tweego`.

### Checks

```bash
node tools/linkcheck.js game   # every [[link]] / <<goto>> / trigger resolves to a passage
node tools/sim.js              # drives a full playthrough of both characters'
                               # objective + side-quest graphs headlessly
```

`tools/smoketest.js` (jsdom) is included but **jsdom cannot boot SugarCube 2.37**
in this environment   use a real browser. `tools/sim.js` loads only the engine
module and is the reliable regression test for the progression logic.

### Desktop build (Electron)

`desktop/` is a self-contained Electron shell that wraps the compiled
`dist/`   it never touches the Twine sources.

```bash
./build.sh                 # produce dist/ first (it's what the app ships)
cd desktop && npm install
npm start                  # run the desktop app
npm run dist               # build installers -> desktop/release/
```

See [`desktop/README.md`](desktop/README.md) for targets, icons and notes.

---

## Structure

```
game/
  _story.twee              StoryData + StoryTitle
  boot.twee                StoryInterface (3-panel layout), StoryInit, Start,
                           ContentWarning, Intro, Hub, and the live UI panels
                           (UI_Header / UI_Sidebar / UI_Stats)
  css/game-styles.css      Modern-Indian theme, stat bars, phone dialog, toasts
  js/game-engine.js        the open-world engine   see below
  systems/
    widgets.twee           <<hubreturn>> <<th>> <<img>> <<flag>> <<adv>> ...
    phone.twee             PH_* chat passages (Day 1)
    phone_d2.twee          PH_*_d2 chat passages (Day 2)
    day_flow.twee          DayWrap (end-of-day routing)
    intimacy.twee          nightly / early-morning self-play + category-pick
                           porn scenes (repeatable, phase-branched by swap)
  days/day1/               "Qaid"   the manuscript, the test swap
    arjun_scenes.twee  arjun_npc.twee  kavya_scenes.twee  kavya_npc.twee
    intimate.twee  shared.twee   (EV_* events, Day1Complete, Day2Start launcher)
  days/day2/               "Saazish"   the plan, the phone calls, the night before
    arjun_scenes.twee  arjun_npc.twee  kavya_scenes.twee
    intimate.twee  shared.twee   (EV_a2_* events, Day2Complete, Day3Start stub)

images/                    OUTSIDE game/ so tweego never bundles it; build.sh
    mandala.svg            copies the tree to dist/images/
    README.md               which image file goes in which folder (full manifest)
    characters/ locations/ objects/ ui/    shared across every day
    scenes/day1/            day-specific story illustrations
                            `setup.imgDir` maps each filename → folder; a missing
                            file renders as a captioned placeholder frame

dist/index.html            compiled, playable
dist/images/               copied from ./images by build.sh
```

### Engine (`game/js/game-engine.js`)

Everything data-driven; adding content rarely means touching the engine.

| Piece | What it is |
|---|---|
| `setup.locations[pov][id]` | location registry: description, `objects` (each with `action`, `triggers`, optional `unlockCondition` / `timeWindow` / `cost` / `requires` / `item`), `exits`, `travelDestinations`, `available` window |
| `setup.objectives[pov]` | `main` + `side` objective lists with `unlockCondition`, `completionTrigger`, `reward`, and a `hint: { where, when, who, how }` shown by the sidebar's **i** button (state persisted in `localStorage`) |
| `setup.timedEvents` | `{time, character, event, passage}`   fire once when that character's clock passes `time`; queued and shown next time they return to the Hub |
| `setup.cond(expr, who)` | evaluates strings like `"rohit_confrontation_done AND time >= 18:00"`   atoms: `time >=/<= HH:MM`, `has_<item>`, `has_money >= N`, `is_weekend`, completed-objective ids, and otherwise a flag name |
| `setup.flag(name)` | set a story flag, then re-evaluate every objective |
| `setup.advanceTime(min)` | per-POV clock; also checks timed events + objectives |
| `setup.applyReward` / `setup.stat` | reward keys (`coding_skill`, `rel_rohit`, `priya_suspicion`, `money`, `intel`, `item`, …) resolved to concrete POV-namespaced `$stats` keys |
| `setup.travel(to, min, method)` | `method:"pulsar"` needs `bike_keys`; respects destination `unlockCondition`; VIT interiors need `entered_vit` |
| `setup.openPhone(which)` | `"arjun"` / `"samsung"` / `"redmi"` / `"gallery"`   SugarCube `Dialog` overlay, opened from the header or a room object |
| `setup.doSwap()` | swap bookkeeping   increments `$swapCount`, degrades `$barrierIntegrity` (paper-thin ~70) |

**Hub loop:** `:: Hub` reads `setup.here()` and renders the image, description,
NPCs present, one `<<link>>` per visible in-window object (→ its `triggers`
passage), and one per open exit / travel destination. Every scene passage ends
with `<<hubreturn>>` (or a `<<goto "Hub">>`) so control always returns to the
open world.

**State** lives in `$flags`, `$objectives`, `$loc`, `$time`, `$inventory`,
`$stats`, `$sideDiscovered`, `$swapCount`, `$body`, `$day`   a SugarCube save captures all of it.

The sidebar shows a **current-character portrait** above the objectives
(`images/characters/<name>_casual_profile_image.png`, overridable per POV via
`$profileImg[pov]`) with a "who   in whose body" line from `$body`.
`setup.beginDay(n)` advances `$day` and **wipes the previous day's objective
tracker**. Objectives are stamped `day: N`; the sidebar only shows the current day's.

**Ending a day:** once a character's *main* objectives for the day are all
complete (`mains_done` cond atom → `setup.dayMainsDone`), a **"Sleep   end the
day"** action appears in their room (`sleep_next_day` object → the `DayWrap`
passage). If *both* characters are done → the DayN-complete screen (which has the
"begin Day N+1" button). If only this one is done → a note to switch POV and
finish the other; the Sleep action stays put so you can come back any time. The
day-finale objects (`end_day`, `test_swap_obj`, `a2_night`…) hide once done
(`… AND not <char>_dayN_complete`), so the room never shows two "sleep" actions.

**Player guidance:**
- Every objective carries a `hint` (where / when / who / how) behind the sidebar's **i** toggle, plus a `lockNote` shown while it's still locked. All **main** objectives are always visible (locked ones dimmed with 🔒); side quests appear only once discovered.
- Room actions are colour-coded: **saffron** = advances the main story, **peacock** = a side quest (`setup._questTag` lists which object ids get which). The objective list uses the same two colours.
- Header **? Help** dialog explains the loop / clock / POV switching / a "typical day".
- Restful locations (room, home, canteen, library, terrace, benches   `setup._restLocs`, before 23:00) offer **Wait here   30 min** / **Rest · nap   1 hour** (`setup.passTime()`) so a player waiting on a time gate can skip ahead; the nap also restores a little energy.
- Header `‹ ›` = undo / redo a turn. Stats panel **Game** section = Save/Load (`UI.saves()`), Undo/Redo (`Engine.backward/forward()`), Restart (`UI.restart()`).
- Money changes toast as **"Earned +₹n"** (green) / **"Spent −₹n"** (amber).

### Hindi / Hinglish translations

Every Hindi or Hinglish dialogue line and the notable Hindi phrases in narration
carry an inline muted English gloss (`.gloss-en` in the stylesheet   grey, small,
under the line for dialogue/chat, a dash-prefixed continuation for narration).
Two helper widgets are available for new content:

```
<<dl "Cheeni se dil nahi bharta, beta." "Sugar doesn't fill the heart, son.">>
<<t  "haddi haddi" "skin and bone">>
```

Most existing lines gloss with a plain
`…line."<span class="gloss-en">translation</span></div>` inside the dialogue
block, which also handles lines that contain quote characters.

---

## Day-scoping (how Day 2 is bolted on)

Day 2 is an **additive module** at the end of `game-engine.js` (`(function day2(){…})()`):
it `Object.assign`s new locations, `.push()`es new objects/objectives/timed-events,
tags the Day-1 finale objects with `dayOnly: 1`, and wraps `setup.phoneData` for
Day-2 message lists. Day 1's data literals are untouched.

Mechanics that make it work:
- **`o.dayOnly`** on a location object → `setup.objVisible` hides it on other days.
- **`o.day`** on an objective (default 1) → `refreshObjectives` skips other days;
  the sidebar shows only the current day's.
- **`ev.day`** on a timed event; **`ev.setFlag`** to set a flag when it fires.
- **`day >= N`** is a valid `unlockCondition` atom (see `setup.atom`).
- **`setup.beginDay(n)`**   resets `$day`, wipes the objective tracker, clears
  daily-state flags (sign-out, VIT entry, Priya's whereabouts, morning-done…),
  and applies `setup.dayStart[n]` (pov / loc / time / mood). Called from the
  Day-1 and Day-2 end screens.

## Adding Day 3+

1. New scene passages in `days/day3/`, named exactly by their `triggers` value.
2. In the day2 module (or a new day3 module) add locations / objects (`dayOnly: 3`)
   / objectives (`day: 3`) / timed events (`day: 3`), and a `setup.dayStart[3]`.
3. `node tools/linkcheck.js game`, then `node tools/sim.js` (extend its `EFFECTS`
   map + walkthrough   it already covers Days 1–2).
