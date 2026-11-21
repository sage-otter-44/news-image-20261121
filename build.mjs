// build.mjs — fresh, written from scratch for news-image-20261121.
// Generates a 1024x1024 SVG news front page for Saturday 21 November 2026
// and wraps it in page.html for headless-Chromium rasterisation.
// All 50 stories were researched firsthand on 22 Nov 2026 and are dated 21 Nov 2026.

import { writeFileSync } from 'node:fs';

const W = 1024, H = 1024, M = 12; // page size, outer margin

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SANS = 'DejaVu Sans, Arial, Helvetica, sans-serif';
const SERIF = 'DejaVu Serif, Georgia, serif';

// ---------- data: researched firsthand, every item dated 21 Nov 2026 ----------

const TIMELINE = [
  { t: '00:09', h: ['M6.7 quake shakes', 'Peru\u2019s Andes'] },
  { t: '03:47', h: ['Missile blast rocks', 'Kyiv\u2019s Podil'] },
  { t: '04:32', h: ['Zelensky: Putin is', '\u201ca killer\u201d'] },
  { t: '06:50', h: ['Ukraine downs 117', 'of 148 drones'] },
  { t: '15:25', h: ['Drone hits ship in', 'Gulf of Finland'] },
  { t: '18:08', h: ['Mexico holds', '\u2018El Chapo Isidro\u2019'] },
  { t: '19:13', h: ['Strike kills 2 in', 'Kryvyi Rih'] },
];

const LEADS = [
  {
    n: 1, art: 'kyiv', tag: 'CONFIRMED', src: 'Kyiv Post \u00b7 Ukr. Pravda',
    head: ['KYIV BOMBED', 'AGAIN'],
    body: ['Russia hits Kyiv before dawn: 3 ballistic', 'missiles and 148 drones overnight;', 'air defences down 117. Two homes burn', 'in Podil. Follows Friday\u2019s biggest', 'attack of the year.'],
  },
  {
    n: 2, art: 'kryvyi', tag: 'CONFIRMED', src: 'AP',
    head: ['KRYVYI RIH HIT', ''],
    body: ['A Russian strike on the centre of', 'Zelensky\u2019s hometown kills 2 and', 'wounds 60, officials say. Rescue', 'teams pull survivors from rubble', 'as fires burn in the city centre.'],
  },
  {
    n: 3, art: 'cop31', tag: 'CONFIRMED', src: 'AFP \u00b7 Al Jazeera',
    head: ['COP31 IN', 'OVERTIME'],
    body: ['Climate talks in T\u00fcrkiye run past their', 'deadline as ~200 nations split over', 'fossil fuels; the latest draft drops', 'phaseout language. No deal yet as', 'negotiators work into Saturday.'],
  },
  {
    n: 4, art: 'chapo', tag: 'CONFIRMED', src: 'NPR',
    head: ['\u2018EL CHAPO ISIDRO\u2019', 'HELD'],
    body: ['Mexico detains Fausto Isidro Meza', 'Flores, a top FBI most-wanted cartel', 'boss, in the north-west. The arrest', 'sets off violence across the', 'region, officials say.'],
  },
];

const MEDIUM = [
  { n: 5, art: 'zelensky', tag: 'CONFIRMED', src: 'BBC',
    head: 'ZELENSKY: PUTIN IS \u201cA KILLER\u201d',
    body: 'Trump calls Putin a \u201cfriend\u201d; Zelensky: \u201cFor us, he is a killer.\u201d' },
  { n: 6, art: 'missiles', tag: 'CLAIM', src: 'AP',
    head: 'IRAN SHOWS OFF NEW MISSILES',
    body: 'Tehran unveils a dual-fuel launcher; 3 tankers hit near Hormuz. Iran silent.' },
  { n: 7, art: 'diplomacy', tag: 'CLAIM', src: 'Reuters',
    head: 'IRAN: DIPLOMACY CAN END WAR',
    body: 'Araqchi says Tehran still seeks a deal; Trump: \u201cNot one acceptable to me.\u201d' },
  { n: 8, art: 'dirtybomb', tag: 'CLAIM', src: 'Anadolu',
    head: 'TRUMP WARNS OF \u2018DIRTY BOMB\u2019 PLOT',
    body: 'Trump threatens action over a rumoured plot; details unproven.' },
  { n: 9, art: 'gaza', tag: 'CLAIM', src: 'AP',
    head: 'GAZA: STRIKE ON FOOD TRUCK KILLS 3',
    body: 'Israel says it hit militants; witnesses say it was food aid.' },
  { n: 10, art: 'ship', tag: 'CONFIRMED', src: 'Politico',
    head: 'DRONE HITS SHIP IN GULF OF FINLAND',
    body: 'A Russian ship is damaged; Helsinki and Moscow both confirm the attack.' },
  { n: 11, art: 'zagreb', tag: 'CONFIRMED', src: 'Reuters',
    head: 'ZAGREB RALLIES FOR PERIS',
    body: 'Thousands demand justice for Peris, 32, who died in a psychiatric clinic.' },
  { n: 12, art: 'quake', tag: 'CONFIRMED', src: 'AP \u00b7 USGS',
    head: 'M6.7 QUAKE IN PERU',
    body: 'The Andes shake near Jun\u00edn at 7:09 p.m. local; no casualties reported.' },
  { n: 13, art: 'palisades', tag: 'CONFIRMED', src: 'AP',
    head: 'PALISADES FIRE: GUILTY',
    body: 'A federal jury convicts a man of starting the deadly 2025 LA wildfire.' },
  { n: 14, art: 'cuba', tag: 'CONFIRMED', src: 'AFP',
    head: 'FREED AFTER 10 YEARS IN CUBA',
    body: 'An American woman is released after a decade in Cuban detention.' },
  { n: 15, art: 'measles', tag: 'CONFIRMED', src: 'Reuters',
    head: 'FIRST US MEASLES DEATH OF 2026',
    body: 'A Virginia child dies \u2014 the state\u2019s first measles death this year.' },
  { n: 16, art: 'paris', tag: 'CONFIRMED', src: 'AFP',
    head: 'PARIS JAILS 3 POLICE',
    body: 'Officers get prison time for the 2020 beating of producer Michel Zecler.' },
];

