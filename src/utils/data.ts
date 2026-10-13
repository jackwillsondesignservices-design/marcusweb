import type { ImgKey } from "./images";

export const BUSINESS = {
  name: "Marcus Ridley",
  phone: "07943 310137",
  tel: "tel:07943310137",
  email: "marcus.j.ridley@outlook.com",
  whatsapp: "https://wa.me/447943310137",
  location: "Royal Leamington Spa, Warwickshire",
  hours: "Mon–Sat, 7am–9pm",
};

export type Programme = {
  id: "foundation" | "development" | "elite" | "one";
  stage: string;
  name: string;
  ages: string;
  spec: string;
  accent: "electric" | "gold" | "flare" | "slate";
  intro: string;
  bullets: string[];
  develops: { title: string; text: string }[];
  price: string;
  image: ImgKey;
};

export const PROGRAMMES: Programme[] = [
  {
    id: "foundation", stage: "Foundation", name: "Foundation Phase", ages: "U8–U11",
    spec: "Ages 8–11 · 2x weekly · 60 min sessions", accent: "electric",
    intro: "Where the love of the ball becomes the habit of mastery. High-touch, game-based sessions that build confident, two-footed players.",
    bullets: ["1,000+ ball touches every session", "Two-footed passing and receiving patterns", "1v1 courage — dribbling, feints and turns", "Coordination, balance and agility circuits", "Small-sided games with guided questioning", "Monthly progress card for parents"],
    develops: [
      { title: "Technical", text: "Close control, first touch, striking with both feet." },
      { title: "Tactical", text: "Scanning, finding space, basic width and depth." },
      { title: "Mental", text: "Confidence on the ball, resilience after mistakes." },
    ],
    price: "From £35/session", image: "coachKids",
  },
  {
    id: "development", stage: "Development", name: "Development Phase", ages: "U12–U14",
    spec: "Ages 12–14 · 2x weekly · 90 min sessions", accent: "gold",
    intro: "The years that decide trajectories. Position-specific work, tactical literacy and the physical base to compete at academy level.",
    bullets: ["Position-specific technical blocks", "Unit play — back four, midfield three, front line", "Speed, agility and injury-prevention work", "Video review of your own match footage", "Academy trial preparation and mindset coaching"],
    develops: [
      { title: "Technical", text: "Receiving on the half-turn, range of passing, finishing." },
      { title: "Tactical", text: "Pressing triggers, transitions, positional rotations." },
      { title: "Mental", text: "Decision-making under pressure, leadership habits." },
    ],
    price: "From £45/session", image: "matchAction",
  },
  {
    id: "elite", stage: "Elite", name: "Elite Pathway", ages: "U15–U18",
    spec: "Ages 15–18 · 3x weekly · 90 min sessions", accent: "flare",
    intro: "Built for players chasing scholarships, academy contracts and the step into senior football. Demanding, detailed, honest.",
    bullets: ["Individual development plan reviewed every 6 weeks", "Game-model training at professional intensity", "Strength, conditioning and recovery planning", "Highlight reel production and scout outreach", "Scholarship and college pathway guidance"],
    develops: [
      { title: "Technical", text: "Execution at match speed with minimal touches." },
      { title: "Tactical", text: "Reading the game two passes ahead, role mastery." },
      { title: "Mental", text: "Professional standards, self-review, composure." },
    ],
    price: "From £55/session", image: "duel",
  },
  {
    id: "one", stage: "1-to-1", name: "1-to-1 Coaching", ages: "All ages",
    spec: "All ages · Flexible · 60 min sessions", accent: "slate",
    intro: "Every minute is yours. A fully individual programme built around your position, your gaps and your goals — in person or online.",
    bullets: ["Bespoke session plan for every visit", "Online video analysis of your matches", "Position-specific finishing, defending or GK prep", "Weekly homework drills with feedback", "Direct WhatsApp line to Marcus"],
    develops: [
      { title: "Technical", text: "Targeted fixes to the details holding you back." },
      { title: "Tactical", text: "Role-specific understanding for your team's system." },
      { title: "Mental", text: "Goal-setting, routines and match-day preparation." },
    ],
    price: "From £60/session", image: "touch",
  },
];

export const STATS = [
  { value: 200, suffix: "+", label: "Players developed" },
  { value: 47, suffix: "", label: "Academy signings" },
  { value: 12, suffix: "", label: "Professional contracts" },
  { value: 10, suffix: "", label: "Years coaching" },
];

