from fastapi import APIRouter, HTTPException
from app.agents.meeting_prep import meeting_agent

api_router = APIRouter()

@api_router.post("/prepare-day")
async def prepare_day():
    """
    Triggers the 'Prepare My Day' agent workflow.
    """
    try:
        results = await meeting_agent.prepare_day()
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
