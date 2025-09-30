// Main app logic
let currentSystem = null;
let currentPractice = null;
let currentFilter = 'all';
let isDragging = false;
let dragSelectMode = null; // 'select' or 'deselect'

// DOM Elements
const screens = {
    mainMenu: document.getElementById('main-menu'),
    characterSelection: document.getElementById('character-selection'),
    modeSelection: document.getElementById('mode-selection'),
    practiceMultiple: document.getElementById('practice-multiple'),
    practiceFlashcard: document.getElementById('practice-flashcard'),
    practiceReview: document.getElementById('practice-review'),
    results: document.getElementById('results')
};

// Screen navigation
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Initialize app
function initApp() {
    updateMainMenuStats();
    updateSRSStats(); // Update SRS statistics
    setupEventListeners();
    initDarkMode();
    setupModal();
    
    // Register service worker with update handling
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('Service Worker registered');
                
                // Check for updates every time the app loads
                reg.update();
                
                // Listen for updates
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available, reload to get updates
                            console.log('New version available! Reloading...');
                            window.location.reload();
                        }
                    });
                });
            })
            .catch(err => console.log('Service Worker registration failed', err));
        
        // Reload page when new service worker takes control
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    }
}

// Custom Alert Modal
function showAlert(title, message) {
    const modal = document.getElementById('alert-modal');
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-message').textContent = message;
    modal.style.display = 'flex';
}

function hideAlert() {
    document.getElementById('alert-modal').style.display = 'none';
}

function setupModal() {
    document.getElementById('alert-ok').addEventListener('click', hideAlert);
    document.getElementById('alert-modal').addEventListener('click', (e) => {
        if (e.target.id === 'alert-modal') {
            hideAlert();
        }
    });
}

// Dark Mode
function initDarkMode() {
    // Check saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Event Listeners Setup
function setupEventListeners() {
    // Main menu - select writing system
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', () => {
            currentSystem = card.dataset.system;
            loadCharacterSelection(currentSystem);
            showScreen('characterSelection');
        });
    });
    
    // Start review button
    document.getElementById('start-review').addEventListener('click', () => {
        const allSelected = getAllSelectedCharacters();
        const allSelectedIds = [...allSelected.hiragana, ...allSelected.katakana, ...allSelected.kanji];
        
        if (allSelectedIds.length === 0) {
            showAlert('No Characters Selected', 'Please select at least one character to review!');
            return;
        }
        
        const dueChars = window.SRS.getDueCharacters(allSelectedIds);
        
        if (dueChars.length === 0) {
            showAlert('No Reviews Due', 'Great job! You have no cards due for review right now. Come back later!');
            return;
        }
        
        startReview();
    });
    
    // Start practice button
    document.getElementById('start-practice').addEventListener('click', () => {
        const allSelected = getAllSelectedCharacters();
        const totalSelected = allSelected.hiragana.length + allSelected.katakana.length + allSelected.kanji.length;
        
        if (totalSelected === 0) {
            showAlert('No Characters Selected', 'Please select at least one character to practice!');
            return;
        }
        
        showScreen('modeSelection');
    });
    
    // Back buttons
    document.getElementById('back-to-menu').addEventListener('click', () => {
        showScreen('mainMenu');
        updateMainMenuStats();
    });
    
    document.getElementById('back-from-mode').addEventListener('click', () => {
        if (currentSystem) {
            showScreen('characterSelection');
        } else {
            showScreen('mainMenu');
        }
    });
    
    document.getElementById('back-from-practice').addEventListener('click', () => {
        showScreen('mainMenu');
        currentPractice = null;
        updateMainMenuStats();
    });
    
    document.getElementById('back-from-flashcard').addEventListener('click', () => {
        showScreen('mainMenu');
        currentPractice = null;
        updateMainMenuStats();
    });
    
    document.getElementById('back-from-review').addEventListener('click', () => {
        showScreen('mainMenu');
        currentPractice = null;
        updateSRSStats();
        updateMainMenuStats();
    });
    
    // Toggle all selection
    document.getElementById('toggle-all').addEventListener('click', toggleAllCharacters);
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            loadCharacterSelection(currentSystem);
        });
    });
    
    // Practice mode selection
    document.getElementById('multiple-choice-mode').addEventListener('click', startMultipleChoice);
    document.getElementById('flashcard-mode').addEventListener('click', startFlashcard);
    
    // Results screen
    document.getElementById('practice-again').addEventListener('click', () => {
        showScreen('modeSelection');
    });
    
    document.getElementById('back-to-main').addEventListener('click', () => {
        showScreen('mainMenu');
        updateMainMenuStats();
    });
    
    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
}

