// Comprehensive campus dataset for CampusCompass

export const CAMPUS_INFO = {
  name: "Apex Institute of Technology & Science",
  shortName: "AITS",
  motto: "Knowledge, Innovation & Excellence",
  established: 1984,
  campusArea: "120 Acres",
  studentCount: "8,500+",
  emergencyContact: "+91 98765 43210",
  securityGate: "+91 98765 43211",
  medicalCenter: "+91 98765 43212",
  wifiSsid: "CampusNet-Secure (5GHz)",
};

export const CAMPUS_SPOTS = [
  {
    id: "spot-1",
    name: "Central Library & Digital Commons",
    category: "library",
    location: "Central Quad, Building 3",
    zone: "Central Hub",
    timings: "8:00 AM - 11:00 PM (24/7 during exams)",
    description: "Multi-storey modern library with over 150,000 volumes, silent study cubicles, group discussion pods, and high-speed digital research terminals.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    amenities: ["High-speed Wi-Fi", "Air Conditioned", "Charging Ports", "Quiet Zone", "Printing Available"],
    seniorTip: "The 3rd floor corner desks near the west windows are dead silent and have dedicated power sockets for laptops.",
    rating: 4.9,
    reviewsCount: 342,
    visitorFriendly: true,
    coordinates: { x: 50, y: 45 },
  },
  {
    id: "spot-2",
    name: "Turing Tech Hub & AI Labs",
    category: "academic",
    location: "North Block, 2nd & 3rd Floors",
    zone: "North Tech Zone",
    timings: "8:30 AM - 8:00 PM",
    description: "Cutting-edge computer science complex featuring GPU clusters, robotics prototyping arena, IoT testing benches, and hackathon co-working spaces.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    amenities: ["Ethernet & Wi-Fi", "Dual Monitor Workstations", "Smart Whiteboards", "3D Printers"],
    seniorTip: "Students can request 24-hour lab access cards through their department head for hackathons and capstone projects.",
    rating: 4.8,
    reviewsCount: 215,
    visitorFriendly: true,
    coordinates: { x: 30, y: 25 },
  },
  {
    id: "spot-3",
    name: "Student Activity Center (SAC) & Amphitheater",
    category: "hangout",
    location: "Behind Central Garden, Next to Football Ground",
    zone: "Central Hub",
    timings: "6:00 AM - 10:00 PM",
    description: "The vibrant heart of student life. Features an open-air amphitheater for acoustic nights, club meeting rooms, music practice suites, and indoor games.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    amenities: ["Open Air Seating", "Acoustic Room", "Table Tennis", "Stage & Sound", "Vending Machines"],
    seniorTip: "Jam sessions happen every Friday around 6:00 PM on the amphitheater steps. Anyone can bring an instrument and join!",
    rating: 4.9,
    reviewsCount: 420,
    visitorFriendly: true,
    coordinates: { x: 55, y: 70 },
  },
  {
    id: "spot-4",
    name: "Olympic Sports Complex & Gymnasium",
    category: "sports",
    location: "South Campus, Near Gate 3",
    zone: "South Sports Hub",
    timings: "6:00 AM - 9:00 AM & 4:30 PM - 9:30 PM",
    description: "Full-sized floodlit football turf, synthetic basketball and tennis courts, 8-lane running track, badminton arena, and a multi-gym with trainer.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    amenities: ["Locker Rooms", "Showers", "Equipment Rental", "Floodlights", "Drinking Water Fountains"],
    seniorTip: "Gym membership is completely free with your college ID card, but register early in the semester to get peak-hour locker slots.",
    rating: 4.7,
    reviewsCount: 189,
    visitorFriendly: true,
    coordinates: { x: 75, y: 80 },
  },
  {
    id: "spot-5",
    name: "Administrative Building & Registrar Hall",
    category: "admin",
    location: "Main Entrance Quad, Building 1",
    zone: "Main Gate Zone",
    timings: "9:00 AM - 5:00 PM (Closed Sundays)",
    description: "Primary building for student identity cards, fee cashier, exam branch, scholarship desk, and guest reception.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    amenities: ["Token System Counter", "Waiting Lounge", "ATM (SBI & HDFC)", "Photocopy Counter"],
    seniorTip: "Window 4 is for new ID cards and bus passes. Go before 11:30 AM to beat the post-lunch verification queue.",
    rating: 4.2,
    reviewsCount: 160,
    visitorFriendly: true,
    coordinates: { x: 20, y: 60 },
  },
  {
    id: "spot-6",
    name: "The Green Canopy (Pine Grove)",
    category: "hangout",
    location: "Between Mechanical Block & Bio-Tech Annex",
    zone: "North Tech Zone",
    timings: "Open 24 Hours",
    description: "Shaded green stone benches surrounded by pine trees and flowering shrubs. The go-to spot for relaxing between grueling lectures.",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80",
    amenities: ["Natural Shade", "Stone Benches", "Solar Mobile Chargers", "Wi-Fi Coverage"],
    seniorTip: "Great place to catch up on assignments or grab a quick chat. It stays pleasantly cool even in hot afternoons.",
    rating: 4.8,
    reviewsCount: 310,
    visitorFriendly: true,
    coordinates: { x: 35, y: 40 },
  },
  {
    id: "spot-7",
    name: "Sir CV Raman Innovation & MakerSpace",
    category: "academic",
    location: "Ground Floor, Innovation Tower",
    zone: "North Tech Zone",
    timings: "9:00 AM - 9:00 PM",
    description: "Hardware prototyping center equipped with laser cutters, PCB milling machines, drone testing cage, and electronic parts dispensary.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    amenities: ["Soldering Stations", "Component Dispensary", "Safety Gear", "Expert Mentors"],
    seniorTip: "You get free raw material quotas if you're representing the college in national robotics or formula student competitions.",
    rating: 4.9,
    reviewsCount: 145,
    visitorFriendly: true,
    coordinates: { x: 40, y: 20 },
  },
  {
    id: "spot-8",
    name: "Campus Health & Wellness Center",
    category: "admin",
    location: "East Wing, Beside Hostel Block A",
    zone: "Residential Zone",
    timings: "24/7 (Emergency & Pharmacy available)",
    description: "Staffed by full-time resident physicians, registered nurses, with basic observation beds, emergency ambulance, and zero-cost standard medication.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    amenities: ["24/7 Ambulance", "Free Basic Medicine", "Counseling Cell", "First Aid Ward"],
    seniorTip: "Keep the health center's direct phone number saved in your emergency speed-dial: extension 108 from campus landlines.",
    rating: 4.6,
    reviewsCount: 98,
    visitorFriendly: false,
    coordinates: { x: 80, y: 35 },
  }
];

