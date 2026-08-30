# DAY 3   CODE AGENT PROMPT: Open World Integration
## "Pehla Badlav" (First Change)   FIRST SWAP DAY
## Objective-Driven Exploration in SWAPPED BODIES

---

## CRITICAL ARCHITECTURE NOTE   SWAPPED PERSPECTIVE

**Day 3 is fundamentally different from Days 1-2.** Each playable character is now in the OTHER character's body, navigating the OTHER character's world. The open-world locations flip:

- **ARJUN (player)** → in KAVYA'S body → navigates KAVYA'S locations (hostel, B.J. Medical)
- **KAVYA (player)** → in ARJUN'S body → navigates ARJUN'S locations (PG, VIT, Katraj)

Every object interaction, NPC encounter, and location description must reflect the SWAPPED perspective. The player sees familiar locations through alien eyes, and alien locations through familiar confusion.

```
WRONG: "You walk into the hostel room." (neutral)
RIGHT: "You walk into a room that isn't yours, wearing a body that isn't yours,
        and the girl sleeping in the far bed doesn't know that Kavya isn't home."
```

---

## FILE STRUCTURE   DAY 3

```
/game/
├── days/
│   └── day3/
│       ├── day3_init.tw              # Swap state initialization
│       ├── day3_swap_scene.tw        # The swap ritual at Pataleshwar (shared)
│       ├── day3_arjun_hub.tw         # Arjun-in-Kavya navigates HOSTEL/B.J. Medical
│       ├── day3_arjun_scenes.tw      # Arjun's main story (in Kavya's body)
│       ├── day3_arjun_npc.tw         # NPC interactions (hostel world)
│       ├── day3_kavya_hub.tw         # Kavya-in-Arjun navigates PG/VIT/Katraj
│       ├── day3_kavya_scenes.tw      # Kavya's main story (in Arjun's body)
│       ├── day3_kavya_npc.tw         # NPC interactions (PG/VIT world)
│       ├── day3_swapback.tw          # Evening swap-back at temple (shared)
│       └── day3_intimate.tw          # All intimate/body discovery scenes
├── systems/
│   ├── ★ body_status.tw             # Tracks which body each mind is in
│   ├── ★ suspicion_overlay.tw       # Real-time suspicion meter UI for NPCs
│   ├── ★ body_discovery_log.tw      # Journal of body differences (unlockable)
│   └── (existing systems)
└── assets/images/day3/
```

---

## DAY 3 VARIABLE INITIALIZATION

```javascript
// day3_init.tw   THE SWAP IS ACTIVE

// SWAP STATE   ACTIVE
<<set $swapActive to true>>
<<set $swapCount to 1>>
<<set $arjunBody to "kavya">>    // Arjun's MIND is in Kavya's BODY
<<set $kavyaBody to "arjun">>    // Kavya's MIND is in Arjun's BODY
<<set $swapStartTime to "05:10">>
<<set $swapEndTime to "20:00">>  // Planned swap-back

// BODY DISCOVERY FLAGS   Arjun (in Kavya's body)
<<set $arjun_felt_breasts to false>>
<<set $arjun_felt_no_penis to false>>
<<set $arjun_first_pee_female to false>>
<<set $arjun_first_bra_experience to false>>
<<set $arjun_wore_dupatta to false>>
<<set $arjun_felt_hips to false>>
<<set $arjun_hair_experience to false>>
<<set $arjun_crying_easy to false>>
<<set $arjun_smelled_differently to false>>
<<set $arjun_period_awareness to false>>
<<set $arjun_touched_vulva to false>>       // During pee   involuntary
<<set $arjun_shower_female to false>>
<<set $arjun_dressed_female to false>>
<<set $arjun_saw_self_mirror to false>>

// BODY DISCOVERY FLAGS   Kavya (in Arjun's body)
<<set $kavya_felt_flat_chest to false>>
<<set $kavya_felt_penis to false>>
<<set $kavya_first_pee_male to false>>
<<set $kavya_first_erection to false>>
<<set $kavya_no_bra_freedom to false>>
<<set $kavya_height_experience to false>>
<<set $kavya_voice_deep to false>>
<<set $kavya_hand_span to false>>
<<set $kavya_rode_pulsar to false>>
<<set $kavya_testicle_awareness to false>>
<<set $kavya_shower_male to false>>
<<set $kavya_adam_apple to false>>
<<set $kavya_stubble_felt to false>>

// SUSPICION   Elevated importance today
<<set $priya_suspicion to $priya_suspicion>>  // Carry forward
<<set $rohit_suspicion to $rohit_suspicion>>
<<set $sneha_suspicion to 0>>
<<set $dr_sharma_suspicion to 0>>
<<set $krishnan_suspicion to 0>>
<<set $warden_suspicion to $warden_suspicion>>

// REUNION
<<set $meera_reunion_complete to false>>
<<set $meera_hug_duration to 0>>       // Tracked for relationship bonus
<<set $meera_kiss_attempted to false>>  // Player choice
```

---

## LOCATION SYSTEM   DAY 3

### ARJUN (in Kavya's body)   HOSTEL & B.J. MEDICAL WORLD

**Arjun now navigates Kavya's world. He has NEVER been to most of these locations. Everything is discovery.**