const LIST = [
  [17, 'Indian man jailed over US murder plot', 'AFP'],
  [18, 'Young protesters march across Europe', 'AFP'],
  [19, 'UN agrees talks to regulate \u2018killer robots\u2019', 'AFP'],
  [20, 'Lebanon: Aoun: Israel out, Hezbollah disarm', 'AP'],
  [21, 'Denmark expels Russian defence attach\u00e9', 'Anadolu'],
  [22, 'Merz hails Qatar \u2018360\u00b0 partnership\u2019', 'Anadolu'],
  [23, 'Sudan: 2,230 civilians killed Jan\u2013Oct', 'Rio Times'],
  [24, 'Ethiopia\u2013Eritrea border fire flares', 'Rio Times'],
  [25, 'South Africa, Nigeria summon envoys', 'Rio Times'],
  [26, 'Mozambique: Mondlane faces terror charges', 'Rio Times'],
  [27, 'Qatari delegation visits Tehran for talks', 'Reuters'],
  [28, 'Bahrain: Iranian attack sets site ablaze', 'Anadolu'],
  [29, 'Eisenkot invites Likud to coalition talks', 'Anadolu'],
  [30, 'Taiwan warns Canada\u2019s Carney on China ties', 'AP'],
  [31, 'S. Korea: \u20a9100m reward for CSAT cheating tips', 'Yonhap'],
  [32, 'S. Korea: Lee visits AI data-centre site', 'Yonhap'],
  [33, 'S. Korea: impeachment motion vs top judge', 'Yonhap'],
  [34, 'India: Congress warns of anti-Meta protests', 'Reuters'],
  [35, 'Canada: no shift in US military ties', 'Reuters'],
  [36, 'Burnham: big worry is Trump and Iran', 'Japan Times'],
  [37, 'Middle powers make own moves', 'Japan Times'],
  [38, 'Bitcoin rebounds above $60,000', 'Reuters'],
  [39, 'Florida floods: St. Johns tops 1953 record', 'AP'],
  [40, 'DOJ drops Alaska Senate lawsuit', 'Alaska Beacon'],
  [41, 'Who will new governors pick for Senate?', 'Yahoo/AP'],
  [42, 'Clancy retrial over deaths of 3 children', 'Yahoo/AP'],
  [43, 'Thanksgiving travel: storms east, river west', 'Yahoo'],
  [44, 'BepiColombo due to enter Mercury orbit', 'ESA'],
  [45, 'UEFA fines England \u20ac15,000 over chants', 'Anadolu'],
  [46, 'Newcastle 2\u20132 Arsenal; Gunners\u2019 run ends', 'Flashscore'],
  [47, 'Australia beat England by 3 wickets, 1st T20', 'Cric6'],
  [48, 'IND v NZ Test: Gill falls 2 short of 100', 'News24'],
  [49, 'Chaudhary makes history for Australia', 'News24'],
  [50, 'Khawaja, Warner off commentary in row', 'News24'],
];

const DATECHECK_BEFORE = [
  'Nvidia\u2019s $2.7tn rout \u2014 20 Nov',
  'Bitcoin\u2019s fall to a 2-year low \u2014 20 Nov',
  'FBI crime-database hack \u2014 reported 20 Nov',
  'Anthropic\u2019s Riemann proof claim \u2014 20 Nov',
  'Drake Maye\u2019s fractured fibula \u2014 20 Nov',
];
const DATECHECK_AFTER = [
  'Thanksgiving Day \u2014 26 Nov',
  'Nigeria rate decision \u2014 24 Nov',
  'Besigye treason hearing \u2014 25 Nov',
  'BepiColombo orbiter separation \u2014 9\u201310 Dec',
  'COP31 final deal \u2014 not agreed yet',
];

// ---------- small drawing helpers ----------

function lines(x, y, arr, size, lh, fill, weight = 'normal', anchor = 'start') {
  return arr.map((ln, i) =>
    `<text x="${x}" y="${y + i * lh}" font-family="${SANS}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(ln)}</text>`
  ).join('\n');
}

function tagChip(x, y, tag) {
  const col = tag === 'CONFIRMED' ? '#1e7a34' : '#b26a00';
  const bg = tag === 'CONFIRMED' ? '#dcefdf' : '#fdeecb';
  const w = tag === 'CONFIRMED' ? 74 : 44;
  return `<rect x="${x}" y="${y}" width="${w}" height="14" rx="2" fill="${bg}" stroke="${col}" stroke-width="0.7"/>` +
    `<text x="${x + w / 2}" y="${y + 10.5}" font-family="${SANS}" font-size="8.5" font-weight="bold" fill="${col}" text-anchor="middle">${tag}</text>`;
}