export const FOOD_SPOTS = [
  {
    id: "food-1",
    name: "Central Food Court (Mess & Canteen)",
    category: "canteen",
    location: "Ground Level, Student Center",
    timings: "7:30 AM - 9:30 PM",
    budget: "₹",
    dietary: "Veg & Non-Veg",
    currentRush: "Moderate",
    rating: 4.6,
    reviewsCount: 520,
    mustTry: [
      { name: "South Indian Thali / Masala Dosa", price: "₹60", tag: "Breakfast Hit" },
      { name: "Special Chole Bhature", price: "₹70", tag: "Lunch Favorite" },
      { name: "Filter Kaapi (Coffee)", price: "₹20", tag: "Daily Essential" }
    ],
    description: "The primary campus dining facility with 400+ seats, hygienic live counters, seasonal fruit juices, and wholesome daily meal combos.",
    seniorTip: "Rush hour peaks between 1:10 PM and 1:45 PM. Head there at 12:50 PM or after 2:00 PM for quick seating."
  },
  {
    id: "food-2",
    name: "Nescafe & Frankie Junction",
    category: "cafe",
    location: "Beside Tech Quad Garden",
    timings: "8:30 AM - 10:30 PM",
    budget: "₹₹",
    dietary: "Veg & Egg",
    currentRush: "Low",
    rating: 4.8,
    reviewsCount: 410,
    mustTry: [
      { name: "Hazelnut Iced Frappe", price: "₹65", tag: "Crowd Favorite" },
      { name: "Paneer Tikka Cheese Frankie", price: "₹75", tag: "Snack Legend" },
      { name: "Maggi with Butter & Veggies", price: "₹45", tag: "Exam Night Fuel" }
    ],
    description: "The coolest spot for quick coffee catchups, quick rolls between classes, and chilled beverages on warm afternoons.",
    seniorTip: "Ask bhaiya for 'crispy roti' with extra mint sauce when ordering the paneer frankie — you won't regret it."
  },
  {
    id: "food-3",
    name: "The Terrace Bistro & Bakery",
    category: "cafe",
    location: "2nd Floor, Management Block",
    timings: "10:00 AM - 8:00 PM",
    budget: "₹₹₹",
    dietary: "Veg & Non-Veg",
    currentRush: "Low",
    rating: 4.7,
    reviewsCount: 280,
    mustTry: [
      { name: "Grilled Chicken Pesto Panini", price: "₹130", tag: "Chef Special" },
      { name: "Belgian Chocolate Brownie with Ice Cream", price: "₹95", tag: "Sweet Tooth" },
      { name: "Mint Mojito Cooler", price: "₹70", tag: "Refreshing" }
    ],
    description: "Air-conditioned cafe with soft acoustic jazz, plush couches, gourmet sandwiches, pasta bowls, and artisan coffees.",
    seniorTip: "A prime spot if you have a group project meeting or want to treat visiting family members."
  },
  {
    id: "food-4",
    name: "Night Owls' Canteen (Hostel Quad)",
    category: "street",
    location: "Near Boys Hostel 3 & Girls Hostel 2 Gate",
    timings: "6:00 PM - 2:30 AM",
    budget: "₹",
    dietary: "Veg & Non-Veg",
    currentRush: "Busy at Night",
    rating: 4.9,
    reviewsCount: 650,
    mustTry: [
      { name: "Double Egg Cheese Burji Pav", price: "₹60", tag: "Night Legend" },
      { name: "Midnight Masala Chai (Kulhad)", price: "₹15", tag: "Warm Hug" },
      { name: "Peri Peri French Fries", price: "₹50", tag: "Crunchy" }
    ],
    description: "The lifeline of college nocturnal life. Open till 2:30 AM every night with steaming hot parathas, noodles, and cutting chai.",
    seniorTip: "During semester exams, order online via the campus delivery group chat to avoid standing in queue at midnight."
  },
  {
    id: "food-5",
    name: "Juice & Healthy Greens Bar",
    category: "cafe",
    location: "Next to Gymnasium / Sports Arena",
    timings: "7:00 AM - 8:00 PM",
    budget: "₹₹",
    dietary: "100% Pure Veg",
    currentRush: "Low",
    rating: 4.7,
    reviewsCount: 195,
    mustTry: [
      { name: "Pre-Workout Peanut Butter Banana Shake", price: "₹70", tag: "Gym Essential" },
      { name: "Fresh Watermelon & Mint Cold Press", price: "₹50", tag: "Hydration" },
      { name: "Sprouts & Sweet Corn Chaat", price: "₹45", tag: "Clean Eats" }
    ],
    description: "Freshly squeezed juices without artificial sugar, high-protein shakes, fruit bowls, and wholesome healthy breakfast bites.",
    seniorTip: "Post-workout special: show your sports kit or gym card for an extra protein boost in smoothies."
  }
];

