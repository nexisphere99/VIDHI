# DAY 4 — CODE AGENT PROMPT (REVISED)
## "Doosri Chamdi" (Second Skin) — Swap #2, HALF DAY (5:30 AM – 5:30 PM)
## Temple Swap/Swap-Back Bookends

---

## CRITICAL STRUCTURE CHANGE

Day 4 is a HALF-DAY swap — NOT a full day. The day starts with both characters sneaking out to Pataleshwar Temple at dawn, swapping, living in each other's bodies for 12 hours, then returning to the temple at 5:30 PM to swap back.

```
04:30 AM — Arjun sneaks out of PG (Rohit sleeping)
04:45 AM — Kavya lies her way out of hostel ("temple pooja, seven days")
05:30 AM — SWAP at Pataleshwar Temple
05:30 AM – 5:30 PM — Swapped bodies (Arjun→hostel, Kavya→VIT)
05:30 PM — SWAP BACK at Pataleshwar Temple
06:00 PM — Both return to their own locations in own bodies
```

**Each character needs TWO bookend scenes:** sneaking out + temple swap AND temple swap-back + returning.

---

## FILE STRUCTURE — DAY 4 (REVISED)

```
/game/days/day4/
├── day4_init.tw              # Half-day swap variables
├── day4_temple_swap.tw       # Morning: sneak out + swap ritual (shared)
├── day4_arjun_hub.tw         # Arjun-in-Kavya: hostel (5:30 AM - 5:30 PM)
├── day4_arjun_scenes.tw      # Arjun main scenes (bra mastery, Meera intimacy)
├── day4_arjun_npc.tw         # NPC interactions (hostel world)
├── day4_kavya_hub.tw         # Kavya-in-Arjun: VIT/PG (5:30 AM - 5:30 PM)
├── day4_kavya_scenes.tw      # Kavya main scenes (CS, body catalog, arousal)
├── day4_kavya_npc.tw         # NPC interactions (PG/VIT world)
├── day4_temple_swapback.tw   # Evening: swap-back + debrief (shared)
└── day4_intimate.tw          # Intimate scenes (Meera cuddles, Kavya arousal)
```

---

## DAY 4 VARIABLES

```javascript
<<set $swapCount to 2>>
<<set $swapActive to true>>
<<set $swap_duration to "half_day">>    // 5:30 AM - 5:30 PM
<<set $arjun_snuck_out to false>>
<<set $kavya_pooja_excuse to false>>

// ARJUN progression
<<set $arjun_bra_solo_d4 to false>>     // First solo bra hookup
<<set $arjun_pee_routine_d4 to false>>  // Less panic
<<set $arjun_body_awareness_pee to false>>  // Notices labia sensitivity during wipe
<<set $arjun_meera_hold to false>>      // Extended holding scene
<<set $arjun_meera_near_kiss to false>> // Almost kisses
<<set $arjun_meera_breast_touch to false>> // Meera touches Kavya's breast area
<<set $arjun_crying_d4 to false>>       // Tears in Meera's arms

// KAVYA progression
<<set $kavya_pulsar_improved to false>>
<<set $kavya_body_catalog to false>>    // Non-genital body mapping
<<set $kavya_arousal_discovery to false>> // Random erection during coding
<<set $kavya_touched_hard_penis to false>> // Sees/touches erect penis
<<set $kavya_maggi_disaster to false>>   // Undercooked Maggi comedy

// SUSPICION
<<set $priya_phone_anomaly to false>>   // Kavya's morning habit missing
<<set $sneha_handwriting_notice to false>>
<<set $rohit_morning_absence to false>> // Did Rohit notice Arjun left?

// PERIOD AWARENESS
<<set $period_countdown to 6>>          // Days until Kavya's period
<<set $period_briefed to true>>         // Kavya warned Arjun
```

---

## LOCATION SYSTEM — DAY 4

### ARJUN'S LOCATIONS (Pre-swap: own body)

```javascript
const arjun_preSWAP_d4 = {
  "katraj_pg_room_predawn": {
    name: "PG Room — 4:30 AM, Sneaking Out",
    objects: [
      { id: "rohit_sleeping", action: "Check if Rohit is asleep", triggers: "rohit_sleep_check" },
      { id: "get_dressed_quiet", action: "Get dressed silently", triggers: "arjun_silent_dress" },
      { id: "grab_keys", action: "Take Pulsar keys quietly", triggers: "keys_stealth" },
      { id: "sneak_out", action: "Slip out the door", triggers: "arjun_sneak_scene", CRITICAL: true }
    ],
    note: "Arjun must exit without waking Rohit. Squeaky door. Creaky stairs."
  }
};
```

### KAVYA'S LOCATIONS (Pre-swap: own body)

