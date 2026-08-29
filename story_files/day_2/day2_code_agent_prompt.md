# DAY 2   CODE AGENT PROMPT: Open World Integration
## "Saazish" (Conspiracy)   Objective-Driven Exploration

---

## CORE PRINCIPLE REMINDER

**Destinations + unlock conditions, NOT scene chains.** Player wakes up → sees room → interacts with objects → receives objectives → must DISCOVER the path to the next story beat through exploration, NPC conversations, phone interactions, and location travel. Never auto-advance.

---

## FILE STRUCTURE   DAY 2 (New additions marked with ★)

```
/game/
├── days/
│   ├── day1/                         # (existing from Day 1)
│   └── day2/
│       ├── day2_init.tw              # Day 2 variable initialization + carry-over from Day 1
│       ├── day2_arjun_hub.tw         # Arjun's location hub (open world navigation)
│       ├── day2_arjun_scenes.tw      # Arjun's main story scenes (gated by objectives)
│       ├── day2_arjun_npc.tw         # Arjun's NPC interactions & side quests
│       ├── day2_kavya_hub.tw         # Kavya's location hub (open world navigation)
│       ├── day2_kavya_scenes.tw      # Kavya's main story scenes (gated by objectives)
│       ├── day2_kavya_npc.tw         # Kavya's NPC interactions & side quests
│       ├── day2_shared.tw            # Phone calls between characters, synced events
│       └── day2_intimate.tw          # Intimate/sexual scenes (both characters)
├── systems/
│   ├── ★ rules_contract.tw          # Swap rules document (player-viewable artifact)
│   ├── ★ preparation_checklist.tw   # Pre-swap preparation tracker
│   └── (existing systems from Day 1)
└── assets/
    └── images/
        └── day2/
            ├── locations/
            ├── characters/
            ├── objects/
            └── scenes/
```

---

## DAY 2 VARIABLE INITIALIZATION

```javascript
// day2_init.tw   Carry forward Day 1 stats + new Day 2 variables

// NEW Day 2 flags
<<set $kavya_called_arjun to false>>
<<set $arjun_received_call to false>>
<<set $swap_rules_established to false>>
<<set $temple_meeting_set to false>>
<<set $arjun_told_rohit to false>>        // Choice variable
<<set $arjun_told_rohit_partial to false>> // Partial truth variant
<<set $kavya_private_journal to false>>    // Choice: secret journal
<<set $hostel_security_intel to false>>    // From Priya gossip
<<set $kitchen_gap_known to false>>       // 7:30-8:00 PM chowkidar break
<<set $arjun_outfit_choice to "tshirt">>  // blue_shirt or tshirt
<<set $arjun_edged to false>>             // Night scene: didn't finish
<<set $kavya_body_catalogue to false>>    // Night: self-mapping
<<set $icpc_partner_agreed to false>>     // Nikhil side quest
<<set $pulsar_lesson_planned to true>>    // From phone call
<<set $alarm_set_4am to false>>

// Relationship carry-forward (example   actual values from Day 1 endings)
// These should be dynamically pulled from $day1_end_stats
<<set $day2_start_rel_rohit to $rel_rohit>>
<<set $day2_start_rel_meera to $rel_arjun_meera>>
// etc.
```

---

## LOCATION SYSTEM   DAY 2

### NEW & MODIFIED LOCATIONS   ARJUN

Day 2 carries forward ALL Day 1 locations. New additions and modifications:

