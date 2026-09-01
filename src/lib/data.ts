/**
 * Mock data for Cropwise.
 * Photography: openly licensed images (Flickr CC / Wikimedia Commons) referenced by URL.
 */

export const img = {
  hero: "https://live.staticflickr.com/2488/3934925003_b0134aea2e_b.jpg",
  rooftop: "https://live.staticflickr.com/3218/2675179709_ef0ea2e1af_b.jpg",
  balcony:
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/Condominium_balcony_container_gardening_at_night.jpg",
  community:
    "https://upload.wikimedia.org/wikipedia/commons/5/59/Parkdale_Community_garden_volunteer_day.JPG",
  harvest: "https://live.staticflickr.com/3469/3956766930_fbac78a5ff_b.jpg",
  market: "https://live.staticflickr.com/5076/5894223386_13742dd796_b.jpg",
  watering: "https://live.staticflickr.com/4293/35630957290_bfc5d5df7f_b.jpg",
  seedling: "https://live.staticflickr.com/3428/3383000639_036204dfd3_b.jpg",
  greenhouse: "https://live.staticflickr.com/3108/3962730549_a8bdeedf84_b.jpg",
  compost: "https://live.staticflickr.com/5195/14264819172_2b2390a56f_b.jpg",
  wateringcan: "https://live.staticflickr.com/8849/29001407425_f0054c2369_b.jpg",
  seeds: "https://live.staticflickr.com/3088/2316549713_6df79c72b7_b.jpg",
  pots: "https://live.staticflickr.com/7090/6904711304_f28c6228db_b.jpg",
  gloves: "https://live.staticflickr.com/3950/33639520876_8b275774b9_b.jpg",
  planter: "https://live.staticflickr.com/2466/3618264594_749e844348_b.jpg",
  tools: "https://live.staticflickr.com/5094/5543062417_205309e1cf_b.jpg",
  tomato: "https://live.staticflickr.com/5276/5843173257_3134da672b_b.jpg",
  basil: "https://upload.wikimedia.org/wikipedia/commons/0/02/Holy_Basil_plant_leaves.jpg",
  lettuce: "https://live.staticflickr.com/3186/2833923675_87aee92e4b_b.jpg",
  mint: "https://live.staticflickr.com/3365/3570433046_72ab10523f.jpg",
  radish: "https://live.staticflickr.com/7277/7553779764_820730c62b_b.jpg",
  strawberry: "https://live.staticflickr.com/4068/4546283175_f92e142628_b.jpg",
  chili: "https://live.staticflickr.com/3073/3772582578_316870ff75_b.jpg",
  spinach: "https://live.staticflickr.com/5302/5645145906_eaaff60976.jpg",
  kale: "https://live.staticflickr.com/3048/2285020360_f460c4007a_b.jpg",
  carrot: "https://live.staticflickr.com/3283/2856386711_5b3a891417_b.jpg",
  cucumber: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Cucumber_plants_growing.jpg",
  pepper: "https://live.staticflickr.com/5348/10010944924_671fb51fe1_b.jpg",
  cilantro: "https://live.staticflickr.com/2474/3701990549_f5cbd8a702_b.jpg",
  rosemary: "https://live.staticflickr.com/2170/2327589164_59d0024d27.jpg",
  thyme: "https://live.staticflickr.com/2455/3642842259_810c785de8_b.jpg",
  arugula: "https://live.staticflickr.com/2268/2175095132_178c01e702_b.jpg",
};

export type Health = "attention" | "harvest" | "well";

export type Stage = {
  name: string;
  days: string;
  note: string;
};

export type Plant = {
  slug: string;
  name: string;
  variety: string;
  emoji: string;
  image: string;
  family: string;
  difficulty: "Easy" | "Moderate" | "Advanced";
  sun: string;
  water: string;
  spacing: string;
  daysToHarvest: number;
  containerDepth: string;
  companions: string[];
  progress: number;
  health: Health;
  currentStage: string;
  plantedOn: string;
  location: string;
  summary: string;
  stages: Stage[];
  tips: string[];
};