```javascript
const arjunInKavya_locations_day3 = {

  "pataleshwar_temple_swap": {
    name: "Pataleshwar Cave Temple   Dawn",
    unlocked: true,  // Starting location for both
    available: "04:30-06:00",
    description: "The swap point. Cold stone, pre-dawn dark, the universe about to invert.",
    objects: [
      { id: "kumkum_circle", action: "Sit in the ritual circle", triggers: "swap_ritual_scene" },
      { id: "kavya_present", action: "Look at Kavya", triggers: "pre_swap_conversation" },
      { id: "pulsar_parked", action: "Hand over Pulsar keys", triggers: "key_exchange" },
      { id: "hostel_id", action: "Receive Kavya's hostel ID", triggers: "id_handover" }
    ],
    CRITICAL: true,
    image: "pataleshwar_dawn.jpg"
  },

  "walk_to_hostel": {
    name: "Walking to B.J. Medical Hostel",
    unlocked: false,
    unlockCondition: "swap_complete",
    available: "05:15-06:30",
    description: "The walk in Kavya's body. Every step is different. Hips sway. Breasts shift. Hair falls in your face.",
    objects: [
      { id: "body_check", action: "Stop and assess your body", triggers: "arjun_first_body_check" },
      { id: "hair_fix", action: "Push hair out of face", triggers: "hair_discovery" },
      { id: "dupatta_fix", action: "Adjust the dupatta", triggers: "dupatta_struggle" },
      { id: "walk_practice", action: "Practice walking normally", triggers: "walk_adjustment" }
    ],
    npcs: ["early_morning_jogger", "milk_delivery_man"],
    exits: [
      { to: "hostel_entrance_d3", label: "Approach hostel gate" }
    ]
  },

  "hostel_entrance_d3": {
    name: "Hostel Main Entrance   As Kavya",
    unlocked: false,
    unlockCondition: "walk_to_hostel_complete",
    available: "05:30-21:00",
    description: "The gate. Chowkidar Ramesh. Your first test. He knows Kavya's face. Does he know her walk?",
    objects: [
      { id: "approach_gate", action: "Walk past chowkidar", triggers: "chowkidar_test",
        suspicion_check: true },
      { id: "sign_in", action: "Sign the register", triggers: "sign_in_handwriting_test",
        note: "Arjun's handwriting ≠ Kavya's. Suspicion risk." }
    ],
    npcs: ["chowkidar_ramesh"],
    exits: [
      { to: "hostel_stairs", label: "Inside   stairs" }
    ]
  },

  // Arjun now has access to ALL of Kavya's Day 1-2 hostel locations
  // but experiences them as a STRANGER in a borrowed body

  "hostel_room_304_d3": {
    name: "Room 304   As Kavya",
    unlocked: false,
    unlockCondition: "entered_hostel",
    available: "00:00-23:59",
    description: "The room you've only heard described. Three beds. Twenty square meters. Meera is HERE.",
    objects: [
      { id: "meera_present", action: "Look at Meera", triggers: "meera_reunion_scene", CRITICAL: true,
        condition: "!meera_reunion_complete" },
      { id: "kavya_bed", action: "Sit on Kavya's bed", triggers: "sitting_in_her_space" },
      { id: "kavya_cupboard", action: "Open Kavya's cupboard", triggers: "cupboard_exploration",
        note: "Arjun finds her hidden jeans, crop top, denim jacket" },
      { id: "mirror_304", action: "Look in mirror", triggers: "arjun_sees_kavya_face" },
      { id: "kavya_study_desk", action: "Check desk", triggers: "desk_discovery" },
      { id: "priya_check", action: "Check if Priya is here", triggers: "priya_status" },
      { id: "meera_bed_sit", action: "Sit on Meera's bed", triggers: "meera_intimate_time",
        condition: "priya_absent AND meera_reunion_complete" },
      { id: "manuscript_look", action: "Look at the manuscript", triggers: "manuscript_viewing",
        condition: "meera_reunion_complete" }
    ],
    npcs: ["meera", "priya"],
    exits: [
      { to: "hostel_corridor", label: "Corridor" }
    ],
    image: "room_304_arjun_pov.jpg"
  },

  "hostel_bathroom_d3": {
    name: "Hostel Bathroom   First Time Female",
    unlocked: false,
    unlockCondition: "entered_hostel",
    available: "00:00-23:59",
    description: "Three stalls. Wet tiles. The most terrifying room in the building.",
    objects: [
      { id: "toilet_stall", action: "Use the toilet", triggers: "arjun_first_pee_female",
        intimate: true, CRITICAL: true },
      { id: "shower_stall", action: "Take a shower", triggers: "arjun_first_shower_female",
        intimate: true },
      { id: "mirror_bathroom", action: "Look in mirror", triggers: "arjun_kavya_mirror_full" },
      { id: "sink", action: "Wash face", triggers: "face_wash_discovery" }
    ],
    npcs: ["random_hostel_girls_bathroom"],
    exits: [
      { to: "hostel_corridor", label: "Back to corridor" }
    ],
    WARNING: "Girls in towels, changing, casual nudity   Arjun must navigate without staring or panicking"
  },

  "bj_anatomy_hall_d3": {
    name: "Anatomy Dissection Hall   As Kavya",
    unlocked: false,
    unlockCondition: "signed_out_hostel AND time >= 08:30",
    available: "08:30-16:00",
    description: "Formalin. Cadavers. Everything Kavya warned you about, times a thousand.",
    objects: [
      { id: "dissection_table_d3", action: "Go to Kavya's table", triggers: "anatomy_horror_scene" },
      { id: "meera_note_pass", action: "Pass note to Meera", triggers: "anatomy_note_scene" },
      { id: "sneha_interaction", action: "Talk to Sneha", triggers: "sneha_suspicion_test" },
      { id: "specimen_jar", action: "Help with dropped specimen", triggers: "specimen_help_scene",
        sidequest: true }
    ],
    npcs: ["dr_sharma", "meera", "sneha_302", "lab_attendant"],
    exits: [
      { to: "bj_campus_path", label: "Exit to campus" }
    ]
  },

  "hostel_mess_d3": {
    name: "Hostel Mess   Eating as Kavya",
    unlocked: false,
    unlockCondition: "entered_hostel",
    available: "07:00-09:00, 12:00-14:00, 19:00-21:00",
    description: "The mess. You have to eat here. Sitting with girls. Being Kavya. Performing femininity.",
    objects: [
      { id: "food_counter_d3", action: "Get food", triggers: "mess_eating_scene" },
      { id: "sit_with_meera", action: "Sit beside Meera", triggers: "mess_meera_whisper" },
      { id: "priya_table", action: "Sit near Priya", triggers: "mess_priya_interaction",
        suspicion_check: true }
    ],
    npcs: ["mess_didi", "meera", "priya", "random_girls"],
    exits: [
      { to: "hostel_stairs", label: "Back to stairs" }
    ]
  },

  "hostel_terrace_d3": {
    name: "Hostel Terrace   Private Space",
    unlocked: false,
    unlockCondition: "time >= 14:00 OR priya_absent",
    available: "14:00-02:00",
    description: "The terrace. Private. A place to breathe in a body that isn't yours.",
    objects: [
      { id: "terrace_alone", action: "Stand at the railing", triggers: "terrace_body_reflection" },
      { id: "call_kavya", action: "Call Kavya on Redmi", triggers: "midday_check_in_call" },
      { id: "terrace_with_meera", action: "Sit with Meera on terrace", triggers: "meera_terrace_intimate",
        condition: "meera_available AND priya_absent", intimate: true }
    ],
    npcs: [],
    exits: [
      { to: "hostel_corridor", label: "Back downstairs" }
    ]
  }
};
```

