// LocalStorage utilities for persistent data
const STORAGE_KEYS = {
    SELECTED: 'selected_characters',
    PROGRESS: 'character_progress',
    STATS: 'system_stats'
};

// Initialize storage with default values
function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.SELECTED)) {
        localStorage.setItem(STORAGE_KEYS.SELECTED, JSON.stringify({
            hiragana: [],
            katakana: [],
            kanji: []
        }));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify({}));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.STATS)) {
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify({
            hiragana: { attempts: 0, correct: 0 },
            katakana: { attempts: 0, correct: 0 },
            kanji: { attempts: 0, correct: 0 }
        }));
    }
}

// Selected characters management
function getSelectedCharacters(system) {
    const selected = JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED));
    return selected[system] || [];
}

function getAllSelectedCharacters() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED));
}

function setSelectedCharacters(system, characterIds) {
    const selected = JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED));
    selected[system] = characterIds;
    localStorage.setItem(STORAGE_KEYS.SELECTED, JSON.stringify(selected));
}

function toggleCharacterSelection(system, characterId) {
    const selected = getSelectedCharacters(system);
    const index = selected.indexOf(characterId);
    
    if (index > -1) {
        selected.splice(index, 1);
    } else {
        selected.push(characterId);
    }
    
    setSelectedCharacters(system, selected);
    return selected;
}

function isCharacterSelected(system, characterId) {
    const selected = getSelectedCharacters(system);
    return selected.includes(characterId);
}

// Progress tracking
function getCharacterProgress(characterId) {
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS));
    return progress[characterId] || { attempts: 0, correct: 0, lastPracticed: null };
}

function updateCharacterProgress(characterId, isCorrect) {
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS));
    
    if (!progress[characterId]) {
        progress[characterId] = { attempts: 0, correct: 0, lastPracticed: null };
    }
    
    progress[characterId].attempts++;
    if (isCorrect) {
        progress[characterId].correct++;
    }
    progress[characterId].lastPracticed = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    return progress[characterId];
}

function getCharacterSuccessRate(characterId) {
    const progress = getCharacterProgress(characterId);
    if (progress.attempts === 0) return 0;
    return Math.round((progress.correct / progress.attempts) * 100);
}

// System stats
function getSystemStats(system) {
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS));
    return stats[system] || { attempts: 0, correct: 0 };
}

function updateSystemStats(system, isCorrect) {
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS));
    
    if (!stats[system]) {
        stats[system] = { attempts: 0, correct: 0 };
    }
    
    stats[system].attempts++;
    if (isCorrect) {
        stats[system].correct++;
    }
    
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    return stats[system];
}

function getSystemSuccessRate(system) {
    const stats = getSystemStats(system);
    if (stats.attempts === 0) return 0;
    return Math.round((stats.correct / stats.attempts) * 100);
}

// Clear all data (for reset functionality)
function clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.SELECTED);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    initStorage();
}

// Initialize on load
initStorage();
