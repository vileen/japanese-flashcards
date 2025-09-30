// Practice mode logic

class PracticeSession {
    constructor(characters, mode) {
        this.characters = this.shuffleArray([...characters]);
        this.mode = mode; // 'multiple-choice' or 'flashcard'
        this.currentIndex = 0;
        this.stats = new SessionStats();
        this.allCharacters = characters; // Keep original for generating distractors
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    getCurrentCharacter() {
        return this.characters[this.currentIndex];
    }
    
    hasNext() {
        return this.currentIndex < this.characters.length - 1;
    }
    
    next() {
        if (this.hasNext()) {
            this.currentIndex++;
            return this.getCurrentCharacter();
        }
        return null;
    }
    
    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.characters.length
        };
    }
    
    recordAnswer(isCorrect) {
        const currentChar = this.getCurrentCharacter();
        this.stats.addAttempt(currentChar.id, isCorrect);
        updateCharacterProgress(currentChar.id, isCorrect);
        
        // Get system from character ID prefix
        let system = 'hiragana';
        if (currentChar.id.startsWith('k_')) system = 'katakana';
        if (currentChar.id.startsWith('kj_')) system = 'kanji';
        
        updateSystemStats(system, isCorrect);
    }
    
    isComplete() {
        return this.currentIndex >= this.characters.length - 1;
    }
}

class MultipleChoicePractice extends PracticeSession {
    constructor(characters) {
        super(characters, 'multiple-choice');
        this.questionType = null; // 'char-to-romaji' or 'romaji-to-char'
    }
    
    generateQuestion() {
        const character = this.getCurrentCharacter();
        
        // Randomly decide question type
        this.questionType = Math.random() < 0.5 ? 'char-to-romaji' : 'romaji-to-char';
        
        const question = {
            type: this.questionType,
            display: this.questionType === 'char-to-romaji' 
                ? character.character 
                : character.romaji,
            correctAnswer: this.questionType === 'char-to-romaji'
                ? character.romaji
                : character.character,
            character: character
        };
        
        // Generate options
        question.options = this.generateOptions(question.correctAnswer, character);
        
        return question;
    }
    
    generateOptions(correctAnswer, currentChar) {
        const options = [correctAnswer];
        const availableChars = this.allCharacters.filter(c => c.id !== currentChar.id);
        
        // Add 2 random wrong answers
        while (options.length < 3 && availableChars.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            const randomChar = availableChars[randomIndex];
            
            const wrongAnswer = this.questionType === 'char-to-romaji'
                ? randomChar.romaji
                : randomChar.character;
            
            if (!options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
            
            availableChars.splice(randomIndex, 1);
        }
        
        // Shuffle options
        return this.shuffleArray(options);
    }
}

class FlashcardPractice extends PracticeSession {
    constructor(characters) {
        super(characters, 'flashcard');
        this.revealed = false;
        this.showCharacter = null; // true = show char, false = show romaji
    }
    
    reveal() {
        this.revealed = true;
    }
    
    getCurrentCard() {
        const character = this.getCurrentCharacter();
        
        // Randomly decide what to show on first view of this card
        if (this.showCharacter === null) {
            this.showCharacter = Math.random() < 0.5;
        }
        
        return {
            front: this.showCharacter ? character.character : character.romaji,
            back: this.showCharacter ? character.romaji : character.character,
            isCharacterFront: this.showCharacter,
            meaning: character.meaning || null,
            revealed: this.revealed
        };
    }
    
    nextCard() {
        this.revealed = false;
        this.showCharacter = null; // Reset for next card
        return this.next();
    }
}