### KAVYA (in Arjun's body)   PG & VIT WORLD

```javascript
const kavyaInArjun_locations_day3 = {

  "pataleshwar_swap_kavya": {
    // Same temple, Kavya's POV of the swap
    // After swap: she's in Arjun's body with the Pulsar
    objects: [
      { id: "pulsar_keys", action: "Take the Pulsar keys", triggers: "receive_keys" },
      { id: "arjun_body_check", action: "Look down at your new body", triggers: "kavya_first_body_check" },
      { id: "mount_pulsar", action: "Get on the Pulsar", triggers: "pulsar_first_ride" }
    ]
  },

  "ride_to_pg": {
    name: "Riding the Pulsar   First Time",
    unlocked: false,
    unlockCondition: "swap_complete AND has_pulsar_keys",
    available: "05:15-06:30",
    description: "150cc between your thighs. Manual clutch. Pune's dawn roads. Your body is six inches taller and forty pounds heavier.",
    objects: [
      { id: "throttle", action: "Open throttle", triggers: "pulsar_acceleration_scene" },
      { id: "clutch_practice", action: "Practice clutch control", triggers: "clutch_learning" },
      { id: "body_on_bike", action: "Feel the bike between your legs", triggers: "bike_body_awareness",
        intimate: true }
    ],
    exits: [
      { to: "katraj_pg_room_d3", label: "Arrive at PG" },
      { to: "vit_gate_d3", label: "Ride directly to VIT" }
    ]
  },

  "katraj_pg_room_d3": {
    name: "PG Room   As Arjun",
    unlocked: false,
    unlockCondition: "ride_complete",
    available: "00:00-23:59",
    description: "The room you've only heard described. Maggi towers. Gym bag chaos. Rohit. The LAPTOP.",
    objects: [
      { id: "arjun_laptop", action: "Open the laptop", triggers: "kavya_laptop_ecstasy",
        CRITICAL: true, note: "The moment she's been waiting for. Real keyboard. Real screen." },
      { id: "rohit_sleeping", action: "Look at Rohit", triggers: "rohit_sleeping_observation" },
      { id: "arjun_mirror", action: "Look in mirror", triggers: "kavya_sees_arjun_face" },
      { id: "arjun_wardrobe", action: "Open wardrobe", triggers: "male_wardrobe_exploration" },
      { id: "arjun_phone", action: "Check Arjun's phone", triggers: "phone_navigation" },
      { id: "meera_folder", action: "Find 'Important Documents' folder", triggers: "meera_photos_discovery",
        hidden: true },
      { id: "poetry_file", action: "Find love poetry text file", triggers: "arjun_poetry_discovery",
        hidden: true, note: "Found in browser bookmarks" }
    ],
    npcs: ["rohit"],
    exits: [
      { to: "pg_bathroom_d3", label: "Bathroom" },
      { to: "pg_stairs", label: "Downstairs" }
    ]
  },

  "pg_bathroom_d3": {
    name: "PG Bathroom   First Time Male",
    unlocked: true,
    available: "00:00-23:59",
    description: "Cracked tiles. One mirror. The urinal that awaits.",
    objects: [
      { id: "urinal", action: "Use the urinal", triggers: "kavya_first_pee_male_scene",
        intimate: true, CRITICAL: true },
      { id: "shower_d3", action: "Take a shower", triggers: "kavya_first_shower_male",
        intimate: true },
      { id: "mirror_d3", action: "Look in mirror", triggers: "kavya_arjun_mirror_full" },
      { id: "shaving", action: "Try shaving", triggers: "kavya_shaving_attempt",
        note: "Arjun's stubble needs attention. Kavya has never held a razor to a face." }
    ],
    exits: [
      { to: "katraj_pg_room_d3", label: "Back to room" }
    ]
  },

  "vit_gate_d3": {
    name: "VIT Gate   As Arjun",
    unlocked: false,
    unlockCondition: "time >= 09:00",
    available: "08:00-18:00",
    description: "The campus. HER campus now. The place she's dreamed about from phone screens and YouTube.",
    objects: [
      { id: "show_id", action: "Show Arjun's ID", triggers: "vit_entry_as_arjun" },
      { id: "look_around", action: "Take in the campus", triggers: "kavya_vit_wonder" }
    ],
    npcs: ["security_guard_patil"],
    exits: [
      { to: "vit_cblock_d3", label: "C-Block lectures" },
      { to: "vit_canteen", label: "Canteen" },
      { to: "vit_cs_lab_d3", label: "CS Lab" },
      { to: "vit_library", label: "Library" }
    ]
  },

  "vit_cblock_d3": {
    name: "C-Block   Data Structures with Krishnan",
    unlocked: false,
    unlockCondition: "entered_vit AND time >= 09:30",
    available: "09:00-17:00",
    description: "Room C-204. Prof. Krishnan. The whiteboard. The dream made real.",
    objects: [
      { id: "arjun_seat", action: "Sit in Arjun's seat", triggers: "kavya_takes_seat" },
      { id: "krishnan_lecture", action: "Listen to the lecture", triggers: "ds_lecture_scene",
        CRITICAL: true },
      { id: "raise_hand", action: "Answer Krishnan's question", triggers: "kavya_brilliant_answer",
        choice: true, note: "Risk: too brilliant = suspicion. Reward: academic ecstasy" },
      { id: "bonus_problem", action: "Solve the bonus problem on board", triggers: "bonus_problem_scene",
        sidequest: true, risk: "rohit_suspicion +3, krishnan_suspicion +2" }
    ],
    npcs: ["prof_krishnan", "rohit", "nikhil_classmate"],
    exits: [
      { to: "vit_canteen", label: "To canteen" },
      { to: "vit_cs_lab_d3", label: "To CS lab" }
    ]
  },

  "vit_cs_lab_d3": {
    name: "CS Computer Lab   The Real Setup",
    unlocked: false,
    unlockCondition: "entered_vit AND time >= 14:00",
    available: "09:00-17:00",
    description: "Rows of monitors. Mechanical keyboards. Dual screens. Paradise.",
    objects: [
      { id: "workstation_d3", action: "Sit at a terminal", triggers: "kavya_coding_ecstasy",
        CRITICAL: true },
      { id: "code_project", action: "Start the ML medical imaging project", triggers: "ml_project_scene" },
      { id: "arjun_files", action: "Browse Arjun's files", triggers: "file_exploration" }
    ],
    npcs: ["lab_assistant_suresh"],
    exits: [
      { to: "vit_cblock_d3", label: "Back to C-Block" }
    ]
  },

  "katraj_pg_room_evening": {
    name: "PG Room   Evening Alone",
    unlocked: false,
    unlockCondition: "time >= 17:00 AND rohit_at_gym",
    available: "17:00-20:00",
    description: "Rohit at the gym. The room is yours. The laptop is yours. Two hours of freedom.",
    objects: [
      { id: "code_session", action: "Code on the laptop", triggers: "kavya_evening_coding",
        CRITICAL: true },
      { id: "browse_bookmarks", action: "Check Arjun's browser bookmarks", triggers: "bookmarks_discovery" },
      { id: "body_exploration", action: "Look at Arjun's body properly", triggers: "kavya_body_exploration",
        intimate: true, condition: "rohit_at_gym" },
      { id: "first_erection_trigger", action: "Notice something... happening", triggers: "kavya_first_erection",
        intimate: true, condition: "time >= 17:30 AND alone",
        note: "Random erection while coding   the male body's unsolicited notifications" }
    ],
    npcs: [],
    exits: [
      { to: "pg_stairs", label: "Downstairs" }
    ]
  }
};
```

