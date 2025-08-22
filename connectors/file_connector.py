from fastmcp import Client,FastMCP

client = Client(FastMCP("http://localhost:8055/mcp"))

async def fetch_file_events():
    async with client:
        # Basic server interaction
        await client.ping()
        tools = await client.list_tools()
        resources = await client.list_resources()
        prompts = await client.list_prompts()
        return tools + resources + prompts
