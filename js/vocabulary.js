// Vocabulary data management
// Handles vocabulary words with English <-> Japanese translations

// Vocabulary word structure
class VocabularyWord {
    constructor(data) {
        this.id = data.id || 'vocab_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        this.english = data.english || '';
        this.romaji = data.romaji || '';
        this.hiragana = data.hiragana || '';
        this.katakana = data.katakana || '';
        this.kanji = data.kanji || '';
        this.meaning = data.meaning || ''; // Additional context/notes
        this.category = data.category || 'general';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.source = data.source || 'user'; // user, preset
    }

    // Get the primary Japanese text (hiragana > katakana > kanji > romaji)
    getPrimaryJapanese() {
        return this.hiragana || this.katakana || this.kanji || this.romaji;
    }

    // Get all Japanese representations for display
    getAllJapanese() {
        const japanese = [];
        if (this.hiragana) japanese.push(this.hiragana);
        if (this.katakana) japanese.push(this.katakana);
        if (this.kanji) japanese.push(this.kanji);
        return japanese;
    }

    // Get display text for practice modes
    getDisplayText(showJapanese = true) {
        if (showJapanese) {
            return this.getPrimaryJapanese();
        } else {
            return this.english;
        }
    }

    // Get answer text for practice modes
    getAnswerText(showJapanese = true) {
        if (showJapanese) {
            return this.english;
        } else {
            return this.getPrimaryJapanese();
        }
    }

    // Get additional info for display (secondary Japanese scripts)
    getAdditionalInfo(showJapanese = true) {
        if (showJapanese) {
            const additional = [];
            if (this.romaji) additional.push(this.romaji);
            const allJapanese = this.getAllJapanese();
            // Add other Japanese scripts as additional info
            if (allJapanese.length > 1) {
                const primary = this.getPrimaryJapanese();
                allJapanese.forEach(text => {
                    if (text !== primary) additional.push(text);
                });
            }
            return additional.join(' • ');
        } else {
            return this.romaji || '';
        }
    }

    // Update word data
    update(data) {
        Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'createdAt') {
                this[key] = data[key];
            }
        });
        this.updatedAt = new Date().toISOString();
    }

    // Convert to plain object for storage
    toJSON() {
        return {
            id: this.id,
            english: this.english,
            romaji: this.romaji,
            hiragana: this.hiragana,
            katakana: this.katakana,
            kanji: this.kanji,
            meaning: this.meaning,
            category: this.category,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            source: this.source
        };
    }
}

// Default vocabulary categories
const VOCABULARY_CATEGORIES = [
    'general',
    'greetings',
    'family',
    'food',
    'animals',
    'colors',
    'numbers',
    'time',
    'weather',
    'body',
    'clothing',
    'transportation',
    'school',
    'work',
    'hobbies',
    'emotions',
    'adjectives',
    'verbs',
    'nouns'
];

// Vocabulary management functions
class VocabularyManager {
    constructor() {
        this.vocabulary = new Map();
        this.loadVocabulary();
    }

    // Load vocabulary from storage
    loadVocabulary() {
        const stored = getStoredVocabulary();
        this.vocabulary.clear();
        
        stored.forEach(wordData => {
            const word = new VocabularyWord(wordData);
            this.vocabulary.set(word.id, word);
        });

        // No sample vocabulary - start empty for Firebase integration
    }

    // Save vocabulary to storage
    saveVocabulary(skipFirebaseSync = false) {
        const vocabularyArray = Array.from(this.vocabulary.values()).map(word => word.toJSON());
        storeVocabulary(vocabularyArray);
        
        // Trigger Firebase sync event (unless this save came FROM Firebase)
        if (!skipFirebaseSync) {
            window.dispatchEvent(new CustomEvent('vocabulary-changed'));
        }
    }

    // Add new word
    addWord(wordData) {
        const word = new VocabularyWord(wordData);
        this.vocabulary.set(word.id, word);
        this.saveVocabulary();
        return word;
    }

    // Update existing word
    updateWord(id, wordData) {
        const word = this.vocabulary.get(id);
        if (word) {
            word.update(wordData);
            this.saveVocabulary();
            return word;
        }
        return null;
    }

