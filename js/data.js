// Character data for all three writing systems
const HIRAGANA = [
    // Vowels
    { id: 'h_a', character: 'あ', romaji: 'a', category: 'vowels' },
    { id: 'h_i', character: 'い', romaji: 'i', category: 'vowels' },
    { id: 'h_u', character: 'う', romaji: 'u', category: 'vowels' },
    { id: 'h_e', character: 'え', romaji: 'e', category: 'vowels' },
    { id: 'h_o', character: 'お', romaji: 'o', category: 'vowels' },
    
    // K-row
    { id: 'h_ka', character: 'か', romaji: 'ka', category: 'k-row' },
    { id: 'h_ki', character: 'き', romaji: 'ki', category: 'k-row' },
    { id: 'h_ku', character: 'く', romaji: 'ku', category: 'k-row' },
    { id: 'h_ke', character: 'け', romaji: 'ke', category: 'k-row' },
    { id: 'h_ko', character: 'こ', romaji: 'ko', category: 'k-row' },
    
    // S-row
    { id: 'h_sa', character: 'さ', romaji: 'sa', category: 's-row' },
    { id: 'h_shi', character: 'し', romaji: 'shi', category: 's-row' },
    { id: 'h_su', character: 'す', romaji: 'su', category: 's-row' },
    { id: 'h_se', character: 'せ', romaji: 'se', category: 's-row' },
    { id: 'h_so', character: 'そ', romaji: 'so', category: 's-row' },
    
    // T-row
    { id: 'h_ta', character: 'た', romaji: 'ta', category: 't-row' },
    { id: 'h_chi', character: 'ち', romaji: 'chi', category: 't-row' },
    { id: 'h_tsu', character: 'つ', romaji: 'tsu', category: 't-row' },
    { id: 'h_te', character: 'て', romaji: 'te', category: 't-row' },
    { id: 'h_to', character: 'と', romaji: 'to', category: 't-row' },
    
    // N-row
    { id: 'h_na', character: 'な', romaji: 'na', category: 'n-row' },
    { id: 'h_ni', character: 'に', romaji: 'ni', category: 'n-row' },
    { id: 'h_nu', character: 'ぬ', romaji: 'nu', category: 'n-row' },
    { id: 'h_ne', character: 'ね', romaji: 'ne', category: 'n-row' },
    { id: 'h_no', character: 'の', romaji: 'no', category: 'n-row' },
    
    // H-row
    { id: 'h_ha', character: 'は', romaji: 'ha', category: 'h-row' },
    { id: 'h_hi', character: 'ひ', romaji: 'hi', category: 'h-row' },
    { id: 'h_fu', character: 'ふ', romaji: 'fu', category: 'h-row' },
    { id: 'h_he', character: 'へ', romaji: 'he', category: 'h-row' },
    { id: 'h_ho', character: 'ほ', romaji: 'ho', category: 'h-row' },
    
    // M-row
    { id: 'h_ma', character: 'ま', romaji: 'ma', category: 'm-row' },
    { id: 'h_mi', character: 'み', romaji: 'mi', category: 'm-row' },
    { id: 'h_mu', character: 'む', romaji: 'mu', category: 'm-row' },
    { id: 'h_me', character: 'め', romaji: 'me', category: 'm-row' },
    { id: 'h_mo', character: 'も', romaji: 'mo', category: 'm-row' },
    
    // Y-row
    { id: 'h_ya', character: 'や', romaji: 'ya', category: 'y-row' },
    { id: 'h_yu', character: 'ゆ', romaji: 'yu', category: 'y-row' },
    { id: 'h_yo', character: 'よ', romaji: 'yo', category: 'y-row' },
    
    // R-row
    { id: 'h_ra', character: 'ら', romaji: 'ra', category: 'r-row' },
    { id: 'h_ri', character: 'り', romaji: 'ri', category: 'r-row' },
    { id: 'h_ru', character: 'る', romaji: 'ru', category: 'r-row' },
    { id: 'h_re', character: 'れ', romaji: 're', category: 'r-row' },
    { id: 'h_ro', character: 'ろ', romaji: 'ro', category: 'r-row' },
    
    // W-row
    { id: 'h_wa', character: 'わ', romaji: 'wa', category: 'w-row' },
    { id: 'h_wo', character: 'を', romaji: 'wo', category: 'w-row' },
    
    // N
    { id: 'h_n', character: 'ん', romaji: 'n', category: 'n' },
    
    // Dakuten (゛) - G-row
    { id: 'h_ga', character: 'が', romaji: 'ga', category: 'g-row' },
    { id: 'h_gi', character: 'ぎ', romaji: 'gi', category: 'g-row' },
    { id: 'h_gu', character: 'ぐ', romaji: 'gu', category: 'g-row' },
    { id: 'h_ge', character: 'げ', romaji: 'ge', category: 'g-row' },
    { id: 'h_go', character: 'ご', romaji: 'go', category: 'g-row' },
    
    // Z-row
    { id: 'h_za', character: 'ざ', romaji: 'za', category: 'z-row' },
    { id: 'h_ji', character: 'じ', romaji: 'ji', category: 'z-row' },
    { id: 'h_zu', character: 'ず', romaji: 'zu', category: 'z-row' },
    { id: 'h_ze', character: 'ぜ', romaji: 'ze', category: 'z-row' },
    { id: 'h_zo', character: 'ぞ', romaji: 'zo', category: 'z-row' },
    
    // D-row
    { id: 'h_da', character: 'だ', romaji: 'da', category: 'd-row' },
    { id: 'h_dji', character: 'ぢ', romaji: 'dji', category: 'd-row' },
    { id: 'h_dzu', character: 'づ', romaji: 'dzu', category: 'd-row' },
    { id: 'h_de', character: 'で', romaji: 'de', category: 'd-row' },
    { id: 'h_do', character: 'ど', romaji: 'do', category: 'd-row' },
    
    // B-row
    { id: 'h_ba', character: 'ば', romaji: 'ba', category: 'b-row' },
    { id: 'h_bi', character: 'び', romaji: 'bi', category: 'b-row' },
    { id: 'h_bu', character: 'ぶ', romaji: 'bu', category: 'b-row' },
    { id: 'h_be', character: 'べ', romaji: 'be', category: 'b-row' },
    { id: 'h_bo', character: 'ぼ', romaji: 'bo', category: 'b-row' },
    
    // Handakuten (゜) - P-row
    { id: 'h_pa', character: 'ぱ', romaji: 'pa', category: 'p-row' },
    { id: 'h_pi', character: 'ぴ', romaji: 'pi', category: 'p-row' },
    { id: 'h_pu', character: 'ぷ', romaji: 'pu', category: 'p-row' },
    { id: 'h_pe', character: 'ぺ', romaji: 'pe', category: 'p-row' },
    { id: 'h_po', character: 'ぽ', romaji: 'po', category: 'p-row' },
    
    // Combination characters (拗音) - Kya
    { id: 'h_kya', character: 'きゃ', romaji: 'kya', category: 'combinations' },
    { id: 'h_kyu', character: 'きゅ', romaji: 'kyu', category: 'combinations' },
    { id: 'h_kyo', character: 'きょ', romaji: 'kyo', category: 'combinations' },
    
    // Sha
    { id: 'h_sha', character: 'しゃ', romaji: 'sha', category: 'combinations' },
    { id: 'h_shu', character: 'しゅ', romaji: 'shu', category: 'combinations' },
    { id: 'h_sho', character: 'しょ', romaji: 'sho', category: 'combinations' },
    
    // Cha
    { id: 'h_cha', character: 'ちゃ', romaji: 'cha', category: 'combinations' },
    { id: 'h_chu', character: 'ちゅ', romaji: 'chu', category: 'combinations' },
    { id: 'h_cho', character: 'ちょ', romaji: 'cho', category: 'combinations' },
    
    // Nya
    { id: 'h_nya', character: 'にゃ', romaji: 'nya', category: 'combinations' },
    { id: 'h_nyu', character: 'にゅ', romaji: 'nyu', category: 'combinations' },
    { id: 'h_nyo', character: 'にょ', romaji: 'nyo', category: 'combinations' },
    
    // Hya
    { id: 'h_hya', character: 'ひゃ', romaji: 'hya', category: 'combinations' },
    { id: 'h_hyu', character: 'ひゅ', romaji: 'hyu', category: 'combinations' },
    { id: 'h_hyo', character: 'ひょ', romaji: 'hyo', category: 'combinations' },
    
    // Mya
    { id: 'h_mya', character: 'みゃ', romaji: 'mya', category: 'combinations' },
    { id: 'h_myu', character: 'みゅ', romaji: 'myu', category: 'combinations' },
    { id: 'h_myo', character: 'みょ', romaji: 'myo', category: 'combinations' },
    
    // Rya
    { id: 'h_rya', character: 'りゃ', romaji: 'rya', category: 'combinations' },
    { id: 'h_ryu', character: 'りゅ', romaji: 'ryu', category: 'combinations' },
    { id: 'h_ryo', character: 'りょ', romaji: 'ryo', category: 'combinations' },
    
    // Gya (dakuten combinations)
    { id: 'h_gya', character: 'ぎゃ', romaji: 'gya', category: 'combinations' },
    { id: 'h_gyu', character: 'ぎゅ', romaji: 'gyu', category: 'combinations' },
    { id: 'h_gyo', character: 'ぎょ', romaji: 'gyo', category: 'combinations' },
    
    // Ja
    { id: 'h_ja', character: 'じゃ', romaji: 'ja', category: 'combinations' },
    { id: 'h_ju', character: 'じゅ', romaji: 'ju', category: 'combinations' },
    { id: 'h_jo', character: 'じょ', romaji: 'jo', category: 'combinations' },
    
    // Bya
    { id: 'h_bya', character: 'びゃ', romaji: 'bya', category: 'combinations' },
    { id: 'h_byu', character: 'びゅ', romaji: 'byu', category: 'combinations' },
    { id: 'h_byo', character: 'びょ', romaji: 'byo', category: 'combinations' },
    
    // Pya (handakuten combinations)
    { id: 'h_pya', character: 'ぴゃ', romaji: 'pya', category: 'combinations' },
    { id: 'h_pyu', character: 'ぴゅ', romaji: 'pyu', category: 'combinations' },
    { id: 'h_pyo', character: 'ぴょ', romaji: 'pyo', category: 'combinations' }
];