// Character Selection
function loadCharacterSelection(system) {
    const grid = document.getElementById('character-grid');
    const title = document.getElementById('selection-title');
    
    // Update title
    const titles = {
        hiragana: 'Hiragana ひらがな',
        katakana: 'Katakana カタカナ',
        kanji: 'Kanji 漢字'
    };
    title.textContent = titles[system];
    
    // Clear grid
    grid.innerHTML = '';
    
    // Get category groups
    const groups = getCategoryGroups(system);
    
    // Render each category section
    Object.entries(groups).forEach(([categoryName, characters]) => {
        // Apply filter
        let filteredChars = characters;
        
        if (currentFilter === 'selected') {
            const selected = getSelectedCharacters(system);
            filteredChars = characters.filter(char => selected.includes(char.id));
        } else if (currentFilter === 'unlearned') {
            filteredChars = characters.filter(char => needsPractice(char.id));
        }
        
        // Only show section if it has characters after filtering
        if (filteredChars.length === 0) return;
        
        // Create section
        const section = document.createElement('div');
        section.className = 'category-section';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'category-header';
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'category-title';
        titleSpan.textContent = categoryName;
        
        // Right side: count and select button
        const infoDiv = document.createElement('div');
        infoDiv.className = 'category-info';
        
        const countSpan = document.createElement('span');
        countSpan.className = 'category-count';
        countSpan.textContent = `${filteredChars.length} ${filteredChars.length === 1 ? 'character' : 'characters'}`;
        
        const selectBtn = document.createElement('button');
        selectBtn.className = 'category-select-btn';
        selectBtn.textContent = 'Select All';
        selectBtn.addEventListener('click', () => selectCategoryGroup(categoryName, characters));
        
        infoDiv.appendChild(countSpan);
        infoDiv.appendChild(selectBtn);
        
        header.appendChild(titleSpan);
        header.appendChild(infoDiv);
        
        // Create grid for this category with row organization
        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'category-grid';
        
        // Group characters by their sub-category (row) for organized display
        if (categoryName === 'Basic Characters') {
            const rowOrder = ['vowels', 'k-row', 's-row', 't-row', 'n-row', 'h-row', 'm-row', 'y-row', 'r-row', 'w-row', 'n'];
            // Define which positions should be filled for each row (0-indexed, 5 positions total)
            const rowPositions = {
                'vowels': [0, 1, 2, 3, 4],
                'k-row': [0, 1, 2, 3, 4],
                's-row': [0, 1, 2, 3, 4],
                't-row': [0, 1, 2, 3, 4],
                'n-row': [0, 1, 2, 3, 4],
                'h-row': [0, 1, 2, 3, 4],
                'm-row': [0, 1, 2, 3, 4],
                'y-row': [0, 2, 4], // ya, yu, yo (skip positions 1 and 3)
                'r-row': [0, 1, 2, 3, 4],
                'w-row': [0, 4], // wa, wo (skip positions 1, 2, 3)
                'n': [4] // n (only last position)
            };
            
            rowOrder.forEach(row => {
                const rowChars = filteredChars.filter(c => c.category === row);
                if (rowChars.length > 0) {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'character-row';
                    
                    const positions = rowPositions[row] || [0, 1, 2, 3, 4];
                    let charIndex = 0;
                    
                    for (let i = 0; i < 5; i++) {
                        if (positions.includes(i) && charIndex < rowChars.length) {
                            const item = createCharacterItem(rowChars[charIndex], system);
                            rowDiv.appendChild(item);
                            charIndex++;
                        } else {
                            // Add blank placeholder
                            const blank = document.createElement('div');
                            blank.className = 'character-item character-blank';
                            rowDiv.appendChild(blank);
                        }
                    }
                    
                    categoryGrid.appendChild(rowDiv);
                }
            });
        } else if (categoryName === 'Dakuten (゛)') {
            const rowOrder = ['g-row', 'z-row', 'd-row', 'b-row'];
            rowOrder.forEach(row => {
                const rowChars = filteredChars.filter(c => c.category === row);
                if (rowChars.length > 0) {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'character-row';
                    
                    rowChars.forEach(char => {
                        const item = createCharacterItem(char, system);
                        rowDiv.appendChild(item);
                    });
                    
                    categoryGrid.appendChild(rowDiv);
                }
            });
        } else {
            // For other categories (Handakuten, Combinations, Kanji), split into rows
            const itemsPerRow = categoryName.includes('Combinations') ? 3 : 5;
            for (let i = 0; i < filteredChars.length; i += itemsPerRow) {
                const rowDiv = document.createElement('div');
                rowDiv.className = categoryName.includes('Combinations') ? 'character-row character-row-3' : 'character-row';
                
                const rowChars = filteredChars.slice(i, i + itemsPerRow);
                rowChars.forEach(char => {
                    const item = createCharacterItem(char, system);
                    rowDiv.appendChild(item);
                });
                
                categoryGrid.appendChild(rowDiv);
            }
        }
        
        section.appendChild(header);
        section.appendChild(categoryGrid);
        grid.appendChild(section);
    });
    
    updateSelectedCount(system);
}