export const CLUBS_DATA = [
  {
    id: "club-1",
    name: "ByteCraft - Coding & Open Source Society",
    category: "technical",
    lead: "Aarav Sharma & Priya Sen",
    members: "450+ Active Members",
    tagline: "Build, Hack, Ship, Repeat",
    icon: "Code2",
    description: "The premier software engineering club. Organizes national hackathons, weekly LeetCode grinds, open-source sprints, and hands-on workshops on AI & Web3.",
    upcomingEvent: {
      name: "HackAITS 2026 - 36hr National Hackathon",
      date: "Nov 28-29, 2026",
      venue: "Turing Tech Hub",
      prize: "₹1,50,000 Prize Pool"
    },
    howToJoin: "Recruitments open every August and January with a fun beginner coding quiz and mini project submission.",
    instagram: "@bytecraft_aits",
    discord: "discord.gg/bytecraft-aits"
  },
  {
    id: "club-2",
    name: "RoboVanguard - Robotics & Autonomous Systems",
    category: "technical",
    lead: "Vikram Rathore",
    members: "180+ Members",
    tagline: "Bridging Hardware & Intelligence",
    icon: "Cpu",
    description: "Designers of combat robots, autonomous drones, Mars rover prototypes, and line-follower bots competing in international Robocons.",
    upcomingEvent: {
      name: "RoboWars & Drone Obstacle Derby",
      date: "Dec 12, 2026",
      venue: "Sports Complex Arena",
      prize: "Trophies & Component Kits"
    },
    howToJoin: "Beginners welcome! Join our 2-week hands-on Arduino and 3D modeling bootcamp.",
    instagram: "@robovanguard_aits",
    discord: "discord.gg/robovanguard"
  },
  {
    id: "club-3",
    name: "Dhwani - Music & Performing Arts",
    category: "cultural",
    lead: "Ananya Deshmukh",
    members: "230+ Members",
    tagline: "Every Soul Has a Melody",
    icon: "Music",
    description: "Home to the college rock band, classical fusion ensemble, beatboxers, and vocalists. Headline performers at all major campus festivals.",
    upcomingEvent: {
      name: "Acoustic Sunset Unplugged",
      date: "Nov 20, 2026",
      venue: "Amphitheater",
      prize: "Open Mic & Showcase"
    },
    howToJoin: "Auditions happen on amphitheater steps during the 3rd week of September.",
    instagram: "@dhwani_music_aits",
    discord: "dhwani@aits.edu"
  },
  {
    id: "club-4",
    name: "Shutterbugs - Photography & Film Society",
    category: "arts",
    lead: "Rohan Kapoor",
    members: "150+ Members",
    tagline: "Freezing Campus Memories in Frames",
    icon: "Camera",
    description: "Captures campus life, shoots short films, covers fests, and hosts photo walks across historic spots in the city.",
    upcomingEvent: {
      name: "Campus Golden Hour Photo Walk",
      date: "Nov 15, 2026",
      venue: "Pine Grove & Clock Tower",
      prize: "Exhibition Feature"
    },
    howToJoin: "Submit a 3-photo portfolio (mobile photography is totally valid!).",
    instagram: "@shutterbugs_aits",
    discord: "photography@aits.edu"
  },
  {
    id: "club-5",
    name: "E-Cell (Entrepreneurship Cell)",
    category: "entrepreneurship",
    lead: "Tanvi Roy",
    members: "320+ Members",
    tagline: "Igniting Student Startups",
    icon: "Rocket",
    description: "Incubating student ventures, hosting Shark Tank style pitch events, speaker sessions with founder alumni, and angel investor networking.",
    upcomingEvent: {
      name: "Campus Pitch Tank Season 4",
      date: "Dec 05, 2026",
      venue: "Auditorium Main",
      prize: "₹50,000 Seed Grants"
    },
    howToJoin: "Applications open for outreach, marketing, and tech team leads twice a year.",
    instagram: "@ecell_aits",
    discord: "ecell@aits.edu"
  },
  {
    id: "club-6",
    name: "Spartans - Outdoor & Adventure Sports",
    category: "sports",
    lead: "Devendra Patel",
    members: "200+ Members",
    tagline: "Pushing Physical Frontiers",
    icon: "Trophy",
    description: "Organizes weekend cycling expeditions, mountain trekking, intra-college cricket leagues, and marathon training runs.",
    upcomingEvent: {
      name: "5K Campus Sunrise Run",
      date: "Nov 22, 2026",
      venue: "Sports Complex Gate",
      prize: "Finisher Medals & Refreshments"
    },
    howToJoin: "Direct walk-in registration at the sports complex counter.",
    instagram: "@spartans_aits",
    discord: "sports@aits.edu"
  }
];

