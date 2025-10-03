// Vocabulary Management UI
// Handles vocabulary management screen, forms, and interactions

// Vocabulary UI state
let currentVocabularyFilter = 'all';
let currentEditingWord = null;

function loadVocabularyManagement() {
    // Ensure vocabulary manager is initialized
    if (typeof initVocabularyManager === 'function') {
        initVocabularyManager();
    }
    displayVocabularyList();
    updateVocabularyStats();
    setupVocabularyEventListeners();
}

function displayVocabularyList() {
    const vocabularyList = document.getElementById('vocabulary-list');
    const searchInput = document.getElementById('vocabulary-search');
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
    
    let words = getVocabularyWords();
    
    // Apply search filter
    if (searchQuery) {
        words = words.filter(word => 
            word.english.toLowerCase().includes(searchQuery) ||
            word.romaji.toLowerCase().includes(searchQuery) ||
            word.hiragana.includes(searchQuery) ||
            word.katakana.includes(searchQuery) ||
            word.kanji.includes(searchQuery)
        );
    }
    
    // No selection filter needed since we removed selection functionality
    
    // Clear and populate list
    vocabularyList.innerHTML = '';
    
    if (words.length === 0) {
        vocabularyList.innerHTML = '<div class="empty-state">No vocabulary words found. Click "+ Add" to create your first word!</div>';
        return;
    }
    
    // Group by category if showing all
    if (currentVocabularyFilter === 'category') {
        const grouped = {};
        words.forEach(word => {
            if (!grouped[word.category]) {
                grouped[word.category] = [];
            }
            grouped[word.category].push(word);
        });
        
        Object.keys(grouped).sort().forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.className = 'vocabulary-category-section';
            
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = `
                <span class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span class="category-count">${grouped[category].length} words</span>
            `;
            
            const categoryWords = document.createElement('div');
            categoryWords.className = 'category-words';
            
            grouped[category].forEach(word => {
                categoryWords.appendChild(createVocabularyItem(word));
            });
            
            categorySection.appendChild(categoryHeader);
            categorySection.appendChild(categoryWords);
            vocabularyList.appendChild(categorySection);
        });
    } else {
        // Show as simple list
        words.forEach(word => {
            vocabularyList.appendChild(createVocabularyItem(word));
        });
    }
}

function createVocabularyItem(word) {
    const item = document.createElement('div');
    item.className = 'vocabulary-item';
    item.dataset.wordId = word.id;
    
    if (needsPractice(word.id)) {
        item.classList.add('need-practice');
    }
    
    const japanese = word.getAllJapanese();
    const japaneseDisplay = japanese.length > 0 ? japanese.join(' • ') : word.romaji;
    
    item.innerHTML = `
        <div class="vocabulary-main">
            <div class="vocabulary-english">${word.english}</div>
            <div class="vocabulary-japanese">${japaneseDisplay}</div>
            <div class="vocabulary-romaji">${word.romaji}</div>
        </div>
        <div class="vocabulary-actions">
            <button class="edit-btn" data-word-id="${word.id}">✏️</button>
            <button class="delete-btn" data-word-id="${word.id}">🗑️</button>
        </div>
    `;
    
    // Remove click selection - vocabulary items are no longer selectable for practice
    
    return item;
}

function updateVocabularyStats() {
    const totalWords = getVocabularyWords().length;
    
    document.getElementById('vocabulary-count').textContent = `${totalWords} words`;
    
    // Update main menu stats
    updateMainMenuStats();
}

