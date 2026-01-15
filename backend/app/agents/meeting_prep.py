from app.services.google_service import google_service
from app.services.llm_service import llm_service

class MeetingPrepAgent:
    async def prepare_day(self):
        # 1. Fetch Events
        events = await google_service.fetch_calendar_events()
        
        # 2. Fetch Context (Emails) for these events
        event_ids = [e['id'] for e in events]
        emails_map = await google_service.fetch_related_emails(event_ids)
        
        # 3. Generate Briefs
        briefs = []
        for event in events:
            related_emails = emails_map.get(event['id'], [])
            
            # AI Processing
            ai_insight = await llm_service.generate_brief(event, related_emails)
            
            briefs.append({
                "id": event['id'],
                "title": event['summary'],
                "time": "10:00 AM", # Mock time formatting for now
                "goal": ai_insight.get('goal'),
                "talking_points": ai_insight.get('talking_points', []),
                "attendees": [a['email'].split('@')[0] for a in event.get('attendees', [])]
            })
            
        return briefs

meeting_agent = MeetingPrepAgent()