export const plants: Plant[] = [
  {
    slug: "cherry-tomato",
    name: "Cherry tomato",
    variety: "Sungold",
    emoji: "🍅",
    image: img.tomato,
    family: "Nightshade",
    difficulty: "Moderate",
    sun: "6–8 h direct",
    water: "Deep, every 2 days",
    spacing: "45 cm",
    daysToHarvest: 68,
    containerDepth: "30 cm / 12 in",
    companions: ["Basil", "Marigold", "Lettuce"],
    progress: 74,
    health: "attention",
    currentStage: "Fruiting",
    plantedOn: "2026-06-24",
    location: "Rooftop garden · bed A",
    summary:
      "A vigorous vining tomato that thrives in containers with a sturdy stake. Sungold rewards consistent watering with sweet, thin-skinned fruit all season.",
    stages: [
      { name: "Sowing", days: "Day 0–7", note: "Sow 5 mm deep in warm, damp mix." },
      { name: "Seedling", days: "Day 7–21", note: "True leaves appear; thin to strongest." },
      { name: "Vegetative", days: "Day 21–42", note: "Stake early and pinch side shoots." },
      { name: "Flowering", days: "Day 42–55", note: "Shake trusses gently to help pollination." },
      { name: "Fruiting", days: "Day 55–68", note: "Feed weekly with potassium-rich tonic." },
      { name: "Harvest", days: "Day 68+", note: "Pick when fully coloured and slightly soft." },
    ],
    tips: [
      "Water at soil level in the morning to keep leaves dry.",
      "Yellowing lower leaves usually mean it is hungry, not sick.",
      "Never refrigerate — flavour flattens below 12°C.",
    ],
  },
  {
    slug: "genovese-basil",
    name: "Basil",
    variety: "Genovese",
    emoji: "🌿",
    image: img.basil,
    family: "Mint",
    difficulty: "Easy",
    sun: "5–7 h direct",
    water: "Light, daily",
    spacing: "20 cm",
    daysToHarvest: 40,
    containerDepth: "20 cm / 8 in",
    companions: ["Tomato", "Pepper", "Oregano"],
    progress: 92,
    health: "harvest",
    currentStage: "Harvest",
    plantedOn: "2026-07-05",
    location: "Rooftop garden · bed A",
    summary:
      "The classic partner crop for tomatoes. Pinch the top set of leaves often and basil answers with bushier, sweeter growth for months.",
    stages: [
      { name: "Sowing", days: "Day 0–6", note: "Surface sow, keep humid and 20°C+." },
      { name: "Seedling", days: "Day 6–16", note: "Bright light stops it stretching." },
      { name: "Vegetative", days: "Day 16–32", note: "Pinch above the second leaf pair." },
      { name: "Harvest", days: "Day 32+", note: "Cut stems, never strip single leaves." },
      { name: "Bolting", days: "Day 70+", note: "Remove flower spikes to extend the crop." },
    ],
    tips: [
      "Harvest in the morning when oils are strongest.",
      "Keep cut stems in water on the counter, not the fridge.",
      "One plant per 20 cm pot — basil hates crowding.",
    ],
  },
  {
    slug: "butterhead-lettuce",
    name: "Lettuce",
    variety: "Butterhead",
    emoji: "🥬",
    image: img.lettuce,
    family: "Aster",
    difficulty: "Easy",
    sun: "4–6 h, part shade ok",
    water: "Even moisture",
    spacing: "25 cm",
    daysToHarvest: 52,
    containerDepth: "15 cm / 6 in",
    companions: ["Radish", "Carrot", "Chives"],
    progress: 58,
    health: "well",
    currentStage: "Vegetative",
    plantedOn: "2026-07-18",
    location: "Rooftop garden · bed B",
    summary:
      "Shallow-rooted and fast, lettuce is the best return per square foot in a small space. Sow a short row every two weeks for a rolling supply.",
    stages: [
      { name: "Sowing", days: "Day 0–5", note: "Barely cover; light aids germination." },
      { name: "Seedling", days: "Day 5–15", note: "Thin to 25 cm to avoid soft rot." },
      { name: "Vegetative", days: "Day 15–45", note: "Shade cloth above 28°C." },
      { name: "Harvest", days: "Day 45+", note: "Cut the whole head or outer leaves." },
    ],
    tips: [
      "Bitter leaves mean heat stress — move to afternoon shade.",
      "Slugs travel at night; a copper ring on the pot helps.",
      "Water little and often, never let it dry out fully.",
    ],
  },
  {
    slug: "mint",
    name: "Mint",
    variety: "Moroccan",
    emoji: "🌱",
    image: img.mint,
    family: "Mint",
    difficulty: "Easy",
    sun: "3–6 h, tolerant",
    water: "Keep damp",
    spacing: "Own pot",
    daysToHarvest: 35,
    containerDepth: "20 cm / 8 in",
    companions: ["Grow alone"],
    progress: 100,
    health: "harvest",
    currentStage: "Harvest",
    plantedOn: "2026-05-02",
    location: "Balcony rail",
    summary:
      "Unkillable and invasive — always give mint its own container. In return you get tea, dressings and mojitos from spring to frost.",
    stages: [
      { name: "Establish", days: "Week 1–3", note: "Root cuttings in water, then pot." },
      { name: "Spreading", days: "Week 3–6", note: "Runners fill the pot fast." },
      { name: "Harvest", days: "Week 6+", note: "Cut back by a third to refresh." },
    ],
    tips: [
      "Divide the root ball every spring or it chokes itself.",
      "Never plant into a shared bed.",
      "Cut flower buds off for softer leaves.",
    ],
  },
  {
    slug: "radish",
    name: "Radish",
    variety: "French Breakfast",
    emoji: "🥕",
    image: img.radish,
    family: "Brassica",
    difficulty: "Easy",
    sun: "5–6 h direct",
    water: "Steady, never soggy",
    spacing: "5 cm",
    daysToHarvest: 26,
    containerDepth: "15 cm / 6 in",
    companions: ["Lettuce", "Spinach", "Cucumber"],
    progress: 41,
    health: "well",
    currentStage: "Root swell",
    plantedOn: "2026-08-14",
    location: "Rooftop garden · bed B",
    summary:
      "The fastest confidence builder in gardening: seed to plate in under four weeks, even in a shallow window box.",
    stages: [
      { name: "Sowing", days: "Day 0–4", note: "1 cm deep, 5 cm apart." },
      { name: "Seedling", days: "Day 4–10", note: "Thin ruthlessly for round roots." },
      { name: "Root swell", days: "Day 10–24", note: "Consistent water stops splitting." },
      { name: "Harvest", days: "Day 24+", note: "Pull at thumb width; woody if late." },
    ],
    tips: [
      "All leaf and no root means too much nitrogen.",
      "Sow a pinch every 10 days instead of one big batch.",
      "Leaves are edible — great in a quick soup.",
    ],
  },
  {
    slug: "strawberry",
    name: "Strawberry",
    variety: "Everbearing",
    emoji: "🍓",
    image: img.strawberry,
    family: "Rose",
    difficulty: "Moderate",
    sun: "6–8 h direct",
    water: "Morning, at base",
    spacing: "30 cm",
    daysToHarvest: 90,
    containerDepth: "25 cm / 10 in",
    companions: ["Borage", "Spinach", "Thyme"],
    progress: 33,
    health: "well",
    currentStage: "Flowering",
    plantedOn: "2026-06-01",
    location: "Balcony rail",
    summary:
      "Perfect for hanging baskets where the fruit stays off the soil. Everbearing types give two to three flushes each season.",
    stages: [
      { name: "Planting", days: "Week 1–2", note: "Crown level with the soil surface." },
      { name: "Leafing", days: "Week 2–6", note: "Remove early runners." },
      { name: "Flowering", days: "Week 6–10", note: "Protect blossoms from cold snaps." },
      { name: "Fruiting", days: "Week 10–14", note: "Net against birds." },
    ],
    tips: [
      "Pinch the first flowers on new plants for stronger roots.",
      "Mulch with straw to keep berries clean.",
      "Replace crowns every three years.",
    ],
  },
];

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: "Seeds" | "Soil & feed" | "Tools" | "Containers" | "Kits";
  price: number;
  compareAt?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: "seed-starter-six",
    name: "Small-space seed library",
    tagline: "Six balcony-proof varieties in resealable foil",
    category: "Seeds",
    price: 18,
    compareAt: 24,
    image: img.seeds,
    rating: 4.8,
    reviews: 412,
    badge: "Bestseller",
    details: [
      "Cherry tomato, basil, butterhead lettuce, radish, arugula, mint",
      "Open-pollinated, untreated seed",
      "Sowing calendar card included",
    ],
  },
  {
    id: "living-soil-12l",
    name: "Living container mix · 12 L",
    tagline: "Peat-free blend with worm castings",
    category: "Soil & feed",
    price: 14,
    image: img.compost,
    rating: 4.7,
    reviews: 233,
    details: ["Coir, bark fines, pumice, castings", "Holds water without going anaerobic", "pH 6.2–6.8"],
  },
  {
    id: "brass-can",
    name: "Long-spout watering can",
    tagline: "Reaches the back of a crowded balcony",
    category: "Tools",
    price: 39,
    image: img.wateringcan,
    rating: 4.9,
    reviews: 178,
    badge: "Editor's pick",
    details: ["1.7 L powder-coated steel", "Removable rose head", "Balanced when full"],
  },
  {
    id: "terracotta-trio",
    name: "Terracotta pot trio",
    tagline: "Breathable clay in three nesting sizes",
    category: "Containers",
    price: 32,
    image: img.pots,
    rating: 4.6,
    reviews: 96,
    details: ["14 / 18 / 22 cm diameter", "Drainage hole and saucer", "Frost resistant"],
  },
  {
    id: "hand-tool-set",
    name: "Three-piece hand tool set",
    tagline: "Trowel, fork and transplanter",
    category: "Tools",
    price: 28,
    image: img.tools,
    rating: 4.5,
    reviews: 141,
    details: ["Stainless heads, ash handles", "Depth markings on trowel", "Hanging leather loop"],
  },
  {
    id: "raised-planter",
    name: "Cedar rail planter",
    tagline: "Fits standard balcony railings",
    category: "Containers",
    price: 89,
    compareAt: 110,
    image: img.planter,
    rating: 4.7,
    reviews: 64,
    details: ["90 × 25 × 25 cm untreated cedar", "Self-watering reservoir", "Tool-free assembly"],
  },
  {
    id: "grow-gloves",
    name: "Coated grip gloves",
    tagline: "Repotting without the mess",
    category: "Tools",
    price: 12,
    image: img.gloves,
    rating: 4.4,
    reviews: 302,
    details: ["Breathable knit back", "Nitrile palm coating", "Machine washable"],
  },
  {
    id: "first-harvest-kit",
    name: "First harvest starter kit",
    tagline: "Everything for one balcony bed",
    category: "Kits",
    price: 74,
    compareAt: 96,
    image: img.seedling,
    rating: 4.9,
    reviews: 87,
    badge: "Beginner friendly",
    details: [
      "Seed library, 12 L mix, 3 fabric pots",
      "Seedling tray with humidity dome",
      "Printed 8-week care plan",
    ],
  },
];

