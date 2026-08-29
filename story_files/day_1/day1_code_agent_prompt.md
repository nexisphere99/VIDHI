# DAY 1   CODE AGENT PROMPT: Open World Integration
## "Qaid" (Captivity)   Objective-Driven Exploration

---

## CORE ARCHITECTURE PRINCIPLE

**This is NOT a linear visual novel. This is an open-world exploration game.**

The player wakes up in a location. They see their room. They can interact with objects. They receive objectives. They must DISCOVER how to reach the next scene by exploring locations, talking to NPCs, and fulfilling unlock conditions. Never auto-advance from scene to scene.

```
WRONG: Scene 1 ends → Scene 2 begins automatically
RIGHT: Scene 1 ends → Player is in LOCATION with OBJECTS → Player must navigate/interact → Unlock condition met → New location/scene becomes available
```

---

## FILE STRUCTURE   DAY 1

```
/game/
├── css/
│   └── game-styles.css           # UI, map, inventory, phone styling
├── js/
│   └── game-engine.js            # Open world engine, location system, NPC AI
├── days/
│   └── day1/
│       ├── day1_init.tw          # Day 1 variable initialization
│       ├── day1_arjun_hub.tw     # Arjun's location hub (open world navigation)
│       ├── day1_arjun_scenes.tw  # Arjun's main story scenes (gated by objectives)
│       ├── day1_arjun_npc.tw     # Arjun's NPC interactions & side quests
│       ├── day1_kavya_hub.tw     # Kavya's location hub (open world navigation)
│       ├── day1_kavya_scenes.tw  # Kavya's main story scenes (gated by objectives)
│       ├── day1_kavya_npc.tw     # Kavya's NPC interactions & side quests
│       ├── day1_shared.tw        # Shared events (phone calls, messages, time-based)
│       └── day1_intimate.tw      # Locked intimate/sexual scenes (both characters)
├── systems/
│   ├── phone_system.tw           # WhatsApp, calls, Instagram, contacts
│   ├── inventory_system.tw       # Items, wallet, keys, documents
│   ├── map_system.tw             # Location navigation with travel times
│   ├── time_system.tw            # Clock progression, time-gated events
│   ├── objective_tracker.tw      # Quest log / objective display
│   ├── stats_display.tw          # Character stats panel
│   └── suspicion_system.tw       # NPC suspicion tracking
├── index.html                    # Main Twine SugarCube entry
/images/
        └── day1/
            ├── locations/         # Location backgrounds
            ├── characters/        # Character portraits & expressions
            ├── objects/           # Interactive object sprites
            └── scenes/            # Scene-specific illustrations
```

---

## LOCATION SYSTEM   DAY 1

### ARJUN'S AVAILABLE LOCATIONS

Each location has: unlock condition, available time window, NPCs present, interactive objects, and connected scenes.

