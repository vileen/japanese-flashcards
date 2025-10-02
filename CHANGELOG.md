# Changelog

## Version 1.7.0 - Number Characters

### Added
- **Hiragana Numbers** (11 characters) - 0-10 written in hiragana
  - れい (rei/0), いち (ichi/1), に (ni/2), さん (san/3), よん (yon/4), ご (go/5), ろく (roku/6), なな (nana/7), はち (hachi/8), きゅう (kyuu/9), じゅう (juu/10)
- **Katakana Numbers** (11 characters) - 0-10 written in katakana
  - レイ (rei/0), イチ (ichi/1), ニ (ni/2), サン (san/3), ヨン (yon/4), ゴ (go/5), ロク (roku/6), ナナ (nana/7), ハチ (hachi/8), キュウ (kyuu/9), ジュウ (juu/10)
- **Expanded Kanji Numbers** (12 additional characters)
  - 零 (rei/zero), 億 (oku/hundred million)
  - Number-related kanji: 数 (suu/number), 回 (kai/times), 第 (dai/ordinal prefix), 半 (han/half), 倍 (bai/double), 対 (tsui/pair)

### Features
- **Numbers Category** - New dedicated section for number characters in hiragana and katakana selection screens
- **Complete Number System** - Learn numbers across all three writing systems
- **Integrated Practice** - Number characters work seamlessly with all existing practice modes (Multiple Choice, Flashcard, Review/SRS)
- **Consistent Learning** - Same number pronunciations across hiragana, katakana, and kanji systems

### UI Improvements
- Numbers section appears as organized category in character selection
- Visual grouping maintains consistency with existing category system
- Character counts updated to reflect new additions

### Updated Character Counts
- **Hiragana**: 109 → 120 characters (+11 numbers)
- **Katakana**: 109 → 120 characters (+11 numbers) 
- **Kanji**: 160 → 172 characters (+12 expanded numbers)
- **Grand Total**: 412 characters! 🎌

### Technical
- Enhanced `getCategoryGroups()` function to handle numbers category for kana systems
- Maintained consistent data structure across all character types
- Updated README.md with new character counts and number descriptions

---

## Version 1.6.0 - Spaced Repetition System (SRS)

### Added
- **Spaced Repetition Algorithm (SM-2)** - Smart review scheduling based on performance
- **Review Mode** - Dedicated practice mode using spaced repetition
- **Quality Assessments** - 4-button rating system (Again, Hard, Good, Easy)
- **SRS Statistics** - Dashboard showing cards due today, new cards, and learning cards
- **Intelligent Scheduling** - Characters automatically scheduled for review at optimal intervals
- **Performance-Based Intervals** - Review intervals adjust based on how well you know each character
  - Wrong answer → Review in 10 minutes
  - Hard → Review in 1 day (current interval)
  - Good → Review in 3+ days (interval × ease factor)
  - Easy → Review in 7+ days (longer interval)

### Features
- **Smart Review Queue** - Only shows cards that are due for review
- **Persistent SRS Data** - All spaced repetition data saved in localStorage
- **Bidirectional Testing** - Review mode randomly shows character or romaji
- **Progress Tracking** - Real-time statistics during review sessions
- **Ease Factor Adjustment** - Difficulty automatically adjusts based on your performance
- **Review Complete Screen** - Celebratory completion message with session stats

### UI Improvements
- New SRS stat cards on main menu (Due Today, New, Learning)
- Color-coded quality buttons (Red=Again, Orange=Hard, Teal=Good, Green=Easy)
- Two practice buttons: "📚 Start Review" (SRS) and "🎯 Practice Mode" (traditional)
- Time estimates shown on quality buttons
- Clean, modern review interface matching app aesthetic

### Technical
- New `srs.js` module with SM-2 algorithm implementation
- `ReviewPractice` class for SRS-based practice sessions
- Separate localStorage key for SRS data persistence
- Updated service worker cache to v1.6.0
- Integration with existing character selection system

---

## Version 1.5.0 - Drag-to-Select

### Added
- **Drag selection** - Click/tap and drag across characters to select/deselect multiple at once
- **Smart selection mode** - Automatically detects whether to select or deselect based on first character
- **Mobile touch support** - Full touch gesture support for drag selection on mobile devices

### Improved
- **Faster character selection** - Select entire rows or groups with one smooth gesture
- **Better UX** - No need for additional buttons, intuitive drag behavior
- **Cleaner UI** - Removed row select buttons in favor of drag selection

