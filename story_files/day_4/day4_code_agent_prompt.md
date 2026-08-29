# DAY 4 — CODE AGENT PROMPT: Open World Integration
## "Aadat" (Habit) — Swap #2, Growing Comfort
## Objective-Driven Exploration in SWAPPED BODIES (Day 2 of swap)

---

## ARCHITECTURE NOTE — COMFORT CURVE

Day 4 represents the shift from SURVIVAL to ADAPTATION. Characters are still in swapped bodies but the raw terror of Day 3 has evolved into competence-building. The open world should reflect this — fewer panic triggers, more nuanced interactions, deeper NPC tests, and the first genuine intimate scenes.

**Gameplay feel shift:**
- Day 3: Every interaction = potential disaster
- Day 4: Routine interactions = manageable, but DEEPER tests emerge (Priya's period math, Rohit's gym observation, Aai's video call)

---

## FILE STRUCTURE — DAY 4

```
/game/days/day4/
├── day4_init.tw              # Day 4 variables, carry-forward from Day 3
├── day4_arjun_hub.tw         # Arjun-in-Kavya — hostel/B.J. Medical world
├── day4_arjun_scenes.tw      # Main story scenes
├── day4_arjun_npc.tw         # NPC interactions & side quests
├── day4_kavya_hub.tw         # Kavya-in-Arjun — PG/VIT/Katraj world
├── day4_kavya_scenes.tw      # Main story scenes
├── day4_kavya_npc.tw         # NPC interactions & side quests
├── day4_shared.tw            # Synced phone calls, shared events
└── day4_intimate.tw          # All intimate/sexual scenes

/game/systems/
├── ★ comfort_meter.tw        # Visual display of fem_comfort / masc_comfort
├── ★ skill_crossover.tw      # Tracks knowledge bleeding between domains
└── (existing systems)
```

---

## DAY 4 VARIABLE INITIALIZATION

```javascript
// day4_init.tw — Swap #2, comfort growing

<<set $swapCount to 2>>
<<set $swapActive to true>>

// COMFORT PROGRESSION — Arjun
<<set $arjun_bra_firsttry to false>>      // Achievable today
<<set $arjun_dupatta_natural to false>>    // Getting easier
<<set $arjun_pee_routine to false>>       // Less panic
<<set $arjun_shower_eyes_open to false>>  // Can look at the body now
<<set $arjun_period_excuse_used to false>>
<<set $arjun_period_excuse_caught to false>> // Priya's math
<<set $arjun_pharmacology_notes to false>>  // Coded pseudocode notes
<<set $arjun_kissed_meera_d4 to false>>
<<set $arjun_slept_with_meera to false>>   // Shared bed, not sex

// COMFORT PROGRESSION — Kavya
<<set $kavya_deodorant_mistake to false>>
<<set $kavya_gym_failed to false>>
<<set $kavya_masturbated_male to false>>   // FIRST male orgasm
<<set $kavya_video_call_survived to false>>
<<set $kavya_marathi_exposed to false>>
<<set $kavya_coding_hours to 0>>

// SUSPICION — Escalating
<<set $priya_period_math to false>>       // Period doesn't add up
<<set $rohit_gym_concern to 0>>
<<set $rohit_smell_noticed to false>>

// INTIMACY
<<set $meera_bed_shared to false>>
<<set $meera_kiss_d4 to false>>
<<set $meera_kiss_deepened to false>>
<<set $arjun_female_arousal_felt to false>>
<<set $kavya_male_orgasm_experienced to false>>
```

---

## LOCATION SYSTEM — DAY 4

### ARJUN (in Kavya's body) — Modifications & New

```javascript
const arjunInKavya_locations_day4 = {

  // All Day 3 hostel locations remain accessible
  // Arjun is MORE comfortable navigating them now

  "hostel_bathroom_d4": {
    modifications: {
      description_update: "Less terrifying today. You know the stall. You know the drill. Still weird, but survivable.",
      objects_modified: [
        { id: "toilet_stall", note: "Less panic. The routine is forming. Front to back. Wash hands (only 4 times today)." },
        { id: "shower_stall", note: "Eyes more open today. You're starting to SEE the body instead of avoiding it." }
      ]
    }
  },

  "bj_pharmacology_hall_d4": {
    name: "Pharmacology Lecture — Day 4",
    unlocked: true,
    available: "09:30-12:00",
    description: "Dr. Patwardhan on drug interactions. Surprisingly followable — it's basically if-then logic.",
    objects: [
      { id: "lecture_seat_d4", action: "Sit through lecture", triggers: "pharmacology_scene_d4" },
      { id: "pseudocode_notes", action: "Take notes in pseudocode format", triggers: "pseudocode_notes_scene" },
      { id: "meera_knee_contact", action: "Sit next to Meera", triggers: "knee_contact_scene", intimate: true },
      { id: "pass_note_meera", action: "Pass a note to Meera", triggers: "meera_note_exchange_d4" }
    ],
    npcs: ["dr_patwardhan", "meera", "sneha_302"],
    exits: [
      { to: "bj_campus_path", label: "Exit to campus" }
    ]
  },

  "hostel_room_304_night": {
    name: "Room 304 — Night Intimacy",
    unlocked: false,
    unlockCondition: "time >= 23:00 AND priya_asleep",
    available: "23:00-03:00",
    description: "Priya sleeps. The room darkens. Meera slips into your bed. Six months of waiting.",
    objects: [
      { id: "meera_comes_to_bed", action: "Welcome Meera", triggers: "meera_bed_scene",
        CRITICAL: true, intimate: true },
      { id: "pillow_talk", action: "Talk in whispers", triggers: "pillow_talk_scene" },
      { id: "kiss_meera_d4", action: "Kiss her", triggers: "meera_kiss_d4_scene",
        intimate: true, choice: true },
      { id: "hold_boundary", action: "Hold her and sleep", triggers: "holding_sleep_scene" }
    ],
    npcs: ["meera"],
    exits: [],
    note: "No exits — this is an enclosed intimate scene"
  },

  "bj_canteen_d4": {
    name: "B.J. Medical Canteen — Lunch",
    modifications: {
      objects_added: [
        { id: "sit_meera_hand", action: "Hold Meera's hand under table", triggers: "hidden_handhold",
          intimate: true }
      ]
    }
  },

  "hostel_common_room_d4": {
    name: "Common Room — Evening",
    modifications: {
      objects_added: [
        { id: "ankita_alone", action: "Talk to the first-year girl sitting alone", triggers: "ankita_side_quest",
          sidequest: true }
      ],
      npcs_added: ["ankita_firstyear"]
    }
  }
};
```

### KAVYA (in Arjun's body) — Modifications & New

```javascript
const kavyaInArjun_locations_day4 = {

  "katraj_pg_room_d4": {
    modifications: {
      objects_added: [
        { id: "axe_deodorant", action: "Use Rohit's Axe deodorant", triggers: "deodorant_correction",
          note: "Fix the smell mistake from this morning" },
        { id: "arjun_body_explore", action: "Lock door. Explore this body.", triggers: "kavya_body_exploration_d4",
          intimate: true, condition: "rohit_absent" },
        { id: "video_call_aai", action: "Answer Aai's video call", triggers: "aai_video_call_scene",
          CRITICAL: true, timed: "21:00" }
      ]
    }
  },

  "katraj_gym_d4": {
    name: "Iron Temple Gym — Chest Day Disaster",
    modifications: {
      description_update: "Rohit insists. Chest day. You've never lifted weights. This won't end well.",
      objects_added: [
        { id: "bench_press_d4", action: "Attempt bench press", triggers: "gym_disaster_scene" },
        { id: "arm_wrestle", action: "Challenge Rohit to arm wrestling", triggers: "arm_wrestling_recovery",
          sidequest: true, note: "Recovery option — raw strength vs. coordination" },
        { id: "punching_bag_d4", action: "Hit the bag instead", triggers: "bag_alternative",
          note: "Safer option — avoids bench press suspicion" }
      ]
    }
  },

  "vit_cs_lab_d4": {
    name: "CS Lab — ML Project Continuation",
    modifications: {
      objects_added: [
        { id: "ml_project_continue", action: "Continue the medical imaging project", triggers: "ml_coding_d4",
          CRITICAL: true },
        { id: "krishnan_office", action: "Visit Prof. Krishnan's office (if invited)", triggers: "krishnan_office_visit",
          unlockCondition: "research_symposium_invited" }
      ]
    }
  },

  "katraj_barbershop": {  // ★ NEW LOCATION
    name: "Katraj Barbershop — Ramesh Salon",
    unlocked: true,
    available: "08:00-21:00",
    description: "Four chairs, one barber, the smell of aftershave and small-town gossip.",
    objects: [
      { id: "shave", action: "Get a shave", triggers: "barbershop_shave_scene",
        note: "Safer than self-shaving. Barber does the work. Kavya just sits." },
      { id: "barber_talk", action: "Talk to Ramesh the barber", triggers: "barber_npc" }
    ],
    npcs: ["ramesh_barber"],
    exits: [
      { to: "katraj_street", label: "Back to street" }
    ]
  },

  "pune_fc_road": {  // ★ NEW LOCATION
    name: "FC Road — Fergusson College Road",
    unlocked: true,
    available: "08:00-23:00",
    description: "Student strip. Cafes, bookshops, street food, the pulse of young Pune.",
    objects: [
      { id: "cafe_sit", action: "Sit at a cafe", triggers: "fc_road_cafe_scene" },
      { id: "bookshop_tech", action: "Browse tech bookshop", triggers: "tech_bookshop" },
      { id: "street_food_fc", action: "Eat street food", triggers: "fc_road_food" },
      { id: "people_watch", action: "Sit and watch people", triggers: "fc_road_observation" }
    ],
    npcs: ["cafe_barista", "bookshop_owner", "random_college_students"],
    exits: [
      { to: "katraj_street", label: "Ride back to Katraj" },
      { to: "vit_gate", label: "Ride to VIT" }
    ],
    image: "fc_road.jpg"
  }
};
```

---

## OBJECTIVE SYSTEM — DAY 4

### ARJUN'S OBJECTIVES (in Kavya's body, Swap #2)

```javascript
const arjunObjectives_day4 = {
  main: [
    {
      id: "obj_morning_mastery",
      title: "Morning routine — level up",
      description: "Bra on first try. Dupatta without help. You're getting better at this.",
      status: "active",
      subObjectives: [
        { id: "sub_bra_solo", title: "Hook the bra solo", trigger: "arjun_bra_firsttry" },
        { id: "sub_outfit", title: "Dress without Meera's help", trigger: "arjun_dressed_solo" },
        { id: "sub_shower_d4", title: "Shower with eyes open", trigger: "arjun_shower_eyes_open" }
      ],
      unlocks: ["obj_deflect_priya"],
      reward: { fem_comfort: +5 }
    },
    {
      id: "obj_deflect_priya",
      title: "Handle Priya's questions",
      description: "She's asking about your mood. The period excuse. Her math might not add up.",
      status: "locked",
      unlockCondition: "morning_done",
      unlocks: ["obj_pharmacology"],
      suspicion_risk: true
    },
    {
      id: "obj_pharmacology",
      title: "Survive Pharmacology",
      description: "Drug interactions. If-then logic. Your CS brain can handle this.",
      status: "locked",
      unlockCondition: "breakfast_done",
      unlocks: ["obj_meera_day"],
      reward: { med_knowledge: +3 }
    },
    {
      id: "obj_meera_day",
      title: "Be with Meera",
      description: "Lunch. Notes. Knees touching under desks. She's HERE and you're HERE.",
      status: "locked",
      unlockCondition: "pharmacology_done",
      unlocks: ["obj_night_intimacy"],
      reward: { rel_meera: +5 }
    },
    {
      id: "obj_night_intimacy",
      title: "The night",
      description: "Priya sleeps. Meera comes to your bed. Six months of silence, finally broken.",
      status: "locked",
      unlockCondition: "time >= 23:00 AND priya_asleep",
      completionTrigger: "night_intimacy_complete",
      intimate: true,
      CRITICAL: true
    }
  ],

  side: [
    {
      id: "sq_ankita_firstyear",
      title: "Talk to Ankita",
      description: "First-year girl, alone in the common room. She looks lost.",
      location: "hostel_common_room_d4",
      reward: { fem_comfort: +2, rel_ankita: +3, future_intel_source: true }
    },
    {
      id: "sq_sneha_study_d4",
      title: "Sneha's Study Group Session",
      description: "Wednesday pharmacology group. You committed. Show up.",
      location: "bj_library",
      reward: { med_knowledge: +2, priya_suspicion: -2 }
    },
    {
      id: "sq_manuscript_study",
      title: "Study the Manuscript Further",
      description: "The organized notes from yesterday. The degradation warnings. Important.",
      location: "hostel_room_304",
      reward: { manuscript_understanding: +3 },
      unlockCondition: "meera_available AND priya_absent"
    },
    {
      id: "sq_hostel_laundry",
      title: "Do Kavya's Laundry",
      description: "Her clothes need washing. Including the bras. Yes, you have to hand-wash bras.",
      location: "hostel_bathroom",
      reward: { fem_comfort: +3, body_maintenance: +2 },
      note: "Comedic but establishes body-as-responsibility theme"
    },
    {
      id: "sq_terrace_sunset",
      title: "Watch sunset from terrace",
      description: "Alone. In a borrowed body. Looking at the city from a height you're not used to.",
      location: "hostel_terrace_d3",
      reward: { mood: +5, emotional_processing: +3 }
    },
    {
      id: "sq_call_kavya_checkin",
      title: "Check in with Kavya",
      description: "Call her on the Redmi. How's VIT? How's Rohit? How's your body?",
      location: "any (Redmi)",
      reward: { rel_kavya: +2 }
    }
  ]
};
```

### KAVYA'S OBJECTIVES (in Arjun's body, Swap #2)

```javascript
const kavyaObjectives_day4 = {
  main: [
    {
      id: "obj_fix_deodorant",
      title: "Fix the smell problem",
      description: "Rohit noticed you smell like Nivea. Spray his Axe. Be a boy.",
      status: "active",
      unlocks: ["obj_os_class_d4"],
      suspicion_risk: true
    },
    {
      id: "obj_os_class_d4",
      title: "OS class — absorb everything",
      description: "Process scheduling. This is your field. Don't shine TOO bright.",
      status: "locked",
      unlockCondition: "deodorant_fixed AND time >= 09:30",
      unlocks: ["obj_survive_gym"],
      reward: { coding_skill: +3 }
    },
    {
      id: "obj_survive_gym",
      title: "Survive the gym with Rohit",
      description: "Chest day. He insists. You've never bench pressed. This will be bad.",
      status: "locked",
      unlockCondition: "os_class_done AND rohit_insists",
      unlocks: ["obj_body_explore_d4"],
      suspicion_risk: true
    },
    {
      id: "obj_body_explore_d4",
      title: "Alone in Arjun's body",
      description: "Rohit's at FIFA night. The room is yours. The body is yours. Explore.",
      status: "locked",
      unlockCondition: "time >= 19:00 AND rohit_absent",
      unlocks: ["obj_aai_call"],
      intimate: true,
      CRITICAL: true
    },
    {
      id: "obj_aai_call",
      title: "Handle Aai's video call",
      description: "Arjun's mother. Video. She'll see his face. She'll hear his voice. Your accent is wrong.",
      status: "locked",
      unlockCondition: "time >= 21:00",
      completionTrigger: "aai_call_survived",
      suspicion_risk: true,
      CRITICAL: true
    }
  ],

  side: [
    {
      id: "sq_rohit_cad_d4",
      title: "Help Rohit's CAD Project",
      description: "His gear assembly is due tomorrow. Engineering logic is transferable.",
      location: "katraj_pg_room_d4",
      reward: { rel_rohit: +5, rohit_suspicion: -2 },
      risk: "rohit notices unusual CAD competence"
    },
    {
      id: "sq_arm_wrestle",
      title: "Arm Wrestling Recovery",
      description: "After the gym disaster, challenge Rohit. Raw strength should win.",
      location: "katraj_gym_d4",
      reward: { rohit_suspicion: -3, masc_comfort: +2 }
    },
    {
      id: "sq_barbershop",
      title: "Get a Shave",
      description: "The stubble is getting obvious. A barber is safer than DIY.",
      location: "katraj_barbershop",
      reward: { appearance: +3, masc_comfort: +2 }
    },
    {
      id: "sq_fc_road_explore",
      title: "Explore FC Road",
      description: "Pune's student strip. Cafes, books, freedom. Experience it as a boy.",
      location: "pune_fc_road",
      reward: { mood: +5, masc_comfort: +3 }
    },
    {
      id: "sq_krishnan_office",
      title: "Visit Krishnan's Office",
      description: "The research symposium invitation. Discuss possibilities. Be careful.",
      location: "vit_cs_lab_d4",
      reward: { coding_skill: +3, krishnan_rel: +5 },
      risk: "Creates ongoing academic commitment in Arjun's name"
    },
    {
      id: "sq_ml_project_d4",
      title: "Continue the ML Project",
      description: "The medical imaging classifier. Train the model. Evaluate. Document.",
      location: "katraj_pg_room_d4 OR vit_cs_lab_d4",
      reward: { coding_skill: +5 },
      unlockCondition: "laptop_available"
    },
    {
      id: "sq_nikhil_icpc_d4",
      title: "ICPC Practice Session #1",
      description: "Tuesday evening. Lab 3. 6-8 PM. Three problems. Don't obliterate Nikhil too badly.",
      location: "vit_cs_lab_d4",
      reward: { coding_skill: +5, nikhil_rel: +3 },
      unlockCondition: "icpc_partner_agreed AND day_is_tuesday"
    }
  ]
};
```

---

## INTIMATE SCENE PLACEMENT — DAY 4

```
DAY 4 INTIMATE SCENES — Comfort growing, first real sexual content

═══════════════════════════════════════════
ARJUN (in Kavya's body):
═══════════════════════════════════════════

1. SHOWER — EYES OPEN (Morning, hostel bathroom)
   - Trigger: Morning routine, shower
   - Content: Second shower in Kavya's body. Today he LOOKS.
     The bra comes off — three hooks, no help. Breasts free. He sees them
     in the mirror — dusky, heavy, nipples dark and responsive to cool air.
     Under the water: he washes them properly. The soap's slippery contact
     across the nipples sends a current through the body — the skin is so
     responsive. He washes between the legs — less panic, more awareness.
     The vulva under his fingertips — soft, warm, the folds of skin that
     are his to maintain now. He washes with care. Dries. The towel on
     breasts, on hips, between thighs. Familiarity growing.
   - Bra ON: first try. Three hooks. Second row. The cups receive the
     breasts. The wire settles. He tugs the band down. Adjusts cups.
     Done. Thirty seconds. He feels absurdly proud.
   - File: day4_intimate.tw → "arjun_shower_d4"

2. PHARMACOLOGY LECTURE — KNEE CONTACT (10 AM)
   - Trigger: Pharmacology scene, sitting next to Meera
   - Content: Their knees touch under the desk. The contact radiates — Kavya's
     body amplifies touch. The warmth from Meera's knee spreads through his
     thigh, into his pelvis, a slow heat that isn't sexual but IS sensual.
     The female body doesn't distinguish clearly between touch-as-comfort and
     touch-as-prelude. Everything is connected.
   - File: day4_intimate.tw → "meera_knee_contact"

3. LUNCH — HIDDEN HANDHOLD (12:30 PM)
   - Trigger: Mess hall, sitting with Meera
   - Content: Under the table, Meera's hand finds his. Fingers interlace.
     Her thumb traces circles on Kavya's palm. The sensation is — too much.
     Every circle is a love letter written on nerve endings. He almost sobs
     into the dal. Kavya's tear ducts on standby as always. The tears stay
     locked but barely.
   - First prolonged physical contact with Meera in six months.
   - File: day4_intimate.tw → "meera_handhold_mess"

4. NIGHT — BED WITH MEERA (11:15 PM) — CRITICAL
   - Trigger: priya_asleep, time >= 23:00
   - Content: FULL SCENE. Meera slips into Kavya's bed. Single bed, narrow.
     They face each other. Six inches apart. Amber streetlight.
     
     Talking first. Six months of stories. Whispered in Kavya's voice.
     His emptiness. Her captivity. The Colonel. The phone. The silence.
     Meera cries silently. He wipes tears with Kavya's thumb.
     
     The talking stops. The touching begins.
     
     He kisses her forehead. Her nose — the chicken pox scar. Then her lips.
     Kavya's lips against Meera's lips — soft on soft. Fuller. No stubble.
     The kiss is tender, tentative. Meera kisses back — she KNOWS this is
     Arjun. The wrongness (Kavya's mouth) and the rightness (Arjun's soul)
     collide. The rightness wins.
     
     The kiss deepens. Meera's hand on Kavya's waist — pulling closer.
     Legs tangling in the single bed. He feels Kavya's body responding:
     nipples hardening against the cotton t-shirt (no bra at night).
     Warmth between his legs — spreading, insistent. Wetness beginning.
     The clitoris pulsing — he feels it, a focused throb, the 8,000
     nerve endings activated by proximity and desire.
     
     Meera's hand on his hip. Meera's lips on his neck — Kavya's neck,
     the sensitive column of skin where jaw meets ear. The sensation
     cascades — goosebumps down Kavya's arm, nipples tightening further,
     the wetness increasing.
     
     He wants. Kavya's body WANTS — urgently, wetly, with a diffuse ache
     that has no off switch. But: Rule 1. No sexual activity without
     explicit permission.
     
     "Not yet," he whispers. "Kavya's rules."
     
     Meera nods. Breathing hard. Pupils blown. She understands.
     They rearrange — his small arms around her, her face in Kavya's hair.
     Two souls in the wrong arrangement falling asleep in the right embrace.
   - File: day4_intimate.tw → "meera_bed_night_d4"

═══════════════════════════════════════════
KAVYA (in Arjun's body):
═══════════════════════════════════════════

1. MORNING — DEODORANT MISTAKE (7:30 AM)
   - Trigger: Morning routine, Rohit notices smell
   - Content: Brief but critical. She used Nivea floral deodorant
     (habit from her body). Rohit sniffs — "Tu bahut fresh smell aa
     rahi hai." She panics, grabs Rohit's Axe can, sprays aggressively.
     Over-correction. Now she smells like Axe. Boy-acceptable.
   - Body note: Arjun's armpits produce more sweat than hers.
     The deodorant is necessary, not cosmetic.
   - File: day4_intimate.tw → "kavya_deodorant_fix"

2. GYM — BODY FAILURE (5 PM)
   - Trigger: Rohit insists on gym, bench press
   - Content: Bench press 40kg — Arjun's warmup weight. Kavya's neural
     pathways don't know this motion. First rep: wobble. Second: almost
     drops it. Rohit catches. The body HAS the strength (Arjun's muscles)
     but the mind doesn't have the coordination pattern.
     Arms on the bench: Arjun's arms, which she now feels intimately —
     the bicep engaging, the tricep firing, the chest muscles attempting
     to work. The body KNOWS this. She doesn't. The disconnect is visible.
   - Recovery option: arm wrestling. Raw grip strength doesn't need
     trained neural pathways — just squeeze. She wins. Rohit is pacified.
   - File: day4_intimate.tw → "kavya_gym_disaster"

3. BODY EXPLORATION — FIRST MALE MASTURBATION (7 PM) — CRITICAL
   - Trigger: rohit_absent (FIFA night), door locked
   - Content: FULL SCENE. Mirror. Shirt off. The lean torso. Trail of hair.
     She traces down. Hand into jeans, past boxers. The penis responds
     to touch — immediate thickening, the blood-fills-tissue sequence.
     She frees it. Arjun's cock in her hand. Studies it — the anatomy
     she knows from textbooks, now alive, warm, stiffening.
     
     First stroke. Base to tip. Foreskin retracts. The glans exposed —
     slick with precome. The sensation: CONCENTRATED. A single line of
     fire from base to tip. Nothing like the diffuse spread of her
     female arousal. This is SPECIFIC. DIRECTIONAL. DEMANDING.
     
     Faster strokes. The frenulum — the most sensitive spot. She finds
     the rhythm. Arjun's hips thrust involuntarily — the male body
     WANTS to fuck something, the reflex built into the hardware.
     She rides the thrust, hand moving, the pleasure building like
     voltage in a capacitor — linear, escalating, no plateau.
     
     Orgasm: SUDDEN. Like a circuit breaker tripping. The cock pulses —
     three ropes of cum arc onto Arjun's stomach. She gasps — "Ffuuuck" —
     a deep guttural sound she didn't know Arjun's voice could produce
     in that register. The pleasure peaks and DROPS. Zero to max to zero
     in maybe six seconds. Refractory period — the body is DONE.
     No afterglow. No lingering waves. System reboot.
     
     She lies in aftermath. Files the report: Male orgasm. More intense
     peak. Less layered. Faster. Efficient. Like a function that returns
     a value and terminates — no recursive after-process.
     
     "Efficient," she murmurs. Laughs at herself. Cleans up with tissues.
     Opens VS Code. Codes for three hours, mind crystalline.
     Interesting data.
   - File: day4_intimate.tw → "kavya_first_male_orgasm"

4. AAI VIDEO CALL (9 PM) — CRITICAL
   - Trigger: Timed event, 21:00
   - Content: Video call. Sunita's face. Marathi-Hindi. The ultimate test.
     Kavya manages Arjun's voice, the casual "Haan Aai" tone. Discusses
     food, homework. Pooja appears — asks about Python. Kavya gives
     genuine answers (Pooja's eyes light up). The Marathi phrase — "Aai,
     mala baryach homework aahe" — accent is off, too Tamil-precise.
     Sunita frowns slightly. Pooja catches it: "Dada, voice different."
     "Cold aa rahi hai." Crisis managed but just barely.
     
     Emotional: Sunita's love. Uncomplicated, unconditional, food-based.
     Kavya's parents call with expectations and assessments. Sunita calls
     to make sure her son ate. The contrast hits Kavya like a wave.
   - File: day4_intimate.tw → "kavya_aai_videocall"

5. POST-ORGASM CODING (7:30-10:30 PM)
   - Trigger: After masturbation, before Aai call
   - Content: Three hours of coding. The ML project grows — model training,
     evaluation metrics, documentation. Post-orgasm male clarity —
     the brain is FOCUSED, unclouded, every neuron dedicated to code.
     She's never experienced this specific mental state in her own body.
     Female post-orgasm: floating, warm, sleepy. Male post-orgasm:
     sharp, clear, operational. She uses every minute.
   - File: day4_intimate.tw → "kavya_post_orgasm_coding"
```

---

## NPC INTERACTION PLACEMENT — DAY 4

```
ARJUN-AS-KAVYA NPCs:

1. PRIYA — Breakfast (period excuse, suspicion +2 if math catches)
2. MEERA — Multiple (pharmacology, lunch, night)
3. DR. PATWARDHAN — NEW NPC, pharmacology prof, less threatening than Sharma
4. SNEHA — Study group if scheduled
5. ANKITA — NEW NPC, first-year lonely girl, potential ally
6. MESS DIDI — Food commentary
7. MRS. JOSHI — Routine rounds (lower tension than Day 3)
8. PRIYA — Evening (returns from jog, scans room)
9. KAVYA (phone) — Check-in call
10. HOSTEL GIRLS — Corridor, bathroom (routine encounters)

KAVYA-AS-ARJUN NPCs:

1. ROHIT — Multiple (morning deodorant, gym disaster, evening departure)
2. PG BOYS — Chai circle (routine performance)
3. PROF. DESAI — OS lecture
4. NIKHIL — Notes, ICPC discussion
5. RAMESH BARBER — NEW NPC, barbershop shave
6. CANTEEN ANNA — Food order (routine)
7. FC ROAD NPCs — NEW (cafe barista, bookshop owner, street food vendor)
8. AAI SUNITA — Video call (CRITICAL)
9. POOJA — Video call cameo + WhatsApp
10. ARJUN (phone) — Check-in call
11. RAJU BHAIYA — Tapri (Google engineer preview)
12. RANDOM VIT BOYS — Routine back-slaps
```

---

## STATS AT END OF DAY 4

### ARJUN — End of Day 4
```javascript
$arjun_stats_day4_end = {
  coding_skill: 88,
  med_knowledge: 11,        // +3 pharmacology (it's if-then!)
  fem_comfort: 25,          // +10 (bra mastery, routine forming)
  sex_exp_male: 15,
  sex_exp_female: 10,       // +5 (Meera kiss, arousal experienced)
  rel_meera: 100,           // capped — but deepening in quality
  rel_kavya: 42,            // +2 check-in call
  suspicion_priya: "variable",  // +2 from period math, potential +3
  mood: "settled_hopeful",
  energy: 35,
  bra_mastery: true,
  meera_kissed_in_kavya_body: true,
  meera_bed_shared: true,
  bodies_inhabited: ["self", "kavya x2"]
};
```

### KAVYA — End of Day 4
```javascript
$kavya_stats_day4_end = {
  coding_skill: 90,         // +5 from continued coding
  med_knowledge: 49,
  masc_comfort: 25,         // +10 (deodorant lesson, gym survival)
  sex_exp_female: 10,
  sex_exp_male: 20,         // +15 (FIRST male orgasm — big jump)
  rel_arjun: 48,            // +5 (Aai call empathy, body understanding)
  rel_meera: 90,
  suspicion_rohit: "variable",  // +5 gym, -3 arm wrestle possible
  mood: "data_rich_emotionally_complex",
  energy: 30,
  male_orgasm_experienced: true,
  coding_hours_d4: 3,
  aai_call_survived: true,
  pooja_flag: "voice_noticed"
};
```

---

## CHARACTER SWITCH POINTS — DAY 4

```
1. After morning routines (08:00)
2. After lectures (13:00)
3. After Kavya's gym disaster / Arjun's lunch with Meera (15:00)
4. Evening: Kavya's body exploration / Arjun's terrace sunset (19:00)
5. Night: Kavya's Aai call / Arjun's Meera intimacy (21:00-23:00)
   RECOMMENDED: Play BOTH night scenes — they're the emotional core
```
