const modeSelect = document.getElementById("modeSelect");
const languageSelect = document.getElementById("languageSelect");
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
const learnPrimaryBtn = document.getElementById("learnPrimaryBtn");
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

const LEARN_OPTION_COUNT = {
  gunita: 4,
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

const GUNITA_SIGN_META = {
  "ka-1": { sign: "", family: "a" },
  kaa: { sign: "ಾ", family: "a" },
  ki: { sign: "ಿ", family: "i" },
  kii: { sign: "ೀ", family: "i" },
  ku: { sign: "ು", family: "u" },
  kuu: { sign: "ೂ", family: "u" },
  ke: { sign: "ೆ", family: "e" },
  kee: { sign: "ೇ", family: "e" },
  kai: { sign: "ೈ", family: "e" },
  ko: { sign: "ೊ", family: "o" },
  koo: { sign: "ೋ", family: "o" },
  kau: { sign: "ೌ", family: "o" },
};

const VARNAMAALE_TRACE_FILES = window.VARNAMAALE_TRACE_FILES || {};
const HINDI_IMAGE_VERSION = "20260804g";

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

const HINDI_OPPOSITES_AUDIO_MAP = {};

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
  kannada: ["gunita", "varnamaale_all", "varnamaale_swara", "varnamaale_vyanjana", "numbers"],
  hindi: ["hindi_opposites_learning"],
};

const QUIZ_TOPICS_BY_LANGUAGE = {
  kannada: ["gunita_quiz", "varnamaale_quiz", "ottakshara_quiz", "numbers_quiz"],
  hindi: ["hindi_opposites_quiz", "hindi_opposites_picture_quiz"],
};

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
  return GUNITA_SIGN_META[item.id] || null;
}

function getGunitaCardHTML(item, withSplit) {
  const gunitaMeta = getGunitaMeta(item);
  if (!gunitaMeta) {
    return item.text;
  }

  const familyClass = `gunita-family-${gunitaMeta.family}`;
  const signText = gunitaMeta.sign || "∅";
  const combined = `<span class="gunita-combo"><span class="gunita-base">ಕ</span><span class="gunita-sign ${familyClass}">${gunitaMeta.sign}</span></span>`;
  const finalJoined = `<span class="gunita-final">${item.text}</span>`;

  if (!withSplit) {
    return finalJoined;
  }

  return `${finalJoined}<div class="gunita-split"><span class="gunita-base">ಕ</span> + <span class="gunita-sign ${familyClass}">${signText}</span> = ${finalJoined}</div>`;
}

function setLearnCardContent(item, withSplit = false) {
  const gunitaMeta = getGunitaMeta(item);
  if (!gunitaMeta) {
    learnCard.textContent = item.text;
    return;
  }
  learnCard.innerHTML = getGunitaCardHTML(item, withSplit);
}