    // Delete word
    deleteWord(id) {
        const deleted = this.vocabulary.delete(id);
        if (deleted) {
            this.saveVocabulary();
        }
        return deleted;
    }

    // Get word by ID
    getWord(id) {
        return this.vocabulary.get(id);
    }

    // Get all words
    getAllWords() {
        return Array.from(this.vocabulary.values());
    }

    // Get words by category
    getWordsByCategory(category) {
        return this.getAllWords().filter(word => word.category === category);
    }


    // Search words
    searchWords(query) {
        const lowerQuery = query.toLowerCase();
        return this.getAllWords().filter(word => 
            word.english.toLowerCase().includes(lowerQuery) ||
            word.romaji.toLowerCase().includes(lowerQuery) ||
            word.hiragana.includes(lowerQuery) ||
            word.katakana.includes(lowerQuery) ||
            word.kanji.includes(lowerQuery) ||
            word.meaning.toLowerCase().includes(lowerQuery)
        );
    }

    // Get categories with word counts
    getCategoriesWithCounts() {
        const counts = {};
        VOCABULARY_CATEGORIES.forEach(category => {
            counts[category] = this.getWordsByCategory(category).length;
        });
        return counts;
    }

    // Get statistics
    getStatistics() {
        const words = this.getAllWords();
        const total = words.length;
        const byCategory = this.getCategoriesWithCounts();
        return {
            total,
            byCategory,
            userWords: words.filter(w => w.source === 'user').length,
            presetWords: words.filter(w => w.source === 'preset').length
        };
    }

    // Export vocabulary as JSON
    exportVocabulary() {
        return JSON.stringify(this.getAllWords().map(word => word.toJSON()), null, 2);
    }

    // Import vocabulary from JSON
    importVocabulary(jsonData, replaceExisting = false) {
        try {
            const words = JSON.parse(jsonData);
            let imported = 0;
            let updated = 0;

            words.forEach(wordData => {
                const existingWord = this.vocabulary.get(wordData.id);
                
                if (existingWord && !replaceExisting) {
                    // Skip existing words if not replacing
                    return;
                } else if (existingWord && replaceExisting) {
                    // Update existing word
                    this.updateWord(wordData.id, wordData);
                    updated++;
                } else {
                    // Add new word
                    this.addWord(wordData);
                    imported++;
                }
            });

            this.saveVocabulary();
            return { imported, updated, total: words.length };
        } catch (error) {
            throw new Error('Invalid JSON format: ' + error.message);
        }
    }
}

// Export classes and constants for global access
window.VocabularyWord = VocabularyWord;
window.VOCABULARY_CATEGORIES = VOCABULARY_CATEGORIES;

// Global vocabulary manager instance (initialized later)
let vocabularyManager = null;

// Initialize vocabulary manager
function initVocabularyManager() {
    if (!vocabularyManager) {
        vocabularyManager = new VocabularyManager();
        window.VocabularyManager = vocabularyManager;
    }
    return vocabularyManager;
}

// Utility functions (ensure manager is initialized)
function getVocabularyWords() {
    if (!vocabularyManager) initVocabularyManager();
    return vocabularyManager.getAllWords();
}

function getVocabularyWord(id) {
    if (!vocabularyManager) initVocabularyManager();
    return vocabularyManager.getWord(id);
}

function addVocabularyWord(wordData) {
    if (!vocabularyManager) initVocabularyManager();
    return vocabularyManager.addWord(wordData);
}

function updateVocabularyWord(id, wordData) {
    if (!vocabularyManager) initVocabularyManager();
    return vocabularyManager.updateWord(id, wordData);
}

function deleteVocabularyWord(id) {
    if (!vocabularyManager) initVocabularyManager();
    return vocabularyManager.deleteWord(id);
}

function searchVocabularyWords(query) {
    if (!vocabularyManager) initVocabularyManager();
    return vocabularyManager.searchWords(query);
}

function getVocabularyStatistics() {
    if (!vocabularyManager) initVocabularyManager();
    return vocabularyManager.getStatistics();
}
