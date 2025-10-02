# Japanese Flashcards PWA 日本語学習

A Progressive Web App for learning Japanese writing systems - Hiragana, Katakana, and Kanji.

## Features

- 📱 **Mobile-First PWA** - Install on iPhone home screen, works offline
- 🎌 **Three Writing Systems**:
  - **Hiragana** - 120 characters (46 basic + 25 dakuten + 5 handakuten + 33 combinations + 11 numbers)
  - **Katakana** - 120 characters (46 basic + 25 dakuten + 5 handakuten + 33 combinations + 11 numbers)
  - **Kanji** - 172 essential characters across 14 categories (expanded numbers section)
- ✅ **Smart Character Selection** - Drag-to-select multiple characters, visual grouping by category
- 🧠 **Spaced Repetition System (SRS)** - SM-2 algorithm for optimal learning
- 🎯 **Three Practice Modes**:
  - **Review Mode** - SRS-based smart reviews with 4-level quality assessment
  - **Multiple Choice** - Test with 3 options, bidirectional (character ⇄ romaji)
  - **Flashcard** - Tap to reveal, bidirectional testing, self-assessment
- 📊 **Progress Tracking** - Success rates, review statistics, and learning analytics
- 💾 **Offline Storage** - All progress and SRS data saved locally with LocalStorage
- 🎨 **Beautiful UI** - Modern, touch-optimized design with dark mode

## Installation

### Local Development

1. Clone or download this repository
2. Serve the files using any static server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

3. Open `http://localhost:8000` in your browser

### Install on iPhone

1. Open the app in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Name it and tap "Add"
5. Launch from home screen like a native app!

## How to Use

### 1. Main Menu
- View three writing system cards (Hiragana, Katakana, Kanji)
- See selected character count and success rate for each system

### 2. Character Selection
- Tap any writing system card to enter selection mode
- **Visual category sections** - Characters organized with beautiful section headers
- **Drag to select** - Click/tap and drag across characters to select multiple at once
- **Smart selection** - Automatically selects or deselects based on first character touched
- Selected characters highlighted with colored border and subtle background
- Selection persists across sessions and systems
- Use "Select All" button per category or "All" button for everything
- Filter by status: All, Selected, or Need Practice
- Sections show character counts and hide when empty
- Real-time SRS statistics update as you select characters

### 3. Practice Modes

**Review Mode (Recommended):**
- Uses spaced repetition algorithm (SM-2) for optimal retention
- Shuffled order to prevent pattern memorization
- Only shows cards due for review
- 4-level quality assessment (2×2 grid on mobile, 1×4 on desktop):
  - **Again** - Wrong, review in 10 minutes
  - **Hard** - Difficult, review in 1 day
  - **Good** - Correct, review in 3+ days
  - **Easy** - Perfect, review in 7+ days
- Automatically adjusts review intervals based on performance
- Live SRS dashboard shows: Due Today, New Cards, Learning Cards
- Bidirectional testing (character ⇄ romaji)

**Multiple Choice Mode:**
- Randomly shows either character or romaji
- Choose from 3 options
- Immediate feedback on correct/wrong answers
- Tracks success rate in real-time

**Flashcard Mode:**
- Bidirectional testing (character ⇄ romaji)
- Tap card to reveal the answer
- Semi-transparent overlay buttons for quick self-assessment
- "Need Practice" / "Got It!" centered over the card
- Minimal finger movement for faster reviews
- Perfect for active recall training

### 4. Progress Tracking
- **SRS Dashboard** - Real-time stats for due cards, new cards, learning progress
- Individual character success rates and review history
- System-wide statistics (selected count, success rate)
- Visual indicators for characters needing practice
- Compact, modern UI with icon-based stats
- All data persists offline in LocalStorage

## Technical Details

- **Vanilla JavaScript** - No frameworks, fast and lightweight
- **Progressive Web App** - Service Worker with enhanced iOS update mechanism
- **LocalStorage** - Persistent data storage for progress and SRS data
- **Mobile-Optimized** - Touch gestures, drag-to-select, responsive design
- **Offline-First** - Full functionality without internet
- **Dark Mode** - Theme toggle with system preference detection
- **Custom Modals** - Native-like alerts for better UX across platforms

