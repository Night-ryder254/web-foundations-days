// ===== Day 4: Note Counter =====

// ----- Select all the elements -----
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

// ----- Settings -----
const MAX_CHARS = 200;
const WARNING_AT = 180;
const DRAFT_KEY = "notes-draft";
const THEME_KEY = "notes-theme";

// ----- localStorage helpers (wrapped so a blocked/full storage never breaks the page) -----
function saveItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log("Could not save to localStorage:", error);
  }
}

function loadItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log("Could not read from localStorage:", error);
    return null;
  }
}

function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("Could not remove from localStorage:", error);
  }
}

// ----- Counting -----
function countWords(text) {
  const trimmed = text.trim();
  if (trimmed === "") {
    return 0;
  }
  return trimmed.split(/\s+/).length;
}

// Updates both counters and the warning/over classes on the character counter.
function updateCounts() {
  const text = noteText.value;
  const chars = text.length;
  const words = countWords(text);

  charCount.textContent = `${chars} / ${MAX_CHARS} characters`;
  wordCount.textContent = `${words} ${words === 1 ? "word" : "words"}`;

  charCount.classList.remove("warning", "over");
  if (chars > MAX_CHARS) {
    charCount.classList.add("over");
  } else if (chars > WARNING_AT) {
    charCount.classList.add("warning");
  }
}

// ----- Clearing -----
function clearNote() {
  noteText.value = "";
  updateCounts();
  removeItem(DRAFT_KEY);
  noteText.focus();
}

// ----- Theme -----
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

// ----- Events -----
noteText.addEventListener("input", function () {
  updateCounts();
  saveItem(DRAFT_KEY, noteText.value);
});

noteText.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearNote();
  }
});

clearBtn.addEventListener("click", clearNote);

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  saveItem(THEME_KEY, isDark ? "dark" : "light");
});

// ----- On page load: restore draft and theme, then update the counters -----
const savedDraft = loadItem(DRAFT_KEY);
if (savedDraft !== null) {
  noteText.value = savedDraft;
}

applyTheme(loadItem(THEME_KEY) === "dark");
updateCounts();