export type Task = {
  id: string;
  title: string;
  plant: string;
  where: string;
  minutes: number;
  kind: "water" | "inspect" | "harvest" | "feed" | "prune" | "sow";
  day: number;
  done?: boolean;
};

export const tasks: Task[] = [
  { id: "t1", title: "Water tomato & basil", plant: "Cherry tomato", where: "Bed A", minutes: 10, kind: "water", day: 1 },
  { id: "t2", title: "Check lettuce for pests", plant: "Lettuce", where: "Bed B", minutes: 5, kind: "inspect", day: 1 },
  { id: "t3", title: "Harvest basil leaves", plant: "Basil", where: "Bed A", minutes: 15, kind: "harvest", day: 1 },
  { id: "t4", title: "Feed tomatoes", plant: "Cherry tomato", where: "Bed A", minutes: 8, kind: "feed", day: 2 },
  { id: "t5", title: "Thin radish row", plant: "Radish", where: "Bed B", minutes: 12, kind: "prune", day: 3 },
  { id: "t6", title: "Sow second lettuce row", plant: "Lettuce", where: "Bed B", minutes: 15, kind: "sow", day: 4 },
  { id: "t7", title: "Water everything deeply", plant: "All beds", where: "Rooftop", minutes: 20, kind: "water", day: 4 },
  { id: "t8", title: "Net strawberries", plant: "Strawberry", where: "Balcony", minutes: 10, kind: "inspect", day: 5 },
  { id: "t9", title: "Cut mint back by a third", plant: "Mint", where: "Balcony", minutes: 6, kind: "prune", day: 6 },
  { id: "t10", title: "Harvest first radishes", plant: "Radish", where: "Bed B", minutes: 10, kind: "harvest", day: 9 },
  { id: "t11", title: "Top up mulch", plant: "All beds", where: "Rooftop", minutes: 25, kind: "feed", day: 11 },
  { id: "t12", title: "Sow autumn spinach", plant: "Spinach", where: "Bed A", minutes: 15, kind: "sow", day: 14 },
  { id: "t13", title: "Water balcony pots", plant: "Mint, strawberry", where: "Balcony", minutes: 8, kind: "water", day: 16 },
  { id: "t14", title: "Prune tomato side shoots", plant: "Cherry tomato", where: "Bed A", minutes: 12, kind: "prune", day: 18 },
  { id: "t15", title: "Harvest lettuce heads", plant: "Lettuce", where: "Bed B", minutes: 14, kind: "harvest", day: 22 },
  { id: "t16", title: "Check drainage after rain", plant: "All beds", where: "Rooftop", minutes: 10, kind: "inspect", day: 25 },
];

