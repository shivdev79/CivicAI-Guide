const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Groq = require('groq-sdk');

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

// Load Knowledge Base
const kbPath = path.join(__dirname, 'data', 'electionKnowledge.json');
const kbData = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

// API Routes
app.get('/api/steps', (req, res) => {
  const { role } = req.query;
  let steps = kbData.steps;
  if (role) {
    steps = steps.filter(s => s.role.includes(role) || s.role.includes('student'));
  }
  res.json(steps);
});

app.get('/api/timeline', (req, res) => {
  res.json(kbData.timeline);
});

// Hybrid AI Chat with Groq Integration
app.post('/api/chat', async (req, res) => {
  const { message, context, userType, complexity, language } = req.body;

  // We provide the knowledge base and parameters to the LLM
  const systemPrompt = `You are the Election Intelligence Assistant. Your goal is to explain the election process.
You are talking to a ${userType}. The desired explanation complexity is ${complexity}. The user prefers the language: ${language || 'en'}.
Use the following knowledge base for factual accuracy. Do NOT hallucinate facts outside of this.
Knowledge Base: ${JSON.stringify(kbData)}

Respond ONLY in valid JSON format matching this structure:
{
  "answer": "Your detailed explanation here (in the requested language).",
  "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"],
  "steps": [], // Optionally include an array of step objects from the knowledge base if relevant
  "timeline": [] // Optionally include timeline objects from the knowledge base if relevant
}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...context.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })),
    { role: 'user', content: message }
  ];

  try {
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.1-8b-instant',
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({
      answer: "I'm currently experiencing technical difficulties connecting to my intelligence core.",
      steps: [],
      timeline: [],
      suggestions: ["Try again later"]
    });
  }
});

// Guide/Recommendations
app.post('/api/guide', (req, res) => {
  const { role, goal } = req.body;
  let steps = kbData.steps;
  
  if (role) {
    steps = steps.filter(s => s.role.includes(role) || s.role.includes('student'));
  }

  // If quick overview, return just titles/descriptions
  if (goal === 'quick') {
    steps = steps.map(s => ({ id: s.id, title: s.title, description: s.description }));
  }

  res.json({
    message: `Here is your guided path for a ${role} seeking a ${goal} overview.`,
    steps
  });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`EIA Backend running on port ${PORT}`);
});
