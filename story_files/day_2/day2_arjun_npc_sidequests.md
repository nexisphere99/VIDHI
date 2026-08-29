# DAY 2   ARJUN DESHMUKH   NPC Interactions & Side Quests
## Word Count Target: 5,000+ words
## First person, Indian accent, Hindi-English code-switching

---

## LOCATION: KATRAJ PG ROOM

### NPC: ROHIT   Morning, Reading the Change

**[Trigger: Player interacts with Rohit after Kavya's call, in PG room]**

Rohit is eating cornflakes from a steel bowl. Dry. No milk. He claims this is "a bulk diet technique" and not "the result of forgetting to buy milk for the fourth consecutive day." He shovels a spoonful into his mouth, crunches, and then stops. Looks at me. Crunches again. Stops.

"Bhai."

"Haan?"

"Tera face."

"Kya hua mere face ko?"

"Pehle jaisa nahi hai." He sets the bowl down. The cornflakes settle. "Kal tak tu aise dikhta tha jaise teri Pulsar ki battery dead hai   like permanently. Aaj..." He narrows his eyes. "Aaj tera face aisa hai jaise kisi ne jump-start kar diya."

I busy myself with the laptop. Opening VS Code. Typing nothing. "Neend acchi aayi."

"Acchi neend aane se aadmi ka face glow nahi karta, Arjun. Glow hone ke do hi reasons hain   ladki ya drugs. And tu drugs nahi karta."

"Tujhe kaise pata ki main drugs nahi karta?"

"Because tera idea of rebellion is staying up till 2 AM writing SQL queries. Tu bahut boring hai for drugs."

He returns to his cornflakes. But his eyes stay on me   the Rohit radar, calibrated over two years of cohabitation to detect emotional changes with the precision of a seismograph.

**[CHOICE BRANCH: Tell Rohit or Keep Quiet]**

---

### NPC: ROHIT   The Choice Scene (Evening)

**[Trigger: Player interacts with Rohit in PG room after 18:00, after preparation has started]**

Rohit sees the alarm set for 4 AM. He sees the blue shirt. He sees me staring at the wall with the expression of a man whose brain is running seventeen simultaneous processes.

"Arjun." He sits on his cot. Leans forward. Elbows on knees. The Serious Posture. "Mujhe bata."

**[IF PLAYER CHOOSES: Partial Truth]**

I take a breath. "Someone connected to Meera contacted me. I'm meeting them tomorrow morning. Early."

Rohit's eyebrows do something complex. "Connected to Meera. Like   her friend? Family? A guy named Vinod who claims to be her uncle but is actually a hitman?"

"Her roommate. Kavya."

"Kavya." He processes the name. "The med student? The one who Meera says is scary-smart?"

"That one."

"And she called you."

"She called me."

"And you're meeting her at " He glances at the alarm. " 4 AM."

"5 AM. The alarm is for getting ready."

He's quiet for ten seconds. Rohit quiet is rare and significant   like a monsoon pause, it means something larger is building.

"Be careful, bhai." His voice has dropped. The bro-comedy tone is gone. This is Rohit underneath   the boy from Pimpri-Chinchwad whose father runs an auto parts shop, who chose engineering not because he loves it but because he loves his parents enough to try, who has never once failed to show up when someone he cares about is in trouble. "Colonel Kulkarni is not a joke. The man interrogated actual enemies of the state. If he finds out "

"He won't."

"Famous last words. Written on a tombstone in Comic Sans."

"Rohit."

"Main tere saath chalun?"

"Nahi. This one I have to do alone."

He nods. Slowly. "Okay. But agar subah 8 baje tak tu wapas nahi aaya "

"Toh?"

"Toh main police ko nahi bulaunga because police se mujhe bhi darr lagta hai. But I WILL call your Aai, and that woman is scarier than the Colonel and the police combined."

He extends his fist. I bump it. The universal male gesture of support that says everything that words can't.

**[$rohit_trust +5, $rohit_suspicion +3]**

**[IF PLAYER CHOOSES: Keep Quiet]**

"Nothing, yaar. Early morning thing. VIT library opens at 6 for exam prep, thought I'd actually try studying."

Rohit stares at me. He doesn't believe me. Every micro-expression in his face broadcasts *I know you're lying.* But he's also Rohit   the man who respects boundaries even when the boundaries are clearly hiding something important.

"Theek hai." He returns to his cornflakes. The crunch is louder than necessary   a culinary statement of displeasure.

**[$rohit_trust -2, $rohit_suspicion +0]**

---

## LOCATION: TAPRI CHAI

### NPC: RAJU BHAIYA   Phone Repair Follow-Up

**[Trigger: Player visits tapri, Day 1 raju_phone_fixed flag true]**

Raju bhaiya is radiant. His repaired phone   screen now a single, unbroken pane of glass   sits on the counter beside the chai vessels like a trophy. He sees me approaching and his mustache achieves liftoff.

"ARJUN BABA!" He waves the phone at me. "Dekh! Anwar bhai ne ₹700 mein kar diya. Tera naam liya toh discount de diya. Screen naya, camera chal raha hai, WhatsApp mein sab contacts wapas aa gaye."

He pours my cutting chai with the reverence usually reserved for temple offerings. Slides it across the counter. Then   dramatically   pushes the glass back and replaces it with a larger one. Full chai. Not cutting.

"Aaj full chai. Free. Tera hafte bhar ka offer start hota hai aaj se."

I take the glass. The chai is perfect   sweeter than usual, Raju's version of a celebration brew. We drink in companionable silence. The morning tapri crowd assembles   auto drivers, PG boys, the IT uncle from yesterday (different tie, same tired eyes).

"Arjun baba, aaj kuch alag hai." Raju leans forward. His observational skills, honed by fifteen years of watching engineering students, are apparently military-grade. "Kal udaas tha. Aaj   aaj kuch ho gaya."

"Bas chai peene aaya hoon, Raju bhaiya."

"Hmm." He strokes his mustache   the diagnostic gesture. "Jab cheeni zyada maangta hai toh dukhi hota hai. Aaj cheeni nahi maangi. Matlab dil mein meetha hai already."

The man is a poet disguised as a tea vendor. I don't argue.

**[free_chai_consumed, +3 mood, raju_followup_done]**

---

### NPC: RANDOM TAPRI CUSTOMER   The Auto Driver

**[Trigger: Player sits at tapri between 07:30-08:30]**

An auto driver parks his green-and-yellow three-wheeler in front of the tapri, engine still coughing. He's fifty-something, handlebar mustache, the khaki uniform of Pune's auto fleet. Orders a chai and two Parle-G biscuits with the authority of a regular.

"Student hai?" He glances at me.

"Haan, uncle. VIT."

"VIT. Accha college hai. Mera ladka bhi engineer banna chahta tha." He sips his chai. "Ban nahi paya. Ab mere saath auto chalata hai."

"Kya hua?"

"Paise." One word. The universal Indian answer. "Fees itni hai ki ghar bech do toh bhi kam padegi. Mera ladka intelligent hai   87% aaya tha boards mein. But 87% se kya hota hai jab seat ka donation das lakh maangta hai?"

The auto driver's name is Sanjay. His son's name is Vishal. Vishal now drives the night shift so Sanjay can drive the day shift. Together they earn enough to pay rent, eat dal-chawal, and put Vishal's younger sister through school.

"Kabhi kabhi sochta hoon," Sanjay says, finishing his chai, "ki is desh mein degree se zyada zaroorat connections ki hai. Degree toh parcel hai   khali dabba. Andar kuch ho tab kaam aaye."

He pays for his chai   ₹15, exact change, the economy of a man who counts every rupee. Tips his imaginary hat at Raju bhaiya. Starts the auto. Drives into the morning traffic.

I sit with my free chai and think about privilege. VIT fees: ₹1.8 lakh per year. My father's LIC salary covers it with effort. Sanjay's auto earnings wouldn't cover a semester's lab charges.

Tomorrow I might be in someone else's body. But at least I have a body in a college. At least I have a seat. At least my father didn't have to sell the house.

**[+2 perspective, no stat change   emotional beat]**

---

## LOCATION: VIT CAMPUS

### NPC: PROF. DESAI   OS Lecture Interaction

**[Trigger: Player attends OS lecture]**

Desai is writing on the board. His handwriting is a disaster   the kind of handwriting that autocorrect would reject. But the content is beautiful: process synchronization primitives, the architecture of shared resource management, the delicate dance of threads competing for attention.

"The dining philosophers problem," he says, chalk squeaking, "is about five entities trying to share limited resources without deadlock."

He turns to the class. Makes eye contact with me. "Arjun. Real-world analogy?"

I give the answer   forks, philosophers, deadlock. Then the solution: asymmetry.

"Interesting word choice," Desai says. "Asymmetry. Most students say 'ordering' or 'hierarchy.' You said asymmetry. Breaking the pattern."

"Sometimes the pattern IS the problem, sir."

He nods. Something passes between us   the recognition of a student who's thinking beyond the textbook, who's mapping abstract concepts onto personal terrain. Desai doesn't know what I'm mapping. He doesn't need to. The insight is the point.

"Asymmetry," he repeats, writing it on the board in his terrible handwriting. "Remember that word. It appears in deadlock resolution, in scheduling algorithms, and " He pauses, chalk hovering. " in life."

**[+1 coding_skill, thematic resonance established]**

---

### NPC: NIKHIL   ICPC Proposal (Canteen)

**[Trigger: Post-lecture, player visits canteen, talks to Nikhil]**
**[SIDE QUEST: ICPC Practice Partner]**

**[IMAGE: nikhil_canteen.jpg   INSERT HERE]**

"Registration closes tomorrow," Nikhil says, pushing his glasses up with one finger   the Nikhil gesture, performed approximately forty-seven times daily. "ACM-ICPC. Preliminary round. Two-person teams. Online."

"Tu mujhe kaise choose kar raha hai? There are better coders in the department."

"Better coders, yes. But they're all in teams already. And honestly?" He leans forward. "You're the only guy in this class who writes code like he's writing poetry. Everyone else writes code like they're filling tax forms."

"That might be the nicest thing anyone's said to me."

"Don't get emotional. I need a partner, not a friend. We can be friends after we qualify."

"When's the practice round?"

"Next Saturday. Online. Three hours, five problems. We practice Tuesday and Thursday evenings   lab 3, 6 to 8 PM."

The timing. Next Saturday. If the swaps are happening by then   Kavya will be in my body for the practice round. Kavya, who has a GitHub with three merged PRs and a coding skill that makes mine look like fingerpainting.

"I'm in," I say. And I mean it in two layers   one for me, one for whoever will be wearing my hands when the keyboard needs them.

**[+3 coding_skill, +5 rel_nikhil, icpc_partner_agreed flag, FUTURE IMPACT: Kavya will inherit this commitment]**

---

## LOCATION: KATRAJ GENERAL STORE (NEW)

### NPC: KULKARNI UNCLE   The Neighborhood Database

**[Trigger: Player enters katraj_general_store]**

Kulkarni uncle runs his general store the way some people run intelligence agencies   with meticulous record-keeping, near-total surveillance coverage of his geographic area, and a filing system that exists entirely in his head. He's sixty, bald, reading glasses permanently perched on his nose, and he knows the purchasing habits, relationship statuses, and exam schedules of every student in a three-block radius.

"Arjun beta! Kya chahiye? Maggi? Biscuit? Phone charger? Woh last time ka charger kaisa chal raha hai   type-C wala?"

"Chal raha hai, uncle. Bas kuch snacks."

I browse the narrow aisle   the shop is maybe ten feet wide, shelves floor to ceiling, every square inch optimized. Chips (Lays, Kurkure, Uncle Chipps). Biscuits (Parle-G, Hide & Seek, Bourbon). Instant noodles (Maggi, Yippee, Top Ramen   the holy trinity). Toiletries. Phone accessories. A surprisingly comprehensive collection of stationery.

"Uncle, ek baat poochun?"

"Pooch."

"Pataleshwar temple   wahan subah 5 baje log aate hain?"

He peers at me over his glasses. "Subah 5 baje? Haan, kuch devotees aate hain. Sinhagad Road ke un senior citizens jo subah 4 baje uthke yoga karte hain and then temple jaate hain. 5 baje temple ka courtyard khula hota hai. Guard nahi hota   open area hai. Andar cave mein lock hota hai 6 baje tak."

"Courtyard safe hai?"

"Safe matlab? Chori wagairah nahi hoti   koi kya chorega, pattharon ko? But ladki ke saath jaana hai toh..." His eyes twinkle with the accumulated mischief of sixty years. "Koi nahi hota 5 baje. Privacy milegi."

"UNCLE. It's not "

"Beta, main saath saal se students ko snacks bech raha hoon. Har baat ka excuse suna hai. 'Temple jaana hai 5 baje' is new. Usually it's 'sinhagad fort sunrise trek.' Same result, better alibi."

I buy two packets of Kurkure (₹20 each) and a bottle of water (₹20) and leave with slightly more information and significantly more embarrassment than I entered with.

**[money -₹60, temple_info obtained, +2 kulkarni_uncle relationship]**

---

## LOCATION: KATRAJ GYM (NEW)

### NPC: GYM TRAINER VIKRAM & Gym Scene

**[Trigger: Player enters katraj_gym, side quest sq_gym_session]**

**[INTIMATE MARKER   Gym Body Awareness]**

Iron Temple Gym occupies a basement that smells of rust, rubber, and the concentrated ambition of men who believe that biceps are a personality trait. The equipment is a mix of commercial-grade machines and what appears to be repurposed agricultural implements. Vikram   the trainer   is the kind of man whose body is his resume: 5'11", shoulders like a doorframe, voice that sounds like it does push-ups.

"Arjun! Aa gaya finally. Rohit bol raha tha tu gym chhodne wala hai."

"Rohit bahut bolta hai."

"Aaj kya karega? Chest? Back? Shoulders?"

"Punching bag."

Vikram raises an eyebrow. The punching bag is in the corner   a cylindrical leather monument to everyone's unprocessed emotions. "Bag koi nahi maarta yahan. Sab log mirror ke saamne selfie lete hain and call it a workout."

He wraps my hands   boxing tape, figure-eight around the knuckles, cross over the wrist. The ritual is methodical. My hands become padded weapons.

I hit the bag. The first punch is tentative   testing, calibrating. The bag swings, chain rattling. The second punch is harder. The third harder still. By the fifth, I'm not hitting a bag   I'm hitting six months of silence, I'm hitting the Colonel's surveillance grid, I'm hitting every night I spent staring at a phone screen waiting for a message that never came.

The bag absorbs everything. Leather and sand and the dumb patience of an object designed to be struck.

My arms burn. Shoulders ache. Sweat runs   down my forehead, my chest under the t-shirt, my back. My body is working   the machine performing at capacity, muscles contracting and releasing, joints rotating, the cardiovascular system pumping blood to extremities that need it.

I'm aware of my body in a way I'm usually not. The weight of my fists. The torque in my hips when I twist into a cross. My cock shifting in my underwear when I pivot   the small, constant adjustment that happens when you have testicles and they're subject to momentum. The fabric of my shorts brushing against my thighs. The sweat gathering in the hollow of my sternum.

This body. These arms, these hands, this chest that heaves with effort. Tomorrow morning someone else will be wearing it. A girl named Kavya will look down and see these hands   bigger than hers, different knuckles, different span. She'll feel these legs, this flat chest, this weight between her legs that she's only encountered in textbooks and cadaver labs.

I hit the bag one more time. Hard. The chain shrieks. The bag swings wide, comes back, and I catch it with both hands. Press my forehead against the leather. Breathe.

"Bahut gussa hai," Vikram observes from the bench press. "Ya bahut pyaar. Same energy   different direction."

Same energy. Different direction. The man should be a philosopher, not a gym trainer.

**[energy +10, mood +5, body_awareness +2, gym_workout_done flag]**

---

## LOCATION: PATALESHWAR TEMPLE (NEW   SCOUT VISIT)

### NPC: TEMPLE PRIEST   The Observer

**[Trigger: Player visits pataleshwar_temple after 16:00, side quest sq_temple_scout]**

**[IMAGE: pataleshwar_temple.jpg   INSERT HERE]**

Pataleshwar. The name means "Lord of the Underworld"   Shiva in his cave-dwelling form. The temple is 1,500 years old, carved from a single basalt rock, sitting in the middle of modern Pune like a geological memory that the city grew around without absorbing.

The courtyard is open   no gates, no walls on this side, just the ancient rock formation surrounded by trees and a modern road that passes ten meters away. At 5 PM, the light is golden   the kind of light that makes old stone look alive, that turns basalt into something warm.

I park the Pulsar. Walk in. The courtyard is quiet   two elderly women offering flowers at the smaller Nandi shrine, a man in white dhoti sitting in meditation under the neem tree, and a priest.

The priest is old   seventy, maybe more. White dhoti, rudraksha beads, ash on his forehead in three horizontal lines. He tends a small oil lamp at the entrance to the main cave, his movements unhurried, his hands steady.

"Pahli baar aaye ho?" he asks without looking up. His Hindi has a Marathi base   the vowels rounder, the consonants softer.

"Haan. Bas dekh raha tha."

"Dekhne mein kya hai   pathar hai, mandir hai, Mahadev hain. But log aate hain." He straightens. Looks at me directly. His eyes are dark and clear   the eyes of a man who has spent decades watching people come and go from a place of stone. "Aate hain seeking change. Job chahiye, shaadi chahiye, baccha chahiye, bimari se chutkara chahiye. Sab aate hain."

I walk the courtyard. Map it in my head. The main cave   locked now, opens at 6 AM. The Nandi statue   large, carved, facing the cave entrance. The open courtyard   approximately fifteen by twenty meters, stone floor, two benches against the far wall. The neem trees providing cover on the east side. The road on the west   visible but at a distance.

At 5 AM, this place will be empty. No priest, no devotees, no witnesses. Just stone and sky and whatever Kavya brings with her.

"Kal subah 5 baje aaunga," I tell the priest. "Ek dost ke saath."

He nods. "5 baje Mahadev bhi sote hain. But courtyard khula hai. Joh chahiye karo."

He turns back to his lamp. The flame flickers in the evening breeze. Behind it, the cave entrance is dark   ancient, carved, holding a stone Shiva lingam that has watched fifteen centuries of humans arrive seeking transformation.

Tomorrow I'll be one of them.

**[temple_scouted flag, +5 preparation, temple_layout_known]**

---

## PHONE INTERACTIONS   DAY 2

### POOJA   WhatsApp Messages (Afternoon)

**[Trigger: Player checks WhatsApp after 13:00]**

**Pooja Pagal 🙄:**

> Bhaiya tu aaj kuch alag lag raha tha subah phone pe
> Like happy but also terrified??
> Maine Aai ko bola she said "use kuch nahi hua woh pagal hai"
> But Aai doesn't know everything
> (13:30)

> Also maths ka doubt hai
> Quadratic formula kya tha
> x equals minus b plus minus root b squared minus 4ac divided by 2a
> Right??
> Or did I mess up the signs again
> (13:35)

**Arjun:**
> Formula sahi hai. Signs sahi hain.
> And I'm fine. Bas neend nahi aayi.

**Pooja Pagal 🙄:**
> Neend nahi aayi because...?? 👀
> Is this about Meera bhabhi??
> OMG IT IS
> Your typing speed just increased which means you're nervous
> I AM A DETECTIVE
> (13:40)

> Bhaiya whatever it is
> Be careful ok?
> I don't want Colonel uncle to yell at you
> He yelled at Papa once at a function and Papa didn't sleep for two days
> (13:42)

> Also come home Sunday
> Aai is making mutton AND sheera
> That's her "beta is in trouble" menu
> She knows something is up even if she won't say it
> (13:43)

Seventeen years old. Sees through every wall I build. If MI6 needs a recruit, I'm submitting her name.

---

### AAI   Phone Call (Evening)

**[Trigger: Timed event 18:30 or player-initiated call]**

"Beta, Sunday confirm hai na?"

"Aai, dekhta hoon "

"Dekhta hoon ka kya matlab hai? Mutton already le liya hai. 350 rupay ka. Wapas nahi jaata. Tu aa raha hai."

"Aai, kal subah kuch important hai "

"Sunday ko kal subah nahi hai. Sunday ko Sunday hai. 11 baje aa. Sheera bana rahi hoon   suji wala, tujhe pasand hai. Pooja ne kaha tu khush lag raha hai   sach hai?"

The question sits between us. My mother   a woman who teaches Class 4 Marathi to eight-year-olds and somehow possesses the emotional radar of a Soviet-era early warning system.

"Haan, Aai. Thoda better."

Silence. The kind of silence that means she's crying. Not sad crying   the silent, grateful crying of a mother who's watched her son dissolve for six months and just heard him say *thoda better.*

"Aa Sunday ko. Bahut pyaar karta hoon, beta."

"Main bhi, Aai."

She hangs up. I sit with the phone and feel the weight of being loved by someone who can't understand what's happening to me but can feel every vibration of it through the thread that connects mothers to sons   a thread no Colonel and no Sanskrit ritual can sever.

**[rel_aai +3, sunday_decision: pending]**

---

## LOCATION: JM ROAD (NEW)

### NPC: BOOKSHOP EMPLOYEE   Crossword Browse

**[Trigger: Player visits jm_road, enters bookshop]**

The Crossword bookstore on JM Road is the kind of place that makes me wish I had unlimited money and unlimited shelf space. The CS section is small but curated   three racks of textbooks, reference guides, and the occasional gem that doesn't belong in a mainstream bookshop.

The employee   a young guy, maybe twenty-three, kurta and jeans, the specific energy of a literature postgrad working retail   sees me browsing the algorithm section.

"Looking for something specific?"

"Data structures. Something good. Not Cormen   I have Cormen. Something... different."

"Skiena? Algorithm Design Manual?"

"Maybe." I pick it up. Flip through. The problem-solving approach is practical   less theoretical than Cormen, more opinionated. Kavya would like this. The thought arrives before I can stop it   *Kavya would like this*   because some part of me has already internalized that tomorrow, someone else will be attending my classes and carrying my books.

"₹650," the employee says. "Student discount   ₹550."

I buy it. The book is heavy in my backpack   a physical weight of potential, of knowledge that might pass through hands I haven't met yet.

**[money -₹550, item: cs_reference_book (Skiena), +1 coding_skill]**

---

## END   ARJUN NPC/SIDE QUEST CONTENT DAY 2

### Summary   Day 2 Arjun NPCs:
```
MAIN NPCs:
- Rohit: 3 interactions (morning radar, choice scene, outfit advice)
- Nikhil: 2 interactions (canteen question, ICPC proposal)
- Prof. Desai: 1 interaction (OS lecture, asymmetry insight)

NEW NPCs:
- Kulkarni Uncle (General Store): 1 interaction (temple info)
- Gym Trainer Vikram: 1 interaction (boxing scene)
- Temple Priest: 1 interaction (cryptic wisdom, layout scout)
- Auto Driver Sanjay: 1 interaction (tapri, perspective on privilege)
- Bookshop Employee (JM Road): 1 interaction (Skiena purchase)

RETURNING NPCs:
- Raju Bhaiya: 1 interaction (phone follow-up, free chai)
- Panwala Bhau: available (gossip update)
- Fruit Vendor Tai: available (mood radar)

PHONE NPCs:
- Aai (Sunita): 1 call (Sunday confirmation, emotional radar)
- Pooja: 1 WhatsApp exchange (detective work, formula doubt)
- Nikhil: 1 WhatsApp (ICPC registration reminder)
- CSE Group: background (OS assignment notification)

TOTAL UNIQUE NPCs: 14
SIDE QUESTS AVAILABLE: 8
CHOICES: 2 (Tell Rohit, Outfit)
NEW LOCATIONS ACCESSED: General Store, Gym, Pataleshwar Temple, JM Road
```
