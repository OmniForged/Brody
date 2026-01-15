from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings

class LLMService:
    def __init__(self):
        self.api_key = settings.GOOGLE_API_KEY
        self.model = None
        if self.api_key:
            self.model = ChatGoogleGenerativeAI(
                model="gemini-pro",
                google_api_key=self.api_key,
                temperature=0.3
            )

    async def generate_brief(self, event: dict, emails: list) -> dict:
        """
        Generate a structured brief for a meeting using Gemini.
        """
        if not self.model:
            return self._mock_generation(event)

        prompt = f"""
        You are an executive assistant. Prepare a brief for the following meeting:
        
        Title: {event.get('summary')}
        Description: {event.get('description')}
        Attendees: {[a.get('email') for a in event.get('attendees', [])]}
        
        Related Emails Context:
        {emails}
        
        Output JSON with keys: "goal", "talking_points" (list of strings).
        Do not output Markdown formatting, just raw JSON.
        """
        
        try:
            response = await self.model.ainvoke(prompt)
            # Simple parsing (in production use OutputParsers)
            return self._parse_response(response.content)
        except Exception as e:
            print(f"LLM Error: {e}")
            return self._mock_generation(event)

    def _mock_generation(self, event):
        """Fallback if no API key or error."""
        return {
            "goal": f"Execute on {event.get('summary')}",
            "talking_points": ["Discuss key deliverables", "Review timeline", "Assign action items"]
        }

    def _parse_response(self, content: str) -> dict:
        # Very basic cleanup json parser
        import json
        import re
        try:
            # Strip markdown code blocks
            clean = re.sub(r'```json\n|\n```', '', content)
            return json.loads(clean)
        except:
            return {
                "goal": "Could not parse AI response",
                "talking_points": [content[:100] + "..."]
            }

llm_service = LLMService()
