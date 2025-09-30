# Quick Start Guide 🚀

## Running the App

### Option 1: Using Python (Recommended - No Installation)
```bash
python3 -m http.server 8000
```

### Option 2: Using npx (No Installation Required)
```bash
npx http-server -p 8000
```

### Option 3: Using npm script
```bash
npm start
```

Then open: **http://localhost:8000**

## First Time Setup

1. **Start the server** (see above)
2. **Open in browser** - Navigate to http://localhost:8000
3. **Select characters**:
   - Click on any writing system card (Hiragana/Katakana/Kanji)
   - Tap characters to add them to your practice pool
   - Selected characters get a ✓ checkmark and stay highlighted
   - Switch between systems freely - selections persist!
4. **Start practicing**:
   - Click "Start Practice" from main menu
   - Choose Multiple Choice or Flashcard mode
   - Practice and track your progress!

## Testing on iPhone

### Method 1: Local Network
1. Find your computer's IP address:
   - Mac: System Preferences → Network
   - Look for something like `192.168.1.X`
2. Start the server on your computer
3. On iPhone (same WiFi), open Safari and go to `http://YOUR-IP:8000`
4. Add to Home Screen (see below)

### Method 2: Deploy to GitHub Pages
1. Push this repo to GitHub
2. Enable GitHub Pages in repo settings
3. Visit the URL on your iPhone
4. Add to Home Screen

### Installing as PWA on iPhone
1. Open the app in **Safari** (must use Safari, not Chrome)
2. Tap the **Share** button (square with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it (e.g., "日本語") and tap **Add**
5. The app icon will appear on your home screen
6. Launch it like any native app - works offline!

## Key Features to Try

✅ **Cross-System Selection**: Select characters from Hiragana, then switch to Katakana, add more characters, go back to Hiragana - all selections are remembered!

✅ **Bidirectional Practice**: In Multiple Choice mode, sometimes you'll see the character and need to choose the romaji, sometimes vice versa

✅ **Flashcard Self-Assessment**: Tap to reveal, then honestly assess yourself with "Got It!" or "Need Practice"

✅ **Progress Tracking**: Watch your success rates improve over time

✅ **Offline Mode**: After first load, works completely offline

## Troubleshooting

**Icons not showing?**
- Run `node generate-icons.js` to regenerate
- Or open `generate-icons.html` in browser and download PNG versions

**Service Worker issues?**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear cache and reload

**Selection not persisting?**
- Check LocalStorage is enabled in browser
- Check browser console for errors

**On iPhone, can't add to home screen?**
- Must use Safari browser (not Chrome or Firefox)
- Make sure you're on the actual app page, not a local file

## Project Structure
```
japanese-flashcards/
├── index.html          # Main entry point
├── manifest.json       # PWA configuration
├── sw.js              # Service worker for offline
├── css/               # Styles
├── js/                # App logic
│   ├── app.js         # Main controller
│   ├── data.js        # Character databases
│   ├── storage.js     # LocalStorage management
│   ├── progress.js    # Progress tracking
│   └── practice.js    # Practice modes
└── icons/             # PWA icons
```

## Next Steps

1. **Practice regularly** - Consistency is key!
2. **Track your progress** - Watch your success rates climb
3. **Use both modes** - Multiple Choice for testing, Flashcards for recall
4. **Start small** - Select just vowels first, then expand
5. **Review struggling characters** - Use the "Need Practice" filter

がんばって！(Good luck!) 🎌