function createCharacterItem(char, system) {
    const div = document.createElement('div');
    div.className = 'character-item';
    div.dataset.charId = char.id;
    
    if (isCharacterSelected(system, char.id)) {
        div.classList.add('selected');
    }
    
    if (needsPractice(char.id)) {
        div.classList.add('need-practice');
    }
    
    const charSpan = document.createElement('div');
    charSpan.className = 'character-char';
    charSpan.textContent = char.character;
    
    const romajiSpan = document.createElement('div');
    romajiSpan.className = 'character-romaji';
    romajiSpan.textContent = char.romaji;
    
    div.appendChild(charSpan);
    div.appendChild(romajiSpan);
    
    // Mouse/Touch events for drag selection
    div.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDragSelect(system, char.id);
    });
    
    div.addEventListener('mouseenter', () => {
        if (isDragging) {
            applyDragSelect(system, char.id);
        }
    });
    
    div.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDragSelect(system, char.id);
    });
    
    div.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains('character-item')) {
            const charId = element.dataset.charId;
            if (charId && isDragging) {
                applyDragSelect(system, charId);
            }
        }
    });
    
    return div;
}

function updateSelectedCount(system) {
    const count = getSelectedCharacters(system).length;
    document.getElementById('selected-count').textContent = `${count} selected`;
}

function toggleAllCharacters() {
    const characters = getCharacters(currentSystem);
    const selected = getSelectedCharacters(currentSystem);
    
    if (selected.length === characters.length) {
        // Deselect all
        setSelectedCharacters(currentSystem, []);
    } else {
        // Select all
        setSelectedCharacters(currentSystem, characters.map(c => c.id));
    }
    
    loadCharacterSelection(currentSystem);
    updateMainMenuStats();
    updateSRSStats(); // Update SRS stats immediately
}

function selectCategoryGroup(categoryName, categoryCharacters) {
    const selected = getSelectedCharacters(currentSystem);
    const categoryCharIds = categoryCharacters.map(c => c.id);
    
    // Check if all characters in this category are already selected
    const allCategorySelected = categoryCharIds.every(id => selected.includes(id));
    
    if (allCategorySelected) {
        // Deselect all in category
        const newSelected = selected.filter(id => !categoryCharIds.includes(id));
        setSelectedCharacters(currentSystem, newSelected);
    } else {
        // Select all in category (add to existing selections)
        const newSelected = [...new Set([...selected, ...categoryCharIds])];
        setSelectedCharacters(currentSystem, newSelected);
    }
    
    loadCharacterSelection(currentSystem);
    updateMainMenuStats();
    updateSRSStats(); // Update SRS stats immediately
}

// Drag selection functions
function startDragSelect(system, charId) {
    isDragging = true;
    const selected = getSelectedCharacters(system);
    
    // Determine mode: if character is selected, we're deselecting; otherwise selecting
    dragSelectMode = selected.includes(charId) ? 'deselect' : 'select';
    
    // Apply to first character
    applyDragSelect(system, charId);
}

function applyDragSelect(system, charId) {
    if (!isDragging) return;
    
    const selected = getSelectedCharacters(system);
    const isSelected = selected.includes(charId);
    
    // Apply the drag mode consistently
    if (dragSelectMode === 'select' && !isSelected) {
        toggleCharacterSelection(system, charId);
        // Update only the visual state of this character
        const charElement = document.querySelector(`[data-char-id="${charId}"]`);
        if (charElement) {
            charElement.classList.add('selected');
        }
        updateSelectedCount(system);
        updateSRSStats(); // Update SRS stats immediately
    } else if (dragSelectMode === 'deselect' && isSelected) {
        toggleCharacterSelection(system, charId);
        // Update only the visual state of this character
        const charElement = document.querySelector(`[data-char-id="${charId}"]`);
        if (charElement) {
            charElement.classList.remove('selected');
        }
        updateSelectedCount(system);
        updateSRSStats(); // Update SRS stats immediately
    }
}

