/* ============================================================
   VIDHI   Open World Engine (SugarCube 2)
   Location system · Objectives · Time · Phone · Inventory · NPC
   ============================================================ */

Config.history.maxStates = 200;

/* SugarCube exposes the persistent `setup` object as a global; make sure it
   exists (some hosts / test harnesses don't pre-create it). Every reference
   below   Story JS, the delegated click handler, other scripts   resolves to
   this same object. */
if (typeof window !== "undefined" && (!window.setup || typeof window.setup !== "object")) {
  window.setup = {};
}

var V = function () { return State.variables; };

/* ------------------------------------------------------------
   STATIC DATA   LOCATION REGISTRIES
   ------------------------------------------------------------ */

setup.locations = {

  arjun: {

    "katraj_pg_room": {
      name: "PG Room   Katraj",
      available: "00:00-23:59",
      description: "Shared room with Rohit. Two cots, one desk, a tower of Maggi cups, chaos incarnate. The ceiling fan wobbles on its one nicked blade.",
      objects: [
        { id: "phone", action: "Check your phone", triggers: "phone_menu" },
        { id: "laptop", action: "Open the laptop", triggers: "laptop_interaction" },
        { id: "meera_photos", action: "Look at saved photos", triggers: "meera_gallery", unlockCondition: "phone_checked" },
        { id: "mirror", action: "Look in the mirror", triggers: "arjun_mirror_scene" },
        { id: "rohit_bed", action: "Wake up Rohit", triggers: "rohit_morning_talk", timeWindow: "06:00-08:30" },
        { id: "pulsar_keys", action: "Grab the Pulsar keys", triggers: "grab_bike_keys", item: "bike_keys", unlockCondition: "not has_bike_keys" },
        { id: "wardrobe", action: "Get dressed", triggers: "clothing_choice" },
        { id: "dbms_notebook", action: "Check the DBMS assignment", triggers: "dbms_status" },
        { id: "window", action: "Look outside", triggers: "katraj_morning_view" },
        { id: "rohit_cad", action: "Debug Rohit's CAD project", triggers: "rohit_cad_scene", unlockCondition: "rohit_confrontation_done" },
        { id: "night_call", action: "Try the hostel landline", triggers: "hostel_landline_call", unlockCondition: "rohit_confrontation_done AND time >= 18:00" },
        { id: "dbms_work", action: "Work on the DBMS assignment", triggers: "laptop_night_dbms", unlockCondition: "time >= 19:00" },
        { id: "end_day", action: "End the day   lie down on the cot", triggers: "arjun_night_end", unlockCondition: "meera_contact_attempted AND time >= 21:00 AND not arjun_day1_complete" },
        { id: "a_bed_night", action: "Lie back in the dark. Hand under the waistband.", triggers: "arjun_bed_selfplay", intimate: true, quest: "side", repeatable: true, timeWindow: "23:00-23:59" },
        { id: "a_bed_morning", action: "Awake before the alarm, the room still dark.", triggers: "arjun_bed_selfplay", intimate: true, quest: "side", repeatable: true, timeWindow: "00:00-07:00" },
        { id: "a_porn_night", action: "Earphones in. Open the private tab.", triggers: "arjun_porn_menu", intimate: true, quest: "side", repeatable: true, timeWindow: "23:00-23:59" },
        { id: "a_porn_morning", action: "Something to watch before the day starts.", triggers: "arjun_porn_menu", intimate: true, quest: "side", repeatable: true, timeWindow: "00:00-07:00" }
      ],
      npcs: ["rohit"],
      exits: [
        { to: "pg_bathroom", label: "Go to the bathroom" },
        { to: "pg_stairs", label: "Go downstairs" }
      ],
      image: "katraj_pg_room.png"
    },

    "pg_bathroom": {
      name: "Shared Bathroom",
      available: "00:00-23:59",
      description: "Cracked tiles the colour of old teeth. One shower at a temperature best described as ambient disappointment. A mirror that has been through several parallel dimensions, all of them bad.",
      objects: [
        { id: "mirror_bathroom", action: "Look at yourself", triggers: "arjun_bathroom_mirror" },
        { id: "shower", action: "Take a shower", triggers: "arjun_shower_day1", intimate: true },
        { id: "toothbrush", action: "Brush your teeth", triggers: "morning_routine" },
        { id: "urinal", action: "Use the urinal", triggers: "arjun_pee_day1", intimate: true },
        { id: "shaving_kit", action: "Shave", triggers: "shaving_scene" },
        { id: "arjun_alone", action: "Bolt the door. Take the hour to yourself.", triggers: "arjun_self_explore", intimate: true, quest: "side", unlockCondition: "morning_routine_complete", dayOnly: 1 }
      ],
      npcs: ["random_pg_boy"],
      exits: [ { to: "katraj_pg_room", label: "Back to the room" } ],
      image: "pg_bathroom.png"
    },

    "pg_stairs": {
      name: "PG Building   Stairs / Entrance",
      available: "00:00-23:59",
      description: "Narrow staircase. The landlord's motorcycle blocks half the entrance, as it has since the dawn of time.",
      objects: [
        { id: "noticeboard", action: "Read the notice board", triggers: "pg_notices" },
        { id: "landlord_door", action: "Knock on the landlord's door", triggers: "landlord_interaction", timeWindow: "09:00-21:00" }
      ],
      npcs: ["pg_landlord_sharma"],
      exits: [
        { to: "katraj_pg_room", label: "Go upstairs" },
        { to: "tapri_chai", label: "Go to the chai tapri" },
        { to: "katraj_street", label: "Out to the street" }
      ]
    },

    "tapri_chai": {
      name: "Raju Bhaiya's Chai Tapri",
      available: "06:00-22:00",
      description: "Tin roof, three-foot counter, two steel vessels roaring on a blue flame. Steam, biscuits, and Katraj's morning parliament.",
      objects: [
        { id: "chai_order", action: "Order a cutting chai", triggers: "chai_scene" },
        { id: "biscuit_jar", action: "Buy a Parle-G packet (₹10)", triggers: "buy_biscuit", cost: 10, item: "biscuit" },
        { id: "newspaper", action: "Read the newspaper", triggers: "news_of_day" },
        { id: "raju_phone", action: "Look at Raju's cracked phone", triggers: "raju_phone_sidequest", unlockCondition: "talked_to_raju" }
      ],
      npcs: ["raju_bhaiya", "random_tapri_customer"],
      exits: [
        { to: "pg_stairs", label: "Back to the PG" },
        { to: "katraj_street", label: "Walk to the road" }
      ],
      image: "tapri_chai.png"
    },

    "katraj_street": {
      name: "Katraj Main Road",
      available: "05:00-23:00",
      description: "Busy road. Autos, bikes, and a cow that owns the middle lane with total confidence.",
      objects: [
        { id: "pulsar_parked", action: "Get on the Pulsar", triggers: "bike_travel_menu", requires: "bike_keys" },
        { id: "auto_stand", action: "Take an auto", triggers: "auto_travel_menu" },
        { id: "panwala", action: "Talk to the panwala", triggers: "panwala_interaction" },
        { id: "stray_dog", action: "The brown stray dog", triggers: "stray_dog_scene" },
        { id: "fruit_vendor", action: "Buy fruit from the vendor", triggers: "fruit_vendor_npc" }
      ],
      npcs: ["panwala_bhau", "fruit_vendor_tai", "random_passerby"],
      exits: [
        { to: "tapri_chai", label: "Chai tapri" },
        { to: "pg_stairs", label: "Back to the PG" }
      ],
      travelDestinations: [
        { to: "vit_gate", travelTime: 15, method: "pulsar", label: "Ride to VIT (15 min)" },
        { to: "katraj_snake_park", travelTime: 5, method: "walk", label: "Walk to Snake Park / lake (5 min)" },
        { to: "sinhagad_road", travelTime: 10, method: "pulsar", label: "Ride toward Sinhagad Road (10 min)", unlockCondition: "has_bike_keys AND time >= 17:00" },
        { to: "kothrud_home", travelTime: 25, method: "pulsar", label: "Ride home to Kothrud (25 min)" },
        { to: "bj_medical_area", travelTime: 20, method: "pulsar", label: "Ride toward B.J. Medical (20 min)", unlockCondition: "rohit_reveals_meera_sighting" }
      ]
    },

    "vit_gate": {
      name: "VIT Main Gate",
      unlockCondition: "has_bike_keys",
      available: "06:00-21:00",
      description: "Security booth, ID check, and a bike parking lot that is a live game of Tetris.",
      objects: [
        { id: "id_card", action: "Show your ID to the guard", triggers: "vit_entry" },
        { id: "deliver_packet", action: "Hand Guard Patil the panwala's packet", triggers: "panwala_delivery_scene", requires: "panwala_packet" },
        { id: "notice_wall", action: "Check the campus notices", triggers: "vit_notices" },
        { id: "vending_machine", action: "Buy a cold drink (₹20)", triggers: "vending_purchase", cost: 20 }
      ],
      npcs: ["security_guard_patil", "random_vit_student"],
      exits: [
        { to: "vit_cblock", label: "C-Block (lecture halls)", unlockCondition: "entered_vit" },
        { to: "vit_canteen", label: "Canteen", unlockCondition: "entered_vit" },
        { to: "vit_library", label: "Library", unlockCondition: "entered_vit" },
        { to: "vit_ground", label: "Sports ground", unlockCondition: "entered_vit" },
        { to: "katraj_street", label: "Exit campus   ride back" }
      ],
      image: "vit_gate.png"
    },

    "vit_cblock": {
      name: "VIT C-Block   Lecture Halls",
      unlockCondition: "entered_vit",
      available: "08:00-18:00",
      description: "Corridors that smell of chalk dust and broken dreams. Room C-204 has the DBMS lecture.",
      objects: [
        { id: "classroom_door", action: "Enter the DBMS class", triggers: "dbms_lecture_scene", timeWindow: "09:30-11:30" },
        { id: "nikhil_notes", action: "Ask Nikhil for notes", triggers: "nikhil_notes_scene", unlockCondition: "dbms_lecture_done" },
        { id: "water_cooler", action: "Fill your water bottle", triggers: "water_cooler_encounter" },
        { id: "notice_board_cs", action: "CS department notices", triggers: "cs_notices" },
        { id: "bench_corridor", action: "Sit on the corridor bench", triggers: "corridor_rest" }
      ],
      npcs: ["nikhil_classmate", "prof_krishnan", "random_cse_student"],
      exits: [
        { to: "vit_canteen", label: "To the canteen" },
        { to: "vit_gate", label: "To the main gate" },
        { to: "vit_cs_lab", label: "CS Lab", unlockCondition: "time >= 14:00" }
      ]
    },

    "vit_canteen": {
      name: "VIT Canteen",
      unlockCondition: "entered_vit",
      available: "08:00-17:30",
      description: "Steel plates, masala dosa grease, ambition, and a hundred conversations at once.",
      objects: [
        { id: "food_counter", action: "Order food from the counter", triggers: "canteen_menu" },
        { id: "rohit_table", action: "Sit with Rohit", triggers: "rohit_canteen_confrontation", unlockCondition: "dbms_lecture_done" },
        { id: "corner_table", action: "Sit alone in the corner", triggers: "arjun_alone_canteen" },
        { id: "tv_screen", action: "Watch the canteen TV", triggers: "canteen_tv" }
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
      unlockCondition: "entered_vit AND time >= 14:00",
      available: "09:00-17:00",
      description: "Rows of Dell monitors. AC that works sometimes. The lab assistant guards the door like Cerberus.",
      objects: [
        { id: "workstation", action: "Sit at a terminal", triggers: "lab_coding_session" },
        { id: "lab_printer", action: "Print the assignment", triggers: "print_dbms", unlockCondition: "dbms_assignment_submitted" }
      ],
      npcs: ["lab_assistant_suresh", "random_lab_student"],
      exits: [ { to: "vit_cblock", label: "Back to C-Block" } ]
    },

    "vit_library": {
      name: "VIT Library",
      unlockCondition: "entered_vit",
      available: "08:30-20:00",
      description: "Quiet. Cool. The one place on campus where silence is enforced and the AC works reliably.",
      objects: [
        { id: "cs_section", action: "Browse the CS textbooks", triggers: "library_cs_browse" },
        { id: "ananya", action: "Talk to Ananya (she keeps glancing over)", triggers: "ananya_library_scene" },
        { id: "study_desk", action: "Study at a desk", triggers: "library_study_session" },
        { id: "charging_point", action: "Charge your phone", triggers: "phone_charging" }
      ],
      npcs: ["librarian_madam", "studious_girl_ananya"],
      exits: [ { to: "vit_gate", label: "Back to the gate" } ]
    },

    "vit_ground": {
      name: "VIT Sports Ground",
      unlockCondition: "entered_vit",
      available: "06:00-19:00",
      description: "Cricket pitch, basketball court, and boys smoking behind the stands.",
      objects: [
        { id: "basketball_court", action: "Shoot some hoops", triggers: "basketball_scene" },
        { id: "bench_ground", action: "Sit and think", triggers: "arjun_ground_reflection" },
        { id: "smoking_spot", action: "Go behind the stands", triggers: "smoking_spot_encounter" }
      ],
      npcs: ["sports_boys_group", "random_couple"],
      exits: [
        { to: "vit_canteen", label: "To the canteen" },
        { to: "vit_gate", label: "To the gate" }
      ]
    },

    "sinhagad_road": {
      name: "Sinhagad Road   Evening Ride",
      unlockCondition: "has_bike_keys AND time >= 17:00",
      available: "05:00-23:00",
      description: "The road curves up toward the fort. City lights below, wind in your hair.",
      objects: [
        { id: "chai_dhaba", action: "Stop at the roadside dhaba", triggers: "sinhagad_dhaba_scene" },
        { id: "viewpoint", action: "Park at the viewpoint", triggers: "sinhagad_reflection_scene" },
        { id: "phone_call_spot", action: "Try calling Meera from here", triggers: "meera_call_attempt_sinhagad" }
      ],
      npcs: ["dhaba_owner", "random_bikers"],
      exits: [ { to: "katraj_street", label: "Ride back to Katraj" } ],
      image: "sinhagad_road.png"
    },

    "katraj_snake_park": {
      name: "Katraj Snake Park / Lake",
      available: "06:00-18:00",
      description: "Morning joggers, the lake reflecting a grey sky, the snake park entrance nearby.",
      objects: [
        { id: "lake_bench", action: "Sit by the lake", triggers: "lake_reflection" },
        { id: "jogging_track", action: "Go for a walk", triggers: "katraj_walk" },
        { id: "ice_cream_wala", action: "Buy an ice cream (₹30)", triggers: "ice_cream_vendor_npc", cost: 30 }
      ],
      npcs: ["morning_jogger_uncle", "college_girls_group", "ice_cream_vendor"],
      exits: [ { to: "katraj_street", label: "Back to the main road" } ],
      image: "katraj_snake_park.png"
    },

    "kothrud_home": {
      name: "Deshmukh Family Home   Kothrud",
      available: "00:00-23:59",
      description: "2BHK. Aai's cooking, Pooja's school books on the sofa, Papa's LIC calendar on the wall.",
      objects: [
        { id: "aai_kitchen", action: "Talk to Aai", triggers: "sunita_interaction" },
        { id: "papa_chair", action: "Talk to Papa", triggers: "suresh_interaction", timeWindow: "18:00-22:00" },
        { id: "pooja_room", action: "Annoy Pooja", triggers: "pooja_interaction" },
        { id: "home_food", action: "Eat home food", triggers: "home_meal_scene" },
        { id: "old_room", action: "Visit your old room", triggers: "arjun_childhood_room" }
      ],
      npcs: ["aai_sunita", "papa_suresh", "pooja_sister"],
      exits: [ { to: "katraj_street", label: "Ride back to the PG (25 min)" } ],
      image: "kothrud_home.png"
    },

    "bj_medical_area": {
      name: "B.J. Medical College   Outside the Gate",
      unlockCondition: "rohit_reveals_meera_sighting",
      available: "00:00-23:59",
      description: "You can see the hostel building from here. Close enough to ache.",
      objects: [
        { id: "hostel_windows", action: "Look at the hostel windows", triggers: "arjun_watches_hostel" },
        { id: "phone_booth", action: "Try the hostel landline", triggers: "hostel_landline_call" },
        { id: "pco_stall", action: "Use the PCO for a different number", triggers: "pco_call_attempt" }
      ],
      npcs: ["chai_vendor_outside_bj", "random_medical_students"],
      exits: [ { to: "katraj_street", label: "Ride back" } ]
    }
  },

  kavya: {

    "hostel_room_304": {
      name: "Room 304   B.J. Medical Girls Hostel",
      available: "00:00-23:59",
      description: "Three beds, twenty square metres, three lives colliding. The ceiling crack that looks like a river delta. The water stain shaped like Sri Lanka.",
      objects: [
        { id: "phone_samsung", action: "Check the Samsung (official phone)", triggers: "samsung_phone_menu" },
        { id: "phone_redmi", action: "Check the Redmi (secret phone)", triggers: "redmi_phone_menu", unlockCondition: "has_redmi_phone" },
        { id: "under_mattress", action: "Reach under the mattress", triggers: "find_redmi_phone", unlockCondition: "not has_redmi_phone" },
        { id: "meera_bed", action: "Look at Meera", triggers: "meera_observation", timeWindow: "05:00-06:30" },
        { id: "priya_bed", action: "Check if Priya is awake", triggers: "priya_status_check" },
        { id: "cupboard", action: "Open your cupboard", triggers: "kavya_cupboard" },
        { id: "hidden_compartment", action: "Check the hidden compartment", triggers: "secret_clothes_stash" },
        { id: "study_desk", action: "Study at the desk", triggers: "kavya_study_options" },
        { id: "mirror_room", action: "Look in the mirror", triggers: "kavya_mirror_scene" },
        { id: "window_304", action: "Look out the window", triggers: "hostel_window_view" },
        { id: "meera_manuscript", action: "Look at Meera's palm-leaf text", triggers: "manuscript_observation", unlockCondition: "meera_shows_manuscript", timeWindow: "19:00-23:59" },
        { id: "priya_photo_req", action: "Take Priya's 'candid' photos", triggers: "priya_instagram_scene", unlockCondition: "priya_asks", timeWindow: "13:00-20:00" },
        { id: "manuscript_reveal_obj", action: "Ask Meera what she found", triggers: "manuscript_reveal_scene", unlockCondition: "meera_note_read AND time >= 19:15 AND priya_out_jogging" },
        { id: "wait_priya_sleep", action: "Wait for Priya to fall asleep", triggers: "priya_sleep_scene", unlockCondition: "manuscript_revealed AND time >= 22:30 AND not test_swap_complete" },
        { id: "test_swap_obj", action: "Try the ritual with Meera", triggers: "test_swap_scene", unlockCondition: "manuscript_revealed AND time >= 23:00 AND priya_asleep AND not test_swap_complete" },
        { id: "build_dosage", action: "Build Sneha's dosage calculator app", triggers: "dosage_build_scene", unlockCondition: "sneha_helped" },
        { id: "k_bed_night", action: "Lie awake. Hand under the nightie.", triggers: "kavya_bed_selfplay", intimate: true, quest: "side", repeatable: true, timeWindow: "23:00-23:59" },
        { id: "k_bed_morning", action: "Awake before the others, the room still grey.", triggers: "kavya_bed_selfplay", intimate: true, quest: "side", repeatable: true, timeWindow: "00:00-06:00" },
        { id: "k_porn_night", action: "Earphones in. The other browser, on the Redmi.", triggers: "kavya_porn_menu", intimate: true, quest: "side", repeatable: true, timeWindow: "23:00-23:59", unlockCondition: "has_redmi_phone" },
        { id: "k_porn_morning", action: "Something to watch before the alarm, on the Redmi.", triggers: "kavya_porn_menu", intimate: true, quest: "side", repeatable: true, timeWindow: "00:00-06:00", unlockCondition: "has_redmi_phone" }
      ],
      npcs: ["meera", "priya"],
      exits: [ { to: "hostel_corridor", label: "Go to the corridor" } ],
      image: "room_304.png"
    },

    "hostel_bathroom": {
      name: "Hostel Bathroom   3rd Floor",
      available: "00:00-23:59",
      description: "Three stalls, two showers, one working mirror that hasn't been cleaned since the British left. The queue stretches down the corridor at peak hours.",
      objects: [
        { id: "shower_stall", action: "Take a shower", triggers: "kavya_shower_day1", intimate: true },
        { id: "toilet_stall", action: "Use the toilet", triggers: "kavya_pee_day1", intimate: true },
        { id: "period_check", action: "Do the morning period check", triggers: "kavya_period_check_day1", intimate: true },
        { id: "mirror_bathroom", action: "Look in the mirror", triggers: "kavya_bathroom_mirror" },
        { id: "sink", action: "Wash your face / brush teeth", triggers: "morning_wash" },
        { id: "washing_area", action: "Hand-wash clothes", triggers: "handwash_scene" },
        { id: "kavya_alone", action: "Take the stall. Properly, this time.", triggers: "kavya_self_explore", intimate: true, quest: "side", unlockCondition: "kavya_morning_done", dayOnly: 1 }
      ],
      npcs: ["sneha_302", "random_hostel_girls"],
      exits: [ { to: "hostel_corridor", label: "Back to the corridor" } ],
      image: "hostel_bathroom.png"
    },

    "hostel_corridor": {
      name: "Hostel 3rd Floor Corridor",
      available: "00:00-23:59",
      description: "Long corridor, rooms on both sides, fluorescent lights that flicker like they're thinking about it.",
      objects: [
        { id: "notice_board", action: "Check the hostel notices", triggers: "hostel_notices" },
        { id: "water_cooler", action: "Fill your water bottle", triggers: "corridor_water" },
        { id: "sneha_door", action: "Knock on Room 302 (Sneha)", triggers: "sneha_room_visit" }
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
      available: "00:00-23:59",
      description: "Echoing concrete stairs. Warden's office on the ground floor, mess on the first.",
      objects: [
        { id: "warden_door", action: "Warden's office", triggers: "warden_interaction", timeWindow: "08:00-20:00" }
      ],
      npcs: ["mrs_joshi_warden"],
      exits: [
        { to: "hostel_corridor", label: "Back to the 3rd floor" },
        { to: "hostel_mess", label: "Mess hall (1st floor)" },
        { to: "hostel_common_room", label: "Common room" },
        { to: "hostel_entrance", label: "Hostel entrance (ground floor)" }
      ]
    },

    "hostel_mess": {
      name: "Hostel Mess Hall",
      available: "07:00-09:00,12:00-14:00,19:00-21:00",
      description: "Steel plates, watery dal, and the eternal question: is this sabzi, or punishment?",
      objects: [
        { id: "food_counter_mess", action: "Get food", triggers: "mess_meal_scene" },
        { id: "corner_seat", action: "Sit in the corner", triggers: "mess_corner_scene" },
        { id: "meera_seat", action: "Sit with Meera", triggers: "mess_meera_conversation" },
        { id: "mess_didi_favor", action: "Help Mess Didi with the stock count", triggers: "mess_didi_scene", unlockCondition: "time >= 19:00" }
      ],
      npcs: ["mess_didi", "meera", "priya", "random_mess_girls"],
      exits: [ { to: "hostel_stairs", label: "Back to the stairs" } ],
      image: "hostel_mess.png"
    },

    "hostel_common_room": {
      name: "Hostel Common Room",
      available: "06:00-22:00",
      description: "One TV, fifty opinions, three broken sofas. The Wi-Fi router lives here.",
      objects: [
        { id: "tv", action: "Watch TV", triggers: "common_room_tv" },
        { id: "sofa_corner", action: "Sit in the quiet corner", triggers: "common_room_corner" },
        { id: "wifi_router", action: "Check the Wi-Fi signal", triggers: "wifi_check" },
        { id: "magazine_rack", action: "Browse the magazines", triggers: "magazine_browse" },
        { id: "divya_sofa", action: "Talk to Divya Didi (4th year)", triggers: "senior_divya_scene", unlockCondition: "time >= 18:00" }
      ],
      npcs: ["random_hostel_girls_tv", "senior_student_divya"],
      exits: [ { to: "hostel_stairs", label: "Back to the stairs" } ],
      image: "hostel_common_room.png"
    },

    "hostel_entrance": {
      name: "Hostel Main Entrance",
      available: "06:00-21:00",
      description: "Chowkidar at the gate, the sign-out register, and Mrs. Joshi's eyes everywhere at once.",
      objects: [
        { id: "sign_out_register", action: "Sign out", triggers: "hostel_sign_out" },
        { id: "landline_phone", action: "Use the landline", triggers: "hostel_landline" },
        { id: "chowkidar", action: "Talk to the chowkidar", triggers: "chowkidar_interaction" }
      ],
      npcs: ["chowkidar_ramesh", "mrs_joshi_warden"],
      exits: [
        { to: "hostel_stairs", label: "Back inside" },
        { to: "bj_campus_path", label: "Exit to campus", unlockCondition: "signed_out_hostel" }
      ],
      image: "hostel_entrance.png"
    },

    "hostel_terrace": {
      name: "Hostel Terrace",
      unlockCondition: "time >= 20:00",
      available: "20:00-23:59",
      description: "City lights below. Stars above, if the pollution clears. The only truly private space in the building.",
      objects: [
        { id: "terrace_railing", action: "Lean on the railing", triggers: "terrace_reflection" },
        { id: "water_tank", action: "Sit behind the water tank", triggers: "hidden_terrace_spot" },
        { id: "phone_terrace", action: "Use the phone (better signal)", triggers: "terrace_phone_use" }
      ],
      npcs: [],
      exits: [ { to: "hostel_corridor", label: "Back downstairs" } ],
      image: "hostel_terrace.png"
    },

    "bj_campus_path": {
      name: "B.J. Medical Campus   Main Path",
      unlockCondition: "signed_out_hostel",
      available: "07:00-18:00",
      description: "Neem trees lining the path, an old colonial building, students in white coats, puddles from last night's rain.",
      objects: [
        { id: "campus_bench", action: "Sit on the bench", triggers: "campus_bench_rest" },
        { id: "samosa_stall", action: "Buy a samosa (₹15)", triggers: "samosa_vendor_npc", cost: 15 },
        { id: "bookstore", action: "Visit the medical bookstore", triggers: "bookstore_scene" }
      ],
      npcs: ["samosa_vendor", "random_mbbs_students", "senior_doctor_resident"],
      exits: [
        { to: "hostel_entrance", label: "Back to the hostel" },
        { to: "bj_anatomy_hall", label: "Anatomy building" },
        { to: "bj_library", label: "College library" },
        { to: "bj_canteen", label: "College canteen" },
        { to: "sassoon_road", label: "Exit to Sassoon Road" }
      ],
      image: "bj_campus.png"
    },

    "bj_anatomy_hall": {
      name: "Anatomy Dissection Hall",
      unlockCondition: "signed_out_hostel",
      available: "06:00-16:00",
      description: "Formalin wall. Cadavers under damp cloth. A cathedral of death with fluorescent lights that buzz like trapped wasps.",
      objects: [
        { id: "dissection_table", action: "Go to your table", triggers: "anatomy_dissection_scene", timeWindow: "06:00-13:00" },
        { id: "meera_table", action: "Pass a note to Meera", triggers: "note_passing_anatomy", unlockCondition: "in_dissection" },
        { id: "sharma_quiz", action: "Take Dr. Sharma's spot quiz", triggers: "dr_sharma_quiz_scene", unlockCondition: "in_dissection" },
        { id: "wash_basin", action: "Wash your hands", triggers: "anatomy_wash" }
      ],
      npcs: ["dr_sharma", "meera", "lab_attendant"],
      exits: [ { to: "bj_campus_path", label: "Exit to campus" } ],
      image: "anatomy_hall.png"
    },

    "bj_library": {
      name: "B.J. Medical College Library",
      unlockCondition: "signed_out_hostel",
      available: "08:00-20:00",
      description: "Colonial-era. High ceilings, wooden shelves, and a rare Sanskrit section in the basement that nobody visits.",
      objects: [
        { id: "study_area", action: "Study at a table", triggers: "library_study" },
        { id: "computer_section", action: "Use a library computer", triggers: "library_computer_coding", timeWindow: "16:00-20:00" },
        { id: "rare_books", action: "Go to the basement rare books", triggers: "rare_books_section" },
        { id: "librarian_desk", action: "Talk to the librarian", triggers: "librarian_npc" },
        { id: "build_dosage_lib", action: "Build Sneha's dosage calculator app", triggers: "dosage_build_scene", unlockCondition: "sneha_helped" }
      ],
      npcs: ["librarian_kulkarni", "studious_seniors"],
      exits: [ { to: "bj_campus_path", label: "Back to campus" } ],
      image: "bj_library.png"
    },

    "bj_canteen": {
      name: "B.J. Medical Canteen",
      unlockCondition: "signed_out_hostel",
      available: "08:00-17:00",
      description: "Smaller than VIT's, but the vada pav is legendary.",
      objects: [
        { id: "vada_pav_counter", action: "Order vada pav (₹15)", triggers: "bj_canteen_food", cost: 15 },
        { id: "chai_counter", action: "Order chai (₹10)", triggers: "bj_canteen_chai", cost: 10 },
        { id: "corner_table_bj", action: "Sit alone with the phone", triggers: "canteen_phone_coding" }
      ],
      npcs: ["canteen_owner_bhau", "random_medical_students_canteen"],
      exits: [ { to: "bj_campus_path", label: "Back to campus" } ],
      image: "bj_canteen.png"
    },

    "sassoon_road": {
      name: "Sassoon Road   Outside Campus",
      unlockCondition: "signed_out_hostel",
      available: "07:00-20:00",
      description: "Busy road connecting the medical campus to the city. Auto stands, shops, chaos.",
      objects: [
        { id: "auto_stand_sassoon", action: "Take an auto", triggers: "sassoon_auto_travel" },
        { id: "phone_repair_shop", action: "Visit the phone repair shop", triggers: "phone_shop_scene" },
        { id: "stationery_store", action: "Buy supplies (₹20)", triggers: "stationery_shopping", cost: 20 },
        { id: "juice_center", action: "Fresh juice centre (₹40)", triggers: "juice_vendor_npc", cost: 40 }
      ],
      npcs: ["phone_shop_owner", "juice_vendor", "auto_driver_anna"],
      exits: [
        { to: "bj_campus_path", label: "Back to campus" },
        { to: "koregaon_park", label: "Auto to Koregaon Park (20 min, ₹120)", travelTime: 20, cost: 120, unlockCondition: "time >= 14:00 AND has_excuse" }
      ]
    },

    "koregaon_park": {
      name: "Koregaon Park   Kavya's Family Area",
      unlockCondition: "signed_out_hostel AND has_excuse",
      available: "00:00-23:59",
      description: "Tree-lined streets, expensive cafes, her parents' flat where she is a different person entirely.",
      objects: [
        { id: "parents_flat", action: "Visit the parents' flat", triggers: "iyer_home_scene" },
        { id: "cafe_koregaon", action: "Sit at a cafe", triggers: "cafe_scene" },
        { id: "street_shops", action: "Browse the street shops", triggers: "koregaon_shopping" }
      ],
      npcs: ["dr_venkatesh_papa", "lakshmi_amma", "cafe_barista"],
      exits: [ { to: "sassoon_road", label: "Auto back to college (20 min)" } ]
    }
  }
};

/* ------------------------------------------------------------
   QUEST COLOUR TAGGING   mark which room actions advance the
   MAIN story vs a SIDE quest, so the Hub can colour them.
   ------------------------------------------------------------ */
setup._questTag = {
  main: [
    "phone", "wardrobe", "pulsar_keys", "id_card", "classroom_door", "rohit_table",
    "dbms_work", "night_call", "end_day", "landlord_try", "sleep_next_day",
    "shower_stall", "sign_out_register", "dissection_table", "meera_table",
    "manuscript_reveal_obj", "wait_priya_sleep", "test_swap_obj",
    "hostel_windows", "phone_booth", "pco_stall", "phone_call_spot"
  ],
  side: [
    "chai_order", "biscuit_jar", "raju_phone", "nikhil_notes", "rohit_cad", "panwala",
    "deliver_packet", "ananya", "stray_dog",
    "under_mattress", "phone_redmi", "sneha_door", "build_dosage", "build_dosage_lib",
    "sharma_quiz", "priya_photo_req", "priya_bed", "mess_didi_favor", "divya_sofa",
    "samosa_stall", "computer_section", "arjun_alone", "kavya_alone"
  ]
};
(function tagQuests() {
  ["arjun", "kavya"].forEach(function (pov) {
    Object.keys(setup.locations[pov]).forEach(function (lid) {
      (setup.locations[pov][lid].objects || []).forEach(function (o) {
        if (setup._questTag.main.indexOf(o.id) !== -1) o.quest = "main";
        else if (setup._questTag.side.indexOf(o.id) !== -1) o.quest = "side";
      });
    });
  });
})();

/* ------------------------------------------------------------
   OBJECTIVE REGISTRIES
   ------------------------------------------------------------ */

setup.objectives = {

  arjun: {
    main: [
      { id: "a_obj_wake", title: "Start the day", pov: "arjun",
        description: "Check your phone, then get dressed.",
        status: "active", completionTrigger: "morning_routine_complete",
        hint: {
          where: "Your PG room in Katraj (where you start).",
          when: "Right now   6:32 AM.",
          who: "Rohit is asleep in the other cot; you can wake him for banter, but you don't have to.",
          how: "Two required steps: (1) Check your phone   the “📱 Phone” button top-right, or “Check your phone” in the room. (2) “Get dressed” at the wardrobe   that is what counts as “ready”. Optional: bathroom (shower / brush / shave), look at Meera's photos, wake Rohit. Grab the “Pulsar keys” off the desk before you leave   you can't ride to VIT without them."
        } },
      { id: "a_obj_vit", title: "Attend the DBMS lecture at VIT", pov: "arjun",
        description: "Prof. Krishnan's class. Get to campus and into room C-204.",
        unlockCondition: "morning_routine_complete", completionTrigger: "dbms_lecture_done",
        lockNote: "Unlocks once you've checked your phone and gotten dressed.",
        reward: { coding_skill: 2 },
        hint: {
          where: "VIT → C-Block → “Enter the DBMS class”.",
          when: "The class runs 09:45–11:00. If you arrive early the door won't open yet.",
          who: "Prof. Krishnan; Rohit and Nikhil are in the room.",
          how: "From Katraj Main Road, “Ride to VIT” (needs the Pulsar keys). At the gate, “Show your ID to the guard” to get onto campus, then go to C-Block and enter the class.  •  PASSING TIME until 9:45: order a cutting chai at Raju's tapri, feed the stray, do the Panwala errand, sit in the VIT canteen or library, shoot hoops at the ground. Every action moves the clock a little."
        } },
      { id: "a_obj_rohit", title: "Talk to Rohit about your situation", pov: "arjun",
        description: "He asked to meet at the canteen after class.",
        unlockCondition: "dbms_lecture_done", completionTrigger: "rohit_confrontation_done",
        lockNote: "Unlocks after the DBMS lecture.",
        reward: { rel_rohit: 5 },
        hint: {
          where: "VIT Canteen → “Sit with Rohit”.",
          when: "Any time after the DBMS lecture (he texts you the moment class ends).",
          who: "Rohit.",
          how: "Walk from C-Block to the canteen and choose “Sit with Rohit”. This is the scene that unlocks the evening   and doing it opens his CAD side quest back at the PG."
        } },
      { id: "a_obj_meera", title: "Try to reach Meera", pov: "arjun",
        description: "Find any way to contact her. It probably won't work   that's the point.",
        unlockCondition: "rohit_confrontation_done AND time >= 18:00", completionTrigger: "meera_contact_attempted",
        lockNote: "Unlocks after the canteen talk with Rohit, once it's past 6:00 PM.",
        hint: {
          where: "Easiest: your PG room → “Try the hostel landline”. Also works: ride to “Outside B.J. Medical” (unlocks after Rohit's CAD side quest) and look at the windows / try the PCO / from Sinhagad Road.",
          when: "After 6:00 PM, and after the canteen talk with Rohit.",
          who: "Mrs. Joshi answers the hostel phone. Meera never will.",
          how: "Any one contact attempt completes it. If nothing shows in your room yet, it's not 6 PM   pass time: fix Raju's phone, ride to Kothrud for a home meal, take the Sinhagad evening ride, debug Rohit's CAD."
        } },
      { id: "a_obj_night", title: "End the day", pov: "arjun",
        description: "Submit the DBMS assignment, then lie down.",
        unlockCondition: "meera_contact_attempted AND time >= 21:00", completionTrigger: "arjun_day1_complete",
        lockNote: "Unlocks after you've tried to reach Meera, once it's past 9:00 PM.",
        reward: { coding_skill: 1 },
        hint: {
          where: "Your PG room.",
          when: "After 9:00 PM, once you've tried to reach Meera.",
          who: "Rohit is asleep.",
          how: "“Work on the DBMS assignment” (after 7 PM) if you haven't, then “End the day   lie down”. That last action closes Arjun's Day 1."
        } }
    ],
    side: [
      { id: "a_sq_raju_phone", title: "Fix Raju Bhaiya's phone", pov: "arjun",
        description: "His screen is a spiderweb of cracks. You're the tech guy.",
        unlockCondition: "talked_to_raju", completionTrigger: "raju_phone_fixed",
        reward: { rel_raju: 5, item: "free_chai_coupon" },
        hint: {
          where: "Raju's Chai Tapri (down the PG stairs, then “Go to the chai tapri”).",
          when: "Tapri is open 6 AM–10 PM. Any time.",
          who: "Raju Bhaiya.",
          how: "First “Order a cutting chai” and talk to him   that reveals the cracked phone. Then “Look at Raju's cracked phone” to fix it. Reward: free chai for a week."
        } },
      { id: "a_sq_rohit_cad", title: "Debug Rohit's CAD project", pov: "arjun",
        description: "His mechanical drawing won't render. Classic Rohit.",
        unlockCondition: "rohit_confrontation_done", completionTrigger: "rohit_cad_fixed",
        reward: { rel_rohit: 5, intel: "rohit_reveals_meera_sighting" },
        hint: {
          where: "Your PG room → “Debug Rohit's CAD project”.",
          when: "After the canteen talk with Rohit (he promised biryani for it). Evening is natural but it's not time-locked.",
          who: "Rohit.",
          how: "Go back to the PG after the canteen scene and pick “Debug Rohit's CAD project”. IMPORTANT: the reward is intel   Rohit mentions someone saw Meera in the B.J. library. That unlocks the “Outside B.J. Medical” location on the travel menu."
        } },
      { id: "a_sq_nikhil", title: "Get DBMS notes from Nikhil", pov: "arjun",
        description: "You missed half the lecture mentally. Nikhil's got the goods.",
        unlockCondition: "dbms_lecture_done", completionTrigger: "nikhil_notes_obtained",
        reward: { coding_skill: 2, item: "nikhil_notes" },
        hint: {
          where: "VIT C-Block → “Ask Nikhil for notes” (in the corridor, right where the lecture was).",
          when: "Straight after the DBMS lecture   he catches you in the corridor.",
          who: "Nikhil (round glasses, colour-coded notebook).",
          how: "Don't leave C-Block after class   the “Ask Nikhil for notes” action appears among the room's options once the lecture is done."
        } },
      { id: "a_sq_panwala", title: "Panwala's delivery run", pov: "arjun",
        description: "Bhau needs a packet delivered to the VIT gate. Quick cash.",
        unlockCondition: "talked_to_panwala", completionTrigger: "panwala_delivery_done",
        reward: { money: 50 },
        hint: {
          where: "Accept it at Katraj Main Road (“Talk to the panwala”). Deliver it at the VIT main gate (“Hand Guard Patil the panwala's packet”).",
          when: "Any time, but you need to be heading to VIT anyway.",
          who: "Panwala Bhau (gives the job); Guard Patil at the gate (receives it).",
          how: "Talk to the panwala and choose “Take the packet”   that adds it to your inventory and starts this quest. Then when you're at the VIT gate, hand it over. ₹50."
        } },
      { id: "a_sq_ananya", title: "The girl at the library", pov: "arjun",
        description: "Ananya from 2nd-year CSE keeps looking at you. She wants to ask something.",
        unlockCondition: "visited_vit_library", completionTrigger: "ananya_conversation_done",
        reward: { rel_ananya: 3, intel: "ananya_has_bj_connection" },
        hint: {
          where: "VIT Library → “Talk to Ananya”.",
          when: "Library is open 8:30 AM–8 PM. Any time after you've entered campus.",
          who: "Ananya (2nd-year CSE). Her cousin Sneha lives in Room 302   next to Meera.",
          how: "Enter the library once to discover the quest, then choose “Talk to Ananya”. Fixing her code gets you an intel thread toward Meera."
        } },
      { id: "a_sq_stray", title: "Feed the stray", pov: "arjun",
        description: "The brown dog near the PG looks hungry. Get biscuits from the tapri.",
        unlockCondition: "has_biscuit", completionTrigger: "dog_fed",
        reward: { karma: 2 },
        hint: {
          where: "Buy Parle-G at Raju's tapri; feed the dog on Katraj Main Road (“The brown stray dog”).",
          when: "Any time.",
          who: "The one-eared brown dog.",
          how: "“Buy a Parle-G packet” (₹10) at the tapri, then go to the street and interact with the dog."
        } },
      { id: "a_sq_dbms", title: "Complete the DBMS assignment", pov: "arjun",
        description: "SQL queries won't write themselves. Due tomorrow.",
        unlockCondition: "time >= 19:00", completionTrigger: "dbms_assignment_submitted",
        reward: { coding_skill: 3, academic_standing: 2 },
        hint: {
          where: "Your PG room (“Work on the DBMS assignment”) or the VIT CS Lab (after 2 PM).",
          when: "The room option appears after 7 PM. The lab is open 9 AM–5 PM.",
          who: "Nobody   solo coding.",
          how: "Either sit at a lab terminal in the afternoon, or do it at night in the room. Doing it also satisfies part of “End the day”."
        } },
      { id: "a_sq_self", title: "A rare hour alone", pov: "arjun", day: 1,
        description: "The PG bathroom has a latch that mostly holds, and for once nobody needs anything from you. Sit with your own body a while   it's the only one you've ever had.",
        unlockCondition: "morning_routine_complete", completionTrigger: "arjun_self_explored",
        reward: { karma: 1 },
        hint: {
          where: "PG bathroom → “Bolt the door. Take the hour to yourself.”",
          when: "Any time you're back at the PG and Rohit isn't around   morning or evening.",
          who: "Just you. No one else.",
          how: "A slow, private scene about noticing this body before the day takes it back. It completes on its own."
        } }
    ]
  },

  kavya: {
    main: [
      { id: "k_obj_morning", title: "Survive the morning", pov: "kavya",
        description: "Get through the bathroom queue and get dressed.",
        status: "active", completionTrigger: "kavya_morning_done",
        hint: {
          where: "Room 304 → corridor → 3rd-floor bathroom.",
          when: "Now   5:30 AM. The queue is worst 5:30–7:00.",
          who: "Meera (awake, reading), Priya (asleep), Sneha in the queue.",
          how: "Go to the bathroom and “Take a shower”   that scene includes getting dressed and is what completes this. Optional: period check, mirror, brush teeth; check the Samsung; find the Redmi under your mattress; talk to Meera. Then you're free to sign out."
        } },
      { id: "k_obj_anatomy", title: "Attend anatomy dissection", pov: "kavya",
        description: "Brachial plexus. Sign out, cross campus, get to your table.",
        unlockCondition: "kavya_morning_done", completionTrigger: "anatomy_lab_done",
        lockNote: "Unlocks once you've showered and dressed (bathroom → Take a shower).",
        reward: { med_knowledge: 2 },
        hint: {
          where: "Hostel entrance → “Sign out” → campus path → Anatomy Dissection Hall → “Go to your table”.",
          when: "The dissection runs from 9:00. If you arrive earlier you'll wait outside until it starts.",
          who: "Dr. Sharma; Meera at the next table (she passes you a note here).",
          how: "You MUST “Sign out” at the entrance first (pick a reason)   nothing off-hostel opens until you do. Then walk out to the campus path and into the Anatomy building. PASSING TIME until 9: mess breakfast, the samosa stall, help Sneha, sit on a campus bench."
        } },
      { id: "k_obj_note", title: "Read Meera's note", pov: "kavya",
        description: "She slipped it under your dissection tray.",
        unlockCondition: "anatomy_lab_done", completionTrigger: "meera_note_read",
        lockNote: "Unlocks during the anatomy dissection.",
        hint: {
          where: "Anatomy Dissection Hall → “Pass a note to Meera” (that action both reads hers and answers).",
          when: "During or just after the dissection   stay in the hall.",
          who: "Meera.",
          how: "Right after “Go to your table”, pick “Pass a note to Meera” from the hall's options. It says: don't make plans tonight."
        } },
      { id: "k_obj_manuscript", title: "Learn Meera's secret", pov: "kavya",
        description: "Wait until Priya leaves for her evening jog, then talk to Meera in the room.",
        unlockCondition: "meera_note_read AND time >= 19:15 AND priya_out_jogging", completionTrigger: "manuscript_revealed",
        lockNote: "Unlocks after you've read Meera's note, once Priya leaves for her 7:15 PM jog   be back in Room 304 by then.",
        hint: {
          where: "Room 304 → “Ask Meera what she found”.",
          when: "After 7:15 PM. Priya leaves for her jog at 7:15   you'll get a notification when she does. Be back in the hostel by then.",
          who: "Meera (Priya must be OUT).",
          how: "Spend the afternoon on campus / side quests, then return to Room 304 in the evening. Once Priya has gone jogging, the “Ask Meera what she found” action appears. PASSING TIME in the afternoon: library coding, GitHub, build Sneha's app, Divya in the common room after 6, Mess Didi after 7."
        } },
      { id: "k_obj_swap", title: "Try the impossible", pov: "kavya",
        description: "The body-swap ritual with Meera, once Priya is asleep.",
        unlockCondition: "manuscript_revealed AND time >= 23:00 AND priya_asleep", completionTrigger: "test_swap_complete",
        lockNote: "Unlocks after the manuscript reveal   pick “Wait for Priya to fall asleep” (from 10:30 PM) to reach it.",
        reward: { trust_meera: 10 },
        hint: {
          where: "Room 304.",
          when: "After 11:00 PM, with Priya asleep.",
          who: "Meera.",
          how: "After the manuscript reveal, pick “Wait for Priya to fall asleep” (available from 10:30 PM)   that advances time to 11 and gets Priya down. Then “Try the ritual with Meera”. This is the end of Kavya's Day 1."
        } }
    ],
    side: [
      { id: "k_sq_sneha", title: "Help Sneha with pharmacology", pov: "kavya",
        description: "She forgot her notebook. Help with dosage calculations.",
        unlockCondition: "talked_to_sneha", completionTrigger: "sneha_helped",
        reward: { rel_sneha: 3, coding_skill: 2, intel: "surprise_test_info" },
        hint: {
          where: "Hostel corridor → “Knock on Room 302 (Sneha)”.",
          when: "Morning is easiest, but any time works.",
          who: "Sneha (Room 302).",
          how: "Knock on 302. Walking her through the dosage formulas completes it and tips you off about a surprise test   and opens the “build a calculator app” follow-up."
        } },
      { id: "k_sq_github", title: "Check the GitHub pull request", pov: "kavya",
        description: "Your NLP library PR might be merged. Check on the Redmi.",
        unlockCondition: "has_redmi_phone", completionTrigger: "github_checked",
        reward: { coding_skill: 3, confidence: 2 },
        hint: {
          where: "Anywhere, once you have the Redmi   the “🔒 Redmi” button appears top-right.",
          when: "Any time after you find the phone.",
          who: " ",
          how: "In Room 304, “Reach under the mattress” to find the secret Redmi. Then open it (header button or the room object) and view GitHub. Best signal is the terrace (after 8 PM) or the B.J. library computers."
        } },
      { id: "k_sq_dosage", title: "Build a dosage calculator app", pov: "kavya",
        description: "Turn Sneha's problem into a quick coding project.",
        unlockCondition: "sneha_helped", completionTrigger: "dosage_app_built",
        reward: { coding_skill: 5, rel_sneha: 5 },
        hint: {
          where: "Room 304 or the B.J. library → “Build Sneha's dosage calculator app”.",
          when: "After you've helped Sneha with the formulas.",
          who: "  (you build it alone, on the Redmi).",
          how: "The action appears in Room 304 and in the library once “Help Sneha” is done. ~45 minutes of game time."
        } },
      { id: "k_sq_quiz", title: "Ace Dr. Sharma's spot quiz", pov: "kavya",
        description: "Name all five terminal branches of the brachial plexus.",
        unlockCondition: "in_dissection", completionTrigger: "spot_quiz_aced",
        reward: { med_knowledge: 3 },
        hint: {
          where: "Anatomy Dissection Hall → “Take Dr. Sharma's spot quiz”.",
          when: "During the dissection   stay at your table.",
          who: "Dr. Sharma.",
          how: "After “Go to your table”, the quiz action appears alongside the note. You answer automatically   Kavya knows this cold, she just hates it."
        } },
      { id: "k_sq_mess", title: "Mess Didi's request", pov: "kavya",
        description: "Help count the stock. She'll sneak you extra gulab jamun.",
        unlockCondition: "time >= 19:00", completionTrigger: "mess_stock_helped",
        reward: { item: "gulab_jamun", rel_mess_didi: 3 },
        hint: {
          where: "Hostel Mess Hall → “Help Mess Didi with the stock count”.",
          when: "Dinner service, 7:00–9:00 PM.",
          who: "Mess Didi (Savita).",
          how: "Go down to the mess after 7 PM; the stock-count action is there. You keep one gulab jamun for Meera."
        } },
      { id: "k_sq_libcode", title: "Sneak some coding time", pov: "kavya",
        description: "The library computer section is empty after 4 PM. Code freely.",
        unlockCondition: "signed_out_hostel AND time >= 16:00", completionTrigger: "library_coding_done",
        reward: { coding_skill: 5, satisfaction: 5 },
        hint: {
          where: "B.J. Medical College Library → “Use a library computer”.",
          when: "After 4 PM (the medical students clear out). You must be signed out of the hostel.",
          who: "  (just you and a real keyboard).",
          how: "After the dissection, don't rush back   spend the late afternoon at the library. ~45 minutes."
        } },
      { id: "k_sq_priya", title: "Priya's photo request", pov: "kavya",
        description: "Priya wants you to take her 'candid' Instagram photos. Ugh.",
        unlockCondition: "priya_asks", completionTrigger: "priya_photos_taken",
        reward: { rel_priya: 3, priya_suspicion: -2 },
        hint: {
          where: "Room 304 → “Take Priya's 'candid' photos”.",
          when: "Afternoon   talk to Priya in the room after ~1 PM and she'll ask.",
          who: "Priya.",
          how: "“Check if Priya is awake” in the afternoon triggers the ask; then “Take Priya's 'candid' photos”. Doing this lowers her suspicion of you   worth it."
        } },
      { id: "k_sq_samosa", title: "Campus samosa run", pov: "kavya",
        description: "Get one for yourself and one for Meera.",
        unlockCondition: "signed_out_hostel AND has_money >= 30", completionTrigger: "samosa_bought",
        reward: { rel_meera: 2 },
        hint: {
          where: "B.J. Campus main path → “Buy a samosa”.",
          when: "Any time you're on campus (you need ₹30+).",
          who: "The samosa vendor   he already knows Meera's order.",
          how: "Sign out, walk the campus path, buy the samosa. You carry one back for Meera."
        } },
      { id: "k_sq_divya", title: "Divya Didi's advice", pov: "kavya",
        description: "A 4th-year senior in the common room. She's been through it.",
        unlockCondition: "visited_common_room AND time >= 18:00", completionTrigger: "divya_conversation_done",
        reward: { rel_divya: 3, confidence: 2, intel: "exam_strategy_tips" },
        hint: {
          where: "Hostel Common Room (off the stairwell) → “Talk to Divya Didi”.",
          when: "After 6 PM   the common room belongs to the seniors then.",
          who: "Divya (4th-year, Tamil, the hostel's unofficial big sister).",
          how: "Visit the common room once to discover it, then after 6 PM the “Talk to Divya Didi” action appears. She gives real exam strategy."
        } },
      { id: "k_sq_self", title: "Ten minutes that are yours", pov: "kavya", day: 1,
        description: "The shower stall has the only bolt in the building that holds, and you've never used it for more than four efficient minutes. This body was chosen for you   but what you do alone in a locked room is the last thing about it that isn't.",
        unlockCondition: "kavya_morning_done", completionTrigger: "kavya_self_explored",
        reward: { confidence: 2 },
        hint: {
          where: "Hostel bathroom → “Take the stall. Properly, this time.”",
          when: "Morning before you sign out, or evening once you're back in the hostel.",
          who: "Just you. No one else.",
          how: "A slow, tender scene about claiming ownership of your own body   breast and clitoral touch only, a line you keep. It completes on its own."
        } }
    ]
  }
};

/* stamp every objective with the day it belongs to (all Day 1 for now) */
(function tagObjectiveDays() {
  ["arjun", "kavya"].forEach(function (pov) {
    setup.objectives[pov].main.concat(setup.objectives[pov].side).forEach(function (o) {
      if (!o.day) o.day = 1;
    });
  });
})();

/* ------------------------------------------------------------
   TIMED EVENTS
   ------------------------------------------------------------ */

setup.timedEvents = [
  { time: "13:00", character: "arjun", event: "aai_phone_call",   passage: "EV_aai_phone_call" },
  { time: "15:30", character: "arjun", event: "nikhil_whatsapp",  passage: "EV_nikhil_whatsapp" },
  { time: "17:00", character: "arjun", event: "sunset_melancholy", passage: "EV_sunset_melancholy" },
  { time: "09:30", character: "kavya", event: "papa_missed_call", passage: "EV_papa_missed_call" },
  { time: "14:00", character: "kavya", event: "github_notification", passage: "EV_github_notification" },
  { time: "16:30", character: "kavya", event: "meera_whisper",    passage: "EV_meera_whisper" },
  { time: "19:15", character: "kavya", event: "priya_leaves_jog", passage: "EV_priya_leaves_jog" }
];

/* ------------------------------------------------------------
   NAME TABLES
   ------------------------------------------------------------ */

setup.npcNames = {
  rohit: "Rohit", random_pg_boy: "a bleary PG boy", pg_landlord_sharma: "Sharma uncle (landlord)",
  raju_bhaiya: "Raju Bhaiya", random_tapri_customer: "Sudhir (Infosys uncle)",
  panwala_bhau: "Panwala Bhau", fruit_vendor_tai: "Fruit Vendor Tai", random_passerby: "a passer-by",
  security_guard_patil: "Guard Patil", random_vit_student: "a VIT student",
  nikhil_classmate: "Nikhil", prof_krishnan: "Prof. Krishnan", random_cse_student: "a CSE student",
  canteen_anna: "Canteen Anna", random_canteen_girls: "a table of girls",
  lab_assistant_suresh: "Suresh (lab assistant)", random_lab_student: "a lab regular",
  librarian_madam: "the librarian", studious_girl_ananya: "Ananya",
  sports_boys_group: "the ground boys", random_couple: "a couple pretending to study",
  dhaba_owner: "the dhaba owner", random_bikers: "three Royal Enfield boys",
  morning_jogger_uncle: "a jogging uncle", college_girls_group: "a group of college girls", ice_cream_vendor: "the ice cream wala",
  aai_sunita: "Aai", papa_suresh: "Papa", pooja_sister: "Pooja",
  chai_vendor_outside_bj: "a chai vendor", random_medical_students: "medical students",
  meera: "Meera", priya: "Priya", sneha_302: "Sneha", random_hostel_girl: "a hostel girl",
  mrs_joshi_warden: "Mrs. Joshi", mess_didi: "Mess Didi (Savita)", random_mess_girls: "the mess crowd",
  random_hostel_girls_tv: "girls arguing over the remote", senior_student_divya: "Divya Didi",
  chowkidar_ramesh: "Chowkidar Ramesh", samosa_vendor: "the samosa vendor",
  random_mbbs_students: "MBBS students", senior_doctor_resident: "a resident doctor",
  dr_sharma: "Dr. Sharma", lab_attendant: "the lab attendant",
  librarian_kulkarni: "Mrs. Kulkarni (librarian)", studious_seniors: "silent seniors",
  canteen_owner_bhau: "Bhau (canteen owner)", random_medical_students_canteen: "the canteen crowd",
  phone_shop_owner: "the phone shop owner", juice_vendor: "the juice wala", auto_driver_anna: "Anna (auto driver)",
  dr_venkatesh_papa: "Papa", lakshmi_amma: "Amma", cafe_barista: "the barista",
  random_hostel_girls: "girls in the queue"
};

setup.itemNames = {
  bike_keys: "Pulsar keys", biscuit: "Parle-G packet", nikhil_notes: "Nikhil's DBMS notes",
  free_chai_coupon: "Raju's free-chai promise", night_ride_invitation: "night ride number (Classic Milds wrapper)",
  redmi_phone: "Redmi Note (secret phone)", gulab_jamun: "extra gulab jamun", meera_samosa: "samosa for Meera",
  panwala_packet: "Panwala's packet (Classic Milds)", usb_drive: "USB drive (tokenizer code)"
};

/* ------------------------------------------------------------
   TIME HELPERS
   ------------------------------------------------------------ */

setup.parseHM = function (s) {
  var m = String(s).match(/(\d{1,2}):(\d{2})/);
  return m ? (parseInt(m[1], 10) * 60 + parseInt(m[2], 10)) : 0;
};
setup.fmtHM = function (mins) {
  mins = ((mins % 1440) + 1440) % 1440;
  var h = Math.floor(mins / 60), m = mins % 60;
  var ap = h < 12 ? "AM" : "PM";
  var h12 = (h % 12) || 12;
  return h12 + ":" + (m < 10 ? "0" : "") + m + " " + ap;
};
setup.clock = function (who) {
  who = who || V().pov;
  return V().time[who];
};
setup.clockStr = function (who) { return setup.fmtHM(setup.clock(who)); };
setup.dayName = function () { return "Thursday, Day " + V().day; };
setup.weekday = function () { return 4; }; /* Day 1 = Thursday */
setup.dayPhase = function (who) {
  var t = setup.clock(who);
  if (t < 300) return "night";
  if (t < 420) return "dawn";
  if (t < 720) return "morning";
  if (t < 1020) return "afternoon";
  if (t < 1200) return "evening";
  return "night";
};

setup.advanceTime = function (mins, who) {
  who = who || V().pov;
  var cap = 1439;
  V().time[who] = Math.min(cap, V().time[who] + (mins || 0));
  setup.checkTimedEvents(who);
  setup.refreshWorld();
  return "";
};

/* Where you can sensibly sit / doze to burn an hour. Not corridors, gates,
   bathrooms, the dissection hall, the open street. */
setup._restLocs = {
  arjun: [
    "katraj_pg_room", "tapri_chai", "katraj_snake_park",
    "vit_canteen", "vit_library", "vit_ground",
    "kothrud_home", "sinhagad_road"
  ],
  kavya: [
    "hostel_room_304", "hostel_common_room", "hostel_terrace", "hostel_mess",
    "bj_library", "bj_canteen", "bj_campus_path", "koregaon_park"
  ]
};
setup.canRestHere = function () {
  return setup.clock() < 1380 &&
         setup._restLocs[V().pov].indexOf(setup.hereId()) !== -1;
};

/* ---- "Sleep -> next day": a room action that appears once this
   character's main objectives for the day are all complete ---- */
setup.dayMainsDone = function (who) {
  var d = V().day;
  var mains = setup.objectives[who].main.filter(function (o) { return (o.day || 1) === d; });
  return mains.length > 0 && mains.every(function (o) { return setup.objState(o) === "complete"; });
};
setup.dayFullyDone = function () {
  return setup.dayMainsDone("arjun") && setup.dayMainsDone("kavya");
};
setup.dayEnd = {
  1: { screen: "Day1Complete" },
  2: { screen: "Day2Complete" }
};
setup.locations.arjun.katraj_pg_room.objects.push(
  { id: "sleep_next_day", action: "Sleep   end the day", triggers: "DayWrap", unlockCondition: "mains_done", quest: "main" }
);
setup.locations.kavya.hostel_room_304.objects.push(
  { id: "sleep_next_day", action: "Sleep   end the day", triggers: "DayWrap", unlockCondition: "mains_done", quest: "main" }
);

/* explicit "kill time" action   lets a stuck player reach a time gate */
setup.passTime = function (mins) {
  var before = setup.clock();
  setup.advanceTime(mins);
  var moved = setup.clock() - before;
  if (moved <= 0) { setup.toast("suspicion", "It's too late in the day to wait any longer."); return ""; }
  setup.stat("energy", mins >= 60 ? 4 : 1);
  setup.toast("objective", (mins >= 60 ? "You rest for an hour." : "Time passes.") + " Now " + setup.clockStr() + ".");
  return "";
};

setup.checkTimedEvents = function (who) {
  var S = V(), t = S.time[who];
  setup.timedEvents.forEach(function (ev) {
    if (ev.character !== who) return;
    if ((ev.day || 1) !== S.day) return;
    if (S.firedEvents.indexOf(ev.event) !== -1) return;
    if (t >= setup.parseHM(ev.time)) {
      S.firedEvents.push(ev.event);
      if (ev.event === "priya_leaves_jog") S.flags.priya_out_jogging = true;
      if (ev.setFlag) S.flags[ev.setFlag] = true;
      S.eventQueue.push(ev.passage);
    }
  });
};

/* ------------------------------------------------------------
   CONDITION EVALUATOR
   ------------------------------------------------------------ */

setup.cond = function (expr, who) {
  if (!expr) return true;
  who = who || V().pov;
  return String(expr).split(/\s+OR\s+/).some(function (orPart) {
    return orPart.split(/\s+AND\s+/).every(function (atom) {
      return setup.atom(atom.trim(), who);
    });
  });
};

setup.atom = function (a, who) {
  var S = V(), m;
  if (a.indexOf("not ") === 0) return !setup.atom(a.slice(4).trim(), who);
  if ((m = a.match(/^time\s*(>=|<=|>|<|==)\s*(\d{1,2}):(\d{2})$/))) {
    var t = setup.clock(who);
    var v = parseInt(m[2], 10) * 60 + parseInt(m[3], 10);
    switch (m[1]) {
      case ">=": return t >= v;
      case "<=": return t <= v;
      case ">":  return t > v;
      case "<":  return t < v;
      default:   return t === v;
    }
  }
  if ((m = a.match(/^day\s*(>=|<=|>|<|==)\s*(\d+)$/))) {
    var d = V().day, dv = parseInt(m[2], 10);
    switch (m[1]) {
      case ">=": return d >= dv;
      case "<=": return d <= dv;
      case ">":  return d > dv;
      case "<":  return d < dv;
      default:   return d === dv;
    }
  }
  if ((m = a.match(/^has_money\s*>=\s*(\d+)$/))) return setup.money(who) >= parseInt(m[1], 10);
  if (a === "is_weekend") return setup.weekday() === 0 || setup.weekday() === 6;
  if (a === "mains_done") return setup.dayMainsDone(who);
  if (a === "not_priya_out") return !V().flags.priya_out_jogging && !V().flags.priya_in_common_room && !V().flags.priya_left_for_class;
  if (a === "has_bike_keys") return setup.hasItem("bike_keys");
  if (a === "has_biscuit") return setup.hasItem("biscuit");
  if (a === "has_redmi_phone") return setup.hasItem("redmi_phone");
  if (a.indexOf("has_") === 0) {
    var rest = a.slice(4);
    return setup.hasItem(rest) || !!S.flags[a] || !!S.flags[rest];
  }
  if (S.objectives[a] === "complete") return true;
  return !!S.flags[a];
};

/* ------------------------------------------------------------
   FLAGS / OBJECTIVES / REWARDS
   ------------------------------------------------------------ */

setup.flag = function (name, val) {
  V().flags[name] = (val === undefined) ? true : val;
  setup.refreshObjectives();
  return "";
};
setup.has = function (name) { return !!V().flags[name]; };

setup.allObjectives = function (who) {
  return setup.objectives[who].main.concat(setup.objectives[who].side);
};

/* ---- objective hint panel (per-objective ⓘ where/when/who/how) ---- */
try { setup._hints = JSON.parse(localStorage.getItem("vidhi_hints") || "{}"); }
catch (e) { setup._hints = {}; }

setup.toggleHint = function (id, force) {
  setup._hints[id] = (force === undefined) ? !setup._hints[id] : !!force;
  try { localStorage.setItem("vidhi_hints", JSON.stringify(setup._hints)); } catch (e) {}
  var box = document.querySelector('.obj-hint[data-h="' + id + '"]');
  var row = document.querySelector('.obj-row[data-id="' + id + '"]');
  if (box) box.classList.toggle("open", !!setup._hints[id]);
  if (row) row.classList.toggle("expanded", !!setup._hints[id]);
  return false;
};

/* delegated   works regardless of how the sidebar container is (re)rendered */
jQuery(document).on("click", ".info-i", function (ev) {
  ev.preventDefault();
  var id = jQuery(this).closest(".obj-row").attr("data-id");
  if (id) setup.toggleHint(id);
});

setup.objLine = function (o, isSide) {
  var st = setup.objState(o);
  var done = st === "complete";
  var locked = st === "locked";
  var open = !!setup._hints[o.id];
  var h = o.hint;
  var cls = "obj-row " + (isSide ? "side" : "main") +
            (done ? " done" : "") + (locked ? " locked" : "") + (open ? " expanded" : "");
  var lockLine = (locked && o.lockNote)
    ? '<span class="obj-lock">🔒 ' + o.lockNote + '</span>' : "";
  var out = '<li class="' + cls + '" data-id="' + o.id + '">' +
    '<div class="obj-head">' +
      '<span class="box"></span>' +
      '<span class="txt">' + o.title + '<small>' + o.description + '</small>' + lockLine + '</span>' +
      (h ? '<button type="button" class="info-i" title="Where / when / who / how">i</button>' : '') +
    '</div>';
  if (h) {
    out += '<div class="obj-hint' + (open ? " open" : "") + '" data-h="' + o.id + '">' +
      (h.where ? '<p><b>Where.</b> ' + h.where + '</p>' : '') +
      (h.when ? '<p><b>When.</b> ' + h.when + '</p>' : '') +
      (h.who ? '<p><b>Who.</b> ' + h.who + '</p>' : '') +
      (h.how ? '<p><b>How.</b> ' + h.how + '</p>' : '') +
      '</div>';
  }
  return out + '</li>';
};

setup.objState = function (o) {
  var S = V();
  if (S.objectives[o.id]) return S.objectives[o.id];
  return o.status === "active" ? "active" : "locked";
};

setup.refreshObjectives = function () {
  var S = V();
  ["arjun", "kavya"].forEach(function (who) {
    var sideIds = setup.objectives[who].side.map(function (s) { return s.id; });
    setup.allObjectives(who).forEach(function (o) {
      if (o.day && o.day !== S.day) return;   /* only the current day's objectives */
      var cur = setup.objState(o);
      var isSide = sideIds.indexOf(o.id) !== -1;
      if (cur === "locked") {
        var ready = o.unlockCondition ? setup.cond(o.unlockCondition, who) : (o.status === "active");
        if (ready) {
          S.objectives[o.id] = "active";
          if (isSide && S.sideDiscovered.indexOf(o.id) === -1) S.sideDiscovered.push(o.id);
          setup.toast("objective", (isSide ? "Side quest   " : "Objective   ") + o.title);
          cur = "active";
        }
      }
      if (cur === "active" && o.completionTrigger && S.flags[o.completionTrigger]) {
        S.objectives[o.id] = "complete";
        setup.toast("objective", "✓ " + o.title);
        if (o.reward) setup.applyReward(o.reward, who);
      }
    });
  });
};

setup.refreshWorld = function () {
  var S = V();
  setup.refreshObjectives();
  /* POV switch point 1: after Arjun's morning routine, Kavya opens up */
  if (S.flags.morning_routine_complete && !S.povUnlocked.kavya) {
    S.povUnlocked.kavya = true;
    setup.toast("swap", "New perspective unlocked   Kavya. Switch any time from the toggle up top.");
  }
  /* mood drift */
  if (S.day === 1 && S.flags.arjun_day1_complete) S.mood.arjun = "hollowed out";
  if (S.day === 1 && S.flags.test_swap_complete) S.mood.kavya = "electrified";
};

/* ritual swap bookkeeping (Day 1 test = swap #1) */
setup.doSwap = function () {
  var S = V();
  S.swapCount += 1;
  S.swapActive = !S.swapActive;
  S.barrierIntegrity = Math.max(0, Math.round(100 - (S.swapCount / 70) * 100));
  setup.toast("swap", "Swap #" + S.swapCount + "   barrier " + S.barrierIntegrity + "%");
  return "";
};

/* whose body a mind currently occupies. Day 1 stays own-body throughout. */
setup.bodyOf = function (who) {
  who = who || V().pov;
  return (V().body && V().body[who]) || who;
};
setup.setBody = function (who, bodyId) {
  if (!V().body) V().body = { arjun: "arjun", kavya: "kavya" };
  V().body[who] = bodyId;
  return "";
};
setup.bodyLine = function (who) {
  who = who || V().pov;
  var mind = who === "arjun" ? "Arjun" : "Kavya";
  var b = setup.bodyOf(who);
  if (b === who) return "in " + (who === "arjun" ? "his" : "her") + " own body";
  var names = { arjun: "Arjun", kavya: "Kavya", meera: "Meera" };
  return "in " + (names[b] || b) + "'s body";
};

/* current-character portrait   override via $profileImg[pov], else by body */
setup.profileImgName = function (who) {
  who = who || V().pov;
  var ov = V().profileImg && V().profileImg[who];
  if (ov) return ov;
  var map = {
    arjun: "arjun_casual_profile_image.png",
    kavya: "kavya_casual_profile_image.png",
    meera: "meera_casual_profile_image.png"
  };
  return map[setup.bodyOf(who)] || map[who];
};
setup.profileImgSrc = function (who) {
  return setup.imgBase + "characters/" + setup.profileImgName(who);
};

/* advance to a new day and wipe the previous day's tracker (no going back) */
setup.dayStart = {
  1: {
    pov: "arjun",
    loc: { arjun: "katraj_pg_room", kavya: "hostel_room_304" },
    time: { arjun: 392, kavya: 330 },   /* 06:32 / 05:30 */
    mood: { arjun: "melancholy", kavya: "guarded" },
    povUnlocked: { arjun: true, kavya: false }
  },
  2: {
    pov: "arjun",
    loc: { arjun: "katraj_pg_room", kavya: "hostel_room_304" },
    time: { arjun: 445, kavya: 400 },   /* 07:25 AM / 06:40 AM */
    mood: { arjun: "electric anticipation", kavya: "terrified, exhilarated" }
  },
  3: {
    pov: "arjun",
    loc: { arjun: "katraj_pg_room", kavya: "hostel_room_304" },
    time: { arjun: 240, kavya: 240 },   /* 04:00 AM   the alarms */
    mood: { arjun: "no turning back", kavya: "no turning back" }
  }
};

/* DEBUG: hard-reset the current day (flags, objectives, tracker, clocks,
   locations) back to its opening state. Gated behind $debug in the UI. */
setup.restartDay = function () {
  var S = V(), d = S.day;
  S.flags = {};
  S.objectives = {};
  S.sideDiscovered = [];
  S.firedEvents = [];
  S.eventQueue = [];
  S.doneActions = {};
  S.inventory = { arjun: [], kavya: [] };
  S.habit = { arjun: { self: 0, porn: 0 }, kavya: { self: 0, porn: 0 } };
  S._phonePending = null;
  var ds = setup.dayStart[d] || setup.dayStart[1];
  S.pov = ds.pov || "arjun";
  S.loc = { arjun: ds.loc.arjun, kavya: ds.loc.kavya };
  S.time = { arjun: ds.time.arjun, kavya: ds.time.kavya };
  S.mood = { arjun: ds.mood.arjun, kavya: ds.mood.kavya };
  S.povUnlocked = ds.povUnlocked ? { arjun: !!ds.povUnlocked.arjun, kavya: !!ds.povUnlocked.kavya }
                                 : { arjun: true, kavya: true };
  setup.refreshObjectives();
  setup.toast("swap", "DEBUG — Day " + d + " reset to its opening state.");
  return "";
};

/* true if the page was opened with #debug in the URL */
setup.debugFromHash = function () {
  try { return String(window.location.hash || "").toLowerCase().indexOf("debug") !== -1; }
  catch (e) { return false; }
};

setup.beginDay = function (n) {
  var S = V();
  S.day = n;
  S.objectives = {};
  S.sideDiscovered = [];
  S.firedEvents = [];
  S.eventQueue = [];
  S.doneActions = {};
  S.povUnlocked = { arjun: true, kavya: true };
  /* clear "today only" state so each day starts fresh */
  ["signed_out_hostel", "has_excuse", "entered_vit", "priya_out_jogging", "priya_asleep",
   "in_dissection", "priya_left_for_class", "priya_in_common_room", "priya_asks",
   "morning_routine_complete", "kavya_morning_done"
  ].forEach(function (f) { delete S.flags[f]; });
  var ds = setup.dayStart[n];
  if (ds) {
    if (ds.pov) S.pov = ds.pov;
    if (ds.loc) S.loc = { arjun: ds.loc.arjun, kavya: ds.loc.kavya };
    if (ds.time) S.time = { arjun: ds.time.arjun, kavya: ds.time.kavya };
    if (ds.mood) S.mood = { arjun: ds.mood.arjun, kavya: ds.mood.kavya };
  }
  setup.refreshObjectives();
  return "";
};

/* reward key -> concrete stat key, POV aware */
setup.resolveStat = function (key, who) {
  var p = who === "kavya" ? "k_" : "a_";
  var map = {
    coding_skill: p + "coding", med_knowledge: p + "med",
    fem_comfort: "a_femComfort", masc_comfort: "k_mascComfort",
    energy: p + "energy", karma: "karma",
    rel_rohit: "rel_arjun_rohit", rel_raju: "rel_arjun_raju", rel_ananya: "rel_arjun_ananya",
    rel_meera: who === "kavya" ? "rel_kavya_meera" : "rel_arjun_meera",
    rel_kavya: "rel_arjun_kavya", rel_arjun: "rel_kavya_arjun",
    rel_priya: "rel_kavya_priya", rel_sneha: "rel_kavya_sneha",
    rel_divya: "rel_kavya_divya", rel_mess_didi: "rel_kavya_messdidi",
    trust_meera: "trust_meera",
    priya_suspicion: "susp_priya", colonel_suspicion: "susp_colonel",
    rohit_suspicion: "susp_rohit", warden_suspicion: "susp_warden",
    academic_standing: "misc_academic", confidence: "misc_confidence",
    satisfaction: "misc_satisfaction", hunger: "misc_hunger",
    sex_m: p + "sexM", sex_f: p + "sexF"
  };
  return map[key] || ("misc_" + key);
};

setup.applyReward = function (r, who) {
  var S = V();
  who = who || S.pov;
  Object.keys(r).forEach(function (k) {
    if (k === "intel") { setup.flag(r[k]); return; }
    if (k === "item")  { setup.addItem(r[k]); return; }
    if (k === "note")  { return; }
    if (k === "money") { setup.addMoney(r[k], who); return; }
    if (typeof r[k] === "number") {
      var sk = setup.resolveStat(k, who);
      if (S.stats[sk] === undefined) S.stats[sk] = 0;
      var lo = sk.indexOf("susp_") === 0 ? 0 : 0;
      S.stats[sk] = Math.clamp(S.stats[sk] + r[k], lo, 100);
      setup.toast("stat", setup.prettyStat(k) + " " + (r[k] > 0 ? "+" : "") + r[k]);
    }
  });
};

setup.prettyStat = function (k) {
  return k.replace(/_/g, " ").replace(/\brel\b/, "").trim()
          .replace(/^\w/, function (c) { return c.toUpperCase(); });
};

setup.stat = function (key, delta, who) {
  who = who || V().pov;
  var sk = setup.resolveStat(key, who);
  var S = V();
  if (S.stats[sk] === undefined) S.stats[sk] = 0;
  S.stats[sk] = Math.clamp(S.stats[sk] + delta, 0, 100);
  setup.toast("stat", setup.prettyStat(key) + " " + (delta > 0 ? "+" : "") + delta);
  return "";
};

/* ---- private-routine tracking (bedroom self-play + porn, every day) ---- */
setup.habit = function (who) {
  var S = V();
  who = who || S.pov;
  if (!S.habit) S.habit = { arjun: { self: 0, porn: 0 }, kavya: { self: 0, porn: 0 } };
  if (!S.habit[who]) S.habit[who] = { self: 0, porn: 0 };
  return S.habit[who];
};
/* how far the swap has reshaped what turns them on:
   0 = baseline, 1 = the swap is real and looming, 2 = they've been in the other body */
setup.intimPhase = function (who) {
  var S = V();
  who = who || S.pov;
  if (S.body && S.body[who] && S.body[who] !== who) return 2;
  if (S.swapCount >= 2) return 2;
  if (S.day >= 2 || S.flags.full_briefing_done || S.flags.meera_plan_heard || S.flags.test_swap_complete) return 1;
  return 0;
};

/* ------------------------------------------------------------
   MONEY / INVENTORY
   ------------------------------------------------------------ */

setup.money = function (who) { who = who || V().pov; return V().stats["money_" + who]; };
setup.addMoney = function (n, who) {
  who = who || V().pov;
  V().stats["money_" + who] = Math.max(0, V().stats["money_" + who] + n);
  if (n > 0) setup.toast("gain", "Earned  +₹" + n);
  else if (n < 0) setup.toast("loss", "Spent  −₹" + Math.abs(n));
  return "";
};
setup.canAfford = function (n, who) { return setup.money(who) >= n; };

/* inventory is per-character: $inventory = { arjun: [...], kavya: [...] } */
setup.inv = function (who) {
  var S = V();
  who = who || S.pov;
  if (!S.inventory || Array.isArray(S.inventory)) {
    /* migrate an old flat-array save into the current character's bag */
    var old = Array.isArray(S.inventory) ? S.inventory : [];
    S.inventory = { arjun: [], kavya: [] };
    S.inventory[S.pov] = old;
  }
  if (!S.inventory[who]) S.inventory[who] = [];
  return S.inventory[who];
};
setup.hasItem = function (id, who) { return setup.inv(who).indexOf(id) !== -1; };
setup.addItem = function (id, who) {
  if (!setup.hasItem(id, who)) {
    setup.inv(who).push(id);
    setup.toast("objective", "Obtained: " + (setup.itemNames[id] || id));
  }
  return "";
};
setup.removeItem = function (id, who) {
  var arr = setup.inv(who), i = arr.indexOf(id);
  if (i !== -1) arr.splice(i, 1);
  return "";
};

/* ------------------------------------------------------------
   LOCATION ACCESS + INTERACTION
   ------------------------------------------------------------ */

setup.here = function () {
  var S = V();
  return setup.locations[S.pov][S.loc[S.pov]];
};
setup.hereId = function () { return V().loc[V().pov]; };

setup.locAvailable = function (loc, who) {
  who = who || V().pov;
  if (!loc.available) return true;
  var t = setup.clock(who);
  return loc.available.split(",").some(function (win) {
    var m = win.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    if (!m) return true;
    return t >= setup.parseHM(m[1]) && t <= setup.parseHM(m[2]);
  });
};

setup.objVisible = function (o) {
  if (o.dayOnly && o.dayOnly !== V().day) return false;
  if (o.unlockCondition && !setup.cond(o.unlockCondition)) return false;
  if (o.requires && !setup.hasItem(o.requires)) return false;
  return true;
};
setup.objInWindow = function (o) {
  if (!o.timeWindow) return true;
  var m = o.timeWindow.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (!m) return true;
  var t = setup.clock();
  return t >= setup.parseHM(m[1]) && t <= setup.parseHM(m[2]);
};

setup.objTarget = function (o) {
  var special = {
    phone_menu: "Hub", samsung_phone_menu: "Hub", redmi_phone_menu: "Hub",
    meera_gallery: "Hub", grab_bike_keys: "Hub", buy_biscuit: "Hub",
    vending_purchase: "Hub", bike_travel_menu: "Hub", auto_travel_menu: "Hub",
    sassoon_auto_travel: "Hub", find_redmi_phone: "Hub",
    bj_canteen_food: "Hub", bj_canteen_chai: "Hub", canteen_menu: "Hub",
    mess_meal_scene: "Hub", stationery_shopping: "Hub"
  };
  return special[o.triggers] || o.triggers;
};

setup.useObject = function (o) {
  var S = V();
  /* time cost */
  var t = o.time || setup.actionTime(o.triggers);
  /* purchases */
  if (o.cost) {
    if (!setup.canAfford(o.cost)) { setup.toast("suspicion", "Not enough money."); return "block"; }
    setup.addMoney(-o.cost);
  }
  switch (o.triggers) {
    case "phone_menu": setup.flag("phone_checked"); setup.deferPhone("arjun"); break;
    case "samsung_phone_menu": setup.deferPhone("samsung"); break;
    case "redmi_phone_menu": setup.deferPhone("redmi"); break;
    case "meera_gallery": setup.deferPhone("gallery"); break;
    case "grab_bike_keys": setup.addItem("bike_keys"); break;
    case "buy_biscuit": setup.addItem("biscuit"); break;
    case "find_redmi_phone":
      if (!setup.hasItem("redmi_phone")) { setup.addItem("redmi_phone"); setup.flag("has_redmi_phone"); }
      break;
    case "vending_purchase": setup.stat("energy", 3); break;
    case "bj_canteen_food": setup.stat("energy", 4); setup.flag("kavya_ate"); break;
    case "bj_canteen_chai": setup.stat("energy", 2); break;
    case "canteen_menu": setup.stat("energy", 5); setup.flag("arjun_ate"); break;
    case "mess_meal_scene": setup.stat("energy", 4); setup.flag("kavya_morning_mess"); break;
    case "stationery_shopping": setup.addItem("usb_drive"); break;
  }
  if (!S.doneActions) S.doneActions = {};
  S.doneActions[setup.actionKey(o)] = true;
  if (t) setup.advanceTime(t);
  else setup.refreshWorld();
  return "";
};

/* mark room actions the player has already used (see the Hub render) */
setup.actionKey = function (o) {
  var S = V();
  return S.pov + "|" + S.loc[S.pov] + "|" + o.id;
};
setup.actionDone = function (o) {
  return !!(V().doneActions && V().doneActions[setup.actionKey(o)]);
};

setup.actionTime = function (trigger) {
  var map = {
    arjun_shower_day1: 15, kavya_shower_day1: 15, morning_routine: 10, morning_wash: 8,
    kavya_pee_day1: 3, arjun_pee_day1: 2, kavya_period_check_day1: 3, shaving_scene: 8,
    chai_scene: 12, bj_canteen_chai: 10, bj_canteen_food: 12, canteen_menu: 20, mess_meal_scene: 20,
    dbms_lecture_scene: 60, anatomy_dissection_scene: 90,
    rohit_canteen_confrontation: 25, manuscript_reveal_scene: 25, test_swap_scene: 25,
    lab_coding_session: 45, library_computer_coding: 45, library_study_session: 30, library_study: 30,
    kavya_study_options: 30, laptop_interaction: 20,
    sinhagad_dhaba_scene: 20, sinhagad_reflection_scene: 15,
    chai_dhaba: 15, home_meal_scene: 20,
    priya_instagram_scene: 20, dosage_build_scene: 45, mess_didi_scene: 20,
    raju_phone_sidequest: 25, rohit_cad_scene: 20, nikhil_notes_scene: 10, ananya_library_scene: 15,
    sneha_pharma_scene: 20, senior_divya_scene: 20, laptop_night_dbms: 45,
    panwala_delivery_scene: 5, sneha_room_visit: 15,
    arjun_night_end: 0, priya_sleep_scene: 0, test_swap_scene: 0, DayWrap: 0,
    manuscript_reveal_scene: 25, dr_sharma_quiz_scene: 10, note_passing_anatomy: 5,
    arjun_self_explore: 40, kavya_self_explore: 40,
    arjun_bed_selfplay: 15, kavya_bed_selfplay: 15,
    arjun_porn_menu: 25, kavya_porn_menu: 25,
    /* ---- Day 2 ---- */
    arjun_shower_d2: 15, arjun_stress_pee_d2: 3, kavya_shower_d2: 15, kavya_period_planning_d2: 3,
    os_lecture_d2: 60, pharmacology_lecture_d2: 60, mhatre_test_d2: 30, margin_coding_d2: 20,
    meera_full_plan_d2: 25, swap_rules_d2: 20, chant_practice_d2: 20, schedule_study_d2: 20, journal_d2: 15,
    kavya_calls_arjun_d2: 15, nikhil_canteen_d2: 20, rohit_reads_change_d2: 10, rohit_choice_d2: 15,
    arjun_set_alarm_d2: 5, arjun_wardrobe_d2: 10, arjun_night_d2: 0, kavya_body_catalogue_d2: 0,
    gym_punching_d2: 30, gym_weights_d2: 30, gym_mirror_d2: 5, gym_vikram_d2: 10,
    last_coding_d2: 45, crossword_d2: 20, kulkarni_uncle_d2: 12, temple_priest_d2: 12,
    temple_courtyard_d2: 15, temple_nandi_d2: 5, temple_prayer_d2: 10,
    anjali_d2: 15, priya_gossip_d2: 15, sneha_pharma_d2: 12, raju_followup_d2: 10,
    jm_people_watch_d2: 15, jm_food_d2: 15, store_snack_buy_d2: 5, store_accessories_d2: 5, store_notices_d2: 3
  };
  return map[trigger] !== undefined ? map[trigger] : 10;
};

/* Phone dialog is opened just after navigation completes */
setup.deferPhone = function (which) {
  V()._phonePending = which;
};

setup.travel = function (toId, mins, method) {
  var S = V();
  if (method === "pulsar" && !setup.hasItem("bike_keys")) {
    setup.toast("suspicion", "You need the Pulsar keys.");
    return "block";
  }
  var dest = setup.locations[S.pov][toId];
  if (dest && dest.unlockCondition && !setup.cond(dest.unlockCondition)) {
    setup.toast("suspicion", "You can't get there yet.");
    return "block";
  }
  /* campus / VIT entry gating */
  if (toId === "vit_cblock" || toId === "vit_canteen" || toId === "vit_library" || toId === "vit_ground") {
    if (!setup.has("entered_vit")) { setup.toast("suspicion", "Show your ID at the gate first."); return "block"; }
  }
  S.loc[S.pov] = toId;
  if (toId === "vit_library") setup.flag("visited_vit_library");
  if (toId === "hostel_common_room") setup.flag("visited_common_room");
  if (toId === "jm_road") setup.flag("visited_jm_road");
  setup.advanceTime(mins || 2);
  return "";
};

/* Decide how an exit / travel option renders in the Hub:
     ""     -> open, clickable
     string -> show it dimmed with this reason (only when the ONLY thing
               blocking it is a time-of-day gate or the place being shut)
     null   -> keep it hidden (a real prerequisite / spoiler is missing)   */
setup.exitLock = function (x, who) {
  who = who || V().pov;
  var dest = setup.locations[who] && setup.locations[who][x.to];
  var notes = [], hide = false;
  [x.unlockCondition, dest && dest.unlockCondition].forEach(function (expr) {
    if (!expr || setup.cond(expr, who)) return;
    String(expr).split(/\s+AND\s+/).forEach(function (raw) {
      var a = raw.trim(), m;
      if (setup.atom(a, who)) return;                       /* this part is fine */
      if ((m = a.match(/^time\s*(>=|>)\s*(\d{1,2}):(\d{2})$/)))
        notes.push("opens " + setup.fmtHM(+m[2] * 60 + +m[3]));
      else if ((m = a.match(/^time\s*(<=|<)\s*(\d{1,2}):(\d{2})$/)))
        notes.push("closes " + setup.fmtHM(+m[2] * 60 + +m[3]));
      else hide = true;                                     /* a real prerequisite is missing */
    });
  });
  if (hide) return null;
  if (dest && dest.available && !setup.locAvailable(dest, who)) {
    var w = dest.available.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    notes.push(w ? "open " + setup.fmtHM(setup.parseHM(w[1])) + "–" + setup.fmtHM(setup.parseHM(w[2]))
                 : "closed now");
  }
  notes = notes.filter(function (n, i) { return notes.indexOf(n) === i; });   /* dedupe */
  return notes.length ? notes.join(" · ") : "";
};

/* ------------------------------------------------------------
   IMAGE HELPER
   Renders <img src="images/<folder>/<file>"> and, if the file
   isn't there yet, falls back to a captioned placeholder frame.

   characters / locations / objects / ui are shared across all days.
   Only scene illustrations are day-specific  ->  scenes/day<N>/
   ------------------------------------------------------------ */
setup.imgBase = "images/";
setup.imgDir = {
  /* character reference sheets  -> images/characters/ */
  "arjun_reference.png": "characters", "kavya_reference.png": "characters",
  "meera_reference.png": "characters", "rohit_reference.png": "characters",
  "priya_reference.png": "characters",
  /* current-character portraits shown above the objectives */
  "arjun_casual_profile_image.png": "characters",
  "kavya_casual_profile_image.png": "characters",
  "meera_casual_profile_image.png": "characters",
  /* location backgrounds        -> images/locations/ */
  "katraj_pg_room.png": "locations", "pg_bathroom.png": "locations",
  "tapri_chai.png": "locations", "vit_gate.png": "locations",
  "vit_lecture_hall.png": "locations", "vit_canteen.png": "locations",
  "kothrud_home.png": "locations", "room_304.png": "locations",
  "hostel_bathroom.png": "locations", "hostel_mess.png": "locations",
  "hostel_terrace.png": "locations", "bj_campus.png": "locations",
  "anatomy_hall.png": "locations",
  "katraj_snake_park.png": "locations", "sinhagad_road.png": "locations",
  "bj_library.png": "locations", "hostel_common_room.png": "locations",
  "hostel_entrance.png": "locations", "bj_canteen.png": "locations",
  /* UI mockups                  -> images/ui/ */
  "arjun_phone_ui.png": "ui", "kavya_samsung_ui.png": "ui",
  "kavya_redmi_ui.png": "ui", "arjun_map.png": "ui", "kavya_map.png": "ui",
  /* Day 1 scene illustrations   -> images/scenes/day1/ */
  "arjun_wakeup.png": "scenes/day1", "arjun_rohit_canteen.png": "scenes/day1",
  "sinhagad_viewpoint.png": "scenes/day1", "arjun_night_room.png": "scenes/day1",
  "kavya_wakeup.png": "scenes/day1", "kavya_anatomy.png": "scenes/day1",
  "swap_ritual.png": "scenes/day1", "kavya_night_bed.png": "scenes/day1",
  "bj_campus_samosa.png": "scenes/day1",
  /* cross-day / non-day-specific art -> images/scenes/common/ */
  "Marine_Drive_Green_Dupatta.png": "scenes/common",
  "Cultural_Fest_Backstage_Green_Silk_Saree.png": "scenes/common",
  "Bharatanatyam_Video_Locked_Folder_Thumbnail.png": "scenes/common",
  "arjun_looking_at_screen.png": "scenes/common",
  "arjun_room_mirror.png": "scenes/common", "arjun_bathroom_mirror.png": "scenes/common",
  "arjun_get_dressed.png": "scenes/common", "arjun_dbms_notebook.png": "scenes/common",
  "katraj_window_view.png": "scenes/common", "arjun_brush_teeth.png": "scenes/common",
  "arjun_urinal.png": "scenes/common", "arjun_shave.png": "scenes/common",
  "arjun_water_cooler.png": "scenes/common", "arjun_cs_notices.png": "scenes/common",
  "arjun_corridor_bench.png": "scenes/common", "vit_campus_notices.png": "scenes/common",
  "arjun_canteen_alone.png": "scenes/common", "vit_canteen_tv.png": "scenes/common",
  "arjun_lab_terminal.png": "scenes/common", "arjun_lab_print.png": "scenes/common",
  "vit_library_cs_shelf.png": "scenes/common", "ananya_library.png": "scenes/common",
  "arjun_library_desk.png": "scenes/common", "arjun_phone_charging.png": "scenes/common",
  "vit_ground_hoops.png": "scenes/common", "arjun_ground_bench.png": "scenes/common",
  "vit_ground_stands.png": "scenes/common",
  "arjun_stray_dog.png": "scenes/common", "arjun_newspaper.png": "scenes/common",
  "pg_notice_board.png": "scenes/common", "pg_landlord_sharma.png": "scenes/common",
  "panwala_bhau.png": "scenes/common", "sinhagad_dhaba.png": "scenes/common",
  "katraj_jogging_track.png": "scenes/common", "katraj_ice_bar.png": "scenes/common",
  "katraj_fruit_cart.png": "scenes/common", "kothrud_aai_kitchen.png": "scenes/common",
  "kothrud_papa_livingroom.png": "scenes/common", "kothrud_pooja_sofa.png": "scenes/common",
  "kothrud_family_meal.png": "scenes/common", "kothrud_old_bedroom.png": "scenes/common",
  /* Kavya's path */
  "bj_bookstore.png": "scenes/common", "bj_library_basement.png": "scenes/common",
  "hostel_wifi.png": "scenes/common", "hostel_landline.png": "scenes/common",
  "kavya_after_shower.png": "scenes/common", "kavya_anatomy_wash.png": "scenes/common",
  "kavya_bathroom_mirror.png": "scenes/common", "kavya_campus_bench.png": "scenes/common",
  "kavya_canteen_corner.png": "scenes/common", "kavya_chowkidar.png": "scenes/common",
  "kavya_corridor_water.png": "scenes/common", "kavya_cs229_lecture.png": "scenes/common",
  "kavya_cupboard.png": "scenes/common", "kavya_expertise.png": "scenes/common",
  "kavya_final_beat.png": "scenes/common", "kavya_handwash.png": "scenes/common",
  "kavya_hidden_compartment.png": "scenes/common", "kavya_horoscope.png": "scenes/common",
  "kavya_hostel_notices.png": "scenes/common", "kavya_kulkarni_library.png": "scenes/common",
  "kavya_meera_mess_seat.png": "scenes/common", "kavya_meera_note.png": "scenes/common",
  "kavya_meera_observation.png": "scenes/common", "kavya_period_check.png": "scenes/common",
  "kavya_priya_instagram.png": "scenes/common", "kavya_priya_wakeup.png": "scenes/common",
  "kavya_room_mirror.png": "scenes/common", "kavya_sharma_quiz.png": "scenes/common",
  "kavya_signout_register.png": "scenes/common", "kavya_sneha_visit.png": "scenes/common",
  "kavya_study_desk.png": "scenes/common", "kavya_teaching_sneha.png": "scenes/common",
  "kavya_toilet.png": "scenes/common", "kavya_tonight_breakfast.png": "scenes/common",
  "kavya_window_view.png": "scenes/common",
  "kavya_priya_asleep.png": "scenes/common", "kavya_phone_shop.png": "scenes/common",
  "kavya_terrace_watertank.png": "scenes/common", "kavya_terrace_coding.png": "scenes/common",
  "kavya_joshi_rounds.png": "scenes/common", "kavya_warden_office.png": "scenes/common",
  "kavya_manuscript_closeup.png": "scenes/common", "kavya_juice_stall.png": "scenes/common",
  "night_sleep_arjun_rohit.png": "scenes/common", "scenic_route_meera_call_try.png": "scenes/common",
  "arjun_self_explore.png": "scenes/common", "kavya_self_explore.png": "scenes/common",
  "arjun_bed_selfplay.png": "scenes/common", "kavya_bed_selfplay.png": "scenes/common",
  "arjun_porn_menu.png": "scenes/common", "kavya_porn_menu.png": "scenes/common"
};

setup.imgSrc = function (file) {
  if (!file) return "";
  return setup.imgBase + (setup.imgDir[file] || "scenes/day" + (V() && V().day || 1)) + "/" + file;
};

setup.img = function (file, caption) {
  if (!file) return "";
  var src = setup.imgSrc(file);
  var cap = caption || file;
  return '<figure class="scene-img" data-file="' + file + '">' +
    '<img src="' + src + '" alt="' + cap.replace(/"/g, "") + '" loading="lazy" ' +
    'onerror="this.closest(\'.scene-img\').classList.add(\'img-missing\')">' +
    '<figcaption><span class="img-frame">🖼</span> ' + cap + '</figcaption>' +
    '</figure>';
};

/* ------------------------------------------------------------
   STAT PANEL RENDER HELPERS
   ------------------------------------------------------------ */
setup.statBar = function (label, val, cls) {
  val = Math.clamp(Math.round(val || 0), 0, 100);
  return '<div class="bar"><div class="lbl"><span>' + label + '</span><b>' + val + '</b></div>' +
         '<div class="track"><div class="fill ' + (cls || "gold") + '" style="width:' + val + '%"></div></div></div>';
};
setup.susRow = function (label, val) {
  val = Math.clamp(Math.round(val || 0), 0, 100);
  var lvl = val <= 30 ? "lo" : (val <= 60 ? "mid" : "hi");
  return '<div class="sus-row"><span class="nm">' + label + '</span>' +
         '<span class="track"><span class="fill ' + lvl + '" style="width:' + val + '%"></span></span>' +
         '<span class="v">' + val + '</span></div>';
};

/* ------------------------------------------------------------
   TOASTS
   ------------------------------------------------------------ */
setup.toast = function (type, msg) {
  var cls = (type === "stat") ? "objective" : type;
  var $t = jQuery('<div class="alert-popup ' + cls + '"><span class="alert-icon"></span>' + msg + '</div>');
  jQuery("body").append($t);
  setTimeout(function () { $t.fadeOut(360, function () { jQuery(this).remove(); }); }, 3000);
};

/* ------------------------------------------------------------
   POV SWITCH
   ------------------------------------------------------------ */
setup.canSwitchPOV = function () {
  return V().povUnlocked.arjun && V().povUnlocked.kavya;
};
setup.pickPOV = function (who) {
  var S = V();
  if (!S.povUnlocked[who] || S.pov === who) return "";
  S.pov = who;
  setup.refreshWorld();
  return "";
};
setup.switchPOV = function (who) {
  var S = V();
  if (!S.povUnlocked[who]) { setup.toast("suspicion", "That perspective isn't open yet."); return; }
  if (S.pov === who) return;
  S.pov = who;
  setup.refreshWorld();
  Engine.play("Hub");
};

/* ------------------------------------------------------------
   PHONE SYSTEM
   ------------------------------------------------------------ */
setup.phoneData = function () {
  return {
    arjun: {
      title: "Arjun's phone",
      tabs: ["WhatsApp", "Calls", "Instagram", "Gallery"],
      whatsapp: [
        { name: "Meera ❤️", last: "Papa ne phone le liya. I'll find a way. Don't forget me.", locked: true },
        { name: "Rohit Sala", last: "Bhai lab ka assignment bhej", passage: "PH_rohit_chat" },
        { name: "Nikhil DBMS", last: "Notes chahiye toh bol", passage: "PH_nikhil_chat" },
        { name: "Aai ❤️", last: "Beta kha liya kya", passage: "PH_aai_chat" },
        { name: "Pooja Pagal 🙄", last: "Bhaiya WiFi ka password kya tha", passage: "PH_pooja_chat" },
        { name: "CSE 3rd Year Group", last: "Krishnan sir extra class Friday confirm karo", note: "47 unread" }
      ],
      calls: [
        { name: "Aai", type: "incoming", time: "yesterday 20:15" },
        { name: "Meera ❤️", type: "missed (outgoing)", time: "3 months ago" }
      ],
      instagram: "Feed: classmate party photos, travel reels, meme pages. <br>@meera.kulkarni   private. 0 posts. Follow request: <em>pending</em>.",
      gallery: "PH_arjun_gallery"
    },
    samsung: {
      title: "Kavya's Samsung (official)",
      tabs: ["WhatsApp", "Apps"],
      whatsapp: [
        { name: "Papa", last: "Result kab aayega", passage: "PH_papa_chat" },
        { name: "Amma ❤️", last: "Kanna, eat properly", passage: "PH_amma_chat" },
        { name: "Meera", last: "Anatomy notes dena", passage: "PH_meera_chat" },
        { name: "Priya", last: "ASMR playlist link bhej", passage: "PH_priya_chat" },
        { name: "Sneha", last: "Pharma notes plzzzz", passage: "PH_sneha_chat" }
      ],
      apps: "Medscape. AMBOSS. A calculator. Screen-time report Papa checks every Sunday video call. Nothing here is yours."
    },
    redmi: {
      title: "Kavya's Redmi (secret)",
      tabs: ["GitHub", "Telegram", "Browser"],
      github: "PH_github",
      telegram: "PH_rahul_chat",
      browser: "Bookmarks: MIT OCW · Stanford CS229 · LeetCode · HackerRank · Stack Overflow.<br>Open tabs: LeetCode #742, Python asyncio docs."
    },
    gallery: { title: "Arjun's gallery", tabs: ["Gallery"], gallery: "PH_arjun_gallery" }
  };
};

setup.openHelp = function () {
  var pov = V().pov;
  var day = (pov === "arjun")
    ? "<p><b>Arjun's day, roughly.</b> Wake ~6:30 in the Katraj PG. Chai at Raju's tapri. Ride the Pulsar to VIT for the ~10 AM DBMS lecture. Canteen with Rohit after. Afternoons drift   the CS lab, the library, an aimless ride. Evenings he tries (and fails) to reach Meera, then codes till his eyes blur. There is no fixed schedule after class   you fill the hours yourself.</p>"
    : "<p><b>Kavya's day, roughly.</b> Internal alarm at 5:30 in Room 304. Bathroom queue, then sign out at the hostel gate. 9 AM anatomy dissection. Afternoons she disappears into the library to code on the Redmi or a real keyboard. Back before Priya's 7:15 jog. Evening is Meera's   the manuscript, and after 11 PM the ritual.</p>";

  Dialog.setup("How VIDHI works", "vidhi-help");
  Dialog.wiki(
    "<div class='help-body'>" +
    "<p><b>This is an open world, not a chapter book.</b> You're always standing in a place. Under <i>Look around · do</i> are the things you can interact with here; under <i>Go</i> are the ways out. Nothing advances on its own.</p>" +
    "<p><b>Time.</b> The clock (top bar) only moves when you <i>do</i> something: a conversation, a scene, a trip. Many things are gated to a time or a place. If an objective is only waiting on the clock, use <b>Wait here</b> or <b>Rest / nap</b> under the actions in any location to skip 30 or 60 minutes (a nap also restores a little energy).</p>" +
    "<p><b>Getting around.</b> The <b>🗺 Places</b> button (top bar) lists every location you can reach, its opening hours, and what unlocks it. An exit that's only shut for the hour shows greyed-out with the reason; one that needs a story beat first stays hidden until then.</p>" +
    "<p><b>Objectives.</b> Left panel. Main objectives are the spine of the day; each has an <b>i</b> button with exactly where to go, when it's open, and who's involved. <b>Side quests</b> only appear once you've stumbled on them (talked to the right person, entered the right room).</p>" +
    "<p><b>Two lives.</b> Once Kavya unlocks, the <i>Arjun / Kavya</i> toggle (top bar) switches whose day you're playing. They run in parallel and never meet   yet. Each keeps its own clock, location and progress.</p>" +
    "<p><b>Phone.</b> Top bar. WhatsApp threads, calls, and   for Kavya   a hidden second phone. Some side quests only surface through a message.</p>" +
    day +
    "</div>"
  );
  Dialog.open();
};

/* ---- human-readable unlock conditions (for the location guide) ---- */
setup.humanCond = function (expr) {
  if (!expr) return "";
  var DICT = {
    phone_checked: "after you've looked at your phone",
    morning_routine_complete: "after your morning routine",
    has_bike_keys: "with the Pulsar keys on you",
    entered_vit: "after showing your ID at the VIT gate",
    dbms_lecture_done: "after the DBMS lecture",
    nikhil_notes_obtained: "after getting Nikhil's notes",
    rohit_confrontation_done: "after the canteen talk with Rohit",
    rohit_reveals_meera_sighting: "after Rohit says where he saw Meera",
    meera_contact_attempted: "after you've tried to reach Meera tonight",
    dbms_assignment_submitted: "after you've finished the DBMS assignment",
    talked_to_raju: "after talking to Raju at the tapri",
    signed_out_hostel: "after signing out at the hostel gate",
    has_excuse: "with an approved reason to be off campus",
    has_redmi_phone: "once you have the hidden Redmi phone",
    kavya_morning_done: "after your morning routine",
    anatomy_lab_done: "after the dissection session",
    in_dissection: "during the dissection session",
    meera_note_read: "after reading Meera's note",
    meera_shows_manuscript: "after Meera shows you the manuscript",
    manuscript_revealed: "after Meera tells you what she found",
    priya_out_jogging: "while Priya is out on her jog",
    priya_asleep: "once Priya has fallen asleep",
    priya_asks: "after Priya asks you for the photos",
    sneha_helped: "after you've helped Sneha",
    visited_common_room: "after you've been to the common room",
    visited_vit_library: "after you've been to the library",
    mains_done: "once the day's main objectives are done"
  };
  var SKIP_NOT = /^(has_bike_keys|has_redmi_phone|.*_complete)$/;
  var out = [];
  String(expr).split(/\s+AND\s+/).forEach(function (raw) {
    var a = raw.trim(), m;
    if (a.indexOf("not ") === 0) {
      var inner = a.slice(4).trim();
      if (!SKIP_NOT.test(inner)) out.push("unless " + (DICT[inner] || inner.replace(/_/g, " ")));
      return;
    }
    if ((m = a.match(/^time\s*>=?\s*(\d{1,2}):(\d{2})$/))) return out.push("after " + setup.fmtHM(+m[1] * 60 + +m[2]));
    if ((m = a.match(/^time\s*<=?\s*(\d{1,2}):(\d{2})$/))) return out.push("before " + setup.fmtHM(+m[1] * 60 + +m[2]));
    if ((m = a.match(/^day\s*>=\s*(\d+)$/))) return out.push("Day " + m[1] + " onward");
    if ((m = a.match(/^has_money\s*>=\s*(\d+)$/))) return out.push("₹" + m[1] + " in your wallet");
    out.push(DICT[a] || ("after " + a.replace(/_/g, " ")));
  });
  return out.join(" · ");
};

setup.fmtWindows = function (s) {
  return String(s).split(",").map(function (w) {
    var m = w.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    return m ? setup.fmtHM(setup.parseHM(m[1])) + "–" + setup.fmtHM(setup.parseHM(m[2])) : w.trim();
  }).join(", ");
};

setup.openLocationGuide = function () {
  var pov = V().pov, here = V().loc[pov], locs = setup.locations[pov];
  var routes = {};
  Object.keys(locs).forEach(function (fromId) {
    var L = locs[fromId];
    (L.exits || []).concat(L.travelDestinations || []).forEach(function (x) {
      (routes[x.to] = routes[x.to] || []).push({ name: L.name, note: x.unlockCondition });
    });
  });
  var name = pov === "arjun" ? "Arjun" : "Kavya";
  var h = "<div class='loc-guide'><p class='lg-intro'>Everywhere " + name +
    " can go, with opening hours and what unlocks each place. The clock only moves when you act, so use <b>Wait</b> / <b>Rest</b> in any room to pass a time gate.</p>";
  Object.keys(locs).forEach(function (id) {
    var L = locs[id];
    if (L.dayOnly && L.dayOnly !== V().day) return;
    var unlocked = !L.unlockCondition || setup.cond(L.unlockCondition, pov);
    var openNow = setup.locAvailable(L, pov);
    var badge = id === here ? "<span class='lg-badge here'>you are here</span>"
      : !unlocked ? "<span class='lg-badge locked'>locked</span>"
      : !openNow ? "<span class='lg-badge shut'>shut now</span>"
      : "<span class='lg-badge open'>open now</span>";
    h += "<div class='lg-loc'><div class='lg-head'><span class='lg-name'>" + L.name + "</span>" + badge + "</div>";
    h += "<div class='lg-row'><b>Hours</b><span>" +
      (L.available && L.available !== "00:00-23:59" ? setup.fmtWindows(L.available) : "any time") + "</span></div>";
    if (L.unlockCondition)
      h += "<div class='lg-row'><b>Unlocks</b><span>" + setup.humanCond(L.unlockCondition) + "</span></div>";
    var froms = (routes[id] || []).map(function (r) {
      var extra = r.note && r.note !== L.unlockCondition ? " (" + setup.humanCond(r.note) + ")" : "";
      return r.name + extra;
    }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    if (froms.length)
      h += "<div class='lg-row'><b>Reach from</b><span>" + froms.join("; ") + "</span></div>";
    var timed = (L.objects || []).filter(function (o) {
      return o.timeWindow && !(o.dayOnly && o.dayOnly !== V().day);
    });
    if (timed.length)
      h += "<div class='lg-row'><b>Timed action</b><span>" + timed.map(function (o) {
        return "“" + o.action + "” — " + setup.fmtWindows(o.timeWindow);
      }).join("<br>") + "</span></div>";
    h += "</div>";
  });
  h += "</div>";
  Dialog.setup("Places · " + name, "vidhi-guide");
  Dialog.wiki(h);
  Dialog.open();
};

setup.openPhone = function (which) {
  var data = setup.phoneData()[which];
  if (!data) return;
  V()._phoneWhich = which;
  Dialog.setup(data.title, "vidhi-phone");
  Dialog.wiki(setup.renderPhone(which, data.tabs[0]));
  Dialog.open();
};

setup.renderPhone = function (which, tab) {
  var data = setup.phoneData()[which];
  var out = '<div class="phone-tabs">';
  data.tabs.forEach(function (tb) {
    out += '<<link "' + tb + '">><<run setup.phoneTab("' + which + '","' + tb + '")>><</link>>';
  });
  out += '</div><div class="phone-body">';

  if (tab === "WhatsApp") {
    (data.whatsapp || []).forEach(function (c) {
      if (c.locked || !c.passage) {
        out += '<div class="wa-row locked"><b>' + c.name + '</b>' +
               '<div class="wa-last">' + c.last + '</div>' +
               '<em>' + (c.note ? c.note : "can’t reply") + '</em></div>';
      } else {
        out += '<div class="wa-row">' +
               '<<link "' + c.name.replace(/"/g, "") + '">><<run Dialog.close()>><<goto "' + c.passage + '">><</link>>' +
               '<div class="wa-last">' + c.last + '</div></div>';
      }
    });
  } else if (tab === "Calls") {
    (data.calls || []).forEach(function (c) {
      out += '<div class="wa-row"><b>' + c.name + '</b> <span>' + c.type + '   ' + c.time + '</span></div>';
    });
  } else if (tab === "Instagram") {
    out += '<p>' + data.instagram + '</p>';
  } else if (tab === "Gallery") {
    out += '<<link "Open the locked folder">><<run Dialog.close()>><<goto "' + data.gallery + '">><</link>>';
  } else if (tab === "Apps") {
    out += '<p>' + data.apps + '</p>';
  } else if (tab === "GitHub") {
    out += '<<link "Open GitHub">><<run Dialog.close()>><<goto "' + data.github + '">><</link>>';
  } else if (tab === "Telegram") {
    out += '<<link "Open chat with Rahul">><<run Dialog.close()>><<goto "' + data.telegram + '">><</link>>';
  } else if (tab === "Browser") {
    out += '<p>' + data.browser + '</p>';
  }
  out += '</div>';
  return out;
};

setup.phoneTab = function (which, tab) {
  Dialog.wiki(setup.renderPhone(which, tab));
};

/* ============================================================
   DAY 2   "Saazish" (Conspiracy)
   Additive module: new locations, objects, objectives, events,
   name/image tables. Day 1 data above is untouched.
   ============================================================ */
(function day2() {

  var L = setup.locations;

  /* ---- NEW LOCATIONS · ARJUN ---- */
  Object.assign(L.arjun, {
    "katraj_general_store": {
      name: "Kulkarni General Store   Katraj",
      available: "07:00-22:00",
      description: "Ten feet wide, floor-to-ceiling shelves, and an uncle who knows every student's exam schedule, relationship status and snack habits.",
      objects: [
        { id: "kulkarni_counter", action: "Talk to Kulkarni uncle", triggers: "kulkarni_uncle_d2", quest: "side" },
        { id: "store_snacks", action: "Buy snacks (₹60)", triggers: "store_snack_buy_d2", cost: 60 },
        { id: "store_accessories", action: "Browse phone accessories", triggers: "store_accessories_d2" },
        { id: "store_notices", action: "Check the local notice board", triggers: "store_notices_d2" }
      ],
      npcs: ["kulkarni_uncle"],
      exits: [ { to: "katraj_street", label: "Back to the street" } ],
      image: "katraj_general_store.png"
    },
    "katraj_gym": {
      name: "Iron Temple Gym   Katraj",
      available: "06:00-22:00",
      description: "A basement that smells of rust, rubber and concentrated ambition. Rohit's second home. The punching bag in the corner doesn't ask questions.",
      objects: [
        { id: "gym_bag", action: "Hit the punching bag", triggers: "gym_punching_d2", intimate: true, quest: "side" },
        { id: "gym_weights", action: "Lift weights", triggers: "gym_weights_d2", intimate: true },
        { id: "gym_mirror", action: "Look at yourself in the mirror", triggers: "gym_mirror_d2" },
        { id: "gym_vikram", action: "Talk to Vikram (trainer)", triggers: "gym_vikram_d2" }
      ],
      npcs: ["gym_trainer_vikram", "random_gym_bros"],
      exits: [ { to: "katraj_street", label: "Back to the street" } ],
      image: "katraj_gym.png"
    },
    "pataleshwar_temple": {
      name: "Pataleshwar Cave Temple",
      unlockCondition: "arjun_received_call AND time >= 16:00",
      available: "05:00-21:00",
      description: "A 1,500-year-old rock-cut Shiva temple, carved from one basalt boulder, sitting in modern Pune like a geological memory. Tomorrow's meeting point.",
      objects: [
        { id: "temple_priest", action: "Talk to the old priest", triggers: "temple_priest_d2", quest: "side" },
        { id: "temple_courtyard", action: "Walk the courtyard   map it", triggers: "temple_courtyard_d2", quest: "side" },
        { id: "temple_nandi", action: "Look at the Nandi statue", triggers: "temple_nandi_d2" },
        { id: "temple_prayer", action: "Sit before the cave and think", triggers: "temple_prayer_d2" }
      ],
      npcs: ["temple_priest", "evening_devotees"],
      exits: [
        { to: "jm_road", label: "Walk to JM Road (5 min)" },
        { to: "katraj_street", label: "Ride back to Katraj (20 min)", method: "pulsar" }
      ],
      image: "pataleshwar_temple.png"
    },
    "jm_road": {
      name: "Jangli Maharaj Road",
      unlockCondition: "day >= 2 AND time >= 12:00",
      available: "06:00-23:00",
      description: "Pune's cultural spine. Tree-lined, bookshops with lit windows, street-food carts, the temple rock just behind the trees.",
      objects: [
        { id: "jm_bookshop", action: "Browse the Crossword bookstore", triggers: "crossword_d2", quest: "side" },
        { id: "jm_food", action: "Eat street food (₹40)", triggers: "jm_food_d2", cost: 40 },
        { id: "jm_bench", action: "Sit on a roadside bench and watch", triggers: "jm_people_watch_d2" }
      ],
      npcs: ["bookshop_employee", "street_food_vendor", "random_walkers"],
      exits: [
        { to: "pataleshwar_temple", label: "Walk to Pataleshwar (5 min)" },
        { to: "katraj_street", label: "Ride to Katraj (20 min)", method: "pulsar" },
        { to: "vit_gate", label: "Ride to VIT (15 min)", method: "pulsar" }
      ],
      image: "jm_road.png"
    }
  });

  /* ---- NEW LOCATIONS · KAVYA ---- */
  Object.assign(L.kavya, {
    "hostel_room_308": {
      name: "Room 308   Anjali's Room",
      unlockCondition: "hostel_security_intel",
      available: "18:00-22:00",
      description: "Identical to 304 but messier   clothes on every surface, a makeup kit colonising the desk, photos of a man-bun boyfriend taped inside the cupboard.",
      objects: [
        { id: "anjali_talk", action: "Talk to Anjali", triggers: "anjali_d2", quest: "side" }
      ],
      npcs: ["anjali_308"],
      exits: [ { to: "hostel_corridor", label: "Back to the corridor" } ],
      image: "room_308.png"
    },
    "bj_pharmacology_hall": {
      name: "Pharmacology Lecture Hall",
      unlockCondition: "signed_out_hostel AND day >= 2",
      available: "09:00-16:00",
      description: "Where dreams of interesting medicine go to die. Dr. Mhatre's domain   forty bullet points per slide, no exceptions.",
      objects: [
        { id: "pharma_seat", action: "Sit through the pharmacology lecture", triggers: "pharmacology_lecture_d2", timeWindow: "09:30-13:00", quest: "main" },
        { id: "pharma_test", action: "Take Dr. Mhatre's surprise test", triggers: "mhatre_test_d2", unlockCondition: "in_pharma_lecture", quest: "side" },
        { id: "pharma_margin", action: "Code in the notebook margins", triggers: "margin_coding_d2", unlockCondition: "in_pharma_lecture" },
        { id: "pharma_sneha", action: "Sit with Sneha", triggers: "sneha_pharma_d2" }
      ],
      npcs: ["dr_mhatre", "sneha_302", "random_mbbs_students"],
      exits: [ { to: "bj_campus_path", label: "Exit to campus" } ],
      image: "pharmacology_hall.png"
    }
  });

  /* ---- DAY 2 OBJECTS bolted onto Day 1 locations ---- */
  function add(pov, loc, arr) {
    var o = L[pov][loc].objects || (L[pov][loc].objects = []);
    arr.forEach(function (x) { o.push(x); });
  }
  function addExit(pov, loc, arr) {
    var e = L[pov][loc].exits || (L[pov][loc].exits = []);
    arr.forEach(function (x) { e.push(x); });
  }
  function addTravel(pov, loc, arr) {
    var t = L[pov][loc].travelDestinations || (L[pov][loc].travelDestinations = []);
    arr.forEach(function (x) { t.push(x); });
  }

  add("arjun", "pg_bathroom", [
    { id: "a2_shower", action: "Take a shower", triggers: "arjun_shower_d2", intimate: true, dayOnly: 2 },
    { id: "a2_stress_pee", action: "Pee   your hands won't stop shaking", triggers: "arjun_stress_pee_d2", intimate: true, dayOnly: 2, unlockCondition: "arjun_received_call" }
  ]);
  add("arjun", "katraj_pg_room", [
    { id: "a2_rohit_morning", action: "Talk to Rohit (he's studying you)", triggers: "rohit_reads_change_d2", dayOnly: 2, unlockCondition: "arjun_received_call", quest: "side" },
    { id: "a2_alarm", action: "Set the alarm for 4 AM", triggers: "arjun_set_alarm_d2", dayOnly: 2, unlockCondition: "vit_day_survived_d2 AND time >= 16:00", quest: "main" },
    { id: "a2_wardrobe", action: "Choose tomorrow's outfit", triggers: "arjun_wardrobe_d2", dayOnly: 2, unlockCondition: "vit_day_survived_d2 AND time >= 16:00", quest: "main" },
    { id: "a2_rohit_choice", action: "Rohit wants the truth   decide", triggers: "rohit_choice_d2", dayOnly: 2, unlockCondition: "alarm_set_4am AND time >= 18:00", quest: "side" },
    { id: "a2_night", action: "Lie down. The longest night.", triggers: "arjun_night_d2", dayOnly: 2, unlockCondition: "preparation_complete AND time >= 22:00 AND not arjun_day2_complete", quest: "main" }
  ]);
  add("arjun", "tapri_chai", [
    { id: "a2_raju_followup", action: "Collect your free chai from Raju", triggers: "raju_followup_d2", dayOnly: 2, unlockCondition: "raju_phone_fixed", quest: "side" }
  ]);
  add("arjun", "vit_cblock", [
    { id: "a2_os_class", action: "Attend the OS lecture (Prof. Desai)", triggers: "os_lecture_d2", timeWindow: "09:30-11:30", dayOnly: 2, unlockCondition: "arjun_received_call", quest: "main" }
  ]);
  add("arjun", "vit_canteen", [
    { id: "a2_nikhil_icpc", action: "Sit with Nikhil", triggers: "nikhil_canteen_d2", dayOnly: 2, unlockCondition: "os_lecture_done", quest: "side" }
  ]);
  addExit("arjun", "katraj_street", [
    { to: "katraj_general_store", label: "Kulkarni General Store", unlockCondition: "day >= 2" },
    { to: "katraj_gym", label: "Iron Temple Gym", unlockCondition: "day >= 2" }
  ]);
  addTravel("arjun", "katraj_street", [
    { to: "jm_road", travelTime: 20, method: "pulsar", label: "Ride to JM Road (20 min)", unlockCondition: "day >= 2 AND time >= 12:00" },
    { to: "pataleshwar_temple", travelTime: 20, method: "pulsar", label: "Ride to Pataleshwar temple (20 min)", unlockCondition: "arjun_received_call AND time >= 16:00" }
  ]);
  addTravel("arjun", "vit_gate", [
    { to: "jm_road", travelTime: 15, method: "pulsar", label: "Ride to JM Road (15 min)", unlockCondition: "day >= 2 AND time >= 12:00" }
  ]);

  add("kavya", "hostel_room_304", [
    { id: "k2_meera_plan", action: "Talk to Meera about the plan", triggers: "meera_full_plan_d2", timeWindow: "06:30-11:00", dayOnly: 2, unlockCondition: "priya_left_for_class", quest: "main" },
    { id: "k2_rules", action: "Write the swap rules with Meera", triggers: "swap_rules_d2", dayOnly: 2, unlockCondition: "meera_plan_heard", quest: "main" },
    { id: "k2_schedule", action: "Study Arjun's CS class schedule", triggers: "schedule_study_d2", dayOnly: 2, unlockCondition: "swap_rules_established", quest: "side" },
    { id: "k2_journal", action: "Start a private swap journal?", triggers: "journal_d2", dayOnly: 2, unlockCondition: "swap_rules_established", quest: "side" },
    { id: "k2_period", action: "Check your period tracker (on the Redmi)", triggers: "kavya_period_planning_d2", dayOnly: 2, unlockCondition: "swap_rules_established", intimate: true },
    { id: "k2_chant", action: "Practice the swap chant with Meera", triggers: "chant_practice_d2", dayOnly: 2, unlockCondition: "swap_rules_established AND time >= 19:30", quest: "side" },
    { id: "k2_call_arjun", action: "Call Arjun on the Redmi", triggers: "kavya_calls_arjun_d2", dayOnly: 2, unlockCondition: "swap_rules_established AND time >= 20:15", quest: "main" },
    { id: "k2_priya_gossip", action: "Hear Priya out about Room 308", triggers: "priya_gossip_d2", dayOnly: 2, unlockCondition: "priya_has_gossip", quest: "side" },
    { id: "k2_body_catalogue", action: "Lie in bed   map your body, one last time", triggers: "kavya_body_catalogue_d2", dayOnly: 2, unlockCondition: "kavya_called_arjun AND time >= 23:00 AND not kavya_day2_complete", intimate: true, quest: "main" }
  ]);
  add("kavya", "hostel_bathroom", [
    { id: "k2_shower", action: "Shower   and really notice it", triggers: "kavya_shower_d2", intimate: true, dayOnly: 2 }
  ]);
  add("kavya", "bj_library", [
    { id: "k2_last_coding", action: "One last coding session on Terminal 6", triggers: "last_coding_d2", dayOnly: 2, unlockCondition: "signed_out_hostel AND time >= 15:00", quest: "side" }
  ]);
  addExit("kavya", "hostel_corridor", [
    { to: "hostel_room_308", label: "Room 308 (Anjali)", unlockCondition: "hostel_security_intel" }
  ]);
  addExit("kavya", "bj_campus_path", [
    { to: "bj_pharmacology_hall", label: "Pharmacology hall", unlockCondition: "day >= 2" }
  ]);

  /* ---- tag Day 1 finale objects so they vanish on later days ---- */
  [
    ["arjun", "katraj_pg_room", ["rohit_cad", "night_call", "dbms_work", "end_day",
      "laptop", "meera_photos", "dbms_notebook", "wardrobe", "rohit_bed"]],
    ["arjun", "vit_cblock", ["classroom_door", "nikhil_notes"]],
    ["arjun", "vit_canteen", ["rohit_table"]],
    ["arjun", "vit_gate", ["deliver_packet"]],
    ["arjun", "pg_bathroom", ["shower"]],
    ["arjun", "tapri_chai", ["raju_phone"]],
    ["arjun", "vit_library", ["ananya"]],
    ["kavya", "hostel_room_304", ["manuscript_reveal_obj", "test_swap_obj", "wait_priya_sleep",
      "build_dosage", "priya_photo_req", "meera_manuscript", "priya_bed"]],
    ["kavya", "hostel_bathroom", ["shower_stall"]],
    ["kavya", "bj_anatomy_hall", ["dissection_table", "meera_table", "sharma_quiz"]],
    ["kavya", "bj_library", ["build_dosage_lib", "computer_section"]],
    ["kavya", "hostel_mess", ["mess_didi_favor"]]
  ].forEach(function (row) {
    (L[row[0]][row[1]].objects || []).forEach(function (o) {
      if (row[2].indexOf(o.id) !== -1) o.dayOnly = 1;
    });
  });

  /* ---- DAY 2 OBJECTIVES ---- */
  var A = setup.objectives.arjun, K = setup.objectives.kavya;

  A.main.push(
    { id: "a2_obj_morning", title: "Start the day", pov: "arjun", day: 2, status: "active",
      description: "Up, bathroom, chai. The usual   for the last time it'll ever feel usual.",
      completionTrigger: "arjun_morning_d2",
      hint: { where: "Your PG room and the shared bathroom.", when: "07:25 AM.",
        who: "Rohit's around, eating dry cornflakes.",
        how: "Do the bathroom (shower / brush), grab a chai at Raju's tapri if you like. That completes it. A little before 8, your phone will ring   an unknown number." } },
    { id: "a2_obj_call", title: "Answer the unknown number", pov: "arjun", day: 2,
      description: "Your phone is buzzing. Unknown number. Something says pick up.",
      unlockCondition: "arjun_morning_d2", completionTrigger: "arjun_received_call",
      lockNote: "The call comes at 07:50. Finish the morning first.",
      hint: { where: "Wherever you are   the call finds you (the story puts you at the bathroom sink).", when: "07:50 AM.",
        who: "Kavya. Meera's roommate. You've never spoken.",
        how: "When the incoming-call event fires, answer it. This is the call that ends six months of silence." } },
    { id: "a2_obj_vit", title: "Get through the day at VIT", pov: "arjun", day: 2,
      description: "OS lecture with Prof. Desai. Your body is in C-207. Your mind is at a temple.",
      unlockCondition: "arjun_received_call AND time >= 09:15", completionTrigger: "vit_day_survived_d2",
      lockNote: "Unlocks after the morning call, once it's past 9:15.",
      reward: { coding_skill: 1 },
      hint: { where: "VIT → C-Block → 'Attend the OS lecture'.", when: "Lecture window 09:30–11:30.",
        who: "Prof. Desai; Rohit and Nikhil in the room.",
        how: "Ride to VIT (Pulsar keys), show ID at the gate, go to C-Block, sit the lecture. Kill time first at the tapri, canteen, gym or general store." } },
    { id: "a2_obj_prep", title: "Prepare for 5 AM", pov: "arjun", day: 2,
      description: "Set the alarm. Choose what to wear. Scout the temple if you can. Tomorrow you leave your body.",
      unlockCondition: "vit_day_survived_d2 AND time >= 16:00", completionTrigger: "preparation_complete",
      lockNote: "Unlocks after the VIT day, from 4:00 PM.",
      hint: { where: "Your PG room   'Set the alarm' and 'Choose tomorrow's outfit'. Optional: ride to Pataleshwar to scout it.",
        when: "Evening, after 4 PM.", who: "Rohit will notice the alarm and the shirt.",
        how: "Both room actions (alarm + outfit) are required. Scouting the temple (a side quest) makes tomorrow smoother but isn't mandatory." } },
    { id: "a2_obj_night", title: "The longest night", pov: "arjun", day: 2,
      description: "Lie in bed. Do not sleep well. Carry the wanting into tomorrow.",
      unlockCondition: "preparation_complete AND time >= 22:00", completionTrigger: "arjun_day2_complete",
      lockNote: "Unlocks once you've prepped and it's past 10 PM.",
      hint: { where: "Your PG room → 'Lie down. The longest night.'", when: "After 10 PM.",
        who: "Rohit, asleep by 10:45.", how: "This closes Arjun's Day 2. There's a choice in it about how you spend the last hour." } }
  );

  A.side.push(
    { id: "a2_sq_icpc", title: "ICPC practice partner", pov: "arjun", day: 2,
      description: "Nikhil needs a two-person team for the ACM-ICPC practice round.",
      unlockCondition: "os_lecture_done", completionTrigger: "icpc_agreed",
      reward: { coding_skill: 3, rel_nikhil: 5 },
      hint: { where: "VIT Canteen → 'Sit with Nikhil'.", when: "After the OS lecture.", who: "Nikhil.",
        how: "Agree to partner. Note: whoever is wearing your hands next Saturday inherits this   and Kavya codes like KV_Codes." } },
    { id: "a2_sq_rohit", title: "Tell Rohit? (choice)", pov: "arjun", day: 2,
      description: "He's your best friend and he can see something changed. Partial truth, or nothing.",
      unlockCondition: "alarm_set_4am AND time >= 18:00", completionTrigger: "rohit_told_decision",
      hint: { where: "Your PG room → 'Rohit wants the truth   decide'.", when: "Evening, after you've started prepping.",
        who: "Rohit.", how: "Partial truth (+trust, +some suspicion) or keep quiet (−trust). Either way it completes." } },
    { id: "a2_sq_temple", title: "Scout Pataleshwar temple", pov: "arjun", day: 2,
      description: "Visit the meeting point. Learn the layout. Find the quiet corners.",
      unlockCondition: "arjun_received_call AND time >= 16:00", completionTrigger: "visited_pataleshwar",
      reward: {},
      hint: { where: "Ride from Katraj Main Road or JM Road to Pataleshwar temple.", when: "After 4 PM.",
        who: "An old priest who has watched centuries of people arrive 'seeking change'.",
        how: "Talk to the priest and walk the courtyard. Makes tomorrow's swap scene less blind." } },
    { id: "a2_sq_gym", title: "Burn the anxiety", pov: "arjun", day: 2,
      description: "Rohit's gym. The punching bag is a good listener.",
      unlockCondition: "arjun_received_call", completionTrigger: "gym_workout_done",
      reward: { energy: 8 },
      hint: { where: "Katraj Main Road → Iron Temple Gym → 'Hit the punching bag'.", when: "Any time after the call.",
        who: "Vikram, the trainer.", how: "Wrap your hands, hit the bag. Restores energy and mood before the long night." } },
    { id: "a2_sq_store", title: "Kulkarni uncle's intel", pov: "arjun", day: 2,
      description: "The shop uncle knows everything about the neighbourhood   including the temple at dawn.",
      unlockCondition: "day >= 2", completionTrigger: "kulkarni_talked",
      reward: { rel_kulkarni: 2 },
      hint: { where: "Katraj Main Road → Kulkarni General Store → 'Talk to Kulkarni uncle'.", when: "Any time.",
        who: "Kulkarni uncle.", how: "Ask about Pataleshwar at 5 AM. He'll tell you who's there and who isn't   and tease you about it." } },
    { id: "a2_sq_book", title: "Crossword bookstore run", pov: "arjun", day: 2,
      description: "JM Road. Maybe grab a data-structures book for... someone who'll need your hands.",
      unlockCondition: "visited_jm_road", completionTrigger: "skiena_bought",
      reward: { coding_skill: 1, item: "cs_reference_book" },
      hint: { where: "JM Road → 'Browse the Crossword bookstore'.", when: "Any time you're on JM Road (from noon).",
        who: "A lit-postgrad employee working retail.", how: "Buy the Skiena. ₹550 with student discount." } },
    { id: "a2_sq_raju", title: "Check on Raju's phone repair", pov: "arjun", day: 2,
      description: "You fixed his phone. He owes you free chai for a week. Collect.",
      unlockCondition: "raju_phone_fixed", completionTrigger: "raju_followup_done",
      reward: {},
      hint: { where: "Raju's chai tapri → 'Collect your free chai from Raju'.", when: "Tapri open 6 AM–10 PM.",
        who: "Raju Bhaiya, radiant with a whole unbroken screen.", how: "Just show up. He'll upgrade you from cutting to full chai." } },
    { id: "a2_sq_sunday", title: "Confirm Sunday with Aai", pov: "arjun", day: 2,
      description: "Aai's already bought the mutton. The swap might complicate a home visit.",
      unlockCondition: "day >= 2", completionTrigger: "sunday_decision_made",
      hint: { where: "Any location   the phone. Aai calls in the evening, or call her yourself.", when: "Evening.",
        who: "Aai.", how: "Answer the call / call back and make a call about Sunday. She hears everything you don't say." } }
  );

  K.main.push(
    { id: "k2_obj_plan", title: "Hear Meera's full plan", pov: "kavya", day: 2,
      description: "Biochem can wait. Meera has it all worked out. Room 304, door bolted, Priya in class.",
      unlockCondition: "priya_left_for_class", completionTrigger: "meera_plan_heard",
      lockNote: "Priya leaves for Biochemistry at 6:50–7:00. Wait for the room to clear.",
      hint: { where: "Room 304 → 'Talk to Meera about the plan'.", when: "After Priya leaves (~7:00), before 11.",
        who: "Meera.", how: "Just start the conversation. She lays out the whole swap: Arjun into your body, you into his, VIT classes for you." } },
    { id: "k2_obj_rules", title: "Write the swap rules", pov: "kavya", day: 2,
      description: "Your body, your terms. Non-negotiable. Meera helps draft them.",
      unlockCondition: "meera_plan_heard", completionTrigger: "swap_rules_established",
      reward: { trust_meera: 5 },
      lockNote: "Unlocks once you've heard the plan.",
      hint: { where: "Room 304 → 'Write the swap rules with Meera'.", when: "Right after the plan.",
        who: "Meera.", how: "You draft nine rules on the Redmi. The document lands in your inventory as an artifact." } },
    { id: "k2_obj_college", title: "Get through college", pov: "kavya", day: 2,
      description: "Pharmacology with Dr. Mhatre. The usual purgatory   but today your mind is on fire.",
      unlockCondition: "swap_rules_established AND time >= 09:15", completionTrigger: "college_survived_d2",
      lockNote: "Unlocks after the rules, from 9:15.",
      hint: { where: "Sign out at the entrance → campus path → Pharmacology hall → 'Sit through the lecture'.", when: "09:30–13:00.",
        who: "Dr. Mhatre; Sneha nearby.", how: "You must sign out first. Kill morning time in the mess, the samosa stall, or helping Sneha." } },
    { id: "k2_obj_call", title: "Call Arjun", pov: "kavya", day: 2,
      description: "Tell him everything. The manuscript. The swap. Tomorrow, 5 AM, Pataleshwar.",
      unlockCondition: "swap_rules_established AND time >= 20:15", completionTrigger: "kavya_called_arjun",
      lockNote: "Unlocks once the rules are written and Priya's gone to the common room for her serial (~8:15 PM).",
      hint: { where: "Room 304 → 'Call Arjun on the Redmi'.", when: "After 8:15 PM, Priya out.",
        who: "Arjun (Meera stands lookout at the door).", how: "The eleven-minute call. This is Day 2's centrepiece   you can also play Arjun's side of it." } },
    { id: "k2_obj_body", title: "Last night in your body (as you know it)", pov: "kavya", day: 2,
      description: "Tomorrow you become someone else. Map yourself. Remember the coordinates.",
      unlockCondition: "kavya_called_arjun AND time >= 23:00", completionTrigger: "kavya_day2_complete",
      lockNote: "Unlocks after the call, past 11 PM.",
      hint: { where: "Room 304 → 'Lie in bed   map your body, one last time'.", when: "After 11 PM.",
        who: "Priya and Meera asleep.", how: "This closes Kavya's Day 2." } }
  );

  K.side.push(
    { id: "k2_sq_gossip", title: "Hostel security intel", pov: "kavya", day: 2,
      description: "Priya's gossiping about Anjali in 308. Under the gossip is a 30-minute hole in hostel surveillance.",
      unlockCondition: "priya_has_gossip", completionTrigger: "priya_gossip_heard",
      reward: { rel_priya: 2, priya_suspicion: -2 },
      hint: { where: "Room 304 → 'Hear Priya out about Room 308'.", when: "After Priya's back from her jog (~6:30 PM).",
        who: "Priya.", how: "Let her talk. The kitchen window, the broken latch, Ganesh's 7:30–8:00 chai break   file all of it." } },
    { id: "k2_sq_anjali", title: "Visit Anjali in Room 308", pov: "kavya", day: 2,
      description: "The girl who smuggled her boyfriend in. She has the detailed map.",
      unlockCondition: "hostel_security_intel AND time >= 19:00", completionTrigger: "anjali_visited",
      reward: { rel_anjali: 3 },
      hint: { where: "Corridor → Room 308 → 'Talk to Anjali'.", when: "After 7 PM, once the gossip has opened the room.",
        who: "Anjali (no relation to Arjun).", how: "She draws you the kitchen route on a pharmacology worksheet. Hostel-code applies: she won't ask why." } },
    { id: "k2_sq_journal", title: "Start a private swap journal (choice)", pov: "kavya", day: 2,
      description: "Document body sensations during swaps. For science. For yourself.",
      unlockCondition: "swap_rules_established", completionTrigger: "journal_decision",
      hint: { where: "Room 304 → 'Start a private swap journal?'", when: "Any time after the rules.",
        who: " .", how: "A choice: keep a hidden log (helps future body-awareness) or don't. Either way completes." } },
    { id: "k2_sq_schedule", title: "Memorise Arjun's CS schedule", pov: "kavya", day: 2,
      description: "You need to know where to be, when, and whose name to answer to.",
      unlockCondition: "swap_rules_established", completionTrigger: "schedule_memorized",
      reward: { coding_skill: 2 },
      hint: { where: "Room 304 → 'Study Arjun's CS class schedule'.", when: "Any time after the rules.",
        who: "Meera pulls up VIT's public portal.", how: "Three CS classes tomorrow. Read them. Prof. Krishnan wrote a paper you cried over." } },
    { id: "k2_sq_test", title: "Survive Dr. Mhatre's surprise test", pov: "kavya", day: 2,
      description: "Sneha warned you yesterday. Dosage calculations. Pure algebra with medical labels.",
      unlockCondition: "surprise_test_info AND day >= 2", completionTrigger: "surprise_test_passed",
      reward: { med_knowledge: 3 },
      hint: { where: "Pharmacology hall → 'Take Dr. Mhatre's surprise test' (during the lecture).", when: "10 AM, in the lecture.",
        who: "Dr. Mhatre.", how: "You built the dosage app on Day 1, so the formulas are in your head. Finish in twelve minutes." } },
    { id: "k2_sq_studygroup", title: "Join Sneha's study group", pov: "kavya", day: 2,
      description: "Pharmacology study group. Useless to you   perfect cover behaviour.",
      unlockCondition: "sneha_helped AND day >= 2", completionTrigger: "study_group_joined",
      reward: { rel_sneha: 3, priya_suspicion: -2 },
      hint: { where: "Pharmacology hall → 'Sit with Sneha', or the library.", when: "Any time you cross paths with Sneha.",
        who: "Sneha.", how: "Say yes. A girl planning a body swap who also joins a study group draws zero suspicion." } },
    { id: "k2_sq_libcode", title: "Last coding session as Kavya", pov: "kavya", day: 2,
      description: "Tomorrow you code on a real setup. Today, one last hour on the library Dell.",
      unlockCondition: "signed_out_hostel AND time >= 15:00", completionTrigger: "last_kavya_coding",
      reward: { coding_skill: 3 },
      hint: { where: "B.J. Medical library → 'One last coding session on Terminal 6'.", when: "After 3 PM.",
        who: " .", how: "The GitHub issue on Sanskrit loanword tokenisation. Forty minutes. Say goodbye to the terminal." } },
    { id: "k2_sq_chant", title: "Practice the swap chant", pov: "kavya", day: 2,
      description: "Sixteen syllables. Sanskrit is phonetic   mispronunciation isn't wrong-sounding, it's wrong.",
      unlockCondition: "swap_rules_established AND time >= 19:30", completionTrigger: "chant_practiced",
      reward: { trust_meera: 2 },
      hint: { where: "Room 304 → 'Practice the swap chant with Meera'.", when: "Evening, Priya out (after 7:30).",
        who: "Meera, in padmasana.", how: "Twenty minutes of repetition. By count sixty it starts to 'compile'." } },
    { id: "k2_sq_amma", title: "Call Amma back", pov: "kavya", day: 2,
      description: "She sent the Kalyani raga yesterday. Call her before tomorrow changes everything.",
      unlockCondition: "day >= 2", completionTrigger: "amma_called_back",
      reward: { rel_amma: 3 },
      hint: { where: "Any location   the Samsung.", when: "Any time.", who: "Amma.",
        how: "She'll hear the goodbye in your voice even though you don't say one. Let her." } }
  );

  /* ---- DAY 2 TIMED EVENTS ---- */
  setup.timedEvents.push(
    { day: 2, time: "07:50", character: "arjun", event: "a2_unknown_call", passage: "EV_a2_unknown_call" },
    { day: 2, time: "13:30", character: "arjun", event: "a2_pooja_whatsapp", passage: "EV_a2_pooja_whatsapp" },
    { day: 2, time: "17:30", character: "arjun", event: "a2_sunset_energy", passage: "EV_a2_sunset_energy" },
    { day: 2, time: "18:30", character: "arjun", event: "a2_aai_call", passage: "EV_a2_aai_call" },
    { day: 2, time: "21:00", character: "arjun", event: "a2_full_call", passage: "EV_a2_full_call" },
    { day: 2, time: "07:00", character: "kavya", event: "a2_priya_class", setFlag: "priya_left_for_class", passage: "EV_a2_priya_class" },
    { day: 2, time: "09:30", character: "kavya", event: "a2_papa_whatsapp", passage: "EV_a2_papa_whatsapp" },
    { day: 2, time: "14:00", character: "kavya", event: "a2_github_issue", passage: "EV_a2_github_issue" },
    { day: 2, time: "16:30", character: "kavya", event: "a2_meera_reminder", passage: "EV_a2_meera_reminder" },
    { day: 2, time: "18:30", character: "kavya", event: "a2_priya_gossip", setFlag: "priya_has_gossip", passage: "EV_a2_priya_gossip" },
    { day: 2, time: "20:15", character: "kavya", event: "a2_priya_common", setFlag: "priya_in_common_room", passage: "EV_a2_priya_common" }
  );

  /* ---- NAME / ITEM / IMAGE TABLES ---- */
  Object.assign(setup.npcNames, {
    kulkarni_uncle: "Kulkarni uncle", gym_trainer_vikram: "Vikram (trainer)", random_gym_bros: "the gym bros",
    temple_priest: "the temple priest", evening_devotees: "a few evening devotees",
    bookshop_employee: "the bookshop guy", street_food_vendor: "the street-food cart", random_walkers: "JM Road walkers",
    anjali_308: "Anjali", dr_mhatre: "Dr. Mhatre", prof_desai: "Prof. Desai", sanjay_auto: "Sanjay (auto driver)"
  });
  Object.assign(setup.itemNames, {
    cs_reference_book: "Skiena   Algorithm Design Manual", swap_rules_doc: "Swap Rules v1.0 (on the Redmi)",
    kitchen_route_map: "Anjali's kitchen-route sketch", free_chai: "Raju's free chai (this week)"
  });
  Object.assign(setup.imgDir, {
    "katraj_general_store.png": "locations", "katraj_gym.png": "locations",
    "pataleshwar_temple.png": "locations", "jm_road.png": "locations",
    "pharmacology_hall.png": "locations", "room_308.png": "locations",
    "arjun_call_bathroom.png": "scenes/day2", "kavya_meera_planning.png": "scenes/day2",
    "arjun_distracted_lecture.png": "scenes/day2", "nikhil_canteen.png": "scenes/day2",
    "kavya_pharmacology.png": "scenes/day2", "kavya_calling_arjun.png": "scenes/day2",
    "arjun_gym_punching.png": "scenes/day2", "arjun_anticipation_night.png": "scenes/day2",
    "kavya_body_catalogue.png": "scenes/day2", "kavya_last_coding.png": "scenes/day2",
    "temple_priest.png": "scenes/day2", "joshi_rounds_tense.png": "scenes/day2",
    "anjali_portrait.png": "characters", "mhatre_portrait.png": "characters",
    "vikram_portrait.png": "characters", "kulkarni_uncle_portrait.png": "characters",
    "temple_priest_portrait.png": "characters", "sanjay_portrait.png": "characters"
  });
  setup._restLocs.arjun.push("pataleshwar_temple", "jm_road", "katraj_general_store");
  setup._restLocs.kavya.push("hostel_room_308");

  /* ---- Day 2 phone content ---- */
  var _pd = setup.phoneData;
  setup.phoneData = function () {
    var d = _pd();
    if (V().day >= 2) {
      d.arjun.whatsapp = [
        { name: "Meera ❤️", last: "Papa ne phone le liya. I'll find a way. Don't forget me.", locked: true, note: "still   for now" },
        { name: "Rohit Sala", last: "Bhai gym chalega aaj? Leg day hai 💪", passage: "PH_rohit_chat_d2" },
        { name: "Nikhil DBMS", last: "ICPC registration kal last date. Partner chahiye. Tu in?", passage: "PH_nikhil_chat_d2" },
        { name: "Pooja Pagal 🙄", last: "Bhaiya tu aaj kuch alag lag raha tha phone pe 👀", passage: "PH_pooja_chat_d2" },
        { name: "Aai ❤️", last: "Sunday confirm hai na? Mutton le liya   350 ka.", passage: "PH_aai_chat_d2" },
        { name: "CSE 3rd Year Group", last: "Desai sir ne OS extra assignment diya. Monday deadline.", note: "31 unread" }
      ];
      d.arjun.calls = [{ name: "unknown number", type: "incoming ×2", time: "today 07:50 · 21:00" }].concat(d.arjun.calls);
      d.samsung.whatsapp = [
        { name: "Papa", last: "Pharmacology III exam: October 15. Prepare well.", passage: "PH_papa_chat_d2" },
        { name: "Amma ❤️", last: "Kanna did you listen to the raga I sent?", passage: "PH_amma_chat_d2" },
        { name: "MBBS 3rd Yr Sec B", last: "Mhatre surprise test CONFIRMED tomorrow 10 AM   dosage calc", note: "unread" },
        { name: "Priya", last: "Kavya common room aa, Sasural Simar Ka rerun 😍", passage: "PH_priya_chat" },
        { name: "Sneha", last: "8/10 on the surprise test!! tu genius hai", passage: "PH_sneha_chat" }
      ];
      d.redmi.telegram = "PH_rahul_chat_d2";
      d.redmi.github = "PH_github_d2";
      d.redmi.browser = "Tabs: VIT Pune CS dept schedule · Prof. R. Krishnan   publications · \"Bajaj Pulsar 150 riding tutorial\" (YouTube, 12 min).";
    }
    return d;
  };

  /* ---- re-run the taggers so Day 2 objects/objectives pick up quest + day ---- */
  ["arjun", "kavya"].forEach(function (pov) {
    Object.keys(L[pov]).forEach(function (lid) {
      (L[pov][lid].objects || []).forEach(function (o) {
        if (setup._questTag.main.indexOf(o.id) !== -1) o.quest = "main";
        else if (setup._questTag.side.indexOf(o.id) !== -1) o.quest = "side";
      });
    });
    setup.objectives[pov].main.concat(setup.objectives[pov].side).forEach(function (o) {
      if (!o.day) o.day = 1;
    });
  });

})();

/* ------------------------------------------------------------
   PASSAGE HOOKS
   ------------------------------------------------------------ */
$(document).on(":passageend", function () {
  var S = V();
  jQuery("body").removeClass("pov-arjun pov-kavya").addClass("pov-" + S.pov);
  if (S._phonePending) {
    var which = S._phonePending;
    S._phonePending = null;
    setTimeout(function () { setup.openPhone(which); }, 40);
  }
});

/* keep pov class correct on load */
$(document).on(":storyready", function () {
  jQuery("body").addClass("pov-" + V().pov);
});
