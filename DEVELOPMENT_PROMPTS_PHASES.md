# 🌸 Master Prompt Engineering Suite: Birthday Surprise Website

> **Role:** Lead Prompt Engineer  
> **Source Material:** `Screen Recording 2026-10-25 180523.mp4` & [BIRTHDAY_WEBSITE_SPECIFICATION.md](file:///E:/ProjectB/BIRTHDAY_WEBSITE_SPECIFICATION.md)  
> **Structure:** **4 Sequential, Self-Contained Implementation Prompts** (< 5 Phases).  
> **Usage:** Feed each prompt one-by-one into an AI coding assistant or use them as step-by-step developer implementation briefs.

---

## 🗺️ Phase Roadmap Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Foundation, Particle Canvas Engine & Screens 1-2              │
│ - Design System & CSS Variables                                        │
│ - Particle Canvas (Petals, Confetti & Sparkles)                        │
│ - Screen 1: Welcome Hero ("A Gift is Waiting")                         │
│ - Screen 2: Interactive Wax-Sealed Envelope ("A Birthday Surprise")   │
│ - State Machine Router & Transitions                                   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 2: Interactive Cake & Music Player (Screens 3-4)                 │
│ - Screen 3: 3-Tier Cake, 3 Candle Ignitions & Cake Cutting Animation   │
│ - Screen 4: Frosted Card, Friendship Note & Interactive Audio Player   │
│ - Audio state management & audio scrubber bar                          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 3: Polaroid Carousel & Interactive Bouquet (Screens 5-6)         │
│ - Screen 5: Realistic Polaroid Memory Carousel (Prev/Next, Washi Tape) │
│ - Screen 6: 3D Flower Bouquet Cards with Unfolding Wishes & Modal      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 4: Grand Stationery Letter, Restart Loop & Audio/FX Engine       │
│ - Screen 7: Lined Parchment Letter with Custom Sign-off                │
│ - "START AGAIN" State Reset Loop                                       │
│ - Centralized config.js Customization Layer                            │
│ - Web Audio Sound FX (Wax Crack, Candle Match, Celebration Chimes)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 PROMPT 1: Foundation, Particle Canvas & Screens 1-2
*(Copy & paste the block below to execute Phase 1)*

```markdown
### 🎯 ROLE & TASK
You are an expert Frontend Creative Developer. Your task is to build **Phase 1** of a high-end, aesthetic, and heartwarming birthday surprise web application based on the reference design.

In Phase 1, you will implement:
1. Core project architecture (`index.html`, `style.css`, `script.js`, `config.js`).
2. Global Design System, CSS tokens, and background atmospheric canvas (pastel mesh gradient + drifting sakura petals & confetti sparkles).
3. Smooth Page Navigation / State Router (Single-page app with seamless cross-fades).
4. **Screen 1:** Welcome & Landing Hero ("A Gift is Waiting").
5. **Screen 2:** The Sealed Love Envelope with interactive 3D wax seal and envelope opening animation.

---

### 🎨 DESIGN TOKENS & TYPOGRAPHY
Implement these CSS variables in `style.css`:
- `--bg-gradient`: Multi-stop pastel mesh `linear-gradient(135deg, #FFE5D9 0%, #E8DFF5 35%, #FCE1E4 70%, #FCF6BD 100%)`.
- `--primary-pink`: `#FF758C`; `--primary-rose`: `#FF7EB3`; `--accent-crimson`: `#D94E67`.
- `--text-heading`: `#3D2645` (Deep Plum); `--text-body`: `#6C5868` (Warm Dusty Mauve); `--text-sub`: `#83677B`.
- `--card-bg`: `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(16px)` and `border: 1px solid rgba(255, 255, 255, 0.6)`.
- `--card-shadow`: `0 20px 45px rgba(220, 150, 180, 0.18)`.
- Fonts:
  - Import Google Fonts: `Playfair Display` (serif titles), `Outfit` (clean UI sans), and `Caveat` (warm handwriting).

---

### 🌸 BACKGROUND CANVAS PARTICLES (`script.js` + `<canvas>`)
Create a persistent, full-screen background `<canvas id="bg-canvas">`:
- Renders continuously at 60fps.
- Spawns 35-50 subtle, non-intrusive floating elements:
  1. Soft circular pastel confetti dots (blush pink, peach, lilac).
  2. Drifting 5-petal flower/sakura shapes that slowly rotate and drift downward.
  3. Delicate 4-pointed golden/white twinkling sparkles.
- Resizes gracefully on window resize.

---

### 🖥️ SCREEN 1: Welcome & Landing ("A Gift is Waiting")
* **Pill Badge:** Glassmorphic white capsule `💌 A GIFT IS WAITING` with uppercase letter-spaced font.
* **Heading:** `Happy Birthday` (Large editorial serif, font-size: ~2.8rem - 3.4rem).
* **Subtitle:** `someone made you something ♡` (Italic, gentle mauve).
* **Mascot Animation:** An animated cute bouncy chibi piglet/creature illustration with blushing cheeks, floppy ears, and a gentle floating bob animation.
* **CTA Button:**
  - Label: `🎁 OPEN YOUR GIFT`
  - Pill shape, pink glow gradient (`linear-gradient(135deg, #FF758C, #FF7EB3)`), soft pulse animation.
  - Hover: Scale up to `1.05`, subtle glow increase.
  - On-click: Triggers a joyful confetti burst, fades out Screen 1, and transitions into Screen 2.

---

### 💌 SCREEN 2: The Sealed Surprise Envelope ("A Birthday Surprise")
* **Pill Badge:** `💌 A BIRTHDAY SURPRISE`
* **Heading:** `a little something for you` (Lowercase serif).
* **Subtitle:** `happy birthday ♡`
* **Companion Mascot:** Cute kitty/bunny sitting above the envelope with floating animated hearts rising up.
* **The Envelope:**
  - Realistic cream-colored envelope body (`#FFFDF9`) with delicate drop shadow.
  - Triangular envelope flap overlay.
  - **3D Wax Seal:** Deep berry-pink circular wax medallion (`#D94E67`) embossed with an inner heart motif and golden rim reflection.
  - Flashing prompt underneath: `TAP THE SEAL TO OPEN ✦` with a subtle floating bounce.
* **Wax Seal Interaction:**
  - On-click:
    1. Wax seal breaks/pops with mini sparkle burst particles.
    2. Envelope flap unfolds smoothly via CSS 3D transform (`transform: rotateX(180deg)`).
    3. Triggers a screen transition callback to Screen 3 (with placeholder screen for Phase 2).

---

### ⚙️ CODE ARCHITECTURE & CONFIG
1. Create `config.js` with:
   ```javascript
   window.SURPRISE_CONFIG = {
     friendName: "Bestie",
     birthdayDate: "29th",
     defaultSong: "assets/birthday_song.mp3"
   };
   ```
2. Build clean, modular code without external UI frameworks. Ensure full mobile and desktop responsiveness.
```

---

## 📋 PROMPT 2: Interactive Cake & Music Player (Screens 3 & 4)
*(Copy & paste the block below to execute Phase 2)*

```markdown
### 🎯 ROLE & TASK
You are an expert Frontend Creative Developer. Your task is to implement **Phase 2** of the Birthday Surprise website, connecting directly after Phase 1's envelope opening.

In Phase 2, you will implement:
1. **Screen 3:** Interactive Birthday Cake with 3 individual candle ignitions, dynamic prompt text, and cake-cutting split animation ("Light the Candles" -> "Wish Made").
2. **Screen 4:** Heartfelt Birthday Card with an embedded, fully interactive Mini Music Player ("A Little Birthday Wish").
3. Seamless state transitions connecting Screen 2 -> Screen 3 -> Screen 4.

---

### 🎂 SCREEN 3: Interactive Birthday Cake ("Light the Candles")
* **Container & Header:**
  - Top Pill Badge: `🎂 MAKE A WISH`
  - Title: `light the candles` (Soft serif)
* **The 3-Tier Birthday Cake:**
  - Illustrated CSS/SVG cake with 3 pastel tiers:
    - Bottom tier: Soft lavender frosting with decorative drips.
    - Middle tier: Strawberry pastel pink with creamy drip accents.
    - Top tier: Whipped cream ivory with frosting dollops.
  - 3 candy-striped candle sticks standing on top.
  - Initial State: All 3 candle wicks are unlit.
* **Candle Ignition Controls:**
  - 3 pill buttons in a horizontal row below the cake: `[ CANDLE 1 ]`, `[ CANDLE 2 ]`, `[ CANDLE 3 ]`.
  - Helper status below: `tap each candle to light it up` with 3 progress dot indicators.
* **Interactivity Logic:**
  1. Clicking any candle button:
     - Spawns an animated, glowing, flickering flame above the selected candle wick.
     - Changes that button's text to `✦ LIT` with an active glowing pink gradient.
  2. Once all 3 candles are lit:
     - The helper text dynamically pulses with excitement: `now tap the cake to cut it! 🎂`.
     - Cake receives a gentle pulse/bounce animation inviting a click.
  3. Clicking the cake:
     - Cake triggers a slice cutting animation: the cake splits down the vertical center line, moving slightly outward to left and right.
     - A celebration burst of confetti particles fires.
     - Title transitions to: `wish made ♡`.
     - Subtitle updates to: `may every single one of them come true this year.`
     - After a 2-second pause, it automatically and smoothly transitions to Screen 4.

---

### 🎶 SCREEN 4: Birthday Message & Mini Music Player ("A Little Birthday Wish")
* **Card Container:**
  - Elegant frosted glass card (`border-radius: 32px`, `backdrop-filter: blur(20px)`).
  - Floating avatar badge at top-right: circular roundel with the cute mascot waving hello.
  - Corner floral decals in delicate pastel accents.
* **Pill Badge:** `✨ A LITTLE BIRTHDAY WISH ✨`
* **Heading:** `Happy Birthday` (Serif typography).
* **Heartfelt Message Paragraph:**
  > *"Today is yours. A whole little garden of wishes — for every laugh we've shared, every silly moment, and every reason you make the world brighter. Pause for a beat, and let me say it properly."*
* **Interactive Mini Music Player Component:**
  - Card-in-card styling with a subtle rounded border.
  - Left: Cute album artwork thumbnail (pastel floral motif with vinyl disc effect).
  - Track Info:
    - Title: `A song for your day`
    - Artist: `WITH LOVE`
  - Playback Controls:
    - Circular pink Play / Pause button (toggles icon between ▶ and ❚❚).
    - Audio Progress Bar: Clickable and draggable seek bar with filled progress track.
    - Time Display: Current time (`0:00`) and total duration counter (`0:45` or dynamic).
    - Connects to HTML5 `<audio>` element (using a cheerful birthday audio track).
  - Footnote below player:
    `press play — i picked this one because it always reminds me of you.`
* **CTA Button:**
  - Label: `SEE OUR ALBUM ➔`
  - On-click: Triggers transition to Screen 5 (Polaroid Album).

---

### ⚙️ ACCEPTANCE CRITERIA
- Candles must light individually in any order.
- Cake cutting must only be possible after all 3 candles are lit.
- Music player must handle real play/pause events, update time live, and support scrubbing.
- Fully responsive on mobile (cards fit within 100vw without horizontal overflow).
```

---

## 📋 PROMPT 3: Polaroid Memory Album & Interactive Bouquet (Screens 5 & 6)
*(Copy & paste the block below to execute Phase 3)*

```markdown
### 🎯 ROLE & TASK
You are an expert Frontend Creative Developer. Your task is to implement **Phase 3** of the Birthday Surprise website, connecting directly after Screen 4.

In Phase 3, you will implement:
1. **Screen 5:** The Realistic Polaroid Photo Memory Carousel ("Our Little Album").
2. **Screen 6:** The Interactive 3-Card Flower Bouquet with unfolding secret birthday wishes and modal pop-up ("A Tiny Bouquet of Birthday Wishes").
3. Smooth navigation routing connecting Screen 4 -> Screen 5 -> Screen 6.

---

### 📸 SCREEN 5: Polaroid Memory Album ("Our Little Album")
* **Header Block:**
  - Title: `our little album` (Serif heading).
  - Subtitle: `a few of my favourite moments with you ♡`
* **Realistic Polaroid Frame Component:**
  - White glossy photo paper card with realistic drop shadow (`box-shadow: 0 15px 35px rgba(0,0,0,0.12)`).
  - Decorative washi tape piece across the top border (semi-transparent peach/striped texture).
  - Subtle playful tilt (`transform: rotate(-1.5deg)` with smooth hover leveling).
* **Carousel Content & Data Model:**
  Store memories in an array configurable via `config.js`:
  - **Memory 1:**
    - Image: Cute birthday hamster holding cake with candle (or custom photo).
    - Tag: `MEMORY 01 / 03`
    - Caption: *"the way you smile in every photo — i hope you know it lights up the room."*
  - **Memory 2:**
    - Image: Adorable cartoon friends celebrating with birthday cake.
    - Tag: `MEMORY 02 / 03`
    - Caption: *"ordinary days with you have always been my favourite ones."*
  - **Memory 3:**
    - Image: Joyful animated celebratory doodle dancing with confetti.
    - Tag: `MEMORY 03 / 03`
    - Caption: *"thank you for showing up — for everything, every time."*
* **Carousel Controls:**
  - Circular pastel navigation buttons: Left (`‹`) and Right (`›`) positioned beside the Polaroid card.
  - Card transition: Smooth slide and 3D flip-fade when switching photos.
  - Memory counter updates dynamically.
* **CTA Button:**
  - Label: `PICK A WISH ➔`
  - Transitions smoothly to Screen 6.

---

### 💐 SCREEN 6: Interactive Bouquet ("A Tiny Bouquet of Birthday Wishes")
* **Header Block:**
  - Title: `a tiny bouquet of birthday wishes`
  - Subtitle: `pick each flower — there's a little wish inside ♡`
* **Bouquet & Vase Layout:**
  - 3 upright standing cards arranged side-by-side.
  - A soft frosted pastel vase illustration positioned at the bottom, visually holding the stems of the 3 cards.
* **3 Interactive Flower Cards:**
  1. **Flower 1 (Dahlia / Pink Blossom):**
     - Front: Geometric floral icon + button `PICK ME`.
     - Click Action: Card flips with 3D animation (`rotateY(180deg)`) or smoothly unfolds downward to reveal:
       - Header: `✦ THE WAY YOU LAUGH`
       - Message: *"your laugh is one of those sounds that just makes a room feel warmer. wishing you a year full of the kind of moments that bring it out again and again."*
  2. **Flower 2 (Daisy / Peach Blossom):**
     - Front: Peach blossom icon + button `PICK ME`.
     - Revealed Note:
       - Header: `✦ THE WAY YOU SHOW UP`
       - Message: *"you remember the small things — the worry from a Tuesday, the random text on a hard day. it always feels like being seen, not just heard. wishing you the same softness back this year."*
  3. **Flower 3 (Aster / Lavender Blossom):**
     - Front: Lavender aster icon + button `PICK ME`.
     - Revealed Note:
       - Header: `✦ THE YEAR AHEAD`
       - Message: *"may this year be kinder than the last. may every new chapter bring you good food, better naps, and people who love you the way you deserve."*
* **Completion Modal Pop-up:**
  - Track state: Once all 3 flowers have been revealed (`pickedCount === 3`):
    - After 1.2 seconds, a frosted celebration modal card smoothly slides up over the bouquet:
      - Mascot Header: Circular badge with two sleepy cuddled kitties/puppies with heart icon.
      - Heading: `happy birthday ♡`
      - Warm Friendship Preview:
        > *"thank you for being you — for the patience, the late-night talks, the silly inside jokes. i hope today feels as gentle and special as you've always made my days feel."*
      - Button: `READ MY LETTER ➔`
      - On-click: Advances to Screen 7.

---

### ⚙️ ACCEPTANCE CRITERIA
- Polaroid cards must switch smoothly without jarring layout shifts.
- All 3 flower cards must be interactive independently.
- The completion modal must trigger only after all 3 cards have been opened.
```

---

## 📋 PROMPT 4: Grand Stationery Letter, Restart Loop & FX Engine (Screen 7 + Polish)
*(Copy & paste the block below to execute Phase 4)*

```markdown
### 🎯 ROLE & TASK
You are an expert Frontend Creative Developer. Your task is to implement **Phase 4 (Final Phase)** of the Birthday Surprise website, bringing the entire experience to completion.

In Phase 4, you will implement:
1. **Screen 7:** The Grand Stationery Friendship Letter ("Dearest Birthday Human").
2. The `START AGAIN` state reset loop to allow reliving the surprise infinitely.
3. Centralized `config.js` with full customization support (friend's name, custom photos, custom song, custom wishes).
4. Web Audio / Sound FX engine (interactive clicks, seal crack, candle strike, celebration chime).
5. Comprehensive mobile responsiveness and final visual polish.

---

### 📜 SCREEN 7: The Grand Stationery Letter ("Dearest Birthday Human")
* **Stationery Paper Container:**
  - Realistic lined notepad paper styling (`#FFFDF7` ivory parchment texture).
  - Delicate horizontal faint ruled lines mimicking a real personal diary or letter sheet.
  - Corner washi tape pins and paper shadow.
  - Mascot Emblem: Cute chibi mascot medallion at the top center.
* **Top Pill Badge:** `✦ A LETTER, JUST FOR YOU ✦`
* **Salutation:** `Dearest birthday human,` (Warm, personal serif).
* **Verbatim Letter Paragraphs:**
  - **Paragraph 1:**
    > *"there's no card big enough for everything i'd like to say, so i made you a little garden — with a song, our pictures, and a few of my favourite wishes for the year ahead."*
  - **Paragraph 2:**
    > *"thank you for the small and unseen things — the way you check in, the jokes only we get, the quiet patience when i'm being too much. i noticed. i still notice."*
  - **Paragraph 3:**
    > *"i hope today you feel celebrated. i hope you eat something delicious that you didn't have to make, and someone tells you you're loved (you are). most of all, i hope this year ahead feels — for one whole trip around the sun — exactly the way you've always made me feel: completely, completely loved."*
* **Decorative Sign-off:**
  - Dotted divider with a mini heart emblem.
  - Sign-off:
    `♡ with all my love,`  
    `— YOUR FRIEND`
* **Loop / Restart Action:**
  - Button: `✨ START AGAIN`
  - Pill button with glowing rose gradient.
  - On-click:
    1. Smoothly resets all application states:
       - Candles unlit (`lit = false`).
       - Cake reunited (removes cut slice split).
       - Audio paused and reset to `0:00`.
       - Polaroid carousel reset to index 0.
       - Flower cards closed (`revealed = false`).
       - Modal hidden.
    2. Cross-fades back to Screen 1 ("A Gift is Waiting").

---

### 🔊 SOUND FX & AUDIO ENGINE
Implement gentle, pleasant sound effects (synthesized via Web Audio API oscillators or audio assets):
1. **Button Pop:** Soft, bubbly acoustic click on buttons.
2. **Wax Seal Crack:** Crisp paper/crack sound on opening the envelope.
3. **Candle Strike:** Soft match ignite sound when lighting each candle.
4. **Cake Slice Chime:** Sparkle chime / party horn when cake is cut.

---

### ⚙️ CENTRALIZED CONFIGURATION (`config.js`)
Ensure all personal data can be customized in one place:
```javascript
window.SURPRISE_CONFIG = {
  friendName: "Bestie",
  birthdayDate: "October 29th",
  music: {
    title: "A song for your day",
    artist: "WITH LOVE",
    url: "assets/birthday_song.mp3"
  },
  memories: [
    { image: "assets/memory1.jpg", caption: "the way you smile in every photo..." },
    { image: "assets/memory2.jpg", caption: "ordinary days with you have always been my favourite ones." },
    { image: "assets/memory3.jpg", caption: "thank you for showing up — for everything, every time." }
  ],
  letter: {
    recipient: "Dearest birthday human,",
    paragraphs: [ /* ... */ ],
    signOff: "YOUR FRIEND"
  }
};
```

---

### 🏁 FINAL ACCEPTANCE CHECKLIST
- Complete seamless flow from Screen 1 -> Screen 7 without page reloads.
- "START AGAIN" button resets all states cleanly.
- Perfectly responsive across mobile phones (iPhone/Android) and large desktop monitors.
- Background canvas particle loop runs smoothly at 60fps with zero memory leaks.
```