```javascript
// DAY 1   ARJUN LOCATION REGISTRY
const arjunLocations_day1 = {

  "katraj_pg_room": {
    name: "PG Room   Katraj",
    unlocked: true,  // Starting location
    available: "00:00-23:59",
    description: "Shared room with Rohit. Two cots, one desk, chaos incarnate.",
    objects: [
      { id: "phone", action: "Check phone", triggers: "phone_menu" },
      { id: "laptop", action: "Open laptop", triggers: "laptop_interaction" },
      { id: "meera_photos", action: "Look at saved photos", triggers: "meera_gallery", unlockCondition: "phone_checked" },
      { id: "mirror", action: "Look in mirror", triggers: "arjun_mirror_scene" },
      { id: "rohit_bed", action: "Wake up Rohit", triggers: "rohit_morning_talk", timeWindow: "06:00-08:00" },
      { id: "pulsar_keys", action: "Grab Pulsar keys", triggers: "add_to_inventory", item: "bike_keys" },
      { id: "wardrobe", action: "Get dressed", triggers: "clothing_choice" },
      { id: "dbms_notebook", action: "Check assignment", triggers: "dbms_status" },
      { id: "window", action: "Look outside", triggers: "katraj_morning_view" }
    ],
    npcs: ["rohit"],
    exits: [
      { to: "pg_bathroom", label: "Go to bathroom" },
      { to: "pg_stairs", label: "Go downstairs" }
    ],
    image: "katraj_pg_room.png"
  },

  "pg_bathroom": {
    name: "Shared Bathroom",
    unlocked: true,
    available: "00:00-23:59",
    description: "Cracked tiles, one working shower, mirror with attitude.",
    objects: [
      { id: "mirror_bathroom", action: "Look at yourself", triggers: "arjun_bathroom_mirror" },
      { id: "shower", action: "Take a shower", triggers: "arjun_shower_scene", intimate: true },
      { id: "toothbrush", action: "Brush teeth", triggers: "morning_routine" },
      { id: "shaving_kit", action: "Shave", triggers: "shaving_scene" }
    ],
    npcs: ["random_pg_boy"],
    exits: [
      { to: "katraj_pg_room", label: "Back to room" }
    ],
    image: "pg_bathroom.png"
  },

  "pg_stairs": {
    name: "PG Building   Stairs/Entrance",
    unlocked: true,
    available: "00:00-23:59",
    description: "Narrow staircase, landlord's motorcycle blocking half the entrance.",
    objects: [
      { id: "noticeboard", action: "Read notice board", triggers: "pg_notices" },
      { id: "landlord_door", action: "Knock on landlord's door", triggers: "landlord_interaction", timeWindow: "09:00-21:00" }
    ],
    npcs: ["pg_landlord_sharma"],
    exits: [
      { to: "katraj_pg_room", label: "Go upstairs" },
      { to: "tapri_chai", label: "Go to chai tapri" },
      { to: "katraj_street", label: "Exit to street" }
    ]
  },

  "tapri_chai": {
    name: "Raju Bhaiya's Chai Tapri",
    unlocked: true,
    available: "06:00-22:00",
    description: "Tin-roofed roadside stall. Steam, biscuits, gossip.",
    objects: [
      { id: "chai_order", action: "Order cutting chai", triggers: "chai_scene" },
      { id: "biscuit_jar", action: "Buy Parle-G", triggers: "buy_biscuit", cost: 10 },
      { id: "newspaper", action: "Read newspaper", triggers: "news_of_day" },
      { id: "raju_phone", action: "Look at Raju's cracked phone", triggers: "raju_phone_sidequest", unlockCondition: "talked_to_raju" }
    ],
    npcs: ["raju_bhaiya", "random_tapri_customer"],
    exits: [
      { to: "pg_stairs", label: "Back to PG" },
      { to: "katraj_street", label: "Walk to road" }
    ],
    sidequest: "fix_raju_phone",
    image: "tapri_chai.png"
  },

  "katraj_street": {
    name: "Katraj Main Road",
    unlocked: true,
    available: "05:00-23:00",
    description: "Busy road. Autos, bikes, a cow that owns the middle lane.",
    objects: [
      { id: "pulsar_parked", action: "Get on Pulsar", triggers: "bike_travel_menu", requires: "bike_keys" },
      { id: "auto_stand", action: "Take an auto", triggers: "auto_travel_menu" },
      { id: "panwala", action: "Talk to panwala", triggers: "panwala_interaction" },
      { id: "stray_dog", action: "Pet the stray dog", triggers: "stray_dog_scene" },
      { id: "fruit_vendor", action: "Buy fruit from vendor", triggers: "fruit_vendor_npc" }
    ],
    npcs: ["panwala_bhau", "fruit_vendor_tai", "random_passerby"],
    exits: [
      { to: "tapri_chai", label: "Chai tapri" },
      { to: "pg_stairs", label: "Back to PG" }
    ],
    travelDestinations: [
      { to: "vit_gate", travelTime: 15, method: "pulsar", label: "Ride to VIT (15 min)" },
      { to: "sinhagad_road", travelTime: 10, method: "pulsar", label: "Ride toward Sinhagad Road (10 min)" },
      { to: "katraj_snake_park", travelTime: 5, method: "walk", label: "Walk to Snake Park area (5 min)" },
      { to: "kothrud_home", travelTime: 25, method: "pulsar", label: "Ride home to Kothrud (25 min)" },
      { to: "bj_medical_area", travelTime: 20, method: "pulsar", label: "Ride toward B.J. Medical (20 min)", unlockCondition: "rohit_reveals_meera_sighting" }
    ]
  },

  "vit_gate": {
    name: "VIT Main Gate",
    unlocked: false,
    unlockCondition: "time >= 08:30 AND has_bike_keys",
    available: "08:00-18:00",
    description: "Security booth, ID check, bike parking chaos.",
    objects: [
      { id: "parking", action: "Park the Pulsar", triggers: "vit_parking" },
      { id: "id_card", action: "Show ID to guard", triggers: "vit_entry" },
      { id: "notice_wall", action: "Check campus notices", triggers: "vit_notices" },
      { id: "vending_machine", action: "Buy cold drink", triggers: "vending_purchase", cost: 20 }
    ],
    npcs: ["security_guard_patil", "random_vit_student"],
    exits: [
      { to: "vit_cblock", label: "C-Block (Lecture Halls)" },
      { to: "vit_canteen", label: "Canteen" },
      { to: "vit_library", label: "Library" },
      { to: "vit_ground", label: "Sports Ground" },
      { to: "katraj_street", label: "Exit campus" }
    ],
    image: "vit_gate.png"
  },

  "vit_cblock": {
    name: "VIT C-Block   Lecture Halls",
    unlocked: false,
    unlockCondition: "entered_vit",
    available: "08:30-17:00",
    description: "Corridors smell of chalk dust and broken dreams. Room C-204 has the DBMS lecture.",
    objects: [
      { id: "classroom_door", action: "Enter DBMS class", triggers: "dbms_lecture_scene", timeWindow: "09:45-11:00" },
      { id: "water_cooler", action: "Fill water bottle", triggers: "water_cooler_encounter" },
      { id: "notice_board_cs", action: "CS department notices", triggers: "cs_notices" },
      { id: "bench_corridor", action: "Sit on corridor bench", triggers: "corridor_rest" }
    ],
    npcs: ["nikhil_classmate", "prof_krishnan", "random_cse_student"],
    exits: [
      { to: "vit_canteen", label: "To canteen" },
      { to: "vit_gate", label: "To main gate" },
      { to: "vit_cs_lab", label: "CS Lab" }
    ]
  },

  "vit_canteen": {
    name: "VIT Canteen",
    unlocked: false,
    unlockCondition: "entered_vit",
    available: "08:00-17:30",
    description: "Steel plates, masala dosa smell, a hundred conversations at once.",
    objects: [
      { id: "food_counter", action: "Order food", triggers: "canteen_menu" },
      { id: "rohit_table", action: "Sit with Rohit", triggers: "rohit_canteen_confrontation", unlockCondition: "dbms_lecture_done" },
      { id: "corner_table", action: "Sit alone", triggers: "arjun_alone_canteen" },
      { id: "tv_screen", action: "Watch news on canteen TV", triggers: "canteen_tv" }
    ],
    npcs: ["rohit", "nikhil_classmate", "canteen_anna", "random_canteen_girls"],
    exits: [
      { to: "vit_cblock", label: "Back to C-Block" },
      { to: "vit_gate", label: "Main gate" },
      { to: "vit_ground", label: "Sports ground" }
    ],
    image: "vit_canteen.png"
  },

  "vit_cs_lab": {
    name: "CS Computer Lab",
    unlocked: false,
    unlockCondition: "entered_vit AND time >= 14:00",
    available: "09:00-17:00",
    description: "Rows of Dell monitors. AC that works sometimes. The lab assistant guards the door like Cerberus.",
    objects: [
      { id: "workstation", action: "Sit at a terminal", triggers: "lab_coding_session" },
      { id: "lab_printer", action: "Print assignment", triggers: "print_dbms", unlockCondition: "dbms_assignment_done" }
    ],
    npcs: ["lab_assistant_suresh", "random_lab_student"],
    exits: [
      { to: "vit_cblock", label: "Back to C-Block" }
    ]
  },

  "vit_library": {
    name: "VIT Library",
    unlocked: false,
    unlockCondition: "entered_vit",
    available: "08:30-20:00",
    description: "Quiet. Cool. The only place on campus where silence is enforced and AC works reliably.",
    objects: [
      { id: "cs_section", action: "Browse CS textbooks", triggers: "library_cs_browse" },
      { id: "study_desk", action: "Study", triggers: "library_study_session" },
      { id: "charging_point", action: "Charge phone", triggers: "phone_charging" }
    ],
    npcs: ["librarian_madam", "studious_girl_ananya"],
    exits: [
      { to: "vit_gate", label: "Back to gate" }
    ]
  },

  "vit_ground": {
    name: "VIT Sports Ground",
    unlocked: false,
    unlockCondition: "entered_vit",
    available: "06:00-19:00",
    description: "Cricket pitch, basketball court, boys smoking behind the stands.",
    objects: [
      { id: "basketball_court", action: "Shoot hoops", triggers: "basketball_scene" },
      { id: "bench_ground", action: "Sit and think", triggers: "arjun_ground_reflection" },
      { id: "smoking_spot", action: "Go behind stands", triggers: "smoking_spot_encounter" }
    ],
    npcs: ["sports_boys_group", "random_couple"],
    exits: [
      { to: "vit_canteen", label: "To canteen" },
      { to: "vit_gate", label: "To gate" }
    ]
  },

  "sinhagad_road": {
    name: "Sinhagad Road   Evening Ride",
    unlocked: false,
    unlockCondition: "has_bike_keys AND time >= 17:00",
    available: "05:00-23:00",
    description: "The road curves up toward the fort. City lights below, wind in your hair.",
    objects: [
      { id: "chai_dhaba", action: "Stop at roadside dhaba", triggers: "sinhagad_dhaba_scene" },
      { id: "viewpoint", action: "Park at viewpoint", triggers: "sinhagad_reflection_scene" },
      { id: "phone_call_spot", action: "Try calling Meera from here", triggers: "meera_call_attempt_sinhagad" }
    ],
    npcs: ["dhaba_owner", "random_bikers"],
    exits: [
      { to: "katraj_street", label: "Ride back to Katraj" }
    ]
  },

  "katraj_snake_park": {
    name: "Katraj Snake Park / Lake Area",
    unlocked: true,
    available: "06:00-18:00",
    description: "Morning joggers, the lake reflecting grey sky, snake park entrance nearby.",
    objects: [
      { id: "lake_bench", action: "Sit by the lake", triggers: "lake_reflection" },
      { id: "jogging_track", action: "Go for a walk", triggers: "katraj_walk" },
      { id: "ice_cream_wala", action: "Buy ice cream", triggers: "ice_cream_vendor_npc", cost: 30 }
    ],
    npcs: ["morning_jogger_uncle", "college_girls_group", "ice_cream_vendor"],
    exits: [
      { to: "katraj_street", label: "Back to main road" }
    ]
  },

  "kothrud_home": {
    name: "Deshmukh Family Home   Kothrud",
    unlocked: true,
    available: "00:00-23:59",
    description: "2BHK. Smells of Aai's cooking. Pooja's school books on the sofa. Papa's LIC calendar.",
    objects: [
      { id: "aai_kitchen", action: "Talk to Aai", triggers: "sunita_interaction" },
      { id: "papa_chair", action: "Talk to Papa", triggers: "suresh_interaction", timeWindow: "18:00-22:00" },
      { id: "pooja_room", action: "Annoy Pooja", triggers: "pooja_interaction" },
      { id: "home_food", action: "Eat home food", triggers: "home_meal_scene" },
      { id: "old_room", action: "Visit your old room", triggers: "arjun_childhood_room" }
    ],
    npcs: ["aai_sunita", "papa_suresh", "pooja_sister"],
    exits: [
      { to: "katraj_street", label: "Ride back to PG (25 min)" }
    ],
    image: "kothrud_home.png"
  },

  "bj_medical_area": {
    name: "B.J. Medical College   Outside Gate",
    unlocked: false,
    unlockCondition: "rohit_reveals_meera_sighting",
    available: "00:00-23:59",
    description: "You can see the hostel building from here. Close enough to ache.",
    objects: [
      { id: "hostel_windows", action: "Look at hostel windows", triggers: "arjun_watches_hostel" },
      { id: "phone_booth", action: "Try hostel landline", triggers: "hostel_landline_call" },
      { id: "pco_stall", action: "Use PCO for different number", triggers: "pco_call_attempt" }
    ],
    npcs: ["chai_vendor_outside_bj", "random_medical_students"],
    exits: [
      { to: "katraj_street", label: "Ride back" }
    ]
  }
};
```

