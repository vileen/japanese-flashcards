// Vocabulary Practice Module
// Handles the separate vocabulary flashcard practice mode

function startVocabularyFlashcardPractice() {
    const vocabWords = getVocabularyWords();
    if (vocabWords.length === 0) {
        showAlert('No Vocabulary Available', 'Please add some vocabulary words first!');
        return;
    }
    
    // Create vocabulary practice session with all words
    currentPractice = new VocabularyPracticeSession(vocabWords);
    showScreen('practiceVocabulary');
    displayVocabularyFlashcard();
}

// Vocabulary Practice Session Class
class VocabularyPracticeSession {
    constructor(words) {
        this.words = this.shuffleArray([...words]);
        this.currentIndex = 0;
        this.stats = { correct: 0, total: 0 };
        this.revealed = false;
        this.showEnglish = null; // true = show English first, false = show Japanese first
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    getCurrentWord() {
        return this.words[this.currentIndex];
    }
    
    getAllJapaneseScripts(word) {
        const scripts = [];
        if (word.hiragana) scripts.push(word.hiragana);
        if (word.katakana) scripts.push(word.katakana);
        if (word.kanji) scripts.push(word.kanji);
        return scripts.join(' • ');
    }
    
    getCurrentCard() {
        const word = this.getCurrentWord();
        
        // Randomly decide what to show first if not set
        if (this.showEnglish === null) {
            this.showEnglish = Math.random() < 0.5;
        }
        
        return {
            front: this.showEnglish ? word.english : word.romaji,
            back: this.showEnglish ? word.romaji : word.english,
            additional: this.showEnglish ? this.getAllJapaneseScripts(word) : this.getAllJapaneseScripts(word),
            isEnglishFront: this.showEnglish,
            word: word
        };
    }
    
    reveal() {
        this.revealed = true;
    }
    
    recordAnswer(isCorrect) {
        this.stats.total++;
        if (isCorrect) {
            this.stats.correct++;
        }
        
        // Update progress tracking
        updateCharacterProgress(this.getCurrentWord().id, isCorrect);
        updateSystemStats('vocabulary', isCorrect);
    }
    
    nextCard() {
        this.revealed = false;
        this.showEnglish = null; // Reset for next card
        this.currentIndex++;
    }
    
    isComplete() {
        return this.currentIndex >= this.words.length - 1;
    }
    
    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.words.length
        };
    }
    
    getSuccessRate() {
        if (this.stats.total === 0) return 0;
        return Math.round((this.stats.correct / this.stats.total) * 100);
    }
}

function displayVocabularyFlashcard() {
    const card = currentPractice.getCurrentCard();
    const progress = currentPractice.getProgress();
    
    // Update header
    document.getElementById('vocabulary-practice-current').textContent = progress.current;
    document.getElementById('vocabulary-practice-total').textContent = progress.total;
    document.getElementById('vocabulary-practice-score').textContent = currentPractice.getSuccessRate() + '%';
    
    // Update category display
    const categoryEl = document.getElementById('vocabulary-category');
    if (categoryEl && card.word) {
        categoryEl.textContent = card.word.category.charAt(0).toUpperCase() + card.word.category.slice(1);
    }
    
    // Update card content (no labels needed - content is self-explanatory)
    document.getElementById('vocabulary-flashcard-front').textContent = card.front;
    document.getElementById('vocabulary-flashcard-back').textContent = card.back;
    document.getElementById('vocabulary-flashcard-additional').textContent = card.additional;
    
    // Reset card state
    const flashcard = document.getElementById('vocabulary-flashcard');
    flashcard.classList.remove('revealed');
    flashcard.onclick = revealVocabularyFlashcard;
    
    document.getElementById('vocabulary-tap-hint').style.display = 'block';
    document.getElementById('vocabulary-flashcard-controls').style.display = 'none';
}

function revealVocabularyFlashcard(e) {
    // Prevent if clicking on controls
    if (e && e.target.closest('.flashcard-controls')) {
        return;
    }
    
    currentPractice.reveal();
    
    const flashcard = document.getElementById('vocabulary-flashcard');
    flashcard.classList.add('revealed');
    flashcard.onclick = null;
    
    document.getElementById('vocabulary-tap-hint').style.display = 'none';
    document.getElementById('vocabulary-flashcard-controls').style.display = 'flex';
    
    // Setup assessment buttons
    document.getElementById('vocabulary-assess-wrong').onclick = () => assessVocabularyFlashcard(false);
    document.getElementById('vocabulary-assess-correct').onclick = () => assessVocabularyFlashcard(true);
}

function assessVocabularyFlashcard(isCorrect) {
    if (!currentPractice) {
        console.error('No current practice session');
        return;
    }
    
    currentPractice.recordAnswer(isCorrect);
    
    if (currentPractice.isComplete()) {
        showVocabularyResults();
    } else {
        currentPractice.nextCard();
        displayVocabularyFlashcard();
    }
}

function showVocabularyResults() {
    const stats = currentPractice.stats;
    const percentage = currentPractice.getSuccessRate();
    
    document.getElementById('final-score').textContent = percentage + '%';
    document.getElementById('correct-count').textContent = stats.correct;
    document.getElementById('total-count').textContent = stats.total;
    
    showScreen('results');
    // Update main menu stats after a brief delay to ensure all data is saved
    setTimeout(() => {
        updateMainMenuStats();
    }, 100);
}
