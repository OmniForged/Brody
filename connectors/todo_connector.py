from fastmcp import Client,FastMCP

client = Client(FastMCP("http://localhost:5004/mcp"))

async def fetch_todo_events():
    async with client:
        # Basic server interaction
        await client.ping() 
        tools = await client.list_tools()
        resources = await client.list_resources()
        prompts = await client.list_prompts()
        return tools + resources + prompts