### KAVYA'S AVAILABLE LOCATIONS

```javascript
// DAY 1   KAVYA LOCATION REGISTRY
const kavyaLocations_day1 = {

  "hostel_room_304": {
    name: "Room 304   B.J. Medical Girls Hostel",
    unlocked: true,  // Starting location
    available: "00:00-23:59",
    description: "Three beds, twenty square meters, three lives colliding.",
    objects: [
      { id: "phone_samsung", action: "Check Samsung (official phone)", triggers: "samsung_phone_menu" },
      { id: "phone_redmi", action: "Check Redmi (secret phone)", triggers: "redmi_phone_menu", hidden: true, findCondition: "search_under_mattress" },
      { id: "meera_bed", action: "Look at Meera", triggers: "meera_observation", timeWindow: "05:00-06:00" },
      { id: "priya_bed", action: "Check if Priya is awake", triggers: "priya_status_check" },
      { id: "cupboard", action: "Open cupboard", triggers: "kavya_cupboard" },
      { id: "hidden_compartment", action: "Check hidden compartment", triggers: "secret_clothes_stash" },
      { id: "study_desk", action: "Study at desk", triggers: "kavya_study_options" },
      { id: "under_mattress", action: "Reach under mattress", triggers: "find_redmi_phone" },
      { id: "mirror_room", action: "Look in mirror", triggers: "kavya_mirror_scene" },
      { id: "window_304", action: "Look out window", triggers: "hostel_window_view" },
      { id: "meera_manuscript", action: "Look at Meera's palm-leaf text", triggers: "manuscript_observation", unlockCondition: "meera_shows_manuscript", timeWindow: "19:00-23:59" }
    ],
    npcs: ["meera", "priya"],
    exits: [
      { to: "hostel_corridor", label: "Go to corridor" }
    ],
    image: "room_304.png"
  },

  "hostel_bathroom": {
    name: "Hostel Bathroom   3rd Floor",
    unlocked: true,
    available: "00:00-23:59",
    description: "Three stalls, two showers, one working mirror. Queue stretches down the corridor at peak hours.",
    objects: [
      { id: "shower_stall", action: "Take a shower", triggers: "kavya_shower_scene", intimate: true },
      { id: "mirror_bathroom", action: "Look in mirror", triggers: "kavya_bathroom_mirror" },
      { id: "toilet_stall", action: "Use the toilet", triggers: "kavya_pee_scene" },
      { id: "sink", action: "Wash face / brush teeth", triggers: "morning_wash" },
      { id: "washing_area", action: "Hand-wash clothes", triggers: "handwash_scene" }
    ],
    npcs: ["sneha_302", "random_hostel_girls"],
    exits: [
      { to: "hostel_corridor", label: "Back to corridor" }
    ],
    queueMechanic: true,  // Time-based queue between 5:30-7:00 AM
    image: "hostel_bathroom.png"
  },

  "hostel_corridor": {
    name: "Hostel 3rd Floor Corridor",
    unlocked: true,
    available: "00:00-23:59",
    description: "Long corridor, rooms on both sides, fluorescent lights that flicker.",
    objects: [
      { id: "notice_board", action: "Check hostel notices", triggers: "hostel_notices" },
      { id: "water_cooler", action: "Fill water bottle", triggers: "corridor_water" },
      { id: "sneha_door", action: "Knock on Room 302", triggers: "sneha_room_visit" }
    ],
    npcs: ["random_hostel_girl", "sneha_302"],
    exits: [
      { to: "hostel_room_304", label: "Room 304" },
      { to: "hostel_bathroom", label: "Bathroom" },
      { to: "hostel_stairs", label: "Stairs down" },
      { to: "hostel_terrace", label: "Terrace (stairs up)", unlockCondition: "time >= 20:00" }
    ]
  },

  "hostel_stairs": {
    name: "Hostel Stairwell",
    unlocked: true,
    available: "00:00-23:59",
    description: "Echoing concrete stairs. Warden's office on ground floor. Mess on first floor.",
    objects: [
      { id: "warden_door", action: "Warden's office", triggers: "warden_interaction", timeWindow: "08:00-20:00" }
    ],
    npcs: ["mrs_joshi_warden"],
    exits: [
      { to: "hostel_corridor", label: "Back to 3rd floor" },
      { to: "hostel_mess", label: "Mess hall (1st floor)" },
      { to: "hostel_entrance", label: "Hostel entrance (ground floor)" },
      { to: "hostel_common_room", label: "Common room" }
    ]
  },

  "hostel_mess": {
    name: "Hostel Mess Hall",
    unlocked: true,
    available: "07:00-09:00, 12:00-14:00, 19:00-21:00",
    description: "Steel plates, watery dal, the eternal question: is this sabzi or punishment?",
    objects: [
      { id: "food_counter_mess", action: "Get food", triggers: "mess_meal_scene" },
      { id: "corner_seat", action: "Sit in corner", triggers: "mess_corner_scene" },
      { id: "meera_seat", action: "Sit with Meera", triggers: "mess_meera_conversation", unlockCondition: "meera_available" }
    ],
    npcs: ["mess_didi", "meera", "priya", "random_mess_girls"],
    exits: [
      { to: "hostel_stairs", label: "Back to stairs" }
    ],
    image: "hostel_mess.png"
  },

  "hostel_common_room": {
    name: "Hostel Common Room",
    unlocked: true,
    available: "06:00-22:00",
    description: "One TV, fifty opinions, three broken sofas. The Wi-Fi router lives here.",
    objects: [
      { id: "tv", action: "Watch TV", triggers: "common_room_tv" },
      { id: "sofa_corner", action: "Sit in quiet corner", triggers: "common_room_corner" },
      { id: "wifi_router", action: "Check WiFi signal", triggers: "wifi_check" },
      { id: "magazine_rack", action: "Browse magazines", triggers: "magazine_browse" }
    ],
    npcs: ["random_hostel_girls_tv", "senior_student_divya"],
    exits: [
      { to: "hostel_stairs", label: "Back to stairs" }
    ]
  },

  "hostel_entrance": {
    name: "Hostel Main Entrance",
    unlocked: true,
    available: "06:00-21:00",
    description: "Chowkidar at the gate, sign-out register, Mrs. Joshi's eyes everywhere.",
    objects: [
      { id: "sign_out_register", action: "Sign out", triggers: "hostel_sign_out", requires: "valid_reason" },
      { id: "landline_phone", action: "Use landline", triggers: "hostel_landline" },
      { id: "chowkidar", action: "Talk to chowkidar", triggers: "chowkidar_interaction" }
    ],
    npcs: ["chowkidar_ramesh", "mrs_joshi_warden"],
    exits: [
      { to: "hostel_stairs", label: "Back inside" },
      { to: "bj_campus_path", label: "Exit to campus (requires sign-out)" }
    ]
  },

  "hostel_terrace": {
    name: "Hostel Terrace",
    unlocked: false,
    unlockCondition: "time >= 20:00 AND priya_asleep",
    available: "20:00-02:00",
    description: "City lights below. Stars above if the pollution clears. The only truly private space.",
    objects: [
      { id: "terrace_railing", action: "Lean on railing", triggers: "terrace_reflection" },
      { id: "water_tank", action: "Sit behind water tank", triggers: "hidden_terrace_spot" },
      { id: "phone_terrace", action: "Use phone (better signal)", triggers: "terrace_phone_use" }
    ],
    npcs: [],  // Empty   that's the point
    exits: [
      { to: "hostel_corridor", label: "Back downstairs" }
    ],
    image: "hostel_terrace.png"
  },

  "bj_campus_path": {
    name: "B.J. Medical Campus   Main Path",
    unlocked: false,
    unlockCondition: "signed_out_hostel",
    available: "07:00-17:00",
    description: "Neem trees lining the path, old colonial building, students in white coats.",
    objects: [
      { id: "campus_bench", action: "Sit on bench", triggers: "campus_bench_rest" },
      { id: "samosa_stall", action: "Buy samosa", triggers: "samosa_vendor_npc", cost: 15 },
      { id: "bookstore", action: "Visit medical bookstore", triggers: "bookstore_scene" }
    ],
    npcs: ["samosa_vendor", "random_mbbs_students", "senior_doctor_resident"],
    exits: [
      { to: "hostel_entrance", label: "Back to hostel" },
      { to: "bj_anatomy_hall", label: "Anatomy building" },
      { to: "bj_library", label: "College library" },
      { to: "bj_canteen", label: "College canteen" },
      { to: "sassoon_road", label: "Exit to Sassoon Road" }
    ],
    image: "bj_campus.png"
  },

  "bj_anatomy_hall": {
    name: "Anatomy Dissection Hall",
    unlocked: false,
    unlockCondition: "time >= 08:30 AND signed_out_hostel",
    available: "08:30-16:00",
    description: "Formalin wall. Cadavers under damp cloth. Cathedral of death.",
    objects: [
      { id: "dissection_table", action: "Go to your table", triggers: "anatomy_dissection_scene", timeWindow: "09:00-12:00" },
      { id: "wash_basin", action: "Wash hands", triggers: "anatomy_wash" },
      { id: "meera_table", action: "Pass note to Meera", triggers: "note_passing_anatomy", unlockCondition: "in_dissection" }
    ],
    npcs: ["dr_sharma", "meera", "lab_attendant"],
    exits: [
      { to: "bj_campus_path", label: "Exit to campus" }
    ],
    image: "anatomy_hall.png"
  },

  "bj_library": {
    name: "B.J. Medical College Library",
    unlocked: false,
    unlockCondition: "signed_out_hostel",
    available: "08:00-20:00",
    description: "Old building, high ceilings, rare Sanskrit section in the basement nobody visits.",
    objects: [
      { id: "study_area", action: "Study at table", triggers: "library_study" },
      { id: "computer_section", action: "Use library computer", triggers: "library_computer_coding" },
      { id: "rare_books", action: "Go to basement rare books", triggers: "rare_books_section" },
      { id: "librarian_desk", action: "Talk to librarian", triggers: "librarian_npc" }
    ],
    npcs: ["librarian_kulkarni", "studious_seniors"],
    exits: [
      { to: "bj_campus_path", label: "Back to campus" }
    ]
  },

  "bj_canteen": {
    name: "B.J. Medical Canteen",
    unlocked: false,
    unlockCondition: "signed_out_hostel",
    available: "08:00-17:00",
    description: "Smaller than VIT's but the vada pav is legendary.",
    objects: [
      { id: "vada_pav_counter", action: "Order vada pav", triggers: "bj_canteen_food", cost: 15 },
      { id: "chai_counter", action: "Order chai", triggers: "bj_canteen_chai", cost: 10 },
      { id: "corner_table_bj", action: "Sit alone with phone", triggers: "canteen_phone_coding" }
    ],
    npcs: ["canteen_owner_bhau", "random_medical_students_canteen"],
    exits: [
      { to: "bj_campus_path", label: "Back to campus" }
    ]
  },

  "sassoon_road": {
    name: "Sassoon Road   Outside Campus",
    unlocked: false,
    unlockCondition: "signed_out_hostel",
    available: "07:00-20:00",
    description: "Busy road connecting the medical campus to the city. Auto stands, shops, chaos.",
    objects: [
      { id: "auto_stand_sassoon", action: "Take an auto", triggers: "sassoon_auto_travel" },
      { id: "phone_repair_shop", action: "Visit phone repair shop", triggers: "phone_shop_scene" },
      { id: "stationery_store", action: "Buy supplies", triggers: "stationery_shopping" },
      { id: "juice_center", action: "Fresh juice center", triggers: "juice_vendor_npc", cost: 40 }
    ],
    npcs: ["phone_shop_owner", "juice_vendor", "auto_driver_anna"],
    exits: [
      { to: "bj_campus_path", label: "Back to campus" },
      { to: "koregaon_park", label: "Auto to Koregaon Park (20 min, ₹120)" }
    ]
  },

  "koregaon_park": {
    name: "Koregaon Park   Kavya's Family Area",
    unlocked: false,
    unlockCondition: "signed_out_hostel AND time >= 14:00 AND is_weekend OR has_excuse",
    available: "00:00-23:59",
    description: "Tree-lined streets, expensive cafes, her parents' flat where she's a different person.",
    objects: [
      { id: "parents_flat", action: "Visit parents' flat", triggers: "iyer_home_scene" },
      { id: "cafe_koregaon", action: "Sit at a cafe", triggers: "cafe_scene" },
      { id: "street_shops", action: "Browse street shops", triggers: "koregaon_shopping" }
    ],
    npcs: ["dr_venkatesh_papa", "lakshmi_amma", "cafe_barista"],
    exits: [
      { to: "sassoon_road", label: "Auto back to college (20 min)" }
    ]
  }
};
```