// ---------- original drawn scenes (all art is hand-drawn SVG, no photos) ----------

function sceneKyiv() {
  return `<rect width="244" height="118" fill="#1d2b4a"/>
  <circle cx="30" cy="18" r="1.6" fill="#fff"/><circle cx="90" cy="10" r="1.3" fill="#fff"/><circle cx="160" cy="22" r="1.6" fill="#fff"/><circle cx="210" cy="12" r="1.3" fill="#fff"/>
  <circle cx="196" cy="26" r="13" fill="#f5d76e"/>
  <rect x="0" y="72" width="244" height="46" fill="#141d33"/>
  <rect x="14" y="52" width="26" height="66" fill="#2c3c5e"/><polygon points="14,52 27,36 40,52" fill="#2c3c5e"/>
  <rect x="52" y="62" width="34" height="56" fill="#33456b"/><circle cx="69" cy="56" r="9" fill="#d8b45a"/>
  <rect x="98" y="48" width="30" height="70" fill="#2c3c5e"/><polygon points="98,48 113,30 128,48" fill="#2c3c5e"/>
  <rect x="140" y="66" width="38" height="52" fill="#33456b"/><circle cx="159" cy="60" r="8" fill="#d8b45a"/>
  <rect x="188" y="58" width="28" height="60" fill="#2c3c5e"/>
  <g fill="#f5d76e"><rect x="20" y="60" width="5" height="6"/><rect x="30" y="72" width="5" height="6"/><rect x="58" y="70" width="5" height="6"/><rect x="72" y="80" width="5" height="6"/><rect x="104" y="56" width="5" height="6"/><rect x="118" y="68" width="5" height="6"/><rect x="146" y="74" width="5" height="6"/><rect x="166" y="82" width="5" height="6"/><rect x="194" y="66" width="5" height="6"/></g>
  <polygon points="196,8 202,22 216,20 205,30 210,44 196,36 182,44 187,30 176,20 190,22" fill="#ff7b2f"/>
  <polygon points="196,16 199,25 208,24 201,30 204,39 196,34 188,39 191,30 184,24 193,25" fill="#ffd23f"/>
  <circle cx="60" cy="96" r="14" fill="#5a6a8a" opacity="0.85"/><circle cx="84" cy="102" r="10" fill="#5a6a8a" opacity="0.85"/>`;
}

function sceneKryvyi() {
  return `<rect width="244" height="118" fill="#e8a04c"/>
  <rect x="0" y="0" width="244" height="60" fill="#f2c14e"/>
  <circle cx="210" cy="24" r="16" fill="#fff3c4"/>
  <rect x="16" y="44" width="52" height="74" fill="#7d8896"/><rect x="86" y="30" width="60" height="88" fill="#6b7686"/><rect x="164" y="52" width="56" height="66" fill="#7d8896"/>
  <g fill="#ffe9a8"><rect x="24" y="52" width="8" height="8"/><rect x="40" y="52" width="8" height="8"/><rect x="24" y="68" width="8" height="8"/><rect x="40" y="68" width="8" height="8"/><rect x="94" y="40" width="8" height="8"/><rect x="112" y="40" width="8" height="8"/><rect x="130" y="40" width="8" height="8"/><rect x="94" y="58" width="8" height="8"/><rect x="112" y="58" width="8" height="8"/><rect x="172" y="60" width="8" height="8"/><rect x="190" y="60" width="8" height="8"/></g>
  <polygon points="116,10 121,24 136,22 124,32 129,46 116,38 103,46 108,32 96,22 111,24" fill="#e8480f"/>
  <polygon points="116,20 119,28 127,27 121,33 124,41 116,36 108,41 111,33 105,27 113,28" fill="#ffd23f"/>
  <rect x="96" y="96" width="44" height="16" fill="#fff"/><rect x="96" y="96" width="44" height="16" fill="none" stroke="#c0392b" stroke-width="1.4"/>
  <rect x="114" y="99" width="8" height="10" fill="#c0392b"/><rect x="111" y="102" width="14" height="4" fill="#c0392b"/>
  <rect x="0" y="112" width="244" height="6" fill="#5c4a33"/>`;
}

function sceneCop31() {
  return `<rect width="244" height="118" fill="#bfe3ea"/>
  <circle cx="34" cy="26" r="16" fill="#ffdf6b"/>
  <path d="M0 52 Q 60 38 122 50 T 244 46 V118 H0 Z" fill="#9ec98f"/>
  <rect x="28" y="66" width="188" height="10" fill="#8a5a33"/><rect x="40" y="76" width="8" height="30" fill="#6e4423"/><rect x="196" y="76" width="8" height="30" fill="#6e4423"/>
  <circle cx="122" cy="52" r="17" fill="#3f8fd2"/><path d="M108 44 Q118 38 126 46 Q132 54 122 62 Q112 60 108 52 Z" fill="#5cb85c"/><path d="M128 40 Q136 44 134 52 Q128 56 126 48 Z" fill="#5cb85c"/>
  <g><rect x="46" y="34" width="4" height="32" fill="#555"/><rect x="50" y="34" width="16" height="10" fill="#c0392b"/>
  <rect x="76" y="34" width="4" height="32" fill="#555"/><rect x="80" y="34" width="16" height="10" fill="#2e6fb0"/>
  <rect x="168" y="34" width="4" height="32" fill="#555"/><rect x="172" y="34" width="16" height="10" fill="#1e7a34"/>
  <rect x="196" y="34" width="4" height="32" fill="#555"/><rect x="200" y="34" width="16" height="10" fill="#f2c14e"/></g>
  <rect x="60" y="86" width="14" height="18" fill="#f5f0e0" stroke="#999" stroke-width="0.8"/><rect x="96" y="86" width="14" height="18" fill="#f5f0e0" stroke="#999" stroke-width="0.8"/><rect x="132" y="86" width="14" height="18" fill="#f5f0e0" stroke="#999" stroke-width="0.8"/><rect x="168" y="86" width="14" height="18" fill="#f5f0e0" stroke="#999" stroke-width="0.8"/>`;
}

