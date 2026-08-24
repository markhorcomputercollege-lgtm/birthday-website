# 🌸 Happy Birthday, Ainy — a dreamy birthday website

A cinematic, luxury birthday celebration site made for **Ainy's birthday on 27 August 2026**.

It's plain **HTML + CSS + JavaScript** — no build tools, no npm install, no frameworks.
That means you can open it, understand it, and deploy it with almost no web-dev experience.

## ✨ What's inside

- A glowing entry gate ("Open my celebration")
- A cinematic night-sky hero with a live countdown to 27 Aug 2026
- A letter section
- An interactive birthday cake — click the candles (or use your mic!) to blow them out and reveal a wish
- A photo memory gallery (add your own photos)
- A wishing wall where visitors can leave notes (saved in their browser)
- A confetti finale

## 📁 Project structure

```
ainy-birthday/
├── index.html          ← all the page content
├── styles.css           ← all the visual design
├── script.js             ← all the interactivity
├── assets/
│   ├── photos/           ← put Ainy's photos here (see below)
│   └── music.mp3         ← optional background music (see below)
└── README.md
```

## 🖼️ How to add real photos

1. Find/export 6 photos you want to show in the gallery.
2. Rename them exactly: `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`, `photo-4.jpg`, `photo-5.jpg`, `photo-6.jpg`
   (`.png` works too — just also update the file extension inside `index.html` in the `<img src="...">` tags).
3. Drop them inside the `assets/photos/` folder, replacing nothing (the folder is empty until you add files).
4. Save, refresh the page — done.

> Tip: square or portrait photos look best. Keep each file under ~2MB so the page loads fast.

## 🎵 How to add background music (optional)

1. Get an MP3 you have rights to use (a royalty-free birthday/lofi track works great).
2. Rename it to `music.mp3`.
3. Put it inside the `assets/` folder (same level as `music.mp3` referenced in `index.html`).
4. That's it — the little speaker icon top-right lets visitors mute/unmute.

If you skip this step, the site still works perfectly — the mute button will just have nothing to play.

## 🗓️ Changing the birthday date/time

Open `script.js` and edit this line near the top:

```js
const BIRTHDAY_ISO = "2026-08-27T00:00:00";
```

## 💻 How to run it on your own computer (no install needed)

**Easiest way:** just double-click `index.html` — it opens in your browser. Everything works except the mic-blow feature (browsers block microphone access on files opened directly).

**Better way (so the mic feature works too):**
1. Install [VS Code](https://code.visualstudio.com/) (free).
2. Open this folder in VS Code.
3. Install the "Live Server" extension.
4. Right-click `index.html` → "Open with Live Server".

## 🚀 How to put this on GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Click the **+** icon (top right) → **New repository**.
3. Name it something like `ainy-birthday`, keep it **Public** or **Private**, don't add a README (you already have one), then click **Create repository**.
4. On the new repo page, click **uploading an existing file**.
5. Drag the entire contents of this `ainy-birthday` folder into the browser window (make sure `assets/` comes along with it).
6. Scroll down, click **Commit changes**.

*(If you're comfortable with a terminal instead, the usual commands work too: `git init`, `git add .`, `git commit -m "first commit"`, `git remote add origin <your-repo-url>`, `git push -u origin main`.)*

## ▲ How to deploy on Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign up/log in with your GitHub account.
2. Click **Add New... → Project**.
3. Select the `ainy-birthday` repository you just created (you may need to click "Import").
4. Vercel will detect it as a static site — you don't need to change any settings (no build command, no output directory needed).
5. Click **Deploy**.
6. In about 30–60 seconds you'll get a live link like `ainy-birthday.vercel.app` — share it with Ainy! 🎉

Every time you upload new changes to GitHub, Vercel automatically redeploys the site — no extra steps.

## 🎨 Customizing colors/fonts

All design values (colors, fonts) are defined once at the top of `styles.css` under `:root { ... }`, so you can change the whole palette by editing a handful of lines there.

## 🧡 Credits

Design & build: made with care for Ainy's birthday, 27 August 2026.
Fonts used: Cormorant Garamond, Alex Brush, Manrope (Google Fonts, free for personal & commercial use).