```javascript
const kavya_preSWAP_d4 = {
  "hostel_room_304_predawn": {
    name: "Room 304 — 4:45 AM, The Excuse",
    objects: [
      { id: "meera_awake", action: "Signal Meera", triggers: "meera_signal" },
      { id: "priya_check", action: "Check Priya's status", triggers: "priya_sleeping_check" },
      { id: "prepare_excuse", action: "Prepare the pooja excuse", triggers: "pooja_excuse_prep" },
      { id: "sign_out_hostel", action: "Sign out at the gate", triggers: "kavya_hostel_exit",
        CRITICAL: true, note: "Tell chowkidar: 'Temple pooja, seven days, early morning'" }
    ]
  }
};
```

### ARJUN IN KAVYA'S BODY (5:30 AM - 5:30 PM)

```javascript
// Same hostel locations as Day 3, with these modifications:
const arjun_inKavya_d4 = {
  "hostel_room_304_d4": {
    modifications: {
      objects_added: [
        { id: "meera_alone_time", action: "Be with Meera (Priya at yoga)",
          triggers: "meera_intimate_d4", CRITICAL: true, intimate: true,
          timeWindow: "07:30-09:00 AND 14:00-17:00",
          note: "Extended holding, near-kiss, possible breast touch" },
        { id: "read_pharmacology", action: "Read Kavya's textbook",
          triggers: "pharmacology_reading", note: "Priya sees this — anomaly" }
      ]
    }
  },
  
  "hostel_bathroom_d4": {
    modifications: {
      objects_added: [
        { id: "second_pee", action: "Use the toilet (second time)",
          triggers: "arjun_pee_d4", intimate: true,
          note: "Less panic. Notices body awareness during wipe — labia sensitivity" }
      ]
    }
  }
};
```

### KAVYA IN ARJUN'S BODY (5:30 AM - 5:30 PM)

```javascript
const kavya_inArjun_d4 = {
  "katraj_pg_room_d4": {
    modifications: {
      objects_added: [
        { id: "make_maggi", action: "Attempt to make Maggi for Rohit",
          triggers: "maggi_disaster_comedy" },
        { id: "body_catalog", action: "Catalog Arjun's body (non-genital)",
          triggers: "kavya_body_catalog_d4", intimate: true,
          condition: "rohit_absent AND time >= 15:00" },
        { id: "erection_discovery", action: "Notice something happening...",
          triggers: "kavya_erection_scene_d4", intimate: true,
          condition: "during_coding OR random",
          note: "Random erection during coding or body catalog. She sees it, touches it briefly." }
      ]
    }
  }
};
```

---

## OBJECTIVE SYSTEM — DAY 4

### ARJUN

```javascript
const arjunObjectives_day4 = {
  main: [
    {
      id: "obj_sneak_out",
      title: "Sneak out of the PG",
      description: "4:30 AM. Rohit snores. The door squeaks. Don't wake him.",
      status: "active",
      unlocks: ["obj_temple_swap_d4"]
    },
    {
      id: "obj_temple_swap_d4",
      title: "Swap at the temple",
      description: "5:30 AM. Pataleshwar. Become Kavya again.",
      status: "locked",
      unlockCondition: "snuck_out AND at_temple",
      unlocks: ["obj_bra_mastery"]
    },
    {
      id: "obj_bra_mastery",
      title: "Bra on first try — solo",
      description: "Yesterday took four minutes and help. Today: do it yourself.",
      status: "locked",
      unlockCondition: "swap_complete",
      reward: { fem_comfort: +5 }
    },
    {
      id: "obj_survive_anatomy_d4",
      title: "Anatomy lecture — 40% comprehension target",
      description: "Meera is your lifeline. Copy her. Don't die of formalin.",
      status: "locked",
      unlockCondition: "morning_routine_done",
      reward: { med_knowledge: +2 }
    },
    {
      id: "obj_meera_time",
      title: "Afternoon with Meera",
      description: "Priya at library. The room is yours. Two hours. Six months of wanting.",
      status: "locked",
      unlockCondition: "anatomy_done AND priya_absent AND time >= 14:00",
      intimate: true,
      CRITICAL: true
    },
    {
      id: "obj_swapback_d4",
      title: "Get to the temple for swap-back",
      description: "5:30 PM. Pataleshwar. Return what you've borrowed.",
      status: "locked",
      unlockCondition: "time >= 17:00"
    }
  ],

  side: [
    {
      id: "sq_manuscript_organize",
      title: "Help Meera organize the manuscript",
      description: "Sanskrit notes + CS brain = structured documentation.",
      reward: { manuscript_understanding: +5, rel_meera: +3 }
    },
    {
      id: "sq_priya_phone_cover",
      title: "Cover the missing phone habit",
      description: "Priya noticed you're reading a textbook instead of coding on the Redmi. Fix this.",
      reward: { priya_suspicion: -1 }
    },
    {
      id: "sq_sneha_notes",
      title: "Manage the handwriting problem",
      description: "Sneha noticed your writing changed. Be more careful.",
      reward: { sneha_suspicion: -1 }
    }
  ]
};
```