function sceneChapo() {
  return `<rect width="244" height="118" fill="#f7d9a0"/>
  <circle cx="206" cy="24" r="15" fill="#ffdf6b"/>
  <polygon points="0,118 0,78 52,44 96,82 150,52 200,88 244,66 244,118" fill="#b07a3e"/>
  <polygon points="0,118 0,96 70,70 130,96 190,76 244,96 244,118" fill="#8a5a28"/>
  <rect x="0" y="104" width="244" height="14" fill="#e0b070"/>
  <ellipse cx="70" cy="34" rx="26" ry="9" fill="#3a4a5a"/><rect x="92" y="30" width="26" height="6" fill="#3a4a5a"/><rect x="40" y="24" width="60" height="2.4" fill="#222"/>
  <circle cx="62" cy="33" r="4" fill="#bfe3ea"/><circle cx="78" cy="33" r="4" fill="#bfe3ea"/>
  <rect x="150" y="86" width="40" height="26" fill="#fff" stroke="#c0392b" stroke-width="1.6"/>
  <circle cx="170" cy="96" r="6" fill="none" stroke="#c0392b" stroke-width="1.6"/><path d="M166 99 L170 103 L176 96" stroke="#c0392b" stroke-width="1.6" fill="none"/>
  <text x="170" y="110" font-family="${SANS}" font-size="7" font-weight="bold" fill="#c0392b" text-anchor="middle">WANTED</text>`;
}

