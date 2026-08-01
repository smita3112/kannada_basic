const modeSelect = document.getElementById("modeSelect");
const levelSelect = document.getElementById("levelSelect");
const itemCountSelect = document.getElementById("itemCount");
const learnTopicSelect = document.getElementById("learnTopicSelect");
const newRoundBtn = document.getElementById("newRoundBtn");
const nextSetBtn = document.getElementById("nextSetBtn");
const restartLearnBtn = document.getElementById("restartLearnBtn");
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
const learnTitle = document.getElementById("learnTitle");
const learnStepText = document.getElementById("learnStepText");
const learnCard = document.getElementById("learnCard");
const learnPrompt = document.getElementById("learnPrompt");
const learnOptions = document.getElementById("learnOptions");
const learnPrimaryBtn = document.getElementById("learnPrimaryBtn");
const learnRetryMistakesBtn = document.getElementById("learnRetryMistakesBtn");

const LEARN_OPTION_COUNT = {
  gunita: 4,
  varnamaale_all: 8,
  varnamaale_swara: 6,
  varnamaale_vyanjana: 8,
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

const state = {
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
    index: 0,
    score: 0,
    mistakes: 0,
    mistakeById: {},
    retryMode: false,
    phase: "show",
    options: [],
    selectedOptionId: null,
  },
};

let availableVoices = [];
const audioCache = new Map();

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
    return;
  }

  const total = state.learn.items.length;
  scoreText.textContent = `Lesson Score: ${state.learn.score} / ${total}`;
  streakText.textContent = `Streak: ${state.streak} | Best: ${state.bestStreak}`;
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

  const knVoice = availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("kn"));
  const inVoice = availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("en-in"));
  const fallbackVoice = availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("en"));

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(item.text);
  utterance.voice = knVoice || inVoice || fallbackVoice || null;
  utterance.lang = utterance.voice?.lang || "en-US";
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
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

function updateLearnControlsVisibility() {
  learnTopicSelect.classList.remove("hidden");
}

function startLearningMode() {
  const topic = learnTopicSelect.value;
  const items = topic === "gunita" ? getGunitaItems() : getVarnamaaleItems(topic);

  state.mode = "learn";
  state.levelId = topic;
  state.learn.topic = topic;
  state.learn.items = items;
  state.learn.index = 0;
  state.learn.score = 0;
  state.learn.mistakes = 0;
  state.learn.mistakeById = {};
  state.learn.retryMode = false;
  state.streak = 0;
  state.bestStreak = 0;
  state.learn.phase = "show";
  state.learn.options = [];
  state.learn.selectedOptionId = null;
  learnRetryMistakesBtn.classList.add("hidden");

  renderLearning();
  updateLearnControlsVisibility();
  if (topic === "gunita") {
    learnTitle.textContent = "Gunitaakshara Learning";
    updateStatus("Learning Gunitaakshara: listen and remember.");
    return;
  }

  const label =
    topic === "varnamaale_all"
      ? "All"
      : topic === "varnamaale_swara"
        ? "Swara"
        : "Vyanjana";
  learnTitle.textContent = `Varnamaale Learning (${label})`;
  updateStatus(`Learning Varnamaale (${label}): listen and remember.`);
}

function startGunitaMistakePractice() {
  if (state.learn.topic !== "gunita") {
    return;
  }

  const mistakeIds = Object.keys(state.learn.mistakeById).filter((itemId) => state.learn.mistakeById[itemId] > 0);
  if (mistakeIds.length === 0) {
    return;
  }

  const gunitaLevel = getLevelById("gunita");
  if (!gunitaLevel) {
    return;
  }

  const retryItems = gunitaLevel.items.filter((item) => mistakeIds.includes(item.id));
  if (retryItems.length === 0) {
    return;
  }

  state.learn.items = retryItems;
  state.learn.index = 0;
  state.learn.score = 0;
  state.learn.mistakes = 0;
  state.learn.mistakeById = {};
  state.learn.retryMode = true;
  state.learn.phase = "show";
  state.learn.options = [];
  state.learn.selectedOptionId = null;
  state.streak = 0;
  state.bestStreak = 0;

  renderLearning();
  learnTitle.textContent = "Gunitaakshara Mistake Practice";
  updateStatus("Practice mistakes only: focus on tricky signs.");
}

function currentLearnItem() {
  return state.learn.items[state.learn.index] || null;
}