```javascript
const arjunLocations_day2_additions = {

  "pg_bathroom_day2": {
    // Same as Day 1 but with new morning interaction
    modifications: {
      objects_added: [
        { id: "phone_buzzing", action: "Answer buzzing phone", triggers: "kavya_first_call",
          timeWindow: "07:45-08:15", condition: "!arjun_received_call",
          CRITICAL: true, note: "This is the main story trigger   unknown number call" }
      ]
    }
  },

  "katraj_general_store": {  // ★ NEW LOCATION
    name: "Kulkarni General Store   Katraj",
    unlocked: true,
    available: "07:00-22:00",
    description: "Cramped shop with everything from biscuits to phone chargers. The uncle knows all.",
    objects: [
      { id: "counter", action: "Talk to shopkeeper", triggers: "kulkarni_uncle_npc" },
      { id: "snack_shelf", action: "Buy snacks", triggers: "snack_purchase_menu" },
      { id: "phone_accessories", action: "Browse phone accessories", triggers: "accessories_browse" },
      { id: "notice_board_shop", action: "Check local notices", triggers: "shop_notices" }
    ],
    npcs: ["kulkarni_uncle"],
    exits: [
      { to: "katraj_street", label: "Back to street" }
    ],
    image: "katraj_general_store.jpg"
  },

  "katraj_gym": {  // ★ NEW LOCATION
    name: "Iron Temple Gym   Katraj",
    unlocked: true,
    available: "06:00-22:00",
    description: "Basement gym. Mirrors, rust, protein powder smell. Rohit's second home.",
    objects: [
      { id: "weights", action: "Lift weights", triggers: "gym_workout_scene" },
      { id: "punching_bag", action: "Hit the bag", triggers: "punching_bag_scene" },
      { id: "mirror_gym", action: "Look at yourself", triggers: "gym_mirror_reflection" },
      { id: "bench_press", action: "Bench press", triggers: "bench_press_scene" }
    ],
    npcs: ["gym_trainer_vikram", "random_gym_bros"],
    exits: [
      { to: "katraj_street", label: "Back to street" }
    ]
  },

  "pataleshwar_temple": {  // ★ NEW LOCATION   unlocks evening/night
    name: "Pataleshwar Cave Temple",
    unlocked: false,
    unlockCondition: "arjun_received_call AND time >= 16:00",
    available: "05:00-21:00",
    description: "1500-year-old rock-cut Shiva temple. Quiet courtyard. The meeting point.",
    objects: [
      { id: "temple_entrance", action: "Enter the cave temple", triggers: "temple_explore" },
      { id: "courtyard_bench", action: "Sit in courtyard", triggers: "temple_courtyard_sit" },
      { id: "shiva_lingam", action: "Offer prayer", triggers: "temple_prayer" },
      { id: "nandi_statue", action: "Look at Nandi", triggers: "nandi_observation" },
      { id: "old_priest", action: "Talk to temple priest", triggers: "priest_npc" }
    ],
    npcs: ["temple_priest", "evening_devotees"],
    exits: [
      { to: "jm_road", label: "Walk to JM Road" },
      { to: "katraj_street", label: "Ride back to Katraj (20 min)" }
    ],
    note: "Arjun scouts this location today. The actual swap happens here Day 3.",
    image: "pataleshwar_temple.jpg"
  },

  "jm_road": {  // ★ NEW LOCATION
    name: "Jangli Maharaj Road",
    unlocked: false,
    unlockCondition: "visited_pataleshwar OR time >= 14:00",
    available: "06:00-23:00",
    description: "Pune's iconic road. Bookshops, restaurants, street food, the temple nearby.",
    objects: [
      { id: "bookshop", action: "Browse Crossword bookstore", triggers: "crossword_browse" },
      { id: "street_food", action: "Eat street food", triggers: "jm_road_food_menu" },
      { id: "bench_jm", action: "Sit on roadside bench", triggers: "jm_road_people_watch" }
    ],
    npcs: ["bookshop_employee", "street_food_vendor", "random_walkers"],
    exits: [
      { to: "pataleshwar_temple", label: "Walk to Pataleshwar (5 min)" },
      { to: "katraj_street", label: "Ride to Katraj (20 min)" },
      { to: "vit_gate", label: "Ride to VIT (15 min)" }
    ]
  },

  "wardrobe_scene": {  // ★ SPECIAL   Not a location, an interaction within PG room
    // Triggers when player interacts with wardrobe after 17:00 AND temple_meeting_set
    trigger: "wardrobe interaction in katraj_pg_room, evening",
    description: "Arjun chooses outfit for tomorrow. The blue shirt or the black tee.",
    choice: {
      blue_shirt: { sets: "$arjun_outfit_choice to 'blue_shirt'", note: "Meera liked this one" },
      black_tshirt: { sets: "$arjun_outfit_choice to 'tshirt'", note: "Practical, anonymous" }
    }
  }
};
```

### NEW & MODIFIED LOCATIONS   KAVYA

```javascript
const kavyaLocations_day2_additions = {

  "hostel_room_304_day2": {
    modifications: {
      objects_added: [
        { id: "meera_planning", action: "Talk to Meera about the plan", triggers: "meera_full_plan_scene",
          timeWindow: "07:00-08:30", condition: "priya_in_class AND !swap_rules_established",
          CRITICAL: true },
        { id: "redmi_call", action: "Use Redmi to call Arjun", triggers: "kavya_calls_arjun",
          timeWindow: "20:30-21:30", condition: "swap_rules_established AND priya_in_common_room",
          CRITICAL: true },
        { id: "body_catalogue", action: "Lie in bed   catalogue your body", triggers: "kavya_body_catalogue_scene",
          timeWindow: "23:00-01:00", condition: "kavya_called_arjun", intimate: true }
      ]
    }
  },

  "hostel_room_308": {  // ★ NEW   accessible through gossip
    name: "Room 308   Anjali's Room",
    unlocked: false,
    unlockCondition: "hostel_security_intel",
    available: "18:00-21:00",
    description: "Anjali's room. The girl who smuggled her boyfriend through the kitchen window.",
    objects: [
      { id: "talk_anjali", action: "Talk to Anjali", triggers: "anjali_npc_conversation" },
      { id: "kitchen_window", action: "Ask about the kitchen window route", triggers: "kitchen_route_intel" }
    ],
    npcs: ["anjali_308"],
    exits: [
      { to: "hostel_corridor", label: "Back to corridor" }
    ]
  },

  "hostel_kitchen_area": {  // ★ NEW   discovered through intel
    name: "Hostel Kitchen   Back Area",
    unlocked: false,
    unlockCondition: "kitchen_gap_known",
    available: "19:00-21:00",
    description: "Behind the mess kitchen. The window Anjali used. Chowkidar takes chai break 7:30-8 PM.",
    objects: [
      { id: "kitchen_window_check", action: "Check the window", triggers: "kitchen_window_inspection" },
      { id: "back_gate", action: "Look at back gate", triggers: "back_gate_assessment" }
    ],
    npcs: [],  // Empty during chai break window
    exits: [
      { to: "hostel_mess", label: "Back to mess hall" }
    ],
    note: "Not used for Day 2   intel gathering only. Potential alternate route for future days."
  },

  "sassoon_road_day2": {
    modifications: {
      objects_added: [
        { id: "medical_bookshop", action: "Visit medical bookstore", triggers: "medical_bookshop_scene" },
        { id: "clothes_shop", action: "Browse clothes shop", triggers: "sassoon_clothes_browse" }
      ],
      npcs_added: ["medical_bookshop_owner", "clothes_shop_aunty"]
    }
  },

  "bj_pharmacology_hall": {  // ★ NEW LOCATION
    name: "Pharmacology Lecture Hall",
    unlocked: false,
    unlockCondition: "signed_out_hostel AND time >= 10:00",
    available: "09:00-16:00",
    description: "Where dreams of interesting medicine go to die. Dr. Mhatre's domain.",
    objects: [
      { id: "lecture_seat", action: "Sit through pharmacology", triggers: "pharmacology_lecture_scene" },
      { id: "notebook_margin", action: "Code in notebook margins", triggers: "margin_coding_scene" },
      { id: "sneha_seat", action: "Sit next to Sneha", triggers: "sneha_pharmacology_chat" }
    ],
    npcs: ["dr_mhatre", "sneha_302", "random_mbbs_students"],
    exits: [
      { to: "bj_campus_path", label: "Exit to campus" }
    ],
    image: "pharmacology_hall.jpg"
  }
};
```

