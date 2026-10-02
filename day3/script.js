// ===== Day 3: Notes Toolkit =====

// ----- Starting data -----
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

const VALID_CATEGORIES = ["personal", "work", "study"];

// Trim, collapse repeated spaces and lower-case, so comparisons ignore case and extra spaces.
function normalise(text) {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}

// ----- 1. searchNotes(word) -----
// Returns every note whose text contains `word`, ignoring upper/lower case.
// An empty or non-string search returns an empty array.
function searchNotes(word) {
  if (typeof word !== "string" || word.trim() === "") {
    return [];
  }
  const target = word.trim().toLowerCase();
  return notes.filter(function (note) {
    return note.text.toLowerCase().includes(target);
  });
}

// ----- 2. longestNote() -----
// Returns the note object with the most characters, or null if there are no notes.
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

// ----- 3. countByCategory() -----
// Returns an object such as { personal: 2, study: 2, work: 1 }.
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    if (counts[note.category] === undefined) {
      counts[note.category] = 1;
    } else {
      counts[note.category]++;
    }
  }
  return counts;
}

// ----- 4. getSummary() -----
// Returns a sentence such as "5 notes: 2 personal, 1 work, 2 study."
function getSummary() {
  const total = notes.length;
  const label = total === 1 ? "note" : "notes";

  if (total === 0) {
    return "0 notes.";
  }

  const counts = countByCategory();
  const parts = [];
  for (const category of VALID_CATEGORIES) {
    if (counts[category]) {
      parts.push(`${counts[category]} ${category}`);
    }
  }
  return `${total} ${label}: ${parts.join(", ")}.`;
}

// ----- 5. isDuplicate(text) -----
// True if a note with the same text exists (ignoring case and extra spaces).
function isDuplicate(text) {
  if (typeof text !== "string") {
    return false;
  }
  const target = normalise(text);
  return notes.some(function (note) {
    return normalise(note.text) === target;
  });
}

// ----- 6. addNote(text, category) -----
// Adds a note if the text is 1-200 characters, not a duplicate, and the
// category is personal, work or study. Returns true if added, false otherwise.
function addNote(text, category) {
  if (typeof text !== "string") {
    console.log("Not added: text must be a string.");
    return false;
  }

  const cleaned = text.trim().replace(/\s+/g, " ");

  if (cleaned.length < 1 || cleaned.length > 200) {
    console.log(`Not added: text must be 1-200 characters (got ${cleaned.length}).`);
    return false;
  }

  if (isDuplicate(cleaned)) {
    console.log(`Not added: "${cleaned}" already exists.`);
    return false;
  }

  if (!VALID_CATEGORIES.includes(category)) {
    console.log(`Not added: category must be one of ${VALID_CATEGORIES.join(", ")} (got "${category}").`);
    return false;
  }

  const nextId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  notes.push({ id: nextId, text: cleaned, category: category });
  return true;
}

// ===== Tests =====
// Temporary empty/one-note states are set up by swapping `notes`, then restoring it.
const originalNotes = notes;

console.log("--- searchNotes ---");
console.log(searchNotes("milk"));
// [ { id: 1, text: "Buy milk and bread", category: "personal" } ]
console.log(searchNotes("JAVASCRIPT"));
// [ { id: 4, text: "Revise JavaScript arrays", category: "study" } ]  (case ignored)
console.log(searchNotes("zebra"));
// []  (no results)
console.log(searchNotes(""));
// []  (empty search)

console.log("--- longestNote ---");
console.log(longestNote());
// { id: 3, text: "Email the project report to Grace", category: "work" }
notes = [];
console.log(longestNote());
// null  (no notes)
notes = originalNotes;

console.log("--- countByCategory ---");
console.log(countByCategory());
// { personal: 2, study: 2, work: 1 }
notes = [];
console.log(countByCategory());
// {}  (no notes)
notes = originalNotes;

console.log("--- getSummary ---");
console.log(getSummary());
// "5 notes: 2 personal, 1 work, 2 study."
notes = [originalNotes[0]];
console.log(getSummary());
// "1 note: 1 personal."  (singular)
notes = [];
console.log(getSummary());
// "0 notes."  (no notes)
notes = originalNotes;

console.log("--- isDuplicate ---");
console.log(isDuplicate("  buy MILK   and bread "));
// true  (ignores case and extra spaces)
console.log(isDuplicate("Buy eggs"));
// false
console.log(isDuplicate(""));
// false  (no note has empty text)

console.log("--- addNote ---");
console.log(addNote("Pay electricity bill", "personal"));
// true
console.log(addNote("buy milk and bread", "personal"));
// Not added: "buy milk and bread" already exists.
// false
console.log(addNote("", "work"));
// Not added: text must be 1-200 characters (got 0).
// false
console.log(addNote("a".repeat(201), "study"));
// Not added: text must be 1-200 characters (got 201).
// false
console.log(addNote("Gym at 6", "fitness"));
// Not added: category must be one of personal, work, study (got "fitness").
// false
console.log(addNote("a".repeat(200), "study"));
// true  (exactly 200 characters is allowed)

console.log("--- final state ---");
console.log(getSummary());
// "7 notes: 3 personal, 1 work, 3 study."