export const PLAYERS: { name: string; tag: string; quote: string; image: ImgKey }[] = [
  { name: "Jayden Okafor", tag: "Signed · Leicester City U16 · 2024", quote: "He taught me to scan before the ball arrives. That changed everything.", image: "player16" },
  { name: "Ellie Thompson", tag: "Signed · Aston Villa Women RTC · 2024", quote: "Every session had a purpose. I always knew why we were doing it.", image: "womenMatch" },
  { name: "Callum Reid", tag: "Scholarship · Coventry City · 2023", quote: "Marcus got me ready for the trial weeks before I even had one.", image: "volley" },
  { name: "Ravi Sandhu", tag: "Signed · Birmingham City U14 · 2024", quote: "My weak foot is now just my other foot.", image: "dribble" },
  { name: "Tom Hadley", tag: "Pro contract · Walsall FC · 2023", quote: "The detail in his feedback is at a professional level.", image: "indoor" },
  { name: "Noah Clarke", tag: "US College Scholarship · 2025", quote: "From Sunday league to a full scholarship in two seasons.", image: "goalBlur" },
  { name: "Mia Patel", tag: "Signed · West Brom Girls ETC · 2025", quote: "I stopped being scared of making mistakes on the ball.", image: "touch" },
  { name: "Leo Barnes", tag: "Signed · Northampton Town U15 · 2025", quote: "He sees things in your game nobody else notices.", image: "matchAction" },
];

export const CLUBS = ["Leicester City", "Coventry City", "Birmingham City", "Aston Villa", "Walsall", "West Brom", "Northampton Town", "Oxford United"];

export const TESTIMONIALS = [
  { quote: "Our son went from bench player to captain in one season. Marcus is honest, organised and genuinely cares about the person, not just the player.", name: "Sarah Okafor", role: "Parent of U14 player" },
  { quote: "The monthly progress reports are brilliant. As a parent I finally understand what my daughter is working on and why.", name: "David Thompson", role: "Parent of U13 player" },
  { quote: "The online analysis sessions are as useful as the pitch work. He breaks down every clip and gives me something to fix that week.", name: "Callum Reid", role: "Academy player · 2024" },
  { quote: "Professional from the first message. Clear pricing, clear plan, and our boy can't wait for Tuesdays.", name: "Priya Sandhu", role: "Parent of U12 player" },
];

export const CREDENTIALS = [
  { code: "UEFA-B", title: "UEFA B Licence", note: "The FA · Advanced coaching qualification" },
  { code: "FA-YTH", title: "FA Youth Award", note: "Modules 1–3 · Youth player development" },
  { code: "DBS-EN", title: "Enhanced DBS Checked", note: "Renewed annually · Update service" },
  { code: "FAW-01", title: "First Aid at Work", note: "Emergency first aid · Sports injury" },
  { code: "SFG-FA", title: "Safeguarding Certified", note: "FA Safeguarding Children" },
  { code: "INS-PL", title: "Fully Insured", note: "£5m public liability cover" },
];

export const FAQ = [
  { q: "What age do you coach?", a: "Players aged 8–18 across Foundation, Development and Elite phases. 1-to-1 coaching is available for any age, including adult players returning to the game." },
  { q: "Do you offer online sessions?", a: "Yes. Online video analysis and remote 1-to-1 sessions are available nationwide. You send match footage, I break it down and set a weekly development plan." },
  { q: "What qualifications do you have?", a: "UEFA B Licence, FA Youth Award, Enhanced DBS, First Aid at Work and FA Safeguarding certification. I'm fully insured with £5m public liability." },
  { q: "Where are sessions held?", a: "In-person sessions run at floodlit 3G and grass facilities around Royal Leamington Spa and Warwickshire. Exact venues are confirmed when you book." },
  { q: "How much do sessions cost?", a: "Group programmes start from £35 per session, 1-to-1 coaching from £60. Block bookings of 6 and 12 sessions are discounted." },
  { q: "Do you offer a free trial?", a: "Every new player starts with a free 30-minute assessment — online or in person, no obligation. You'll leave with a clear picture of strengths and next steps." },
];

export const WEEK = [
  { d: "Mon", t: "Session planning" },
  { d: "Tue", t: "Group training" },
  { d: "Wed", t: "1-to-1 sessions" },
  { d: "Thu", t: "Match analysis" },
  { d: "Fri", t: "Individual feedback" },
  { d: "Sat", t: "Matchday" },
  { d: "Sun", t: "Recovery" },
];
