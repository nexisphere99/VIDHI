# Images   where each file goes

Drop generated `.png` files into these folders using the **exact** names below
(they're what the game asks for). Prompts are in
`story_files/day_1/day1_image_prompts.md`.

**characters / locations / objects / ui are shared across every day.**
Only scene illustrations are day-specific   they live under `scenes/day<N>/`.

Path the game builds: `images/<folder>/<filename>`, resolved by `setup.imgDir`
in `game/js/game-engine.js`. A missing file renders as a captioned placeholder,
so the game is fully playable with no art at all.

```
images/
├── mandala.svg                     ← already here (sidebar ornament)
│
├── characters/                     ← reused every day
│   ├── arjun_casual_profile_image.png   sidebar portrait (Arjun POV)
│   ├── kavya_casual_profile_image.png   sidebar portrait (Kavya POV)
│   ├── meera_casual_profile_image.png   sidebar portrait (if a mind is in Meera's body)
│   ├── arjun_reference.png         IMG-001   (used: Intro)
│   ├── kavya_reference.png         IMG-002   (used: Intro)
│   ├── meera_reference.png         IMG-003   (not wired yet)
│   ├── rohit_reference.png         IMG-004   (not wired yet)
│   ├── priya_reference.png         IMG-005   (not wired yet)
│   └── expressions/                IMG-050–068  portrait busts (not wired yet)
│
├── locations/                      ← reused every day
│   ├── katraj_pg_room.png          IMG-010
│   ├── pg_bathroom.png             IMG-021
│   ├── tapri_chai.png              IMG-011
│   ├── vit_gate.png                IMG-012
│   ├── vit_lecture_hall.png        IMG-013
│   ├── vit_canteen.png             IMG-014
│   ├── room_304.png                IMG-015
│   ├── hostel_bathroom.png         IMG-016
│   ├── anatomy_hall.png            IMG-017
│   ├── hostel_terrace.png          IMG-018
│   ├── bj_campus.png               IMG-019
│   ├── hostel_mess.png             IMG-020
│   └── kothrud_home.png            IMG-039
│
├── objects/                        ← interactive-object sprites (none wired yet)
│
├── ui/                             ← phone / map mockups (not wired yet)
│   ├── arjun_phone_ui.png          IMG-040
│   ├── kavya_samsung_ui.png        IMG-041
│   ├── kavya_redmi_ui.png          IMG-042
│   ├── arjun_map.png               IMG-043
│   └── kavya_map.png               IMG-044
│
└── scenes/
    ├── day1/                       ← Day 1 story-moment illustrations only
    │   ├── arjun_wakeup.png        IMG-030
    │   ├── kavya_wakeup.png        IMG-031
    │   ├── arjun_rohit_canteen.png IMG-032
    │   ├── kavya_anatomy.png       IMG-033   (not wired yet)
    │   ├── swap_ritual.png         IMG-034
    │   ├── arjun_night_room.png    IMG-035
    │   ├── kavya_night_bed.png     IMG-036
    │   ├── bj_campus_samosa.png    IMG-037
    │   └── sinhagad_viewpoint.png  IMG-038
    └── common/                     ← not tied to one day (memories, flashbacks)
        ├── Marine_Drive_Green_Dupatta.png                  IMG-050  (PH_arjun_gallery)
        ├── Cultural_Fest_Backstage_Green_Silk_Saree.png    IMG-051  (PH_arjun_gallery)
        ├── Bharatanatyam_Video_Locked_Folder_Thumbnail.png IMG-052  (PH_arjun_gallery)
        ├── arjun_looking_at_screen.png                     IMG-053  (laptop_interaction)
        ├── arjun_room_mirror.png                           IMG-054  (arjun_mirror_scene)
        ├── arjun_bathroom_mirror.png                       IMG-055  (arjun_bathroom_mirror)
        ├── arjun_get_dressed.png                           IMG-056  (clothing_choice)
        ├── arjun_dbms_notebook.png                         IMG-057  (dbms_status)
        ├── katraj_window_view.png                          IMG-058  (katraj_morning_view)
        ├── arjun_brush_teeth.png                           IMG-059  (morning_routine)
        ├── arjun_urinal.png                                IMG-060  (arjun_pee_day1)
        └── arjun_shave.png                                 IMG-061  (shaving_scene)
```

## Recommended specs
- **Locations / scenes:** landscape, ~1280×720 or ~1200×800, `.png`, < ~300 KB.
- **Character references:** portrait/square, ~800×1000.
- sRGB. PNG or JPEG both fine.

## Adding a new image
1. Put the file in the right folder.
2. In `game/js/game-engine.js`, add a line to `setup.imgDir`:
   `"my_file.png": "locations",`  (or `"scenes/day1"`, etc.)
3. Reference it: `<<img "my_file.png" "caption">>` in a passage, or set
   `image: "my_file.png"` on a location.
4. `./build.sh`   it copies `images/` → `dist/images/`.