---

## OBJECTIVE SYSTEM   DAY 3

### ARJUN'S OBJECTIVES (in Kavya's body)

```javascript
const arjunObjectives_day3 = {
  main: [
    {
      id: "obj_complete_swap",
      title: "Complete the swap",
      description: "5 AM. Pataleshwar. Sit in the circle. Chant. Become someone else.",
      status: "active",
      completionTrigger: "swap_complete",
      unlocks: ["obj_enter_hostel"]
    },
    {
      id: "obj_enter_hostel",
      title: "Get into the hostel",
      description: "Walk past the chowkidar. Sign the register. Don't trip on the dupatta.",
      status: "locked",
      unlockCondition: "swap_complete",
      unlocks: ["obj_find_meera"],
      suspicion_risk: true
    },
    {
      id: "obj_find_meera",
      title: "Find Meera",
      description: "Room 304. She's waiting. Six months end now.",
      status: "locked",
      unlockCondition: "entered_hostel",
      unlocks: ["obj_survive_hostel_day"],
      completionTrigger: "meera_reunion_complete",
      reward: { rel_meera: +10 }
    },
    {
      id: "obj_survive_hostel_day",
      title: "Survive the day as Kavya",
      description: "Bathroom. Breakfast. Anatomy lecture. Priya's radar. Don't blow the cover.",
      status: "locked",
      unlockCondition: "meera_reunion_complete",
      unlocks: ["obj_swap_back"],
      subObjectives: [
        { id: "sub_pee", title: "Use the bathroom", trigger: "arjun_first_pee_female" },
        { id: "sub_meal", title: "Eat in the mess", trigger: "mess_meal_done" },
        { id: "sub_anatomy", title: "Survive anatomy lecture", trigger: "anatomy_done" },
        { id: "sub_priya", title: "Don't raise Priya's suspicion above 15", trigger: "priya_check" }
      ]
    },
    {
      id: "obj_swap_back",
      title: "Return to the temple for swap-back",
      description: "8 PM. Pataleshwar. Get your body back. Process everything.",
      status: "locked",
      unlockCondition: "time >= 19:30",
      completionTrigger: "swap_back_complete"
    }
  ],

  side: [
    {
      id: "sq_specimen_jar",
      title: "Help with the Dropped Specimen",
      description: "A student drops a jar in anatomy. Show empathy. Dr. Sharma will notice.",
      location: "bj_anatomy_hall_d3",
      reward: { med_knowledge: +3, dr_sharma_relationship: +3 },
      risk: "None   empathy is in-character for Kavya"
    },
    {
      id: "sq_manuscript_organize",
      title: "Help Meera Organize the Manuscript",
      description: "Structure the Sanskrit text into something they can reference later.",
      location: "hostel_room_304_d3",
      reward: { rel_meera: +5, manuscript_understanding: +2 },
      unlockCondition: "meera_reunion_complete AND priya_absent"
    },
    {
      id: "sq_sneha_interact",
      title: "Survive Sneha's Conversation",
      description: "Sneha wants to talk pharmacology. You know nothing about pharmacology.",
      location: "bj_campus_path OR hostel_corridor",
      reward: { suspicion: -2 if handled well },
      risk: "sneha_suspicion +5 if you say something medically stupid"
    },
    {
      id: "sq_priya_photo_request",
      title: "Priya's Daily Instagram Ask",
      description: "She wants another photo. You have to be Kavya enough to take it.",
      location: "hostel_room_304_d3 OR bj_campus_path",
      reward: { priya_suspicion: -3, rel_priya: +2 }
    },
    {
      id: "sq_hostel_shower",
      title: "Take a Shower (Optional but needed)",
      description: "You've been sweating since dawn. Kavya's body needs a wash. This means... everything.",
      location: "hostel_bathroom_d3",
      intimate: true,
      reward: { body_discovery: +10, fem_comfort: +5 }
    },
    {
      id: "sq_terrace_meera",
      title: "Terrace Time with Meera",
      description: "Alone. Finally. Under the sky. In a body she doesn't recognize but eyes she does.",
      location: "hostel_terrace_d3",
      intimate: true,
      reward: { rel_meera: +5 },
      unlockCondition: "priya_absent AND time >= 14:00"
    },
    {
      id: "sq_explore_kavya_things",
      title: "Explore Kavya's Hidden Life",
      description: "Her cupboard. Her hidden clothes. The jeans. The crop top. The denim jacket.",
      location: "hostel_room_304_d3",
      reward: { rel_kavya: +3, understanding: +5 }
    }
  ]
};
```