// medium 62x62 scenes, drawn in a 62x62 box
function art62(key) {
  switch (key) {
    case 'zelensky': return `<rect width="62" height="62" fill="#dce9f5"/><rect x="8" y="14" width="4" height="30" fill="#8a6a3b"/><rect x="12" y="14" width="18" height="11" fill="#2f6db3"/><rect x="12" y="25" width="18" height="11" fill="#f2c14e"/><rect x="36" y="14" width="4" height="30" fill="#8a6a3b"/><rect x="40" y="14" width="18" height="11" fill="#005bbb"/><rect x="40" y="25" width="18" height="11" fill="#ffd500"/><rect x="14" y="42" width="34" height="16" fill="#6e4423"/><rect x="14" y="42" width="34" height="4" fill="#8a5a33"/><circle cx="24" cy="38" r="3" fill="#222"/><rect x="23" y="38" width="2" height="6" fill="#222"/><circle cx="38" cy="38" r="3" fill="#222"/><rect x="37" y="38" width="2" height="6" fill="#222"/>`;
    case 'missiles': return `<rect width="62" height="62" fill="#3a3f46"/><rect x="0" y="0" width="62" height="62" fill="none" stroke="#222" stroke-width="2"/><ellipse cx="31" cy="52" rx="24" ry="7" fill="#23262b"/><rect x="26" y="10" width="10" height="34" rx="4" fill="#c8ccd2"/><polygon points="26,10 36,10 31,2" fill="#e8480f"/><polygon points="24,44 28,52 34,52 38,44" fill="#ff7b2f"/><polygon points="27,46 30,52 35,52 35,46" fill="#ffd23f"/><circle cx="31" cy="22" r="3" fill="#e8480f"/>`;
    case 'diplomacy': return `<rect width="62" height="62" fill="#e8ecf2"/><rect x="8" y="12" width="4" height="28" fill="#8a6a3b"/><rect x="12" y="12" width="16" height="4" fill="#b22234"/><rect x="12" y="16" width="16" height="4" fill="#fff"/><rect x="12" y="20" width="16" height="4" fill="#b22234"/><rect x="12" y="24" width="16" height="4" fill="#fff"/><rect x="12" y="28" width="16" height="4" fill="#b22234"/><rect x="42" y="12" width="4" height="28" fill="#8a6a3b"/><rect x="46" y="12" width="16" height="5" fill="#239f40"/><rect x="46" y="17" width="16" height="5" fill="#fff"/><rect x="46" y="22" width="16" height="5" fill="#da0001"/><rect x="10" y="44" width="42" height="6" fill="#8a5a33"/><rect x="16" y="50" width="5" height="8" fill="#6e4423"/><rect x="41" y="50" width="5" height="8" fill="#6e4423"/><circle cx="24" cy="40" r="4" fill="#f2c14e"/><circle cx="38" cy="40" r="4" fill="#5cb85c"/>`;
    case 'dirtybomb': return `<rect width="62" height="62" fill="#f7f3ea"/><polygon points="31,6 58,54 4,54" fill="#ffd23f" stroke="#222" stroke-width="2"/><circle cx="31" cy="36" r="5" fill="#222"/><path d="M31 31 L31 20 A11 11 0 0 1 40 26 Z" fill="#222"/><path d="M35 38 L45 44 A11 11 0 0 1 33 47 Z" fill="#222"/><path d="M27 38 L17 44 A11 11 0 0 1 29 47 Z" fill="#222"/>`;
    case 'gaza': return `<rect width="62" height="62" fill="#e6d3ae"/><rect x="0" y="44" width="62" height="18" fill="#c9b18a"/><rect x="8" y="30" width="26" height="16" fill="#fff" stroke="#999" stroke-width="1"/><rect x="34" y="34" width="12" height="12" fill="#3f8fd2"/><rect x="40" y="28" width="6" height="6" fill="#bfe3ea"/><circle cx="16" cy="48" r="4" fill="#222"/><circle cx="30" cy="48" r="4" fill="#222"/><circle cx="42" cy="48" r="4" fill="#222"/><rect x="12" y="34" width="8" height="6" fill="#e8a04c"/><rect x="22" y="34" width="8" height="6" fill="#8a5a33"/><polygon points="50,8 53,16 60,15 54,20 56,27 50,22 44,27 46,20 40,15 47,16" fill="#e8480f"/>`;
    case 'ship': return `<rect width="62" height="62" fill="#bfe3ea"/><path d="M0 44 Q 15 38 31 44 T 62 44 V62 H0 Z" fill="#3f8fd2"/><path d="M0 52 Q 15 46 31 52 T 62 52 V62 H0 Z" fill="#2e6fb0"/><rect x="14" y="34" width="34" height="9" fill="#5a3a28"/><rect x="22" y="24" width="18" height="10" fill="#7d8896"/><rect x="28" y="16" width="6" height="8" fill="#5a3a28"/><circle cx="48" cy="12" r="2" fill="#222"/><circle cx="54" cy="12" r="2" fill="#222"/><circle cx="48" cy="18" r="2" fill="#222"/><circle cx="54" cy="18" r="2" fill="#222"/><path d="M46 10 L56 20 M56 10 L46 20" stroke="#222" stroke-width="1.2"/>`;
    case 'zagreb': return `<rect width="62" height="62" fill="#dfe6ee"/><rect x="0" y="46" width="62" height="16" fill="#b9a98a"/><rect x="10" y="18" width="42" height="28" fill="#e8dcc4" stroke="#a08c66" stroke-width="1"/><rect x="10" y="18" width="42" height="6" fill="#c0392b"/><rect x="14" y="34" width="5" height="12" fill="#fff"/><polygon points="16.5,28 14,34 19,34" fill="#ff9d2e"/><rect x="28" y="34" width="5" height="12" fill="#fff"/><polygon points="30.5,28 28,34 33,34" fill="#ff9d2e"/><rect x="42" y="34" width="5" height="12" fill="#fff"/><polygon points="44.5,28 42,34 47,34" fill="#ff9d2e"/><rect x="20" y="52" width="10" height="6" rx="2" fill="#fff" stroke="#999" stroke-width="0.7"/><rect x="34" y="52" width="10" height="6" rx="2" fill="#fff" stroke="#999" stroke-width="0.7"/>`;
    case 'quake': return `<rect width="62" height="62" fill="#e8dcc8"/><polygon points="0,62 0,34 16,14 30,34 44,10 62,36 62,62" fill="#8a7a5a"/><polygon points="16,14 22,24 12,26" fill="#fff"/><polygon points="44,10 50,20 40,22" fill="#fff"/><path d="M30 34 L34 44 L30 52 L36 62" stroke="#7a2e0e" stroke-width="2.4" fill="none"/><path d="M4 52 L12 52 L15 46 L19 56 L23 50 L28 52 L40 52 L43 48 L47 54 L52 52 L58 52" stroke="#c0392b" stroke-width="1.6" fill="none"/>`;
    case 'palisades': return `<rect width="62" height="62" fill="#f2d8a0"/><polygon points="0,62 0,40 62,28 62,62" fill="#7a9a5a"/><polygon points="10,40 14,26 18,40" fill="#ff7b2f"/><polygon points="22,40 26,22 30,40" fill="#e8480f"/><polygon points="34,38 38,28 42,38" fill="#ff9d2e"/><rect x="40" y="44" width="16" height="12" fill="#fff"/><polygon points="38,44 48,36 58,44" fill="#c0392b"/><rect x="43" y="48" width="2" height="8" fill="#999"/><rect x="47" y="48" width="2" height="8" fill="#999"/><rect x="51" y="48" width="2" height="8" fill="#999"/>`;
    case 'cuba': return `<rect width="62" height="62" fill="#bfe3ea"/><circle cx="50" cy="12" r="8" fill="#ffdf6b"/><path d="M6 44 Q 20 36 32 42 T 56 42 V62 H6 Z" fill="#5cb85c"/><polygon points="6,44 20,36 32,42" fill="#4a9a4a"/><rect x="14" y="20" width="34" height="5" fill="#fff"/><polygon points="48,20 56,22 48,24" fill="#fff"/><polygon points="14,20 6,24 14,24" fill="#dde6ee"/><rect x="26" y="14" width="3" height="6" fill="#fff"/>`;
    case 'measles': return `<rect width="62" height="62" fill="#dce9f5"/><rect x="10" y="14" width="42" height="30" rx="3" fill="#fff" stroke="#2e6fb0" stroke-width="1.4"/><rect x="28" y="20" width="6" height="18" fill="#c0392b"/><rect x="22" y="26" width="18" height="6" fill="#c0392b"/><circle cx="46" cy="50" r="6" fill="#e8480f"/><path d="M46 42 L46 39 M46 58 L46 61 M38 50 L35 50 M54 50 L57 50 M41 45 L39 43 M51 45 L53 43 M41 55 L39 57 M51 55 L53 57" stroke="#e8480f" stroke-width="1.4"/><circle cx="16" cy="50" r="4" fill="#e8480f"/><path d="M16 44 L16 42 M16 56 L16 58 M10 50 L8 50 M22 50 L24 50" stroke="#e8480f" stroke-width="1.2"/>`;
    case 'paris': return `<rect width="62" height="62" fill="#e6ddc8"/><polygon points="8,26 31,10 54,26" fill="#c9b98f"/><rect x="12" y="26" width="38" height="6" fill="#b3a276"/><rect x="15" y="32" width="5" height="18" fill="#f5f0e0" stroke="#999" stroke-width="0.7"/><rect x="25" y="32" width="5" height="18" fill="#f5f0e0" stroke="#999" stroke-width="0.7"/><rect x="35" y="32" width="5" height="18" fill="#f5f0e0" stroke="#999" stroke-width="0.7"/><rect x="45" y="32" width="5" height="18" fill="#f5f0e0" stroke="#999" stroke-width="0.7"/><rect x="10" y="50" width="42" height="5" fill="#b3a276"/><circle cx="31" cy="20" r="3" fill="#8a6a3b"/>`;
    default: return `<rect width="62" height="62" fill="#ddd"/>`;
  }
}

