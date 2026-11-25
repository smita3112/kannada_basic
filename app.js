const modeSelect = document.getElementById("modeSelect");
const languageSelect = document.getElementById("languageSelect");
const hindiSetSelect = document.getElementById("hindiSetSelect");
const hindiSetLabel = document.getElementById("hindiSetLabel");
const levelSelect = document.getElementById("levelSelect");
const itemCountSelect = document.getElementById("itemCount");
const learnTopicSelect = document.getElementById("learnTopicSelect");
const quizTopicSelect = document.getElementById("quizTopicSelect");
const newRoundBtn = document.getElementById("newRoundBtn");
const nextSetBtn = document.getElementById("nextSetBtn");
const restartLearnBtn = document.getElementById("restartLearnBtn");
const quizNextBtn = document.getElementById("quizNextBtn");
const soundColumn = document.getElementById("soundColumn");
const scriptColumn = document.getElementById("scriptColumn");
const statusText = document.getElementById("statusText");
const scoreText = document.getElementById("scoreText");
const streakText = document.getElementById("streakText");
const gameProgressText = document.getElementById("gameProgressText");
const board = document.querySelector(".board");
const mistakeSummary = document.getElementById("mistakeSummary");
const mistakeSummaryEmpty = document.getElementById("mistakeSummaryEmpty");
const mistakeSummaryList = document.getElementById("mistakeSummaryList");
const learnPanel = document.getElementById("learnPanel");
const quizPanel = document.getElementById("quizPanel");
const learnMainGrid = document.getElementById("learnMainGrid");
const learnTitle = document.getElementById("learnTitle");
const learnStepText = document.getElementById("learnStepText");
const learnCard = document.getElementById("learnCard");
const learnPrompt = document.getElementById("learnPrompt");
const learnOptions = document.getElementById("learnOptions");
const gunitaSeriesControl = document.getElementById("gunitaSeriesControl");
const gunitaSeriesSelect = document.getElementById("gunitaSeriesSelect");
const learnPrimaryBtn = document.getElementById("learnPrimaryBtn");
const learnPreviousBtn = document.getElementById("learnPreviousBtn");
const learnRetryMistakesBtn = document.getElementById("learnRetryMistakesBtn");
const tracePanel = document.getElementById("tracePanel");
const traceNote = document.getElementById("traceNote");
const traceGif = document.getElementById("traceGif");
const tracePlayBtn = document.getElementById("tracePlayBtn");
const gameProgressFill = document.getElementById("gameProgressFill");
const gameProgressVisualText = document.getElementById("gameProgressVisualText");
const learnProgressFill = document.getElementById("learnProgressFill");
const learnProgressVisualText = document.getElementById("learnProgressVisualText");
const quizProgressFill = document.getElementById("quizProgressFill");
const quizProgressVisualText = document.getElementById("quizProgressVisualText");
const quizStepText = document.getElementById("quizStepText");
const quizPrompt = document.getElementById("quizPrompt");
const quizTitle = document.getElementById("quizTitle");
const quizPlayPromptBtn = document.getElementById("quizPlayPromptBtn");
const quizLetterCard = document.getElementById("quizLetterCard");
const quizOptions = document.getElementById("quizOptions");
const quizDropdownWrap = document.getElementById("quizDropdownWrap");
const quizAnswerSelect = document.getElementById("quizAnswerSelect");
const quizMistakeSummary = document.getElementById("quizMistakeSummary");
const quizMistakeSummaryEmpty = document.getElementById("quizMistakeSummaryEmpty");
const quizMistakeSummaryList = document.getElementById("quizMistakeSummaryList");
const appTitle = document.querySelector(".header h1");
const appSubtitle = document.querySelector(".header p");

const LEARN_OPTION_COUNT = {
  gunita: 4,
  ottakshara: 4,
  varnamaale_all: 8,
  varnamaale_swara: 6,
  varnamaale_vyanjana: 8,
  numbers: 4,
};

const SWARA_IDS = new Set([
  "a",
  "aa",
  "i",
  "ii",
  "u",
  "uu",
  "ru",
  "e",
  "ee",
  "ai-vowel",
  "o",
  "oo",
  "au",
  "am",
  "aha",
]);

const VARNAMAALE_TRACE_FILES = window.VARNAMAALE_TRACE_FILES || {};
const HINDI_IMAGE_VERSION = "20260804g";
const HINDI_SYNONYM_IMAGE_VERSION = "20260904a";

const HINDI_OPPOSITES_PAIRS = [
  ["रात", "दिन"],
  ["छोटा", "बड़ा"],
  ["मोटा", "पतला"],
  ["कम", "अधिक"],
  ["नया", "पुराना"],
  ["ऊँचा", "नीचा"],
  ["लेना", "देना"],
  ["जीत", "हार"],
  ["सच", "झूठ"],
  ["अमीर", "गरीब"],
  ["टेढ़ा", "सीधा"],
  ["मित्र", "शत्रु"],
  ["सरल", "कठिन"],
  ["मीठा", "खट्टा"],
  ["कच्चा", "पक्का"],
  ["सफल", "असफल"],
  ["निडर", "डरपोक"],
  ["मूर्ख", "चतुर"],
  ["असली", "नकली"],
  ["प्रसन्न", "अप्रसन्न"],
  ["पूरा", "अधूरा"],
  ["दूर", "निकट"],
  ["मेहनती", "आलसी"],
  ["सुबह", "शाम"],
  ["अपना", "पराया"],
  ["बदबू", "खुशबू"],
  ["शीघ्र", "देर"],
  ["खरीदना", "बेचना"],
  ["हल्का", "भारी"],
  ["प्रश्न", "उत्तर"],
  ["ठंडा", "गरम"],
  ["हँसना", "रोना"],
  ["गरमी", "सर्दी"],
];

const HINDI_SET_SIZE = 11;
const HINDI_SET_COUNT = 3;
const HINDI_SET_THEMES = [
  { icon: "🌟", name: "Starter Stars" },
  { icon: "🚀", name: "Word Explorers" },
  { icon: "🏆", name: "Opposite Champions" },
];

const HINDI_SYNONYM_SET_SIZE = 5;
const HINDI_SYNONYM_SET_COUNT = 5;
const HINDI_SYNONYM_SET_THEMES = [
  { icon: "🌟", name: "Words 1–5" },
  { icon: "🚀", name: "Words 6–10" },
  { icon: "☀️", name: "Words 11–15" },
  { icon: "🏆", name: "Words 16–20" },
  { icon: "🎯", name: "Hyper Focus" },
];

const HINDI_CORRECT_MESSAGES = [
  "शाबाश! You found the opposite! 🌟",
  "बहुत बढ़िया! Brilliant match! 🎉",
  "कमाल! You are a word explorer! 🚀",
  "सही जवाब! Keep shining! ✨",
];

const HINDI_OPPOSITES_AUDIO_MAP = {};

const HINDI_SYNONYMS = [
  { word: "ईश्वर", english: "God", synonyms: ["भगवान", "प्रभु", "परमात्मा"] },
  { word: "हवा", english: "air", synonyms: ["पवन", "वायु", "अनिल"] },
  { word: "बाग", english: "garden", synonyms: ["उपवन", "वाटिका", "बगीचा"] },
  { word: "मनुष्य", english: "human", synonyms: ["इंसान", "मानव", "व्यक्ति"] },
  { word: "फूल", english: "flower", synonyms: ["पुष्प", "कुसुम", "सुमन"] },
  { word: "माता", english: "mother", synonyms: ["अम्बा", "माँ", "जननी"] },
  { word: "पिता", english: "father", synonyms: ["तात", "जनक", "पितृ"] },
  { word: "बालक", english: "child", synonyms: ["बच्चा", "लड़का", "शिशु"] },
  { word: "मित्र", english: "friend", synonyms: ["दोस्त", "सखा", "मीत"] },
  { word: "वृक्ष", english: "tree", synonyms: ["पेड़", "तरु", "पादप"] },
  { word: "दिन", english: "day", synonyms: ["वासर", "वार", "दिवस"] },
  { word: "आकाश", english: "sky", synonyms: ["नभ", "गगन", "आसमान"] },
  { word: "पानी", english: "water", synonyms: ["जल", "नीर", "वारि"] },
  { word: "पर्वत", english: "mountain", synonyms: ["पहाड़", "शैल", "गिरि"] },
  { word: "घर", english: "house", synonyms: ["भवन", "गृह", "सदन"] },
  { word: "बादल", english: "cloud", synonyms: ["मेघ", "घन", "जलद"] },
  { word: "सुबह", english: "morning", synonyms: ["प्रातः", "सवेरा", "प्रभात"] },
  { word: "शाम", english: "evening", synonyms: ["सायं", "सांझ", "संध्या"] },
  { word: "वर्षा", english: "rain", synonyms: ["बारिश", "बरखा", "बरसात"] },
  { word: "कपड़ा", english: "cloth", synonyms: ["वस्त्र", "चीर", "पट"] },
];

const HINDI_PRONOUNS = [
  { word: "मैं", english: "I", exampleHindi: "मैं विद्यार्थी हूँ।", exampleEnglish: "I am a student." },
  { word: "हम", english: "we", exampleHindi: "हम साथ खेलते हैं।", exampleEnglish: "We play together." },
  { word: "तुम", english: "you (informal)", exampleHindi: "तुम मेरे दोस्त हो।", exampleEnglish: "You are my friend." },
  { word: "आप", english: "you (formal)", exampleHindi: "आप कैसे हैं?", exampleEnglish: "How are you?" },
  { word: "वह", english: "he / she / that", exampleHindi: "वह मेरी बहन है।", exampleEnglish: "She is my sister." },
  { word: "वे", english: "they / those", exampleHindi: "वे पार्क में खेल रहे हैं।", exampleEnglish: "They are playing in the park." },
  { word: "यह", english: "this / he / she", exampleHindi: "यह मेरी किताब है।", exampleEnglish: "This is my book." },
  { word: "ये", english: "these / they", exampleHindi: "ये मेरे खिलौने हैं।", exampleEnglish: "These are my toys." },
  { word: "मेरा", english: "my (masculine)", exampleHindi: "मेरा घर पास है।", exampleEnglish: "My house is nearby." },
  { word: "मेरी", english: "my (feminine)", exampleHindi: "मेरी बहन डॉक्टर है।", exampleEnglish: "My sister is a doctor." },
  { word: "मुझे", english: "me / to me", exampleHindi: "मुझे आम पसंद हैं।", exampleEnglish: "I like mangoes." },
  { word: "कौन", english: "who", exampleHindi: "वहाँ कौन है?", exampleEnglish: "Who is there?" },
];