### KAVYA'S OBJECTIVES (in Arjun's body)

```javascript
const kavyaObjectives_day3 = {
  main: [
    {
      id: "obj_complete_swap_k",
      title: "Complete the swap",
      description: "Become Arjun. Take his keys. Take his bike. Take his life for twelve hours.",
      status: "active",
      completionTrigger: "swap_complete",
      unlocks: ["obj_ride_pulsar"]
    },
    {
      id: "obj_ride_pulsar",
      title: "Ride the Pulsar to civilization",
      description: "150cc. Manual clutch. Don't die. Don't drop the bike. Arjun will kill you.",
      status: "locked",
      unlockCondition: "swap_complete AND has_pulsar_keys",
      unlocks: ["obj_navigate_pg"],
      completionTrigger: "ride_complete"
    },
    {
      id: "obj_navigate_pg",
      title: "Survive the PG room",
      description: "Enter the room. Face Rohit. Be Arjun. Don't sway your hips.",
      status: "locked",
      unlockCondition: "ride_complete",
      unlocks: ["obj_attend_cs"],
      suspicion_risk: true
    },
    {
      id: "obj_attend_cs",
      title: "Attend CS classes at VIT",
      description: "The dream. The whole reason. Prof. Krishnan. Data Structures. Go.",
      status: "locked",
      unlockCondition: "time >= 09:30 AND navigate_pg_done",
      unlocks: ["obj_code_real"],
      completionTrigger: "cs_lecture_attended",
      reward: { coding_skill: +5 }
    },
    {
      id: "obj_code_real",
      title: "Code on a real setup",
      description: "A laptop. A keyboard. VS Code. Dual monitors. Cry if you need to.",
      status: "locked",
      unlockCondition: "cs_lecture_attended AND (time >= 14:00 OR rohit_at_gym)",
      completionTrigger: "real_coding_done",
      reward: { coding_skill: +10 }
    },
    {
      id: "obj_swap_back_k",
      title: "Return for swap-back",
      description: "8 PM. Pataleshwar. Give the body back. Keep the memory.",
      status: "locked",
      unlockCondition: "time >= 19:30",
      completionTrigger: "swap_back_complete"
    }
  ],

  side: [
    {
      id: "sq_fix_amit_laptop",
      title: "Fix Amit's Virus",
      description: "PG boy's laptop has malware. Easy for you. Good for cover.",
      location: "katraj_pg_room_d3",
      reward: { rel_amit: +3, coding_skill: +2, pg_trust: +5 }
    },
    {
      id: "sq_krishnan_bonus",
      title: "Solve Krishnan's Bonus Problem",
      description: "Red-Black tree deletion optimization. You KNOW this. But solving it will raise flags.",
      location: "vit_cblock_d3",
      reward: { coding_skill: +5, krishnan_rel: +5 },
      risk: "rohit_suspicion +3, krishnan_suspicion +2"
    },
    {
      id: "sq_canteen_rohit",
      title: "Survive Lunch with Rohit",
      description: "He's your best friend. Except he's not. He's Arjun's. And he's watching.",
      location: "vit_canteen",
      reward: { rohit_suspicion: -2 if handled well }
    },
    {
      id: "sq_first_pee_urinal",
      title: "Use the Urinal",
      description: "Standing. Aiming. In public. The most basic masculine act and you've never done it.",
      location: "vit_bathroom OR pg_bathroom_d3",
      intimate: true,
      reward: { masc_comfort: +5 }
    },
    {
      id: "sq_explore_arjun_body",
      title: "Explore Arjun's Body Properly",
      description: "Rohit's at the gym. The door is locked. This is your chance to understand what you're wearing.",
      location: "katraj_pg_room_evening",
      intimate: true,
      reward: { masc_comfort: +10, body_discovery: +10 },
      unlockCondition: "rohit_at_gym"
    },
    {
      id: "sq_shaving",
      title: "Try Shaving",
      description: "Arjun's stubble is getting noticeable. You've never held a razor to a face.",
      location: "pg_bathroom_d3",
      reward: { masc_comfort: +3 },
      risk: "Cuts possible. Arjun will see them on swap-back."
    },
    {
      id: "sq_nikhil_icpc_prep",
      title: "ICPC Prep with Nikhil",
      description: "He thinks you're Arjun. You're about to obliterate his expectations.",
      location: "vit_cs_lab_d3 OR vit_canteen",
      reward: { coding_skill: +5, nikhil_rel: +3 },
      unlockCondition: "icpc_partner_agreed"
    },
    {
      id: "sq_poetry_discovery",
      title: "Arjun's Secret Poetry",
      description: "Browser bookmarks. 'For Meera' folder. He writes love poems. They're... good.",
      location: "katraj_pg_room_d3",
      reward: { rel_arjun: +3, understanding: +5 },
      hidden: true
    }
  ]
};
```