function endDragSelect() {
    // Only process if we were actually dragging
    if (!isDragging) return;
    
    isDragging = false;
    dragSelectMode = null;
    
    // Update stats and potentially reload view if in filtered mode
    updateMainMenuStats();
    if (currentFilter === 'selected' || currentFilter === 'unlearned') {
        loadCharacterSelection(currentSystem);
    }
}

// Add global event listeners for drag end
document.addEventListener('mouseup', endDragSelect);
document.addEventListener('touchend', endDragSelect);


// Practice Modes
function getSelectedCharacterObjects() {
    const allSelected = getAllSelectedCharacters();
    let selectedChars = [];
    
    // Collect all selected characters from all systems
    ['hiragana', 'katakana', 'kanji'].forEach(system => {
        const systemChars = getCharacters(system);
        const selectedIds = allSelected[system];
        const chars = systemChars.filter(c => selectedIds.includes(c.id));
        selectedChars = selectedChars.concat(chars);
    });
    
    return selectedChars;
}

function startMultipleChoice() {
    const selectedChars = getSelectedCharacterObjects();
    
    if (selectedChars.length === 0) {
        showAlert('No Characters Selected', 'Please select at least one character to practice!');
        return;
    }
    
    currentPractice = new MultipleChoicePractice(selectedChars);
    showScreen('practiceMultiple');
    displayMultipleChoiceQuestion();
}

function displayMultipleChoiceQuestion() {
    const question = currentPractice.generateQuestion();
    const progress = currentPractice.getProgress();
    
    // Update header
    document.getElementById('current-question').textContent = progress.current;
    document.getElementById('total-questions').textContent = progress.total;
    document.getElementById('practice-score').textContent = 
        currentPractice.stats.getSuccessRate() + '%';
    
    // Update question
    const typeText = question.type === 'char-to-romaji' 
        ? 'Character → Romaji' 
        : 'Romaji → Character';
    document.getElementById('question-type').textContent = typeText;
    document.getElementById('question-display').textContent = question.display;
    
    // Create options
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => handleOptionClick(btn, option, question.correctAnswer));
        container.appendChild(btn);
    });
    
    // Hide next button
    document.getElementById('next-question').style.display = 'none';
}

function handleOptionClick(btn, selected, correct) {
    const isCorrect = selected === correct;
    
    // Disable all options
    document.querySelectorAll('.option-btn').forEach(option => {
        option.disabled = true;
        if (option.textContent === correct) {
            option.classList.add('correct');
        } else if (option === btn && !isCorrect) {
            option.classList.add('wrong');
        }
    });
    
    // Record answer
    currentPractice.recordAnswer(isCorrect);
    
    // Show next button or finish
    const nextBtn = document.getElementById('next-question');
    nextBtn.style.display = 'block';
    
    if (currentPractice.isComplete()) {
        nextBtn.textContent = 'Finish';
        nextBtn.onclick = showResults;
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.onclick = () => {
            currentPractice.next();
            displayMultipleChoiceQuestion();
        };
    }
}

// Flashcard Mode
function startFlashcard() {
    const selectedChars = getSelectedCharacterObjects();
    
    if (selectedChars.length === 0) {
        showAlert('No Characters Selected', 'Please select at least one character to practice!');
        return;
    }

    currentPractice = new FlashcardPractice(selectedChars);
    showScreen('practiceFlashcard');
    displayFlashcard();
}

function displayFlashcard() {
    const card = currentPractice.getCurrentCard();
    const progress = currentPractice.getProgress();
    
    // Update header
    document.getElementById('flashcard-current').textContent = progress.current;
    document.getElementById('flashcard-total').textContent = progress.total;
    document.getElementById('flashcard-score').textContent = 
        currentPractice.stats.getSuccessRate() + '%';
    
    // Update card with front/back
    document.getElementById('flashcard-character').textContent = card.front;
    document.getElementById('flashcard-answer').textContent = card.back;
    
    // Reset card state
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('revealed');
    document.getElementById('flashcard-controls').style.display = 'none';
    document.getElementById('tap-hint').style.display = 'block';
    
    // Setup tap to reveal
    flashcard.onclick = revealFlashcard;
}

function revealFlashcard(e) {
    // Prevent if clicking on controls
    if (e && e.target.closest('.flashcard-controls')) {
        return;
    }
    
    currentPractice.reveal();
    
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.add('revealed');
    flashcard.onclick = null;
    
    document.getElementById('tap-hint').style.display = 'none';
    document.getElementById('flashcard-controls').style.display = 'flex';
    
    // Setup assessment buttons
    document.getElementById('assess-wrong').onclick = () => assessFlashcard(false);
    document.getElementById('assess-correct').onclick = () => assessFlashcard(true);
}

