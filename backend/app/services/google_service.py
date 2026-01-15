import asyncio
from typing import List, Dict

# Mock Data
MOCK_EVENTS = [
    {
        "id": "1",
        "summary": "Project Sync",
        "description": "Weekly sync to align on Q1 Roadmap.",
        "start": {"dateTime": "2024-10-25T10:00:00Z"},
        "end": {"dateTime": "2024-10-25T11:00:00Z"},
        "attendees": [{"email": "sarah@example.com"}, {"email": "mike@example.com"}]
    },
    {
        "id": "2",
        "summary": "Client Review",
        "description": "Finalize design artifacts for the new campaign.",
        "start": {"dateTime": "2024-10-25T14:00:00Z"},
        "end": {"dateTime": "2024-10-25T15:00:00Z"},
        "attendees": [{"email": "client@client.com"}, {"email": "design@agency.com"}]
    }
]

MOCK_EMAILS = {
    "1": [
        {"subject": "Re: Project Sync", "snippet": "I've attached the budget draft for approval."},
        {"subject": "Agenda", "snippet": "Let's discuss hiring timeline and API specs."}
    ],
    "2": [
        {"subject": "Design Feedback", "snippet": "Please show the Figma prototype."},
        {"subject": "Colors", "snippet": "We need sign-off on the neon palette."}
    ]
}

class GoogleService:
    async def fetch_calendar_events(self) -> List[Dict]:
        """Simulate fetching events from Google Calendar."""
        await asyncio.sleep(0.5) # Mock latency
        return MOCK_EVENTS

    async def fetch_related_emails(self, event_ids: List[str]) -> Dict[str, List[Dict]]:
        """Simulate fetching emails related to events."""
        await asyncio.sleep(0.5)
        # Return only emails that match mocked IDs
        return {eid: MOCK_EMAILS.get(eid, []) for eid in event_ids}

google_service = GoogleService()