---

## OBJECTIVE SYSTEM   DAY 1

### ARJUN'S OBJECTIVES (Day 1)

```javascript
const arjunObjectives_day1 = {

  main: [
    {
      id: "obj_wake_up",
      title: "Start the day",
      description: "Get out of bed, check your phone, get ready.",
      status: "active",
      unlocks: ["obj_go_to_vit"],
      completionTrigger: "morning_routine_complete"
    },
    {
      id: "obj_go_to_vit",
      title: "Attend DBMS lecture at VIT",
      description: "Prof. Krishnan's class starts at 10 AM. Don't be late.",
      status: "locked",
      unlockCondition: "morning_routine_complete AND time >= 08:30",
      unlocks: ["obj_rohit_talk"],
      completionTrigger: "dbms_lecture_done",
      reward: { coding_skill: +2 }
    },
    {
      id: "obj_rohit_talk",
      title: "Talk to Rohit about your situation",
      description: "Your best friend has something to say. Meet him at the canteen.",
      status: "locked",
      unlockCondition: "dbms_lecture_done",
      unlocks: ["obj_contact_meera"],
      completionTrigger: "rohit_confrontation_done",
      reward: { rel_rohit: +5 }
    },
    {
      id: "obj_contact_meera",
      title: "Try to reach Meera",
      description: "She's twenty minutes away but might as well be on Mars. Find a way.",
      status: "locked",
      unlockCondition: "rohit_confrontation_done AND time >= 18:00",
      unlocks: ["obj_night_routine"],
      completionTrigger: "meera_contact_attempted",
      failureNote: "Contact attempt fails   establishes stakes"
    },
    {
      id: "obj_night_routine",
      title: "End the day",
      description: "Complete your DBMS assignment. Try to sleep. Think of her.",
      status: "locked",
      unlockCondition: "meera_contact_attempted AND time >= 21:00",
      completionTrigger: "arjun_day1_complete",
      reward: { coding_skill: +1 }
    }
  ],

  side: [
    {
      id: "sq_raju_phone",
      title: "Fix Raju Bhaiya's Phone",
      description: "His screen is cracked. You're the tech guy. Help him out.",
      location: "tapri_chai",
      unlockCondition: "talked_to_raju",
      reward: { rel_raju: +5, money: 0, item: "free_chai_coupon", note: "Free chai for a week" },
      completionTrigger: "raju_phone_fixed"
    },
    {
      id: "sq_rohit_cad",
      title: "Debug Rohit's CAD Project",
      description: "Rohit's mechanical drawing won't render. Classic Rohit.",
      location: "katraj_pg_room",
      unlockCondition: "rohit_confrontation_done",
      reward: { rel_rohit: +5, intel: "rohit_reveals_meera_sighting" },
      completionTrigger: "rohit_cad_fixed"
    },
    {
      id: "sq_nikhil_notes",
      title: "Get DBMS Notes from Nikhil",
      description: "You missed half the lecture mentally. Nikhil's got the goods.",
      location: "vit_cblock",
      unlockCondition: "dbms_lecture_done",
      reward: { coding_skill: +2, item: "nikhil_notes" },
      completionTrigger: "nikhil_notes_obtained"
    },
    {
      id: "sq_panwala_errand",
      title: "Panwala's Delivery Run",
      description: "Bhau needs someone to deliver a packet to VIT gate. Quick cash.",
      location: "katraj_street",
      unlockCondition: "talked_to_panwala",
      reward: { money: +50 },
      completionTrigger: "panwala_delivery_done"
    },
    {
      id: "sq_library_girl",
      title: "The Girl at the Library",
      description: "Ananya from 2nd year CSE keeps looking at you. She wants to ask something.",
      location: "vit_library",
      unlockCondition: "visited_library",
      reward: { rel_ananya: +3, intel: "ananya_has_meera_contact" },
      completionTrigger: "ananya_conversation_done"
    },
    {
      id: "sq_stray_dog",
      title: "Feed the Stray",
      description: "The brown dog near the PG looks hungry. Get biscuits from tapri.",
      location: "katraj_street",
      unlockCondition: "has_biscuit",
      reward: { karma: +2 },
      completionTrigger: "dog_fed"
    },
    {
      id: "sq_dbms_assignment",
      title: "Complete DBMS Assignment",
      description: "SQL queries won't write themselves. Due tomorrow.",
      location: "katraj_pg_room OR vit_cs_lab",
      unlockCondition: "time >= 19:00",
      reward: { coding_skill: +3, academic_standing: +2 },
      completionTrigger: "dbms_assignment_submitted"
    }
  ]
};
```