---

## OBJECTIVE SYSTEM   DAY 2

### ARJUN'S OBJECTIVES

```javascript
const arjunObjectives_day2 = {

  main: [
    {
      id: "obj_morning_routine_a2",
      title: "Start the day",
      description: "Get up, bathroom, chai. The usual.",
      status: "active",
      unlocks: ["obj_unknown_call"],
      completionTrigger: "arjun_morning_done_d2"
    },
    {
      id: "obj_unknown_call",
      title: "Answer the unknown number",
      description: "Your phone is buzzing. Unknown number. Something tells you to pick up.",
      status: "locked",
      unlockCondition: "arjun_morning_done_d2 AND in_bathroom AND time >= 07:45",
      unlocks: ["obj_survive_vit_d2"],
      completionTrigger: "arjun_received_call",
      CRITICAL: true,
      note: "This call changes everything. Player must be in bathroom between 7:45-8:15."
    },
    {
      id: "obj_survive_vit_d2",
      title: "Get through the day at VIT",
      description: "OS lecture with Desai. Your mind is elsewhere. Try not to combust.",
      status: "locked",
      unlockCondition: "arjun_received_call AND time >= 09:30",
      unlocks: ["obj_prepare_tomorrow"],
      completionTrigger: "vit_day_survived_d2",
      reward: { coding_skill: +1 }
    },
    {
      id: "obj_prepare_tomorrow",
      title: "Prepare for 5 AM",
      description: "Set alarm. Choose clothes. Scout the temple if you can. Tomorrow changes everything.",
      status: "locked",
      unlockCondition: "vit_day_survived_d2 AND time >= 17:00",
      unlocks: ["obj_night_decision"],
      completionTrigger: "preparation_complete",
      subObjectives: [
        { id: "sub_alarm", title: "Set alarm for 4 AM", trigger: "alarm_set_4am" },
        { id: "sub_clothes", title: "Choose outfit", trigger: "arjun_outfit_choice != null" },
        { id: "sub_scout", title: "Visit Pataleshwar temple (optional)", trigger: "visited_pataleshwar" }
      ]
    },
    {
      id: "obj_night_decision",
      title: "The longest night",
      description: "Lie in bed. Try to sleep. Carry the anticipation into tomorrow.",
      status: "locked",
      unlockCondition: "preparation_complete AND time >= 22:00",
      completionTrigger: "arjun_day2_complete"
    }
  ],

  side: [
    {
      id: "sq_nikhil_icpc",
      title: "ICPC Practice Partner",
      description: "Nikhil wants a partner for ACM-ICPC practice rounds. Competitive coding opportunity.",
      location: "vit_canteen OR vit_cblock",
      unlockCondition: "vit_day_survived_d2",
      reward: { coding_skill: +3, rel_nikhil: +5, icpc_partner_agreed: true },
      completionTrigger: "icpc_agreed",
      futureImpact: "Critical when Kavya takes over Arjun's body   she'll ace this"
    },
    {
      id: "sq_rohit_truth",
      title: "Tell Rohit? (Choice)",
      description: "He's your best friend. He can see something's changed. Do you tell him?",
      location: "katraj_pg_room",
      unlockCondition: "arjun_received_call AND in_pg_room",
      choices: [
        { id: "tell_partial", label: "Partial truth: 'meeting someone about Meera'",
          reward: { rohit_trust: +5, rohit_suspicion: +3 } },
        { id: "tell_nothing", label: "Keep quiet",
          reward: { rohit_trust: -2, rohit_suspicion: +0 } }
      ]
    },
    {
      id: "sq_temple_scout",
      title: "Scout Pataleshwar Temple",
      description: "Visit the meeting point. Know the layout. Find the quiet spots.",
      location: "pataleshwar_temple",
      unlockCondition: "arjun_received_call AND time >= 16:00",
      reward: { temple_familiarity: +5, preparation: +3 },
      completionTrigger: "visited_pataleshwar"
    },
    {
      id: "sq_gym_session",
      title: "Burn the Anxiety",
      description: "Rohit's gym. The punching bag doesn't ask questions.",
      location: "katraj_gym",
      unlockCondition: "time >= 15:00",
      reward: { energy: +10, mood: +5 },
      completionTrigger: "gym_workout_done"
    },
    {
      id: "sq_general_store",
      title: "Kulkarni Uncle's Errands",
      description: "The shop uncle needs help carrying stock. Quick cash.",
      location: "katraj_general_store",
      unlockCondition: "talked_to_kulkarni_uncle",
      reward: { money: +100, rel_kulkarni_uncle: +3 },
      completionTrigger: "stock_carried"
    },
    {
      id: "sq_bookshop_browse",
      title: "Crossword Bookstore Run",
      description: "JM Road bookshop. Maybe grab a CS book for... someone who'll need it.",
      location: "jm_road",
      unlockCondition: "visited_jm_road",
      reward: { item: "cs_reference_book", coding_skill: +1 },
      completionTrigger: "book_purchased"
    },
    {
      id: "sq_raju_chai_followup",
      title: "Check on Raju's Phone Repair",
      description: "If you fixed it yesterday, he owes you free chai. Collect.",
      location: "tapri_chai",
      unlockCondition: "raju_phone_fixed",
      reward: { item: "free_chai", mood: +3 },
      completionTrigger: "raju_followup_done"
    },
    {
      id: "sq_aai_sunday_confirm",
      title: "Confirm Sunday Visit",
      description: "Aai is expecting you. Confirm or make excuses   the swap might complicate things.",
      location: "any (phone)",
      unlockCondition: "aai_called_yesterday",
      reward: { rel_aai: +3 OR -2 depending on choice },
      completionTrigger: "sunday_decision_made"
    }
  ]
};
```

