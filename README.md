# 🗳️ ElectED — Civic Education Platform

ElectED is a specialized civic-tech web application designed to clarify, demystify, and educate citizens about the election process. Built as a prototype for **Google's Virtual PromptWars**, the application enforces a strict, trustworthy "editorial/newspaper" aesthetic and avoids generic AI-generated templates.

Currently configured to default to **India (IN) Electoral pathways**, the architecture natively supports instant localized switching for the US, UK, and EU.

---

## ✨ Core Features

*   📰 **Editorial Design System**: A meticulously curated Tailwind setup using high-contrast bounds (`Navy`, `Ivory`, `Red`, `Gold`) paired with explicit typography (*Playfair Display* and *DM Sans*) to invoke the trust of a traditional newspaper.
*   ⏳ **Dynamic Interactive Timeline**: A vertical zigzag layout tracking 12 chronological phases of the democratic process, complete with robust localized definitions.
*   🧠 **"Test Your Civic IQ"**: A fully gamified 10-question evaluation engine powered by Framer Motion micro-interactions, complete with a countdown timer, streak tracker, and global leaderboard architecture.
*   🤖 **"Ask ElectED" Q&A AI**: An integrated sliding sidebar that hooks directly into the **Google Gemini 1.5 Flash API**, strictly anchored via system prompting to exclusively answer civic-related queries.
*   📍 **Live Polling Locator**: Instant mock geographical mapping wired for the **Google Maps Embed API**.
*   ✅ **Eligibility Checker**: A conditional logic wizard guiding citizens through localized eligibility clauses.
*   🌍 **Instant Translations**: Seamless integration with the **Google Translate Widget** providing instant multilingual accessibility across the entire platform.

---

## 🛠️ Technology Stack

*   **Frontend**: React 18 (Vite), React Router v6
*   **Styling**: Tailwind CSS (v3 fallback configuration), Framer Motion (Animations), Lucide React (Iconography)
*   **Google Services**: `@google/generative-ai` SDK, Google Maps Embed API, Google Translate Scripts
*   **Backend Prep**: Firebase (Auth, Firestore, Realtime Database configurations ready)

---

## 🚀 Getting Started (Local Development)

### 1. Installation
Clone the repository and install dependencies using npm:
```bash
cd promptwar-challenge-2
npm install
```

### 2. Environment Variables
The application contains native hooks for all Google SDKs. Copy the template and fill in your API keys (optional, but required for live AI/Map data).

```bash
cp .env.template .env
```

To enable full functionality, populate:
*   `VITE_GEMINI_API_KEY`: Generates live AI answers in the Ask ElectED side panel.
*   `VITE_GOOGLE_MAPS_API_KEY`: Activates the live embed iframe in the Polling Locator.
*   `VITE_FIREBASE_*`: Activates your real-time leaderboard logic.

### 3. Run the Application
Boot up the fast Vite development server:
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

---

## 📁 Project Structure Highlights
```text
src/
├── components/
│   ├── AskElectED/    # Gemini AI integration components
│   ├── Nav/           # Global routing & Translate integration 
│   ├── Quiz/          # Segregated scalable Quiz Engine & Leaderboard
│   └── Timeline/      # Vertical zigzag scroll components
├── data/              # Localization files (timeline, glossary, quiz)
├── pages/             # Distinct routable screen layouts
├── firebase/          # App initialization hooks
└── index.css          # Core CSS variables and Tailwind imports
```

---

*Built with ❤️ by Arghajit*