const KATAKANA = [
    // Vowels
    { id: 'k_a', character: 'ア', romaji: 'a', category: 'vowels' },
    { id: 'k_i', character: 'イ', romaji: 'i', category: 'vowels' },
    { id: 'k_u', character: 'ウ', romaji: 'u', category: 'vowels' },
    { id: 'k_e', character: 'エ', romaji: 'e', category: 'vowels' },
    { id: 'k_o', character: 'オ', romaji: 'o', category: 'vowels' },
    
    // K-row
    { id: 'k_ka', character: 'カ', romaji: 'ka', category: 'k-row' },
    { id: 'k_ki', character: 'キ', romaji: 'ki', category: 'k-row' },
    { id: 'k_ku', character: 'ク', romaji: 'ku', category: 'k-row' },
    { id: 'k_ke', character: 'ケ', romaji: 'ke', category: 'k-row' },
    { id: 'k_ko', character: 'コ', romaji: 'ko', category: 'k-row' },
    
    // S-row
    { id: 'k_sa', character: 'サ', romaji: 'sa', category: 's-row' },
    { id: 'k_shi', character: 'シ', romaji: 'shi', category: 's-row' },
    { id: 'k_su', character: 'ス', romaji: 'su', category: 's-row' },
    { id: 'k_se', character: 'セ', romaji: 'se', category: 's-row' },
    { id: 'k_so', character: 'ソ', romaji: 'so', category: 's-row' },
    
    // T-row
    { id: 'k_ta', character: 'タ', romaji: 'ta', category: 't-row' },
    { id: 'k_chi', character: 'チ', romaji: 'chi', category: 't-row' },
    { id: 'k_tsu', character: 'ツ', romaji: 'tsu', category: 't-row' },
    { id: 'k_te', character: 'テ', romaji: 'te', category: 't-row' },
    { id: 'k_to', character: 'ト', romaji: 'to', category: 't-row' },
    
    // N-row
    { id: 'k_na', character: 'ナ', romaji: 'na', category: 'n-row' },
    { id: 'k_ni', character: 'ニ', romaji: 'ni', category: 'n-row' },
    { id: 'k_nu', character: 'ヌ', romaji: 'nu', category: 'n-row' },
    { id: 'k_ne', character: 'ネ', romaji: 'ne', category: 'n-row' },
    { id: 'k_no', character: 'ノ', romaji: 'no', category: 'n-row' },
    
    // H-row
    { id: 'k_ha', character: 'ハ', romaji: 'ha', category: 'h-row' },
    { id: 'k_hi', character: 'ヒ', romaji: 'hi', category: 'h-row' },
    { id: 'k_fu', character: 'フ', romaji: 'fu', category: 'h-row' },
    { id: 'k_he', character: 'ヘ', romaji: 'he', category: 'h-row' },
    { id: 'k_ho', character: 'ホ', romaji: 'ho', category: 'h-row' },
    
    // M-row
    { id: 'k_ma', character: 'マ', romaji: 'ma', category: 'm-row' },
    { id: 'k_mi', character: 'ミ', romaji: 'mi', category: 'm-row' },
    { id: 'k_mu', character: 'ム', romaji: 'mu', category: 'm-row' },
    { id: 'k_me', character: 'メ', romaji: 'me', category: 'm-row' },
    { id: 'k_mo', character: 'モ', romaji: 'mo', category: 'm-row' },
    
    // Y-row
    { id: 'k_ya', character: 'ヤ', romaji: 'ya', category: 'y-row' },
    { id: 'k_yu', character: 'ユ', romaji: 'yu', category: 'y-row' },
    { id: 'k_yo', character: 'ヨ', romaji: 'yo', category: 'y-row' },
    
    // R-row
    { id: 'k_ra', character: 'ラ', romaji: 'ra', category: 'r-row' },
    { id: 'k_ri', character: 'リ', romaji: 'ri', category: 'r-row' },
    { id: 'k_ru', character: 'ル', romaji: 'ru', category: 'r-row' },
    { id: 'k_re', character: 'レ', romaji: 're', category: 'r-row' },
    { id: 'k_ro', character: 'ロ', romaji: 'ro', category: 'r-row' },
    
    // W-row
    { id: 'k_wa', character: 'ワ', romaji: 'wa', category: 'w-row' },
    { id: 'k_wo', character: 'ヲ', romaji: 'wo', category: 'w-row' },
    
    // N
    { id: 'k_n', character: 'ン', romaji: 'n', category: 'n' },
    
    // Dakuten (゛) - G-row
    { id: 'k_ga', character: 'ガ', romaji: 'ga', category: 'g-row' },
    { id: 'k_gi', character: 'ギ', romaji: 'gi', category: 'g-row' },
    { id: 'k_gu', character: 'グ', romaji: 'gu', category: 'g-row' },
    { id: 'k_ge', character: 'ゲ', romaji: 'ge', category: 'g-row' },
    { id: 'k_go', character: 'ゴ', romaji: 'go', category: 'g-row' },
    
    // Z-row
    { id: 'k_za', character: 'ザ', romaji: 'za', category: 'z-row' },
    { id: 'k_ji', character: 'ジ', romaji: 'ji', category: 'z-row' },
    { id: 'k_zu', character: 'ズ', romaji: 'zu', category: 'z-row' },
    { id: 'k_ze', character: 'ゼ', romaji: 'ze', category: 'z-row' },
    { id: 'k_zo', character: 'ゾ', romaji: 'zo', category: 'z-row' },
    
    // D-row
    { id: 'k_da', character: 'ダ', romaji: 'da', category: 'd-row' },
    { id: 'k_dji', character: 'ヂ', romaji: 'dji', category: 'd-row' },
    { id: 'k_dzu', character: 'ヅ', romaji: 'dzu', category: 'd-row' },
    { id: 'k_de', character: 'デ', romaji: 'de', category: 'd-row' },
    { id: 'k_do', character: 'ド', romaji: 'do', category: 'd-row' },
    
    // B-row
    { id: 'k_ba', character: 'バ', romaji: 'ba', category: 'b-row' },
    { id: 'k_bi', character: 'ビ', romaji: 'bi', category: 'b-row' },
    { id: 'k_bu', character: 'ブ', romaji: 'bu', category: 'b-row' },
    { id: 'k_be', character: 'ベ', romaji: 'be', category: 'b-row' },
    { id: 'k_bo', character: 'ボ', romaji: 'bo', category: 'b-row' },
    
    // Handakuten (゜) - P-row
    { id: 'k_pa', character: 'パ', romaji: 'pa', category: 'p-row' },
    { id: 'k_pi', character: 'ピ', romaji: 'pi', category: 'p-row' },
    { id: 'k_pu', character: 'プ', romaji: 'pu', category: 'p-row' },
    { id: 'k_pe', character: 'ペ', romaji: 'pe', category: 'p-row' },
    { id: 'k_po', character: 'ポ', romaji: 'po', category: 'p-row' },
    
    // Combination characters (拗音) - Kya
    { id: 'k_kya', character: 'キャ', romaji: 'kya', category: 'combinations' },
    { id: 'k_kyu', character: 'キュ', romaji: 'kyu', category: 'combinations' },
    { id: 'k_kyo', character: 'キョ', romaji: 'kyo', category: 'combinations' },
    
    // Sha
    { id: 'k_sha', character: 'シャ', romaji: 'sha', category: 'combinations' },
    { id: 'k_shu', character: 'シュ', romaji: 'shu', category: 'combinations' },
    { id: 'k_sho', character: 'ショ', romaji: 'sho', category: 'combinations' },
    
    // Cha
    { id: 'k_cha', character: 'チャ', romaji: 'cha', category: 'combinations' },
    { id: 'k_chu', character: 'チュ', romaji: 'chu', category: 'combinations' },
    { id: 'k_cho', character: 'チョ', romaji: 'cho', category: 'combinations' },
    
    // Nya
    { id: 'k_nya', character: 'ニャ', romaji: 'nya', category: 'combinations' },
    { id: 'k_nyu', character: 'ニュ', romaji: 'nyu', category: 'combinations' },
    { id: 'k_nyo', character: 'ニョ', romaji: 'nyo', category: 'combinations' },
    
    // Hya
    { id: 'k_hya', character: 'ヒャ', romaji: 'hya', category: 'combinations' },
    { id: 'k_hyu', character: 'ヒュ', romaji: 'hyu', category: 'combinations' },
    { id: 'k_hyo', character: 'ヒョ', romaji: 'hyo', category: 'combinations' },
    
    // Mya
    { id: 'k_mya', character: 'ミャ', romaji: 'mya', category: 'combinations' },
    { id: 'k_myu', character: 'ミュ', romaji: 'myu', category: 'combinations' },
    { id: 'k_myo', character: 'ミョ', romaji: 'myo', category: 'combinations' },
    
    // Rya
    { id: 'k_rya', character: 'リャ', romaji: 'rya', category: 'combinations' },
    { id: 'k_ryu', character: 'リュ', romaji: 'ryu', category: 'combinations' },
    { id: 'k_ryo', character: 'リョ', romaji: 'ryo', category: 'combinations' },
    
    // Gya (dakuten combinations)
    { id: 'k_gya', character: 'ギャ', romaji: 'gya', category: 'combinations' },
    { id: 'k_gyu', character: 'ギュ', romaji: 'gyu', category: 'combinations' },
    { id: 'k_gyo', character: 'ギョ', romaji: 'gyo', category: 'combinations' },
    
    // Ja
    { id: 'k_ja', character: 'ジャ', romaji: 'ja', category: 'combinations' },
    { id: 'k_ju', character: 'ジュ', romaji: 'ju', category: 'combinations' },
    { id: 'k_jo', character: 'ジョ', romaji: 'jo', category: 'combinations' },
    
    // Bya
    { id: 'k_bya', character: 'ビャ', romaji: 'bya', category: 'combinations' },
    { id: 'k_byu', character: 'ビュ', romaji: 'byu', category: 'combinations' },
    { id: 'k_byo', character: 'ビョ', romaji: 'byo', category: 'combinations' },
    
    // Pya (handakuten combinations)
    { id: 'k_pya', character: 'ピャ', romaji: 'pya', category: 'combinations' },
    { id: 'k_pyu', character: 'ピュ', romaji: 'pyu', category: 'combinations' },
    { id: 'k_pyo', character: 'ピョ', romaji: 'pyo', category: 'combinations' }
];

