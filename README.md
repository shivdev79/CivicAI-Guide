<div align="center">
  <h1>🧠🗳️ CivicAI Guide (Election Intelligence Assistant)</h1>
  <p><strong>A world-class, production-grade AI system that teaches election processes interactively.</strong></p>
</div>

<br />

## 🌟 Overview
CivicAI Guide is not just a basic chatbot. It is an **interactive, explainable, and adaptive learning system** that tutors users on the democratic process. Powered by real-time LLM inference via the **Groq API** and a robust Retrieval-Augmented Generation (RAG) architecture, it dynamically adjusts its explanations based on whether you are a Voter, Candidate, or Student.

## 🚀 Key Features

*   🎤 **Voice Integration (TTS)**: The AI talks back! Click the speaker icon on any AI response to hear the text spoken aloud using the native Web Speech API.
*   🗺️ **Interactive Election Map**: A fully custom, zero-dependency visual map grid. Click on any state to view its specific primary dates, registration deadlines, and early voting rules.
*   📝 **Interactive Mock Ballot**: Practice your voting skills! A highly realistic digital ballot that lets you cast mock votes across multiple races.
*   🏆 **Gamified Knowledge Checks**: After completing the learning modules, users can take a dynamic quiz. Pass it, and you're rewarded with a confetti celebration and a "Certified Informed Citizen" badge.
*   ⏳ **Live Countdown Clock**: Creates real-world urgency by tracking the exact time until the next major election right on the landing page.
*   ⚡ **Real-Time Groq AI Integration**: Replaces static logic with a lightning-fast `llama-3.1-8b-instant` model. It accurately answers complex queries strictly confined to the provided Knowledge Base to prevent hallucinations.
*   🌗 **Premium Glassmorphism UI**: Built with Tailwind CSS and Framer Motion for buttery-smooth animations, responsive layouts, and flawless Dark/Light mode toggling.

## 🏗️ Architecture & Tech Stack

**Frontend:**
*   **React 19 & Vite**
*   **Tailwind CSS v4** (Utility-first styling & Dark Mode)
*   **Framer Motion** (Advanced micro-animations)
*   **Zustand** (Global state & language management)

**Backend:**
*   **Node.js & Express**
*   **Groq SDK** (High-speed LLaMA 3.1 inference)
*   **RAG System** (Injects local JSON Knowledge Base context into the prompt)

**Deployment:**
*   Fully containerized using a multi-stage **Dockerfile**, serving the built frontend statically through the Express backend for a seamless **1-click Google Cloud Run deployment**.

## 🛠️ Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivdev79/CivicAI-Guide.git
   cd CivicAI-Guide
   ```

2. **Backend Configuration**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file inside the `backend` directory and add your Groq API Key:
   ```env
   GROQ_API_KEY=your_api_key_here
   PORT=5000
   ```

3. **Frontend Configuration**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the Application**
   Start the backend:
   ```bash
   cd backend
   npm start
   ```
   Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   Navigate to `http://localhost:5173` in your browser!

## ☁️ Deployment (Google Cloud Run)
This repository is pre-configured for a single-container deployment.
```bash
gcloud run deploy civic-ai-guide --source . --allow-unauthenticated
```