### KAVYA

```javascript
const kavyaObjectives_day4 = {
  main: [
    {
      id: "obj_hostel_excuse",
      title: "Get out of the hostel",
      description: "Tell the chowkidar: temple pooja, seven days, early morning. Make it stick.",
      status: "active",
      unlocks: ["obj_temple_swap_k_d4"]
    },
    {
      id: "obj_temple_swap_k_d4",
      title: "Swap at the temple",
      description: "5:30 AM. Become Arjun. Take his keys. Take his life.",
      status: "locked",
      unlockCondition: "hostel_exited AND at_temple"
    },
    {
      id: "obj_pulsar_improvement",
      title: "Ride the Pulsar — day 2",
      description: "Better today. Clutch is becoming intuitive. Enjoy the wind.",
      status: "locked",
      unlockCondition: "swap_complete",
      reward: { masc_comfort: +3 }
    },
    {
      id: "obj_cs_class_d4",
      title: "Data Structures — Red-Black Trees",
      description: "Krishnan. RB-tree insertion. Restrain yourself. ONE answer only.",
      status: "locked",
      unlockCondition: "ride_done AND time >= 09:30",
      reward: { coding_skill: +3 }
    },
    {
      id: "obj_body_catalog",
      title: "Catalog Arjun's body (non-genital)",
      description: "Rohit at lab. Map the architecture. Shoulders to hips. No waistband today.",
      status: "locked",
      unlockCondition: "rohit_absent AND time >= 15:00",
      intimate: true
    },
    {
      id: "obj_swapback_k_d4",
      title: "Return to the temple",
      description: "5:30 PM. Give the body back. Keep the memories.",
      status: "locked",
      unlockCondition: "time >= 17:00"
    }
  ],

  side: [
    {
      id: "sq_raju_supplier",
      title: "Help Raju find a tea supplier",
      description: "His regular supplier hasn't delivered. Use the phone to research.",
      reward: { raju_rel: +5 }
    },
    {
      id: "sq_krishnan_bonus",
      title: "Solve the RB-tree bonus problem",
      description: "Edge case in deletion. Include ONE deliberate mistake.",
      reward: { coding_skill: +5 },
      risk: "krishnan_suspicion +5 if too perfect"
    },
    {
      id: "sq_maggi_comedy",
      title: "Make Maggi for Rohit",
      description: "You've never cooked. He asked. How hard can noodles be?",
      reward: { rohit_rel: +2, comedy: +10 }
    }
  ]
};
```

---

## INTIMATE SCENE PLACEMENT — DAY 4