const HINDI_CONVERSATIONS = [
  {
    id: "morning-greeting",
    title: "Morning greeting",
    lines: [
      { speaker: "Mother", speakerHindi: "माँ", hindi: "सुप्रभात! तुम कैसे हो?", roman: "Suprabhaat! Tum kaise ho?", english: "Good morning! How are you?" },
      { speaker: "Son", speakerHindi: "बेटा", hindi: "सुप्रभात! मैं ठीक हूँ।", roman: "Suprabhaat! Main theek hoon.", english: "Good morning! I am fine." },
    ],
  },
  {
    id: "asking-for-water",
    title: "Asking for water",
    lines: [
      { speaker: "Son", speakerHindi: "बेटा", hindi: "पापा, मुझे पानी चाहिए।", roman: "Papa, mujhe paani chaahiye.", english: "Dad, I need some water." },
      { speaker: "Father", speakerHindi: "पापा", hindi: "यह लो पानी।", roman: "Yeh lo paani.", english: "Here is some water." },
    ],
  },
  {
    id: "feeling-hungry",
    title: "Feeling hungry",
    lines: [
      { speaker: "Son", speakerHindi: "बेटा", hindi: "माँ, मुझे भूख लगी है।", roman: "Maa, mujhe bhookh lagi hai.", english: "Mom, I am hungry." },
      { speaker: "Mother", speakerHindi: "माँ", hindi: "खाना तैयार है।", roman: "Khaana taiyaar hai.", english: "The food is ready." },
    ],
  },
  {
    id: "homework-time",
    title: "Homework time",
    lines: [
      { speaker: "Mother", speakerHindi: "माँ", hindi: "क्या तुम्हारा गृहकार्य हो गया?", roman: "Kya tumhaara grih-kaarya ho gaya?", english: "Is your homework finished?" },
      { speaker: "Son", speakerHindi: "बेटा", hindi: "बस थोड़ा-सा बाकी है।", roman: "Bas thoda-sa baaki hai.", english: "Only a little is left." },
    ],
  },
  {
    id: "where-are-you-going",
    title: "Where are you going?",
    lines: [
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "तुम कहाँ जा रहे हो?", roman: "Tum kahaan ja rahe ho?", english: "Where are you going?" },
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "मैं स्कूल जा रहा हूँ।", roman: "Main school ja raha hoon.", english: "I am going to school." },
    ],
  },
  {
    id: "walking-together",
    title: "Walking together",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "क्या हम साथ चलें?", roman: "Kya hum saath chalein?", english: "Shall we go together?" },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "हाँ, चलो!", roman: "Haan, chalo!", english: "Yes, let’s go!" },
    ],
  },
  {
    id: "asking-a-name",
    title: "Asking a name",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "तुम्हारा नाम क्या है?", roman: "Tumhaara naam kya hai?", english: "What is your name?" },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "मेरा नाम आरव है।", roman: "Mera naam Aarav hai.", english: "My name is Aarav." },
    ],
  },
  {
    id: "meeting-someone",
    title: "Meeting someone",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "तुमसे मिलकर अच्छा लगा।", roman: "Tumse milkar achchha laga.", english: "Nice to meet you." },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "मुझे भी।", roman: "Mujhe bhi.", english: "Me too." },
    ],
  },
  {
    id: "understanding-a-lesson",
    title: "Understanding a lesson",
    lines: [
      { speaker: "Teacher", speakerHindi: "शिक्षिका", hindi: "क्या तुम्हें समझ आया?", roman: "Kya tumhein samajh aaya?", english: "Did you understand?" },
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "जी हाँ, समझ आया।", roman: "Ji haan, samajh aaya.", english: "Yes, I understood." },
    ],
  },
  {
    id: "asking-for-help",
    title: "Asking for help",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "मुझे समझ नहीं आया।", roman: "Mujhe samajh nahin aaya.", english: "I did not understand." },
      { speaker: "Teacher", speakerHindi: "शिक्षिका", hindi: "ठीक है, मैं फिर समझाती हूँ।", roman: "Theek hai, main phir samjhaati hoon.", english: "Okay, I’ll explain again." },
    ],
  },
  {
    id: "borrowing-a-pencil",
    title: "Borrowing a pencil",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "क्या मैं तुम्हारी पेंसिल ले सकता हूँ?", roman: "Kya main tumhaari pencil le sakta hoon?", english: "May I borrow your pencil?" },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "हाँ, ज़रूर।", roman: "Haan, zaroor.", english: "Yes, of course." },
    ],
  },
  {
    id: "saying-thank-you",
    title: "Saying thank you",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "धन्यवाद!", roman: "Dhanyavaad!", english: "Thank you!" },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "कोई बात नहीं।", roman: "Koi baat nahin.", english: "You’re welcome." },
    ],
  },
  {
    id: "inviting-a-friend",
    title: "Inviting a friend",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "क्या तुम बाहर खेलोगे?", roman: "Kya tum baahar kheloge?", english: "Will you play outside?" },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "हाँ, मैं खेलूँगा।", roman: "Haan, main kheloonga.", english: "Yes, I will." },
    ],
  },
  {
    id: "choosing-a-game",
    title: "Choosing a game",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "हम कौन-सा खेल खेलें?", roman: "Hum kaun-sa khel khelein?", english: "Which game shall we play?" },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "चलो, फुटबॉल खेलते हैं।", roman: "Chalo, football khelte hain.", english: "Let’s play football." },
    ],
  },
  {
    id: "asking-permission",
    title: "Asking permission",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "क्या मैं टीवी देख सकता हूँ?", roman: "Kya main TV dekh sakta hoon?", english: "May I watch TV?" },
      { speaker: "Mother", speakerHindi: "माँ", hindi: "हाँ, थोड़ी देर के लिए।", roman: "Haan, thodi der ke liye.", english: "Yes, for a little while." },
    ],
  },
  {
    id: "tv-time-is-over",
    title: "TV time is over",
    lines: [
      { speaker: "Mother", speakerHindi: "माँ", hindi: "अब टीवी बंद कर दो।", roman: "Ab TV band kar do.", english: "Turn off the TV now." },
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "ठीक है, माँ।", roman: "Theek hai, Maa.", english: "Okay, Mom." },
    ],
  },
  {
    id: "apologizing",
    title: "Apologizing",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "माफ़ करना!", roman: "Maaf karna!", english: "I’m sorry!" },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "कोई बात नहीं।", roman: "Koi baat nahin.", english: "It’s okay." },
    ],
  },
  {
    id: "checking-on-someone",
    title: "Checking on someone",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "क्या तुम ठीक हो?", roman: "Kya tum theek ho?", english: "Are you okay?" },
      { speaker: "Friend", speakerHindi: "दोस्त", hindi: "हाँ, मैं ठीक हूँ।", roman: "Haan, main theek hoon.", english: "Yes, I am fine." },
    ],
  },
  {
    id: "at-a-toy-shop",
    title: "At a toy shop",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "यह गेंद कितने की है?", roman: "Yeh gend kitne ki hai?", english: "How much is this ball?" },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", hindi: "यह दो सौ रुपये की है।", roman: "Yeh do sau rupaye ki hai.", english: "It costs two hundred rupees." },
    ],
  },
  {
    id: "saying-goodbye",
    title: "Saying goodbye",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", hindi: "दादा-दादी, फिर मिलेंगे!", roman: "Dada-Dadi, phir milenge!", english: "Grandpa and Grandma, see you again!" },
      { speaker: "Grandparents", speakerHindi: "दादा-दादी", hindi: "कल मिलते हैं।", roman: "Kal milte hain.", english: "See you tomorrow." },
    ],
  },
];

const HINDI_FOCUS_SYNONYM_GROUPS = [
  { word: "पानी", synonyms: ["जल", "नीर"] },
  { word: "बादल", synonyms: ["मेघ"] },
  { word: "पर्वत", synonyms: ["पहाड़"] },
  { word: "सुबह", synonyms: ["प्रातः"] },
  { word: "वर्षा", synonyms: ["बारिश"] },
  { word: "दिन", synonyms: ["दिवस"] },
  { word: "घर", synonyms: ["गृह", "सदन"] },
  { word: "कपड़ा", synonyms: ["वस्त्र"] },
  { word: "शाम", synonyms: ["संध्या"] },
  { word: "मित्र", synonyms: ["सखा", "दोस्त"] },
  { word: "माता", synonyms: ["अम्बा", "माँ", "जननी"] },
  { word: "वृक्ष", synonyms: ["पादप", "तरु"] },
  { word: "बालक", synonyms: ["शिशु", "लड़का"] },
  { word: "बाग", synonyms: ["उपवन", "वाटिका"] },
  { word: "फूल", synonyms: ["कुसुम", "पुष्प"] },
  { word: "पिता", synonyms: ["तात", "जनक"] },
  { word: "आकाश", synonyms: ["गगन", "नभ"] },
];

const HINDI_WORD_MEANING_MAP = {
  "रात": "night",
  "दिन": "day",
  "छोटा": "small",
  "बड़ा": "big",
  "मोटा": "fat",
  "पतला": "thin",
  "कम": "less",
  "अधिक": "more",
  "नया": "new",
  "पुराना": "old",
  "ऊँचा": "high",
  "नीचा": "low",
  "लेना": "take",
  "देना": "give",
  "जीत": "victory",
  "हार": "defeat",
  "सच": "truth",
  "झूठ": "lie",
  "अमीर": "rich",
  "गरीब": "poor",
  "टेढ़ा": "crooked",
  "सीधा": "straight",
  "मित्र": "friend",
  "शत्रु": "enemy",
  "सरल": "easy",
  "कठिन": "difficult",
  "मीठा": "sweet",
  "खट्टा": "sour",
  "कच्चा": "raw",
  "पक्का": "ripe",
  "सफल": "successful",
  "असफल": "unsuccessful",
  "निडर": "fearless",
  "डरपोक": "cowardly",
  "मूर्ख": "foolish",
  "चतुर": "clever",
  "असली": "real",
  "नकली": "fake",
  "प्रसन्न": "happy",
  "अप्रसन्न": "unhappy",
  "पूरा": "full",
  "अधूरा": "incomplete",
  "दूर": "far",
  "निकट": "near",
  "मेहनती": "hardworking",
  "आलसी": "lazy",
  "सुबह": "morning",
  "शाम": "evening",
  "अपना": "own",
  "पराया": "others'",
  "बदबू": "bad smell",
  "खुशबू": "fragrance",
  "शीघ्र": "quick",
  "देर": "late",
  "खरीदना": "buy",
  "बेचना": "sell",
  "हल्का": "light",
  "भारी": "heavy",
  "प्रश्न": "question",
  "उत्तर": "answer",
  "ठंडा": "cold",
  "गरम": "hot",
  "हँसना": "laugh",
  "रोना": "cry",
  "गरमी": "heat",
  "सर्दी": "cold weather",
};

const state = {
  language: "kannada",
  uiMode: "learn",
  mode: "game",
  levelId: "",
  pairs: [],
  soundCards: [],
  scriptCards: [],
  selectedSoundId: null,
  selectedScriptId: null,
  correctCount: 0,
  gameScore: 0,
  gameMistakes: 0,
  gamePageIndex: 0,
  gamePages: [],
  gameMistakeById: {},
  streak: 0,
  bestStreak: 0,
  matchedIds: new Set(),
  learn: {
    topic: "gunita",
    items: [],
    optionPool: [],
    index: 0,
    score: 0,
    mistakes: 0,
    mistakeById: {},
    retryMode: false,
    boostupActive: false,
    boostupRound: 0,
    phase: "show",
    options: [],
    selectedOptionId: null,
  },
  quiz: {
    topic: "gunita_quiz",
    items: [],
    index: 0,
    score: 0,
    mistakes: 0,
    mistakeById: {},
    choices: [],
    selectedOptionId: null,
    done: false,
    match: {
      sets: [],
      setIndex: 0,
      leftChoices: [],
      rightChoices: [],
      matchedIds: new Set(),
      selectedLeftId: null,
      selectedRightId: null,
    },
  },
};

const LEARN_TOPICS_BY_LANGUAGE = {
  kannada: ["gunita", "ottakshara", "varnamaale_all", "varnamaale_swara", "varnamaale_vyanjana", "numbers"],
  hindi: ["hindi_opposites_learning", "hindi_synonyms_learning", "hindi_pronouns_learning", "hindi_conversations_learning"],
};

const QUIZ_TOPICS_BY_LANGUAGE = {
  kannada: ["gunita_quiz", "varnamaale_quiz", "numbers_quiz"],
  hindi: ["hindi_opposites_quiz", "hindi_opposites_picture_quiz", "hindi_synonyms_quiz", "hindi_pronouns_quiz", "hindi_conversations_quiz"],
};

const selectedHindiSetByKind = { opposites: 0, synonyms: 0 };

let availableVoices = [];
const audioCache = new Map();
let currentTraceFilePath = "";
let speechFallbackTimer = null;

function updateVoices() {
  if (!("speechSynthesis" in window)) {
    return;
  }
  availableVoices = window.speechSynthesis.getVoices();
}

if ("speechSynthesis" in window) {
  updateVoices();
  window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
}

function shuffle(list) {
  const array = [...list];
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

function getLevelById(levelId) {
  return KANNADA_LEVELS.find((level) => level.id === levelId);
}

function getBaseSound(soundText) {
  return soundText.split("(")[0].trim();
}

function getGunitaMeta(item) {
  if (state.learn.topic !== "gunita") {
    return null;
  }
  if (typeof item?.base !== "string" || typeof item?.sign !== "string") {
    return null;
  }
  return { base: item.base, sign: item.sign, family: item.family || "a" };
}

function getGunitaCardHTML(item, withSplit) {
  const gunitaMeta = getGunitaMeta(item);
  if (!gunitaMeta) {
    return item.text;
  }

  const familyClass = `gunita-family-${gunitaMeta.family}`;
  const signText = gunitaMeta.sign || "∅";
  const finalJoined = `<span class="gunita-final">${item.text}</span>`;

  if (!withSplit) {
    return finalJoined;
  }

  return `${finalJoined}<div class="gunita-split"><span class="gunita-base">${gunitaMeta.base}</span> + <span class="gunita-sign ${familyClass}">${signText}</span> = ${finalJoined}</div>`;
}

function setLearnCardContent(item, withSplit = false) {
  const gunitaMeta = getGunitaMeta(item);
  if (state.learn.topic === "numbers") {
    learnCard.innerHTML = `<span class="number-learning-content"><span class="number-numeral">${item.text}</span><span class="number-name">${item.sound}</span></span>`;
    return;
  }
  if (!gunitaMeta) {
    learnCard.textContent = item.text;
    return;
  }
  learnCard.innerHTML = getGunitaCardHTML(item, withSplit);
}

function setLearnOptionContent(button, option) {
  const gunitaMeta = getGunitaMeta(option);
  if (state.learn.topic === "numbers") {
    button.innerHTML = `<span class="number-option-content"><span>${option.text}</span><span class="number-option-name">${option.sound}</span></span>`;
    return;
  }
  if (!gunitaMeta) {
    button.textContent = option.text;
    return;
  }
  button.innerHTML = getGunitaCardHTML(option, false);
}

function updateGameProgressText() {
  if (!gameProgressText) {
    return;
  }
  const totalSets = state.gamePages.length;
  const currentSet = totalSets === 0 ? 0 : state.gamePageIndex + 1;
  gameProgressText.textContent = `Set: ${currentSet} / ${totalSets}`;
}

function setProgressVisual(fillElement, textElement, ratio) {
  if (!fillElement || !textElement) {
    return;
  }
  const clampedRatio = Number.isFinite(ratio) ? Math.min(1, Math.max(0, ratio)) : 0;
  const percent = Math.round(clampedRatio * 100);
  fillElement.style.width = `${percent}%`;
  textElement.textContent = `${percent}%`;
}

function renderGameMistakeSummary() {
  mistakeSummaryList.innerHTML = "";
  const entries = Object.entries(state.gameMistakeById)
    .map(([itemId, count]) => {
      const item = state.gamePages.flat().find((candidate) => candidate.id === itemId);
      return { itemId, count, item };
    })
    .filter((entry) => entry.count > 0 && entry.item)
    .sort((left, right) => right.count - left.count);

  if (entries.length === 0) {
    mistakeSummaryEmpty.classList.remove("hidden");
    return;
  }

  mistakeSummaryEmpty.classList.add("hidden");
  entries.forEach((entry) => {
    const row = document.createElement("li");
    row.textContent = `${entry.item.text} (${getBaseSound(entry.item.sound)}): ${entry.count}`;
    mistakeSummaryList.appendChild(row);
  });
}

function updateStatus(message) {
  statusText.textContent = message;
  if (state.mode === "game") {
    scoreText.textContent = `Score: ${state.gameScore} | Correct: ${state.correctCount}/${state.pairs.length} | Mistakes: ${state.gameMistakes}`;
    streakText.textContent = `Streak: ${state.streak} | Best: ${state.bestStreak}`;
    updateGameProgressText();
    const gameRatio = state.pairs.length ? state.correctCount / state.pairs.length : 0;
    setProgressVisual(gameProgressFill, gameProgressVisualText, gameRatio);
    setProgressVisual(learnProgressFill, learnProgressVisualText, 0);
    setProgressVisual(quizProgressFill, quizProgressVisualText, 0);
    return;
  }

  if (state.mode === "quiz49") {
    const total = state.quiz.items.length;
    scoreText.textContent = `Quiz Score: ${state.quiz.score} / ${total} | Mistakes: ${state.quiz.mistakes}`;
    streakText.textContent = `Streak: ${state.streak} | Best: ${state.bestStreak}`;
    const quizRatio = total ? (state.quiz.done ? 1 : state.quiz.index / total) : 0;
    setProgressVisual(quizProgressFill, quizProgressVisualText, quizRatio);
    setProgressVisual(gameProgressFill, gameProgressVisualText, 0);
    setProgressVisual(learnProgressFill, learnProgressVisualText, 0);
    return;
  }

  const total = state.learn.items.length;
  scoreText.textContent = `Lesson Score: ${state.learn.score} / ${total}`;
  streakText.textContent = `Streak: ${state.streak} | Best: ${state.bestStreak}`;
  const lessonRatio = total ? (state.learn.index + (state.learn.phase === "done" ? 1 : 0)) / total : 0;
  setProgressVisual(learnProgressFill, learnProgressVisualText, lessonRatio);
  setProgressVisual(gameProgressFill, gameProgressVisualText, 0);
  setProgressVisual(quizProgressFill, quizProgressVisualText, 0);
}

async function tryPlayRecordedAudio(item) {
  const customAudioPath = item.audio || null;
  if (!customAudioPath) {
    return false;
  }

  if (audioCache.get(customAudioPath) === false) {
    return false;
  }

  const audio = new Audio(customAudioPath);
  audio.preload = "auto";

  try {
    await audio.play();
    audioCache.set(customAudioPath, true);
    return true;
  } catch (_error) {
    audioCache.set(customAudioPath, false);
    return false;
  }
}

function speakFallback(item) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const text = item?.text || "";
  const isHindiText = /[\u0900-\u097F]/.test(text);
  const hiInVoice = availableVoices.find((voice) => voice.lang.toLowerCase() === "hi-in");
  const hiVoice = availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("hi"));
  const knVoice = availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("kn"));
  const inVoice = availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("en-in"));
  const fallbackVoice = availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("en"));

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = isHindiText
    ? hiInVoice || hiVoice || inVoice || fallbackVoice || null
    : knVoice || inVoice || fallbackVoice || null;
  utterance.lang = utterance.voice?.lang || (isHindiText ? "hi-IN" : "en-US");
  utterance.rate = isHindiText ? 0.66 : 0.8;
  utterance.pitch = isHindiText ? 1.02 : 1;
  if (speechFallbackTimer) {
    window.clearTimeout(speechFallbackTimer);
  }
  speechFallbackTimer = window.setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 50);
}