export type PlotCell = {
  id: string;
  plant: string;
  emoji: string;
  health: Health;
  col: number;
  row: number;
  w: number;
  h: number;
};

export type Plot = {
  id: string;
  name: string;
  size: string;
  light: string;
  status: "Active" | "Resting";
  image: string;
  cells: PlotCell[];
};

export const plots: Plot[] = [
  {
    id: "rooftop",
    name: "Rooftop garden",
    size: "12 ft × 8 ft",
    light: "Full sun, wind exposed",
    status: "Active",
    image: img.rooftop,
    cells: [
      { id: "c1", plant: "Cherry tomato", emoji: "🍅", health: "attention", col: 1, row: 1, w: 2, h: 2 },
      { id: "c2", plant: "Lettuce", emoji: "🥬", health: "well", col: 5, row: 1, w: 2, h: 2 },
      { id: "c3", plant: "Basil", emoji: "🌿", health: "harvest", col: 3, row: 2, w: 2, h: 2 },
      { id: "c4", plant: "Radish", emoji: "🥕", health: "well", col: 1, row: 4, w: 2, h: 1 },
      { id: "c5", plant: "Mint", emoji: "🌱", health: "harvest", col: 4, row: 4, w: 1, h: 1 },
    ],
  },
  {
    id: "balcony",
    name: "Balcony rail",
    size: "6 ft × 2 ft",
    light: "Morning sun",
    status: "Active",
    image: img.balcony,
    cells: [
      { id: "b1", plant: "Strawberry", emoji: "🍓", health: "well", col: 1, row: 1, w: 2, h: 2 },
      { id: "b2", plant: "Mint", emoji: "🌱", health: "harvest", col: 4, row: 1, w: 1, h: 2 },
      { id: "b3", plant: "Thyme", emoji: "🌾", health: "well", col: 6, row: 2, w: 1, h: 1 },
    ],
  },
  {
    id: "windowsill",
    name: "Kitchen windowsill",
    size: "3 ft × 1 ft",
    light: "Bright indirect",
    status: "Resting",
    image: img.greenhouse,
    cells: [{ id: "w1", plant: "Cilantro", emoji: "🌿", health: "attention", col: 2, row: 2, w: 2, h: 1 }],
  },
];

