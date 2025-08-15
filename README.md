# AI Persona Interaction Platform

Demo url: https://persona-chat-ai-p6gz.vercel.app/
![Main Screen](/screenshots/main_screen.png)

## 📌 Overview
This project is an **AI-powered multi-persona conversational platform** built with **Next.js** and **Google Gemini API**.  
It allows users to interact with AI agents that embody the tone, style, and expertise of real-life public figures — currently including **Piyush Garg** and **Hitesh Choudhary**.

The goal is to replicate **teaching style, expertise, and personality traits** using structured persona JSON files, enabling more engaging and relatable AI conversations.

---

## 🎯 Key Features
- **Multi-persona support** – Switch between different educator personas.
- **Next.js Frontend** – Fast, SEO-friendly, responsive web app.
- **Gemini AI Backend** – Realistic, tone-matched conversational responses.
- **Instruction Mode** – Adjust tone for tutorials vs. casual chats.
- **Reactive Patterns** – Predefined responses for compliments, thanks, and success stories.
- **Conversation Memory** – Retains tone and context during a session.
- **Auto-Scroll** – Always keeps latest messages in view.
- **Code Snippet Handling** – Detects and formats code responses.

---

## 🛠 Tech Stack
- **Frontend:** Next.js (React framework)
- **Backend:** Google Gemini API
- **Styling:** Tailwind CSS
- **State Management:** React hooks & context
- **Data Format:** Structured JSON persona profiles
- **Deployment:** Vercel / Any Node.js hosting

---

## 📂 Data Sources
All persona data is **collected only from publicly available sources**, such as:
1. YouTube videos & livestreams
2. Official websites
3. Social media posts (Instagram, LinkedIn, Twitter/X)
4. Public talks, interviews, and podcasts
5. GitHub public repositories

---

## ⚖️ Ethical & Privacy Disclaimer
- No private or confidential information is included.
- All tone, style, and response patterns are **derived from public material**.
- This project is for **educational and research purposes only**.
- The AI personas are **simulations**, not real individuals.

---

## 🚀 Usage
1. Clone the repo and install dependencies:
```bash
git clone <repo-url>
cd ai-persona-platform
npm install
```

2. Add your Gemini API key in .env:
```bash
GEMINI_API_KEY=your_api_key
```

3. Run the development server:
```bash
npm run dev
```

4. Access the app at http://localhost:3000

![Chat Window](/screenshots/chat_window.png)

⚠ **Disclaimer:**  
This project is for educational and demonstration purposes only.  
All persona information is collected **only from publicly available sources** and does **not** represent a real-time or private profile of the individual.  
The AI-generated responses may contain inaccuracies or outdated details.  
This is **not** an official representation of the real person.