function setupVocabularyEventListeners() {
    // Add vocabulary button
    const addBtn = document.getElementById('add-vocabulary-btn');
    if (addBtn && !addBtn.hasAttribute('data-listener-added')) {
        addBtn.addEventListener('click', () => showVocabularyModal());
        addBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Share vocabulary button
    const shareBtn = document.getElementById('share-vocabulary-btn');
    if (shareBtn && !shareBtn.hasAttribute('data-listener-added')) {
        shareBtn.addEventListener('click', () => showSharingModal());
        shareBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Search input
    const searchInput = document.getElementById('vocabulary-search');
    if (searchInput && !searchInput.hasAttribute('data-listener-added')) {
        searchInput.addEventListener('input', displayVocabularyList);
        searchInput.setAttribute('data-listener-added', 'true');
    }
    
    // Filter tabs
    document.querySelectorAll('#vocabulary-management .filter-tab').forEach(tab => {
        if (!tab.hasAttribute('data-listener-added')) {
            tab.addEventListener('click', () => {
                document.querySelectorAll('#vocabulary-management .filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentVocabularyFilter = tab.dataset.filter;
                displayVocabularyList();
            });
            tab.setAttribute('data-listener-added', 'true');
        }
    });
    
    // Practice button
    const practiceBtn = document.getElementById('start-vocabulary-practice');
    if (practiceBtn && !practiceBtn.hasAttribute('data-listener-added')) {
        practiceBtn.addEventListener('click', startVocabularyPractice);
        practiceBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Modal event listeners
    setupVocabularyModalListeners();
    
    // Setup sharing modal
    if (typeof setupSharingModal === 'function') {
        setupSharingModal();
    }
    
    // Edit and delete buttons (delegated)
    const vocabularyList = document.getElementById('vocabulary-list');
    if (!vocabularyList.hasAttribute('data-listener-added')) {
        vocabularyList.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const wordId = e.target.dataset.wordId;
                editVocabularyWord(wordId);
            } else if (e.target.classList.contains('delete-btn')) {
                const wordId = e.target.dataset.wordId;
                deleteVocabularyWord(wordId);
            }
        });
        vocabularyList.setAttribute('data-listener-added', 'true');
    }
}

function setupVocabularyModalListeners() {
    // Close modal
    const closeBtn = document.getElementById('close-vocabulary-modal');
    if (closeBtn && !closeBtn.hasAttribute('data-listener-added')) {
        closeBtn.addEventListener('click', hideVocabularyModal);
        closeBtn.setAttribute('data-listener-added', 'true');
    }
    
    const cancelBtn = document.getElementById('cancel-vocabulary');
    if (cancelBtn && !cancelBtn.hasAttribute('data-listener-added')) {
        cancelBtn.addEventListener('click', hideVocabularyModal);
        cancelBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Form submission
    const form = document.getElementById('vocabulary-form');
    if (form && !form.hasAttribute('data-listener-added')) {
        form.addEventListener('submit', saveVocabularyWord);
        form.setAttribute('data-listener-added', 'true');
    }
    
    // Close on background click
    const modal = document.getElementById('vocabulary-modal');
    if (modal && !modal.hasAttribute('data-listener-added')) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideVocabularyModal();
            }
        });
        modal.setAttribute('data-listener-added', 'true');
    }
    
    // Romaji conversion features
    setupRomajiConversion();
    
    // ESC key to close modal
    if (!window.vocabularyEscListenerAdded) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('vocabulary-modal');
                if (modal && modal.style.display === 'flex') {
                    hideVocabularyModal();
                }
            }
        });
        window.vocabularyEscListenerAdded = true;
    }
    
    // Mark manual input to prevent auto-overwrite
    const hiraganaInput = document.getElementById('vocab-hiragana');
    const katakanaInput = document.getElementById('vocab-katakana');
    
    if (hiraganaInput && !hiraganaInput.hasAttribute('data-manual-listener-added')) {
        hiraganaInput.addEventListener('input', () => {
            if (hiraganaInput.value.trim()) {
                hiraganaInput.dataset.autoFilled = 'false';
            }
        });
        hiraganaInput.setAttribute('data-manual-listener-added', 'true');
    }
    
    if (katakanaInput && !katakanaInput.hasAttribute('data-manual-listener-added')) {
        katakanaInput.addEventListener('input', () => {
            if (katakanaInput.value.trim()) {
                katakanaInput.dataset.autoFilled = 'false';
            }
        });
        katakanaInput.setAttribute('data-manual-listener-added', 'true');
    }
}

function showVocabularyModal(word = null) {
    currentEditingWord = word;
    const modal = document.getElementById('vocabulary-modal');
    const title = document.getElementById('vocabulary-modal-title');
    const form = document.getElementById('vocabulary-form');
    
    if (word) {
        title.textContent = 'Edit Vocabulary';
        // Populate form with existing word data
        document.getElementById('vocab-english').value = word.english;
        document.getElementById('vocab-romaji').value = word.romaji;
        document.getElementById('vocab-hiragana').value = word.hiragana;
        document.getElementById('vocab-katakana').value = word.katakana;
        document.getElementById('vocab-kanji').value = word.kanji;
        document.getElementById('vocab-meaning').value = word.meaning;
        document.getElementById('vocab-category').value = word.category;
    } else {
        title.textContent = 'Add Vocabulary';
        form.reset();
    }
    
    modal.style.display = 'flex';
}

function hideVocabularyModal() {
    cleanupRomajiConversion();
    document.getElementById('vocabulary-modal').style.display = 'none';
    currentEditingWord = null;
}

function saveVocabularyWord(e) {
    e.preventDefault();
    
    const wordData = {
        english: document.getElementById('vocab-english').value.trim(),
        romaji: document.getElementById('vocab-romaji').value.trim(),
        hiragana: document.getElementById('vocab-hiragana').value.trim(),
        katakana: document.getElementById('vocab-katakana').value.trim(),
        kanji: document.getElementById('vocab-kanji').value.trim(),
        meaning: document.getElementById('vocab-meaning').value.trim(),
        category: document.getElementById('vocab-category').value
    };
    
    // Auto-convert romaji to hiragana/katakana if they're empty
    if (wordData.romaji) {
        if (!wordData.hiragana) {
            wordData.hiragana = convertRomajiToHiragana(wordData.romaji);
        }
        if (!wordData.katakana) {
            wordData.katakana = convertRomajiToKatakana(wordData.romaji);
        }
    }
    
    if (currentEditingWord) {
        // Update existing word
        updateVocabularyWord(currentEditingWord.id, wordData);
    } else {
        // Add new word
        addVocabularyWord(wordData);
    }
    
    hideVocabularyModal();
    displayVocabularyList();
    updateVocabularyStats();
}