### KAVYA'S OBJECTIVES

```javascript
const kavyaObjectives_day2 = {

  main: [
    {
      id: "obj_skip_lecture_plan",
      title: "Skip first lecture with Meera",
      description: "Biochemistry can wait. Meera has the full plan. Room 304, door locked, Priya in class.",
      status: "active",
      unlockCondition: "time >= 07:00 AND priya_left_for_class",
      unlocks: ["obj_establish_rules"],
      completionTrigger: "meera_plan_heard"
    },
    {
      id: "obj_establish_rules",
      title: "Write the swap rules",
      description: "Your body, your terms. Non-negotiable.",
      status: "locked",
      unlockCondition: "meera_plan_heard",
      unlocks: ["obj_call_arjun"],
      completionTrigger: "swap_rules_established",
      reward: { trust_meera: +5 },
      artifact: "rules_contract.tw   viewable in inventory"
    },
    {
      id: "obj_survive_college_d2",
      title: "Get through college",
      description: "Pharmacology lecture. The usual torture. But today your mind is on fire.",
      status: "locked",
      unlockCondition: "swap_rules_established AND time >= 09:30",
      unlocks: ["obj_call_arjun"],
      completionTrigger: "college_survived_d2"
    },
    {
      id: "obj_call_arjun",
      title: "Call Arjun",
      description: "Tell him everything. The manuscript. The swap. Tomorrow, 5 AM, Pataleshwar.",
      status: "locked",
      unlockCondition: "swap_rules_established AND time >= 20:30 AND priya_in_common_room",
      unlocks: ["obj_body_prep"],
      completionTrigger: "kavya_called_arjun",
      CRITICAL: true
    },
    {
      id: "obj_body_prep",
      title: "Last night in your body (as you know it)",
      description: "Tomorrow you become someone else. Map yourself. Remember the coordinates.",
      status: "locked",
      unlockCondition: "kavya_called_arjun AND time >= 23:00",
      completionTrigger: "kavya_day2_complete",
      intimate: true
    }
  ],

  side: [
    {
      id: "sq_priya_gossip_intel",
      title: "Hostel Security Intel",
      description: "Priya's gossiping about Anjali in Room 308. Listen carefully   there's useful info here.",
      location: "hostel_room_304",
      unlockCondition: "priya_returns_from_jog AND time >= 18:30",
      reward: { hostel_security_intel: true, kitchen_gap_known: true },
      completionTrigger: "priya_gossip_heard"
    },
    {
      id: "sq_anjali_visit",
      title: "Visit Anjali in Room 308",
      description: "The girl who snuck her boyfriend in. She might have more intel on hostel gaps.",
      location: "hostel_room_308",
      unlockCondition: "hostel_security_intel AND time >= 19:00",
      reward: { hostel_knowledge: +5, kitchen_route_detailed: true },
      completionTrigger: "anjali_visited"
    },
    {
      id: "sq_private_journal",
      title: "Start a Private Swap Journal (Choice)",
      description: "Document body sensations during swaps. For science. For yourself.",
      location: "hostel_room_304",
      unlockCondition: "swap_rules_established",
      reward: { kavya_private_journal: true, future_body_awareness: +5 },
      completionTrigger: "journal_started"
    },
    {
      id: "sq_vit_schedule_study",
      title: "Memorize Arjun's CS Schedule",
      description: "You need to know where to go, when, and whose name to answer to.",
      location: "hostel_room_304 OR bj_library",
      unlockCondition: "swap_rules_established",
      reward: { preparation: +5, cs_knowledge: +2 },
      completionTrigger: "schedule_memorized"
    },
    {
      id: "sq_pharmacology_surprise_test",
      title: "Survive Dr. Mhatre's Surprise Test",
      description: "Sneha warned you yesterday. Time to use that dosage calculator.",
      location: "bj_pharmacology_hall",
      unlockCondition: "surprise_test_intel AND time >= 10:00",
      reward: { med_knowledge: +3, academic_standing: +2 },
      completionTrigger: "surprise_test_passed"
    },
    {
      id: "sq_sneha_study_group",
      title: "Sneha's Study Group Invite",
      description: "She wants you to join her pharmacology study group. Good cover for normal behavior.",
      location: "bj_library OR hostel_common_room",
      unlockCondition: "sneha_helped_day1",
      reward: { rel_sneha: +3, priya_suspicion: -2 },
      completionTrigger: "study_group_joined"
    },
    {
      id: "sq_library_coding_d2",
      title: "Last Coding Session as Kavya",
      description: "Tomorrow you'll code on a real setup. Today, one last session on the library Dell.",
      location: "bj_library",
      unlockCondition: "time >= 15:00",
      reward: { coding_skill: +3, emotional_readiness: +5 },
      completionTrigger: "last_kavya_coding"
    },
    {
      id: "sq_meera_practice_chant",
      title: "Practice the Swap Chant",
      description: "Meera wants you to rehearse the 16-syllable mantra. Pronunciation matters.",
      location: "hostel_room_304 OR hostel_terrace",
      unlockCondition: "swap_rules_established AND priya_absent",
      reward: { swap_proficiency: +5 },
      completionTrigger: "chant_practiced"
    },
    {
      id: "sq_amma_call_back",
      title: "Call Amma Back",
      description: "She sent that audio message yesterday. The Kalyani raga. Call her before tomorrow.",
      location: "any (phone)",
      unlockCondition: "true",
      reward: { rel_amma: +3, emotional_anchor: +5 },
      completionTrigger: "amma_called_back"
    }
  ]
};
```

