# Contributing to Brody

First off, thank you for considering contributing to Brody! It's people like you that make Brody such a great tool for productivity.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [prajyothnani123@gmail.com](mailto:prajyothnani123@gmail.com).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots or animated GIFs** if relevant
- **Include your environment details** (OS, Python version, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most Brody users
- **List any similar features** in other applications if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Issues that are good for newcomers
- `help wanted` - Issues that need assistance
- `documentation` - Documentation improvements

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing style guidelines
5. Write a clear commit message
6. Update documentation as needed

## Development Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- Git

### Backend Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/brody.git
cd brody/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your API keys

# Run the development server
uvicorn app.main:app --reload --port 8000
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## Pull Request Process

1. **Update Documentation**: Ensure any new features or changes are documented
2. **Update the README**: If you change functionality, update the README.md
3. **Follow the Style Guide**: Make sure your code adheres to our style guidelines
4. **Write Clear Commit Messages**: Use the present tense ("Add feature" not "Added feature")
5. **Reference Issues**: Link to any relevant issues in your PR description
6. **Wait for Review**: A maintainer will review your PR and may request changes

### Commit Message Guidelines

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

Example:
```
Add meeting preparation agent

- Implement LangGraph workflow for meeting prep
- Add integration with Google Calendar API
- Create unit tests for agent logic

Fixes #123
```

## Style Guidelines

### Python Style Guide

- Follow [PEP 8](https://pep8.org/) style guide
- Use type hints where appropriate
- Write docstrings for all public functions and classes
- Maximum line length: 100 characters
- Use meaningful variable names

Example:
```python
def prepare_meeting_brief(meeting_id: str, context: dict) -> dict:
    """
    Generate a comprehensive meeting brief.
    
    Args:
        meeting_id: Unique identifier for the meeting
        context: Dictionary containing meeting context
        
    Returns:
        Dictionary containing the prepared brief
    """
    # Implementation here
    pass
```

### TypeScript/JavaScript Style Guide

- Use TypeScript for all new frontend code
- Follow the existing ESLint configuration
- Use functional components with hooks
- Write meaningful component and variable names
- Add JSDoc comments for complex functions

Example:
```typescript
/**
 * Fetches and displays the daily meeting briefs
 */
const MeetingBriefs: React.FC = () => {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  
  // Implementation here
  
  return (
    <div className="meeting-briefs">
      {/* Component JSX */}
    </div>
  );
};
```

### Git Branch Naming

- `feature/` - New features (e.g., `feature/add-slack-integration`)
- `fix/` - Bug fixes (e.g., `fix/calendar-sync-error`)
- `docs/` - Documentation changes (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/agent-architecture`)
- `test/` - Adding or updating tests (e.g., `test/meeting-agent`)

## Project Structure

```
brody/
├── backend/
│   ├── app/
│   │   ├── agents/       # AI agent implementations
│   │   ├── api/          # FastAPI routes
│   │   ├── core/         # Core business logic
│   │   ├── services/     # External service integrations
│   │   └── main.py       # Application entry point
│   ├── tests/            # Backend tests
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utility functions
│   └── package.json
└── docs/                 # Additional documentation
```

## Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- **Integration Development**: Add support for new productivity tools (Slack, Notion, Trello)
- **Agent Improvements**: Enhance AI agent capabilities and accuracy
- **Testing**: Increase test coverage for both backend and frontend
- **Documentation**: Improve setup guides, API documentation, and user guides

### Medium Priority
- **UI/UX Enhancements**: Improve the dashboard design and user experience
- **Performance Optimization**: Speed improvements for API responses and frontend rendering
- **Mobile Support**: Make the frontend responsive for mobile devices
- **Accessibility**: Improve WCAG compliance

### Nice to Have
- **Internationalization**: Add support for multiple languages
- **Dark Mode**: Implement a dark theme option
- **Browser Extension**: Create a browser extension for quick access
- **Desktop App**: Package as an Electron app

## Getting Help

If you need help with your contribution:

- Check the [existing documentation](README.md)
- Look through [closed issues](https://github.com/yourusername/brody/issues?q=is%3Aissue+is%3Aclosed)
- Ask questions in [GitHub Discussions](https://github.com/yourusername/brody/discussions)
- Reach out to the maintainers at [prajyothnani123@gmail.com](mailto:prajyothnani123@gmail.com)

## Recognition

Contributors will be recognized in our README.md file and release notes. We appreciate every contribution, no matter how small!

## License

By contributing to Brody, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Brody! 🚀
