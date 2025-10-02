// Modern Firebase v9+ Integration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { 
    getFirestore, 
    collection, 
    doc, 
    getDocs, 
    setDoc, 
    deleteDoc, 
    serverTimestamp,
    writeBatch
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm6mgwrFtII6ZcfUF2rtNHO-_WbC6Wd-E",
    authDomain: "japanese-flashcards-25f57.firebaseapp.com",
    projectId: "japanese-flashcards-25f57",
    storageBucket: "japanese-flashcards-25f57.firebasestorage.app",
    messagingSenderId: "101297241719",
    appId: "1:101297241719:web:deeb03671e88fa67e09072",
    measurementId: "G-JPC6VHFCT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// Initialize Firebase and set up authentication
async function initFirebase() {
    try {

        // Set up authentication state listener
        onAuthStateChanged(auth, (user) => {
            currentUser = user;
            if (user) {
                updateSyncStatus('synced');
                window.dispatchEvent(new CustomEvent('firebase-auth-ready'));
                // Sync vocabulary data when user is authenticated
                setTimeout(() => {
                    syncVocabularyFromFirebase();
                }, 1000);
            } else {
                updateSyncStatus('syncing');
                signInAnonymously(auth).catch(error => {
                    updateSyncStatus('error');
                });
            }
        });

        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        return false;
    }
}

// Sync vocabulary TO Firebase (upload local changes)
async function syncVocabularyToFirebase() {
    if (!currentUser) {
        console.log('No user authenticated, skipping sync to Firebase');
        return false;
    }

    try {
        updateSyncStatus('syncing');

        const localWords = window.getVocabularyWords();
        const batch = writeBatch(db);
        
        // Get user's vocabulary collection reference
        const userVocabCollection = collection(db, 'users', currentUser.uid, 'vocabulary');

        for (const word of localWords) {
            const docRef = doc(userVocabCollection, word.id);
            batch.set(docRef, {
                ...word.toJSON(),
                syncedAt: serverTimestamp()
            }, { merge: true });
        }

        await batch.commit();
        
        updateSyncStatus('synced');
        return true;
        
    } catch (error) {
        updateSyncStatus('error');
        return false;
    }
}

// Sync vocabulary FROM Firebase (download remote changes)
async function syncVocabularyFromFirebase() {
    if (!currentUser) {
        console.log('No user authenticated, skipping sync from Firebase');
        return false;
    }

    try {
        updateSyncStatus('syncing');

        const userVocabCollection = collection(db, 'users', currentUser.uid, 'vocabulary');
        const snapshot = await getDocs(userVocabCollection);
        
        if (snapshot.empty) {
            updateSyncStatus('synced');
            return true;
        }

        const firebaseWords = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            firebaseWords.push({
                id: doc.id,
                ...data
            });
        });

        // Merge with local data (conflict resolution: latest timestamp wins)
        const localWords = window.getVocabularyWords();
        const mergedWords = mergeVocabularyData(localWords, firebaseWords);
        
        // Update local storage with merged data (CRITICAL for offline access)
        if (mergedWords.length > 0 || firebaseWords.length > 0) {
            window.VocabularyManager.vocabulary.clear();
            mergedWords.forEach(wordData => {
                const word = new window.VocabularyWord(wordData);
                window.VocabularyManager.vocabulary.set(word.id, word);
            });
            // Save to localStorage WITHOUT triggering Firebase sync (prevent loop)
            const vocabularyArray = Array.from(window.VocabularyManager.vocabulary.values()).map(word => word.toJSON());
            window.storeVocabulary(vocabularyArray);
        }

        updateSyncStatus('synced');
        
        // Refresh UI if vocabulary management is open
        const vocabScreen = document.getElementById('vocabulary-management');
        if (vocabScreen && vocabScreen.classList.contains('active')) {
            if (typeof window.displayVocabularyList === 'function') {
                window.displayVocabularyList();
                window.updateVocabularyStats();
            }
        }
        
        return true;
        
    } catch (error) {
        updateSyncStatus('error');
        return false;
    }
}

// Merge local and Firebase data with conflict resolution
function mergeVocabularyData(localWords, firebaseWords) {
    const merged = new Map();
    
    // Add all local words first
    localWords.forEach(word => {
        merged.set(word.id, word);
    });
    
    // Merge Firebase words (overwrite if Firebase version is newer)
    firebaseWords.forEach(firebaseWord => {
        const localWord = merged.get(firebaseWord.id);
        
        if (!localWord) {
            // New word from Firebase
            merged.set(firebaseWord.id, firebaseWord);
        } else {
            // Conflict resolution: use newer timestamp
            const localTime = new Date(localWord.updatedAt || localWord.createdAt);
            const firebaseTime = new Date(firebaseWord.updatedAt || firebaseWord.createdAt);
            
            if (firebaseTime > localTime) {
                merged.set(firebaseWord.id, firebaseWord);
            }
            // Keep local version if it's newer or same time
        }
    });
    
    return Array.from(merged.values());
}

// Delete vocabulary word from Firebase
async function deleteVocabularyFromFirebase(wordId) {
    if (!currentUser) {
        return false;
    }

    try {
        const docRef = doc(db, 'users', currentUser.uid, 'vocabulary', wordId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        return false;
    }
}

// Sync status management
function updateSyncStatus(status) {
    const statusEl = document.getElementById('sync-status');
    if (!statusEl) return;
    
    const statusMessages = {
        'syncing': '🔄 Syncing...',
        'synced': '✅ Synced',
        'offline': '📱 Offline',
        'error': '❌ Sync Error'
    };
    
    statusEl.textContent = statusMessages[status] || status;
    statusEl.className = `sync-status ${status}`;
}

// Online/Offline detection
function setupNetworkDetection() {
    function updateOnlineStatus() {
        if (navigator.onLine && currentUser) {
            updateSyncStatus('synced');
            // Attempt to sync when coming back online
            setTimeout(() => {
                syncVocabularyFromFirebase();
            }, 1000);
        } else {
            updateSyncStatus('offline');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial status
    updateOnlineStatus();
}

// Auto-sync when vocabulary changes
function setupAutoSync() {
    // Listen for vocabulary changes
    window.addEventListener('vocabulary-changed', () => {
        if (currentUser) {
            setTimeout(() => {
                syncVocabularyToFirebase();
            }, 500);
        }
    });
}

// Initialize everything
async function initFirebaseSystem() {
    const success = await initFirebase();
    if (success) {
        setupNetworkDetection();
        setupAutoSync();
    } else {
        updateSyncStatus('error');
    }
}

// Export to window for global access
window.initFirebaseSystem = initFirebaseSystem;
window.syncVocabularyToFirebase = syncVocabularyToFirebase;
window.syncVocabularyFromFirebase = syncVocabularyFromFirebase;
window.deleteVocabularyFromFirebase = deleteVocabularyFromFirebase;

// Auto-initialize
initFirebaseSystem();