---

## INTIMATE SCENE PLACEMENT   DAY 3

```
DAY 3 INTIMATE SCENES   THE FIRST SWAP DAY
All scenes are FIRST-TIME body experiences. Maximize detail and emotional impact.

═══════════════════════════════════════════
ARJUN (in Kavya's body):
═══════════════════════════════════════════

1. FIRST BODY CHECK (Temple courtyard, 5:10 AM)
   - Trigger: Immediately post-swap
   - Content: Height loss. Hair everywhere. Weight on chest. Hips wider.
     No Adam's apple. Voice change. Hands smaller. The ABSENCE between legs.
     Everything catalogued in shock.
   - File: day3_intimate.tw → "arjun_first_kavya_body"

2. FIRST PEE   FEMALE (Hostel bathroom, ~6:45 AM)
   - Trigger: Player uses toilet_stall in hostel_bathroom_d3
   - Content: FULL SCENE. Pulling down salwar. Pulling down panty. Sitting.
     The absence where penis should be. Seeing the vulva for the first time
     from THIS angle   attached, his. Pee flowing differently   no arc, no aim,
     warmth and proximity. Wiping front to back (Meera coached him). Fingers
     touching folds involuntarily   a shiver. The vulnerability of sitting
     to pee, foot bracing the broken door. Washing hands fourteen times.
   - File: day3_intimate.tw → "arjun_first_pee_female"

3. BREASTS   Ongoing Awareness (Throughout the day)
   - Not a single scene but persistent state descriptions.
   - Walking: they bounce, he has to hold them running up stairs.
   - Sitting: they rest on his (her) ribcage, weight constant.
   - The bra: underwire pressing, straps digging, the compression.
   - Lying down: they fall to the sides, different feeling from standing.
   - Code: Insert breast-awareness lines into EVERY scene.
   - File: woven into all day3_arjun_scenes.tw passages

4. SHOWER   FEMALE (Optional side quest, hostel bathroom)
   - Trigger: sq_hostel_shower
   - Content: Full shower scene. Stripping Kavya's clothes. The bra removal  
     three hooks, the relief as compression releases, breasts settling free.
     Seeing Kavya's body in the small mirror   dusky skin, curves, the beauty
     mark. Washing: different body geography. Breasts   soaping them, the
     nipples hardening at water temperature (involuntary), the weight when
     lifting to wash underneath. Between legs: washing the vulva, the
     sensitivity, every fold responsive. Buttocks, thighs, the different
     hair pattern. Drying off: the towel catches on curves differently.
     Putting the bra BACK ON   the fumbling, the hooks, the adjustment.
   - File: day3_intimate.tw → "arjun_shower_kavya_body"

5. MEERA INTIMACY   Terrace (Afternoon, if unlocked)
   - Trigger: sq_terrace_meera
   - Content: Alone with Meera. She looks at Kavya's face and sees Arjun's
     eyes. She touches his (Kavya's) cheek. He feels it through Kavya's skin  
     MORE sensitive, the nerve density higher. She kisses his forehead.
     The sensation radiates through Kavya's entire face. He wants to kiss her
     mouth   PLAYER CHOICE: attempt the kiss or hold back.
     IF KISS: Meera kisses Kavya's lips. It's technically girl-on-girl.
     The sensation is different   softer lips, no stubble friction, Kavya's
     mouth is shaped differently. Meera's tongue against his (Kavya's) lip.
     Arousal manifests differently   warmth between legs, not hardness.
     A clitoral pulse. Wetness beginning. He pulls back, overwhelmed.
     IF HOLD BACK: They hold each other. His (Kavya's) head on her
     shoulder. Her hand in Kavya's hair. Tender without escalation.
   - File: day3_intimate.tw → "meera_terrace_kiss_choice"

6. CRYING   Emotional Amplification (Multiple)
   - Kavya's body produces tears faster, more readily.
   - Seeing Meera: instant tears (Scene 5 of bible).
   - Formalin smell: eyes water dramatically.
   - Evening tiredness: emotional fatigue hits harder.
   - Code: Insert tear/emotion references throughout.

═══════════════════════════════════════════
KAVYA (in Arjun's body):
═══════════════════════════════════════════

1. FIRST BODY CHECK (Temple courtyard, 5:10 AM)
   - Trigger: Immediately post-swap
   - Content: HEIGHT. The world lower. Hands huge. Voice deep. Flat chest  
     the freedom, the absence of bra/weight. The PRESENCE between legs  
     penis and testicles, warm, soft, THERE. Jeans sitting on narrow hips.
     Shoulders broad. Adam's apple. Stubble on jaw.
   - File: day3_intimate.tw → "kavya_first_arjun_body"

2. BIKE BODY AWARENESS (Pulsar ride, 5:20 AM)
   - Trigger: ride_to_pg
   - Content: Straddling the bike. Thighs parting around the tank   the
     genitals pressed against the seat. Adjusting position to accommodate.
     The testicles' negotiation with the fuel tank. Wind on a face with no
     dupatta, no hair whipping. The freedom of a body built for machines.
   - File: day3_intimate.tw → "kavya_pulsar_body"

3. FIRST PEE   MALE, URINAL (VIT bathroom, ~12:15 PM)
   - Trigger: sq_first_pee_urinal
   - Content: FULL SCENE. The men's bathroom. Row of urinals. Other boys
     standing casually. She unzips. Reaches in. Finds the penis   warm,
     soft, absurd. Extracts it through the fly. Aims. Releases   the stream
     arcs WRONG, hits the porcelain edge. Adjusts. Better. The sensation:
     concentrated, external, directional. Like a hose. The satisfying
     physics of aimed urination. Two shakes (the protocol). Tuck. Zip.
     Hands washed (she's the only one who does). Walking out   realizing
     the entire transaction took 45 seconds. In her body: 3 minutes minimum.
   - File: day3_intimate.tw → "kavya_first_pee_male"

4. FIRST ERECTION (PG room evening, ~5:30 PM)
   - Trigger: sq_explore_arjun_body OR random trigger during coding
   - Content: FULL SCENE. She's coding. Focused. In the zone. And then  
     something shifts. Between her legs, the penis begins to thicken.
     Not from arousal   from nothing. A random erection, the male body's
     unsolicited push notification. She feels it growing against her thigh
     inside the jeans, the fabric tightening. The sensation is bizarre  
     blood filling tissue, the organ lifting, stiffening, pressing against
     the denim. She looks down   there's a visible bulge in the jeans.
     She panics. Shifts in the chair. The movement makes it WORSE   the
     friction of denim against the sensitized head sends a jolt through
     her pelvis. She gasps. Arjun's voice, gasping.
     She sits very still. Waits. Thinks about anatomy lectures, Cockcroft-
     Gault equations, anything unsexual. Slowly, the erection subsides.
     The penis softens, retreats, returns to its resting state. The whole
     event lasted four minutes.
     She sits there, hands on the keyboard, and thinks: boys deal with
     this RANDOMLY? REGULARLY? Without warning? How do they get anything
     done?
   - File: day3_intimate.tw → "kavya_first_erection"

5. BODY EXPLORATION   MALE (PG room, Rohit at gym)
   - Trigger: sq_explore_arjun_body, rohit_at_gym
   - Content: FULL SCENE. Door locked. She stands in front of the mirror.
     Removes Arjun's t-shirt. His chest   flat, lean, pectoral muscles
     defined. No bra strap groove. No breast weight. She runs her hands
     across   the skin is different, slightly rougher, hair on the chest
     (sparse). The nipples are smaller, flatter, less sensitive when touched.
     She flexes   the muscles respond differently, more visibly.
     She unbuttons the jeans. Pulls them down. Boxer briefs underneath.
     The bulge. She pulls the waistband forward, looks down   the penis,
     resting, surrounded by dark hair. Testicles below, tucked in the
     scrotum. She touches   gently, clinically. The penis shifts at her
     touch, starts to respond (semi-erection from stimulus). She pulls
     her hand back. Not now. Not today. This is reconnaissance, not
     recreation.
     She pulls the jeans back up. Puts the shirt on. Sits at the laptop.
     But the data is archived: the weight, the warmth, the vulnerability
     of external genitalia, the different geography of a male body.
   - File: day3_intimate.tw → "kavya_body_exploration_male"

6. SHOWER   MALE (PG bathroom, morning or evening)
   - Trigger: Player selects shower in pg_bathroom_d3
   - Content: Standing under the water. Arjun's body under hot spray  
     broad shoulders catching the stream. Soaping the flat chest, the
     abs. Reaching his (her) cock   washing it, the foreskin, pulling
     back, the sensitivity of the head under water. The testicles  
     they tighten in the heat, then relax. Washing between the buttocks.
     The body hair   more of it, coarser. The ease of it   no breasts
     to lift and wash under, no complex folds to clean. Four minutes.
     Done. Towel. The simplicity.
   - File: day3_intimate.tw → "kavya_shower_male_body"

7. NO-BRA FREEDOM (Throughout the day)
   - Persistent state. Every scene should reference the absence of
     compression, the freedom of movement, the flat chest under fabric.
   - Woven into all scenes.
```

