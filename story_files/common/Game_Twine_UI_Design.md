# VIDHI   Twine SugarCube UI Design Document
## Modern Indian-Themed Game Interface

---

## DESIGN PHILOSOPHY

**Aesthetic:** Modern Indian Minimalism   clean contemporary UI with Indian cultural accents. Think Fabindia meets Apple: warm textures, brass/gold metallics, deep jewel tones, Devanagari typographic accents, paisley-inspired subtle patterns. NOT garish Bollywood. NOT bland Western. A design that feels like walking into a well-designed boutique hotel in Jaipur.

**Signature Element:** A living mandala motif that subtly rotates behind the main text panel   it pulses gently during swap scenes, fractures during crisis moments, and glows during intimacy scenes.

---

## COLOR PALETTE

```
/* === VIDHI   Indian Modern Palette === */

/* Primary */
--sb-saffron:        #E8792B;   /* Warm saffron   accent, CTAs, highlights */
--sb-deep-maroon:    #6B1D2A;   /* Deep wine/maroon   headers, emphasis */
--sb-temple-gold:    #C9A84C;   /* Brass/temple gold   borders, ornaments */

/* Backgrounds */
--sb-ivory:          #FAF6F0;   /* Warm ivory   main reading background */
--sb-parchment:      #F0E8DA;   /* Aged parchment   sidebar, secondary panels */
--sb-charcoal:       #1E1E24;   /* Deep charcoal   dark mode base */
--sb-night:          #12121A;   /* Near-black   dark mode deep */

/* Text */
--sb-ink:            #2A2A32;   /* Warm near-black   body text */
--sb-smoke:          #6B6B78;   /* Warm grey   secondary text */
--sb-whisper:        #9E9EAA;   /* Light grey   captions, metadata */

/* Character Colors */
--sb-arjun:          #3B82C4;   /* Steel blue   Arjun's scenes */
--sb-kavya:          #9B59B6;   /* Royal purple   Kavya's scenes */
--sb-meera:          #E74C6F;   /* Rose pink   Meera's scenes */
--sb-shared:         #C9A84C;   /* Gold   shared/triad scenes */

/* Status */
--sb-danger:         #DC3545;   /* Red   suspicion alerts, crises */
--sb-safe:           #28A745;   /* Green   safe, objectives complete */
--sb-warning:        #F0AD4E;   /* Amber   caution, near-miss */

/* Intimacy Level Colors */
--sb-intim-1:        #F0E8DA;   /* Parchment   awareness */
--sb-intim-2:        #E8C8A0;   /* Warm sand   tension */
--sb-intim-3:        #E8792B;   /* Saffron   heat */
--sb-intim-4:        #C0392B;   /* Deep red   passion */
--sb-intim-5:        #6B1D2A;   /* Maroon   full intensity */
```

---

## TYPOGRAPHY

```css
/* === FONTS === */

/* Display   Hindi/Devanagari accent headers */
@import url('https://fonts.googleapis.com/css2?family=Yatra+One&display=swap');

/* English Display   elegant serif for main headers */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

/* Body   clean readable sans */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Mono   for game stats, code references */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');

/* Accent   handwritten feel for journal entries, notes */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');

:root {
  --font-display-hindi: 'Yatra One', cursive;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-handwritten: 'Caveat', cursive;
}
```

**Type Scale:**
```css
/* Modular scale   1.25 ratio */
--text-xs:    0.694rem;   /* 11px   metadata, timestamps */
--text-sm:    0.833rem;   /* 13px   captions, sidebar labels */
--text-base:  1rem;       /* 16px   body text */
--text-lg:    1.125rem;   /* 18px   lead paragraphs */
--text-xl:    1.25rem;    /* 20px   section headers */
--text-2xl:   1.563rem;   /* 25px   passage titles */
--text-3xl:   1.953rem;   /* 31px   day headers */
--text-4xl:   2.441rem;   /* 39px   chapter/phase headers */
--text-hero:  3.052rem;   /* 49px   title screen */
```

---

## FULL CSS STYLESHEET

Paste this into your Twine SugarCube story's **Stylesheet** section:

