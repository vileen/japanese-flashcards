// LocalStorage utilities for persistent data
const STORAGE_KEYS = {
    SELECTED: 'selected_characters',
    PROGRESS: 'character_progress',
    STATS: 'system_stats',
    VOCABULARY: 'vocabulary_words',
    VOCABULARY_SELECTED: 'selected_vocabulary'
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
            kanji: { attempts: 0, correct: 0 },
            vocabulary: { attempts: 0, correct: 0 }
        }));
    }

    if (!localStorage.getItem(STORAGE_KEYS.VOCABULARY)) {
        localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify([]));
    }

    if (!localStorage.getItem(STORAGE_KEYS.VOCABULARY_SELECTED)) {
        localStorage.setItem(STORAGE_KEYS.VOCABULARY_SELECTED, JSON.stringify([]));
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

// Vocabulary storage functions
function getStoredVocabulary() {
    const vocabulary = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
    return vocabulary ? JSON.parse(vocabulary) : [];
}

function storeVocabulary(vocabularyArray) {
    localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocabularyArray));
}

function getSelectedVocabulary() {
    const selected = localStorage.getItem(STORAGE_KEYS.VOCABULARY_SELECTED);
    return selected ? JSON.parse(selected) : [];
}

function setSelectedVocabulary(vocabularyIds) {
    localStorage.setItem(STORAGE_KEYS.VOCABULARY_SELECTED, JSON.stringify(vocabularyIds));
}

function toggleVocabularySelection(vocabularyId) {
    const selected = getSelectedVocabulary();
    const index = selected.indexOf(vocabularyId);
    
    if (index > -1) {
        selected.splice(index, 1);
    } else {
        selected.push(vocabularyId);
    }
    
    setSelectedVocabulary(selected);
    return selected;
}

function isVocabularySelected(vocabularyId) {
    const selected = getSelectedVocabulary();
    return selected.includes(vocabularyId);
}

// Enhanced character/vocabulary progress tracking
function needsPractice(itemId) {
    const successRate = getCharacterSuccessRate(itemId);
    const progress = getCharacterProgress(itemId);
    
    // Consider needs practice if:
    // - Never practiced (0 attempts)
    // - Success rate below 70%
    // - Haven't practiced in over a week and success rate below 90%
    if (progress.attempts === 0) return true;
    if (successRate < 70) return true;
    
    if (progress.lastPracticed) {
        const daysSinceLastPractice = (Date.now() - new Date(progress.lastPracticed).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceLastPractice > 7 && successRate < 90) return true;
    }
    
    return false;
}

// Update main menu stats to include vocabulary
function updateMainMenuStats() {
    // Update character system stats
    ['hiragana', 'katakana', 'kanji'].forEach(system => {
        const selected = getSelectedCharacters(system);
        const successRate = getSystemSuccessRate(system);
        
        const selectedEl = document.getElementById(`${system}-selected`);
        const successEl = document.getElementById(`${system}-success`);
        
        if (selectedEl) selectedEl.textContent = selected.length;
        if (successEl) successEl.textContent = successRate + '%';
    });

    // Update vocabulary stats
    let totalVocab = 0;
    try {
        if (typeof getVocabularyWords === 'function') {
            totalVocab = getVocabularyWords().length;
        } else if (window.VocabularyManager && window.VocabularyManager.getAllWords) {
            totalVocab = window.VocabularyManager.getAllWords().length;
        } else {
            const stored = getStoredVocabulary();
            totalVocab = stored.length;
        }
    } catch (error) {
        try {
            const stored = getStoredVocabulary();
            totalVocab = stored.length;
        } catch (e) {
            totalVocab = 0;
        }
    }
    
    const vocabSuccessRate = getSystemSuccessRate('vocabulary');
    
    const vocabSelectedEl = document.getElementById('vocabulary-selected');
    const vocabSuccessEl = document.getElementById('vocabulary-success');
    
    if (vocabSelectedEl) vocabSelectedEl.textContent = totalVocab;
    if (vocabSuccessEl) vocabSuccessEl.textContent = vocabSuccessRate + '%';
}

// Clear all data (for reset functionality)
function clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.SELECTED);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.VOCABULARY);
    localStorage.removeItem(STORAGE_KEYS.VOCABULARY_SELECTED);
    initStorage();
}

// Make functions globally available
window.updateMainMenuStats = updateMainMenuStats;
window.needsPractice = needsPractice;
window.getAllSelectedCharacters = getAllSelectedCharacters;

// Initialize on load
initStorage();