### KAVYA'S OBJECTIVES (Day 1)

```javascript
const kavyaObjectives_day1 = {

  main: [
    {
      id: "obj_morning_routine_k",
      title: "Survive the morning",
      description: "Wake up, bathroom queue, get dressed, get to mess.",
      status: "active",
      unlocks: ["obj_anatomy_lab"],
      completionTrigger: "kavya_morning_done"
    },
    {
      id: "obj_anatomy_lab",
      title: "Attend Anatomy Dissection",
      description: "Brachial plexus. Don't vomit. Don't scream. Just survive.",
      status: "locked",
      unlockCondition: "kavya_morning_done AND time >= 08:30",
      unlocks: ["obj_meera_note"],
      completionTrigger: "anatomy_lab_done",
      reward: { med_knowledge: +2 }
    },
    {
      id: "obj_meera_note",
      title: "Read Meera's note",
      description: "She passed you a note during dissection. Something about tonight.",
      status: "locked",
      unlockCondition: "anatomy_lab_done",
      unlocks: ["obj_manuscript_reveal"],
      completionTrigger: "meera_note_read"
    },
    {
      id: "obj_manuscript_reveal",
      title: "Learn Meera's secret",
      description: "She said 'don't make plans.' Wait until Priya leaves for her jog.",
      status: "locked",
      unlockCondition: "meera_note_read AND time >= 19:15 AND priya_out_jogging",
      unlocks: ["obj_test_swap"],
      completionTrigger: "manuscript_revealed"
    },
    {
      id: "obj_test_swap",
      title: "Try the impossible",
      description: "A body swap ritual. This is insane. But Meera is dead serious.",
      status: "locked",
      unlockCondition: "manuscript_revealed AND time >= 23:00 AND priya_asleep",
      completionTrigger: "test_swap_complete",
      reward: { trust_meera: +10 }
    }
  ],

  side: [
    {
      id: "sq_sneha_pharma",
      title: "Help Sneha with Pharmacology",
      description: "She forgot her notebook. Help with dosage calculations.",
      location: "hostel_corridor OR bj_campus_path",
      unlockCondition: "talked_to_sneha",
      reward: { rel_sneha: +3, intel: "surprise_test_info", coding_skill: +2 },
      completionTrigger: "sneha_helped"
    },
    {
      id: "sq_github_pr",
      title: "Check GitHub Pull Request",
      description: "Your NLP library PR might be merged. Check on the Redmi.",
      location: "hostel_room_304 OR hostel_terrace",
      unlockCondition: "has_redmi_phone",
      reward: { coding_skill: +3, confidence: +2 },
      completionTrigger: "github_checked"
    },
    {
      id: "sq_dosage_app",
      title: "Build a Dosage Calculator App",
      description: "Turn Sneha's problem into a quick coding project.",
      location: "hostel_room_304 OR bj_library",
      unlockCondition: "sneha_helped",
      reward: { coding_skill: +5, rel_sneha: +5 },
      completionTrigger: "dosage_app_built"
    },
    {
      id: "sq_dr_sharma_quiz",
      title: "Ace Dr. Sharma's Spot Quiz",
      description: "Name all five terminal branches of the brachial plexus.",
      location: "bj_anatomy_hall",
      unlockCondition: "in_dissection",
      reward: { med_knowledge: +3 },
      completionTrigger: "spot_quiz_aced"
    },
    {
      id: "sq_mess_didi_favor",
      title: "Mess Didi's Request",
      description: "The mess cook asks you to help count stock. She'll sneak you extra gulab jamun.",
      location: "hostel_mess",
      unlockCondition: "time >= 19:00",
      reward: { item: "extra_gulab_jamun", rel_mess_didi: +3 },
      completionTrigger: "mess_stock_helped"
    },
    {
      id: "sq_library_computer",
      title: "Sneak Coding Time",
      description: "The library computer section is empty after 4 PM. Code freely.",
      location: "bj_library",
      unlockCondition: "time >= 16:00 AND signed_out_hostel",
      reward: { coding_skill: +5, satisfaction: +5 },
      completionTrigger: "library_coding_done"
    },
    {
      id: "sq_priya_instagram",
      title: "Priya's Photo Request",
      description: "Priya wants you to take her 'candid' photos for Instagram. Ugh.",
      location: "hostel_room_304 OR bj_campus_path",
      unlockCondition: "priya_asks",
      reward: { rel_priya: +3, priya_suspicion: -2 },
      completionTrigger: "priya_photos_taken"
    },
    {
      id: "sq_samosa_run",
      title: "Campus Samosa Run",
      description: "The samosa stall near the anatomy building. Get one for yourself and Meera.",
      location: "bj_campus_path",
      unlockCondition: "break_time AND has_money >= 30",
      reward: { rel_meera: +2, hunger: -10 },
      completionTrigger: "samosa_bought"
    },
    {
      id: "sq_senior_divya",
      title: "Divya Didi's Advice",
      description: "A 4th-year senior in the common room. She's been through it. She might have wisdom.",
      location: "hostel_common_room",
      unlockCondition: "visited_common_room AND time >= 18:00",
      reward: { rel_divya: +3, intel: "exam_strategy_tips" },
      completionTrigger: "divya_conversation_done"
    }
  ]
};
```

