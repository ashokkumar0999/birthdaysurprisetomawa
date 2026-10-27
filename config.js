// ═══════════════════════════════════════════════════════
// 🎂 Birthday Surprise — Centralized Configuration
// Change these values to personalize the surprise!
// ═══════════════════════════════════════════════════════

window.SURPRISE_CONFIG = {
  // ── Friend's Info ──
  friendName: "Lahari",
  birthdayDate: "October 29th",

  // ── Screen 1: Welcome ──
  welcome: {
    badge: "💌 A GIFT IS WAITING",
    title: "Happy Birthday Mawa",
    subtitle: "someone made you something ♡",
    buttonText: "OPEN YOUR GIFT"
  },

  // ── Screen 2: Envelope ──
  envelope: {
    badge: "💌 A BIRTHDAY SURPRISE",
    title: "a little something for you",
    subtitle: "happy birthday ♡",
    prompt: "TAP THE SEAL TO OPEN ✦"
  },

  // ── Screen 3: Cake ──
  cake: {
    badge: "🎂 MAKE A WISH",
    title: "light the candles",
    helperText: "tap each candle to light it up",
    cutPrompt: "now tap the cake to cut it! 🎂",
    wishTitle: "wish made ♡",
    wishSubtitle: "may every single one of them come true this year."
  },

  // ── Screen 4: Birthday Wish + Music ──
  wish: {
    badge: "✨ A LITTLE BIRTHDAY WISH ✨",
    title: "Happy Birthday Lahari",
    message: "Wishing you lots of happiness, endless smiles, and <span class=\"highlight-pink\">beautiful moments! 💗🌸</span> May your days always be filled with laughter, fun, and little reasons to smile.<br>Stay the same crazy, cute, and wonderful person you are! ✨",
    playerNote: "press play — i picked this one because it always reminds me of you.",
    buttonText: "SEE OUR ALBUM ➔"
  },

  // ── Music Player (Wish Page Dedicated Song) ──
  music: {
    title: "A song for your day",
    artist: "WITH LOVE",
    albumArt: "assets/album-cover.jpg",
    // Put your own mp3 in assets/ folder:
    url: "assets/ReelAudio-15234.mp3"
  },

  // ── Screen 5: Photo Album ──
  album: {
    badge: "📸 OUR LITTLE ALBUM",
    title: "our little album",
    subtitle: "a few of my favourite moments with you ♡",
    buttonText: "READ MY LETTER ➔",
    memories: [
      {
        image: "assets/memory1.jpg",
        tag: "MEMORY 01 / 08",
        caption: ""
      },
      {
        image: "assets/mascot-kitten.jpg",
        tag: "MEMORY 02 / 08",
        caption: ""
      },
      {
        image: "assets/memory3.jpg",
        tag: "MEMORY 03 / 08",
        caption: ""
      },
      {
        image: "assets/sleepy-kittens.jpg",
        tag: "MEMORY 04 / 08",
        caption: ""
      },
      {
        image: "assets/kitten-cloud.jpg",
        tag: "MEMORY 05 / 08",
        caption: ""
      },
      {
        image: "assets/memory2.jpg",
        tag: "MEMORY 06 / 08",
        caption: ""
      },
      {
        image: "assets/memory3.jpg",
        tag: "MEMORY 07 / 08",
        caption: ""
      },
      {
        image: "assets/album-cover.jpg",
        tag: "MEMORY 08 / 08",
        caption: ""
      }
    ]
  },

  // ── Screen 6: Letter ──
  letter: {
    badge: "✦ A LETTER, JUST FOR YOU ✦",
    recipient: "Dearest Lahari,",
    paragraphs: [
      "there's no card big enough for everything i'd like to say, so i made you a little garden — with a song, our pictures, and a few of my favourite wishes for the year ahead.",
      "thank you for the small and unseen things — the way you check in, the jokes only we get, the quiet patience when i'm being too much. i noticed. i still notice.",
      "i hope today you feel celebrated. i hope you eat something delicious that you didn't have to make, and someone tells you you're loved (you are). most of all, i hope this year ahead feels — for one whole trip around the sun — exactly the way you've always made me feel: completely, completely loved."
    ],
    signOff: "with all my love,",
    signature: "— YOUR FRIEND",
    restartButton: "REFRESH PAGE"
  },

  // ── Asset Paths ──
  assets: {
    mascotPiglet: "assets/bunnpink-removebg-preview.png",
    mascotKitten: "assets/kitten-cloud.jpg",
    sleepyKittens: "assets/sleepy-kittens.jpg"
  }
};