### Removed
- Row select buttons (✓) - Replaced by drag-to-select functionality

### Technical
- Updated service worker cache to v1.5.1
- Added drag state management with `mousedown`, `mouseenter`, `touchstart`, `touchmove` events
- Prevented text selection and touch callout during drag with CSS `user-select: none`
- Global `mouseup` and `touchend` listeners for drag completion

---

## Version 1.4.0 - UI Redesign & Enhanced Practice

### Added
- **Redesigned main menu** - Compact horizontal cards with centered layout
- **Icon-based stats** - Clean stat badges with icons (☑ for selected, ✓ for success rate)
- **Bidirectional flashcards** - Flashcard mode now randomly shows either character→romaji or romaji→character
- **Overlay buttons** - "Need Practice" and "Got It!" buttons overlay the flashcard for faster interaction
- **Custom alert modal** - Replaced native alerts with styled custom modal
- **Glassmorphism effects** - Semi-transparent buttons with backdrop blur
- **Responsive character grid** - Centered layout on desktop/tablet (600px max-width) while maintaining consistent grid

### UI Improvements
- Main menu cards now use vertical stacking (Japanese name, English name, stats)
- All content centered for cleaner look
- Reduced vertical space usage - more compact design for mobile
- Stats displayed as small pill badges instead of full labels
- Dark mode support for all new components
- Consistent character layout across all screen sizes (5 per row for basic, 3 for combinations)
- Character grid centered on larger screens for better readability

### Practice Experience
- Flashcard overlay buttons positioned in center of card
- Reduced finger movement - buttons appear exactly where you tap to reveal
- Both practice modes now test both directions (character↔romaji)
- Custom modal with proper title and single action button (no confusing Cancel)

### Technical
- Updated service worker cache to v1.4.8
- Improved CSS organization and responsiveness
- Better touch targets for mobile devices
- Simplified responsive design - same grid layout across all devices

---

## Version 1.3.0 - Visual Category Grouping & Dark Mode

### Added
- **Visual category sections** - Characters are now grouped with section headers
- **Category headers** - Beautiful gradient headers showing category name and character count
- **"Select All" buttons** - Each category header has a button to select/deselect all characters in that group
- **Row-based organization** - Characters within each category are displayed in traditional kana chart rows
  - Basic characters: vowels, k-row, s-row, t-row, etc. (each row on its own line)
  - Dakuten characters: g-row, z-row, d-row, b-row (each row on its own line)
  - Handakuten and Combinations: displayed as single groups
- **Dark mode** - Toggle between light and dark themes with a moon/sun button (top right)
- **Auto dark mode** - Respects system dark mode preference on first load
- **Organized display** - All characters displayed in logical groups for easier navigation

### Category Groups
**Hiragana/Katakana (4 groups):**
- Basic Characters (46 chars) - All basic kana
- Dakuten (゛) (25 chars) - G, Z, D, B rows
- Handakuten (゜) (5 chars) - P row
- Combinations (拗音) (33 chars) - All yōon characters

**Kanji (14 groups):**
- Numbers, Time, People, Body, Nature, Position
- Places, Objects, Animals, Colors, Actions
- Adjectives, Education, Size

### Improvements
- Much cleaner visual organization (no dropdown needed)
- See all characters at once in organized sections
- Each section shows character count
- Sections automatically hide when empty (filtered views)
- Works seamlessly with existing filters (All, Selected, Need Practice)

### User Experience
- Scroll through organized sections with clear visual separation
- Characters displayed in traditional kana chart rows (5 per row for basic/dakuten)
- Easily see "Basic Characters" vs "Dakuten" vs "Combinations"
- Click "Select All" on any category header to instantly select all characters in that group
- "Select All" button positioned below filters for better workflow
- Build custom practice sets by selecting multiple categories
- Filter by "Selected" to see your selections organized by category
- Clear visual hierarchy makes learning progression intuitive
- Dark mode toggle stays in top-right corner for easy access

---

## Version 1.2.0 - Expanded Kanji Database