function buildQuizOptions(correctItem) {
  const desiredCount = LEARN_OPTION_COUNT[state.learn.topic] || 6;
  const poolWithoutCorrect = state.learn.items.filter((item) => item.id !== correctItem.id);
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
    const correctItem = currentLearnItem();
    if (!correctItem) {
      return;
    }
    state.learn.options = buildQuizOptions(correctItem);
    state.learn.selectedOptionId = null;
    state.learn.phase = "quiz";
    renderLearning();
    speakItem(correctItem);
    updateStatus(`Find this sound: ${getBaseSound(correctItem.sound)}`);
    return;
  }

  if (state.learn.phase === "quiz") {
    const quizItem = currentLearnItem();
    if (quizItem) {
      speakItem(quizItem);
    }
    return;
  }

  if (state.learn.phase === "feedback") {
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
    updateStatus("Listen and repeat this one.");
  }
}

function renderLearning() {
  const item = currentLearnItem();

  if (!item && state.learn.phase !== "done") {
    learnStepText.textContent = "No items found for this group.";
    learnCard.classList.remove("hidden");
    learnCard.textContent = "-";
    learnPrompt.textContent = "Please choose another group.";
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "Restart Lesson";
    learnPrimaryBtn.disabled = false;
    learnRetryMistakesBtn.classList.add("hidden");
    state.learn.phase = "done";
    return;
  }

  if (state.learn.phase === "done") {
    const total = state.learn.items.length;
    const stars = state.learn.score === total ? "⭐⭐⭐" : state.learn.score >= Math.ceil(total * 0.75) ? "⭐⭐" : "⭐";
    learnStepText.textContent =
      state.learn.topic === "gunita"
        ? state.learn.retryMode
          ? "Completed Gunitaakshara Mistake Practice"
          : "Completed Gunitaakshara"
        : "Completed Varnamaale";
    learnCard.classList.remove("hidden");
    learnCard.textContent = stars;
    learnPrompt.textContent =
      state.learn.topic === "gunita"
        ? `Score ${state.learn.score}/${total}. Tap Restart Lesson for full practice.`
        : `Score ${state.learn.score}/${total}. Tap Restart Lesson to practice again.`;
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "Restart Lesson";
    learnPrimaryBtn.disabled = false;
    const canRetryMistakes = state.learn.topic === "gunita" && state.learn.mistakes > 0;
    learnRetryMistakesBtn.classList.toggle("hidden", !canRetryMistakes);
    return;
  }

  learnRetryMistakesBtn.classList.add("hidden");

  const stepNumber = state.learn.index + 1;
  const total = state.learn.items.length;
  learnStepText.textContent = `Item ${stepNumber} of ${total}`;

  setLearnCardContent(item, false);
  learnCard.onclick = () => {
    speakItem(item);
  };

  if (state.learn.phase === "show") {
    learnPrompt.textContent = `Listen and repeat: ${getBaseSound(item.sound)} (tap card to hear)`;
    learnOptions.innerHTML = "";
    learnCard.classList.remove("hidden");
    setLearnCardContent(item, state.learn.topic === "gunita");
    learnCard.onclick = () => {
      speakItem(item);
    };
    learnPrimaryBtn.textContent = "I Remember";
    learnPrimaryBtn.disabled = false;
    return;
  }

  if (state.learn.phase === "quiz") {
    learnPrompt.textContent = "Listen to the sound and pick the correct Kannada.";
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
    learnPrompt.textContent = `Answer check for: ${getBaseSound(item.sound)}`;
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

function setMode(nextMode) {
  state.mode = nextMode;

  document.querySelectorAll(".game-only").forEach((element) => {
    element.classList.toggle("hidden", nextMode !== "game");
  });

  document.querySelectorAll(".learn-only").forEach((element) => {
    element.classList.toggle("hidden", nextMode !== "learn");
  });

  board.classList.toggle("hidden", nextMode !== "game");
  learnPanel.classList.toggle("hidden", nextMode !== "learn");

  if (nextMode === "game") {
    buildRound();
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

  modeSelect.addEventListener("change", () => setMode(modeSelect.value));
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
  restartLearnBtn.addEventListener("click", startLearningMode);
  learnRetryMistakesBtn.addEventListener("click", startGunitaMistakePractice);
  learnPrimaryBtn.addEventListener("click", advanceLearning);
}

initControls();
setMode("game");