```css
/* ============================================
   VIDHI   Complete SugarCube Stylesheet
   Modern Indian Theme
   ============================================ */

/* === IMPORTS === */
@import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Caveat:wght@400;600&display=swap');

/* === ROOT VARIABLES === */
:root {
  /* Colors */
  --saffron: #E8792B;
  --maroon: #6B1D2A;
  --gold: #C9A84C;
  --ivory: #FAF6F0;
  --parchment: #F0E8DA;
  --charcoal: #1E1E24;
  --night: #12121A;
  --ink: #2A2A32;
  --smoke: #6B6B78;
  --whisper: #9E9EAA;
  --arjun-blue: #3B82C4;
  --kavya-purple: #9B59B6;
  --meera-pink: #E74C6F;
  --triad-gold: #C9A84C;
  --danger: #DC3545;
  --safe: #28A745;
  --warning: #F0AD4E;

  /* Typography */
  --font-hindi: 'Yatra One', cursive;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-hand: 'Caveat', cursive;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(42,42,50,0.08);
  --shadow-md: 0 4px 12px rgba(42,42,50,0.1);
  --shadow-lg: 0 8px 30px rgba(42,42,50,0.12);
  --shadow-glow-saffron: 0 0 20px rgba(232,121,43,0.3);
  --shadow-glow-gold: 0 0 20px rgba(201,168,76,0.3);

  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration: 0.3s;
}


/* === RESET & BASE === */
html {
  box-sizing: border-box;
  scroll-behavior: smooth;
}

*, *::before, *::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink);
  background-color: var(--ivory);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}


/* === HIDE SUGARCUBE DEFAULTS === */
#ui-bar {
  display: none !important;
}

#ui-bar-toggle {
  display: none !important;
}

#story {
  margin: 0 !important;
  padding: 0 !important;
}


/* === MAIN LAYOUT   3 PANEL === */
#custom-ui {
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "header header header"
    "sidebar main stats";
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  #custom-ui {
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto auto auto;
    grid-template-areas:
      "header"
      "main"
      "stats"
      "sidebar";
  }
}

@media (max-width: 768px) {
  #custom-ui {
    grid-template-columns: 1fr;
  }
}


/* === TOP HEADER BAR === */
#sb-header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-lg);
  background: var(--charcoal);
  border-bottom: 2px solid var(--gold);
  z-index: 100;
  position: sticky;
  top: 0;
}

#sb-header .logo {
  font-family: var(--font-hindi);
  font-size: 1.5rem;
  color: var(--gold);
  letter-spacing: 0.02em;
  text-shadow: 0 0 10px rgba(201,168,76,0.3);
}

#sb-header .logo span.english {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--whisper);
  margin-left: var(--space-sm);
  font-style: italic;
  letter-spacing: 0.05em;
}

#sb-header .day-indicator {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--saffron);
  background: rgba(232,121,43,0.1);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  border: 1px solid rgba(232,121,43,0.3);
}

#sb-header .pov-toggle {
  display: flex;
  gap: 2px;
  background: rgba(255,255,255,0.05);
  border-radius: var(--radius-full);
  padding: 2px;
}

#sb-header .pov-toggle button {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 16px;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--duration) var(--ease-out);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

#sb-header .pov-toggle button.arjun {
  background: transparent;
  color: var(--arjun-blue);
}

#sb-header .pov-toggle button.arjun.active {
  background: var(--arjun-blue);
  color: white;
  box-shadow: 0 0 12px rgba(59,130,196,0.4);
}

#sb-header .pov-toggle button.kavya {
  background: transparent;
  color: var(--kavya-purple);
}

#sb-header .pov-toggle button.kavya.active {
  background: var(--kavya-purple);
  color: white;
  box-shadow: 0 0 12px rgba(155,89,182,0.4);
}


/* === LEFT SIDEBAR   NAVIGATION & OBJECTIVES === */
#sb-sidebar {
  grid-area: sidebar;
  background: var(--parchment);
  border-right: 1px solid rgba(201,168,76,0.2);
  padding: var(--space-lg);
  overflow-y: auto;
  max-height: calc(100vh - 60px);
  position: sticky;
  top: 60px;
}

#sb-sidebar h3 {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--maroon);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid var(--gold);
}

/* Objectives checklist */
.objective-list {
  list-style: none;
  margin-bottom: var(--space-xl);
}

.objective-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  padding: var(--space-sm) 0;
  font-size: 0.85rem;
  color: var(--ink);
  border-bottom: 1px solid rgba(0,0,0,0.04);
  line-height: 1.4;
}

.objective-list li .obj-check {
  width: 18px;
  height: 18px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--whisper);
  flex-shrink: 0;
  margin-top: 2px;
  transition: all var(--duration) var(--ease-out);
}

.objective-list li.complete .obj-check {
  background: var(--safe);
  border-color: var(--safe);
  position: relative;
}

.objective-list li.complete .obj-check::after {
  content: '✓';
  color: white;
  font-size: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.objective-list li.complete span {
  text-decoration: line-through;
  color: var(--smoke);
}

.objective-list li.bonus {
  color: var(--gold);
  font-style: italic;
}

.objective-list li.bonus .obj-check {
  border-color: var(--gold);
  border-style: dashed;
}

/* Scene navigation */
.scene-nav {
  list-style: none;
}

.scene-nav li {
  margin-bottom: 2px;
}

.scene-nav li a {
  display: block;
  padding: var(--space-sm) var(--space-md);
  font-size: 0.85rem;
  color: var(--smoke);
  text-decoration: none;
  border-radius: var(--radius-md);
  border-left: 3px solid transparent;
  transition: all var(--duration) var(--ease-out);
}

.scene-nav li a:hover {
  background: rgba(232,121,43,0.08);
  color: var(--ink);
  border-left-color: var(--saffron);
}

.scene-nav li a.active {
  background: rgba(232,121,43,0.1);
  color: var(--saffron);
  border-left-color: var(--saffron);
  font-weight: 600;
}

/* Mandala ornament */
.sidebar-mandala {
  width: 80px;
  height: 80px;
  margin: var(--space-xl) auto var(--space-md);
  opacity: 0.15;
  animation: spin-slow 60s linear infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}


/* === MAIN CONTENT AREA === */
#sb-main {
  grid-area: main;
  padding: var(--space-2xl) var(--space-2xl) var(--space-3xl);
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
}

/* Day header */
.day-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid rgba(201,168,76,0.3);
}

.day-header .day-number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--saffron);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--space-xs);
}

.day-header .day-title-hindi {
  font-family: var(--font-hindi);
  font-size: 2.4rem;
  color: var(--maroon);
  line-height: 1.2;
  margin-bottom: var(--space-xs);
}

.day-header .day-title-english {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--smoke);
  letter-spacing: 0.03em;
}

.day-header .swap-status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  padding: var(--space-xs) var(--space-md);
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gold);
}

.day-header .swap-status .swap-icon {
  font-size: 1rem;
}

/* Intimacy indicator dots */
.intimacy-indicator {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: var(--space-md);
}

.intimacy-indicator .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--parchment);
  border: 1px solid var(--whisper);
  transition: all var(--duration) var(--ease-out);
}

.intimacy-indicator .dot.filled {
  border-color: transparent;
}

.intimacy-indicator .dot.filled.l1 { background: #F0E8DA; border: 1px solid #C9A84C; }
.intimacy-indicator .dot.filled.l2 { background: #E8C8A0; }
.intimacy-indicator .dot.filled.l3 { background: #E8792B; }
.intimacy-indicator .dot.filled.l4 { background: #C0392B; }
.intimacy-indicator .dot.filled.l5 { background: #6B1D2A; }


/* === STORY PASSAGE TEXT === */
.passage {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--ink);
}

.passage p {
  margin-bottom: var(--space-lg);
  text-align: justify;
  hyphens: auto;
}

.passage p:first-of-type::first-letter {
  font-family: var(--font-display);
  font-size: 3.2rem;
  float: left;
  line-height: 0.8;
  margin-right: var(--space-sm);
  margin-top: var(--space-xs);
  color: var(--maroon);
}

/* Hindi/Hinglish dialogue */
.dialogue {
  font-style: italic;
  color: var(--maroon);
  position: relative;
  padding-left: var(--space-lg);
}

.dialogue::before {
  content: '❝';
  font-size: 1.5rem;
  color: var(--gold);
  position: absolute;
  left: 0;
  top: -4px;
}

/* Character name tags in dialogue */
.char-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  margin-right: var(--space-xs);
  vertical-align: middle;
}

.char-tag.arjun { background: rgba(59,130,196,0.12); color: var(--arjun-blue); }
.char-tag.kavya { background: rgba(155,89,182,0.12); color: var(--kavya-purple); }
.char-tag.meera { background: rgba(231,76,111,0.12); color: var(--meera-pink); }
.char-tag.priya { background: rgba(107,107,120,0.12); color: var(--smoke); }
.char-tag.rohit { background: rgba(40,167,69,0.12); color: var(--safe); }
.char-tag.colonel { background: rgba(220,53,69,0.12); color: var(--danger); }

/* Thought/internal monologue */
.thought {
  font-style: italic;
  color: var(--smoke);
  padding: var(--space-md) var(--space-lg);
  border-left: 3px solid;
  margin: var(--space-lg) 0;
  background: rgba(0,0,0,0.02);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.thought.arjun { border-left-color: var(--arjun-blue); }
.thought.kavya { border-left-color: var(--kavya-purple); }
.thought.meera { border-left-color: var(--meera-pink); }

/* Scene break */
.scene-break {
  text-align: center;
  margin: var(--space-2xl) 0;
  color: var(--gold);
  font-size: 1.2rem;
  letter-spacing: 0.5em;
  opacity: 0.6;
}

.scene-break::before {
  content: '⟡ ⟡ ⟡';
}

/* Sensory/body description */
.sensory {
  background: linear-gradient(135deg, rgba(232,121,43,0.05), rgba(107,29,42,0.05));
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(232,121,43,0.1);
  margin: var(--space-lg) 0;
  font-size: 0.95rem;
}

/* Swap transition effect */
.swap-transition {
  text-align: center;
  padding: var(--space-2xl) 0;
  margin: var(--space-xl) 0;
}

.swap-transition .swap-text {
  font-family: var(--font-hindi);
  font-size: 1.8rem;
  color: var(--gold);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { text-shadow: 0 0 5px rgba(201,168,76,0.3); opacity: 0.7; }
  50% { text-shadow: 0 0 25px rgba(201,168,76,0.6); opacity: 1; }
}

.swap-transition .swap-mandala {
  width: 60px;
  height: 60px;
  margin: var(--space-md) auto;
  animation: spin-fast 3s linear infinite;
  opacity: 0.5;
}

@keyframes spin-fast {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}


/* === CHOICE BUTTONS === */
.choices {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin: var(--space-2xl) 0;
  padding: var(--space-lg);
  background: rgba(201,168,76,0.05);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(201,168,76,0.15);
}

.choices .choice-label {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--smoke);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--space-xs);
}

.choices a.choice-btn,
.passage a.macro-link {
  display: block;
  padding: var(--space-md) var(--space-lg);
  background: white;
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--ink);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--duration) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.choices a.choice-btn:hover,
.passage a.macro-link:hover {
  border-color: var(--saffron);
  background: rgba(232,121,43,0.04);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.choices a.choice-btn:active {
  transform: translateY(0);
}

/* Choice with consequence preview */
.choices a.choice-btn .consequence {
  display: block;
  font-size: 0.75rem;
  color: var(--smoke);
  margin-top: var(--space-xs);
  font-style: italic;
}

.choices a.choice-btn .consequence .stat-change {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: var(--radius-sm);
  margin-left: var(--space-xs);
}

.stat-change.positive { background: rgba(40,167,69,0.1); color: var(--safe); }
.stat-change.negative { background: rgba(220,53,69,0.1); color: var(--danger); }


/* === RIGHT SIDEBAR   STATS PANEL === */
#sb-stats {
  grid-area: stats;
  background: var(--charcoal);
  color: #E0E0E0;
  padding: var(--space-lg);
  overflow-y: auto;
  max-height: calc(100vh - 60px);
  position: sticky;
  top: 60px;
  border-left: 1px solid rgba(201,168,76,0.15);
}

#sb-stats h3 {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: var(--space-md);
  margin-top: var(--space-xl);
}

#sb-stats h3:first-child {
  margin-top: 0;
}

/* Character mini portrait */
.char-portrait {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  padding: var(--space-sm);
  background: rgba(255,255,255,0.03);
  border-radius: var(--radius-md);
}

.char-portrait .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid;
  object-fit: cover;
}

.char-portrait .avatar.arjun { border-color: var(--arjun-blue); }
.char-portrait .avatar.kavya { border-color: var(--kavya-purple); }

.char-portrait .char-info {
  flex: 1;
}

.char-portrait .char-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
}

.char-portrait .char-body {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--whisper);
}

/* Stat bars */
.stat-bar {
  margin-bottom: var(--space-md);
}

.stat-bar .stat-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.stat-bar .stat-label span {
  font-size: 0.75rem;
  color: var(--whisper);
}

.stat-bar .stat-label .stat-value {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: white;
  font-weight: 600;
}

.stat-bar .bar {
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.stat-bar .bar .fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.8s var(--ease-out);
}

.stat-bar .bar .fill.blue { background: linear-gradient(90deg, var(--arjun-blue), #5BA0D9); }
.stat-bar .bar .fill.purple { background: linear-gradient(90deg, var(--kavya-purple), #B07CC8); }
.stat-bar .bar .fill.pink { background: linear-gradient(90deg, var(--meera-pink), #F06E8C); }
.stat-bar .bar .fill.gold { background: linear-gradient(90deg, var(--gold), #D9BE6C); }
.stat-bar .bar .fill.green { background: linear-gradient(90deg, var(--safe), #4AC76A); }
.stat-bar .bar .fill.red { background: linear-gradient(90deg, var(--danger), #E85A6A); }
.stat-bar .bar .fill.saffron { background: linear-gradient(90deg, var(--saffron), #F09050); }

/* Swap counter */
.swap-counter {
  text-align: center;
  margin: var(--space-xl) 0;
  padding: var(--space-lg);
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: var(--radius-lg);
}

.swap-counter .count {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 700;
  color: var(--gold);
}

.swap-counter .count-label {
  font-size: 0.7rem;
  color: var(--whisper);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.swap-counter .barrier-ring {
  width: 60px;
  height: 60px;
  margin: var(--space-sm) auto;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.1);
  position: relative;
}

.swap-counter .barrier-ring .barrier-fill {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 3px solid var(--gold);
  /* Use clip-path or conic-gradient for percentage */
}

/* Suspicion meters */
.suspicion-meter {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
  padding: var(--space-xs) var(--space-sm);
  background: rgba(255,255,255,0.02);
  border-radius: var(--radius-sm);
}

.suspicion-meter .sus-name {
  font-size: 0.75rem;
  color: var(--whisper);
  width: 60px;
  flex-shrink: 0;
}

.suspicion-meter .sus-bar {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.08);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.suspicion-meter .sus-bar .sus-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.5s var(--ease-out);
}

.suspicion-meter .sus-bar .sus-fill.low { background: var(--safe); }
.suspicion-meter .sus-bar .sus-fill.mid { background: var(--warning); }
.suspicion-meter .sus-bar .sus-fill.high { background: var(--danger); }

.suspicion-meter .sus-val {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--whisper);
  width: 30px;
  text-align: right;
}

/* Relationship web */
.rel-web {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.rel-web .rel-item {
  padding: var(--space-sm);
  background: rgba(255,255,255,0.03);
  border-radius: var(--radius-md);
  text-align: center;
}

.rel-web .rel-item .rel-pair {
  font-size: 0.65rem;
  color: var(--whisper);
  margin-bottom: 2px;
}

.rel-web .rel-item .rel-val {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
}

.rel-web .rel-item .rel-val.high { color: var(--meera-pink); }
.rel-web .rel-item .rel-val.mid { color: var(--gold); }
.rel-web .rel-item .rel-val.low { color: var(--whisper); }


/* === NOTIFICATION / ALERT POPUPS === */
.alert-popup {
  position: fixed;
  top: 80px;
  right: 20px;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  animation: slide-in 0.4s var(--ease-out);
  max-width: 320px;
}

@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.alert-popup.suspicion {
  background: #FFF3CD;
  border-left: 4px solid var(--warning);
  color: #856404;
}

.alert-popup.danger {
  background: #F8D7DA;
  border-left: 4px solid var(--danger);
  color: #721C24;
}

.alert-popup.objective {
  background: #D4EDDA;
  border-left: 4px solid var(--safe);
  color: #155724;
}

.alert-popup.swap {
  background: linear-gradient(135deg, rgba(59,130,196,0.1), rgba(155,89,182,0.1));
  border-left: 4px solid var(--gold);
  color: var(--ink);
}

.alert-popup .alert-icon {
  margin-right: var(--space-sm);
}


/* === FOOTER / NAVIGATION === */
.passage-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-3xl);
  padding-top: var(--space-xl);
  border-top: 1px solid rgba(201,168,76,0.2);
}

.passage-nav a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--saffron);
  text-decoration: none;
  border: 1px solid var(--saffron);
  border-radius: var(--radius-md);
  transition: all var(--duration) var(--ease-out);
}

.passage-nav a:hover {
  background: var(--saffron);
  color: white;
  box-shadow: var(--shadow-glow-saffron);
}

.passage-nav .next-btn {
  background: var(--saffron);
  color: white;
}

.passage-nav .next-btn:hover {
  background: #D06A20;
  box-shadow: var(--shadow-glow-saffron);
}


/* === TITLE SCREEN === */
.title-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--night);
  background-image:
    radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 50%, rgba(107,29,42,0.08) 0%, transparent 50%);
  text-align: center;
  padding: var(--space-3xl);
}

.title-screen .title-hindi {
  font-family: var(--font-hindi);
  font-size: 4rem;
  color: var(--gold);
  text-shadow: 0 0 40px rgba(201,168,76,0.3);
  margin-bottom: var(--space-xs);
  animation: title-glow 3s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% { text-shadow: 0 0 20px rgba(201,168,76,0.2); }
  50% { text-shadow: 0 0 50px rgba(201,168,76,0.5); }
}

.title-screen .title-english {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--whisper);
  letter-spacing: 0.15em;
  margin-bottom: var(--space-2xl);
}

.title-screen .subtitle {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--smoke);
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: var(--space-2xl);
}

.title-screen .start-btn {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  padding: var(--space-md) var(--space-2xl);
  background: transparent;
  border: 2px solid var(--gold);
  color: var(--gold);
  border-radius: var(--radius-full);
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all var(--duration) var(--ease-out);
}

.title-screen .start-btn:hover {
  background: var(--gold);
  color: var(--night);
  box-shadow: var(--shadow-glow-gold);
}

/* Character select */
.char-select {
  display: flex;
  gap: var(--space-xl);
  margin-top: var(--space-2xl);
}

.char-select .char-card {
  width: 200px;
  padding: var(--space-xl);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all 0.4s var(--ease-out);
  text-align: center;
}

.char-select .char-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.char-select .char-card.arjun:hover {
  border-color: var(--arjun-blue);
  box-shadow: 0 8px 30px rgba(59,130,196,0.2);
}

.char-select .char-card.kavya:hover {
  border-color: var(--kavya-purple);
  box-shadow: 0 8px 30px rgba(155,89,182,0.2);
}

.char-select .char-card .char-avatar-lg {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto var(--space-md);
  object-fit: cover;
}

.char-select .char-card .char-card-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: white;
  margin-bottom: var(--space-xs);
}

.char-select .char-card .char-card-desc {
  font-size: 0.75rem;
  color: var(--whisper);
  line-height: 1.4;
}


/* === POV-SPECIFIC BODY THEMES === */
body.pov-arjun {
  --current-accent: var(--arjun-blue);
}

body.pov-arjun .day-header .day-title-hindi {
  color: var(--arjun-blue);
}

body.pov-arjun #sb-header {
  border-bottom-color: var(--arjun-blue);
}

body.pov-kavya {
  --current-accent: var(--kavya-purple);
}

body.pov-kavya .day-header .day-title-hindi {
  color: var(--kavya-purple);
}

body.pov-kavya #sb-header {
  border-bottom-color: var(--kavya-purple);
}

body.pov-shared {
  --current-accent: var(--gold);
}


/* === INTIMATE SCENE WRAPPER === */
.intimate-scene {
  padding: var(--space-xl);
  margin: var(--space-xl) 0;
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

.intimate-scene::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  opacity: 0.03;
  pointer-events: none;
}

.intimate-scene.level-3 {
  background: rgba(232,121,43,0.03);
  border: 1px solid rgba(232,121,43,0.1);
}

.intimate-scene.level-4 {
  background: rgba(192,57,43,0.03);
  border: 1px solid rgba(192,57,43,0.1);
}

.intimate-scene.level-5 {
  background: rgba(107,29,42,0.04);
  border: 1px solid rgba(107,29,42,0.1);
}

.intimate-scene .content-gate {
  text-align: center;
  padding: var(--space-xl);
  color: var(--smoke);
  font-size: 0.85rem;
}

.intimate-scene .content-gate button {
  margin-top: var(--space-md);
  padding: var(--space-sm) var(--space-lg);
  background: transparent;
  border: 1px solid var(--smoke);
  color: var(--smoke);
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all var(--duration) var(--ease-out);
}

.intimate-scene .content-gate button:hover {
  border-color: var(--saffron);
  color: var(--saffron);
}


/* === SCROLLBAR STYLING === */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(201,168,76,0.3);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(201,168,76,0.5);
}


/* === PRINT / ACCESSIBILITY === */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
}

@media print {
  #sb-sidebar, #sb-stats, #sb-header {
    display: none;
  }
  #sb-main {
    max-width: 100%;
  }
}


/* === ORNAMENTAL PATTERNS === */

/* Paisley border accent   used on section dividers */
.paisley-border {
  height: 3px;
  background: repeating-linear-gradient(
    90deg,
    var(--gold) 0px,
    var(--gold) 8px,
    transparent 8px,
    transparent 12px,
    var(--saffron) 12px,
    var(--saffron) 20px,
    transparent 20px,
    transparent 24px
  );
  margin: var(--space-xl) 0;
  border-radius: var(--radius-full);
}

/* Rangoli corner ornament */
.rangoli-corner {
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='none' stroke='%23C9A84C' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='12' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Ccircle cx='20' cy='20' r='6' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cline x1='20' y1='2' x2='20' y2='38' stroke='%23C9A84C' stroke-width='0.3'/%3E%3Cline x1='2' y1='20' x2='38' y2='20' stroke='%23C9A84C' stroke-width='0.3'/%3E%3C/svg%3E");
}
```