---

## NPC INTERACTION PLACEMENT   DAY 3

```
ARJUN-AS-KAVYA NPC SCENES:

1. CHOWKIDAR RAMESH   Gate test (first suspicion check)
2. MEERA   Reunion (CRITICAL emotional core)
3. PRIYA   Multiple (the threat, breakfast, evening)
4. SNEHA   Corridor (pharmacology talk   danger zone)
5. DR. SHARMA   Anatomy (handwriting test, specimen jar)
6. MESS DIDI   Meals (comments on "Kavya eating more today")
7. RANDOM HOSTEL GIRLS   Bathroom/corridor (casual femininity Arjun must mimic)
8. MRS. JOSHI   If rounds occur (highest stakes)
9. MEERA   Afternoon alone (intimate, terrace option)
10. KAVYA (phone)   Check-in call from Redmi

KAVYA-AS-ARJUN NPC SCENES:

1. ROHIT   Morning PG (first test   can she be Arjun?)
2. PG CHAI BOYS   Common area (performing masculinity)
3. AMIT   PG boy, laptop virus (side quest)
4. RAJU BHAIYA   Tapri (free chai follow-up)
5. SECURITY GUARD PATIL   VIT gate
6. PROF. KRISHNAN   Lecture (the brilliant answer scene)
7. ROHIT   Canteen (sustained test, lunch conversation)
8. NIKHIL   ICPC prep (coding conversation)
9. CANTEEN ANNA   Food order (test: does she know Arjun's usual?)
10. LAB ASSISTANT   CS lab access
11. RANDOM VIT BOYS   Back-slapping, casual masculinity
12. ARJUN (phone)   Check-in call
```