## File Structure

```
japanese-flashcards/
├── index.html          # Main HTML
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── css/
│   ├── main.css       # Core styles
│   └── components.css # Component styles
├── js/
│   ├── app.js         # Main app logic
│   ├── data.js        # Character data
│   ├── storage.js     # LocalStorage utilities
│   ├── progress.js    # Progress tracking
│   └── practice.js    # Practice modes
└── icons/             # PWA icons

```

## Character Sets

### Hiragana (計 120 characters)
- **46 Basic characters** (あ-ん)
- **25 Dakuten** (゛) - が, ざ, だ, ば rows
- **5 Handakuten** (゜) - ぱ row
- **33 Combination characters** (拗音) - きゃ, しゃ, ちゃ, etc.
- **11 Numbers** (れい-じゅう) - 0-10 in hiragana

### Katakana (計 120 characters)
- **46 Basic characters** (ア-ン)
- **25 Dakuten** (゛) - ガ, ザ, ダ, バ rows
- **5 Handakuten** (゜) - パ row
- **33 Combination characters** (拗音) - キャ, シャ, チャ, etc.
- **11 Numbers** (レイ-ジュウ) - 0-10 in katakana

### Kanji (172 characters)
- **Numbers & Counters** (零-十, 百, 千, 万, 億, 円, 数, 回, 第, 半, 倍, 対)
- **Time Words** (日, 月, 年, 時, 週, 分, 半, 朝, 夕, 夜, 前, 後, 毎, 曜)
- **People & Family** (人, 男, 女, 子, 父, 母, 友, 名, 生, 先)
- **Body Parts** (手, 目, 口, 耳, 足, 心, 体, 頭, 顔)
- **Nature** (水, 火, 木, 金, 土, 山, 川, 空, 雨, 花, 草, 石, 林, 森, 田, 米, 風, 雪, 雲, 電)
- **Directions** (左, 右, 東, 西, 南, 北, 外, 内, 上, 下, 中)
- **Places** (国, 町, 村, 市, 店, 家, 室, 駅, 道)
- **Objects** (物, 本, 車, 門, 紙, 字, 機, 糸)
- **Animals** (犬, 猫, 鳥, 魚, 馬)
- **Colors** (白, 赤, 青, 黄, 黒)
- **Verbs** (行, 来, 見, 言, 食, 書, 読, 入, 出, 立, 座, 休, 働, 歩, 走, 飛, 泳, 飲, 買, 売, 作, 使, 話, 聞, 思, 知, 待, 会, 遊, 開, 閉)
- **Adjectives** (大, 小, 新, 古, 高, 低, 長, 短, 多, 少, 良, 悪, 強, 弱, 正, 同, 違)
- **Education** (学, 教, 語, 答, 問, 試)

## Browser Support

- ✅ Safari (iOS 11.3+)
- ✅ Chrome (Android & Desktop)
- ✅ Firefox
- ✅ Edge

## Future Enhancements

- [x] ~~Add dakuten and combination characters~~ ✅ **DONE** (v1.1.0)
- [x] ~~Expand kanji database~~ ✅ **DONE** (v1.2.0 - 160 kanji)
- [x] ~~Category grouping for easier navigation~~ ✅ **DONE** (v1.3.0)
- [x] ~~Dark mode~~ ✅ **DONE** (v1.3.0)
- [x] ~~Spaced repetition algorithm~~ ✅ **DONE** (v1.6.0 - SM-2 SRS)
- [ ] Export/import progress
- [ ] Study streaks and achievements
- [ ] Audio pronunciation
- [ ] Stroke order diagrams
- [ ] Advanced SRS statistics and charts
- [ ] Custom review session sizes

## License

Free to use and modify for personal learning purposes.

---

Happy Learning! がんばって！ 🎌