function editVocabularyWord(wordId) {
    const word = getVocabularyWord(wordId);
    if (word) {
        showVocabularyModal(word);
    }
}

function deleteVocabularyWord(wordId) {
    const word = getVocabularyWord(wordId);
    if (word) {
        showConfirm(
            'Delete Vocabulary Word',
            `Are you sure you want to delete "${word.english}"? This action cannot be undone.`,
            () => {
                window.VocabularyManager.deleteWord(wordId);
                displayVocabularyList();
                updateVocabularyStats();
            }
        );
    }
}

function startVocabularyPractice() {
    const vocabWords = getVocabularyWords();
    if (vocabWords.length === 0) {
        showAlert('No Vocabulary Available', 'Please add some vocabulary words first!');
        return;
    }
    
    // Go directly to vocabulary practice (no mode selection needed)
    startVocabularyFlashcardPractice();
}

// Romaji Conversion Functions
function setupRomajiConversion() {
    const romajiInput = document.getElementById('vocab-romaji');
    const hiraganaInput = document.getElementById('vocab-hiragana');
    const katakanaInput = document.getElementById('vocab-katakana');
    
    if (!romajiInput || !hiraganaInput || !katakanaInput) {
        return; // Elements not found
    }
    
    // Check if wanakana is available
    if (typeof wanakana !== 'undefined') {
        // Use wanakana to convert and fill hiragana/katakana fields (keep romaji as romaji)
        romajiInput.addEventListener('input', (e) => {
            const romajiValue = e.target.value.trim();
            
            if (romajiValue) {
                // Auto-fill hiragana if empty or was auto-filled
                if (!hiraganaInput.value.trim() || hiraganaInput.dataset.autoFilled === 'true') {
                    hiraganaInput.value = wanakana.toHiragana(romajiValue);
                    hiraganaInput.dataset.autoFilled = 'true';
                }
                
                // Auto-fill katakana if empty or was auto-filled
                if (!katakanaInput.value.trim() || katakanaInput.dataset.autoFilled === 'true') {
                    katakanaInput.value = wanakana.toKatakana(romajiValue);
                    katakanaInput.dataset.autoFilled = 'true';
                }
            } else {
                // Clear auto-filled fields when romaji is cleared
                if (hiraganaInput.dataset.autoFilled === 'true') {
                    hiraganaInput.value = '';
                    hiraganaInput.dataset.autoFilled = 'false';
                }
                if (katakanaInput.dataset.autoFilled === 'true') {
                    katakanaInput.value = '';
                    katakanaInput.dataset.autoFilled = 'false';
                }
            }
        });
    }
    
    // Mark manual input to prevent auto-overwrite
    hiraganaInput.addEventListener('input', () => {
        if (hiraganaInput.value.trim()) {
            hiraganaInput.dataset.autoFilled = 'false';
        }
    });
    
    katakanaInput.addEventListener('input', () => {
        if (katakanaInput.value.trim()) {
            katakanaInput.dataset.autoFilled = 'false';
        }
    });
}

// No cleanup needed since we don't bind wanakana to inputs
function cleanupRomajiConversion() {
    // No cleanup needed
}

// Utility functions for manual conversion (can be used elsewhere)
function convertRomajiToHiragana(romaji) {
    if (typeof wanakana !== 'undefined') {
        return wanakana.toHiragana(romaji);
    }
    return romaji; // Fallback if wanakana not available
}

function convertRomajiToKatakana(romaji) {
    if (typeof wanakana !== 'undefined') {
        return wanakana.toKatakana(romaji);
    }
    return romaji; // Fallback if wanakana not available
}

function isRomaji(text) {
    if (typeof wanakana !== 'undefined') {
        return wanakana.isRomaji(text);
    }
    // Simple fallback check
    return /^[a-zA-Z\s]+$/.test(text);
}

function isHiragana(text) {
    if (typeof wanakana !== 'undefined') {
        return wanakana.isHiragana(text);
    }
    // Simple fallback check for hiragana unicode range
    return /^[\u3040-\u309F\s]+$/.test(text);
}

function isKatakana(text) {
    if (typeof wanakana !== 'undefined') {
        return wanakana.isKatakana(text);
    }
    // Simple fallback check for katakana unicode range
    return /^[\u30A0-\u30FF\s]+$/.test(text);
}
