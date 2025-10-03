// Pull-to-Refresh for iOS
// Implements native-like pull-to-refresh gesture for vocabulary sync

let pullToRefreshEnabled = false;
let startY = 0;
let currentY = 0;
let pullDistance = 0;
let isPulling = false;
let refreshThreshold = 80; // Distance needed to trigger refresh

// Initialize pull-to-refresh for vocabulary management
function initPullToRefresh() {
    const vocabularyScreen = document.getElementById('vocabulary-management');
    const vocabularyList = document.getElementById('vocabulary-list');
    
    if (!vocabularyScreen || !vocabularyList) return;
    
    // Create pull indicator
    createPullIndicator();
    
    // Add touch event listeners
    vocabularyList.addEventListener('touchstart', handleTouchStart, { passive: false });
    vocabularyList.addEventListener('touchmove', handleTouchMove, { passive: false });
    vocabularyList.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    console.log('Pull-to-refresh initialized for vocabulary management');
}

// Create the pull indicator element
function createPullIndicator() {
    if (document.getElementById('pull-indicator')) return; // Already exists
    
    const indicator = document.createElement('div');
    indicator.id = 'pull-indicator';
    indicator.className = 'pull-indicator';
    indicator.innerHTML = `
        <div class="pull-icon">🔄</div>
        <div class="pull-text">Pull to sync</div>
    `;
    
    // Insert at the top of vocabulary list
    const vocabularyList = document.getElementById('vocabulary-list');
    if (vocabularyList) {
        vocabularyList.parentNode.insertBefore(indicator, vocabularyList);
    }
}

// Handle touch start
function handleTouchStart(e) {
    const vocabularyList = document.getElementById('vocabulary-list');
    
    // Only enable pull-to-refresh if at the top of the list
    if (vocabularyList.scrollTop === 0) {
        startY = e.touches[0].clientY;
        pullToRefreshEnabled = true;
    } else {
        pullToRefreshEnabled = false;
    }
}

// Handle touch move
function handleTouchMove(e) {
    if (!pullToRefreshEnabled) return;
    
    currentY = e.touches[0].clientY;
    pullDistance = Math.max(0, currentY - startY);
    
    // Only prevent default if pulling down
    if (pullDistance > 0) {
        e.preventDefault();
        isPulling = true;
        
        // Update pull indicator
        updatePullIndicator(pullDistance);
        
        // Add resistance effect (slow down the pull as it gets longer)
        const resistance = Math.min(pullDistance * 0.5, 120);
        const vocabularyControls = document.querySelector('.vocabulary-controls');
        if (vocabularyControls) {
            vocabularyControls.style.transform = `translateY(${resistance}px)`;
        }
        
        const vocabularyList = document.getElementById('vocabulary-list');
        if (vocabularyList) {
            vocabularyList.style.transform = `translateY(${resistance}px)`;
        }
    }
}

// Handle touch end
function handleTouchEnd(e) {
    if (!isPulling) return;
    
    const shouldRefresh = pullDistance >= refreshThreshold;
    
    // Reset transforms
    const vocabularyControls = document.querySelector('.vocabulary-controls');
    const vocabularyList = document.getElementById('vocabulary-list');
    const indicator = document.getElementById('pull-indicator');
    
    if (vocabularyControls) {
        vocabularyControls.style.transform = '';
        vocabularyControls.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            vocabularyControls.style.transition = '';
        }, 300);
    }
    
    if (vocabularyList) {
        vocabularyList.style.transform = '';
        vocabularyList.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            vocabularyList.style.transition = '';
        }, 300);
    }
    
    if (indicator) {
        indicator.style.transform = '';
        indicator.style.opacity = '0';
    }
    
    // Trigger refresh if threshold was reached
    if (shouldRefresh) {
        triggerVocabularyRefresh();
    }
    
    // Reset state
    pullToRefreshEnabled = false;
    isPulling = false;
    pullDistance = 0;
    startY = 0;
    currentY = 0;
}

// Update pull indicator based on pull distance
function updatePullIndicator(distance) {
    const indicator = document.getElementById('pull-indicator');
    if (!indicator) return;
    
    const progress = Math.min(distance / refreshThreshold, 1);
    const rotation = progress * 360;
    
    // Show indicator
    indicator.style.opacity = Math.min(progress * 2, 1);
    indicator.style.transform = `translateY(${Math.min(distance * 0.5, 60)}px)`;
    
    // Rotate icon based on progress
    const icon = indicator.querySelector('.pull-icon');
    if (icon) {
        icon.style.transform = `rotate(${rotation}deg)`;
    }
    
    // Update text based on progress
    const text = indicator.querySelector('.pull-text');
    if (text) {
        if (progress >= 1) {
            text.textContent = 'Release to sync';
            indicator.classList.add('ready');
        } else {
            text.textContent = 'Pull to sync';
            indicator.classList.remove('ready');
        }
    }
}

// Trigger vocabulary refresh/sync
async function triggerVocabularyRefresh() {
    console.log('Pull-to-refresh triggered');
    
    // Show sync feedback
    const indicator = document.getElementById('pull-indicator');
    if (indicator) {
        indicator.querySelector('.pull-text').textContent = 'Syncing...';
        indicator.classList.add('syncing');
    }
    
    // Trigger Firebase sync
    if (typeof window.syncVocabularyFromFirebase === 'function') {
        try {
            const success = await window.syncVocabularyFromFirebase();
            
            // Update UI
            if (typeof displayVocabularyList === 'function') {
                displayVocabularyList();
                updateVocabularyStats();
            }
            
            // Show success feedback
            setTimeout(() => {
                if (indicator) {
                    indicator.querySelector('.pull-text').textContent = success ? 'Synced!' : 'Sync failed';
                    indicator.classList.remove('syncing');
                    indicator.classList.add(success ? 'success' : 'error');
                    
                    // Hide after delay
                    setTimeout(() => {
                        indicator.style.opacity = '0';
                        indicator.classList.remove('success', 'error', 'ready');
                    }, 1500);
                }
            }, 500);
            
        } catch (error) {
            console.error('Pull-to-refresh sync failed:', error);
            
            if (indicator) {
                indicator.querySelector('.pull-text').textContent = 'Sync failed';
                indicator.classList.remove('syncing');
                indicator.classList.add('error');
                
                setTimeout(() => {
                    indicator.style.opacity = '0';
                    indicator.classList.remove('error', 'ready');
                }, 1500);
            }
        }
    }
}

// Setup pull-to-refresh when vocabulary management is loaded
function setupPullToRefresh() {
    // Only enable on touch devices (mobile)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        initPullToRefresh();
    }
}

// Export functions
window.setupPullToRefresh = setupPullToRefresh;
window.triggerVocabularyRefresh = triggerVocabularyRefresh;