export type Post = {
  id: string;
  author: string;
  initials: string;
  handle: string;
  time: string;
  neighbourhood: string;
  body: string;
  image?: string;
  likes: number;
  replies: number;
  tag: "Harvest" | "Question" | "Swap" | "Tip";
};

export const posts: Post[] = [
  {
    id: "p1",
    author: "Jamie Reyes",
    initials: "JR",
    handle: "@jamiegrows",
    time: "2h ago",
    neighbourhood: "Alberta Arts",
    body: "First harvest from my balcony tomatoes! Small space, big joy. Four pots, one railing, zero regrets.",
    image: img.harvest,
    likes: 128,
    replies: 14,
    tag: "Harvest",
  },
  {
    id: "p2",
    author: "Sam Nakamura",
    initials: "SN",
    handle: "@samsprouts",
    time: "5h ago",
    neighbourhood: "Hawthorne",
    body: "Does anyone have tips for keeping herbs happy indoors through October? My basil sulks the second it drops below 15°C.",
    likes: 41,
    replies: 8,
    tag: "Question",
  },
  {
    id: "p3",
    author: "Priya Menon",
    initials: "PM",
    handle: "@priyaplots",
    time: "8h ago",
    neighbourhood: "Sellwood",
    body: "Swapping surplus radish seed for anything brassica. Porch pickup on Sunday, bring a jar.",
    image: img.market,
    likes: 76,
    replies: 22,
    tag: "Swap",
  },
  {
    id: "p4",
    author: "Dee Okafor",
    initials: "DO",
    handle: "@deeurbanfarm",
    time: "1d ago",
    neighbourhood: "Kenton",
    body: "Reminder for wind-exposed rooftops: stake before the plant needs it. I lost a whole tomato truss learning this.",
    image: img.rooftop,
    likes: 203,
    replies: 31,
    tag: "Tip",
  },
  {
    id: "p5",
    author: "Mira Castillo",
    initials: "MC",
    handle: "@mira.grows",
    time: "1d ago",
    neighbourhood: "St. Johns",
    body: "Community bed 7 is officially all greens for autumn. Volunteer watering slots are open on the shared calendar.",
    image: img.community,
    likes: 88,
    replies: 12,
    tag: "Harvest",
  },
  {
    id: "p6",
    author: "Tobias Lund",
    initials: "TL",
    handle: "@tobygarden",
    time: "2d ago",
    neighbourhood: "Buckman",
    body: "Watering at 6am instead of 6pm cut my mildew problem in half. Simple change, huge difference.",
    image: img.watering,
    likes: 154,
    replies: 19,
    tag: "Tip",
  },
];