---

## TIME SYSTEM   DAY 2

```javascript
const timedEvents_day2 = [
  // ARJUN
  { time: "07:50", character: "arjun", event: "unknown_number_call",
    description: "Phone buzzes   unknown number. CRITICAL STORY TRIGGER.",
    location_required: "pg_bathroom", missable: true,
    miss_consequence: "Call comes again at 08:10 in PG room   secondary trigger" },
  { time: "10:00", character: "arjun", event: "os_lecture_start",
    description: "Prof. Desai's OS lecture. Arjun can't focus." },
  { time: "13:30", character: "arjun", event: "pooja_whatsapp_d2",
    description: "Pooja texts about her exam, asks if Arjun is 'acting weird'" },
  { time: "17:30", character: "arjun", event: "sunset_energy",
    description: "The restlessness builds. He needs to move, do, prepare." },
  { time: "21:00", character: "arjun", event: "kavya_calls_arjun_sync",
    description: "SYNCED EVENT: Kavya calls with full details. The plan is real.",
    synced_with: "kavya → obj_call_arjun" },

  // KAVYA
  { time: "07:00", character: "kavya", event: "priya_leaves_for_class",
    description: "Priya exits for Biochemistry. Window opens for planning." },
  { time: "09:30", character: "kavya", event: "papa_whatsapp_d2",
    description: "Papa sends pharmacology exam schedule. Pressure." },
  { time: "14:00", character: "kavya", event: "github_new_issue",
    description: "New GitHub issue assigned to KV_Codes on the NLP library" },
  { time: "16:30", character: "kavya", event: "meera_reminder_whisper",
    description: "Meera whispers: 'Call him tonight. After Priya leaves for common room.'" },
  { time: "18:30", character: "kavya", event: "priya_returns_gossip",
    description: "Priya returns from jog with Anjali gossip   hostel security intel" },
  { time: "20:15", character: "kavya", event: "priya_common_room",
    description: "Priya goes to common room for TV serial. Call window opens." }
];
```

---

## PHONE SYSTEM   DAY 2 UPDATES

### ARJUN'S PHONE   New Messages/Calls

```javascript
const arjunPhone_day2_new = {
  calls: {
    incoming: [
      { number: "unknown", time: "07:50", caller: "Kavya (first contact)",
        content: "kavya_first_call_scene", critical: true },
      { number: "unknown", time: "21:00", caller: "Kavya (full briefing)",
        content: "kavya_full_call_scene", critical: true }
    ]
  },
  whatsapp_new: [
    { from: "Rohit Sala", message: "Bhai gym chalega aaj? Leg day hai 💪",
      time: "08:30", reply_options: ["Haan chal", "Nahi yaar aaj nahi", "Leg day is fake day"] },
    { from: "Pooja Pagal 🙄", messages: [
      "Bhaiya tu aaj kuch alag lag raha tha phone pe",
      "Like happy but also terrified??",
      "Kya ho raha hai 👀",
      "Also maths ka doubt hai   quadratic formula kya tha?"
    ], time: "13:30" },
    { from: "CSE 3rd Year Group", message: "Desai sir ne extra assignment diya OS ka. Deadline Monday.",
      time: "14:00" },
    { from: "Nikhil DBMS", message: "ICPC practice registration kal last date hai. Partner chahiye. Tu in?",
      time: "15:00" }
  ]
};
```