---

## HTML STRUCTURE TEMPLATE

Add this to your **StoryInit** or use as a passage template:

```html
<!-- === HEADER === -->
<div id="sb-header">
  <div class="logo">
    शरीर बदल <span class="english">VIDHI</span>
  </div>
  <div class="day-indicator">Day <<print $currentDay>></div>
  <div class="pov-toggle">
    <button class="arjun <<if $currentPOV is 'arjun'>>active<</if>>"
            onclick="SugarCube.Engine.play('switchToArjun')">
      Arjun
    </button>
    <button class="kavya <<if $currentPOV is 'kavya'>>active<</if>>"
            onclick="SugarCube.Engine.play('switchToKavya')">
      Kavya
    </button>
  </div>
</div>

<!-- === LEFT SIDEBAR === -->
<div id="sb-sidebar">
  <h3>Objectives</h3>
  <ul class="objective-list">
    <<for _obj range $dayObjectives>>
      <li class="<<if _obj.complete>>complete<</if>> <<if _obj.bonus>>bonus<</if>>">
        <div class="obj-check"></div>
        <span><<print _obj.text>></span>
      </li>
    <</for>>
  </ul>

  <h3>Scenes</h3>
  <ul class="scene-nav">
    <li><a href="#" class="active">Morning   Hostel</a></li>
    <li><a href="#">Anatomy Lecture</a></li>
    <li><a href="#">Lunch with Meera</a></li>
    <li><a href="#">Night   Room 304</a></li>
  </ul>

  <img class="sidebar-mandala" src="mandala.svg" alt="">
</div>

<!-- === MAIN CONTENT === -->
<div id="sb-main">
  <div class="day-header">
    <div class="day-number">Day <<print $currentDay>></div>
    <div class="day-title-hindi">पहला बदलाव</div>
    <div class="day-title-english">First Change</div>
    <div class="swap-status">
      <span class="swap-icon">⟳</span>
      <<if $swapActive>>
        Arjun → Kavya's Body | Kavya → Arjun's Body
      <<else>>
        No Swap Active
      <</if>>
    </div>
    <div class="intimacy-indicator">
      <div class="dot filled l1"></div>
      <div class="dot filled l2"></div>
      <div class="dot filled l3"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>

  <!-- Story passage content renders here -->
  <div class="passage">
    <<include $currentPassage>>
  </div>

  <!-- Navigation -->
  <div class="passage-nav">
    <a href="#" class="prev-btn">← Previous Scene</a>
    <a href="#" class="next-btn">Next Scene →</a>
  </div>
</div>

<!-- === RIGHT SIDEBAR   STATS === -->
<div id="sb-stats">
  <!-- Current Character -->
  <div class="char-portrait">
    <img class="avatar arjun" src="arjun-avatar.png" alt="Arjun">
    <div class="char-info">
      <div class="char-name">Arjun Deshmukh</div>
      <div class="char-body">Currently in: <<print $arjunBody>>'s body</div>
    </div>
  </div>

  <!-- Swap Counter -->
  <div class="swap-counter">
    <div class="count"><<print $swapCount>></div>
    <div class="count-label">Swaps / 70</div>
    <div style="margin-top:8px;">
      <div class="count-label">Barrier: <<print $barrierIntegrity>>%</div>
    </div>
  </div>

  <!-- Comfort Stats -->
  <h3>Comfort</h3>
  <div class="stat-bar">
    <div class="stat-label">
      <span>Feminine Comfort</span>
      <span class="stat-value"><<print $arjun_femComfort>></span>
    </div>
    <div class="bar"><div class="fill purple" style="width:<<print $arjun_femComfort>>%"></div></div>
  </div>
  <div class="stat-bar">
    <div class="stat-label">
      <span>Masculine Comfort</span>
      <span class="stat-value"><<print $kavya_mascComfort>></span>
    </div>
    <div class="bar"><div class="fill blue" style="width:<<print $kavya_mascComfort>>%"></div></div>
  </div>

  <!-- Skills -->
  <h3>Skills</h3>
  <div class="stat-bar">
    <div class="stat-label">
      <span>Medical Knowledge</span>
      <span class="stat-value"><<print $arjun_medSkill>></span>
    </div>
    <div class="bar"><div class="fill saffron" style="width:<<print $arjun_medSkill>>%"></div></div>
  </div>
  <div class="stat-bar">
    <div class="stat-label">
      <span>CS Skill</span>
      <span class="stat-value"><<print $kavya_csSkill>></span>
    </div>
    <div class="bar"><div class="fill green" style="width:<<print $kavya_csSkill>>%"></div></div>
  </div>

  <!-- Relationships -->
  <h3>Relationships</h3>
  <div class="rel-web">
    <div class="rel-item">
      <div class="rel-pair">A ↔ M</div>
      <div class="rel-val high"><<print $rel_arjun_meera>></div>
    </div>
    <div class="rel-item">
      <div class="rel-pair">A ↔ K</div>
      <div class="rel-val mid"><<print $rel_arjun_kavya>></div>
    </div>
    <div class="rel-item">
      <div class="rel-pair">K ↔ M</div>
      <div class="rel-val high"><<print $rel_kavya_meera>></div>
    </div>
    <div class="rel-item">
      <div class="rel-pair">Triad</div>
      <div class="rel-val gold"><<print $rel_triad>></div>
    </div>
  </div>

  <!-- Suspicion -->
  <h3>Suspicion</h3>
  <div class="suspicion-meter">
    <span class="sus-name">Priya</span>
    <div class="sus-bar">
      <div class="sus-fill <<if $priya_suspicion lte 30>>low<<elseif $priya_suspicion lte 60>>mid<<else>>high<</if>>"
           style="width:<<print $priya_suspicion>>%"></div>
    </div>
    <span class="sus-val"><<print $priya_suspicion>></span>
  </div>
  <div class="suspicion-meter">
    <span class="sus-name">Colonel</span>
    <div class="sus-bar">
      <div class="sus-fill <<if $colonel_suspicion lte 30>>low<<elseif $colonel_suspicion lte 60>>mid<<else>>high<</if>>"
           style="width:<<print $colonel_suspicion>>%"></div>
    </div>
    <span class="sus-val"><<print $colonel_suspicion>></span>
  </div>
  <div class="suspicion-meter">
    <span class="sus-name">Rohit</span>
    <div class="sus-bar">
      <div class="sus-fill <<if $rohit_suspicion lte 30>>low<<elseif $rohit_suspicion lte 60>>mid<<else>>high<</if>>"
           style="width:<<print $rohit_suspicion>>%"></div>
    </div>
    <span class="sus-val"><<print $rohit_suspicion>></span>
  </div>
  <div class="suspicion-meter">
    <span class="sus-name">Warden</span>
    <div class="sus-bar">
      <div class="sus-fill <<if $warden_suspicion lte 30>>low<<elseif $warden_suspicion lte 60>>mid<<else>>high<</if>>"
           style="width:<<print $warden_suspicion>>%"></div>
    </div>
    <span class="sus-val"><<print $warden_suspicion>></span>
  </div>
</div>
```