function setLearnOptionContent(button, option) {
  const gunitaMeta = getGunitaMeta(option);
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
  return [...gunitaLevel.items];
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

function getHindiOppositesLearningItems() {
  return HINDI_OPPOSITES_PAIRS.map(([text, oppositeText], index) => ({
    id: `hindi-learning-${index}`,
    text,
    sound: text,
    audio: HINDI_OPPOSITES_AUDIO_MAP[text] || null,
    oppositeText,
    oppositeSound: oppositeText,
    oppositeAudio: HINDI_OPPOSITES_AUDIO_MAP[oppositeText] || null,
  }));
}

function getLearningItems(topic) {
  if (topic === "gunita") {
    return getGunitaItems();
  }
  if (topic === "hindi_opposites_learning") {
    return getHindiOppositesLearningItems();
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
}

function startLearningMode() {
  const topic = learnTopicSelect.value;
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
    speakItem(firstItem);
  }
  updateLearnControlsVisibility();
  if (topic === "gunita") {
    learnTitle.textContent = "Gunitaakshara Learning";
    updateStatus("Learning Gunitaakshara: listen and tap Next.");
    return;
  }

  if (topic === "numbers") {
    learnTitle.textContent = "Kannada Numbers Learning";
    updateStatus("Learning Kannada Numbers: listen and tap Next.");
    return;
  }

  if (topic === "hindi_opposites_learning") {
    learnTitle.textContent = "Hindi Opposites Learning";
    updateStatus("Learning Hindi opposites: tap each picture for audio, then Next.");
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
      updateStatus("Lesson complete 🎉 Great learning!");
      return;
    }

    state.learn.phase = "show";
    state.learn.options = [];
    state.learn.selectedOptionId = null;
    renderLearning();
    const nextItem = currentLearnItem();
    if (nextItem) {
      speakItem(nextItem);
    }
    updateStatus("Moved to next letter.");
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

function renderLearning() {
  const item = currentLearnItem();
  const isHindiOppositesLearning = state.learn.topic === "hindi_opposites_learning";

  if (!item && state.learn.phase !== "done") {
    learnStepText.textContent = "No items found for this group.";
    learnCard.classList.remove("hidden");
    learnCard.textContent = "-";
    learnPrompt.textContent = "Please choose another group.";
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "Restart Lesson";
    learnPrimaryBtn.disabled = false;
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
      : state.learn.topic === "gunita"
        ? "Completed Gunitaakshara"
        : "Completed Varnamaale";
    learnCard.classList.remove("hidden");
    learnCard.textContent = "🎉";
    learnPrompt.textContent = state.learn.boostupActive
      ? `Boostup complete for ${total} items. Tap Restart Lesson to continue learning.`
      : `Completed ${total} items. Tap Restart Lesson to practice again.`;
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "Restart Lesson";
    learnPrimaryBtn.disabled = false;
    const canBoostup = !state.learn.boostupActive && total > 1 && !isHindiOppositesLearning;
    learnRetryMistakesBtn.classList.toggle("hidden", !canBoostup);
    updateTracePanel(null);
    return;
  }

  learnRetryMistakesBtn.classList.add("hidden");

  const stepNumber = state.learn.index + 1;
  const total = state.learn.items.length;
  learnStepText.textContent = state.learn.boostupActive
    ? `Boostup Round ${state.learn.boostupRound} • Question ${stepNumber} of ${total}`
    : `Item ${stepNumber} of ${total}`;

  setLearnCardContent(item, false);
  learnCard.onclick = () => {
    speakItem(item);
  };
  updateTracePanel(item);

  if (state.learn.phase === "show") {
    if (isHindiOppositesLearning) {
      learnPrompt.textContent = "Tap each picture to hear the word and its opposite.";
      learnCard.classList.remove("hidden");
      learnCard.textContent = "विलोम शब्द";
      learnCard.onclick = null;
      learnOptions.innerHTML = "";
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
        label.textContent = wordText;

        const audioBadge = document.createElement("span");
        audioBadge.className = "hindi-learning-audio-badge";
        audioBadge.textContent = "🔊";

        button.appendChild(image);
        button.appendChild(audioBadge);
        button.appendChild(label);
        button.addEventListener("click", () => {
          speakItem({ text: wordText, sound: wordText, audio: wordAudio || null });
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

    learnOptions.classList.remove("hindi-learning-pair-grid");
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
    learnOptions.classList.remove("hindi-learning-pair-grid");
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
    learnOptions.classList.remove("hindi-learning-pair-grid");
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

  const levelId = state.quiz.topic === "numbers_quiz"
    ? "numbers"
    : state.quiz.topic === "ottakshara_quiz"
      ? "ottakshara"
      : "varnamaale";
  const activeLevel = getLevelById(levelId);
  if (!activeLevel) {
    return [correctItem];
  }

  const distractors = shuffle(activeLevel.items.filter((item) => item.id !== correctItem.id)).slice(0, 3);
  return shuffle([correctItem, ...distractors]);
}

function buildGunitaQuizItems() {
  const gunitaLevel = getLevelById("gunita");
  const varnamaaleLevel = getLevelById("varnamaale");
  if (!gunitaLevel || !varnamaaleLevel) {
    return [];
  }

  const consonants = varnamaaleLevel.items.filter((item) => !SWARA_IDS.has(item.id));
  if (consonants.length === 0) {
    return [];
  }

  const chosenConsonant = consonants[Math.floor(Math.random() * consonants.length)];

  return gunitaLevel.items.map((template, index) => {
    const signMeta = GUNITA_SIGN_META[template.id] || { sign: "" };
    const text = `${chosenConsonant.text}${signMeta.sign || ""}`;
    return {
      id: `gunita-q-${index}-${template.id}-${chosenConsonant.id}`,
      sourceId: template.id,
      consonantId: chosenConsonant.id,
      text,
      sound: template.sound,
    };
  });
}

function buildHindiOppositesQuizItems() {
  return HINDI_OPPOSITES_PAIRS.map(([text, oppositeText], index) => ({
    id: `hindi-opposites-${index}`,
    text,
    sound: text,
    audio: HINDI_OPPOSITES_AUDIO_MAP[text] || null,
    oppositeText,
    oppositeAudio: HINDI_OPPOSITES_AUDIO_MAP[oppositeText] || null,
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

function buildHindiOppositesSets(items) {
  const minSetSize = 6;
  const maxSetSize = 7;
  const totalItems = items.length;
  if (totalItems === 0) {
    return [];
  }

  const setCount = Math.ceil(totalItems / maxSetSize);
  const baseSize = Math.floor(totalItems / setCount);
  const remainder = totalItems % setCount;
  const sets = [];
  let index = 0;
  for (let setIndex = 0; setIndex < setCount; setIndex += 1) {
    const currentSetSize = baseSize + (setIndex < remainder ? 1 : 0);
    const normalizedSetSize = Math.min(maxSetSize, Math.max(minSetSize, currentSetSize));
    sets.push(items.slice(index, index + normalizedSetSize));
    index += normalizedSetSize;
  }
  return sets;
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
    updateStatus("Correct opposite match ✅");
  } else {
    state.quiz.mistakes += 1;
    state.quiz.mistakeById[matchState.selectedLeftId] = (state.quiz.mistakeById[matchState.selectedLeftId] || 0) + 1;
    state.streak = 0;
    updateStatus("Not a match. Try again.");
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
  const setTotal = state.quiz.match.sets.length;
  const setIndex = state.quiz.match.setIndex;
  const activeSet = state.quiz.match.sets[setIndex] || [];
  const matchedCount = state.quiz.match.matchedIds.size;
  quizNextBtn.textContent = isHindiOppositesQuiz
    ? (setIndex >= setTotal - 1 ? "Finish Quiz" : "Next Set")
    : isHindiOppositesPictureQuiz
      ? "Next Picture"
    : "Next Letter";

  if (state.quiz.done) {
    const completedLabel = isHindiOppositesQuiz
      ? "opposites"
      : isHindiOppositesPictureQuiz
        ? "pictures"
        : isNumbersQuiz
          ? "numbers"
          : "letters";
    quizStepText.textContent = `Completed all ${total} ${completedLabel}`;
    quizPrompt.textContent = "Quiz complete! Check mistakes summary below.";
    quizLetterCard.textContent = state.quiz.mistakes === 0 ? "🎉" : "✅";
    quizOptions.innerHTML = "";
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
    ? `Set ${setIndex + 1} of ${setTotal} • Matched ${matchedCount}/${activeSet.length}`
    : `Item ${state.quiz.index + 1} of ${total}`;
  quizPrompt.textContent = isGunitaQuiz
    ? "Listen to the sound and choose the correct Kannada."
    : isHindiOppositesQuiz
      ? "Match each left word with its opposite on the right."
    : isHindiOppositesPictureQuiz
      ? "See the picture and choose its opposite word."
    : isNumbersQuiz
      ? "What is this Kannada number called?"
      : "What sound does this Kannada letter make?";

  if (isHindiOppositesPictureQuiz) {
    const imagePath = getHindiWordImagePath(item.text);
    const encodedImagePath = `hindi_word_images/${encodeURIComponent(item.text === "नीचा" ? "नीच" : item.text)}.png`;
    quizLetterCard.innerHTML = `<img class="quiz-picture-prompt" src="${imagePath}?v=${HINDI_IMAGE_VERSION}" alt="${item.text}" onerror="this.onerror=null;this.src='${encodedImagePath}?v=${HINDI_IMAGE_VERSION}'" />`;
  } else {
    quizLetterCard.textContent = isHindiOppositesQuiz ? "विलोम शब्द" : isGunitaQuiz ? "🔊" : item.text;
  }

  quizOptions.innerHTML = "";
  quizOptions.classList.toggle("opposites-quiz-options", isHindiOppositesQuiz);
  quizOptions.classList.remove("hidden");
  quizDropdownWrap.classList.add("hidden");
  quizNextBtn.disabled = isHindiOppositesQuiz
    ? matchedCount !== activeSet.length
    : state.quiz.selectedOptionId === null;
  quizPlayPromptBtn.classList.toggle("hidden", !(isGunitaQuiz || isHindiOppositesPictureQuiz));

  if (isHindiOppositesQuiz) {
    const grid = document.createElement("div");
    grid.className = "opposites-match-grid";

    const leftColumn = document.createElement("div");
    leftColumn.className = "opposites-match-column";

    const rightColumn = document.createElement("div");
    rightColumn.className = "opposites-match-column";

    state.quiz.match.leftChoices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "learn-option quiz-sound-option opposites-match-option";
      button.setAttribute("aria-label", `Select and play ${choice.text}`);

      const image = document.createElement("img");
      image.className = "opposites-match-image";
      attachHindiImageSource(image, choice.text);
      image.alt = choice.text;
      image.loading = "lazy";

      const audioBadge = document.createElement("span");
      audioBadge.className = "opposites-audio-badge";
      audioBadge.textContent = "🔊";

      const wordLabel = document.createElement("span");
      wordLabel.className = "opposites-word-label";
      wordLabel.textContent = choice.text;

      button.appendChild(image);
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

      const image = document.createElement("img");
      image.className = "opposites-match-image";
      attachHindiImageSource(image, choice.text);
      image.alt = choice.text;
      image.loading = "lazy";

      const audioBadge = document.createElement("span");
      audioBadge.className = "opposites-audio-badge";
      audioBadge.textContent = "🔊";

      const wordLabel = document.createElement("span");
      wordLabel.className = "opposites-word-label";
      wordLabel.textContent = choice.text;

      button.appendChild(image);
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
    button.textContent = isGunitaQuiz ? choice.text : `🔊 ${choice.text || choice.sound}`;
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
    updateStatus("Hindi Opposites Match complete 🎉 Review mistake summary below.");
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
    updateStatus("Select an option first, then tap Next Letter.");
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
    updateStatus("Quiz complete 🎉 Review mistake summary below.");
    return;
  }

  const nextItem = currentQuizItem();
  state.quiz.choices = buildQuiz49Choices(nextItem);
  renderQuiz49();
  updateStatus(state.quiz.topic === "hindi_opposites_picture_quiz" ? "Moved to next picture." : "Moved to next letter.");
}

function startQuiz49Mode() {
  state.quiz.topic = quizTopicSelect?.value || "gunita_quiz";
  const isGunitaQuiz = state.quiz.topic === "gunita_quiz";
  const isNumbersQuiz = state.quiz.topic === "numbers_quiz";
  const isOttaksharaQuiz = state.quiz.topic === "ottakshara_quiz";
  const isHindiOppositesQuiz = state.quiz.topic === "hindi_opposites_quiz";
  const isHindiOppositesPictureQuiz = state.quiz.topic === "hindi_opposites_picture_quiz";
  const activeItems = isGunitaQuiz
    ? buildGunitaQuizItems()
    : isHindiOppositesQuiz
      ? buildHindiOppositesQuizItems()
    : isHindiOppositesPictureQuiz
      ? shuffle(buildHindiOppositesQuizItems())
    : isNumbersQuiz
      ? shuffle(getLevelById("numbers")?.items || [])
      : isOttaksharaQuiz
        ? shuffle(getLevelById("ottakshara")?.items || [])
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
      : isNumbersQuiz
        ? "Numbers"
        : isOttaksharaQuiz
          ? "Ottakshara"
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
    state.quiz.match.sets = buildHindiOppositesSets(state.quiz.items);
    prepareHindiOppositesSet(0);
  }

  quizTitle.textContent = isGunitaQuiz
    ? "Gunitaakshara Quiz"
    : isHindiOppositesQuiz
      ? "Hindi Opposites Match"
    : isHindiOppositesPictureQuiz
      ? "Hindi Opposites Picture Quiz"
    : isNumbersQuiz
      ? "Kannada Numbers Quiz"
      : isOttaksharaQuiz
        ? "Ottakshara Quiz"
      : "Letter Quiz (49)";
  renderQuiz49();
  if (isGunitaQuiz) {
    speakItem(state.quiz.items[0]);
    updateStatus("Gunitaakshara Quiz started: one consonant across all 12 signs.");
    return;
  }

  if (isNumbersQuiz) {
    updateStatus("Kannada Numbers Quiz started: identify each number name.");
    return;
  }

  if (isHindiOppositesQuiz) {
    const firstSetSize = state.quiz.match.sets[0]?.length || 0;
    updateStatus(`Hindi Opposites Match started: Set 1 of ${state.quiz.match.sets.length} with ${firstSetSize} pairs.`);
    return;
  }

  if (isHindiOppositesPictureQuiz) {
    updateStatus("Hindi Opposites Picture Quiz started: choose opposite from 4 audio options.");
    return;
  }

  if (isOttaksharaQuiz) {
    updateStatus("Ottakshara Quiz started: choose the correct sound and continue.");
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

  languageSelect.addEventListener("change", () => {
    syncLanguageDependentTopics();
    applyTopMode(modeSelect.value);
  });
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
  });
  quizAnswerSelect.addEventListener("change", () => {
    if (state.mode === "quiz49" && state.quiz.topic === "hindi_opposites_quiz") {
      handleQuiz49Choice(quizAnswerSelect.value);
    }
  });
  learnRetryMistakesBtn.addEventListener("click", startBoostupMatch);
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