### KAVYA'S PHONES   New Messages

```javascript
const kavyaPhones_day2_new = {
  samsung: {
    whatsapp_new: [
      { from: "Papa", message: "Pharmacology III exam date: October 15. Prepare well.",
        time: "09:30" },
      { from: "Amma ❤️", messages: [
        "Kanna did you listen to the raga I sent?",
        "Mridangam uncle's son asked for your Instagram 😊",
        "I said you don't use Instagram much (I lied haha)"
      ], time: "11:00" },
      { from: "MBBS 3rd Year Section B", message: "Dr. Mhatre surprise test CONFIRMED tomorrow 10 AM. Dosage calculations.",
        time: "12:00" },
      { from: "Priya", message: "Kavya common room mein aa. Sasural Simar Ka rerun aa raha hai 😍",
        time: "20:00" }
    ]
  },
  redmi: {
    github: {
      new_notification: { type: "issue_assigned", repo: "nlp-toolkit",
        message: "Issue #89: Hindi compound word tokenization fails on Sanskrit loanwords. Assigned to KV_Codes." }
    },
    telegram: {
      from_rahul: [
        "KV, the maintainer DM'd me asking for your real name",
        "I said you're private, he respects that",
        "But seriously   who ARE you? 3 years and I don't know your real name 😂"
      ]
    },
    browser: {
      new_tabs: ["VIT Pune CS department schedule", "Prof. Krishnan publications", "Bajaj Pulsar 150 riding tutorial YouTube"]
    }
  }
};
```

---

## INTIMATE/SEXUAL SCENE INTEGRATION   DAY 2

```
DAY 2 INTIMATE SCENES   Pre-swap anticipation, body awareness

ARJUN:
1. MORNING SHOWER (Routine)   Location: pg_bathroom
   - Trigger: Morning routine before the call
   - Content: Quick shower. Same body awareness as Day 1 but subtler   establishing normalcy before the call disrupts everything.
   - He soaps his chest, his cock, his legs   all routine, all unremarkable. This body. His body. The only one he's ever known.
   - File: day2_intimate.tw → passage "arjun_shower_day2"

2. PEEING   Post-Call (Stress Pee)   Location: pg_bathroom
   - Trigger: After Kavya's first call
   - Content: Standing at the toilet, hands shaking. Can barely aim. His body's response to adrenaline   the urgent need to piss when your world has just shifted on its axis. Standing, directing the stream, the simple masculine act suddenly feels precious because tomorrow someone else will be doing it for him.
   - File: day2_intimate.tw → passage "arjun_stress_pee_day2"

3. GYM SCENE (Optional)   Location: katraj_gym
   - Trigger: Side quest gym_session
   - Content: Lifting weights. His body working   muscles contracting, sweat, the mirror showing him his own lean frame. He pushes harder than usual. Punching bag scene   hitting, hitting, hitting. Each punch is six months of frustration. Tomorrow he'll feel none of this. Tomorrow these arms, these fists, this chest will belong to someone else.
   - Body awareness: The weight of his own balls shifting when he squats. The cock adjusting in his underwear when he does leg presses. The male body's constant minor negotiations with gravity. He doesn't think about them. Tomorrow he won't have them.
   - File: day2_intimate.tw → passage "arjun_gym_body_awareness"

4. NIGHT   AROUSAL WITHOUT RELEASE (11:30 PM)   Location: katraj_pg_room
   - Trigger: obj_night_decision active, time >= 23:00
   - Content: FULL SCENE. Lying in bed. Thinking of Meera. Hard   painfully hard. His cock strains against his shorts, the fabric tenting. He reaches under the waistband. Wraps his hand around himself. Strokes   once, twice, three times. The head is slick.
   - Then he STOPS. Deliberately. Pulls his hand away. He wants to carry this energy   the want, the ache, the coiled tension in his groin   into tomorrow. Into the moment when he sees her. He wants to be full of wanting when he walks into that temple.
   - The erection throbs. Diminishes slowly. He lies there with the ache   blue balls, the dull pressure in his lower abdomen, the body's protest at being denied. But the protest is fuel. Tomorrow.
   - Emotional: The discipline of waiting. The choice to carry desire forward like a flame cupped between palms.
   - File: day2_intimate.tw → passage "arjun_edging_night_day2"

KAVYA:
1. MORNING SHOWER (Routine + Heightened Awareness)   Location: hostel_bathroom
   - Trigger: Morning routine
   - Content: Same shower, same stall, but today she NOTICES. The water on her skin   she feels it differently because she knows this is one of her last showers in this body (for a while). The weight of her breasts under the water stream. The curve where waist meets hip. The dark hair between her thighs. She's not aroused   she's archiving. Memorizing the coordinates of her body like backing up a hard drive.
   - File: day2_intimate.tw → passage "kavya_heightened_shower_day2"

2. PHARMACOLOGY LECTURE   Bored Body Awareness   Location: bj_pharmacology_hall
   - Trigger: During pharmacology lecture scene
   - Content: Sitting in the lecture. The plastic chair digs into her thighs. She shifts   the bra underwire presses differently at this angle. She crosses and uncrosses her legs. The salwar fabric between her thighs. The dupatta across her chest. Every textile contact point suddenly data.
   - She catches herself thinking: tomorrow, no bra. No dupatta. No underwire. No salwar between my legs. The thought is vertigo and freedom simultaneously.
   - File: day2_intimate.tw → passage "kavya_lecture_body_awareness"

3. EVENING   PERIOD CALENDAR CHECK   Location: hostel_room_304
   - Trigger: Part of preparation sequence
   - Content: She checks her period tracker app (hidden on the Redmi). Next period: in 12 days. Good   she won't be menstruating during the first swap. But the thought hits: what if the swap lasts longer? What if she's in Arjun's body when HER body gets its period? Arjun would have to deal with it. The thought is   complicated. Alarming. Also darkly funny.
   - She adds to the rules document: "Rule 9: If menstruation occurs during swap, IMMEDIATE swap-back."
   - File: day2_intimate.tw → passage "kavya_period_planning"

4. NIGHT   BODY CATALOGUE (11:00 PM)   Location: hostel_room_304
   - Trigger: obj_body_prep, time >= 23:00
   - Content: FULL SCENE. Lying in bed. Priya asleep. Meera asleep.
   - Kavya touches herself   NOT sexually, but systematically. Runs her fingers over her collarbones. Her shoulders (narrow). Her arms (soft, not muscular). Her breasts   she cups them, feels the weight, the shape, the nipples that respond to touch even when the intent isn't sexual (they harden, a small betrayal). The areola   dark, textured. The underside where skin meets skin and sweat gathers.
   - Her stomach. The slight softness below her navel. Her hip bones   not prominent but present. The curve of her waist   she wraps her hands around it, fingertips almost meeting at the back.
   - Between her thighs. She doesn't masturbate   the energy is different tonight. But she touches herself there   gently, clinically. The outer lips. The clitoris   hooded, responsive even to light contact. She notes the sensation: warmth, a pulse, the body's involuntary interest. She withdraws her hand.
   - Her thighs (soft, inner surface sensitive). Her knees (the scar from age nine). Her calves. Her feet (small, size 6, arch that cramps during long hours standing in anatomy lab).
   - Tomorrow, none of this will be hers. Tomorrow she'll have different hands, different skin, a flat chest, something between her legs she's only ever seen on cadavers and in textbooks.
   - She lies there and memorizes Kavya Iyer's body the way you memorize a house before you move out.
   - File: day2_intimate.tw → passage "kavya_body_catalogue_day2"
```

