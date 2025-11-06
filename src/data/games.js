// src/data/games.js
// Mock Games Data

export const LYRICS_QUESTIONS = [
  {
    id: 1,
    song: 'Dynamite - BTS',
    lyric: "Cause I, I, I'm in the stars tonight, So watch me bring the ___ to life",
    options: ['fire', 'light', 'night', 'fight'],
    correctIndex: 0,
    difficulty: 'Easy',
  },
  {
    id: 2,
    song: 'How You Like That - BLACKPINK',
    lyric: "Now look at you, now look at me, Look at me, look at me now, ___",
    options: ['Hey!', 'Yeah!', 'Look!', 'Go!'],
    correctIndex: 0,
    difficulty: 'Medium',
  },
  {
    id: 3,
    song: 'Butter - BTS',
    lyric: "Smooth like ___, like a criminal undercover",
    options: ['sugar', 'butter', 'honey', 'water'],
    correctIndex: 1,
    difficulty: 'Easy',
  },
  {
    id: 4,
    song: 'Pink Venom - BLACKPINK',
    lyric: "Taste that pink venom, taste that pink venom, Get 'em, get 'em, ___",
    options: ['go!', 'yeah!', 'get', 'em!', 'now!'],
    correctIndex: 2,
    difficulty: 'Medium',
  },
  {
    id: 5,
    song: 'FANCY - TWICE',
    lyric: "I said ___, you caught my eye",
    options: ['fancy', 'baby', 'maybe', 'lately'],
    correctIndex: 0,
    difficulty: 'Easy',
  },
  {
    id: 6,
    song: 'God\'s Menu - Stray Kids',
    lyric: "Cookin' like a chef, I'm a 5-star ___",
    options: ['chef', 'Michelin', 'master', 'winner'],
    correctIndex: 1,
    difficulty: 'Hard',
  },
  {
    id: 7,
    song: 'Love Dive - IVE',
    lyric: "Narcissistic, my ___ likes me",
    options: ['heart', 'God', 'soul', 'mind'],
    correctIndex: 1,
    difficulty: 'Medium',
  },
  {
    id: 8,
    song: 'Wannabe - ITZY',
    lyric: "I wanna be ___, I wanna be me",
    options: ['myself', 'me', 'free', 'happy'],
    correctIndex: 1,
    difficulty: 'Easy',
  },
];

export const GAME_TYPES = [
  {
    id: 'lyrics',
    name: 'Complete the Lyrics',
    description: 'Fill in the missing words from popular KPOP songs',
    emoji: '🎵',
    pointsPerCorrect: 30,
    totalQuestions: 8,
    isLocked: false,
  },
  {
    id: 'guess-song',
    name: 'Guess the Song',
    description: 'Listen to audio clips and guess the song',
    emoji: '🎧',
    pointsPerCorrect: 40,
    totalQuestions: 10,
    isLocked: true,
  },
  {
    id: 'idol-quiz',
    name: 'Idol Trivia',
    description: 'Test your knowledge about KPOP idols',
    emoji: '⭐',
    pointsPerCorrect: 25,
    totalQuestions: 15,
    isLocked: true,
  },
  {
    id: 'mv-match',
    name: 'MV Screenshot Match',
    description: 'Match screenshots to the correct music video',
    emoji: '🎬',
    pointsPerCorrect: 35,
    totalQuestions: 12,
    isLocked: true,
  },
];

export default {
  LYRICS_QUESTIONS,
  GAME_TYPES,
};