function assessFlashcard(isCorrect) {
    currentPractice.recordAnswer(isCorrect);
    
    if (currentPractice.isComplete()) {
        showResults();
    } else {
        currentPractice.nextCard();
        displayFlashcard();
    }
}

// Results
function showResults() {
    const score = currentPractice.stats.getScore();
    
    document.getElementById('final-score').textContent = score.percentage + '%';
    document.getElementById('correct-count').textContent = score.correct;
    document.getElementById('total-count').textContent = score.total;
    
    showScreen('results');
    updateMainMenuStats();
}

// SRS Review Mode
function updateSRSStats() {
    const allSelected = getAllSelectedCharacters();
    const allSelectedIds = [...allSelected.hiragana, ...allSelected.katakana, ...allSelected.kanji];
    
    if (allSelectedIds.length === 0) {
        document.getElementById('srs-due').textContent = '0';
        document.getElementById('srs-new').textContent = '0';
        document.getElementById('srs-learning').textContent = '0';
        return;
    }
    
    const stats = window.SRS.getReviewStats(allSelectedIds);
    document.getElementById('srs-due').textContent = stats.due;
    document.getElementById('srs-new').textContent = stats.new;
    document.getElementById('srs-learning').textContent = stats.learning;
}

function startReview() {
    const allSelected = getAllSelectedCharacters();
    const allSelectedIds = [...allSelected.hiragana, ...allSelected.katakana, ...allSelected.kanji];
    const dueIds = window.SRS.getDueCharacters(allSelectedIds);
    
    // Get character objects for due cards
    const allChars = getSelectedCharacterObjects();
    const dueChars = allChars.filter(char => dueIds.includes(char.id));
    
    currentPractice = new ReviewPractice(dueChars);
    showScreen('practiceReview');
    displayReviewCard();
}

function displayReviewCard() {
    const card = currentPractice.getCurrentCard();
    const progress = currentPractice.getProgress();
    
    // Update header
    document.getElementById('review-current').textContent = progress.current;
    document.getElementById('review-total').textContent = progress.total;
    document.getElementById('review-score').textContent = 
        Math.round((progress.reviewed / progress.total) * 100) + '%';
    
    // Update card
    const characterEl = document.getElementById('review-character');
    const answerEl = document.getElementById('review-answer');
    
    if (card.isCharacterFront) {
        characterEl.textContent = card.front;
        answerEl.textContent = card.back;
        document.querySelector('#review-card .flashcard-front .flashcard-label').textContent = 'Character';
        document.querySelector('#review-card .flashcard-back .flashcard-label').textContent = 'Romaji';
    } else {
        characterEl.textContent = card.front;
        answerEl.textContent = card.back;
        document.querySelector('#review-card .flashcard-front .flashcard-label').textContent = 'Romaji';
        document.querySelector('#review-card .flashcard-back .flashcard-label').textContent = 'Character';
    }
    
    // Reset card state
    const flashcard = document.getElementById('review-card');
    flashcard.classList.remove('revealed');
    flashcard.onclick = revealReviewCard;
    
    document.getElementById('review-hint').style.display = 'block';
    document.getElementById('review-controls').style.display = 'none';
}

function revealReviewCard() {
    currentPractice.reveal();
    
    const flashcard = document.getElementById('review-card');
    flashcard.classList.add('revealed');
    flashcard.onclick = null;
    
    document.getElementById('review-hint').style.display = 'none';
    document.getElementById('review-controls').style.display = 'flex';
    document.getElementById('review-controls').style.justifyContent = 'center';
    
    // Setup quality buttons
    document.getElementById('quality-again').onclick = () => assessReviewQuality(0);
    document.getElementById('quality-hard').onclick = () => assessReviewQuality(1);
    document.getElementById('quality-good').onclick = () => assessReviewQuality(2);
    document.getElementById('quality-easy').onclick = () => assessReviewQuality(3);
}

function assessReviewQuality(buttonIndex) {
    const quality = window.SRS.getQualityFromButton(buttonIndex);
    const nextChar = currentPractice.assessQuality(quality);
    
    if (nextChar === null) {
        // Review session complete
        showReviewComplete();
    } else {
        displayReviewCard();
    }
}

function showReviewComplete() {
    const stats = currentPractice.getStats();
    showAlert('Review Complete! 🎉', 
        `Great job! You reviewed ${stats.reviewed} card${stats.reviewed !== 1 ? 's' : ''}. Keep up the good work!`);
    showScreen('mainMenu');
    updateSRSStats();
    updateMainMenuStats();
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