---

## TIME SYSTEM

```javascript
// Time advances through actions, not passively
const timeAdvancement = {
  "shower": 15,           // minutes
  "meal": 20,
  "lecture": 60,
  "travel_bike": "varies",
  "travel_auto": "varies",
  "conversation_short": 10,
  "conversation_long": 25,
  "side_quest": 30,
  "coding_session": 45,
  "study_session": 30,
  "phone_call": 10,
  "intimate_scene": 20,
  "swap_ritual": 25
};

// Time-gated events that pop up regardless of location
const timedEvents_day1 = [
  { time: "13:00", character: "arjun", event: "aai_phone_call", description: "Aai calls to ask about food" },
  { time: "15:30", character: "arjun", event: "nikhil_whatsapp", description: "Nikhil sends assignment doubt" },
  { time: "17:00", character: "arjun", event: "sunset_melancholy", description: "Internal monologue trigger" },
  { time: "09:30", character: "kavya", event: "papa_video_call_missed", description: "Missed call from Dr. Venkatesh" },
  { time: "14:00", character: "kavya", event: "github_notification", description: "PR merged notification" },
  { time: "16:30", character: "kavya", event: "meera_whisper", description: "Meera reminds about tonight" },
  { time: "19:15", character: "kavya", event: "priya_leaves_jog", description: "Priya goes for evening jog   window opens" }
];
```

---

## PHONE SYSTEM   DAY 1

### ARJUN'S PHONE

```javascript
const arjunPhone_day1 = {
  whatsapp: {
    contacts: [
      {
        name: "Meera ❤️",
        lastMessage: "Papa ne phone le liya. I'll find a way. Don't forget me.",
        lastSeen: "hidden",
        profilePic: "default_grey",
        canMessage: false,
        readStatus: "blue_ticks_on_arjun_reply"
      },
      {
        name: "Rohit Sala",
        lastMessage: "Bhai lab ka assignment bhej",
        canMessage: true,
        conversations: ["casual_banter", "meera_discussion", "cad_help_request"]
      },
      {
        name: "CSE 3rd Year Group",
        lastMessage: "Krishnan sir extra class Friday confirm karo",
        canMessage: true,
        unreadCount: 47
      },
      {
        name: "Nikhil DBMS",
        lastMessage: "Notes chahiye toh bol",
        canMessage: true
      },
      {
        name: "Aai ❤️",
        lastMessage: "Beta kha liya kya",
        canMessage: true,
        conversations: ["daily_checkin"]
      },
      {
        name: "Pooja Pagal 🙄",
        lastMessage: "Bhaiya WiFi ka password kya tha",
        canMessage: true,
        conversations: ["sibling_banter"]
      }
    ],
    groups: ["CSE 3rd Year", "VIT Boys PG Katraj", "Deshmukh Family"]
  },
  instagram: {
    feed: ["classmate_party_photos", "travel_reels", "meme_pages"],
    meera_profile: { status: "private", posts: 0, followRequest: "pending" }
  },
  gallery: {
    lockedFolder: ["meera_bharatanatyam_video", "meera_marine_drive", "meera_backstage"],
    regular: ["college_group_photos", "bike_ride_selfies"]
  },
  calls: {
    recent: [
      { name: "Aai", type: "incoming", time: "yesterday 20:15" },
      { name: "Meera ❤️", type: "outgoing_missed", time: "3 months ago" }
    ]
  }
};
```

### KAVYA'S PHONES

```javascript
// Samsung (official   father inspects)
const kavyaSamsung_day1 = {
  whatsapp: {
    contacts: [
      { name: "Papa", lastMessage: "Result kab aayega", canMessage: true },
      { name: "Amma", lastMessage: "Kanna, eat properly", canMessage: true },
      { name: "Meera", lastMessage: "Anatomy notes dena", canMessage: true },
      { name: "Priya", lastMessage: "ASMR playlist link bhej", canMessage: true },
      { name: "Sneha", lastMessage: "Pharma notes plzzzz", canMessage: true }
    ],
    groups: ["MBBS 3rd Year Section B", "Room 304 Girls"]
  }
};

// Redmi (secret   the real phone)
const kavyaRedmi_day1 = {
  github: {
    username: "KV_Codes",
    notifications: [
      { type: "pr_merged", repo: "nlp-toolkit", message: "PR #247 merged. 3 approvals." },
      { type: "comment", repo: "nlp-toolkit", message: "Elegant implementation. Who is KV_Codes?" }
    ]
  },
  browser: {
    bookmarks: ["MIT OCW", "Stanford CS229", "LeetCode", "HackerRank", "Stack Overflow"],
    recentTabs: ["LeetCode Problem 742", "Python documentation - asyncio"]
  },
  telegram: {
    channels: ["CS Memes", "Coding Interview Prep"],
    contacts: [{ name: "Open Source Friend (Rahul)", lastMessage: "Your PR got merged! Congrats KV!" }]
  }
};
```

---

## INTIMATE/SEXUAL SCENE INTEGRATION   DAY 1

### Placement Instructions for Code Agent

