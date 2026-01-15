# Brody

<div align="center">

**Your Proactive Productivity Assistant**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 18+](https://img.shields.io/badge/node-18+-green.svg)](https://nodejs.org/)

Brody helps you regain control of your day by unifying your schedule, anticipating your needs, and handling the prep work for you.

[Features](#features) • [Getting Started](#getting-started) • [Documentation](#documentation) • [Contributing](#contributing) • [License](#license)

</div>

---

## 🚀 Features

- **Proactive Meeting Preparation**: Automatically generates meeting briefs with context, key decisions, and supporting documents
- **Cross-Platform Integration**: Unifies Gmail, Google Calendar, and Microsoft To-Do in one place
- **AI-Powered Summaries**: Uses advanced LLM technology to create actionable daily summaries
- **Smart Task Prioritization**: Intelligently organizes your tasks based on deadlines and importance
- **Draft Communications**: Generates draft emails and agendas for your meetings
- **Multi-Agent Architecture**: LangGraph-powered orchestration for seamless AI-to-AI coordination

## 🎯 Why Brody?

Modern productivity tools are reactive and siloed. Brody is different:

- **Proactive, not reactive**: Anticipates your needs before you ask
- **Unified experience**: One dashboard for all your productivity tools
- **AI-to-AI coordination**: Agents work together seamlessly
- **Time-saving**: Reclaim 3-7 hours per week by eliminating context-switching

## 🏗️ Architecture

```
brody/
├── backend/          # FastAPI + LangGraph orchestration
│   ├── app/
│   │   ├── agents/   # AI agent implementations
│   │   ├── api/      # REST API endpoints
│   │   ├── core/     # Core business logic
│   │   └── services/ # External service integrations
│   └── requirements.txt
├── frontend/         # React + Vite + Tailwind CSS
│   └── src/
│       ├── pages/    # Application pages
│       └── components/
└── _archive/         # Legacy prototype code
```

## 🚦 Getting Started

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- Google API key (for AI features)

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

Start the backend server:

```bash
uvicorn app.main:app --reload --port 8000
```

API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access the dashboard at [http://localhost:5173](http://localhost:5173)

### Quick Start

1. Open the frontend dashboard at [http://localhost:5173](http://localhost:5173)
2. Click **"Prepare My Day"**
3. View your AI-generated meeting briefs and daily summary

## 📖 Documentation

- [Brody Overview](Brody.md) - Detailed project vision and market analysis
- [MVP Roadmap](Brody_MVP.md) - Current development focus
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute to the project
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🛡️ Security

If you discover a security vulnerability, please email [prajyothnani123@gmail.com](mailto:prajyothnani123@gmail.com) instead of using the issue tracker.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **G Prajyoth (Eminence)** - Founder & Technical Lead
- **B Sai Vishal** - Developer
- **S Neeraj** - Developer
- **G Nikhil** - Developer

## 🌟 Acknowledgments

- Built with [LangGraph](https://github.com/langchain-ai/langgraph) for multi-agent orchestration
- Powered by Google Gemini API
- UI built with React, Vite, and Tailwind CSS

## 📧 Contact

For questions, suggestions, or collaboration opportunities:

- Email: [prajyothnani123@gmail.com](mailto:prajyothnani123@gmail.com)
- Issues: [GitHub Issues](https://github.com/yourusername/brody/issues)

---

<div align="center">
Made with ❤️ by the Brody Team
</div>
