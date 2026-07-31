const modeSelect = document.getElementById("modeSelect");
const levelSelect = document.getElementById("levelSelect");
const itemCountSelect = document.getElementById("itemCount");
const learnGroupSelect = document.getElementById("learnGroupSelect");
const newRoundBtn = document.getElementById("newRoundBtn");
const restartLearnBtn = document.getElementById("restartLearnBtn");
const soundColumn = document.getElementById("soundColumn");
const scriptColumn = document.getElementById("scriptColumn");
const statusText = document.getElementById("statusText");
const scoreText = document.getElementById("scoreText");
const board = document.querySelector(".board");
const learnPanel = document.getElementById("learnPanel");
const learnStepText = document.getElementById("learnStepText");
const learnCard = document.getElementById("learnCard");
const learnPrompt = document.getElementById("learnPrompt");
const learnOptions = document.getElementById("learnOptions");
const learnPrimaryBtn = document.getElementById("learnPrimaryBtn");

const GUNITA_GROUPS = {
  A: ["ka-1", "kaa", "ki", "kii"],
  B: ["ku", "kuu", "ke", "kee"],
  C: ["kai", "ko", "koo", "kau"],
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
  matchedIds: new Set(),
  learn: {
    groupKey: "A",
    items: [],
    index: 0,
    score: 0,
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

function updateStatus(message) {
  statusText.textContent = message;
  if (state.mode === "game") {
    scoreText.textContent = `Score: ${state.correctCount} / ${state.pairs.length}`;
    return;
  }

  const total = state.learn.items.length;
  scoreText.textContent = `Lesson Score: ${state.learn.score} / ${total}`;
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
    clearSelections();

    if (state.correctCount === state.pairs.length) {
      updateStatus("Super! All matches done 🎉");
      return;
    }

    updateStatus("Correct ✅ Great job. Keep going!");
    return;
  }

  const wrongSound = state.selectedSoundId;
  const wrongScript = state.selectedScriptId;
  renderBoard({ wrongSound, wrongScript });
  updateStatus("Oops ❌ Try again.");

  setTimeout(() => {
    clearSelections();
  }, 500);
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
  const selected = shuffle(level.items).slice(0, Math.min(count, level.items.length));

  state.levelId = level.id;
  state.pairs = selected;
  state.soundCards = shuffle(selected.map((item) => ({ ...item })));
  state.scriptCards = shuffle(selected.map((item) => ({ ...item })));
  state.selectedSoundId = null;
  state.selectedScriptId = null;
  state.correctCount = 0;
  state.matchedIds = new Set();

  renderBoard();
  updateStatus(`Round ready: ${level.name}`);
}

function getGunitaItemsByGroup(groupKey) {
  const gunitaLevel = getLevelById("gunita");
  if (!gunitaLevel) {
    return [];
  }

  const wantedIds = new Set(GUNITA_GROUPS[groupKey]);
  return gunitaLevel.items.filter((item) => wantedIds.has(item.id));
}

function startLearningMode() {
  const groupKey = learnGroupSelect.value;
  const items = getGunitaItemsByGroup(groupKey);

  state.mode = "learn";
  state.levelId = "gunita";
  state.learn.groupKey = groupKey;
  state.learn.items = items;
  state.learn.index = 0;
  state.learn.score = 0;
  state.learn.phase = "show";
  state.learn.options = [];
  state.learn.selectedOptionId = null;

  renderLearning();
  updateStatus(`Learning Group ${groupKey}: listen and remember.`);
}

function currentLearnItem() {
  return state.learn.items[state.learn.index] || null;
}

function buildQuizOptions(correctItem) {
  const pool = state.learn.items.filter((item) => item.id !== correctItem.id);
  const distractor = shuffle(pool)[0];
  if (!distractor) {
    return [correctItem];
  }
  return shuffle([correctItem, distractor]);
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
    updateStatus("Correct ✅ Nice! Tap Next.");
  } else {
    updateStatus(`Not this one. Correct answer: ${correctItem.text}`);
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
    updateStatus(`Find this sound: ${getBaseSound(correctItem.sound)}`);
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
    learnCard.textContent = "-";
    learnPrompt.textContent = "Please choose another group.";
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "Restart Lesson";
    learnPrimaryBtn.disabled = false;
    state.learn.phase = "done";
    return;
  }

  if (state.learn.phase === "done") {
    const total = state.learn.items.length;
    const stars = state.learn.score === total ? "⭐⭐⭐" : state.learn.score >= Math.ceil(total * 0.75) ? "⭐⭐" : "⭐";
    learnStepText.textContent = `Completed Group ${state.learn.groupKey}`;
    learnCard.textContent = stars;
    learnPrompt.textContent = `Score ${state.learn.score}/${total}. Tap Restart Lesson to practice again.`;
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "Restart Lesson";
    learnPrimaryBtn.disabled = false;
    return;
  }

  const stepNumber = state.learn.index + 1;
  const total = state.learn.items.length;
  learnStepText.textContent = `Item ${stepNumber} of ${total} (Group ${state.learn.groupKey})`;

  learnCard.textContent = item.text;
  learnCard.onclick = () => {
    speakItem(item);
  };

  if (state.learn.phase === "show") {
    learnPrompt.textContent = `Listen and repeat: ${getBaseSound(item.sound)} (tap card to hear)`;
    learnOptions.innerHTML = "";
    learnPrimaryBtn.textContent = "I Remember";
    learnPrimaryBtn.disabled = false;
    return;
  }

  if (state.learn.phase === "quiz") {
    learnPrompt.textContent = `Tap Kannada for sound: ${getBaseSound(item.sound)}`;
    learnOptions.innerHTML = "";

    state.learn.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "learn-option";
      button.textContent = option.text;
      button.addEventListener("click", () => handleLearnOptionClick(option));
      learnOptions.appendChild(button);
    });

    learnPrimaryBtn.textContent = "Choose an answer";
    learnPrimaryBtn.disabled = true;
    return;
  }

  if (state.learn.phase === "feedback") {
    learnPrompt.textContent = `Answer check for: ${getBaseSound(item.sound)}`;
    learnOptions.innerHTML = "";

    state.learn.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "learn-option";
      button.textContent = option.text;

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
  learnGroupSelect.addEventListener("change", startLearningMode);
  restartLearnBtn.addEventListener("click", startLearningMode);
  learnPrimaryBtn.addEventListener("click", advanceLearning);
}

initControls();
setMode("game");