```
DAY 1 INTIMATE SCENES   Both characters, pre-swap

ARJUN:
1. SHOWER SCENE (Morning)   Location: pg_bathroom
   - Trigger: Player selects "Take a shower"
   - Content: First-person body awareness. Arjun's comfort in his male body.
   - Standing under lukewarm water, soaping up, awareness of his own body   lean chest, flat stomach, the familiar weight of his cock hanging. Morning semi-erection from sleep. Brief touch   decides not to jerk off, Rohit could walk in.
   - Emotional: This body is the only one he's known. Establish baseline.
   - File: day1_intimate.tw → passage "arjun_shower_day1"

2. PEEING SCENE (Various)   Location: pg_bathroom OR vit_bathroom
   - Trigger: Hydration/time mechanic or player choice
   - Content: Standing at urinal. Casual masculine act. The ease of it.
   - Brief internal: He doesn't think about peeing. It's nothing. That nothingness is the point   contrast for later.
   - File: day1_intimate.tw → passage "arjun_pee_day1"

3. MASTURBATION SCENE (Night, 11:30 PM)   Location: katraj_pg_room
   - Trigger: Main objective "End the day" + time >= 23:00
   - Content: FULL SCENE from day1_arjun_main_scenes.md
   - Meera's Bharatanatyam video. Her body in green silk. Memory of their one kiss.
   - Explicit: Hand under shorts, stroking himself, building rhythm, imagining her hands, her mouth. Biting pillow. Orgasm   sharp, three pulses, tissue cleanup.
   - Emotional aftermath: emptiness, longing, staring at fan.
   - File: day1_intimate.tw → passage "arjun_masturbation_day1"

KAVYA:
1. SHOWER SCENE (Morning)   Location: hostel_bathroom
   - Trigger: Player reaches front of bathroom queue
   - Content: First-person body awareness. Kavya's relationship with her body.
   - Stripping the cotton nightie. Mirror: dusky skin, 34C breasts she views as obstacles, beauty mark. Four-minute shower   efficient, not sensual. Soaping her breasts quickly, washing between her legs without lingering. The body as engineering obstacle.
   - Bra fitting: Clovia underwire, the compression, the weight settling into cups, strap digging. Establish this as BASELINE she doesn't even notice anymore.
   - File: day1_intimate.tw → passage "kavya_shower_day1"

2. PEEING SCENE   Location: hostel_bathroom
   - Trigger: Player choice or time-based
   - Content: Sitting on the toilet. The hostel stall with no lock that works properly. Holding the door with one foot. The small vulnerability of it. Wiping front to back   automatic.
   - Internal: Even peeing requires more steps, more exposure, more vulnerability than she'll ever think about until she doesn't have to do it this way anymore.
   - File: day1_intimate.tw → passage "kavya_pee_day1"

3. PERIOD CHECK (Morning routine)   Location: hostel_bathroom
   - Trigger: Part of morning routine sequence
   - Content: Quick check   she's not on her period today but the awareness is constant. The mental calendar. The pad stash in her cupboard. The stain anxiety on the maroon salwar.
   - Internal: Another thing about this body she manages without thinking. Maintenance. Upkeep. The female body as project management.
   - File: day1_intimate.tw → passage "kavya_period_check_day1"

4. BODY AWARENESS   POST-SWAP (11:00 PM)   Location: hostel_room_304
   - Trigger: test_swap_complete
   - Content: CRITICAL SCENE. In Meera's body for 3-5 minutes.
   - Meera's breasts: smaller, higher, different shape. The ABSENCE of Kavya's familiar heaviness. Touching her (Meera's) face   sharper cheekbones. The hair   straight vs wavy. The hips narrower. Standing   different center of gravity.
   - NOT sexual yet   but the data is overwhelming. Every nerve ending reporting from a different address.
   - File: day1_intimate.tw → passage "kavya_swap_body_discovery"

5. MASTURBATION SCENE (Night, 12:45 AM)   Location: hostel_room_304
   - Trigger: test_swap_complete + time >= 00:30
   - Content: FULL SCENE from day1_kavya_main_scenes.md
   - NOT thinking about sex or bodies. Thinking about FREEDOM. CS classes. Keyboards. Code.
   - Hand under nightie, under pajama, under cotton panty. Fingers finding herself slick   arousal of possibility. Slow circles on clit. Biting pillow (Priya four feet away). Orgasm: slow wave, curling toes, stomach clenching. Three seconds of belonging.
   - Emotional aftermath: Back to reality. Formalin-stained life. Ceiling crack.
   - File: day1_intimate.tw → passage "kavya_masturbation_day1"
```

---

## NPC INTERACTION INSTRUCTIONS

### WHERE TO INSERT NPC SCENES

```
ARJUN NPC SCENES   Day 1:

1. RAJU BHAIYA (Tapri)   Insert at: tapri_chai location
   - Morning visit (07:00-08:00): Chai + life advice + broken phone discovery
   - Evening visit (17:00-19:00): Different customers, new gossip
   - Side quest: Fix phone → reward: free chai + relationship

2. ROHIT (Multiple locations)   Insert at: katraj_pg_room, vit_canteen
   - Morning: Wake-up banter in PG room
   - Canteen: The confrontation scene (post-lecture)
   - Evening: CAD project help request (PG room)
   - Night: Sleeping while Arjun jerks off   comedic snoring

3. NIKHIL (VIT)   Insert at: vit_cblock, vit_canteen
   - Pre-lecture corridor chat
   - Post-lecture notes exchange
   - WhatsApp message about assignment

4. PROF. KRISHNAN (VIT)   Insert at: vit_cblock
   - Lecture interaction: calling on Arjun
   - Post-lecture: brief corridor comment

5. PANWALA BHAU (Katraj Street)   Insert at: katraj_street
   - Any time: Street gossip, delivery side quest
   - Knows everyone's business, comments on Arjun's mood

6. FRUIT VENDOR TAI (Katraj Street)   Insert at: katraj_street
   - Morning/afternoon: Aunty energy, asks about studies, offers free banana

7. PG LANDLORD SHARMA (PG Building)   Insert at: pg_stairs
   - Rent reminder, complaints about noise, offhand comment

8. CANTEEN ANNA (VIT)   Insert at: vit_canteen
   - South Indian uncle running the counter. Remembers Arjun's order.

9. SECURITY GUARD PATIL (VIT Gate)   Insert at: vit_gate
   - ID check, casual comment about attendance

10. ANANYA (VIT Library)   Insert at: vit_library
    - 2nd year CSE, curious about Arjun, has intel connection to B.J. Medical

11. AAI (Phone Call)   Insert at: timed_event 13:00
    - Concerned mother call about food, studies, coming home for weekend

12. POOJA (WhatsApp)   Insert at: any time via phone
    - Bratty sister messages: WiFi password, school gossip, teasing about Meera

13. STRAY DOG (Katraj Street)   Insert at: katraj_street
    - Feed with biscuit for karma points

14. SINHAGAD DHABA OWNER   Insert at: sinhagad_road (evening only)
    - Old man, philosophical, chai on the mountain road

15. RANDOM BIKERS (Sinhagad Road)   Insert at: sinhagad_road
    - College boys on Royal Enfields, invite Arjun to ride group


KAVYA NPC SCENES   Day 1:

1. MEERA (Multiple)   Insert at: hostel_room_304, anatomy_hall, hostel_mess
   - Pre-dawn: Reading manuscript, Kavya notices
   - Anatomy lab: Note passing
   - Evening: Manuscript reveal + swap proposal
   - Night: The actual swap ritual

2. PRIYA (Multiple)   Insert at: hostel_room_304, hostel_corridor, hostel_mess
   - Morning: Instagram browsing, borrowing things
   - Mess: Gossip about seniors
   - Evening: Leaves for jog (critical timing)
   - Night: Falls asleep with ASMR (swap window)

3. SNEHA (Corridor/Campus)   Insert at: hostel_corridor, bj_campus_path
   - Morning: Pharmacology notes request
   - Afternoon: Dosage calculation help
   - Side quest chain: Notes → Calculator app

4. DR. SHARMA (Anatomy Hall)   Insert at: bj_anatomy_hall
   - During dissection: Observes Kavya's technique
   - Spot quiz: Brachial plexus branches
   - Post-lab: Gentle wisdom about the body as gift

5. MRS. JOSHI (Hostel)   Insert at: hostel_entrance, hostel_stairs
   - Morning: Attendance check
   - Evening: Visitors' hours enforcement
   - Night: Rounds check   TENSION if swap timing is close

6. CHOWKIDAR RAMESH (Hostel Gate)   Insert at: hostel_entrance
   - Gate guard. Knows everyone. Loyal to Mrs. Joshi.
   - Comments on who comes and goes.

7. MESS DIDI (Hostel Mess)   Insert at: hostel_mess
   - Breakfast/dinner service
   - Stock counting favor → extra gulab jamun
   - Gossip about which girls eat least (low-key surveillance)

8. SAMOSA VENDOR (B.J. Campus)   Insert at: bj_campus_path
   - The legendary samosa stall
   - Knows all the medical students by order pattern

9. LIBRARIAN KULKARNI (B.J. Library)   Insert at: bj_library
   - Old woman, protective of rare books
   - Doesn't know the manuscript exists in her basement

10. SENIOR DIVYA (Common Room)   Insert at: hostel_common_room
    - 4th year MBBS, seen it all, gives advice
    - Hints about Dr. Sharma's teaching style, exam tips

11. JUICE VENDOR (Sassoon Road)   Insert at: sassoon_road
    - Fresh sugarcane juice. Comments on the heat. Knows campus gossip.

12. PHONE SHOP OWNER (Sassoon Road)   Insert at: sassoon_road
    - Sells cheap phones, repairs screens
    - Could be useful later (burner phone source)

13. AUTO DRIVER ANNA (Sassoon Road)   Insert at: sassoon_road
    - Tamil auto driver, recognizes Kavya from the Tamil connection
    - Offers discount, shares city knowledge

14. PAPA (Video Call)   Insert at: timed_event 09:30
    - Missed call from Dr. Venkatesh
    - Kavya must call back during break   medical studies interrogation

15. AMMA (WhatsApp)   Insert at: any time via phone
    - Gentle messages in Tamil-English about eating well
    - Sends Carnatic music links

16. RAHUL (Telegram, Redmi)   Insert at: via secret phone
    - Open source friend, celebrates PR merge
    - Coding discussion, doesn't know Kavya is a medical student

17. RANDOM HOSTEL GIRLS (Various)   Insert at: hostel_bathroom, hostel_corridor
    - Queue conversations, gossip, complaints about water
    - Establish hostel social dynamics
```

