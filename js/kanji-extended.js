// Extended Kanji list - to be merged into data.js
// This file contains additional kanji to expand from 50 to 150+ characters

const EXTENDED_KANJI = [
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

// To integrate: add these to the main KANJI array in data.js