export const SURVIVAL_GUIDE = [
  {
    id: "faq-1",
    question: "How do I connect to Campus Wi-Fi?",
    category: "Tech & IT",
    answer: "Select the network 'CampusNet-Secure'. Open your browser and you'll be redirected to the captive portal. Enter your Roll Number as the username and your portal password. For laptops, install the college root SSL certificate from wifi.aits.edu for seamless reconnects without re-logging in every hour."
  },
  {
    id: "faq-2",
    question: "Where can I print notes and assignments at 50 paise / page?",
    category: "Academics",
    answer: "There are three primary Xerox/printing counters: 1) Basment of Central Library (fastest for bulk records), 2) Ground Floor of Mechanical Block near Nescafe, and 3) Next to Boys Hostel Gate 1 (open till 10 PM). You can send PDFs via WhatsApp to the shop's printer number to skip the queue."
  },
  {
    id: "faq-3",
    question: "How do I get my official Student ID Card and Bus Pass?",
    category: "Admin",
    answer: "Visit Administrative Block (Building 1), Counter 4. Bring your admission receipt, 2 passport-size photographs, and a valid photo ID. Verification takes 10 minutes and you receive your RFID-enabled student smartcard on the spot."
  },
  {
    id: "faq-4",
    question: "What are the hostel curfew hours and late-entry rules?",
    category: "Hostel Life",
    answer: "Standard in-time for first-year hostels is 9:30 PM on weekdays and 10:30 PM on weekends. For library night study (till 11 PM or 24/7 during exams), you can get a digital night-pass verified via the student ERP app."
  },
  {
    id: "faq-5",
    question: "What are the medical and emergency helplines?",
    category: "Safety",
    answer: "Campus Health Ward: Extension 108 or +91 98765 43212. Security Gate Main: +91 98765 43211. Anti-Ragging Helpline (24/7 confidential): 1800-180-5522. Resident Doctor is available on campus 24 hours a day with free first aid and ambulance services."
  },
  {
    id: "faq-6",
    question: "What is the attendance policy and how is it calculated?",
    category: "Academics",
    answer: "A minimum of 75% attendance is mandatory in each subject to appear for end-semester examinations. Medical leaves must be submitted within 3 days of resuming college to the respective HOD with an endorsement from the Campus Medical Officer."
  }
];