```
═══════════════════════════════════════════
ARJUN (in Kavya's body):
═══════════════════════════════════════════

1. SNEAKING OUT (4:30 AM, own body, PG room)
   - Content: Dark room. Rohit face-down, snoring. Arjun dresses silently —
     jeans, t-shirt, shoes in hand (put on outside). The door SQUEAKS —
     he freezes. Rohit mumbles "bhai... Maggi..." but doesn't wake.
     Down the stairs, shoes on at the gate. Pulsar started fifty meters
     from the PG so the engine noise doesn't carry. Heart pounding.

2. BRA MASTERY (6:15 AM, hostel bathroom)
   - Wraps around waist, hooks in FRONT (Meera's trick). Rotate and pull up.
     First try. Twenty seconds. The pride is real.
   - Safety-pins the dying left strap to the kameez.

3. SECOND PEE — BODY AWARENESS (6:30 AM)
   - Less terror. Familiar routine. But today NOTICES: the wiping touches
     labia that RESPOND. Not sexually — but with heightened awareness.
     Warm, slightly puffy from sleep, the tissue alive and sensing.
     The body is always ON between the legs. Always aware. New data.

4. MEERA INTIMATE — HOLDING, NEAR-KISS, BREAST PROXIMITY (2:00 PM)
   - FULL SCENE. Room 304. Priya at library.
   - Sitting cross-legged. Hands held. The "stone in water" speech —
     every touch TRAVELS in this body.
   - Meera asks: "Can I hold you?"
   - Extended embrace: five minutes. Not sexual. Bodies pressed chest to hip.
     Meera's heartbeat against Kavya's breastbone. His face in her hair.
   - The near-kiss: foreheads touching, noses almost, breath warm.
     Meera's hand on Kavya's waist. Slides upward — ribs, the side
     curve of the breast through the kameez. She stops. Not grabbing —
     resting. Her palm against the outer curve of Kavya's breast through
     cotton. The warmth radiates. The nipple responds — tightening against
     the bra cup. He inhales sharply. She feels it.
   - "Is this okay?" Meera whispers.
   - "...yes." But he doesn't go further. Not today. The touch is enough.
     The PROXIMITY is enough. Her hand on the outside curve, through fabric,
     the warmth of her palm, the nipple's autonomous response.
   - Tears. Kavya's instant tear ducts. "Hormones," he says.
     "Bullshit," Meera says. "Those are yours."
   - File: day4_intimate.tw → "meera_holding_d4"

═══════════════════════════════════════════
KAVYA (in Arjun's body):
═══════════════════════════════════════════

1. HOSTEL EXCUSE (4:45 AM, own body, hostel)
   - Content: Pre-dawn. Priya asleep. Meera awake, helping.
     Kavya dresses — salwar kameez, dupatta. Goes downstairs.
     Chowkidar Ramesh: "Itni subah?"
     Kavya: "Temple mein pooja hai. Saat din ki pooja shuru ki hai.
     Subah 5 baje jaana padta hai." Seven-day pooja — the excuse that
     covers the entire week of pre-dawn temple visits.
     Ramesh nods. Religious excuse = unquestionable in Indian context.
     Signs out. Walks to temple.

2. BODY CATALOG — NON-GENITAL (3:00 PM, PG room, Rohit at lab)
   - FULL SCENE. Shirt off. Mirror.
   - Systematic: shoulders (broader +15cm, deltoids visible, clean rotation),
     chest (flat, pectorals shift, nipples = sharp ping not wave),
     arms (veins visible, bicep modest, forearm for keyboards),
     abdomen (four-pack faint, hair trail, V-lines unexpectedly sensitive),
     hips (narrow, iliac crests visible, different pelvic angle).
   - She STOPS at the waistband. Yesterday was Day 3 — urgent first
     masturbation. Today she catalogs everything ELSE. The rest of the
     body. The architecture. The foundation.

3. AROUSAL DISCOVERY — RANDOM ERECTION (3:30 PM, during coding)
   - FULL SCENE. She's coding — VS Code, the ML project. Deep in flow state.
     And then: something shifts between her legs. The penis THICKENS.
     Not from arousal — from NOTHING. Random. The body's unsolicited
     push notification.
   - She looks down: visible bulge in jeans. Feels it pressing against
     the denim, the fabric tightening. The sensation: concentrated,
     insistent, blood filling tissue she can FEEL expanding.
   - She pauses coding. Unbuttons the jeans to relieve pressure.
     Through the boxers: the outline of the erect penis, straining
     against cotton. She pulls the waistband forward and LOOKS.
   - It's fully erect. Five and a half inches, standing away from the
     body, the head darkened, a bead of pre-cum at the tip. She studies
     it — the anatomy she knows from cadavers, now ALIVE, warm, pulsing.
   - She touches it. One finger. The shaft — warm, firm, the skin
     softer than she expected. The cock TWITCHES at the contact.
     She wraps her fingers around it — briefly, the grip tentative.
     The sensation is CONCENTRATED — a single line of fire.
   - She releases. Not today. Not NOW. This is reconnaissance, not
     recreation. She pulls the jeans back up (uncomfortable over the
     erection), waits four minutes, thinks about pharmacology, and the
     erection subsides.
   - The DATA: male arousal arrives uninvited. Departs when ignored.
     The responsiveness is absurd. One touch and the body was READY.
   - She returns to coding. But part of her brain has filed the
     sensation under: *revisit soon.*
   - File: day4_intimate.tw → "kavya_erection_discovery_d4"

4. SWAP-BACK SCENE (5:30 PM, temple, both)
   - Both return to own bodies. Arjun: relief + loss (flat chest relief,
     sensitivity loss). Kavya: breasts return, keyboard reach gone.
   - Exchange of notes: "Your clutch needs adjustment." "Your bra strap
     needs replacing." The debrief protocol forming.
   - +5 relationship mutual.
```

---

## STATS AT END OF DAY 4

### ARJUN
```javascript
$arjun_stats_day4_end = {
  coding_skill: 88,
  med_knowledge: 7,          // +2 anatomy
  fem_comfort: 20,           // +5 bra mastery
  sex_exp_female: 7,         // +2 body awareness, near-kiss, breast proximity
  rel_meera: 100,            // capped
  rel_kavya: 35,             // +5 debrief protocol
  mood: "bittersweet",       // Relief + loss at swap-back
  period_countdown: 6
};
```

### KAVYA
```javascript
$kavya_stats_day4_end = {
  coding_skill: 88,          // +3 RB-trees
  med_knowledge: 47,
  masc_comfort: 18,          // +3 Pulsar, body catalog
  sex_exp_male: 7,           // +2 erection discovery, brief touch
  rel_arjun: 35,             // +5 debrief
  mood: "hungry_for_more",
  erection_experienced: true, // Seen and briefly touched
  permanent_thought: "nascent"
};
```