---

## SUGARCUBE JAVASCRIPT (Story JavaScript section)

```javascript
/* ============================================
   VIDHI   SugarCube Game Logic
   ============================================ */

// === INITIALIZATION ===
Config.history.maxStates = 100;
Config.passages.nobr = true;

// Custom CSS class on body based on POV
$(document).on(':passagerender', function() {
  $('body')
    .removeClass('pov-arjun pov-kavya pov-shared')
    .addClass('pov-' + State.variables.currentPOV);
});

// === ALERT NOTIFICATION SYSTEM ===
window.showAlert = function(type, message) {
  var icons = {
    suspicion: '⚠️',
    danger: '🚨',
    objective: '✅',
    swap: '⟳'
  };

  var $alert = $('<div class="alert-popup ' + type + '">' +
    '<span class="alert-icon">' + (icons[type] || '📢') + '</span>' +
    message +
    '</div>');

  $('body').append($alert);
  setTimeout(function() {
    $alert.fadeOut(400, function() { $(this).remove(); });
  }, 3500);
};

// === STAT CHANGE DISPLAY ===
window.statChange = function(statName, amount) {
  var sign = amount > 0 ? '+' : '';
  var type = amount > 0 ? 'positive' : 'negative';
  showAlert('objective',
    statName + ' <span class="stat-change ' + type + '">' +
    sign + amount + '</span>'
  );
};

// === OBJECTIVE COMPLETION ===
window.completeObjective = function(objIndex) {
  var objs = State.variables.dayObjectives;
  if (objs[objIndex]) {
    objs[objIndex].complete = true;
    showAlert('objective', 'Objective Complete: ' + objs[objIndex].text);
  }
};

// === SWAP HANDLER ===
window.performSwap = function() {
  var sv = State.variables;
  sv.swapCount++;
  sv.swapActive = !sv.swapActive;

  if (sv.swapActive) {
    sv.arjunBody = 'kavya';
    sv.kavyaBody = 'arjun';
  } else {
    sv.arjunBody = 'arjun';
    sv.kavyaBody = 'kavya';
  }

  // Update barrier
  sv.barrierIntegrity = Math.max(0,
    Math.round(100 - (sv.swapCount / 70) * 100)
  );

  showAlert('swap',
    'Swap #' + sv.swapCount + '   Barrier: ' + sv.barrierIntegrity + '%'
  );

  // Random suspicion bump
  if (Math.random() < 0.15) {
    sv.priya_suspicion = Math.min(100, sv.priya_suspicion + Math.floor(Math.random() * 5));
    showAlert('suspicion', 'Priya noticed something...');
  }
};

// === SUSPICION CHECK ===
window.suspicionCheck = function(character, amount) {
  var sv = State.variables;
  var key = character + '_suspicion';
  if (sv[key] !== undefined) {
    sv[key] = Math.min(100, Math.max(0, sv[key] + amount));
    if (sv[key] >= 75) {
      showAlert('danger', character.charAt(0).toUpperCase() +
        character.slice(1) + ' is getting dangerously suspicious!');
    } else if (amount > 0) {
      showAlert('suspicion', character.charAt(0).toUpperCase() +
        character.slice(1) + "'s suspicion +" + amount);
    }
  }
};

// === COLONEL RANDOM VISIT EVENT ===
window.colonelVisitCheck = function() {
  var sv = State.variables;
  var chance = 0.05 + (sv.colonel_suspicion / 500);
  if (Math.random() < chance) {
    sv.colonel_suspicion += 10;
    return true; // Colonel is visiting!
  }
  return false;
};

// === INTIMACY LEVEL DISPLAY HELPER ===
Macro.add('intimacy', {
  handler: function() {
    var level = parseInt(this.args[0]) || 1;
    var html = '<div class="intimacy-indicator">';
    for (var i = 1; i <= 5; i++) {
      html += '<div class="dot' +
        (i <= level ? ' filled l' + i : '') +
        '"></div>';
    }
    html += '</div>';
    $(this.output).wiki(html);
  }
});

// === CHARACTER TAG MACRO ===
Macro.add('char', {
  handler: function() {
    var name = this.args[0] || 'unknown';
    var cssClass = name.toLowerCase();
    $(this.output).wiki(
      '<span class="char-tag ' + cssClass + '">' + name + '</span>'
    );
  }
});

// === THOUGHT MACRO ===
Macro.add('thought', {
  tags: null,
  handler: function() {
    var who = this.args[0] || 'arjun';
    var content = this.payload[0].contents;
    $(this.output).wiki(
      '<div class="thought ' + who + '">' + content + '</div>'
    );
  }
});

// === SCENE BREAK MACRO ===
Macro.add('scenebreak', {
  handler: function() {
    $(this.output).wiki('<div class="scene-break"></div>');
  }
});

// === DIALOGUE MACRO ===
Macro.add('dialogue', {
  tags: null,
  handler: function() {
    var content = this.payload[0].contents;
    $(this.output).wiki(
      '<div class="dialogue">' + content + '</div>'
    );
  }
});

// === SENSORY DESCRIPTION MACRO ===
Macro.add('sensory', {
  tags: null,
  handler: function() {
    var content = this.payload[0].contents;
    $(this.output).wiki(
      '<div class="sensory">' + content + '</div>'
    );
  }
});
```

