// Main app logic
let currentSystem = null;
let currentPractice = null;
let currentFilter = 'all';

// DOM Elements
const screens = {
    mainMenu: document.getElementById('main-menu'),
    characterSelection: document.getElementById('character-selection'),
    modeSelection: document.getElementById('mode-selection'),
    practiceMultiple: document.getElementById('practice-multiple'),
    practiceFlashcard: document.getElementById('practice-flashcard'),
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
    setupEventListeners();
    
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed', err));
    }
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
    
    // Start practice button
    document.getElementById('start-practice').addEventListener('click', () => {
        const allSelected = getAllSelectedCharacters();
        const totalSelected = allSelected.hiragana.length + allSelected.katakana.length + allSelected.kanji.length;
        
        if (totalSelected === 0) {
            alert('Please select at least one character to practice!');
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
        showScreen('modeSelection');
        currentPractice = null;
    });
    
    document.getElementById('back-from-flashcard').addEventListener('click', () => {
        showScreen('modeSelection');
        currentPractice = null;
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
        
        // Create grid for this category
        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'category-grid';
        
        filteredChars.forEach(char => {
            const item = createCharacterItem(char, system);
            categoryGrid.appendChild(item);
        });
        
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
    
    div.addEventListener('click', () => {
        toggleCharacterSelection(system, char.id);
        div.classList.toggle('selected');
        updateSelectedCount(system);
        updateMainMenuStats();
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
}


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
        alert('Please select at least one character!');
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
        alert('Please select at least one character!');
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
    
    // Update card
    document.getElementById('flashcard-character').textContent = card.character;
    document.getElementById('flashcard-answer').textContent = card.romaji;
    
    // Reset card state
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('revealed');
    document.getElementById('flashcard-controls').style.display = 'none';
    document.getElementById('tap-hint').style.display = 'block';
    
    // Setup tap to reveal
    flashcard.onclick = revealFlashcard;
}

function revealFlashcard() {
    currentPractice.reveal();
    
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.add('revealed');
    flashcard.onclick = null;
    
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

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
