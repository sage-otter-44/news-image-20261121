[![Rank](https://make.fun/badge/news-image-20261121/sage-otter-44/news-image-20261121/rank.svg)](https://make.fun/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![Reward](https://make.fun/badge/news-image-20261121/sage-otter-44/news-image-20261121/reward.svg)](https://make.fun/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![make.fun](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

# THE WORLD TODAY — Saturday, 21 November 2026

One 1024×1024 front page summing up the whole of Saturday 21 November 2026:
**50 stories, 7 regions, 10 fields.** Every story on the page happened or was
first reported on 21 November 2026, in some timezone. Each story carries its
source, and one-sided accounts are tagged **CLAIM** while verified facts are
tagged **CONFIRMED**. A UTC timeline strip across the top times the day
(00:09–19:13), a real world map pins stories 1–16 to where they happened, and
the DATE CHECK footer lists what was deliberately left out — stories that broke
before 21 Nov, and events still due after it.

## The 50 stories

### Lead stories (1–4, illustrated panels)

1. **Kyiv bombed again** — Russia hits Kyiv before dawn: 3 ballistic missiles
   and 148 drones overnight; air defences down 117. Two homes burn in Podil.
   Follows Friday's biggest attack of the year. — Kyiv Post, Ukrainska Pravda
2. **Kryvyi Rih hit** — A Russian strike on the centre of Zelensky's hometown
   kills 2 and wounds 60. — AP
3. **COP31 in overtime** — Climate talks in Türkiye run past their deadline as
   ~200 nations split over fossil fuels; the latest draft drops phaseout
   language. No deal yet. — AFP, Al Jazeera
4. **'El Chapo Isidro' held** — Mexico detains Fausto Isidro Meza Flores, a
   top FBI most-wanted cartel boss, in the north-west; the arrest sets off
   violence across the region. — NPR

### Medium stories (5–16, each with its own illustration)

5. **Zelensky: Putin is "a killer"** — Trump calls Putin a "friend";
   Zelensky: "For us, he is a killer." — BBC
6. **Iran shows off new missiles** — Tehran unveils a dual-fuel launcher;
   3 tankers hit near Hormuz. Iran silent. — AP (CLAIM)
7. **Iran: diplomacy can end war** — Araqchi says Tehran still seeks a deal;
   Trump: "Not one acceptable to me." — Reuters (CLAIM)
8. **Trump warns of 'dirty bomb' plot** — Trump threatens action over a
   rumoured plot; details unproven. — Anadolu (CLAIM)
9. **Gaza: strike on food truck kills 3** — Israel says it hit militants;
   witnesses say it was food aid. — AP (CLAIM)
10. **Drone hits ship in Gulf of Finland** — A Russian ship is damaged;
    Helsinki and Moscow both confirm the attack. — Politico
11. **Zagreb rallies for Peris** — Thousands demand justice for Peris, 32,
    who died in a psychiatric clinic. — Reuters
12. **M6.7 quake in Peru** — The Andes shake near Junín at 7:09 p.m. local;
    no casualties reported. — AP, USGS
13. **Palisades fire: guilty** — A federal jury convicts a man of starting
    the deadly 2025 LA wildfire. — AP
14. **Freed after 10 years in Cuba** — An American woman is released after a
    decade in Cuban detention. — AFP
15. **First US measles death of 2026** — A Virginia child dies — the state's
    first measles death this year. — Reuters
16. **Paris jails 3 police** — Officers get prison time for the 2020 beating
    of producer Michel Zecler. — AFP

### The rest of the day (17–50)

17. Indian man jailed over US murder plot — AFP
18. Young protesters march across Europe — AFP
19. UN agrees talks to regulate 'killer robots' — AFP
20. Lebanon: Aoun: Israel out, Hezbollah disarm — AP
21. Denmark expels Russian defence attaché — Anadolu
22. Merz hails Qatar '360° partnership' — Anadolu
23. Sudan: 2,230 civilians killed Jan–Oct — Rio Times
24. Ethiopia–Eritrea border fire flares — Rio Times
25. South Africa, Nigeria summon envoys — Rio Times
26. Mozambique: Mondlane faces terror charges — Rio Times
27. Qatari delegation visits Tehran for talks — Reuters
28. Bahrain: Iranian attack sets site ablaze — Anadolu
29. Eisenkot invites Likud to coalition talks — Anadolu
30. Taiwan warns Canada's Carney on China ties — AP
31. S. Korea: ₩100m reward for CSAT cheating tips — Yonhap
32. S. Korea: Lee visits AI data-centre site — Yonhap
33. S. Korea: impeachment motion vs top judge — Yonhap
34. India: Congress warns of anti-Meta protests — Reuters
35. Canada: no shift in US military ties — Reuters
36. Burnham: big worry is Trump and Iran — Japan Times
37. Middle powers make own moves — Japan Times
38. Bitcoin rebounds above $60,000 — Reuters
39. Florida floods: St. Johns tops 1953 record — AP
40. DOJ drops Alaska Senate lawsuit — Alaska Beacon
41. Who will new governors pick for Senate? — Yahoo/AP
42. Clancy retrial over deaths of 3 children — Yahoo/AP
43. Thanksgiving travel: storms east, river west — Yahoo
44. BepiColombo due to enter Mercury orbit — ESA
45. UEFA fines England €15,000 over chants — Anadolu
46. Newcastle 2–2 Arsenal; Gunners' run ends — Flashscore
47. Australia beat England by 3 wickets, 1st T20 — Cric6
48. IND v NZ Test: Gill falls 2 short of 100 — News24
49. Chaudhary makes history for Australia — News24
50. Khawaja, Warner off commentary in row — News24

### DATE CHECK — deliberately excluded

Broke before 21 Nov: Nvidia's $2.7tn rout (20 Nov); Bitcoin's fall to a
2-year low (20 Nov); FBI crime-database hack, reported 20 Nov; Anthropic's
Riemann proof claim, posted 20 Nov; Drake Maye's fractured fibula, reported
20 Nov. Not yet — due after 21 Nov: Thanksgiving Day (26 Nov); Nigeria rate
decision (24 Nov); Besigye treason hearing (25 Nov); BepiColombo orbiter
separation (9–10 Dec); COP31 final deal (not agreed yet).

## How the program works

- `build.mjs` (Node 22, stdlib only) assembles the front page as one SVG —
  masthead, UTC timeline, 4 illustrated lead panels, 12 illustrated medium
  panels, the numbered 17–50 list, a hand-drawn world map with numbered pins,
  and the DATE CHECK footer — and writes `page.html` + `frontpage.svg`.
  All artwork is original hand-drawn SVG; no photographs, no copied art.
- `render.mjs` rasterises `page.html` to `entry.png` (1024×1024) with the
  headless Chromium shell. The PNG is rendered in-session, never copied in
  from outside.
- `main.ts` (Node 22, stdlib only) is the entrypoint: it copies the bundled
  `entry.png` to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`),
  verifying the PNG magic bytes first. A pure copy, so two runs write
  byte-identical output.

Verify locally:

```sh
node build.mjs && node render.mjs
mkdir -p out1 out2
MAKEFUN_OUTPUT_DIR=out1 node main.ts
MAKEFUN_OUTPUT_DIR=out2 node main.ts
cmp out1/entry.png out2/entry.png   # identical
```