---

## NPC INTERACTION PLACEMENT   DAY 2

```
ARJUN NPC SCENES   Day 2:

1. ROHIT (PG Room, Multiple)   Morning reaction to Arjun's changed mood, evening outfit scene, the "tell or don't tell" choice
   - Insert at: katraj_pg_room interactions
   - KEY: Rohit notices something is different. "Bhai tera face... pehle jaisa nahi hai. Something happened."
   
2. RAJU BHAIYA (Tapri)   Phone repair follow-up (if Day 1 quest done), morning chai
   - Insert at: tapri_chai
   - New: Raju shows Arjun his repaired phone, offers free chai

3. NIKHIL (VIT)   OS lecture buddy, ICPC proposal, canteen existential talk
   - Insert at: vit_cblock, vit_canteen
   - KEY: "Agar Meera se milne ka chance mile... tu karega?"

4. PROF. DESAI (VIT)   OS lecture, process synchronization (thematic irony   two processes sharing resources)
   - Insert at: vit_cblock
   
5. KULKARNI UNCLE (General Store)   NEW NPC, Katraj shopkeeper, neighborhood gossip
   - Insert at: katraj_general_store
   
6. GYM TRAINER VIKRAM (Gym)   NEW NPC, motivational, notices Arjun's intensity
   - Insert at: katraj_gym

7. TEMPLE PRIEST (Pataleshwar)   NEW NPC, old, observant, makes cryptic comment about "visitors who come seeking change"
   - Insert at: pataleshwar_temple

8. BOOKSHOP EMPLOYEE (JM Road)   NEW NPC, recommends a book, casual encounter
   - Insert at: jm_road

9. AAI (Phone)   Follow-up about Sunday visit
   - Insert at: timed phone interaction

10. POOJA (WhatsApp)   Notices Arjun seems different on phone, asks about quadratics
    - Insert at: WhatsApp interaction

11. PANWALA BHAU (Katraj Street)   Day 2 gossip update
    - Insert at: katraj_street

12. FRUIT VENDOR TAI (Katraj Street)   Notices Arjun looks "better today"
    - Insert at: katraj_street


KAVYA NPC SCENES   Day 2:

1. MEERA (Room 304)   The full plan briefing, rules negotiation, evening chant practice, shared anxiety
   - Insert at: hostel_room_304 (multiple scenes)
   - KEY: The plan scene + rules scene + practice scene

2. PRIYA (Multiple)   Morning departure, evening gossip (Anjali intel), Instagram scrolling, common room exit
   - Insert at: hostel_room_304, hostel_corridor
   - KEY: Anjali gossip = hostel security intel

3. SNEHA (Campus/Corridor)   Study group invite, pharmacology test prep
   - Insert at: bj_campus_path, hostel_corridor

4. DR. MHATRE (Pharmacology)   NEW NPC, the pharmacology professor, stern, demanding
   - Insert at: bj_pharmacology_hall

5. ANJALI (Room 308)   NEW NPC, the girl who smuggled her boyfriend, has intel
   - Insert at: hostel_room_308

6. MESS DIDI SAVITA (Mess)   Dinner service, comments on Kavya eating more today
   - Insert at: hostel_mess

7. SENIOR DIVYA (Common Room)   Brief corridor encounter, wisdom drop
   - Insert at: hostel_common_room or hostel_corridor

8. PAPA (Phone)   WhatsApp exam schedule, pressure
   - Insert at: Samsung WhatsApp

9. AMMA (Phone)   Follow-up messages, Mridangam Uncle's son, audio raga
   - Insert at: Samsung WhatsApp

10. RAHUL (Telegram/Redmi)   Asks about KV_Codes' identity, maintainer interest
    - Insert at: Redmi Telegram

11. MEDICAL BOOKSHOP OWNER (Sassoon Road)   NEW NPC, sells textbooks, knows students
    - Insert at: sassoon_road

12. MRS. JOSHI (Warden)   Night rounds, more alert tonight, lingers at Room 304
    - Insert at: hostel_stairs/corridor
    - KEY: Tension   she seems to sense something. Or is Kavya paranoid?

13. CHOWKIDAR RAMESH (Gate)   Kavya observes his schedule, notes the chai break gap
    - Insert at: hostel_entrance
```

