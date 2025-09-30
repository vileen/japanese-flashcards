// Progress tracking and statistics

// Update main menu stats
function updateMainMenuStats() {
    const systems = ['hiragana', 'katakana', 'kanji'];
    
    systems.forEach(system => {
        const selectedCount = getSelectedCharacters(system).length;
        const successRate = getSystemSuccessRate(system);
        
        document.getElementById(`${system}-selected`).textContent = selectedCount;
        document.getElementById(`${system}-success`).textContent = `${successRate}%`;
    });
}

// Check if character needs practice (success rate < 70%)
function needsPractice(characterId) {
    const successRate = getCharacterSuccessRate(characterId);
    const progress = getCharacterProgress(characterId);
    return progress.attempts >= 3 && successRate < 70;
}

// Get characters that need practice for a system
function getCharactersNeedingPractice(system) {
    const characters = getCharacters(system);
    return characters.filter(char => needsPractice(char.id));
}

// Calculate overall progress for a system
function calculateSystemProgress(system) {
    const characters = getCharacters(system);
    const total = characters.length;
    
    let learned = 0;
    characters.forEach(char => {
        const successRate = getCharacterSuccessRate(char.id);
        const progress = getCharacterProgress(char.id);
        if (progress.attempts >= 5 && successRate >= 80) {
            learned++;
        }
    });
    
    return {
        total,
        learned,
        percentage: Math.round((learned / total) * 100)
    };
}

// Session statistics
class SessionStats {
    constructor() {
        this.attempts = 0;
        this.correct = 0;
        this.characters = [];
    }
    
    addAttempt(characterId, isCorrect) {
        this.attempts++;
        if (isCorrect) {
            this.correct++;
        }
        
        if (!this.characters.includes(characterId)) {
            this.characters.push(characterId);
        }
    }
    
    getSuccessRate() {
        if (this.attempts === 0) return 0;
        return Math.round((this.correct / this.attempts) * 100);
    }
    
    getScore() {
        return {
            correct: this.correct,
            total: this.attempts,
            percentage: this.getSuccessRate()
        };
    }
    
    reset() {
        this.attempts = 0;
        this.correct = 0;
        this.characters = [];
    }
}
