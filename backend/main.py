from fastapi import FastAPI
from fastapi.responses import JSONResponse

from connectors.todo_connector import fetch_todo_events
from connectors.gmail_connector import fetch_gmail_events
from connectors.file_connector import fetch_file_events

app = FastAPI()

@app.get("/prepare-day")
async def prepare_day():
    # Fetch events from all MCP connectors
    todo_events = await fetch_todo_events()
    gmail_events = await fetch_gmail_events()
    file_events = await fetch_file_events()

    digest = []
    
    digest.append({"ToDo": todo_events})
    digest.append({"Gmail": gmail_events})
    digest.append({"File": file_events})

    return JSONResponse(content={"digest": digest})
