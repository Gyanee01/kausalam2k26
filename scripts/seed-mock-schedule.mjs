import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const required = ['apiKey', 'authDomain', 'projectId', 'appId', 'databaseURL'];
for (const key of required) {
  if (!firebaseConfig[key]) {
    throw new Error(`Missing Firebase config: ${key}`);
  }
}

const mockSchedule = {
  mock_day1_0900_inauguration: {
    day: 'Day 1',
    time: '09:00 AM',
    title: 'Inauguration & Welcome Address',
    venue: 'Main Stage',
    type: 'Official',
  },
  mock_day1_1030_hackathon_kickoff: {
    day: 'Day 1',
    time: '10:30 AM',
    title: 'Hackathon Kickoff',
    venue: 'Computing Lab A',
    type: 'Technical',
  },
  mock_day1_1400_uiux_workshop: {
    day: 'Day 1',
    time: '02:00 PM',
    title: 'UI/UX Sprint Workshop',
    venue: 'Seminar Hall 1',
    type: 'Workshop',
  },
  mock_day1_1800_cultural_open_mic: {
    day: 'Day 1',
    time: '06:00 PM',
    title: 'Cultural Open Mic',
    venue: 'Open Amphitheatre',
    type: 'Cultural',
  },
  mock_day2_0930_coding_round2: {
    day: 'Day 2',
    time: '09:30 AM',
    title: 'Coding Challenge Round 2',
    venue: 'Lab Block B',
    type: 'Technical',
  },
  mock_day2_1200_robotics_arena: {
    day: 'Day 2',
    time: '12:00 PM',
    title: 'Robotics Arena Battles',
    venue: 'Arena 1',
    type: 'Technical',
  },
  mock_day2_1530_design_jam: {
    day: 'Day 2',
    time: '03:30 PM',
    title: 'Design Jam Finals',
    venue: 'Innovation Hub',
    type: 'Creative',
  },
  mock_day2_1900_pro_night: {
    day: 'Day 2',
    time: '07:00 PM',
    title: 'Pro Night',
    venue: 'Main Ground',
    type: 'Official',
  },
  mock_day3_1000_gaming_playoffs: {
    day: 'Day 3',
    time: '10:00 AM',
    title: 'E-Sports Playoffs',
    venue: 'Gaming Zone',
    type: 'Sports',
  },
  mock_day3_1230_fun_events: {
    day: 'Day 3',
    time: '12:30 PM',
    title: 'Treasure Trail & Fun Relay',
    venue: 'Central Lawn',
    type: 'Fun',
  },
  mock_day3_1600_valedictory: {
    day: 'Day 3',
    time: '04:00 PM',
    title: 'Valedictory & Prize Distribution',
    venue: 'Main Stage',
    type: 'Official',
  },
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log('Seeding mock schedule to /schedule ...');
await update(ref(db, 'schedule'), mockSchedule);
console.log(`Seeded ${Object.keys(mockSchedule).length} entries.`);
