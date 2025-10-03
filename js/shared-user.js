// Shared User System
// Allows sharing vocabulary across devices using a common user ID

// Generate or retrieve a shareable user ID
function getOrCreateSharedUserId() {
    // Check if user has a shared ID stored locally
    let sharedUserId = localStorage.getItem('sharedUserId');
    
    if (!sharedUserId) {
        // Generate a new shareable ID (8 characters, easy to share)
        sharedUserId = generateShareableId();
        localStorage.setItem('sharedUserId', sharedUserId);
    }
    
    return sharedUserId;
}

// Generate a human-friendly shareable ID
function generateShareableId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Set a shared user ID (for joining another device's vocabulary)
function setSharedUserId(newUserId) {
    if (!newUserId || newUserId.length !== 8) {
        throw new Error('Invalid user ID. Must be 8 characters.');
    }
    
    const oldUserId = localStorage.getItem('sharedUserId');
    const originalId = localStorage.getItem('originalUserId');
    
    // Store original ID if this is the first time joining
    if (!originalId && oldUserId) {
        localStorage.setItem('originalUserId', oldUserId);
    }
    
    localStorage.setItem('sharedUserId', newUserId.toUpperCase());
    
    // If changing user ID, trigger a sync to get the new user's data
    if (oldUserId !== newUserId.toUpperCase()) {
        console.log('Switching to shared user ID:', newUserId.toUpperCase());
        
        // Clear current vocabulary to avoid mixing data
        if (window.VocabularyManager) {
            window.VocabularyManager.vocabulary.clear();
            window.VocabularyManager.saveVocabulary(true); // Skip Firebase sync
        }
        
        // Clear localStorage vocabulary
        localStorage.setItem('vocabulary_words', JSON.stringify([]));
        
        // Trigger sync from new user's Firebase data
        if (typeof window.syncVocabularyFromFirebase === 'function') {
            // Show user-friendly message
            if (typeof showAlert === 'function') {
                showAlert('Syncing...', 'Downloading vocabulary from shared device. This may take a few seconds.');
            }
            
            setTimeout(() => {
                console.log('Triggering sync from Firebase for new user ID');
                window.syncVocabularyFromFirebase().then(() => {
                    // Refresh the vocabulary display after sync
                    if (typeof displayVocabularyList === 'function') {
                        displayVocabularyList();
                        updateVocabularyStats();
                    }
                    if (typeof showAlert === 'function') {
                        showAlert('Sync Complete!', 'Vocabulary has been synced from the shared device.');
                    }
                });
            }, 1000);
        }
    }
    
    return newUserId.toUpperCase();
}

// Get the current shared user ID for display
function getCurrentSharedUserId() {
    return localStorage.getItem('sharedUserId') || null;
}

// Show the sharing modal
function showSharingModal() {
    const modal = document.getElementById('sharing-modal');
    const currentId = getOrCreateSharedUserId();
    
    document.getElementById('current-user-id').textContent = currentId;
    document.getElementById('join-user-id').value = '';
    
    // Show current joined ID if different from generated ID
    const joinedIdDisplay = document.getElementById('joined-id-display');
    if (joinedIdDisplay) {
        const originalId = localStorage.getItem('originalUserId');
        if (originalId && originalId !== currentId) {
            joinedIdDisplay.style.display = 'block';
            document.getElementById('joined-id').textContent = currentId;
        } else {
            joinedIdDisplay.style.display = 'none';
        }
    }
    
    modal.style.display = 'flex';
}

function hideSharingModal() {
    document.getElementById('sharing-modal').style.display = 'none';
}

// Join another user's vocabulary
function joinUserVocabulary() {
    const inputId = document.getElementById('join-user-id').value.trim().toUpperCase();
    
    if (!inputId) {
        showAlert('Invalid ID', 'Please enter a valid 8-character user ID.');
        return;
    }
    
    if (inputId.length !== 8) {
        showAlert('Invalid ID', 'User ID must be exactly 8 characters.');
        return;
    }
    
    try {
        setSharedUserId(inputId);
        hideSharingModal();
        showAlert('Success!', `Joined user ${inputId}. Syncing vocabulary...`);
        
        // Refresh the vocabulary display
        if (typeof displayVocabularyList === 'function') {
            setTimeout(() => {
                displayVocabularyList();
                updateVocabularyStats();
            }, 1000);
        }
    } catch (error) {
        showAlert('Error', error.message);
    }
}

// Copy user ID to clipboard
function copyUserIdToClipboard() {
    const userId = getCurrentSharedUserId();
    if (!userId) return;
    
    if (navigator.clipboard && window.isSecureContext) {
        // Modern clipboard API
        navigator.clipboard.writeText(userId).then(() => {
            showCopyFeedback();
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(userId);
        });
    } else {
        // Fallback for older browsers or non-HTTPS
        fallbackCopy(userId);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback() {
    const copyBtn = document.getElementById('copy-user-id');
    if (copyBtn) {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    }
}

// Setup sharing modal event listeners
function setupSharingModal() {
    // Close modal
    const closeBtn = document.getElementById('close-sharing-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideSharingModal);
    }
    
    const cancelBtn = document.getElementById('cancel-sharing');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideSharingModal);
    }
    
    // Copy button
    const copyBtn = document.getElementById('copy-user-id');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyUserIdToClipboard);
    }
    
    // Join user button
    const joinBtn = document.getElementById('join-user-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', joinUserVocabulary);
    }
    
    // Close on background click
    const modal = document.getElementById('sharing-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideSharingModal();
            }
        });
    }
    
    // ESC key support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('sharing-modal');
            if (modal && modal.style.display === 'flex') {
                hideSharingModal();
            }
        }
    });
}

// Override Firebase user ID for shared vocabulary
function getEffectiveUserId() {
    const sharedId = getCurrentSharedUserId();
    console.log('getEffectiveUserId - sharedId:', sharedId);
    
    if (sharedId) {
        const effectiveId = `shared_${sharedId}`;
        console.log('Using shared user ID:', effectiveId);
        return effectiveId;
    }
    
    // Fallback to Firebase user ID
    if (window.currentUser) {
        console.log('Using Firebase user ID:', window.currentUser.uid);
        return window.currentUser.uid;
    }
    
    console.log('No user ID available');
    return null;
}

// Export functions
window.getOrCreateSharedUserId = getOrCreateSharedUserId;
window.setSharedUserId = setSharedUserId;
window.getCurrentSharedUserId = getCurrentSharedUserId;
window.showSharingModal = showSharingModal;
window.getEffectiveUserId = getEffectiveUserId;
window.setupSharingModal = setupSharingModal;