// ---------- world map (simplified continents, equirectangular) ----------

const MAP = { x: M, y: 694, w: 392, h: 222 };
const mx = (lon) => MAP.x + ((lon + 168) / 360) * MAP.w;
const my = (lat) => MAP.y + ((78 - lat) / 134) * MAP.h;
const poly = (pts) => pts.map(([lo, la]) => `${mx(lo).toFixed(1)},${my(la).toFixed(1)}`).join(' ');

const CONTINENTS = [
  [[-168,66],[-158,71],[-140,70],[-125,72],[-115,73],[-95,80],[-85,76],[-80,73],[-75,62],[-65,60],[-55,52],[-60,47],[-70,42],[-75,35],[-80,32],[-81,26],[-90,21],[-97,26],[-105,20],[-110,23],[-117,33],[-125,40],[-125,49],[-135,58],[-150,60],[-165,60]],
  [[-58,64],[-45,60],[-40,65],[-55,76],[-68,76],[-65,70]],
  [[-80,9],[-72,12],[-62,10],[-52,5],[-50,-5],[-35,-8],[-40,-20],[-48,-28],[-58,-38],[-65,-45],[-70,-54],[-73,-40],[-73,-25],[-80,-15],[-81,-5],[-80,5]],
  [[-17,15],[-10,30],[-5,35],[10,37],[20,32],[32,31],[35,28],[43,12],[48,11],[40,0],[35,-18],[28,-33],[18,-35],[12,-18],[8,4],[-8,5],[-15,11]],
  [[-10,36],[-9,43],[-2,48],[-4,50],[2,51],[8,57],[12,56],[18,56],[21,60],[28,71],[40,68],[55,68],[70,72],[90,75],[110,76],[130,72],[150,70],[170,66],[178,65],[170,60],[162,56],[158,52],[142,50],[140,40],[135,35],[130,33],[122,30],[120,22],[110,20],[105,10],[100,8],[98,15],[95,16],[90,22],[85,20],[80,15],[76,8],[72,20],[66,25],[60,25],[57,27],[52,26],[48,29],[44,29],[40,31],[36,36],[30,36],[26,40],[22,38],[18,40],[12,44],[8,44],[3,43],[-2,37],[-9,37]],
  [[-5,50],[-3,53],[-5,56],[-2,58],[0,53]],
  [[130,31],[132,33],[135,34],[138,35],[140,38],[141,42],[143,44],[145,44],[142,40],[140,36],[137,35],[133,34],[130,32]],
  [[114,-22],[114,-30],[115,-35],[120,-34],[129,-32],[132,-32],[137,-35],[140,-38],[145,-38],[150,-37],[153,-32],[153,-27],[150,-22],[146,-19],[142,-15],[142,-11],[137,-12],[135,-15],[132,-12],[130,-13],[126,-14],[122,-17],[118,-20]],
  [[109,1],[117,4],[119,-1],[114,-3],[110,-2]],
  [[131,-1],[138,-4],[141,-8],[147,-9],[150,-10],[146,-7],[141,-3],[136,-2],[132,-1]],
  [[44,-12],[47,-15],[50,-16],[49,-20],[45,-25],[43,-21],[44,-16]],
  [[167,-45],[170,-42],[174,-39],[177,-38],[175,-41],[172,-43],[168,-46]],
];

// hand-tuned pin spots: [story, lon, lat, dx, dy] — dx/dy nudge crowded pins
// away from their true spot, with a thin leader line back to it
const PINS = [
  [1, 30.5, 50.5, 0, 0], [2, 33.4, 47.9, 14, -7], [3, 30.7, 36.9, 0, 0], [4, -107.4, 25.0, 0, 0],
  [5, 30.5, 50.5, -20, -17], [6, 56.5, 26.5, 0, 0], [7, 51.4, 35.7, 0, 0], [8, -77.0, 38.9, 0, 0],
  [9, 34.5, 31.5, 6, 7], [10, 24.0, 59.5, 7, -12], [11, 16.0, 45.8, 0, 0], [12, -76.0, -11.0, 0, 0],
  [13, -118.2, 34.0, 0, 0], [14, -82.4, 23.1, 0, 0], [15, -78.5, 37.5, 10, 12], [16, 2.35, 48.85, 0, 0],
];