---

## EXAMPLE PASSAGE   How It All Fits Together

```
:: Day3_ArjunTrack_Scene1 [day-3 arjun scene-1]

<div class="day-header">
  <div class="day-number">Day 3</div>
  <div class="day-title-hindi">पहला बदलाव</div>
  <div class="day-title-english">First Change</div>
  <div class="swap-status">
    <span class="swap-icon">⟳</span>
    Arjun → Kavya's Body
  </div>
  <<intimacy 2>>
</div>

He opens his eyes.

The world is different   lower, softer, filtered through lashes that are impossibly long. There's HAIR everywhere, dark waves falling past shoulders he doesn't recognize. His chest is heavy, weighted down by a presence he's only ever imagined from the outside.

<<sensory>>
Kavya's body is a symphony of unfamiliar sensations. The salwar kameez whispers against skin that is silk-smooth. The dupatta on the left shoulder is a phantom limb he keeps adjusting. And the bra   that engineering nightmare of hooks and straps   presses against ribs that are narrower, more delicate than his own.
<</sensory>>

<<char "Arjun">> <<dialogue>>"Oh fuck."<</dialogue>>

The words come out in Kavya's voice   husky, lower than expected for a woman, but unmistakably feminine. He clamps a hand over his mouth. Her mouth. HIS mouth now.

<<thought "arjun">>
These hands are so small. The fingers   delicate, tapered, nails filed into neat ovals. Yesterday these hands wrote Python. Today they tremble around a dupatta.
<</thought>>

<<scenebreak>>

The hostel corridor stretches ahead   painted pale green, fluorescent lights humming, the smell of Dettol and yesterday's dal lingering. A girl in a towel walks past.

<<char "Sneha">> <<dialogue>>"Good morning, Kavya! Anatomy ke notes de dena baad mein?"<</dialogue>>

He manages a nod. His voice   her voice   comes out steadier than his heart: "Haan, baad mein."

<div class="choices">
  <div class="choice-label">What do you do?</div>
  <<link "Head straight to Room 304   find Meera">>
    <<set $rel_arjun_meera += 5>>
    <<goto "Day3_ArjunTrack_Scene2_Meera">>
  <</link>>
  <<link "Go to the bathroom first   you REALLY need to pee">>
    <<set $arjun_femComfort += 3>>
    <<goto "Day3_ArjunTrack_Scene2_Bathroom">>
  <</link>>
  <<link "Explore Kavya's body in the mirror">>
    <<set $arjun_femComfort += 5>>
    <<set $priya_suspicion += 2>>
    <<goto "Day3_ArjunTrack_Scene2_Mirror">>
  <</link>>
</div>
```

