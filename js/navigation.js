// Navigation and Main App Logic
// Handles screen navigation, event listeners, and app initialization

// App state
let currentSystem = null;
let currentPractice = null;
let currentFilter = 'all';
let isDragging = false;
let dragSelectMode = null; // 'select' or 'deselect'

// DOM Elements
const screens = {
    mainMenu: document.getElementById('main-menu'),
    characterSelection: document.getElementById('character-selection'),
    vocabularyManagement: document.getElementById('vocabulary-management'),
    modeSelection: document.getElementById('mode-selection'),
    practiceMultiple: document.getElementById('practice-multiple'),
    practiceFlashcard: document.getElementById('practice-flashcard'),
    practiceVocabulary: document.getElementById('practice-vocabulary'),
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
    
    // Update stats again after a delay to ensure vocabulary system is loaded
    setTimeout(() => {
        updateMainMenuStats();
    }, 1000);
    
    // Initialize Firebase sync
    if (typeof initFirebaseSync === 'function') {
        initFirebaseSync();
    }
    
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
    // Alert modal
    document.getElementById('alert-ok').addEventListener('click', hideAlert);
    document.getElementById('alert-modal').addEventListener('click', (e) => {
        if (e.target.id === 'alert-modal') {
            hideAlert();
        }
    });
    
    // Confirmation modal
    document.getElementById('confirm-cancel').addEventListener('click', hideConfirm);
    document.getElementById('confirm-modal').addEventListener('click', (e) => {
        if (e.target.id === 'confirm-modal') {
            hideConfirm();
        }
    });
}

// Confirmation Modal
let confirmCallback = null;

function showConfirm(title, message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    
    confirmCallback = onConfirm;
    
    // Set up confirm button
    const confirmBtn = document.getElementById('confirm-ok');
    confirmBtn.onclick = () => {
        hideConfirm();
        if (confirmCallback) {
            confirmCallback();
            confirmCallback = null;
        }
    };
    
    modal.style.display = 'flex';
}

function hideConfirm() {
    document.getElementById('confirm-modal').style.display = 'none';
    confirmCallback = null;
}

// Make confirm function globally available
window.showConfirm = showConfirm;

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
    // Main menu - select writing system or vocabulary
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', () => {
            currentSystem = card.dataset.system;
            if (currentSystem === 'vocabulary') {
                loadVocabularyManagement();
                showScreen('vocabularyManagement');
            } else {
                loadCharacterSelection(currentSystem);
                showScreen('characterSelection');
            }
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
    
    // Start practice button - allow access to mode selection (character validation moved to individual modes)
    document.getElementById('start-practice').addEventListener('click', () => {
        showScreen('modeSelection');
    });
    
    // Back buttons
    document.getElementById('back-to-menu').addEventListener('click', () => {
        showScreen('mainMenu');
        updateMainMenuStats();
    });
    
    document.getElementById('back-from-vocabulary').addEventListener('click', () => {
        showScreen('mainMenu');
        updateMainMenuStats();
    });
    
    document.getElementById('back-from-mode').addEventListener('click', () => {
        if (currentSystem === 'vocabulary') {
            showScreen('vocabularyManagement');
        } else if (currentSystem) {
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
    
    document.getElementById('back-from-vocabulary-practice').addEventListener('click', () => {
        showScreen('mainMenu');
        currentPractice = null;
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
    document.getElementById('vocabulary-practice-mode').addEventListener('click', startVocabularyFlashcardPractice);
    
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

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