function mapSvg() {
  const land = CONTINENTS.map((c) =>
    `<polygon points="${poly(c)}" fill="#dfe6cf" stroke="#8a9a7a" stroke-width="0.9" stroke-linejoin="round"/>`).join('\n');
  const pins = PINS.map(([n, lo, la, dx, dy]) => {
    const x = mx(lo) + dx, y = my(la) + dy;
    const leader = (dx || dy)
      ? `<line x1="${mx(lo).toFixed(1)}" y1="${my(la).toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#c0392b" stroke-width="0.9"/><circle cx="${mx(lo).toFixed(1)}" cy="${my(la).toFixed(1)}" r="2" fill="#c0392b"/>`
      : '';
    return leader + `<g><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.4" fill="#c0392b" stroke="#fff" stroke-width="1.3"/>` +
      `<text x="${x.toFixed(1)}" y="${(y + 2.8).toFixed(1)}" font-family="${SANS}" font-size="8" font-weight="bold" fill="#fff" text-anchor="middle">${n}</text></g>`;
  }).join('\n');
  return `<rect x="${MAP.x}" y="${MAP.y}" width="${MAP.w}" height="${MAP.h}" fill="#cfe0ea" stroke="#9db6c6" stroke-width="1"/>
  ${land}
  <text x="${MAP.x + 8}" y="${MAP.y + 150}" font-family="${SANS}" font-size="8.5" font-weight="bold" fill="#5a6a7a">PACIFIC</text>
  <text x="${MAP.x + 128}" y="${MAP.y + 86}" font-family="${SANS}" font-size="8.5" font-weight="bold" fill="#5a6a7a">ATLANTIC</text>
  <text x="${MAP.x + 250}" y="${MAP.y + 200}" font-family="${SANS}" font-size="8.5" font-weight="bold" fill="#5a6a7a">INDIAN O.</text>
  ${pins}`;
}

// ---------- page assembly ----------

function masthead() {
  return `<rect x="0" y="0" width="${W}" height="74" fill="#16233f"/>
  <rect x="0" y="74" width="${W}" height="3" fill="#d8a94e"/>
  <text x="${M + 4}" y="47" font-family="${SERIF}" font-size="40" font-weight="bold" fill="#f5efdd">THE WORLD TODAY</text>
  <text x="${W - M - 4}" y="32" font-family="${SANS}" font-size="19" font-weight="bold" fill="#f5efdd" text-anchor="end">SATURDAY \u00b7 21 NOVEMBER 2026</text>
  <text x="${W - M - 4}" y="58" font-family="${SANS}" font-size="13" font-weight="bold" fill="#ffd166" text-anchor="end">50 STORIES \u00b7 7 REGIONS \u00b7 10 FIELDS</text>`;
}

function timeline() {
  const cw = (W - 2 * M) / 7;
  let out = `<rect x="0" y="77" width="${W}" height="51" fill="#efe8d3"/>`;
  TIMELINE.forEach((ev, i) => {
    const x = M + i * cw;
    out += `<line x1="${x}" y1="82" x2="${x}" y2="123" stroke="#c9bfa4" stroke-width="1"/>`;
    out += `<text x="${x + 6}" y="94" font-family="${SANS}" font-size="13" font-weight="bold" fill="#b3261e">${ev.t} UTC</text>`;
    out += `<text x="${x + 6}" y="108" font-family="${SANS}" font-size="10" font-weight="bold" fill="#1d2b45">${esc(ev.h[0])}</text>`;
    out += `<text x="${x + 6}" y="120" font-family="${SANS}" font-size="10" font-weight="bold" fill="#1d2b45">${esc(ev.h[1])}</text>`;
  });
  return out;
}

function leads() {
  const y0 = 128, ph = 272, pw = 244, gap = (W - 2 * M - 4 * pw) / 3;
  let out = '';
  LEADS.forEach((L, i) => {
    const x = M + i * (pw + gap), y = y0;
    const art = { kyiv: sceneKyiv, kryvyi: sceneKryvyi, cop31: sceneCop31, chapo: sceneChapo }[L.art]();
    out += `<rect x="${x}" y="${y}" width="${pw}" height="${ph}" fill="#ffffff" stroke="#c9c2ae" stroke-width="1"/>`;
    out += `<g transform="translate(${x},${y})">${art}</g>`;
    out += `<circle cx="${x + 18}" cy="${y + 136}" r="11" fill="#c0392b"/><text x="${x + 18}" y="${y + 140.5}" font-family="${SANS}" font-size="13" font-weight="bold" fill="#fff" text-anchor="middle">${L.n}</text>`;
    out += lines(x + 36, y + 134, L.head.filter(Boolean), 15.5, 17, '#16233f', 'bold');
    const bodyY = y + 134 + L.head.filter(Boolean).length * 17 + 6;
    out += lines(x + 10, bodyY, L.body, 11, 13.5, '#33302a');
    const chipW = L.tag === 'CONFIRMED' ? 74 : 44;
    out += tagChip(x + pw - 10 - chipW, y + ph - 22, L.tag);
    out += `<text x="${x + 10}" y="${y + ph - 11}" font-family="${SANS}" font-size="9" font-weight="bold" fill="#6a6252">${esc(L.src)}</text>`;
  });
  return out;
}