function speakItem(item) {
  if (!item.audio) {
    speakFallback(item);
    return;
  }

  tryPlayRecordedAudio(item).then((playedRecordedAudio) => {
    if (!playedRecordedAudio) {
      speakFallback(item);
    }
  });
}

function speakHindiConversation(conversation) {
  const text = conversation?.lines?.map((line) => line.hindi).join(" ... ") || conversation?.text || "";
  speakItem({ text, sound: text });
}

function speakLearningItem(item) {
  if (state.learn.topic === "hindi_conversations_learning") {
    return;
  }
  speakItem(item);
}

function getTraceFilePathForItem(item) {
  const mappingValue = VARNAMAALE_TRACE_FILES[item.id];
  if (!mappingValue) {
    return "";
  }
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(mappingValue)}`;
}

function playTraceAnimation() {
  if (!currentTraceFilePath) {
    return;
  }
  traceGif.src = "";
  traceGif.src = `${currentTraceFilePath}?v=${Date.now()}`;
}

function updateTracePanel(item) {
  const isVarnamaale = state.learn.topic.startsWith("varnamaale");
  if (!isVarnamaale || !item) {
    tracePanel.classList.add("hidden");
    learnMainGrid?.classList.add("single-panel");
    currentTraceFilePath = "";
    traceGif.removeAttribute("src");
    return;
  }

  const filePath = getTraceFilePathForItem(item);
  const hasTrace = filePath.length > 0;
  tracePanel.classList.remove("hidden");

  if (!hasTrace) {
    traceNote.textContent = `Animation not available yet for ${item.text}.`;
    currentTraceFilePath = "";
    traceGif.removeAttribute("src");
    tracePlayBtn.disabled = true;
    learnMainGrid?.classList.remove("single-panel");
    return;
  }

  learnMainGrid?.classList.remove("single-panel");
  traceNote.textContent = "Source: Wikimedia Commons animation (community-contributed).";
  currentTraceFilePath = filePath;
  traceGif.src = filePath;
  tracePlayBtn.disabled = false;
}

function clearSelections() {
  state.selectedSoundId = null;
  state.selectedScriptId = null;
  renderBoard();
}

function maybeCheckMatch() {
  if (!state.selectedSoundId || !state.selectedScriptId) {
    return;
  }

  const isCorrect = state.selectedSoundId === state.selectedScriptId;
  if (isCorrect) {
    state.matchedIds.add(state.selectedSoundId);
    state.correctCount += 1;
    state.gameScore += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    clearSelections();

    if (state.correctCount === state.pairs.length) {
      const isLastSet = state.gamePageIndex >= state.gamePages.length - 1;
      if (isLastSet) {
        nextSetBtn.classList.add("hidden");
        nextSetBtn.disabled = true;
        mistakeSummary.classList.remove("hidden");
        renderGameMistakeSummary();
        updateStatus("Session complete 🎉 You covered all sets.");
        return;
      }

      nextSetBtn.classList.remove("hidden");
      nextSetBtn.disabled = false;
      updateStatus("Set complete ✅ Click Next Set.");
      return;
    }

    updateStatus("Correct ✅ Great job. Keep going!");
    return;
  }

  const wrongSound = state.selectedSoundId;
  const wrongScript = state.selectedScriptId;
  state.gameScore -= 1;
  state.gameMistakes += 1;
  state.gameMistakeById[wrongSound] = (state.gameMistakeById[wrongSound] || 0) + 1;
  state.streak = 0;
  renderBoard({ wrongSound, wrongScript });
  updateStatus("Oops ❌ (-1). Try again.");

  setTimeout(() => {
    clearSelections();
  }, 500);
}

function createPagedSets(items, pageSize) {
  const pages = [];
  for (let index = 0; index < items.length; index += pageSize) {
    pages.push(items.slice(index, index + pageSize));
  }
  return pages;
}

function loadGameSet(setIndex) {
  const nextPairs = state.gamePages[setIndex] || [];
  state.gamePageIndex = setIndex;
  state.pairs = nextPairs;
  state.soundCards = shuffle(nextPairs.map((item) => ({ ...item })));
  state.scriptCards = shuffle(nextPairs.map((item) => ({ ...item })));
  state.selectedSoundId = null;
  state.selectedScriptId = null;
  state.correctCount = 0;
  state.matchedIds = new Set();
  nextSetBtn.classList.add("hidden");
  nextSetBtn.disabled = true;
  renderBoard();
  updateStatus(`Set ${setIndex + 1} ready.`);
}

function renderBoard(markWrong = null) {
  soundColumn.innerHTML = "";
  scriptColumn.innerHTML = "";

  const soundItems = state.soundCards;
  const scriptItems = state.scriptCards;

  soundItems.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.disabled = state.matchedIds.has(item.id);

    if (item.sound.length > 4) {
      card.classList.add("small-text");
    }

    if (state.matchedIds.has(item.id)) {
      card.classList.add("correct");
    }

    if (state.selectedSoundId === item.id) {
      card.classList.add("selected");
    }

    if (markWrong && markWrong.wrongSound === item.id) {
      card.classList.add("incorrect");
    }

    const label = document.createElement("strong");
    label.textContent = item.sound;
    card.appendChild(label);

    const speakButton = document.createElement("span");
    speakButton.className = "speak-btn";
    speakButton.textContent = "🔊";
    card.appendChild(speakButton);

    card.addEventListener("click", () => {
      if (state.matchedIds.has(item.id)) {
        return;
      }
      state.selectedSoundId = item.id;
      speakItem(item);
      renderBoard();
      maybeCheckMatch();
    });

    soundColumn.appendChild(card);
  });

  scriptItems.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.disabled = state.matchedIds.has(item.id);

    if (state.matchedIds.has(item.id)) {
      card.classList.add("correct");
    }

    if (state.selectedScriptId === item.id) {
      card.classList.add("selected");
    }

    if (markWrong && markWrong.wrongScript === item.id) {
      card.classList.add("incorrect");
    }

    const label = document.createElement("strong");
    label.textContent = item.text;
    card.appendChild(label);

    card.addEventListener("click", () => {
      if (state.matchedIds.has(item.id)) {
        return;
      }
      state.selectedScriptId = item.id;
      renderBoard();
      maybeCheckMatch();
    });

    scriptColumn.appendChild(card);
  });
}

function buildRound() {
  const level = getLevelById(levelSelect.value);
  if (!level) {
    return;
  }

  const count = Number(itemCountSelect.value);
  const allItems = shuffle(level.items.map((item) => ({ ...item })));
  const pageSize = Math.min(Math.max(count, 1), allItems.length);

  state.levelId = level.id;
  state.gamePages = createPagedSets(allItems, pageSize);
  state.gamePageIndex = 0;
  state.gameMistakeById = {};
  state.gameScore = 0;
  state.gameMistakes = 0;
  state.streak = 0;
  state.bestStreak = 0;
  mistakeSummary.classList.add("hidden");
  nextSetBtn.classList.add("hidden");
  nextSetBtn.disabled = true;
  renderGameMistakeSummary();
  loadGameSet(0);
  updateStatus(`Session started: ${level.name}`);
}

function getGunitaItems() {
  const gunitaLevel = getLevelById("gunita");
  if (!gunitaLevel) {
    return [];
  }
  const selectedSeriesId = gunitaSeriesSelect?.value;
  if (!selectedSeriesId) {
    return [...gunitaLevel.items];
  }
  return gunitaLevel.items.filter((item) => item.seriesId === selectedSeriesId);
}

function getSelectedGunitaBase() {
  return GUNITA_BASE_LETTERS.find((base) => base.id === gunitaSeriesSelect?.value) || GUNITA_BASE_LETTERS[0];
}

function getVarnamaaleItems(topic) {
  const varnamaaleLevel = getLevelById("varnamaale");
  if (!varnamaaleLevel) {
    return [];
  }

  if (topic === "varnamaale_swara") {
    return varnamaaleLevel.items.filter((item) => SWARA_IDS.has(item.id));
  }

  if (topic === "varnamaale_vyanjana") {
    return varnamaaleLevel.items.filter((item) => !SWARA_IDS.has(item.id));
  }

  return [...varnamaaleLevel.items];
}

function getNumbersItems() {
  const numbersLevel = getLevelById("numbers");
  if (!numbersLevel) {
    return [];
  }
  return [...numbersLevel.items];
}

function getOttaksharaItems() {
  const ottaksharaLevel = getLevelById("ottakshara");
  if (!ottaksharaLevel) {
    return [];
  }
  return [...ottaksharaLevel.items];
}

function getHindiOppositesLearningItems() {
  const setIndex = getSelectedHindiSetIndex();
  const startIndex = setIndex * HINDI_SET_SIZE;
  return HINDI_OPPOSITES_PAIRS.map(([text, oppositeText], index) => ({
    id: `hindi-learning-${index}`,
    text,
    sound: text,
    audio: HINDI_OPPOSITES_AUDIO_MAP[text] || null,
    oppositeText,
    oppositeSound: oppositeText,
    oppositeAudio: HINDI_OPPOSITES_AUDIO_MAP[oppositeText] || null,
  })).slice(startIndex, startIndex + HINDI_SET_SIZE);
}

function getHindiSynonymItems() {
  const setIndex = getSelectedHindiSynonymSetIndex();
  if (setIndex === HINDI_SYNONYM_SET_COUNT - 1) {
    return HINDI_FOCUS_SYNONYM_GROUPS.map(({ word, synonyms }, index) => {
      const entry = HINDI_SYNONYMS.find((candidate) => candidate.word === word);
      return {
        id: `hindi-synonym-focus-${index}`,
        text: word,
        sound: word,
        english: entry?.english || "",
        synonyms: [...synonyms],
        focusPair: true,
      };
    });
  }

  const startIndex = setIndex * HINDI_SYNONYM_SET_SIZE;
  return HINDI_SYNONYMS.map((entry, index) => ({
    id: `hindi-synonym-${index}`,
    text: entry.word,
    sound: entry.word,
    english: entry.english,
    synonyms: [...entry.synonyms],
  })).slice(startIndex, startIndex + HINDI_SYNONYM_SET_SIZE);
}

function getHindiConversationItems() {
  return HINDI_CONVERSATIONS.map((conversation) => ({
    ...conversation,
    image: `hindi_conversation_images/${conversation.id}.png`,
    text: conversation.lines.map((line) => line.hindi).join(" "),
    sound: conversation.lines.map((line) => line.roman).join(" / "),
  }));
}

function getHindiPronounItems() {
  return HINDI_PRONOUNS.map((pronoun, index) => ({
    id: `hindi-pronoun-${index}`,
    text: pronoun.word,
    sound: pronoun.word,
    english: pronoun.english,
    exampleHindi: pronoun.exampleHindi,
    exampleEnglish: pronoun.exampleEnglish,
  }));
}

function getSelectedHindiSynonymSetIndex() {
  const selectedIndex = Number(hindiSetSelect?.value || 0);
  return Math.min(Math.max(selectedIndex, 0), HINDI_SYNONYM_SET_COUNT - 1);
}

function getSelectedHindiSynonymSetNumber() {
  return getSelectedHindiSynonymSetIndex() + 1;
}

function configureHindiSetSelect(topic) {
  const nextKind = topic.includes("conversation")
    ? "conversations"
    : topic.includes("pronoun")
      ? "pronouns"
    : topic.includes("synonym")
      ? "synonyms"
      : "opposites";
  const currentKind = hindiSetSelect?.dataset.kind;

  if (nextKind === "conversations" || nextKind === "pronouns") {
    hindiSetLabel?.classList.add("hidden");
    hindiSetSelect?.classList.add("hidden");
    return;
  }

  if (currentKind && currentKind !== nextKind) {
    selectedHindiSetByKind[currentKind] = Number(hindiSetSelect.value || 0);
  }

  if (currentKind !== nextKind) {
    const themes = nextKind === "synonyms" ? HINDI_SYNONYM_SET_THEMES : HINDI_SET_THEMES;
    hindiSetSelect.replaceChildren(...themes.map((theme, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `${theme.icon} Set ${index + 1} — ${theme.name}`;
      return option;
    }));
    hindiSetSelect.dataset.kind = nextKind;
    hindiSetSelect.value = String(selectedHindiSetByKind[nextKind] || 0);
  }

  if (hindiSetLabel) {
    hindiSetLabel.textContent = nextKind === "synonyms" ? "Synonyms Learning & Quiz Set" : "Opposites Learning & Quiz Set";
  }
  const showSetSelect = state.language === "hindi";
  hindiSetLabel?.classList.toggle("hidden", !showSetSelect);
  hindiSetSelect?.classList.toggle("hidden", !showSetSelect);
}

function getSelectedHindiSetIndex() {
  const selectedIndex = Number(hindiSetSelect?.value || 0);
  return Math.min(Math.max(selectedIndex, 0), HINDI_SET_COUNT - 1);
}

function getSelectedHindiSetNumber() {
  return getSelectedHindiSetIndex() + 1;
}

function getSelectedHindiSetTheme() {
  return HINDI_SET_THEMES[getSelectedHindiSetIndex()];
}

function getHindiStarProgress(completed, total) {
  const safeCompleted = Math.min(Math.max(completed, 0), total);
  return `${"⭐".repeat(safeCompleted)}${"☆".repeat(Math.max(total - safeCompleted, 0))}`;
}

function showHindiCelebration(message) {
  document.querySelector(".hindi-celebration")?.remove();

  const celebration = document.createElement("div");
  celebration.className = "hindi-celebration";
  celebration.setAttribute("role", "status");
  celebration.innerHTML = `<div class="hindi-celebration-card"><span class="hindi-celebration-icons">🎉 ⭐ 🏆 ⭐ 🎉</span><strong>${message}</strong><span>बहुत बढ़िया!</span></div>`;

  ["🎊", "⭐", "✨", "🌈", "🎉", "🏆", "⭐", "🎊"].forEach((symbol, index) => {
    const particle = document.createElement("span");
    particle.className = "hindi-celebration-particle";
    particle.textContent = symbol;
    particle.style.left = `${8 + index * 12}%`;
    particle.style.animationDelay = `${index * 90}ms`;
    celebration.appendChild(particle);
  });

  document.body.appendChild(celebration);
  window.setTimeout(() => celebration.remove(), 2800);
}

function getHindiWordLabel(wordText) {
  const meaning = HINDI_WORD_MEANING_MAP[wordText];
  return meaning ? `${wordText} (${meaning})` : wordText;
}

function getLearningItems(topic) {
  if (topic === "gunita") {
    return getGunitaItems();
  }
  if (topic === "ottakshara") {
    return getOttaksharaItems();
  }
  if (topic === "hindi_opposites_learning") {
    return getHindiOppositesLearningItems();
  }
  if (topic === "hindi_synonyms_learning") {
    return getHindiSynonymItems();
  }
  if (topic === "hindi_conversations_learning") {
    return getHindiConversationItems();
  }
  if (topic === "hindi_pronouns_learning") {
    return getHindiPronounItems();
  }
  if (topic === "numbers") {
    return getNumbersItems();
  }
  return getVarnamaaleItems(topic);
}

function updateLearnControlsVisibility() {
  learnTopicSelect.classList.remove("hidden");
}

function setVisibleSelectOptions(selectElement, allowedValues) {
  const allowedSet = new Set(allowedValues);
  Array.from(selectElement.options).forEach((option) => {
    const visible = allowedSet.has(option.value);
    option.hidden = !visible;
    option.disabled = !visible;
  });

  if (!allowedSet.has(selectElement.value)) {
    selectElement.value = allowedValues[0] || "";
  }
}

function syncLanguageDependentTopics() {
  const language = languageSelect?.value || "kannada";
  state.language = language;

  const learnTopics = LEARN_TOPICS_BY_LANGUAGE[language] || LEARN_TOPICS_BY_LANGUAGE.kannada;
  const quizTopics = QUIZ_TOPICS_BY_LANGUAGE[language] || QUIZ_TOPICS_BY_LANGUAGE.kannada;

  setVisibleSelectOptions(learnTopicSelect, learnTopics);
  setVisibleSelectOptions(quizTopicSelect, quizTopics);
  document.querySelectorAll(".hindi-only").forEach((element) => {
    element.classList.toggle("hidden", language !== "hindi");
  });
  document.body.classList.toggle("hindi-active", language === "hindi");
  appTitle.textContent = language === "hindi" ? "Hindi Word Adventure" : "Kannada Letters Learning";
  appSubtitle.textContent = language === "hindi"
    ? "Listen, explore pictures, and practise Hindi words and everyday conversations!"
    : "Learn Kannada letters through listening, matching, and practice.";
}

function startLearningMode() {
  const topic = learnTopicSelect.value;
  gunitaSeriesControl.classList.toggle("hidden", topic !== "gunita");
  configureHindiSetSelect(topic);
  const items = getLearningItems(topic);

  state.mode = "learn";
  state.levelId = topic;
  state.learn.topic = topic;
  state.learn.items = items;
  state.learn.optionPool = items;
  state.learn.index = 0;
  state.learn.score = 0;
  state.learn.mistakes = 0;
  state.learn.mistakeById = {};
  state.learn.retryMode = false;
  state.learn.boostupActive = false;
  state.learn.boostupRound = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.learn.phase = "show";
  state.learn.options = [];
  state.learn.selectedOptionId = null;
  learnRetryMistakesBtn.classList.add("hidden");

  renderLearning();
  const firstItem = currentLearnItem();
  if (firstItem) {
    speakLearningItem(firstItem);
  }
  updateLearnControlsVisibility();
  if (topic === "gunita") {
    const selectedBase = getSelectedGunitaBase();
    learnTitle.textContent = `Gunitaakshara Learning — ${selectedBase.text}`;
    updateStatus(`Learning the ${selectedBase.text} series: 12 forms. Listen and tap Next.`);
    return;
  }

  if (topic === "ottakshara") {
    learnTitle.textContent = "Ottakshara Learning";
    updateStatus("Learning Ottakshara: listen and tap Next.");
    return;
  }

  if (topic === "numbers") {
    learnTitle.textContent = "Kannada Numbers Learning";
    updateStatus("Learning Kannada Numbers: listen and tap Next.");
    return;
  }

  if (topic === "hindi_opposites_learning") {
    const setNumber = getSelectedHindiSetNumber();
    const theme = getSelectedHindiSetTheme();
    learnTitle.textContent = `${theme.icon} Hindi Opposites — Set ${setNumber}: ${theme.name}`;
    updateStatus(`Ready, little explorer? Tap both pictures and earn all ${HINDI_SET_SIZE} stars!`);
    return;
  }

  if (topic === "hindi_synonyms_learning") {
    const setNumber = getSelectedHindiSynonymSetNumber();
    const theme = HINDI_SYNONYM_SET_THEMES[setNumber - 1];
    learnTitle.textContent = `${theme.icon} Hindi Synonyms — Set ${setNumber}: ${theme.name}`;
    updateStatus(items[0]?.focusPair
      ? `Practice ${items.reduce((total, item) => total + item.synonyms.length, 0)} selected synonym relationships across ${items.length} words.`
      : `Explore ${items.length} picture words and learn three synonyms for each one!`);
    return;
  }

  if (topic === "hindi_conversations_learning") {
    learnTitle.textContent = "💬 Hindi Conversations";
    updateStatus(`Learn ${items.length} everyday conversations with Hindi audio and English meaning.`);
    return;
  }

  if (topic === "hindi_pronouns_learning") {
    learnTitle.textContent = "🙋 Hindi Sarvanam / Pronouns";
    updateStatus(`Learn ${items.length} common Hindi pronouns and see each one in a sentence.`);
    return;
  }

  const label =
    topic === "varnamaale_all"
      ? "All"
      : topic === "varnamaale_swara"
        ? "Swara"
        : "Vyanjana";
  learnTitle.textContent = `Varnamaale Learning (${label})`;
  updateStatus(`Learning Varnamaale (${label}): listen and tap Next.`);
}

function startBoostupMatch() {
  if (state.mode !== "learn") {
    return;
  }

  const allItems = getLearningItems(state.learn.topic);
  if (allItems.length < 2) {
    return;
  }

  state.learn.optionPool = allItems;
  state.learn.items = shuffle(allItems);
  state.learn.index = 0;
  state.learn.score = 0;
  state.learn.mistakes = 0;
  state.learn.mistakeById = {};
  state.learn.retryMode = false;
  state.learn.boostupActive = true;
  state.learn.boostupRound = 1;
  state.learn.phase = "quiz";
  state.learn.selectedOptionId = null;

  const firstItem = currentLearnItem();
  if (!firstItem) {
    return;
  }

  state.learn.options = buildQuizOptions(firstItem);
  learnTitle.textContent = "Boostup Match";
  renderLearning();
  speakItem(firstItem);
  updateStatus("Boostup Match started: pick the correct letter for each sound.");
}

function startBoostupRetryRound() {
  const mistakeIds = Object.keys(state.learn.mistakeById).filter((itemId) => state.learn.mistakeById[itemId] > 0);
  if (mistakeIds.length === 0) {
    return false;
  }

  const retryItems = state.learn.optionPool.filter((item) => mistakeIds.includes(item.id));
  if (retryItems.length === 0) {
    return false;
  }

  state.learn.items = shuffle(retryItems);
  state.learn.index = 0;
  state.learn.score = 0;
  state.learn.mistakes = 0;
  state.learn.mistakeById = {};
  state.learn.retryMode = true;
  state.learn.phase = "quiz";
  state.learn.selectedOptionId = null;
  state.learn.boostupRound += 1;

  const firstRetryItem = currentLearnItem();
  if (!firstRetryItem) {
    return false;
  }

  state.learn.options = buildQuizOptions(firstRetryItem);
  learnTitle.textContent = `Boostup Match (Round ${state.learn.boostupRound})`;
  renderLearning();
  speakItem(firstRetryItem);
  updateStatus("Boostup retry: focus on the letters missed in the previous round.");
  return true;
}

function currentLearnItem() {
  return state.learn.items[state.learn.index] || null;
}

function buildQuizOptions(correctItem) {
  const desiredCount = LEARN_OPTION_COUNT[state.learn.topic] || 6;
  const optionPool = state.learn.optionPool.length > 0 ? state.learn.optionPool : state.learn.items;
  const poolWithoutCorrect = optionPool.filter((item) => item.id !== correctItem.id);
  const distractors = shuffle(poolWithoutCorrect).slice(0, Math.max(desiredCount - 1, 1));
  return shuffle([correctItem, ...distractors]);
}

function handleLearnOptionClick(optionItem) {
  if (state.learn.phase !== "quiz") {
    return;
  }

  const correctItem = currentLearnItem();
  if (!correctItem) {
    return;
  }

  state.learn.selectedOptionId = optionItem.id;

  const isCorrect = optionItem.id === correctItem.id;
  if (isCorrect) {
    state.learn.score += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    updateStatus("Correct ✅ Nice! Tap Next.");
  } else {
    state.learn.mistakes += 1;
    state.learn.mistakeById[correctItem.id] = (state.learn.mistakeById[correctItem.id] || 0) + 1;
    state.streak = 0;
    updateStatus(`Wrong ❌. Correct answer: ${correctItem.text}`);
  }

  state.learn.phase = "feedback";
  renderLearning();
}

function advanceLearning() {
  if (state.learn.phase === "done") {
    startLearningMode();
    return;
  }

  if (state.learn.phase === "show") {
    state.learn.index += 1;

    if (state.learn.index >= state.learn.items.length) {
      state.learn.phase = "done";
      renderLearning();
      if (state.learn.topic === "hindi_opposites_learning") {
        showHindiCelebration(`Set ${getSelectedHindiSetNumber()} complete!`);
        updateStatus("All 11 stars collected! शानदार काम! 🌟");
      } else if (state.learn.topic === "hindi_synonyms_learning") {
        showHindiCelebration(`Synonyms Set ${getSelectedHindiSynonymSetNumber()} complete!`);
        updateStatus(`All ${state.learn.items.length} synonym ${state.learn.items[0]?.focusPair ? "focus groups" : "families"} learned! बहुत बढ़िया! 🌼`);
      } else if (state.learn.topic === "hindi_conversations_learning") {
        showHindiCelebration("Conversation lesson complete!");
        updateStatus(`You practised all ${state.learn.items.length} Hindi conversations! बहुत बढ़िया! 💬`);
      } else if (state.learn.topic === "hindi_pronouns_learning") {
        showHindiCelebration("Pronoun lesson complete!");
        updateStatus(`You learned all ${state.learn.items.length} Hindi pronouns! बहुत बढ़िया! 🙋`);
      } else {
        updateStatus("Lesson complete 🎉 Great learning!");
      }
      return;
    }

    state.learn.phase = "show";
    state.learn.options = [];
    state.learn.selectedOptionId = null;
    renderLearning();
    const nextItem = currentLearnItem();
    if (nextItem) {
      speakLearningItem(nextItem);
    }
    updateStatus(state.learn.topic === "hindi_conversations_learning"
      ? "Moved to the next conversation."
      : state.learn.topic === "hindi_pronouns_learning"
        ? "Moved to the next pronoun."
        : "Moved to next letter.");
    return;
  }

  if (state.learn.phase === "quiz") {
    state.learn.phase = "show";
    state.learn.options = [];
    state.learn.selectedOptionId = null;
    if (state.learn.boostupActive) {
      const quizItem = currentLearnItem();
      if (!quizItem) {
        state.learn.phase = "done";
        renderLearning();
        updateStatus("Boostup complete 🎉 Awesome recall!");
        return;
      }

      speakItem(quizItem);
      state.learn.phase = "quiz";
      state.learn.options = buildQuizOptions(quizItem);
      renderLearning();
      return;
    }

    renderLearning();
    return;
  }

  if (state.learn.phase === "feedback") {
    if (state.learn.boostupActive) {
      state.learn.index += 1;

      if (state.learn.index >= state.learn.items.length) {
        const movedToRetry = startBoostupRetryRound();
        if (!movedToRetry) {
          state.learn.phase = "done";
          renderLearning();
          updateStatus("Boostup complete 🎉 Awesome recall!");
        }
        return;
      }

      const nextQuizItem = currentLearnItem();
      if (!nextQuizItem) {
        state.learn.phase = "done";
        renderLearning();
        updateStatus("Boostup complete 🎉 Awesome recall!");
        return;
      }

      state.learn.phase = "quiz";
      state.learn.selectedOptionId = null;
      state.learn.options = buildQuizOptions(nextQuizItem);
      renderLearning();
      speakItem(nextQuizItem);
      updateStatus("Next boostup question ready.");
      return;
    }

    state.learn.phase = "show";
    state.learn.options = [];
    state.learn.selectedOptionId = null;
    renderLearning();
    updateStatus("Learning mode uses Next-only flow.");
  }
}

function goToPreviousLearningItem() {
  if (state.learn.items.length === 0 || state.learn.boostupActive) {
    return;
  }

  if (state.learn.phase === "done") {
    state.learn.index = state.learn.items.length - 1;
  } else if (state.learn.phase === "show" && state.learn.index > 0) {
    state.learn.index -= 1;
  } else {
    return;
  }

  state.learn.phase = "show";
  state.learn.options = [];
  state.learn.selectedOptionId = null;
  renderLearning();
  const item = currentLearnItem();
  if (item) {
    speakLearningItem(item);
  }
  updateStatus(state.learn.topic === "hindi_conversations_learning"
    ? "Moved to the previous conversation."
    : state.learn.topic === "hindi_pronouns_learning"
      ? "Moved to the previous pronoun."
      : "Moved to the previous word.");
}

function renderLearning() {
  const item = currentLearnItem();
  const isHindiOppositesLearning = state.learn.topic === "hindi_opposites_learning";
  const isHindiSynonymsLearning = state.learn.topic === "hindi_synonyms_learning";
  const isHindiConversationLearning = state.learn.topic === "hindi_conversations_learning";
  const isHindiPronounLearning = state.learn.topic === "hindi_pronouns_learning";
  if (!isHindiPronounLearning) {
    learnOptions.classList.remove("hindi-pronoun-grid");
  }

  if (!item && state.learn.phase !== "done") {
    learnStepText.textContent = "No items found for this group.";
    learnCard.classList.remove("hidden");
    learnCard.textContent = "-";
    learnPrompt.textContent = "Please choose another group.";
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "Restart Lesson";
    learnPrimaryBtn.disabled = false;
    learnPreviousBtn.classList.add("hidden");
    learnRetryMistakesBtn.classList.add("hidden");
    updateTracePanel(null);
    state.learn.phase = "done";
    return;
  }

  if (state.learn.phase === "done") {
    const total = state.learn.items.length;
    learnStepText.textContent = state.learn.boostupActive
      ? "Completed Boostup Match"
      : isHindiOppositesLearning
        ? "Completed Hindi Opposites"
      : isHindiSynonymsLearning
        ? "Completed Hindi Synonyms"
      : isHindiConversationLearning
        ? "Completed Hindi Conversations"
      : isHindiPronounLearning
        ? "Completed Hindi Pronouns"
      : state.learn.topic === "gunita"
        ? "Completed Gunitaakshara"
      : state.learn.topic === "ottakshara"
        ? "Completed Ottakshara"
        : "Completed Varnamaale";
    learnCard.classList.remove("hidden");
    learnCard.textContent = "🎉";
    learnPrompt.textContent = state.learn.boostupActive
      ? `Boostup complete for ${total} items. Tap Restart Lesson to continue learning.`
      : `Completed ${total} items. Tap Restart Lesson to practice again.`;
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "Restart Lesson";
    learnPrimaryBtn.disabled = false;
    learnPreviousBtn.textContent = isHindiOppositesLearning
      ? "Previous Pair"
      : isHindiSynonymsLearning
        ? "Previous Word"
        : isHindiConversationLearning
          ? "Previous Conversation"
        : isHindiPronounLearning
          ? "Previous Pronoun"
          : "Previous";
    learnPreviousBtn.disabled = total === 0 || state.learn.boostupActive;
    learnPreviousBtn.classList.toggle("hidden", total === 0 || state.learn.boostupActive);
    const canBoostup = !state.learn.boostupActive && total > 1 && !isHindiOppositesLearning && !isHindiSynonymsLearning && !isHindiConversationLearning && !isHindiPronounLearning;
    learnRetryMistakesBtn.classList.toggle("hidden", !canBoostup);
    updateTracePanel(null);
    return;
  }

  learnRetryMistakesBtn.classList.add("hidden");
  learnPreviousBtn.textContent = isHindiOppositesLearning
    ? "Previous Pair"
    : isHindiSynonymsLearning
      ? "Previous Word"
      : isHindiConversationLearning
        ? "Previous Conversation"
      : isHindiPronounLearning
        ? "Previous Pronoun"
        : "Previous";

  const stepNumber = state.learn.index + 1;
  const total = state.learn.items.length;
  learnStepText.textContent = state.learn.boostupActive
    ? `Boostup Round ${state.learn.boostupRound} • Question ${stepNumber} of ${total}`
    : isHindiOppositesLearning
      ? `${getHindiStarProgress(state.learn.index, total)} • Pair ${stepNumber} of ${total}`
    : isHindiSynonymsLearning
      ? `${getHindiStarProgress(state.learn.index, total)} • Word ${stepNumber} of ${total}`
    : isHindiConversationLearning
      ? `Conversation ${stepNumber} of ${total}`
    : isHindiPronounLearning
      ? `Pronoun ${stepNumber} of ${total}`
      : `Item ${stepNumber} of ${total}`;

  setLearnCardContent(item, false);
  learnCard.onclick = () => {
    speakItem(item);
  };
  updateTracePanel(item);

  if (state.learn.phase === "show") {
    learnPreviousBtn.classList.remove("hidden");
    learnPreviousBtn.disabled = state.learn.index === 0;
    if (isHindiConversationLearning) {
      learnPrompt.textContent = "Tap 🔊 to hear each Hindi sentence. The English explanation appears below it.";
      learnCard.classList.remove("hidden");
      learnCard.textContent = `💬 ${item.title}`;
      learnCard.onclick = () => speakHindiConversation(item);
      learnOptions.innerHTML = "";
      learnOptions.classList.remove("hindi-learning-pair-grid", "hindi-synonym-learning-grid");
      learnOptions.classList.add("hindi-conversation-grid");

      const illustration = document.createElement("img");
      illustration.className = "conversation-illustration";
      illustration.src = item.image;
      illustration.alt = `Illustration for ${item.title}`;
      illustration.loading = "lazy";
      illustration.addEventListener("error", () => illustration.classList.add("hidden"));
      learnOptions.appendChild(illustration);

      const playAllButton = document.createElement("button");
      playAllButton.type = "button";
      playAllButton.className = "conversation-play-all";
      playAllButton.textContent = "🔊 Play full conversation";
      playAllButton.addEventListener("click", () => speakHindiConversation(item));
      learnOptions.appendChild(playAllButton);

      item.lines.forEach((line, lineIndex) => {
        const lineCard = document.createElement("article");
        lineCard.className = "conversation-line-card";

        const header = document.createElement("div");
        header.className = "conversation-line-header";

        const speaker = document.createElement("strong");
        speaker.textContent = `${line.speakerHindi} · ${line.speaker}`;

        const playButton = document.createElement("button");
        playButton.type = "button";
        playButton.className = "conversation-audio-button";
        playButton.textContent = "🔊 Hindi audio";
        playButton.setAttribute("aria-label", `Play Hindi sentence ${lineIndex + 1}`);
        playButton.addEventListener("click", () => {
          speakItem({ text: line.hindi, sound: line.roman });
          updateStatus(`Playing Hindi: ${line.hindi}`);
        });

        const hindi = document.createElement("p");
        hindi.className = "conversation-hindi";
        hindi.textContent = line.hindi;

        const english = document.createElement("p");
        english.className = "conversation-english";
        english.textContent = `English: ${line.english}`;

        header.appendChild(speaker);
        header.appendChild(playButton);
        lineCard.appendChild(header);
        lineCard.appendChild(hindi);
        lineCard.appendChild(english);
        learnOptions.appendChild(lineCard);
      });

      learnPrimaryBtn.textContent = state.learn.index + 1 === total ? "Finish" : "Next Conversation";
      learnPrimaryBtn.disabled = false;
      updateTracePanel(null);
      return;
    }

    if (isHindiPronounLearning) {
      learnPrompt.textContent = "Learn the pronoun, then tap the sentence to hear how it is used.";
      learnCard.classList.remove("hidden");
      learnCard.textContent = `${item.text} — ${item.english}`;
      learnCard.onclick = () => speakItem(item);
      learnOptions.innerHTML = "";
      learnOptions.classList.remove("hindi-learning-pair-grid", "hindi-synonym-learning-grid", "hindi-conversation-grid");
      learnOptions.classList.add("hindi-pronoun-grid");

      const exampleCard = document.createElement("button");
      exampleCard.type = "button";
      exampleCard.className = "learn-option hindi-pronoun-example";
      exampleCard.setAttribute("aria-label", `Play example sentence: ${item.exampleHindi}`);

      const hindi = document.createElement("strong");
      hindi.className = "hindi-pronoun-example-hindi";
      hindi.textContent = `🔊 ${item.exampleHindi}`;

      const english = document.createElement("span");
      english.className = "hindi-pronoun-example-english";
      english.textContent = `English: ${item.exampleEnglish}`;

      exampleCard.appendChild(hindi);
      exampleCard.appendChild(english);
      exampleCard.addEventListener("click", () => {
        speakItem({ text: item.exampleHindi, sound: item.exampleHindi });
        updateStatus(`Example: ${item.exampleHindi} — ${item.exampleEnglish}`);
      });
      learnOptions.appendChild(exampleCard);

      learnPrimaryBtn.textContent = state.learn.index + 1 === total ? "Finish" : "Next Pronoun";
      learnPrimaryBtn.disabled = false;
      updateTracePanel(null);
      return;
    }

    if (isHindiSynonymsLearning) {
      learnPrompt.textContent = "Tap the picture or any synonym to hear it aloud.";
      learnCard.classList.remove("hidden");
      learnCard.textContent = `${item.text} (${item.english})`;
      learnCard.onclick = () => speakItem(item);
      learnOptions.innerHTML = "";
      learnOptions.classList.remove("hindi-learning-pair-grid", "hindi-conversation-grid");
      learnOptions.classList.add("hindi-synonym-learning-grid");

      const pictureButton = document.createElement("button");
      pictureButton.type = "button";
      pictureButton.className = "learn-option hindi-synonym-picture";
      pictureButton.setAttribute("aria-label", `Play ${item.text}`);
      const image = document.createElement("img");
      image.className = "hindi-synonym-image";
      attachHindiSynonymImageSource(image, item.text);
      image.alt = item.text;
      pictureButton.appendChild(image);
      pictureButton.addEventListener("click", () => speakItem(item));

      const synonymList = document.createElement("div");
      synonymList.className = "hindi-synonym-list";
      synonymList.classList.toggle("focus-pair", item.focusPair === true);
      item.synonyms.forEach((synonym) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "learn-option hindi-synonym-chip";
        button.textContent = `🔊 ${synonym}`;
        button.addEventListener("click", () => {
          speakItem({ text: synonym, sound: synonym });
          updateStatus(`${item.text} का समानार्थी शब्द: ${synonym}`);
        });
        synonymList.appendChild(button);
      });

      learnOptions.appendChild(pictureButton);
      learnOptions.appendChild(synonymList);
      learnPrimaryBtn.textContent = state.learn.index + 1 === total ? "Finish" : "Next Word";
      learnPrimaryBtn.disabled = false;
      updateTracePanel(null);
      return;
    }

    if (isHindiOppositesLearning) {
      learnPrompt.textContent = "Tap each picture to hear the word and its opposite.";
      learnCard.classList.remove("hidden");
      learnCard.textContent = "विलोम शब्द";
      learnCard.onclick = null;
      learnOptions.innerHTML = "";
      learnOptions.classList.remove("hindi-synonym-learning-grid", "hindi-conversation-grid");
      learnOptions.classList.add("hindi-learning-pair-grid");

      const createPairButton = (wordText, wordAudio) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "learn-option hindi-learning-pair-option";
        button.setAttribute("aria-label", `Play ${wordText}`);

        const image = document.createElement("img");
        image.className = "hindi-learning-pair-image";
        attachHindiImageSource(image, wordText);
        image.alt = wordText;
        image.loading = "lazy";

        const label = document.createElement("span");
        label.className = "hindi-learning-pair-label";
        label.textContent = getHindiWordLabel(wordText);

        const audioBadge = document.createElement("span");
        audioBadge.className = "hindi-learning-audio-badge";
        audioBadge.textContent = "🔊";

        button.appendChild(image);
        button.appendChild(audioBadge);
        button.appendChild(label);
        button.addEventListener("click", () => {
          speakItem({ text: wordText, sound: wordText, audio: wordAudio || null });
          updateStatus(`🔊 ${getHindiWordLabel(wordText)} — now tap its opposite too!`);
        });

        return button;
      };

      learnOptions.appendChild(createPairButton(item.text, item.audio));
      learnOptions.appendChild(createPairButton(item.oppositeText, item.oppositeAudio));
      learnPrimaryBtn.textContent = state.learn.index + 1 === total ? "Finish" : "Next Pair";
      learnPrimaryBtn.disabled = false;
      updateTracePanel(null);
      return;
    }

    learnOptions.classList.remove("hindi-learning-pair-grid", "hindi-synonym-learning-grid", "hindi-conversation-grid");
    learnPrompt.textContent = `Listen and repeat: ${getBaseSound(item.sound)} (tap card to hear)`;
    learnOptions.innerHTML = "";
    learnCard.classList.remove("hidden");
    setLearnCardContent(item, state.learn.topic === "gunita");
    learnCard.onclick = () => {
      speakItem(item);
    };
    learnPrimaryBtn.textContent = state.learn.index + 1 === total ? "Finish" : "Next";
    learnPrimaryBtn.disabled = false;
    return;
  }

  if (state.learn.phase === "quiz") {
    learnPreviousBtn.classList.add("hidden");
    learnOptions.classList.remove("hindi-learning-pair-grid", "hindi-conversation-grid");
    learnPrompt.textContent = state.learn.boostupActive
      ? "Boostup: listen to the sound and pick the correct Kannada letter."
      : "Listen to the sound and pick the correct Kannada.";
    learnCard.classList.add("hidden");
    learnCard.textContent = "";
    learnCard.onclick = null;
    learnOptions.innerHTML = "";

    state.learn.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "learn-option";
      setLearnOptionContent(button, option);
      button.addEventListener("click", () => handleLearnOptionClick(option));
      learnOptions.appendChild(button);
    });

    learnPrimaryBtn.textContent = "🔊 Play Sound Again";
    learnPrimaryBtn.disabled = false;
    return;
  }

  if (state.learn.phase === "feedback") {
    learnPreviousBtn.classList.add("hidden");
    learnOptions.classList.remove("hindi-learning-pair-grid", "hindi-conversation-grid");
    learnPrompt.textContent = state.learn.boostupActive
      ? `Boostup answer check for: ${getBaseSound(item.sound)}`
      : `Answer check for: ${getBaseSound(item.sound)}`;
    learnCard.classList.remove("hidden");
    setLearnCardContent(item, state.learn.topic === "gunita");
    learnCard.onclick = () => {
      speakItem(item);
    };
    learnOptions.innerHTML = "";

    state.learn.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "learn-option";
      setLearnOptionContent(button, option);

      const isCorrect = option.id === item.id;
      const isSelected = option.id === state.learn.selectedOptionId;

      if (isCorrect) {
        button.classList.add("correct");
      } else if (isSelected) {
        button.classList.add("incorrect");
      }

      button.disabled = true;
      learnOptions.appendChild(button);
    });

    learnPrimaryBtn.textContent = state.learn.index + 1 === state.learn.items.length ? "Finish" : "Next";
    learnPrimaryBtn.disabled = false;
  }
}

function currentQuizItem() {
  return state.quiz.items[state.quiz.index] || null;
}

function buildQuiz49Choices(correctItem) {
  if (state.quiz.topic === "hindi_pronouns_quiz") {
    const distractors = shuffle(
      state.quiz.items
        .filter((item) => item.id !== correctItem.id && item.english !== correctItem.english)
        .map((item) => ({ id: item.id, text: item.english, sound: item.english })),
    ).slice(0, 3);
    return shuffle([
      { id: correctItem.id, text: correctItem.english, sound: correctItem.english },
      ...distractors,
    ]);
  }

  if (state.quiz.topic === "hindi_conversations_quiz") {
    const uniqueDistractors = Array.from(new Map(
      state.quiz.items
        .filter((item) => item.id !== correctItem.id && item.text !== correctItem.text)
        .map((item) => [item.text, { id: item.id, text: item.text, sound: item.sound }]),
    ).values());
    const distractors = shuffle(uniqueDistractors).slice(0, 3);
    return shuffle([
      { id: correctItem.id, text: correctItem.text, sound: correctItem.sound },
      ...distractors,
    ]);
  }

  if (state.quiz.topic === "hindi_synonyms_quiz") {
    const distractors = shuffle(
      state.quiz.items
        .filter((item) => item.text !== correctItem.text)
        .map((item) => ({
          id: item.id,
          text: item.answerText,
          sound: item.answerText,
        })),
    ).slice(0, 3);
    return shuffle([
      { id: correctItem.id, text: correctItem.answerText, sound: correctItem.answerText },
      ...distractors,
    ]);
  }

  if (state.quiz.topic === "hindi_opposites_picture_quiz") {
    const distractors = shuffle(
      state.quiz.items
        .filter((item) => item.id !== correctItem.id)
        .map((item) => ({
          id: item.id,
          text: item.oppositeText,
          sound: item.oppositeText,
          audio: item.oppositeAudio || null,
        })),
    ).slice(0, 3);
    return shuffle([
      {
        id: correctItem.id,
        text: correctItem.oppositeText,
        sound: correctItem.oppositeText,
        audio: correctItem.oppositeAudio || null,
      },
      ...distractors,
    ]);
  }

  if (state.quiz.topic === "hindi_opposites_quiz") {
    return shuffle(
      state.quiz.items.map((item) => ({
        id: item.id,
        text: item.oppositeText,
        sound: item.oppositeText,
        audio: item.oppositeAudio || null,
      })),
    );
  }

  if (state.quiz.topic === "gunita_quiz") {
    const sameConsonantPool = state.quiz.items.filter(
      (item) => item.consonantId === correctItem.consonantId && item.id !== correctItem.id,
    );
    const distractors = shuffle(sameConsonantPool).slice(0, 3);
    return shuffle([correctItem, ...distractors]);
  }

  const levelId = state.quiz.topic === "numbers_quiz" ? "numbers" : "varnamaale";
  const activeLevel = getLevelById(levelId);
  if (!activeLevel) {
    return [correctItem];
  }

  const distractors = shuffle(activeLevel.items.filter((item) => item.id !== correctItem.id)).slice(0, 3);
  return shuffle([correctItem, ...distractors]);
}

function buildGunitaQuizItems() {
  const gunitaLevel = getLevelById("gunita");
  if (!gunitaLevel) {
    return [];
  }

  const seriesIds = [...new Set(gunitaLevel.items.map((item) => item.seriesId).filter(Boolean))];
  if (seriesIds.length === 0) {
    return [];
  }

  const chosenSeriesId = seriesIds[Math.floor(Math.random() * seriesIds.length)];
  return gunitaLevel.items
    .filter((item) => item.seriesId === chosenSeriesId)
    .map((item) => ({ ...item, consonantId: chosenSeriesId }));
}

function buildHindiOppositesQuizItems() {
  const setIndex = getSelectedHindiSetIndex();
  const startIndex = setIndex * HINDI_SET_SIZE;
  return HINDI_OPPOSITES_PAIRS.map(([text, oppositeText], index) => ({
    id: `hindi-opposites-${index}`,
    text,
    sound: text,
    audio: HINDI_OPPOSITES_AUDIO_MAP[text] || null,
    oppositeText,
    oppositeAudio: HINDI_OPPOSITES_AUDIO_MAP[oppositeText] || null,
  })).slice(startIndex, startIndex + HINDI_SET_SIZE);
}

function buildHindiSynonymsQuizItems() {
  const questions = getHindiSynonymItems().flatMap((item) =>
    (item.focusPair ? item.synonyms : shuffle(item.synonyms).slice(0, 2)).map((answerText, questionIndex) => ({
      ...item,
      id: `${item.id}-question-${questionIndex}`,
      answerText,
    })),
  );
  return shuffle(questions);
}

function buildHindiConversationQuizItems() {
  return HINDI_CONVERSATIONS.flatMap((conversation) =>
    conversation.lines.map((line, lineIndex) => ({
      id: `hindi-conversation-${conversation.id}-${lineIndex}`,
      text: line.hindi,
      sound: line.hindi,
      roman: line.roman,
      english: `${line.speaker}: ${line.english}`,
      conversationTitle: conversation.title,
    })),
  );
}

function buildHindiPronounQuizItems() {
  return getHindiPronounItems().map((item) => ({
    id: `${item.id}-quiz`,
    text: item.exampleHindi,
    sound: item.exampleHindi,
    english: item.exampleEnglish,
    pronoun: item.text,
    pronounEnglish: item.english,
  }));
}

function getHindiWordImagePath(word) {
  const fileWord = word === "नीचा" ? "नीच" : word;
  return `hindi_word_images/${fileWord}.png`;
}

function attachHindiImageSource(imageElement, word) {
  const fileWord = word === "नीचा" ? "नीच" : word;
  const directPath = `hindi_word_images/${fileWord}.png?v=${HINDI_IMAGE_VERSION}`;
  const encodedPath = `hindi_word_images/${encodeURIComponent(fileWord)}.png?v=${HINDI_IMAGE_VERSION}`;
  imageElement.src = directPath;
  imageElement.onerror = () => {
    if (imageElement.src.includes(encodeURIComponent(fileWord))) {
      imageElement.classList.add("hidden");
      return;
    }
    imageElement.src = encodedPath;
  };
}

function attachHindiSynonymImageSource(imageElement, word) {
  const directPath = `hindi_synonym_images/${word}.png?v=${HINDI_SYNONYM_IMAGE_VERSION}`;
  const encodedPath = `hindi_synonym_images/${encodeURIComponent(word)}.png?v=${HINDI_SYNONYM_IMAGE_VERSION}`;
  imageElement.src = directPath;
  imageElement.onerror = () => {
    if (imageElement.src.includes(encodeURIComponent(word))) {
      imageElement.classList.add("hidden");
      return;
    }
    imageElement.src = encodedPath;
  };
}

function prepareHindiOppositesSet(setIndex) {
  const activeSet = state.quiz.match.sets[setIndex] || [];
  state.quiz.match.setIndex = setIndex;
  state.quiz.match.leftChoices = shuffle(
    activeSet.map((pair) => ({
      id: pair.id,
      text: pair.text,
      sound: pair.text,
      audio: pair.audio || null,
    })),
  );
  state.quiz.match.rightChoices = shuffle(
    activeSet.map((pair) => ({
      id: pair.id,
      text: pair.oppositeText,
      sound: pair.oppositeText,
      audio: pair.oppositeAudio || null,
    })),
  );
  state.quiz.match.matchedIds = new Set();
  state.quiz.match.selectedLeftId = null;
  state.quiz.match.selectedRightId = null;
}

function handleHindiOppositesSelect(side, choiceId) {
  const matchState = state.quiz.match;
  const pool = side === "left" ? matchState.leftChoices : matchState.rightChoices;
  const choice = pool.find((entry) => entry.id === choiceId);
  if (!choice || matchState.matchedIds.has(choice.id)) {
    return;
  }

  speakItem(choice);
  if (side === "left") {
    matchState.selectedLeftId = choice.id;
  } else {
    matchState.selectedRightId = choice.id;
  }

  if (!matchState.selectedLeftId || !matchState.selectedRightId) {
    renderQuiz49();
    updateStatus("Word selected. Now tap its opposite.");
    return;
  }

  const isCorrect = matchState.selectedLeftId === matchState.selectedRightId;
  if (isCorrect) {
    matchState.matchedIds.add(matchState.selectedLeftId);
    state.quiz.score += 1;
    state.quiz.index += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    const activeSetSize = matchState.sets[matchState.setIndex]?.length || HINDI_SET_SIZE;
    const message = HINDI_CORRECT_MESSAGES[(state.quiz.score - 1) % HINDI_CORRECT_MESSAGES.length];
    updateStatus(`${message} ${getHindiStarProgress(matchState.matchedIds.size, activeSetSize)}`);
  } else {
    state.quiz.mistakes += 1;
    state.quiz.mistakeById[matchState.selectedLeftId] = (state.quiz.mistakeById[matchState.selectedLeftId] || 0) + 1;
    state.streak = 0;
    updateStatus("Almost! सुनो और फिर कोशिश करो — listen and try again 💪");
  }

  matchState.selectedLeftId = null;
  matchState.selectedRightId = null;
  renderQuiz49();
}

function renderQuizMistakeSummary() {
  quizMistakeSummaryList.innerHTML = "";
  const entries = Object.entries(state.quiz.mistakeById)
    .map(([itemId, count]) => {
      const item = state.quiz.items.find((candidate) => candidate.id === itemId);
      return { item, count };
    })
    .filter((entry) => entry.item && entry.count > 0)
    .sort((left, right) => right.count - left.count);

  if (entries.length === 0) {
    quizMistakeSummaryEmpty.classList.remove("hidden");
    return;
  }

  quizMistakeSummaryEmpty.classList.add("hidden");
  entries.forEach((entry) => {
    const row = document.createElement("li");
    row.textContent = state.quiz.topic === "hindi_opposites_quiz"
      ? `${entry.item.text} → ${entry.item.oppositeText}: ${entry.count}`
      : state.quiz.topic === "hindi_synonyms_quiz"
        ? `${entry.item.text} → ${entry.item.answerText}: ${entry.count}`
        : state.quiz.topic === "hindi_conversations_quiz"
          ? `${entry.item.english} → ${entry.item.text}: ${entry.count}`
        : state.quiz.topic === "hindi_pronouns_quiz"
          ? `${entry.item.text} → ${entry.item.english}: ${entry.count}`
        : `${entry.item.text} (${getBaseSound(entry.item.sound)}): ${entry.count}`;
    quizMistakeSummaryList.appendChild(row);
  });
}

function renderQuiz49() {
  const total = state.quiz.items.length;
  const isGunitaQuiz = state.quiz.topic === "gunita_quiz";
  const isNumbersQuiz = state.quiz.topic === "numbers_quiz";
  const isHindiOppositesQuiz = state.quiz.topic === "hindi_opposites_quiz";
  const isHindiOppositesPictureQuiz = state.quiz.topic === "hindi_opposites_picture_quiz";
  const isHindiSynonymsQuiz = state.quiz.topic === "hindi_synonyms_quiz";
  const isHindiConversationQuiz = state.quiz.topic === "hindi_conversations_quiz";
  const isHindiPronounQuiz = state.quiz.topic === "hindi_pronouns_quiz";
  const setTotal = state.quiz.match.sets.length;
  const setIndex = state.quiz.match.setIndex;
  const activeSet = state.quiz.match.sets[setIndex] || [];
  const matchedCount = state.quiz.match.matchedIds.size;
  quizNextBtn.textContent = isHindiOppositesQuiz
    ? (setIndex >= setTotal - 1 ? "Finish Quiz" : "Next Set")
    : isHindiOppositesPictureQuiz
      ? "Next Picture"
    : isHindiSynonymsQuiz
      ? "Next Word"
    : isHindiConversationQuiz
      ? "Next Sentence"
    : isHindiPronounQuiz
      ? "Next Sentence"
    : "Next Letter";

  if (state.quiz.done) {
    const completedLabel = isHindiOppositesQuiz
      ? "opposites"
      : isHindiOppositesPictureQuiz
        ? "pictures"
      : isHindiSynonymsQuiz
        ? "words"
      : isHindiConversationQuiz
        ? "sentences"
      : isHindiPronounQuiz
        ? "sentences"
        : isNumbersQuiz
          ? "numbers"
          : "letters";
    quizStepText.textContent = `Completed all ${total} ${completedLabel}`;
    quizPrompt.textContent = "Quiz complete! Check mistakes summary below.";
    quizLetterCard.classList.remove("conversation-quiz-prompt");
    quizLetterCard.textContent = state.quiz.mistakes === 0 ? "🎉" : "✅";
    quizOptions.innerHTML = "";
    quizOptions.classList.remove("conversation-quiz-options");
    quizOptions.classList.remove("hidden");
    quizDropdownWrap.classList.add("hidden");
    quizAnswerSelect.innerHTML = '<option value="">Select the opposite word</option>';
    quizPlayPromptBtn.classList.add("hidden");
    quizNextBtn.disabled = true;
    quizMistakeSummary.classList.remove("hidden");
    renderQuizMistakeSummary();
    return;
  }

  const item = currentQuizItem();
  if (!item) {
    state.quiz.done = true;
    renderQuiz49();
    return;
  }

  quizMistakeSummary.classList.add("hidden");
  quizStepText.textContent = isHindiOppositesQuiz
    ? `${getHindiStarProgress(matchedCount, activeSet.length)} • Matched ${matchedCount}/${activeSet.length}`
    : `Item ${state.quiz.index + 1} of ${total}`;
  quizPrompt.textContent = isGunitaQuiz
    ? "Listen to the sound and choose the correct Kannada."
    : isHindiOppositesQuiz
      ? "Match each left word with its opposite on the right."
    : isHindiOppositesPictureQuiz
      ? "Listen and choose the opposite word."
    : isHindiSynonymsQuiz
      ? "Which word is a synonym (समानार्थी शब्द)?"
    : isHindiConversationQuiz
      ? "How do you say this sentence in Hindi?"
    : isHindiPronounQuiz
      ? "Choose the correct English meaning for this Hindi sentence."
    : isNumbersQuiz
      ? "What is this Kannada number called?"
      : "What sound does this Kannada letter make?";

  if (isHindiPronounQuiz) {
    quizLetterCard.innerHTML = "";
    quizLetterCard.classList.add("conversation-quiz-prompt");
    const context = document.createElement("span");
    context.className = "conversation-quiz-context";
    context.textContent = `Sarvanam: ${item.pronoun} — ${item.pronounEnglish}`;
    const hindi = document.createElement("strong");
    hindi.textContent = item.text;
    quizLetterCard.appendChild(context);
    quizLetterCard.appendChild(hindi);
  } else if (isHindiConversationQuiz) {
    quizLetterCard.innerHTML = "";
    quizLetterCard.classList.add("conversation-quiz-prompt");
    const context = document.createElement("span");
    context.className = "conversation-quiz-context";
    context.textContent = item.conversationTitle;
    const english = document.createElement("strong");
    english.textContent = item.english;
    quizLetterCard.appendChild(context);
    quizLetterCard.appendChild(english);
  } else if (isHindiSynonymsQuiz) {
    quizLetterCard.classList.remove("conversation-quiz-prompt");
    quizLetterCard.innerHTML = "";
    const image = document.createElement("img");
    image.className = "quiz-picture-prompt hindi-synonym-quiz-image";
    attachHindiSynonymImageSource(image, item.text);
    image.alt = item.text;
    const label = document.createElement("span");
    label.className = "hindi-synonym-quiz-label";
    label.textContent = `${item.text} — ${item.english}`;
    quizLetterCard.appendChild(image);
    quizLetterCard.appendChild(label);
  } else if (isHindiOppositesPictureQuiz) {
    quizLetterCard.classList.remove("conversation-quiz-prompt");
    quizLetterCard.textContent = item.text;
  } else {
    quizLetterCard.classList.remove("conversation-quiz-prompt");
    quizLetterCard.textContent = isHindiOppositesQuiz ? "विलोम शब्द" : isGunitaQuiz ? "🔊" : item.text;
  }

  quizOptions.innerHTML = "";
  quizOptions.classList.toggle("opposites-quiz-options", isHindiOppositesQuiz);
  quizOptions.classList.toggle("conversation-quiz-options", isHindiConversationQuiz || isHindiPronounQuiz);
  quizOptions.classList.remove("hidden");
  quizDropdownWrap.classList.add("hidden");
  quizNextBtn.disabled = isHindiOppositesQuiz
    ? matchedCount !== activeSet.length
    : state.quiz.selectedOptionId === null;
  quizPlayPromptBtn.classList.toggle("hidden", !(isGunitaQuiz || isHindiOppositesPictureQuiz || isHindiSynonymsQuiz || isHindiPronounQuiz));

  if (isHindiOppositesQuiz) {
    const grid = document.createElement("div");
    grid.className = "opposites-match-grid";

    const leftColumn = document.createElement("div");
    leftColumn.className = "opposites-match-column text-only";

    const rightColumn = document.createElement("div");
    rightColumn.className = "opposites-match-column text-only";

    state.quiz.match.leftChoices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "learn-option quiz-sound-option opposites-match-option";
      button.setAttribute("aria-label", `Select and play ${choice.text}`);

      const audioBadge = document.createElement("span");
      audioBadge.className = "opposites-audio-badge";
      audioBadge.textContent = "🔊";

      const wordLabel = document.createElement("span");
      wordLabel.className = "opposites-word-label";
      wordLabel.textContent = choice.text;

      button.appendChild(audioBadge);
      button.appendChild(wordLabel);
      if (state.quiz.match.matchedIds.has(choice.id)) {
        button.classList.add("correct");
        button.disabled = true;
      } else if (state.quiz.match.selectedLeftId === choice.id) {
        button.classList.add("selected");
      }
      button.addEventListener("click", () => handleHindiOppositesSelect("left", choice.id));
      leftColumn.appendChild(button);
    });

    state.quiz.match.rightChoices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "learn-option quiz-sound-option opposites-match-option";
      button.setAttribute("aria-label", `Select and play ${choice.text}`);

      const audioBadge = document.createElement("span");
      audioBadge.className = "opposites-audio-badge";
      audioBadge.textContent = "🔊";

      const wordLabel = document.createElement("span");
      wordLabel.className = "opposites-word-label";
      wordLabel.textContent = choice.text;

      button.appendChild(audioBadge);
      button.appendChild(wordLabel);
      if (state.quiz.match.matchedIds.has(choice.id)) {
        button.classList.add("correct");
        button.disabled = true;
      } else if (state.quiz.match.selectedRightId === choice.id) {
        button.classList.add("selected");
      }
      button.addEventListener("click", () => handleHindiOppositesSelect("right", choice.id));
      rightColumn.appendChild(button);
    });

    grid.appendChild(leftColumn);
    grid.appendChild(rightColumn);
    quizOptions.appendChild(grid);
    return;
  }

  state.quiz.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "learn-option quiz-sound-option";
    button.classList.toggle("conversation-quiz-option", isHindiConversationQuiz || isHindiPronounQuiz);
    button.textContent = isHindiPronounQuiz
      ? choice.text
      : isGunitaQuiz
      ? choice.text
      : isNumbersQuiz
        ? `${choice.text} — ${choice.sound}`
        : `🔊 ${choice.text || choice.sound}`;
    if (choice.id === state.quiz.selectedOptionId) {
      button.classList.add("selected");
    }
    button.addEventListener("click", () => handleQuiz49Choice(choice.id));
    quizOptions.appendChild(button);
  });
}

function handleQuiz49Choice(choiceId) {
  if (state.quiz.topic === "hindi_opposites_quiz") {
    return;
  }

  if (state.quiz.done) {
    return;
  }

  if (!currentQuizItem()) {
    return;
  }

  const choice = state.quiz.choices.find((candidate) => candidate.id === choiceId);
  if (!choice) {
    return;
  }

  state.quiz.selectedOptionId = choice.id;
  if (state.quiz.topic === "gunita_quiz") {
    speakItem(currentQuizItem());
  } else {
    speakItem(choice);
  }
  renderQuiz49();
  updateStatus(state.quiz.topic === "hindi_opposites_picture_quiz"
    ? "Option selected. Tap Next Picture."
    : state.quiz.topic === "hindi_synonyms_quiz"
      ? "Option selected. Tap Next Word."
    : state.quiz.topic === "hindi_conversations_quiz"
      ? "Hindi sentence selected. Tap Next Sentence to check it."
    : state.quiz.topic === "hindi_pronouns_quiz"
      ? "English sentence selected. Tap Next Sentence to check it."
      : "Option selected. Tap Next Letter.");
}

function advanceQuiz49() {
  if (state.quiz.topic === "hindi_opposites_quiz") {
    if (state.quiz.done) {
      return;
    }

    const activeSet = state.quiz.match.sets[state.quiz.match.setIndex] || [];
    if (state.quiz.match.matchedIds.size !== activeSet.length) {
      updateStatus(`Complete all ${activeSet.length} matches in this set first.`);
      return;
    }

    if (state.quiz.match.setIndex < state.quiz.match.sets.length - 1) {
      prepareHindiOppositesSet(state.quiz.match.setIndex + 1);
      renderQuiz49();
      updateStatus("Next set started. Match all opposites.");
      return;
    }

    state.quiz.done = true;
    renderQuiz49();
    showHindiCelebration(`Quiz Set ${getSelectedHindiSetNumber()} complete!`);
    updateStatus("Quiz complete — you collected every star! शानदार! 🏆");
    return;
  }

  if (state.quiz.done) {
    return;
  }

  const item = currentQuizItem();
  if (!item) {
    return;
  }

  if (!state.quiz.selectedOptionId) {
    updateStatus(state.quiz.topic === "hindi_synonyms_quiz"
      ? "Select a synonym first, then tap Next Word."
      : state.quiz.topic === "hindi_conversations_quiz"
        ? "Choose the Hindi sentence first, then tap Next Sentence."
      : state.quiz.topic === "hindi_pronouns_quiz"
        ? "Choose an English sentence first, then tap Next Sentence."
      : "Select an option first, then continue.");
    return;
  }

  const isCorrect = state.quiz.selectedOptionId === item.id;
  if (isCorrect) {
    state.quiz.score += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
  } else {
    state.quiz.mistakes += 1;
    state.quiz.mistakeById[item.id] = (state.quiz.mistakeById[item.id] || 0) + 1;
    state.streak = 0;
  }

  state.quiz.index += 1;
  state.quiz.selectedOptionId = null;

  if (state.quiz.index >= state.quiz.items.length) {
    state.quiz.done = true;
    renderQuiz49();
    if (state.quiz.topic === "hindi_opposites_picture_quiz") {
      showHindiCelebration(`Picture Quiz Set ${getSelectedHindiSetNumber()} complete!`);
      updateStatus("Picture quiz complete! बहुत बढ़िया! 🎉");
    } else if (state.quiz.topic === "hindi_synonyms_quiz") {
      showHindiCelebration(`Synonyms Quiz Set ${getSelectedHindiSynonymSetNumber()} complete!`);
      updateStatus(`All ${state.quiz.items.length} synonym questions completed! शानदार! 🏆`);
    } else if (state.quiz.topic === "hindi_conversations_quiz") {
      showHindiCelebration("Conversation quiz complete!");
      updateStatus(`All ${state.quiz.items.length} English-to-Hindi sentence questions completed! शानदार! 💬`);
    } else if (state.quiz.topic === "hindi_pronouns_quiz") {
      showHindiCelebration("Pronoun quiz complete!");
      updateStatus(`All ${state.quiz.items.length} Hindi-to-English pronoun questions completed! शानदार! 🙋`);
    } else {
      updateStatus("Quiz complete 🎉 Review mistake summary below.");
    }
    return;
  }

  const nextItem = currentQuizItem();
  state.quiz.choices = buildQuiz49Choices(nextItem);
  renderQuiz49();
  updateStatus(state.quiz.topic === "hindi_opposites_picture_quiz"
    ? isCorrect
      ? "सही जवाब! Great choice — here comes the next picture 🌟"
      : `Good try! The opposite was ${item.oppositeText}. Here comes the next picture 💪`
    : state.quiz.topic === "hindi_synonyms_quiz"
      ? isCorrect
        ? "सही जवाब! That is a synonym 🌼"
        : `Good try! A synonym of ${item.text} is ${item.answerText}.`
    : state.quiz.topic === "hindi_conversations_quiz"
      ? isCorrect
        ? "सही जवाब! That is the Hindi sentence 🌟"
        : `Good try! The Hindi sentence is: ${item.text}`
    : state.quiz.topic === "hindi_pronouns_quiz"
      ? isCorrect
        ? "सही जवाब! You matched the English sentence 🌟"
        : `Good try! The English meaning is: ${item.english}`
    : "Moved to next letter.");
}

function startQuiz49Mode() {
  state.quiz.topic = quizTopicSelect?.value || "gunita_quiz";
  configureHindiSetSelect(state.quiz.topic);
  const isGunitaQuiz = state.quiz.topic === "gunita_quiz";
  const isNumbersQuiz = state.quiz.topic === "numbers_quiz";
  const isHindiOppositesQuiz = state.quiz.topic === "hindi_opposites_quiz";
  const isHindiOppositesPictureQuiz = state.quiz.topic === "hindi_opposites_picture_quiz";
  const isHindiSynonymsQuiz = state.quiz.topic === "hindi_synonyms_quiz";
  const isHindiConversationQuiz = state.quiz.topic === "hindi_conversations_quiz";
  const isHindiPronounQuiz = state.quiz.topic === "hindi_pronouns_quiz";
  const activeItems = isGunitaQuiz
    ? buildGunitaQuizItems()
    : isHindiOppositesQuiz
      ? buildHindiOppositesQuizItems()
    : isHindiOppositesPictureQuiz
      ? shuffle(buildHindiOppositesQuizItems())
    : isHindiSynonymsQuiz
      ? buildHindiSynonymsQuizItems()
    : isHindiConversationQuiz
      ? shuffle(buildHindiConversationQuizItems())
    : isHindiPronounQuiz
      ? shuffle(buildHindiPronounQuizItems())
    : isNumbersQuiz
      ? shuffle(getLevelById("numbers")?.items || [])
      : shuffle(getLevelById("varnamaale")?.items || []);
  if (activeItems.length === 0) {
    state.quiz.items = [];
    state.quiz.index = 0;
    state.quiz.score = 0;
    state.quiz.mistakes = 0;
    state.quiz.mistakeById = {};
    state.quiz.choices = [];
    state.quiz.done = true;
    renderQuiz49();
    const missingLabel = isHindiOppositesQuiz
      ? "Hindi Opposites"
      : isHindiOppositesPictureQuiz
        ? "Hindi Opposites Pictures"
      : isHindiSynonymsQuiz
        ? "Hindi Synonyms"
      : isHindiConversationQuiz
        ? "Hindi Conversations"
      : isHindiPronounQuiz
        ? "Hindi Pronouns"
      : isNumbersQuiz
        ? "Numbers"
        : "Varnamaale";
    updateStatus(`Quiz setup failed: ${missingLabel} data missing.`);
    return;
  }

  state.quiz.items = activeItems;
  state.quiz.index = 0;
  state.quiz.score = 0;
  state.quiz.mistakes = 0;
  state.quiz.mistakeById = {};
  state.quiz.selectedOptionId = null;
  state.quiz.done = false;
  state.streak = 0;
  state.bestStreak = 0;
  state.quiz.choices = isHindiOppositesQuiz ? [] : buildQuiz49Choices(state.quiz.items[0]);

  state.quiz.match.sets = [];
  state.quiz.match.setIndex = 0;
  state.quiz.match.leftChoices = [];
  state.quiz.match.rightChoices = [];
  state.quiz.match.matchedIds = new Set();
  state.quiz.match.selectedLeftId = null;
  state.quiz.match.selectedRightId = null;

  if (isHindiOppositesQuiz) {
    state.quiz.match.sets = [state.quiz.items];
    prepareHindiOppositesSet(0);
  }

  quizTitle.textContent = isGunitaQuiz
    ? "Gunitaakshara Quiz"
    : isHindiOppositesQuiz
      ? `Hindi Opposites Match — Set ${getSelectedHindiSetNumber()}`
    : isHindiOppositesPictureQuiz
      ? `Hindi Opposites Picture Quiz — Set ${getSelectedHindiSetNumber()}`
    : isHindiSynonymsQuiz
      ? `Hindi Synonyms Picture Quiz — Set ${getSelectedHindiSynonymSetNumber()}`
    : isHindiConversationQuiz
      ? "Hindi Conversations: English to Hindi"
    : isHindiPronounQuiz
      ? "Hindi Pronouns: Hindi to English"
    : isNumbersQuiz
      ? "Kannada Numbers Quiz"
      : "Letter Quiz (49)";
  renderQuiz49();
  if (isGunitaQuiz) {
    speakItem(state.quiz.items[0]);
    updateStatus("Gunitaakshara Quiz started: one of the 10 consonants across all 12 signs.");
    return;
  }

  if (isNumbersQuiz) {
    updateStatus("Kannada Numbers Quiz started: identify each number name.");
    return;
  }

  if (isHindiOppositesQuiz) {
    const firstSetSize = state.quiz.match.sets[0]?.length || 0;
    updateStatus(`Hindi Opposites Match Set ${getSelectedHindiSetNumber()} started with ${firstSetSize} pairs.`);
    return;
  }

  if (isHindiOppositesPictureQuiz) {
    updateStatus(`Hindi Opposites Picture Quiz Set ${getSelectedHindiSetNumber()} started: choose the opposite from 4 audio options.`);
    return;
  }

  if (isHindiSynonymsQuiz) {
    speakItem(state.quiz.items[0]);
    const wordCount = new Set(state.quiz.items.map((item) => item.text)).size;
    if (state.quiz.items[0]?.focusPair) {
      updateStatus(`Hyper Focus quiz started: ${state.quiz.items.length} selected relationships across ${wordCount} words.`);
    } else {
      updateStatus(`Synonyms Set ${getSelectedHindiSynonymSetNumber()} quiz started: ${state.quiz.items.length} questions, 2 questions per word.`);
    }
    return;
  }

  if (isHindiConversationQuiz) {
    updateStatus(`Conversation quiz started with ${state.quiz.items.length} English prompts. Choose the matching Hindi sentence.`);
    return;
  }

  if (isHindiPronounQuiz) {
    speakItem(state.quiz.items[0]);
    updateStatus(`Pronoun quiz started with ${state.quiz.items.length} Hindi sentences. Choose the matching English sentence.`);
    return;
  }

  updateStatus("Letter Quiz started: choose the correct sound and continue.");
}

function applyTopMode(nextUiMode) {
  state.uiMode = nextUiMode;
  if (nextUiMode !== "quiz") {
    setMode("learn");
    return;
  }

  setMode("quiz49");
}

function setMode(nextMode) {
  state.mode = nextMode;

  document.querySelectorAll(".game-only").forEach((element) => {
    element.classList.toggle("hidden", nextMode !== "game");
  });

  document.querySelectorAll(".learn-only").forEach((element) => {
    element.classList.toggle("hidden", nextMode !== "learn");
  });

  document.querySelectorAll(".quiz-only").forEach((element) => {
    element.classList.toggle("hidden", nextMode !== "quiz49");
  });

  board.classList.toggle("hidden", nextMode !== "game");
  learnPanel.classList.toggle("hidden", nextMode !== "learn");
  quizPanel.classList.toggle("hidden", nextMode !== "quiz49");
  if (nextMode !== "learn") {
    updateTracePanel(null);
  }

  if (nextMode === "game") {
    buildRound();
    return;
  }

  if (nextMode === "quiz49") {
    startQuiz49Mode();
    return;
  }

  startLearningMode();
}

function initControls() {
  KANNADA_LEVELS.forEach((level) => {
    const option = document.createElement("option");
    option.value = level.id;
    option.textContent = level.name;
    levelSelect.appendChild(option);
  });

  levelSelect.value = KANNADA_LEVELS[0].id;

  GUNITA_BASE_LETTERS.forEach((base) => {
    const option = document.createElement("option");
    const firstForm = GUNITA_ITEMS.find((item) => item.seriesId === base.id);
    option.value = base.id;
    option.textContent = `${base.text} — ${firstForm?.sound || base.id}`;
    gunitaSeriesSelect.appendChild(option);
  });

  languageSelect.addEventListener("change", () => {
    syncLanguageDependentTopics();
    applyTopMode(modeSelect.value);
  });
  hindiSetSelect.addEventListener("change", () => applyTopMode(modeSelect.value));
  modeSelect.addEventListener("change", () => applyTopMode(modeSelect.value));
  levelSelect.addEventListener("change", buildRound);
  itemCountSelect.addEventListener("change", buildRound);
  newRoundBtn.addEventListener("click", buildRound);
  nextSetBtn.addEventListener("click", () => {
    const canMove = state.correctCount === state.pairs.length && state.gamePageIndex < state.gamePages.length - 1;
    if (!canMove) {
      if (state.correctCount !== state.pairs.length) {
        updateStatus("Finish current set first to unlock Next Set.");
        return;
      }
      updateStatus("No more sets left in this session.");
      return;
    }
    loadGameSet(state.gamePageIndex + 1);
  });
  learnTopicSelect.addEventListener("change", startLearningMode);
  gunitaSeriesSelect.addEventListener("change", () => {
    if (state.mode === "learn" && learnTopicSelect.value === "gunita") {
      startLearningMode();
    }
  });
  quizTopicSelect.addEventListener("change", () => {
    if (state.mode === "quiz49") {
      startQuiz49Mode();
    }
  });
  restartLearnBtn.addEventListener("click", startLearningMode);
  quizNextBtn.addEventListener("click", advanceQuiz49);
  quizPlayPromptBtn.addEventListener("click", () => {
    const item = currentQuizItem();
    if (state.mode === "quiz49" && state.quiz.topic === "gunita_quiz" && item) {
      speakItem(item);
    }
    if (state.mode === "quiz49" && state.quiz.topic === "hindi_opposites_picture_quiz" && item) {
      speakItem(item);
    }
    if (state.mode === "quiz49" && state.quiz.topic === "hindi_synonyms_quiz" && item) {
      speakItem(item);
    }
    if (state.mode === "quiz49" && state.quiz.topic === "hindi_pronouns_quiz" && item) {
      speakItem(item);
    }
  });
  quizAnswerSelect.addEventListener("change", () => {
    if (state.mode === "quiz49" && state.quiz.topic === "hindi_opposites_quiz") {
      handleQuiz49Choice(quizAnswerSelect.value);
    }
  });
  learnRetryMistakesBtn.addEventListener("click", startBoostupMatch);
  learnPreviousBtn.addEventListener("click", goToPreviousLearningItem);
  learnPrimaryBtn.addEventListener("click", advanceLearning);
  tracePlayBtn.addEventListener("click", playTraceAnimation);
  traceGif.addEventListener("error", () => {
    const currentItem = state.learn.items[state.learn.index];
    traceNote.textContent = currentItem
      ? `Animation could not be loaded for ${currentItem.text}.`
      : "Animation could not be loaded.";
    tracePlayBtn.disabled = true;
  });
  traceGif.addEventListener("load", () => {
    if (currentTraceFilePath) {
      tracePlayBtn.disabled = false;
    }
  });
}

syncLanguageDependentTopics();
initControls();
applyTopMode(modeSelect.value);