---

## STATS AT END OF DAY 3

### ARJUN   End of Day 3
```javascript
$arjun_stats_day3_end = {
  coding_skill: 88,
  med_knowledge: 8,         // +3 from anatomy survival
  fem_comfort: 15,          // +15 from first full day
  sex_exp_male: 15,
  sex_exp_female: 5,        // +5 from body discovery
  rel_meera: 100,           // +10 reunion (capped)
  rel_kavya: 40,            // +5 from shared experience
  rel_rohit: "unchanged",   // Wasn't with Rohit today
  suspicion_priya: "variable",
  suspicion_sharma: "variable",
  money: 0,                 // Kavya's wallet
  mood: "overwhelmed_grateful",
  energy: 20,
  bodies_inhabited: ["self", "kavya"],
  first_swap_complete: true,
  discoveries: ["breasts", "no_penis", "female_pee", "tears", "hips",
                 "hair", "bra", "dupatta", "voice", "height_loss"]
};
```

### KAVYA   End of Day 3
```javascript
$kavya_stats_day3_end = {
  coding_skill: 85,         // +10 from real coding session
  med_knowledge: 49,
  masc_comfort: 15,         // +15 from first full day
  sex_exp_female: 10,
  sex_exp_male: 5,          // +5 from body discovery
  rel_arjun: 43,            // +5 from shared experience
  rel_meera: 90,
  suspicion_rohit: "variable",
  suspicion_krishnan: "variable",
  money: "arjun_wallet",
  mood: "euphoric_grieving", // Joy at coding, grief at losing it tonight
  energy: 25,
  bodies_inhabited: ["self", "meera_test", "arjun"],
  first_swap_complete: true,
  discoveries: ["flat_chest", "penis", "testicles", "male_pee",
                 "erection", "height", "voice", "hand_span",
                 "no_bra", "stubble", "pulsar"]
};
```