function medium() {
  const y0 = 400, pw = 244, ph = 86, gap = (W - 2 * M - 4 * pw) / 3;
  let out = '';
  MEDIUM.forEach((m, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = M + col * (pw + gap), y = y0 + row * (ph + 8);
    out += `<rect x="${x}" y="${y}" width="${pw}" height="${ph}" fill="#ffffff" stroke="#c9c2ae" stroke-width="1"/>`;
    out += `<g transform="translate(${x + 6},${y + 12})">${art62(m.art)}</g>`;
    out += `<circle cx="${x + 13}" cy="${y + 19}" r="8" fill="#c0392b"/><text x="${x + 13}" y="${y + 22}" font-family="${SANS}" font-size="9.5" font-weight="bold" fill="#fff" text-anchor="middle">${m.n}</text>`;
    const tx = x + 76;
    // headline, wrapped by hand into at most two short lines
    const words = m.head.split(' ');
    let l1 = '', l2 = '';
    words.forEach((w) => { if ((l1 + ' ' + w).trim().length <= 21) l1 = (l1 + ' ' + w).trim(); else l2 = (l2 + ' ' + w).trim(); });
    out += lines(tx, y + 16, [l1, l2].filter(Boolean), 11, 13, '#16233f', 'bold');
    const bodyTop = y + 16 + [l1, l2].filter(Boolean).length * 13 + 2;
    // body wrapped to ~26 chars per line, max 3 lines (kept clear of the tag chip)
    const bw = m.body.split(' ');
    const bl = [''];
    bw.forEach((w) => { if ((bl[bl.length - 1] + ' ' + w).trim().length <= 26) bl[bl.length - 1] = (bl[bl.length - 1] + ' ' + w).trim(); else bl.push(w); });
    if (bl.length > 3) throw new Error(`medium #${m.n} body wraps to ${bl.length} lines — shorten it: ${m.body}`);
    out += lines(tx, bodyTop, bl.slice(0, 3), 9.5, 11, '#33302a');
    const mChipW = m.tag === 'CONFIRMED' ? 74 : 44;
    out += tagChip(x + pw - 10 - mChipW, y + ph - 17, m.tag);
    out += `<text x="${tx}" y="${y + ph - 8}" font-family="${SANS}" font-size="8.5" font-weight="bold" fill="#6a6252">${esc(m.src)}</text>`;
  });
  return out;
}

function listSection() {
  const lx = 416, colW = 296;
  let out = '';
  out += `<text x="${MAP.x}" y="690" font-family="${SANS}" font-size="12" font-weight="bold" fill="#16233f">WHERE IT HAPPENED \u2014 PINS 1\u201316</text>`;
  out += `<text x="${lx}" y="690" font-family="${SANS}" font-size="12" font-weight="bold" fill="#16233f">THE REST OF THE DAY \u2014 17\u201350</text>`;
  out += mapSvg();
  const left = LIST.slice(0, 17), right = LIST.slice(17);
  [left, right].forEach((col, ci) => {
    col.forEach(([n, head, src], ri) => {
      const x = lx + ci * colW, y = 706 + ri * 12.6;
      out += `<text x="${x}" y="${y}" font-family="${SANS}" font-size="10" fill="#33302a"><tspan font-weight="bold" fill="#c0392b">${n}.</tspan> ${esc(head)} \u2014 <tspan fill="#6a6252">${esc(src)}</tspan></text>`;
    });
  });
  return out;
}

function dateCheck() {
  const y0 = 924;
  let out = `<rect x="0" y="${y0}" width="${W}" height="100" fill="#16233f"/>`;
  out += `<text x="${M + 4}" y="${y0 + 17}" font-family="${SANS}" font-size="11" font-weight="bold" fill="#ffd166">DATE CHECK \u2014 WHAT IS NOT IN THIS PICTURE</text>`;
  out += `<text x="${M + 4}" y="${y0 + 34}" font-family="${SANS}" font-size="9.5" font-weight="bold" fill="#f5efdd">BROKE BEFORE 21 NOV \u2014 EXCLUDED:</text>`;
  out += `<text x="${W / 2 + 8}" y="${y0 + 34}" font-family="${SANS}" font-size="9.5" font-weight="bold" fill="#f5efdd">NOT YET \u2014 DUE AFTER 21 NOV:</text>`;
  DATECHECK_BEFORE.forEach((it, i) => {
    out += `<text x="${M + 16}" y="${y0 + 45 + i * 11}" font-family="${SANS}" font-size="9" fill="#d8d2c2">\u2715  ${esc(it)}</text>`;
  });
  DATECHECK_AFTER.forEach((it, i) => {
    out += `<text x="${W / 2 + 20}" y="${y0 + 45 + i * 11}" font-family="${SANS}" font-size="9" fill="#d8d2c2">\u25cb  ${esc(it)}</text>`;
  });
  out += `<text x="${W / 2}" y="${y0 + 97}" font-family="${SANS}" font-size="8.5" fill="#9fb0c6" text-anchor="middle">Every story above happened or was first reported on 21 Nov 2026 \u00b7 Full source list in README.md</text>`;
  return out;
}

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
<rect width="${W}" height="${H}" fill="#f7f3ea"/>
${masthead()}
${timeline()}
${leads()}
${medium()}
${listSection()}
${dateCheck()}
</svg>`;

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0">${svg}</body></html>`;
writeFileSync(new URL('./page.html', import.meta.url), html);
writeFileSync(new URL('./frontpage.svg', import.meta.url), svg);
console.log('wrote page.html + frontpage.svg');