const KANJI = [
    // Numbers
    { id: 'kj_1', character: '一', romaji: 'ichi', category: 'numbers', meaning: 'one' },
    { id: 'kj_2', character: '二', romaji: 'ni', category: 'numbers', meaning: 'two' },
    { id: 'kj_3', character: '三', romaji: 'san', category: 'numbers', meaning: 'three' },
    { id: 'kj_4', character: '四', romaji: 'shi/yon', category: 'numbers', meaning: 'four' },
    { id: 'kj_5', character: '五', romaji: 'go', category: 'numbers', meaning: 'five' },
    { id: 'kj_6', character: '六', romaji: 'roku', category: 'numbers', meaning: 'six' },
    { id: 'kj_7', character: '七', romaji: 'shichi/nana', category: 'numbers', meaning: 'seven' },
    { id: 'kj_8', character: '八', romaji: 'hachi', category: 'numbers', meaning: 'eight' },
    { id: 'kj_9', character: '九', romaji: 'kyuu', category: 'numbers', meaning: 'nine' },
    { id: 'kj_10', character: '十', romaji: 'juu', category: 'numbers', meaning: 'ten' },
    
    // Basic Kanji
    { id: 'kj_day', character: '日', romaji: 'nichi/hi', category: 'time', meaning: 'day/sun' },
    { id: 'kj_month', character: '月', romaji: 'gatsu/tsuki', category: 'time', meaning: 'month/moon' },
    { id: 'kj_year', character: '年', romaji: 'nen/toshi', category: 'time', meaning: 'year' },
    { id: 'kj_time', character: '時', romaji: 'ji/toki', category: 'time', meaning: 'time/hour' },
    { id: 'kj_now', character: '今', romaji: 'ima/kon', category: 'time', meaning: 'now' },
    
    { id: 'kj_person', character: '人', romaji: 'jin/hito', category: 'people', meaning: 'person' },
    { id: 'kj_man', character: '男', romaji: 'dan/otoko', category: 'people', meaning: 'man' },
    { id: 'kj_woman', character: '女', romaji: 'jo/onna', category: 'people', meaning: 'woman' },
    { id: 'kj_child', character: '子', romaji: 'shi/ko', category: 'people', meaning: 'child' },
    
    { id: 'kj_big', character: '大', romaji: 'dai/oo', category: 'size', meaning: 'big' },
    { id: 'kj_small', character: '小', romaji: 'shou/chii', category: 'size', meaning: 'small' },
    { id: 'kj_middle', character: '中', romaji: 'chuu/naka', category: 'position', meaning: 'middle/inside' },
    { id: 'kj_up', character: '上', romaji: 'jou/ue', category: 'position', meaning: 'up/above' },
    { id: 'kj_down', character: '下', romaji: 'ka/shita', category: 'position', meaning: 'down/below' },
    
    { id: 'kj_water', character: '水', romaji: 'sui/mizu', category: 'nature', meaning: 'water' },
    { id: 'kj_fire', character: '火', romaji: 'ka/hi', category: 'nature', meaning: 'fire' },
    { id: 'kj_tree', character: '木', romaji: 'moku/ki', category: 'nature', meaning: 'tree/wood' },
    { id: 'kj_gold', character: '金', romaji: 'kin/kane', category: 'nature', meaning: 'gold/money' },
    { id: 'kj_earth', character: '土', romaji: 'do/tsuchi', category: 'nature', meaning: 'earth/soil' },
    
    { id: 'kj_mountain', character: '山', romaji: 'san/yama', category: 'nature', meaning: 'mountain' },
    { id: 'kj_river', character: '川', romaji: 'sen/kawa', category: 'nature', meaning: 'river' },
    { id: 'kj_sky', character: '空', romaji: 'kuu/sora', category: 'nature', meaning: 'sky/empty' },
    { id: 'kj_rain', character: '雨', romaji: 'u/ame', category: 'nature', meaning: 'rain' },
    
    { id: 'kj_hand', character: '手', romaji: 'shu/te', category: 'body', meaning: 'hand' },
    { id: 'kj_eye', character: '目', romaji: 'moku/me', category: 'body', meaning: 'eye' },
    { id: 'kj_mouth', character: '口', romaji: 'kou/kuchi', category: 'body', meaning: 'mouth' },
    { id: 'kj_ear', character: '耳', romaji: 'ji/mimi', category: 'body', meaning: 'ear' },
    
    { id: 'kj_book', character: '本', romaji: 'hon', category: 'objects', meaning: 'book/origin' },
    { id: 'kj_car', character: '車', romaji: 'sha/kuruma', category: 'objects', meaning: 'car/vehicle' },
    { id: 'kj_gate', character: '門', romaji: 'mon/kado', category: 'objects', meaning: 'gate' },
    
    { id: 'kj_school', character: '学', romaji: 'gaku/mana', category: 'education', meaning: 'study/learn' },
    { id: 'kj_write', character: '書', romaji: 'sho/ka', category: 'education', meaning: 'write' },
    { id: 'kj_read', character: '読', romaji: 'doku/yo', category: 'education', meaning: 'read' },
    
    { id: 'kj_go', character: '行', romaji: 'kou/i/yu', category: 'action', meaning: 'go' },
    { id: 'kj_come', character: '来', romaji: 'rai/ku', category: 'action', meaning: 'come' },
    { id: 'kj_see', character: '見', romaji: 'ken/mi', category: 'action', meaning: 'see' },
    { id: 'kj_say', character: '言', romaji: 'gen/i/koto', category: 'action', meaning: 'say' },
    { id: 'kj_eat', character: '食', romaji: 'shoku/ta', category: 'action', meaning: 'eat' },
    
    // More numbers & counters
    { id: 'kj_100', character: '百', romaji: 'hyaku', category: 'numbers', meaning: 'hundred' },
    { id: 'kj_1000', character: '千', romaji: 'sen', category: 'numbers', meaning: 'thousand' },
    { id: 'kj_10000', character: '万', romaji: 'man', category: 'numbers', meaning: 'ten thousand' },
    { id: 'kj_circle', character: '円', romaji: 'en', category: 'numbers', meaning: 'yen/circle' },
    
// More time words
    { id: 'kj_week', character: '週', romaji: 'shuu', category: 'time', meaning: 'week' },
    { id: 'kj_minute', character: '分', romaji: 'fun/pun', category: 'time', meaning: 'minute' },
    { id: 'kj_half', character: '半', romaji: 'han', category: 'time', meaning: 'half' },
    { id: 'kj_morning', character: '朝', romaji: 'chou/asa', category: 'time', meaning: 'morning' },
    { id: 'kj_evening', character: '夕', romaji: 'yuu', category: 'time', meaning: 'evening' },
    { id: 'kj_night', character: '夜', romaji: 'ya/yoru', category: 'time', meaning: 'night' },
    { id: 'kj_before', character: '前', romaji: 'zen/mae', category: 'time', meaning: 'before/front' },
    { id: 'kj_after', character: '後', romaji: 'go/ato', category: 'time', meaning: 'after/behind' },
    { id: 'kj_every', character: '毎', romaji: 'mai', category: 'time', meaning: 'every' },
    { id: 'kj_day_of_week', character: '曜', romaji: 'you', category: 'time', meaning: 'day of week' },
    
    // More people & family
    { id: 'kj_father', character: '父', romaji: 'fu/chichi', category: 'people', meaning: 'father' },
    { id: 'kj_mother', character: '母', romaji: 'bo/haha', category: 'people', meaning: 'mother' },
    { id: 'kj_friend', character: '友', romaji: 'yuu/tomo', category: 'people', meaning: 'friend' },
    { id: 'kj_name', character: '名', romaji: 'mei/na', category: 'people', meaning: 'name' },
    { id: 'kj_life', character: '生', romaji: 'sei/i', category: 'people', meaning: 'life/birth' },
    { id: 'kj_previous', character: '先', romaji: 'sen/saki', category: 'people', meaning: 'previous/teacher' },
    
    // More body parts
    { id: 'kj_foot', character: '足', romaji: 'soku/ashi', category: 'body', meaning: 'foot/leg' },
    { id: 'kj_heart', character: '心', romaji: 'shin/kokoro', category: 'body', meaning: 'heart/mind' },
    { id: 'kj_body', character: '体', romaji: 'tai/karada', category: 'body', meaning: 'body' },
    { id: 'kj_head', character: '頭', romaji: 'tou/atama', category: 'body', meaning: 'head' },
    { id: 'kj_face', character: '顔', romaji: 'gan/kao', category: 'body', meaning: 'face' },
    
    // More nature
    { id: 'kj_flower', character: '花', romaji: 'ka/hana', category: 'nature', meaning: 'flower' },
    { id: 'kj_grass', character: '草', romaji: 'sou/kusa', category: 'nature', meaning: 'grass' },
    { id: 'kj_stone', character: '石', romaji: 'seki/ishi', category: 'nature', meaning: 'stone' },
    { id: 'kj_forest', character: '林', romaji: 'rin/hayashi', category: 'nature', meaning: 'forest' },
    { id: 'kj_forest2', character: '森', romaji: 'shin/mori', category: 'nature', meaning: 'forest (thick)' },
    { id: 'kj_field', character: '田', romaji: 'den/ta', category: 'nature', meaning: 'rice field' },
    { id: 'kj_rice', character: '米', romaji: 'bei/kome', category: 'nature', meaning: 'rice' },
    { id: 'kj_wind', character: '風', romaji: 'fuu/kaze', category: 'nature', meaning: 'wind' },
    { id: 'kj_snow', character: '雪', romaji: 'setsu/yuki', category: 'nature', meaning: 'snow' },
    { id: 'kj_cloud', character: '雲', romaji: 'un/kumo', category: 'nature', meaning: 'cloud' },
    { id: 'kj_electricity', character: '電', romaji: 'den', category: 'nature', meaning: 'electricity' },
    
    // Directions & places
    { id: 'kj_left', character: '左', romaji: 'sa/hidari', category: 'position', meaning: 'left' },
    { id: 'kj_right', character: '右', romaji: 'u/migi', category: 'position', meaning: 'right' },
    { id: 'kj_east', character: '東', romaji: 'tou/higashi', category: 'position', meaning: 'east' },
    { id: 'kj_west', character: '西', romaji: 'sei/nishi', category: 'position', meaning: 'west' },
    { id: 'kj_south', character: '南', romaji: 'nan/minami', category: 'position', meaning: 'south' },
    { id: 'kj_north', character: '北', romaji: 'hoku/kita', category: 'position', meaning: 'north' },
    { id: 'kj_outside', character: '外', romaji: 'gai/soto', category: 'position', meaning: 'outside' },
    { id: 'kj_inside', character: '内', romaji: 'nai/uchi', category: 'position', meaning: 'inside' },
    
    // Places & buildings
    { id: 'kj_country', character: '国', romaji: 'koku/kuni', category: 'places', meaning: 'country' },
    { id: 'kj_town', character: '町', romaji: 'chou/machi', category: 'places', meaning: 'town' },
    { id: 'kj_village', character: '村', romaji: 'son/mura', category: 'places', meaning: 'village' },
    { id: 'kj_city', character: '市', romaji: 'shi/ichi', category: 'places', meaning: 'city' },
    { id: 'kj_shop', character: '店', romaji: 'ten/mise', category: 'places', meaning: 'shop' },
    { id: 'kj_house', character: '家', romaji: 'ka/ie', category: 'places', meaning: 'house' },
    { id: 'kj_room', character: '室', romaji: 'shitsu', category: 'places', meaning: 'room' },
    { id: 'kj_station', character: '駅', romaji: 'eki', category: 'places', meaning: 'station' },
    { id: 'kj_road', character: '道', romaji: 'dou/michi', category: 'places', meaning: 'road/way' },
    
    // More objects & things
    { id: 'kj_thing', character: '物', romaji: 'butsu/mono', category: 'objects', meaning: 'thing' },
    { id: 'kj_paper', character: '紙', romaji: 'shi/kami', category: 'objects', meaning: 'paper' },
    { id: 'kj_letter', character: '字', romaji: 'ji', category: 'objects', meaning: 'letter/character' },
    { id: 'kj_machine', character: '機', romaji: 'ki', category: 'objects', meaning: 'machine' },
    { id: 'kj_thread', character: '糸', romaji: 'shi/ito', category: 'objects', meaning: 'thread' },
    
    // Animals
    { id: 'kj_dog', character: '犬', romaji: 'ken/inu', category: 'animals', meaning: 'dog' },
    { id: 'kj_cat', character: '猫', romaji: 'byou/neko', category: 'animals', meaning: 'cat' },
    { id: 'kj_bird', character: '鳥', romaji: 'chou/tori', category: 'animals', meaning: 'bird' },
    { id: 'kj_fish', character: '魚', romaji: 'gyo/sakana', category: 'animals', meaning: 'fish' },
    { id: 'kj_horse', character: '馬', romaji: 'ba/uma', category: 'animals', meaning: 'horse' },
    
    // Colors
    { id: 'kj_white', character: '白', romaji: 'haku/shiro', category: 'colors', meaning: 'white' },
    { id: 'kj_red', character: '赤', romaji: 'seki/aka', category: 'colors', meaning: 'red' },
    { id: 'kj_blue', character: '青', romaji: 'sei/ao', category: 'colors', meaning: 'blue' },
    { id: 'kj_yellow', character: '黄', romaji: 'ou/ki', category: 'colors', meaning: 'yellow' },
    { id: 'kj_black', character: '黒', romaji: 'koku/kuro', category: 'colors', meaning: 'black' },
    
    // More actions & verbs
    { id: 'kj_enter', character: '入', romaji: 'nyuu/hai', category: 'action', meaning: 'enter' },
    { id: 'kj_exit', character: '出', romaji: 'shutsu/de', category: 'action', meaning: 'exit/come out' },
    { id: 'kj_stand', character: '立', romaji: 'ritsu/ta', category: 'action', meaning: 'stand' },
    { id: 'kj_sit', character: '座', romaji: 'za/suwa', category: 'action', meaning: 'sit' },
    { id: 'kj_rest', character: '休', romaji: 'kyuu/yasu', category: 'action', meaning: 'rest' },
    { id: 'kj_work', character: '働', romaji: 'dou/hatara', category: 'action', meaning: 'work' },
    { id: 'kj_walk', character: '歩', romaji: 'ho/aru', category: 'action', meaning: 'walk' },
    { id: 'kj_run', character: '走', romaji: 'sou/hashi', category: 'action', meaning: 'run' },
    { id: 'kj_fly', character: '飛', romaji: 'hi/to', category: 'action', meaning: 'fly' },
    { id: 'kj_swim', character: '泳', romaji: 'ei/oyo', category: 'action', meaning: 'swim' },
    { id: 'kj_drink', character: '飲', romaji: 'in/no', category: 'action', meaning: 'drink' },
    { id: 'kj_buy', character: '買', romaji: 'bai/ka', category: 'action', meaning: 'buy' },
    { id: 'kj_sell', character: '売', romaji: 'bai/u', category: 'action', meaning: 'sell' },
    { id: 'kj_make', character: '作', romaji: 'saku/tsuku', category: 'action', meaning: 'make' },
    { id: 'kj_use', character: '使', romaji: 'shi/tsuka', category: 'action', meaning: 'use' },
    { id: 'kj_speak', character: '話', romaji: 'wa/hana', category: 'action', meaning: 'speak' },
    { id: 'kj_listen', character: '聞', romaji: 'bun/ki', category: 'action', meaning: 'listen/hear' },
    { id: 'kj_think', character: '思', romaji: 'shi/omo', category: 'action', meaning: 'think' },
    { id: 'kj_know', character: '知', romaji: 'chi/shi', category: 'action', meaning: 'know' },
    { id: 'kj_wait', character: '待', romaji: 'tai/ma', category: 'action', meaning: 'wait' },
    { id: 'kj_meet', character: '会', romaji: 'kai/a', category: 'action', meaning: 'meet' },
    { id: 'kj_play', character: '遊', romaji: 'yuu/aso', category: 'action', meaning: 'play' },
    { id: 'kj_open', character: '開', romaji: 'kai/a/hira', category: 'action', meaning: 'open' },
    { id: 'kj_close', character: '閉', romaji: 'hei/shi/to', category: 'action', meaning: 'close' },
    
    // Adjectives & states
    { id: 'kj_new', character: '新', romaji: 'shin/atara', category: 'adjectives', meaning: 'new' },
    { id: 'kj_old', character: '古', romaji: 'ko/furu', category: 'adjectives', meaning: 'old' },
    { id: 'kj_high', character: '高', romaji: 'kou/taka', category: 'adjectives', meaning: 'high/expensive' },
    { id: 'kj_low', character: '低', romaji: 'tei/hiku', category: 'adjectives', meaning: 'low' },
    { id: 'kj_long', character: '長', romaji: 'chou/naga', category: 'adjectives', meaning: 'long' },
    { id: 'kj_short', character: '短', romaji: 'tan/miji', category: 'adjectives', meaning: 'short' },
    { id: 'kj_many', character: '多', romaji: 'ta/oo', category: 'adjectives', meaning: 'many' },
    { id: 'kj_few', character: '少', romaji: 'shou/suko/suku', category: 'adjectives', meaning: 'few/little' },
    { id: 'kj_good', character: '良', romaji: 'ryou/yo', category: 'adjectives', meaning: 'good' },
    { id: 'kj_bad', character: '悪', romaji: 'aku/waru', category: 'adjectives', meaning: 'bad' },
    { id: 'kj_strong', character: '強', romaji: 'kyou/tsuyo', category: 'adjectives', meaning: 'strong' },
    { id: 'kj_weak', character: '弱', romaji: 'jaku/yowa', category: 'adjectives', meaning: 'weak' },
    { id: 'kj_correct', character: '正', romaji: 'sei/tada', category: 'adjectives', meaning: 'correct' },
    { id: 'kj_same', character: '同', romaji: 'dou/ona', category: 'adjectives', meaning: 'same' },
    { id: 'kj_different', character: '違', romaji: 'i/chiga', category: 'adjectives', meaning: 'different' },
    
    // School & learning
    { id: 'kj_language', character: '語', romaji: 'go/kata', category: 'education', meaning: 'language' },
    { id: 'kj_teach', character: '教', romaji: 'kyou/oshi', category: 'education', meaning: 'teach' },
    { id: 'kj_answer', character: '答', romaji: 'tou/kota', category: 'education', meaning: 'answer' },
    { id: 'kj_question', character: '問', romaji: 'mon/to', category: 'education', meaning: 'question' },
    { id: 'kj_test', character: '試', romaji: 'shi/kokoro/tame', category: 'education', meaning: 'test/try' }
];

