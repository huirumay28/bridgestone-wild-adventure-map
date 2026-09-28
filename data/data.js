/* Taiwan-exclusive Wild Adventure Map: demo data (prototype).
   Spots: real places; coordinates geocoded via OpenStreetMap Nominatim; facts from the listed sources.
   Tire centers: name/address/coordinates from each store's official page on bridgestone.com.tw.
   Tire models: real Bridgestone Taiwan line-up; claims paraphrased from bridgestone.com.tw product pages.
   Strict JSON body so tools can parse it. */
window.WAM_DATA = {
 "start": {
  "id": "start",
  "name": "Da'an, Taipei",
  "zh": "台北 大安",
  "lat": 25.03,
  "lng": 121.5358,
  "note": "Demo start point near Da'an Forest Park; a real app would use the phone's GPS."
 },
 "tires": {
  "RE71RS": {
   "name": "POTENZA RE-71RS",
   "line": "POTENZA",
   "color": "#FF0033",
   "tagline": "Built for winding mountain roads",
   "url": "https://www.bridgestone.com.tw/zh/tire/potenza-re-71rs",
   "claims": [
    "Asymmetric tread with reinforced grooves: sharp handling, precise steering, strong grip",
    "Low-angle grooves add lateral stiffness for quicker turn-in and more cornering grip",
    "Two wide inner main grooves drain water for strong wet performance"
   ]
  },
  "PSPORT": {
   "name": "POTENZA SPORT",
   "line": "POTENZA",
   "color": "#FF3355",
   "tagline": "Wet-cornering flagship street tire",
   "url": "https://www.bridgestone.com.tw/zh/tire/potenza-sport",
   "claims": [
    "Excellent wet cornering and handling",
    "Innovative 3D tread for drainage and wet grip",
    "OE fitment on the Lamborghini Huracán STO"
   ]
  },
  "TURANZA6": {
   "name": "TURANZA 6",
   "line": "TURANZA",
   "color": "#2F6BFF",
   "tagline": "Luxury comfort with ENLITEN technology",
   "url": "https://www.bridgestone.com.tw/zh/tire/turanza-6",
   "claims": [
    "+8% ride comfort and −8% noise vs. the previous generation",
    "+14% wet grip, for more confidence on wet roads",
    "−15% rolling resistance, so you go further on each charge or tank"
   ]
  },
  "DUELERAT": {
   "name": "DUELER A/T002",
   "line": "DUELER",
   "color": "#17C2B3",
   "tagline": "All-terrain: off the tarmac and back",
   "url": "https://www.bridgestone.com.tw/zh/tire/dueler-at002",
   "claims": [
    "All-terrain design for off-road challenges with on-road stability",
    "High-silica compound + Z-sipes for dry and wet grip",
    "Optimized contact patch for deeper bite on loose surfaces"
   ]
  }
 },
 "packs": {
  "POTENZA": {
   "name": "POTENZA SPORT",
   "box": "0.02 · Effortless Comfort",
   "color": "#FF0033",
   "img": null,
   "tagline": "EFFORTLESS COMFORT",
   "claims": [
    "Luxury comfort experience",
    "Superior wet grip",
    "Our tires are so quiet, they leave all the room for the sounds you actually want to hear."
   ]
  },
  "DUELER": {
   "name": "DUELER",
   "box": "PREMIER · Wet-Handling",
   "color": "#17C2B3",
   "img": "assets/pack-dueler.webp",
   "tagline": "PREMIER WET-HANDLING",
   "claims": [
    "Class-leading wet handling and braking performance",
    "High comfort and low rolling resistance",
    "Longer lifespan"
   ]
  },
  "TURANZA": {
   "name": "TURANZA",
   "box": "SUPERIOR · Extended Range",
   "color": "#2F6BFF",
   "img": "assets/pack-turanza.webp",
   "tagline": "SUPERIOR EXTENDED RANGE",
   "claims": [
    "Extended range and safer wet braking",
    "Exclusive ENLARGE™ technology",
    "Comfortable, as always"
   ]
  }
 },
 "spots": [
  {
   "id": "yangming",
   "name": "Yangmingshan",
   "zh": "陽明山 陽明公園",
   "region": "Taipei",
   "area": "Beitou · Taipei City",
   "lat": 25.158236,
   "lng": 121.539907,
   "category": "Mountain park",
   "tags": [
    "mountain"
   ],
   "road": "Winding mountain road: Yangde Blvd & Yangjin Hwy switchbacks, frequent fog",
   "roadShort": "winding mountain road",
   "difficulty": 2,
   "bestTime": "Late evening, when the tour buses have gone",
   "tire": "RE71RS",
   "pit": "dong-lin",
   "desc": "Taipei's back garden: a volcanic national park 20 minutes from downtown, famous for its flower clock, cherry blossoms and misty switchbacks. Come at night, when the crowds leave and the city lights come on below.",
   "why": "Yangde Blvd is all hairpins, often wet. POTENZA RE-71RS has an asymmetric tread and stiff low-angle grooves for precise steering and cornering grip, plus two wide inner grooves that drain water.",
   "caution": "Weekend and flower-season traffic control on Yangde Blvd.",
   "sources": [
    "https://pwd.gov.taipei/News_Content.aspx?n=5C3C29C78077C93E&s=600CC22C28EAD7CE&sms=72544237BBE4C5F6",
    "https://en.wikipedia.org/wiki/Yangmingshan"
   ],
   "geocode": "Nominatim: 陽明公園, 北投區"
  },
  {
   "id": "tamsui",
   "name": "Tamsui Coast",
   "zh": "淡水 漁人碼頭",
   "region": "Taipei",
   "area": "Tamsui · New Taipei City",
   "lat": 25.182009,
   "lng": 121.418554,
   "category": "River-mouth sunset",
   "tags": [
    "seaside"
   ],
   "road": "Riverside & coastal roads: Hwy 2B along the Tamsui River, damp sea air",
   "roadShort": "wet riverside road",
   "difficulty": 1,
   "bestTime": "Sunset from Lover's Bridge",
   "tire": "TURANZA6",
   "pit": "dong-lin",
   "desc": "Where the Tamsui River meets the sea. Lover's Bridge (yes, really), a boardwalk and one of the best sunsets in the north. After dark the wharf empties out and the bridge lights up.",
   "why": "A flat, damp riverside cruise. TURANZA 6 cuts noise by 8% and adds 14% wet grip versus its predecessor (per Bridgestone), so the ride stays calm and quiet.",
   "caution": "Weekend traffic on Hwy 2B; take the light rail if you like.",
   "sources": [
    "https://en.wikipedia.org/wiki/Tamsui_Fisherman%27s_Wharf"
   ],
   "geocode": "Nominatim: 淡水漁人碼頭, 淡水區"
  },
  {
   "id": "datun",
   "name": "Datun Mountain",
   "zh": "大屯山",
   "region": "Taipei",
   "area": "Beitou · Taipei City",
   "lat": 25.17874,
   "lng": 121.522191,
   "category": "Summit lookout",
   "tags": [
    "mountain",
    "stars"
   ],
   "road": "Mountain switchbacks: Bailaka Hwy (101A) to about 1,000 m, fog and drizzle",
   "roadShort": "fog-prone mountain switchbacks",
   "difficulty": 3,
   "bestTime": "Clear night after a cold front",
   "tire": "RE71RS",
   "pit": "dong-lin",
   "desc": "At 1,092 m, one of the highest points around Taipei, reached by the Bailaka Highway. Silvergrass, sea views to Tamsui, and fog thick enough to give you all the privacy you need.",
   "why": "Bailaka Hwy is tight, steep and usually wet. POTENZA RE-71RS's low-angle grooves stiffen the tread for sharp turn-in, and the wide inner grooves drain water when the fog rolls in.",
   "caution": "Wind and fog change in minutes; watch for cyclists.",
   "sources": [
    "https://en.wikipedia.org/wiki/Mount_Datun"
   ],
   "geocode": "Nominatim: 大屯山 (peak)"
  },
  {
   "id": "qixing",
   "name": "Qixing Mountain",
   "zh": "七星山",
   "region": "Taipei",
   "area": "Yangmingshan · Taipei City",
   "lat": 25.170701,
   "lng": 121.55344,
   "category": "Volcano summit",
   "tags": [
    "mountain"
   ],
   "road": "Mountain highway: Yangjin Hwy to the Xiaoyoukeng trailhead, sulfur steam and fog",
   "roadShort": "winding volcanic road",
   "difficulty": 3,
   "bestTime": "Sunrise hike, weekday",
   "tire": "PSPORT",
   "pit": "hua-yong",
   "desc": "Taipei's highest peak (1,120 m), a dormant volcano with steaming fumaroles at Xiaoyoukeng. Things get steamy up here. Geologically speaking.",
   "why": "Yangjin Hwy corners come wet and fast. POTENZA SPORT is known for strong wet cornering, with a 3D tread that drains water; it's OE on the Lamborghini Huracán STO, so it can handle a volcano.",
   "caution": "Sulfur fumes near the vents; stay on the trail.",
   "sources": [
    "https://en.wikipedia.org/wiki/Qixing_Mountain"
   ],
   "geocode": "Nominatim: 七星山 (peak)"
  },
  {
   "id": "zhuzihu",
   "name": "Zhuzihu",
   "zh": "竹子湖",
   "region": "Taipei",
   "area": "Yangmingshan · Taipei City",
   "lat": 25.171641,
   "lng": 121.534733,
   "category": "Calla lily valley",
   "tags": [
    "mountain"
   ],
   "road": "Narrow farm lanes off Yangjin Hwy, muddy shoulders, one-way in season",
   "roadShort": "narrow, muddy farm lanes",
   "difficulty": 2,
   "bestTime": "Calla season (2026: Mar 13 to Jun 21), weekday dawn",
   "tire": "DUELERAT",
   "pit": "dong-lin",
   "desc": "A misty valley of calla lily and hydrangea fields tucked between volcanoes. Flowers, fog, and farm lanes that go quiet after dark.",
   "why": "Farm lanes with muddy shoulders and tight passing spots. DUELER A/T002 is all-terrain: grip off the tarmac, stable on it.",
   "caution": "One-way traffic control on season weekends; don't trample the fields.",
   "sources": [
    "https://www.travel.taipei/zh-tw/event-calendar/details/66365"
   ],
   "geocode": "Nominatim: 竹子湖, 北投區"
  },
  {
   "id": "qingtiangang",
   "name": "Qingtiangang Grassland",
   "zh": "陽明山 擎天崗",
   "region": "Taipei",
   "area": "Yangmingshan · Taipei City",
   "lat": 25.167384,
   "lng": 121.573952,
   "category": "Mountain grassland",
   "road": "Mountain switchbacks: Yangmingshan roads to 770 m, fog rolls in with no warning",
   "difficulty": 2,
   "bestTime": "After dark on a clear night",
   "tire": "PSPORT",
   "pit": "hua-yong",
   "desc": "An open volcanic grassland 770 m up, barely 40 minutes from Da'an. Water buffalo by day, city glow and stars by night. When the fog comes in, it gets very private very fast.",
   "why": "Hairpins slick with mountain fog. POTENZA SPORT's 3D tread drains water for strong wet grip and cornering, so you stop exactly where you mean to, even when a buffalo steps out.",
   "caution": "No lighting at night; keep 20 m from the water buffalo.",
   "sources": [
    "https://bobbytravel.tw/qingtiangang/"
   ],
   "geocode": "Nominatim: 擎天崗, 菁山里, 士林區",
   "tags": [
    "mountain",
    "stars"
   ],
   "roadShort": "foggy mountain grassland road"
  },
  {
   "id": "guandu",
   "name": "Guandu Nature Park",
   "zh": "關渡自然公園",
   "region": "Taipei",
   "area": "Beitou · Taipei City",
   "lat": 25.116627,
   "lng": 121.471969,
   "category": "Wetland & birds",
   "tags": [
    "seaside"
   ],
   "road": "Flat riverside roads along the Tamsui & Keelung rivers, morning mist",
   "roadShort": "flat riverside road",
   "difficulty": 1,
   "bestTime": "Golden hour, migratory season (Oct to Apr)",
   "tire": "TURANZA6",
   "pit": "dong-lin",
   "desc": "Tidal wetlands at the confluence of Taipei's two rivers, with herons, mudskippers and a lot of tall reeds. Birdwatching is the official reason you're here.",
   "why": "An easy, flat drive. TURANZA 6's ENLITEN compound cuts rolling resistance by 15% and noise by 8%, so you arrive relaxed and the birds stay put.",
   "caution": "Park hours apply (closed Mondays); the reeds hide mosquitoes too.",
   "sources": [
    "https://en.wikipedia.org/wiki/Guandu_Nature_Park"
   ],
   "geocode": "Nominatim: 關渡自然公園"
  },
  {
   "id": "neihu",
   "name": "Neihu Forest",
   "zh": "內湖 大崙頭尾山",
   "region": "Taipei",
   "area": "Neihu · Taipei City",
   "lat": 25.10883,
   "lng": 121.585323,
   "category": "Forest trails",
   "tags": [
    "forest",
    "mountain"
   ],
   "road": "Steep, narrow mountain lanes (Bishan Rd / Zhongshe Rd), wet leaf litter",
   "roadShort": "steep, narrow forest lanes",
   "difficulty": 2,
   "bestTime": "Weekday afternoon",
   "tire": "RE71RS",
   "pit": "hua-yong",
   "desc": "The Daluntou and Dalunwei forest trails above Neihu: dense woods, a suspension bridge and city views, 20 minutes from the office towers. Nobody from work will find you here.",
   "why": "Short but steep hairpins, slick with leaves. POTENZA RE-71RS's high-grip compound and stiff shoulder give precise steering where the lanes get tight.",
   "caution": "Trails are muddy after rain; lanes are single-track in places.",
   "sources": [
    "https://zh.wikipedia.org/wiki/%E5%A4%A7%E5%B4%99%E9%A0%AD%E5%B1%B1",
    "https://zh.wikipedia.org/wiki/%E5%A4%A7%E5%B4%99%E5%B0%BE%E5%B1%B1"
   ],
   "geocode": "Nominatim: 大崙頭山 (peak)"
  },
  {
   "id": "nangang",
   "name": "Nangang Tea Mountain",
   "zh": "南港 舊莊茶山",
   "region": "Taipei",
   "area": "Nangang · Taipei City",
   "lat": 25.027343,
   "lng": 121.664368,
   "category": "Tea hills",
   "tags": [
    "forest",
    "mountain"
   ],
   "road": "Winding, narrow tea-farm road up Jiuzhuang St Sec 2, tight passing spots",
   "roadShort": "narrow tea-farm road",
   "difficulty": 2,
   "bestTime": "Fireflies (Apr to May), 18:00 to 20:00",
   "tire": "DUELERAT",
   "pit": "hua-yong",
   "desc": "The birthplace of Taiwan's Pouchong tea, hidden in the hills behind Nangang: tea terraces, an osmanthus trail, a mini suspension bridge and fireflies in spring. Taipei's quietest back garden.",
   "why": "Narrow, broken-edged farm roads where you'll be pulling onto the verge to pass. DUELER A/T002 grips on gravel shoulders and stays stable on the pavement.",
   "caution": "Tea factory hours vary (closed Mondays); the road is single-lane in parts.",
   "sources": [
    "https://doed.gov.taipei/News_Content.aspx?n=F28B775DFA6D1A44&s=E6566DDB35C67EAB&sms=72544237BBE4C5F6",
    "https://recreational-agriculture.gov.taipei/cp.aspx?n=66D6125B148FEF86&s=DDB2755A5F0019C1"
   ],
   "geocode": "Nominatim: 南港茶葉製造示範場 (舊莊街二段336號)"
  },
  {
   "id": "dajia",
   "name": "Dajia Riverside",
   "zh": "大佳河濱公園",
   "region": "Taipei",
   "area": "Zhongshan · Taipei City",
   "lat": 25.074734,
   "lng": 121.539002,
   "category": "Riverside park",
   "tags": [
    "seaside"
   ],
   "road": "City riverside: Keelung River embankment, flat and smooth",
   "roadShort": "smooth city riverside",
   "difficulty": 1,
   "bestTime": "After the fireworks crowd leaves",
   "tire": "TURANZA6",
   "pit": "hua-yong",
   "desc": "A wide riverside park on the Keelung River with Miramar's Ferris wheel and the airport's landing lights overhead. Surprisingly empty on weeknights.",
   "why": "City cruising, so comfort is everything. TURANZA 6 is Bridgestone's quiet, comfortable tourer, with 8% more comfort and 8% less noise than before.",
   "caution": "Riverside gates close in typhoon or flood alerts.",
   "sources": [
    "https://en.wikipedia.org/wiki/Dajia_Riverside_Park"
   ],
   "geocode": "Nominatim: 大佳河濱公園"
  },
  {
   "id": "xianjiyan",
   "name": "Xianjiyan",
   "zh": "仙跡岩",
   "region": "Taipei",
   "area": "Wenshan · Taipei City",
   "lat": 24.992478,
   "lng": 121.548152,
   "category": "Hilltop trail",
   "tags": [
    "forest"
   ],
   "road": "Short, steep neighborhood lanes off Jinglong St",
   "roadShort": "short, steep city lanes",
   "difficulty": 1,
   "bestTime": "Night view, weekday",
   "tire": "TURANZA6",
   "pit": "xin-yang",
   "desc": "'Immortal's Footprint Rock', a forested hill in Wenshan with a legendary footprint carved in stone and night views over southern Taipei. Easy climb, big payoff.",
   "why": "Stop-and-go city lanes. TURANZA 6 absorbs the bumps and keeps it quiet, and the pit stop is literally at the trailhead.",
   "caution": "Stairs are slippery after rain.",
   "sources": [
    "https://zh.wikipedia.org/wiki/%E4%BB%99%E8%B7%A1%E5%B2%A9"
   ],
   "geocode": "Nominatim: 仙跡岩, 文山區"
  },
  {
   "id": "maokong",
   "name": "Maokong",
   "zh": "貓空",
   "region": "Taipei",
   "area": "Wenshan · Taipei City",
   "lat": 24.969138,
   "lng": 121.588171,
   "category": "Tea-house hills",
   "tags": [
    "mountain",
    "stars"
   ],
   "road": "Steep switchbacks: Zhinan Rd Sec 3, blind corners and narrow lanes",
   "roadShort": "steep blind switchbacks",
   "difficulty": 3,
   "bestTime": "Late-night tea with a city view",
   "tire": "RE71RS",
   "pit": "xin-yang",
   "desc": "Tea terraces and late-night tea houses above Taipei, reached by gondola or a very twisty road. The view of 101 by night is worth the switchbacks.",
   "why": "Zhinan Rd is steep, blind and twisty. POTENZA RE-71RS has an asymmetric pattern and reinforced grooves for precise steering, plus wet drainage for mountain drizzle.",
   "caution": "Narrow road; watch for gondola-day crowds and scooters.",
   "sources": [
    "https://en.wikipedia.org/wiki/Maokong"
   ],
   "geocode": "Nominatim: 貓空 (gondola station)"
  },
  {
   "id": "fuzhou",
   "name": "Fuzhou Mountain",
   "zh": "福州山公園",
   "region": "Taipei",
   "area": "Da'an · Taipei City",
   "lat": 25.017098,
   "lng": 121.554793,
   "category": "City night view",
   "tags": [
    "forest",
    "stars"
   ],
   "road": "Short city hill: Wolong St lanes, then stairs",
   "roadShort": "short city hill road",
   "difficulty": 1,
   "bestTime": "Blue hour, for a Taipei 101 view",
   "tire": "TURANZA6",
   "pit": "xin-yang",
   "desc": "The quieter alternative to Elephant Mountain: three hilltop pavilions with a front-row view of Taipei 101, and far fewer people. Bring a flashlight; some paths are dark.",
   "why": "Barely a drive, so pick the quietest ride. TURANZA 6 dampens road noise and bumps: comfortable, as always.",
   "caution": "Some trail sections are unlit at night.",
   "sources": [
    "https://blog.jungillustday.com/fujhoushan-park/",
    "https://hamibobo.tw/taipei-fujou-mountain/"
   ],
   "geocode": "Nominatim: 福州山 (peak)"
  },
  {
   "id": "capybara",
   "name": "Capybara Rock (ex-Elephant Trunk Rock)",
   "zh": "深澳 水豚岩（原象鼻岩）",
   "region": "North coast",
   "area": "Shenao, Ruifang · New Taipei",
   "lat": 25.1357221,
   "lng": 121.824641,
   "category": "Sea cliff",
   "road": "Wet coastal road: Provincial Hwy 2 + Shenao Rd, salt spray, monsoon drizzle",
   "difficulty": 1,
   "bestTime": "Golden hour, calm seas",
   "tire": "PSPORT",
   "pit": "tai-lian",
   "desc": "The trunk snapped off in Dec 2023 and what's left looks exactly like a very relaxed capybara. Sea spray, sunset, sea-cave views and a rock that has seen everything and judges no one.",
   "why": "Hwy 2 on the northeast coast is almost always damp. POTENZA SPORT's 3D tread drains water for wet grip and sharp wet cornering on the cliff road.",
   "caution": "Stay behind the safety line; the headland is still eroding.",
   "sources": [
    "https://woman.udn.com/woman/story/123162/8755558",
    "https://news.ltn.com.tw/news/life/breakingnews/4529779"
   ],
   "geocode": "Nominatim: OSM node 4224986274 (name 水豚岩, old_name 象鼻岩)",
   "tags": [
    "seaside"
   ],
   "roadShort": "wet coastal cliff road"
  },
  {
   "id": "laomei",
   "name": "Laomei Green Reef",
   "zh": "石門 老梅綠石槽",
   "region": "North coast",
   "area": "Laomei, Shimen · New Taipei",
   "lat": 25.289305,
   "lng": 121.54636,
   "category": "Seasonal reef",
   "road": "Coastal highway: Hwy 2 north coast, crosswinds and sea mist",
   "difficulty": 1,
   "bestTime": "Mar to early May, 1 to 2 h around low tide",
   "tire": "TURANZA6",
   "pit": "dong-lin",
   "desc": "Volcanic rock ridges that go matcha-green with algae every spring. The grooves are ribbed by nature. Watch from the sand, don't step on the reef, and time it with the low tide.",
   "why": "A long, easy cruise up the north coast. TURANZA 6 is quiet and comfortable, and its ENLITEN compound grips better when sea mist settles on Hwy 2.",
   "caution": "Stay off the algae; it's fragile and very slippery.",
   "sources": [
    "https://admin.taiwan.net.tw/News/NewsTravel?a=35&id=35357"
   ],
   "geocode": "Nominatim: Laomei Rd no. 83 (綠石槽 access point by the reef), 老梅里, 石門區",
   "tags": [
    "seaside"
   ],
   "roadShort": "breezy coastal highway"
  },
  {
   "id": "fenniaolin",
   "name": "Fenniaolin Cove",
   "zh": "東澳 粉鳥林漁港",
   "region": "Northeast",
   "area": "Dong'ao, Su'ao · Yilan",
   "lat": 24.496946,
   "lng": 121.841595,
   "category": "Hidden cove",
   "road": "Cliff-hugging highway: Suhua Hwy (Hwy 9) tunnels and sea cliffs, sudden rain",
   "difficulty": 2,
   "bestTime": "Morning, before the tour buses",
   "tire": "PSPORT",
   "pit": "li-shan",
   "desc": "Sapphire water, sea stacks and a tiny 'Love Lock' beach. People call it Taiwan's mini Ha Long Bay. Swimming is banned because of strong currents, so keep the excitement on dry land.",
   "why": "Suhua Hwy means tunnels, cliffs, gravel trucks and rain. POTENZA SPORT is built for wet cornering and braking, so you stay in control when the weather turns.",
   "caution": "No swimming or water sports: steep drop-off and strong currents.",
   "sources": [
    "https://mimigo.tw/fenniaolin/"
   ],
   "geocode": "Nominatim: 粉鳥林, 東澳里, 蘇澳鎮",
   "tags": [
    "seaside"
   ],
   "roadShort": "cliff-hugging highway"
  },
  {
   "id": "hehuan",
   "name": "Yuanfeng Stargazing Point, Hehuanshan Dark Sky Park",
   "zh": "合歡山暗空公園 鳶峰",
   "region": "Central",
   "area": "Ren'ai · Nantou",
   "lat": 24.117703,
   "lng": 121.23679,
   "category": "Dark-sky stargazing",
   "road": "High-altitude switchbacks: Hwy 14A, Taiwan's highest highway (Wuling 3,275 m), frost and fog",
   "difficulty": 4,
   "bestTime": "Moonless nights, Apr to Oct",
   "tire": "RE71RS",
   "pit": "cheng-feng",
   "desc": "Milky Way at around 2,700 m in Taiwan's International Dark Sky Park. Park rules say you switch off outward lights if you stay in the car park more than 3 minutes. Darkness is mandatory. We didn't make the rules, but we approve.",
   "why": "Taiwan's highest road, full of hairpins. POTENZA RE-71RS has an asymmetric tread and stiff low-angle grooves for precise steering, and its two wide inner grooves drain water when fog soaks the road.",
   "caution": "Freezing at night even in summer; watch for altitude sickness.",
   "sources": [
    "https://travel.nantou.gov.tw/attractions/yuanfeng-observation-deck/",
    "https://darksky.tw/%E5%90%88%E6%AD%A1%E5%9C%8B%E9%9A%9B%E6%9A%97%E7%A9%BA%E5%85%AC%E5%9C%92/"
   ],
   "geocode": "Nominatim: 鳶峰, 德鹿谷村, 仁愛鄉",
   "tags": [
    "mountain",
    "stars"
   ],
   "roadShort": "high-altitude switchbacks"
  },
  {
   "id": "wangyou",
   "name": "Wangyou Forest",
   "zh": "忘憂森林",
   "region": "Central",
   "area": "Jingangshu Mtn, Zhushan/Lugu · Nantou",
   "lat": 23.648835,
   "lng": 120.794497,
   "category": "Misty ghost forest",
   "road": "Steep tea-farm road (40 to 50° grades); last stretch is 4WD shuttle or on foot",
   "difficulty": 5,
   "bestTime": "Wet season mornings, when the pond is full",
   "tire": "DUELERAT",
   "pit": "jian-ye",
   "desc": "Silver dead trees standing in a mist-wrapped mountain pond. Surreal, silent and almost always foggy. It's called the 'Forest of Forgetting Your Worries', and it lives up to the name.",
   "why": "Steep, narrow, wet tea-farm roads. DUELER A/T002 is an all-terrain tire with a high-silica compound and Z-sipes for grip off the tarmac. For the last stretch even we say take the 4WD shuttle.",
   "caution": "Regular cars shouldn't attempt the top road. Park at the tea shops.",
   "sources": [
    "https://free-forest.okgo.tw/traffic.html",
    "https://benjamintrips.tw/read-1438438"
   ],
   "geocode": "Nominatim: 忘憂森林 viewpoint, 大鞍里, 竹山鎮",
   "tags": [
    "forest",
    "mountain"
   ],
   "roadShort": "steep tea-farm road + 4WD track"
  },
  {
   "id": "eryanping",
   "name": "Eryanping Trail Cloud Deck",
   "zh": "隙頂 二延平步道",
   "region": "Central",
   "area": "Xiding, Alishan Hwy 52.8K · Chiayi",
   "lat": 23.421038,
   "lng": 120.649996,
   "category": "Sea-of-clouds lookout",
   "road": "Mountain highway: Hwy 18 Alishan Highway, sweeping curves and afternoon fog",
   "difficulty": 2,
   "bestTime": "Sunset, when the sea of clouds forms",
   "tire": "RE71RS",
   "pit": "gao-de",
   "desc": "Tea terraces, a cloud-viewing platform and sunsets that pour a sea of clouds over the valley. The fog usually rolls in by late afternoon: nature's own privacy screen.",
   "why": "About 50 km of Hwy 18 curves. POTENZA RE-71RS gives precise turn-in on every bend and drains water when the sea of clouds settles on the road.",
   "caution": "Afternoon fog cuts visibility fast; drive down before full dark.",
   "sources": [
    "https://www.ali-nsa.net/zh-tw/attractions/detail/141"
   ],
   "geocode": "Nominatim: 二延平步道, 公興村, 番路鄉",
   "tags": [
    "mountain"
   ],
   "roadShort": "winding mountain highway"
  },
  {
   "id": "maolin",
   "name": "Maolin Lovers' Valley Hot Spring",
   "zh": "茂林 情人谷溫泉",
   "region": "South",
   "area": "Maolin · Kaohsiung",
   "lat": 22.884421,
   "lng": 120.665339,
   "category": "Mountain hot spring",
   "road": "Typhoon-scarred mountain road: Kaohsiung Rd 132 with repair patches and gravel",
   "difficulty": 3,
   "bestTime": "Weekday, 10:00 to 16:00",
   "tire": "DUELERAT",
   "pit": "zong-tai",
   "desc": "Yes, it really is called Lovers' Valley. There are free outdoor hot-spring and foot pools deep in Maolin's canyon country. Heads-up: the suspension bridge and trail have been closed since Typhoon Gaemi (2024).",
   "why": "Post-typhoon mountain roads with gravel patches and river crossings. DUELER A/T002 handles off-road sections and still stays stable on the tarmac.",
   "caution": "Check the Maolin NSA closure notices before you go.",
   "sources": [
    "https://www.maolin-nsa.gov.tw/zh-tw/attraction/64/",
    "https://www.taiwan.net.tw/m1.aspx?id=R123&sNo=0001016"
   ],
   "geocode": "Nominatim: 茂林情人谷溫泉, 情人谷聯絡道",
   "tags": [
    "forest",
    "mountain"
   ],
   "roadShort": "typhoon-scarred mountain road"
  },
  {
   "id": "longpan",
   "name": "Longpan Park",
   "zh": "墾丁 龍磐公園",
   "region": "South",
   "area": "Hengchun, Kenting · Pingtung",
   "lat": 21.927801,
   "lng": 120.846973,
   "category": "Cliff-top stargazing",
   "road": "Windswept coastal road: Hwy 26 (Jia'e Rd), Pacific crosswinds",
   "difficulty": 1,
   "bestTime": "New moon, after 21:00",
   "tire": "TURANZA6",
   "pit": "hong-tong",
   "desc": "Limestone cliffs and grassland at Taiwan's southern tip. Almost no light pollution, the Milky Way overhead and the Pacific below. Stargazing etiquette: point your flashlight down.",
   "why": "The Hwy 26 coast is windy and salty. TURANZA 6 is so quiet you'll hear the Pacific (and each other), and grips well in the spray.",
   "caution": "Unfenced cliff edges; stay on the grass paths.",
   "sources": [
    "https://www.ktnp.gov.tw/News_Content2.aspx?n=28AB1D16ECF7E63C&s=C1E50972440D43B2&sms=C88B5251F308CE96"
   ],
   "geocode": "Nominatim: 龍磐公園, 鵝鑾里, 恆春鎮",
   "tags": [
    "seaside",
    "stars"
   ],
   "roadShort": "windswept coastal road"
  },
  {
   "id": "xuhai",
   "name": "Xuhai Grassland",
   "zh": "牡丹 旭海草原",
   "region": "South",
   "area": "Xuhai, Mudan · Pingtung",
   "lat": 22.206274,
   "lng": 120.890689,
   "category": "Pacific grassland",
   "road": "Remote county road: CR 199/199A over the ridge, few services",
   "difficulty": 3,
   "bestTime": "Sunrise over the Pacific",
   "tire": "DUELERAT",
   "pit": "hong-tong",
   "desc": "Rolling grassland above the Pacific at the southern gate of the Alangyi Trail, with a hot-spring village below. Very few people. Very. Few.",
   "why": "This is as far south as Taiwan goes, over a lonely ridge road. DUELER A/T002 is all-terrain: it digs into loose shoulders and keeps its manners on the tarmac.",
   "caution": "The Alangyi Trail itself needs a permit and a certified guide.",
   "sources": [
    "https://www.pthg.gov.tw/TownMdt/News_Content.aspx?n=C20E020DF76BD0FF&s=A3BA1CFCDF72528C",
    "https://hiking.biji.co/index.php?act=detail&id=527&q=trail"
   ],
   "geocode": "Nominatim: 草原步道 (attraction), 旭海村, 牡丹鄉",
   "tags": [
    "seaside"
   ],
   "roadShort": "remote ridge road"
  },
  {
   "id": "shitiping",
   "name": "Shitiping Terraces",
   "zh": "豐濱 石梯坪",
   "region": "East",
   "area": "Fengbin · Hualien",
   "lat": 23.490932,
   "lng": 121.507919,
   "category": "Coastal terraces and camping",
   "road": "East Coast Hwy 11: long, open and right beside the ocean",
   "difficulty": 2,
   "bestTime": "Sunrise; camp overnight",
   "tire": "TURANZA6",
   "pit": "hua-dong",
   "desc": "Stepped volcanic and coral terraces full of sea-carved potholes. Pitch a tent on the platforms and wake up to one of the first sunrises in Taiwan.",
   "why": "Hwy 11 is long and beautiful. TURANZA 6 offers ENLITEN comfort and lower rolling resistance for the distance, plus better wet grip for Pacific squalls.",
   "caution": "Rogue waves on the outer terraces; campsite needs booking.",
   "sources": [
    "https://www.eastcoast-nsa.gov.tw/zh-tw/attractions/detail/12/"
   ],
   "geocode": "Nominatim: 石梯坪遊憩區, 港口村, 豐濱鄉",
   "tags": [
    "seaside"
   ],
   "roadShort": "long ocean-side highway"
  },
  {
   "id": "liushidan",
   "name": "Liushidan Mountain",
   "zh": "富里 六十石山",
   "region": "East",
   "area": "Fuli · Hualien",
   "lat": 23.219109,
   "lng": 121.317565,
   "category": "Daylily plateau",
   "road": "Narrow farm switchbacks; one-way traffic control in daylily season",
   "difficulty": 3,
   "bestTime": "Daylily season (2026 festival: Aug 8 to Oct 11)",
   "tire": "DUELERAT",
   "pit": "hua-dong",
   "desc": "A plateau of about 800 m blanketed in orange daylilies, with little pavilions looking over the East Rift Valley. It's in bloom right now, so pick a weekday.",
   "why": "Tight, steep farm switchbacks, often damp in the morning. DUELER A/T002's Z-sipes and high-silica compound grip on both wet concrete and gravel.",
   "caution": "Large buses are banned in season; parking is scarce.",
   "sources": [
    "https://loveweekend.tw/taiwan-travel/hualien-liushidan-daylily/"
   ],
   "geocode": "Nominatim: 六十石山 (peak), 富里鄉",
   "tags": [
    "mountain"
   ],
   "roadShort": "narrow farm switchbacks"
  },
  {
   "id": "jinzun",
   "name": "Jinzun Cove",
   "zh": "東河 金樽",
   "region": "East",
   "area": "Donghe · Taitung",
   "lat": 22.945337,
   "lng": 121.28017,
   "category": "Hidden beach and tombolo",
   "road": "East Coast Hwy 11, then a steep footpath down to the cove",
   "difficulty": 2,
   "bestTime": "Low tide at sunrise",
   "tire": "TURANZA6",
   "pit": "hong-tai",
   "desc": "A white-sand cove with Taiwan's only still-forming tombolo: a tiny island you can walk to only at low tide. Check the tide table, unless you're planning to stay the night.",
   "why": "The long haul down the east coast. TURANZA 6 is comfortable and quiet mile after mile, with better wet grip for sudden Hwy 11 showers.",
   "caution": "No swimming: steep beach and deep water.",
   "sources": [
    "https://www.eastcoast-nsa.gov.tw/zh-tw/attractions/detail/276/"
   ],
   "geocode": "Nominatim: 金樽 viewpoint, 花東海岸公路, 東河鄉",
   "tags": [
    "seaside"
   ],
   "roadShort": "long coastal highway"
  }
 ],
 "hiddenDemo": [
  "xianjiyan",
  "datun",
  "longpan"
 ],
 "centers": [
  {
   "id": "hua-yong",
   "name": "Hua Yong",
   "zh": "樺永輪胎館",
   "city": "Taipei",
   "address": "台北市中正區青島東路33之5號",
   "lat": 25.0432833,
   "lng": 121.525102,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/taipei-city/hua-yong-tire-shop"
  },
  {
   "id": "dong-lin",
   "name": "Dong Lin",
   "zh": "東麟輪胎館",
   "city": "Taipei",
   "address": "台北市大同區延平北路四段195號",
   "lat": 25.0740111,
   "lng": 121.5116608,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/taipei-city/dong-lin-tire-shop"
  },
  {
   "id": "xin-yang",
   "name": "Xin Yang",
   "zh": "鑫揚輪胎館",
   "city": "Taipei",
   "address": "台北市文山區景隆街52號 B1",
   "lat": 24.9984997,
   "lng": 121.5442851,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/taipei-city/xin-yang-tire-shop"
  },
  {
   "id": "tai-lian",
   "name": "Tai Lian",
   "zh": "台聯輪胎館",
   "city": "Keelung",
   "address": "基隆市安樂區麥金路70號1樓",
   "lat": 25.1168269,
   "lng": 121.726278,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/keelung-city/tai-lian-tire-shop"
  },
  {
   "id": "li-shan",
   "name": "Li Shan",
   "zh": "力山輪胎館",
   "city": "Yilan",
   "address": "宜蘭縣五結鄉光榮北路36號",
   "lat": 24.683333,
   "lng": 121.7781945,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/yilan-county/li-shan-tire-shop"
  },
  {
   "id": "cheng-feng",
   "name": "Cheng Feng",
   "zh": "成豐輪胎館",
   "city": "Taichung",
   "address": "台中市潭子區中山路三段354號",
   "lat": 24.2321668,
   "lng": 120.7090963,
   "type": "2.0 Flagship",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/taichung-city/cheng-feng-tire-shop"
  },
  {
   "id": "jian-ye",
   "name": "Jian Ye",
   "zh": "健業輪胎館",
   "city": "Nantou",
   "address": "南投縣竹山鎮集山路三段495號",
   "lat": 23.760908,
   "lng": 120.692993,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/nantou-county/jian-ye-tire-shop"
  },
  {
   "id": "gao-de",
   "name": "Gao De",
   "zh": "高德輪胎館",
   "city": "Chiayi",
   "address": "嘉義縣竹崎鄉灣橋村崎腳160-5號",
   "lat": 23.49117,
   "lng": 120.50533,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/chiayi-county/gao-de-tire-shop"
  },
  {
   "id": "zong-tai",
   "name": "Zong Tai",
   "zh": "宗泰輪胎館",
   "city": "Kaohsiung",
   "address": "高雄市旗山區中學路2之28號",
   "lat": 22.8821658,
   "lng": 120.4796962,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/kaohsiung-city/zong-tai-tire-shop"
  },
  {
   "id": "hong-tong",
   "name": "Hong Tong",
   "zh": "宏通輪胎館",
   "city": "Pingtung",
   "address": "屏東縣東港鎮沿海路15號",
   "lat": 22.4645373,
   "lng": 120.4624544,
   "type": "2.0 Flagship",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/pingtung-county/hong-tong-tire-shop"
  },
  {
   "id": "hua-dong",
   "name": "Hua Dong",
   "zh": "花東輪胎館",
   "city": "Hualien",
   "address": "花蓮縣花蓮市中正路297號",
   "lat": 23.9732665,
   "lng": 121.6010474,
   "type": "Tire Center",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/hualien-county/hua-dong-tire-shop"
  },
  {
   "id": "hong-tai",
   "name": "Hong Tai",
   "zh": "鴻泰輪胎館",
   "city": "Taitung",
   "address": "台東縣台東市更生路264號",
   "lat": 22.7601102,
   "lng": 121.1462889,
   "type": "Flagship",
   "verified": true,
   "source": "https://www.bridgestone.com.tw/zh/dealer/taiwan/taitung-county/hong-tai-tire-shop"
  }
 ],
 "sources": {
  "tireCenters": "Official Bridgestone Taiwan dealer pages (bridgestone.com.tw/zh/dealer/...). Coordinates are the latitude/longitude published in each page's store data. Flagship status for 成豐 and 宏通 is also stated at https://www.bridgestone.com.tw/zh/bridgestone_flagship-store1",
  "geocoding": "OpenStreetMap Nominatim (https://nominatim.openstreetmap.org), data (c) OpenStreetMap contributors, ODbL",
  "routing": "OSRM public demo server (https://router.project-osrm.org), precomputed at build time",
  "tireCopy": "Pack lines and box copy (POTENZA / DUELER / TURANZA) from the client pitch deck, 'Designs' slide",
  "tireModels": "Model names and claims from bridgestone.com.tw product pages (potenza-re-71rs, potenza-sport, turanza-6, dueler-at002); verified 2026-09-28",
  "photos": "Wikimedia Commons, openly licensed (CC BY / CC BY-SA / CC0); see WAM_CREDITS in data/photos.js"
 }
};
