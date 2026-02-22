# CommunityCare Network

A React app for connecting people with social services: client chat, resource directory, and case worker dashboard.

## Project structure

```
src/
├── components/       # UI components
│   ├── LoginScreen.jsx
│   ├── ProfileFormScreen.jsx
│   ├── ClientView.jsx      # Client layout (chat + resources)
│   ├── ChatView.jsx
│   ├── ResourceDirectory.jsx
│   ├── ResourceModal.jsx
│   ├── CaseWorkerLogin.jsx
│   └── CaseWorkerDashboard.jsx
├── data/             # Static data
│   ├── resources.js
│   └── analytics.js
├── services/         # API / business logic
│   └── chatService.js
├── utils/
│   └── getCategoryIcon.js
├── App.jsx
├── main.jsx
└── index.css
```

## Setup

```bash
npm install
npm run dev
```

## OpenAI API for chat

The AI chat uses OpenAI (e.g. `gpt-4o-mini`). Set your key in a `.env` file:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Without it, chat will show an error when the API is called.

## Build

```bash
npm run build
```