export const CURATED_TOURS = [
  {
    id: "tour-1",
    title: "Freshers' First Day Checklist (45 Mins)",
    target: "freshers",
    description: "The essential survival loop to get your ID, find your lecture halls, configure your Wi-Fi, and locate the best coffee.",
    stops: ["Administrative Building", "Central Library", "Turing Tech Hub", "Nescafe & Frankie Junction", "Central Food Court"]
  },
  {
    id: "tour-2",
    title: "Campus Visitor & Parents Highlights (60 Mins)",
    target: "visitors",
    description: "Scenic walk showcasing university heritage, modern innovation centers, lush pine groves, and peaceful campus eateries.",
    stops: ["Main Entrance Quad", "The Green Canopy", "Sir CV Raman Innovation Lab", "Central Library", "The Terrace Bistro"]
  },
  {
    id: "tour-3",
    title: "The Ultimate Foodie Crawl (Snacks & Chill)",
    target: "both",
    description: "Discover where students actually hang out, from signature cold coffees to hot evening snacks and fresh fruit coolers.",
    stops: ["Central Food Court", "Nescafe & Frankie Junction", "Juice & Healthy Greens Bar", "The Terrace Bistro", "Night Owls' Canteen"]
  }
];

export const SENIOR_AI_KNOWLEDGE = [
  {
    keywords: ["coffee", "cold coffee", "beverage", "tea", "chai"],
    reply: "For the absolute best cold coffee, head to Nescafe Junction near Tech Quad! Ask for the Hazelnut Iced Frappe (₹65). If you want traditional cutting chai, Central Food Court or Night Owls' Canteen (₹15) are unbeatable."
  },
  {
    keywords: ["quiet", "study", "exam", "reading", "peace", "focus"],
    reply: "The quietest spots are: 1) Central Library 3rd Floor west wing (dead silence with AC and power plugs), and 2) The Green Canopy stone benches early in the morning before 9 AM."
  },
  {
    keywords: ["wifi", "internet", "password", "network"],
    reply: "Connect to 'CampusNet-Secure'. Use your Roll Number and ERP student password to login. If you need uninterrupted 100 Mbps LAN, Turing Tech Hub Lab 4 has open Ethernet ports for student laptops."
  },
  {
    keywords: ["food", "lunch", "dinner", "eat", "canteen", "budget"],
    reply: "For a full budget meal under ₹60, get the South Indian Thali at Central Food Court. If it's midnight, head behind Hostel Block 3 to Night Owls' Canteen for hot Cheese Burji Pav."
  },
  {
    keywords: ["print", "xerox", "photocopy", "scanner"],
    reply: "Fastest printing is in the Central Library basement at 50 paise/page. For late-night emergency printing before submissions, the shop beside Boys Hostel Gate 1 stays open till 10:00 PM."
  },
  {
    keywords: ["club", "join", "activities", "hackathon"],
    reply: "We have 24+ clubs! If you code, check out ByteCraft (HackAITS hackathon is coming Nov 28!). If you love robotics, join RoboVanguard. For music and jamming, head to Dhwani at the Amphitheater on Friday evenings."
  },
  {
    keywords: ["gym", "sports", "football", "fitness"],
    reply: "The Olympic Sports Complex near Gate 3 has a free gym for all enrolled students. Morning slots are 6:00 AM - 9:00 AM, and evening slots are 4:30 PM - 9:30 PM. Show your college ID at the reception to get an entry pass."
  },
  {
    keywords: ["id", "id card", "admin", "pass"],
    reply: "To get your ID card or bus pass, go to Building 1 (Administrative Block), Window 4 between 9:30 AM and 11:30 AM. Bring 2 photos and your admission fee slip."
  }
];