---

## SCENE CONTENT FILE MAPPING

```
CODE AGENT: When building Twine passages, pull scene content from these files:

ARJUN MAIN SCENES → day1_arjun_main_scenes.md
  - Maps to: day1_arjun_scenes.tw
  - Contains: First-person narrative for all main objective scenes
  - Word count: 4,000-6,000 words
  - Scenes: Morning wake-up, bathroom/shower, tapri chai, VIT arrival,
    DBMS lecture, canteen confrontation with Rohit, evening PG return,
    hostel landline call attempt, night coding, masturbation scene

ARJUN NPC/SIDE QUESTS → day1_arjun_npc_sidequests.md
  - Maps to: day1_arjun_npc.tw
  - Contains: All NPC interaction dialogue and side quest scenes
  - Word count: 4,000-6,000 words
  - Includes: Raju phone repair, Rohit CAD debug, Nikhil notes exchange,
    panwala delivery, library girl encounter, Aai phone call,
    Pooja WhatsApp chat, fruit vendor, PG landlord, Sinhagad ride,
    stray dog, canteen anna, security guard, random encounters

KAVYA MAIN SCENES → day1_kavya_main_scenes.md
  - Maps to: day1_kavya_scenes.tw
  - Contains: First-person narrative for all main objective scenes
  - Word count: 4,000-6,000 words
  - Scenes: Pre-dawn wake, bathroom queue, shower/dressing, mess breakfast,
    anatomy dissection, note from Meera, evening manuscript reveal,
    test swap scene, swap-back, masturbation scene

KAVYA NPC/SIDE QUESTS → day1_kavya_npc_sidequests.md
  - Maps to: day1_kavya_npc.tw
  - Contains: All NPC interaction dialogue and side quest scenes
  - Word count: 4,000-6,000 words
  - Includes: Sneha pharma help, dosage calculator build, Dr. Sharma quiz,
    Priya Instagram photos, mess didi stock count, library coding session,
    senior Divya advice, samosa run, Papa video call, Amma messages,
    Rahul Telegram chat, hostel gossip, Mrs. Joshi rounds,
    chowkidar interaction, juice vendor, phone shop

INTIMATE SCENES → day1_intimate.tw (built from content in both main scene files)
  - Arjun: shower awareness, pee scene, masturbation (full)
  - Kavya: shower awareness, pee scene, period check, swap body discovery, masturbation (full)

IMAGE PROMPTS → day1_image_prompts.md
  - All scene illustrations, character portraits, location backgrounds
  - Marked with insertion points matching passage names
```

---

## STATS AT END OF DAY 1

### ARJUN   End of Day 1
```javascript
$arjun_stats_day1_end = {
  coding_skill: 87,      // +2 from lecture, +0-3 from side quests
  med_knowledge: 5,       // unchanged
  fem_comfort: 0,         // unchanged   no swap yet
  sex_exp_male: 15,       // unchanged (masturbation doesn't increase   solo baseline)
  sex_exp_female: 0,      // unchanged
  rel_meera: 90,          // unchanged   no contact achieved
  rel_kavya: 30,          // unchanged   hasn't met her yet
  rel_rohit: 35,          // +5 from confrontation, +0-5 from CAD help
  suspicion: 0,           // n/a pre-swap
  money: 500,             // starting amount, +/- from purchases and errands
  mood: "melancholy",
  energy: 25              // low   sleep-deprived, emotionally drained
};
```

### KAVYA   End of Day 1
```javascript
$kavya_stats_day1_end = {
  coding_skill: 72,       // +2-5 from GitHub/coding sessions
  med_knowledge: 47,      // +2 from anatomy lab
  masc_comfort: 0,        // unchanged   no cross-gender swap yet
  sex_exp_female: 10,     // unchanged (solo masturbation is baseline)
  sex_exp_male: 0,        // unchanged
  rel_arjun: 30,          // unchanged   hasn't met him yet
  rel_meera: 87,          // +2 from day's interactions
  rel_priya: 5,           // starting, +0-3 from interactions
  rel_sneha: 3,           // +0-3 from side quest
  suspicion: 0,           // n/a pre-swap
  money: 800,             // more than Arjun   upper-middle-class allowance
  mood: "electrified",    // post-swap-test adrenaline
  energy: 15,             // very low   swap exhaustion + late night
  swap_experienced: true  // flag: she's been in another body
};
```

---

## IMPLEMENTATION NOTES FOR CODE AGENT

1. **Never auto-advance scenes.** Player must physically navigate between locations and interact with objects to trigger story beats.

2. **Objective tracker** sits in sidebar or can be toggled. Shows main + side objectives with status icons.

3. **Phone is an inventory item** accessible from any location. Opens a sub-menu with WhatsApp, calls, gallery, Instagram.

4. **Travel between locations** advances the clock. Show a brief travel description.

5. **NPC interactions** are location-bound. NPCs have availability windows matching their schedules.

6. **Intimate scenes** are tagged and can be toggled on/off in settings for player comfort. When off, a brief narrative summary replaces the explicit content.

7. **Side quests** are discoverable through NPC conversation, object interaction, or phone messages. They are NOT listed in the objective tracker until discovered.

8. **The swap scene** (Kavya only, Day 1) is the climax. Build to it through the entire day's pacing.

9. **Save system** should capture: current location, time, all variable states, completed objectives, inventory.

10. **Character switching:** Player can switch between Arjun and Kavya at designated points (marked "SWITCH POV" in the timeline). Day 1 has 3 switch points: after morning routines, after lectures, and after 7 PM.