// Data mapping
const DATA_MAP = {
    hiragana: HIRAGANA,
    katakana: KATAKANA,
    kanji: KANJI
};

// Get characters for a specific system
function getCharacters(system) {
    return DATA_MAP[system] || [];
}

// Get grouped categories for display
function getCategoryGroups(system) {
    const characters = getCharacters(system);
    
    if (system === 'hiragana' || system === 'katakana') {
        // Group kana into: Basic, Dakuten, Handakuten, Combinations
        const groups = {
            'Basic Characters': [],
            'Dakuten (゛)': [],
            'Handakuten (゜)': [],
            'Combinations (拗音)': []
        };
        
        const basicRows = ['vowels', 'k-row', 's-row', 't-row', 'n-row', 'h-row', 'm-row', 'y-row', 'r-row', 'w-row', 'n'];
        const dakutenRows = ['g-row', 'z-row', 'd-row', 'b-row'];
        const handakutenRows = ['p-row'];
        const combinationRows = ['combinations'];
        
        characters.forEach(char => {
            if (basicRows.includes(char.category)) {
                groups['Basic Characters'].push(char);
            } else if (dakutenRows.includes(char.category)) {
                groups['Dakuten (゛)'].push(char);
            } else if (handakutenRows.includes(char.category)) {
                groups['Handakuten (゜)'].push(char);
            } else if (combinationRows.includes(char.category)) {
                groups['Combinations (拗音)'].push(char);
            }
        });
        
        return groups;
    } else if (system === 'kanji') {
        // Group kanji by category
        const groups = {};
        const categoryOrder = ['numbers', 'time', 'people', 'body', 'nature', 'position', 'places', 'objects', 'animals', 'colors', 'action', 'adjectives', 'education', 'size'];
        const categoryNames = {
            'numbers': 'Numbers',
            'time': 'Time',
            'people': 'People',
            'body': 'Body',
            'nature': 'Nature',
            'position': 'Position',
            'places': 'Places',
            'objects': 'Objects',
            'animals': 'Animals',
            'colors': 'Colors',
            'action': 'Actions',
            'adjectives': 'Adjectives',
            'education': 'Education',
            'size': 'Size'
        };
        
        categoryOrder.forEach(cat => {
            const displayName = categoryNames[cat] || cat;
            const charsInCat = characters.filter(c => c.category === cat);
            if (charsInCat.length > 0) {
                groups[displayName] = charsInCat;
            }
        });
        
        return groups;
    }
    
    return {};
}