---

## SYNCED EVENTS   ARJUN ↔ KAVYA

```javascript
// These events happen at the same in-game time for both characters
// If player switches POV, they see the other side of the same event

const syncedEvents_day2 = [
  {
    time: "07:50-08:10",
    event: "first_phone_call",
    arjun_side: "Receives call from unknown number in bathroom, toothpaste dripping",
    kavya_side: "Makes call from Redmi in hostel corridor, Meera standing guard",
    both_hear: "Same dialogue, different internal monologues"
  },
  {
    time: "21:00-21:20",
    event: "full_briefing_call",
    arjun_side: "Receives second call in PG room, Rohit at gym",
    kavya_side: "Calls from Room 304, Priya in common room, Meera listening",
    both_hear: "The swap explanation, temple meeting, Pulsar lesson arrangement"
  }
];
```

---

## STATS AT END OF DAY 2

### ARJUN   End of Day 2
```javascript
$arjun_stats_day2_end = {
  coding_skill: 88,       // +1 from OS lecture
  med_knowledge: 5,        // unchanged
  fem_comfort: 0,          // unchanged   no swap yet
  sex_exp_male: 15,        // unchanged (edging doesn't increase)
  sex_exp_female: 0,       // unchanged
  rel_meera: 92,           // +2 from hope renewed
  rel_kavya: 35,           // +5 from first phone contact
  rel_rohit: "variable",   // depends on tell/don't tell choice
  rel_nikhil: "variable",  // +5 if ICPC agreed
  suspicion: 0,            // pre-swap, n/a
  money: "variable",       // depends on purchases
  mood: "electric_anticipation",
  energy: 40,              // better than Day 1   hope is energizing
  alarm_set: "04:00",
  temple_scouted: "variable",  // true if visited Pataleshwar
  preparation_level: "variable" // sum of sub-objectives
};
```

### KAVYA   End of Day 2
```javascript
$kavya_stats_day2_end = {
  coding_skill: 75,        // +2-5 from library coding + GitHub
  med_knowledge: 48,       // +1 from pharmacology (if attended)
  masc_comfort: 0,         // unchanged   no swap yet
  sex_exp_female: 10,      // unchanged (body catalogue isn't sexual)
  sex_exp_male: 0,         // unchanged
  rel_arjun: 38,           // +8 from phone calls (first real contact)
  rel_meera: 90,           // +3 from planning partnership
  rel_priya: "variable",   // depends on interactions
  rel_sneha: "variable",   // depends on study group
  suspicion: 0,            // pre-swap
  money: "variable",
  mood: "terrified_exhilarated",
  energy: 20,              // low   anxiety, late night, planning exhaustion
  swap_rules_written: true,
  private_journal: "variable",  // true if started
  schedule_memorized: "variable",
  chant_practiced: "variable",
  body_catalogued: true
};
```

---

## CHARACTER SWITCH POINTS   DAY 2

```
Player can switch POV at these designated moments:
1. After both morning routines (08:30)
2. After both receive/make the first phone call (08:15)   RECOMMENDED switch point
3. After both complete college scenes (14:00)
4. After 18:00 (evening preparations)
5. During the synced phone call (21:00)   can switch MID-CALL for both perspectives

NOTE: The 21:00 phone call is the narrative centerpiece of Day 2.
Both characters' versions should be available. The player who plays
both sides gets the full emotional picture.
```