### Added
- **110 additional Kanji characters** (50 → 160 total)
  - More numbers & counters: 百, 千, 万, 円
  - Extended time words: 週, 分, 半, 朝, 夕, 夜, 前, 後, 毎, 曜
  - Family members: 父, 母, 友
  - More body parts: 足, 心, 体, 頭, 顔
  - Expanded nature words: 花, 草, 石, 林, 森, 田, 米, 風, 雪, 雲
  - Directions: 左, 右, 東, 西, 南, 北, 外, 内
  - Places: 国, 町, 村, 市, 店, 家, 室, 駅, 道
  - Animals: 犬, 猫, 鳥, 魚, 馬
  - Colors: 白, 赤, 青, 黄, 黒
  - 30+ new verbs: 入, 出, 立, 座, 休, 働, 歩, 走, 飛, 泳, 飲, 買, 売, etc.
  - Adjectives: 新, 古, 高, 低, 長, 短, 多, 少, 良, 悪, 強, 弱, 正, 同, 違
  - Education: 語, 教, 答, 問, 試

### New Categories
- `animals` - Common animals
- `colors` - Basic colors
- `adjectives` - Descriptive words
- `places` - Locations and buildings

### Total Character Count
- **Hiragana**: 109 characters
- **Katakana**: 109 characters
- **Kanji**: 160 characters (+110 from v1.1.0)
- **Grand Total**: 378 characters! 🎉

---

## Version 1.1.0 - Extended Character Sets

### Added
- **Hiragana Dakuten** (25 characters): が, ぎ, ぐ, げ, ご, ざ, じ, ず, ぜ, ぞ, だ, ぢ, づ, で, ど, ば, び, ぶ, べ, ぼ
- **Hiragana Handakuten** (5 characters): ぱ, ぴ, ぷ, ぺ, ぽ
- **Hiragana Combinations** (33 characters): きゃ/きゅ/きょ, しゃ/しゅ/しょ, ちゃ/ちゅ/ちょ, にゃ/にゅ/にょ, ひゃ/ひゅ/ひょ, みゃ/みゅ/みょ, りゃ/りゅ/りょ, ぎゃ/ぎゅ/ぎょ, じゃ/じゅ/じょ, びゃ/びゅ/びょ, ぴゃ/ぴゅ/ぴょ

- **Katakana Dakuten** (25 characters): ガ, ギ, グ, ゲ, ゴ, ザ, ジ, ズ, ゼ, ゾ, ダ, ヂ, ヅ, デ, ド, バ, ビ, ブ, ベ, ボ
- **Katakana Handakuten** (5 characters): パ, ピ, プ, ペ, ポ
- **Katakana Combinations** (33 characters): キャ/キュ/キョ, シャ/シュ/ショ, チャ/チュ/チョ, ニャ/ニュ/ニョ, ヒャ/ヒュ/ヒョ, ミャ/ミュ/ミョ, リャ/リュ/リョ, ギャ/ギュ/ギョ, ジャ/ジュ/ジョ, ビャ/ビュ/ビョ, ピャ/ピュ/ピョ

### Total Character Count
- **Hiragana**: 46 → 109 characters (+63)
- **Katakana**: 46 → 109 characters (+63)
- **Kanji**: 50 characters (unchanged)
- **Grand Total**: 268 characters

### Categories Added
- `g-row` - Dakuten G sounds (ga, gi, gu, ge, go)
- `z-row` - Dakuten Z sounds (za, ji, zu, ze, zo)
- `d-row` - Dakuten D sounds (da, dji, dzu, de, do)
- `b-row` - Dakuten B sounds (ba, bi, bu, be, bo)
- `p-row` - Handakuten P sounds (pa, pi, pu, pe, po)
- `combinations` - Yōon combination characters (kya, sha, cha, etc.)

### Notes
- All dakuten, handakuten, and combination characters now available for practice
- Character selection screen will show all variations
- Grid layout automatically adjusts for larger character sets
- All new characters support both practice modes (Multiple Choice & Flashcard)
- Progress tracking works for all new characters

---

## Version 1.0.0 - Initial Release

### Features
- ✅ PWA with offline support
- ✅ 3 Writing Systems (Hiragana, Katakana, Kanji)
- ✅ Integrated character selection with persistent highlighting
- ✅ Multiple Choice practice mode (bidirectional)
- ✅ Flashcard practice mode with self-assessment
- ✅ Progress tracking and success rates
- ✅ Mobile-optimized for iPhone
- ✅ Beautiful, modern UI

### Character Sets
- Hiragana: 46 basic characters
- Katakana: 46 basic characters
- Kanji: 50 essential characters

### Technical
- Vanilla JavaScript (no frameworks)
- Service Worker for offline functionality
- LocalStorage for data persistence
- Mobile-first responsive design
