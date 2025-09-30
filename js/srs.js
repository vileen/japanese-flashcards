// Spaced Repetition System (SM-2 Algorithm)

// Initialize SRS data for a character
function initializeSRS(charId) {
    const now = new Date().toISOString();
    return {
        interval: 0,           // Days until next review
        repetitions: 0,        // Number of consecutive correct answers
        easeFactor: 2.5,       // Difficulty multiplier (min: 1.3)
        dueDate: now,          // Next review date
        lastReviewed: null,    // Last review date
        isNew: true            // Whether this is a new card
    };
}

// Get SRS data for a character (from localStorage or initialize new)
function getSRSData(charId) {
    const allSRS = JSON.parse(localStorage.getItem('srsData') || '{}');
    if (!allSRS[charId]) {
        allSRS[charId] = initializeSRS(charId);
        localStorage.setItem('srsData', JSON.stringify(allSRS));
    }
    return allSRS[charId];
}

// Save SRS data for a character
function saveSRSData(charId, srsData) {
    const allSRS = JSON.parse(localStorage.getItem('srsData') || '{}');
    allSRS[charId] = srsData;
    localStorage.setItem('srsData', JSON.stringify(allSRS));
}

// Calculate next review using SM-2 algorithm
// quality: 0-5 (0=complete blackout, 5=perfect response)
function calculateNextReview(charId, quality) {
    const srs = getSRSData(charId);
    const now = new Date();
    
    // Update last reviewed
    srs.lastReviewed = now.toISOString();
    srs.isNew = false;
    
    // Quality < 3 means incorrect answer
    if (quality < 3) {
        // Reset repetitions and interval
        srs.repetitions = 0;
        srs.interval = 0;
        // Due again in 10 minutes for immediate review
        const dueDate = new Date(now.getTime() + 10 * 60 * 1000);
        srs.dueDate = dueDate.toISOString();
    } else {
        // Correct answer
        if (srs.repetitions === 0) {
            srs.interval = 1; // 1 day
        } else if (srs.repetitions === 1) {
            srs.interval = 6; // 6 days
        } else {
            // interval = previous interval * ease factor
            srs.interval = Math.round(srs.interval * srs.easeFactor);
        }
        
        srs.repetitions += 1;
        
        // Calculate due date
        const dueDate = new Date(now.getTime() + srs.interval * 24 * 60 * 60 * 1000);
        srs.dueDate = dueDate.toISOString();
    }
    
    // Update ease factor based on quality
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    const newEF = srs.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    srs.easeFactor = Math.max(1.3, newEF); // Minimum ease factor is 1.3
    
    // Save updated SRS data
    saveSRSData(charId, srs);
    
    return srs;
}

// Check if a character is due for review
function isDue(charId) {
    const srs = getSRSData(charId);
    const now = new Date();
    const dueDate = new Date(srs.dueDate);
    return now >= dueDate;
}

// Get all due characters from selected pool
function getDueCharacters(selectedCharacterIds) {
    return selectedCharacterIds.filter(charId => isDue(charId));
}

// Get review statistics
function getReviewStats(selectedCharacterIds) {
    let newCards = 0;
    let learning = 0; // Cards with repetitions < 3
    let young = 0;    // Cards with repetitions 3-7
    let mature = 0;   // Cards with repetitions >= 8
    let due = 0;
    
    const now = new Date();
    
    selectedCharacterIds.forEach(charId => {
        const srs = getSRSData(charId);
        const dueDate = new Date(srs.dueDate);
        
        if (srs.isNew) {
            newCards++;
        } else if (srs.repetitions < 3) {
            learning++;
        } else if (srs.repetitions < 8) {
            young++;
        } else {
            mature++;
        }
        
        if (now >= dueDate) {
            due++;
        }
    });
    
    return {
        new: newCards,
        learning,
        young,
        mature,
        due,
        total: selectedCharacterIds.length
    };
}

// Get quality assessment from button index
function getQualityFromButton(buttonIndex) {
    // 0: Again (complete failure)
    // 1: Hard (difficult to remember)
    // 2: Good (correct with some effort)
    // 3: Easy (perfect recall)
    const qualityMap = {
        0: 0, // Again - complete failure
        1: 3, // Hard - correct but difficult
        2: 4, // Good - correct with some effort  
        3: 5  // Easy - perfect recall
    };
    return qualityMap[buttonIndex] || 0;
}

// Reset SRS data for a character
function resetSRS(charId) {
    const srs = initializeSRS(charId);
    saveSRSData(charId, srs);
    return srs;
}

// Reset all SRS data
function resetAllSRS() {
    localStorage.removeItem('srsData');
}

// Export functions
window.SRS = {
    initializeSRS,
    getSRSData,
    saveSRSData,
    calculateNextReview,
    isDue,
    getDueCharacters,
    getReviewStats,
    getQualityFromButton,
    resetSRS,
    resetAllSRS
};