export const guides = [
  {
    slug: "square-foot-balcony",
    title: "Square-foot planning for a 2 ft rail",
    minutes: 6,
    level: "Beginner",
    image: img.balcony,
    excerpt: "How to fit five crops on a railing without shading each other out.",
  },
  {
    slug: "watering-rhythm",
    title: "Build a watering rhythm you'll actually keep",
    minutes: 8,
    level: "Beginner",
    image: img.watering,
    excerpt: "Finger-test, drainage checks and the two-day rule for container soil.",
  },
  {
    slug: "harvest-windows",
    title: "Reading harvest windows by stage, not date",
    minutes: 7,
    level: "Intermediate",
    image: img.harvest,
    excerpt: "The visual cues that beat any calendar reminder for peak flavour.",
  },
  {
    slug: "wind-on-rooftops",
    title: "Taming wind on an exposed rooftop",
    minutes: 5,
    level: "Intermediate",
    image: img.rooftop,
    excerpt: "Screens, staking and pot weighting for gardens above the treeline.",
  },
];

export const weather = {
  city: "Portland, OR",
  temp: 68,
  feels: 70,
  sky: "Clear skies",
  rain: 10,
  humidity: 48,
  wind: 6,
  forecast: [
    { day: "Tue", temp: 68, icon: "sun" },
    { day: "Wed", temp: 71, icon: "sun" },
    { day: "Thu", temp: 66, icon: "cloud" },
    { day: "Fri", temp: 62, icon: "rain" },
    { day: "Sat", temp: 65, icon: "cloud" },
  ],
};

export const growthSeries = [
  { week: "W1", height: 4, tasks: 3 },
  { week: "W2", height: 9, tasks: 5 },
  { week: "W3", height: 16, tasks: 4 },
  { week: "W4", height: 27, tasks: 6 },
  { week: "W5", height: 38, tasks: 5 },
  { week: "W6", height: 52, tasks: 7 },
  { week: "W7", height: 61, tasks: 6 },
  { week: "W8", height: 74, tasks: 8 },
];

export const healthLabel: Record<Health, string> = {
  attention: "Needs attention",
  harvest: "Ready to harvest",
  well: "Growing well",
};