---

## MANDALA SVG (Save as mandala.svg)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g fill="none" stroke="#C9A84C" stroke-width="0.5" opacity="0.6">
    <circle cx="100" cy="100" r="95"/>
    <circle cx="100" cy="100" r="75"/>
    <circle cx="100" cy="100" r="55"/>
    <circle cx="100" cy="100" r="35"/>
    <circle cx="100" cy="100" r="15"/>
    <!-- Radial lines -->
    <line x1="100" y1="5" x2="100" y2="195"/>
    <line x1="5" y1="100" x2="195" y2="100"/>
    <line x1="33" y1="33" x2="167" y2="167"/>
    <line x1="167" y1="33" x2="33" y2="167"/>
    <!-- Petal arcs -->
    <path d="M100,5 Q140,50 100,100"/>
    <path d="M100,5 Q60,50 100,100"/>
    <path d="M195,100 Q150,60 100,100"/>
    <path d="M195,100 Q150,140 100,100"/>
    <path d="M100,195 Q60,150 100,100"/>
    <path d="M100,195 Q140,150 100,100"/>
    <path d="M5,100 Q50,60 100,100"/>
    <path d="M5,100 Q50,140 100,100"/>
    <!-- Diagonal petals -->
    <path d="M33,33 Q80,45 100,100"/>
    <path d="M33,33 Q45,80 100,100"/>
    <path d="M167,33 Q120,45 100,100"/>
    <path d="M167,33 Q155,80 100,100"/>
    <path d="M167,167 Q120,155 100,100"/>
    <path d="M167,167 Q155,120 100,100"/>
    <path d="M33,167 Q80,155 100,100"/>
    <path d="M33,167 Q45,120 100,100"/>
    <!-- Inner lotus -->
    <ellipse cx="100" cy="70" rx="8" ry="25" transform="rotate(0,100,100)"/>
    <ellipse cx="100" cy="70" rx="8" ry="25" transform="rotate(45,100,100)"/>
    <ellipse cx="100" cy="70" rx="8" ry="25" transform="rotate(90,100,100)"/>
    <ellipse cx="100" cy="70" rx="8" ry="25" transform="rotate(135,100,100)"/>
    <ellipse cx="100" cy="70" rx="8" ry="25" transform="rotate(180,100,100)"/>
    <ellipse cx="100" cy="70" rx="8" ry="25" transform="rotate(225,100,100)"/>
    <ellipse cx="100" cy="70" rx="8" ry="25" transform="rotate(270,100,100)"/>
    <ellipse cx="100" cy="70" rx="8" ry="25" transform="rotate(315,100,100)"/>
  </g>
  <!-- Center dot -->
  <circle cx="100" cy="100" r="4" fill="#C9A84C" opacity="0.6"/>
</svg>
```

---

## FILE CHECKLIST

| File | Purpose |
|------|---------|
| `stylesheet.css` | Paste CSS above into Twine's Stylesheet |
| `script.js` | Paste JS above into Twine's Story JavaScript |
| `mandala.svg` | Save SVG above, reference in sidebar |
| Passage template | Use HTML structure in StoryInit or PassageHeader |
| Google Fonts | Auto-loaded via @import in CSS |

---
