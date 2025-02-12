import os
from fastapi import FastAPI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.memory import ConversationBufferMemory
from langchain.agents import initialize_agent, Tool
import requests
from dotenv import load_dotenv

load_dotenv()

# Load API Key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

# Initialize FastAPI App
app = FastAPI()

# Set up AI model & memory
llm = ChatGoogleGenerativeAI(model="gemini-pro")
memory = ConversationBufferMemory(memory_key="chat_history")

# Function to fetch latest cutoff details
def fetch_latest_cutoff(query: str):
    return f"Fetching latest cutoff details for {query}..."

# Function to search the web dynamically (Example using Google Search API)
def web_search(query: str):
    search_url = f"https://api.searchengine.com/search?q={query}"
    response = requests.get(search_url)
    return response.json() if response.status_code == 200 else "No results found."

# Dynamic Tool Selection Logic
def decide_tool(query: str):
    keywords = ["cutoff", "latest", "admission", "fee", "trending", "updates"]
    
    if any(word in query.lower() for word in keywords):
        return fetch_latest_cutoff(query)  # Fetch real-time data
    else:
        return llm.invoke(query)  # Use Gemini AI for general queries

tools=[
        Tool(name="Cutoff Search", func=fetch_latest_cutoff, description="Fetch latest cutoff scores"),
        Tool(name="Web Search", func=web_search, description="Search the web for live data")
    ]

# Initialize AI Agent
agent = initialize_agent(
    tools=tools,
    llm=llm,    
    agent="zero-shot-react-description",
    memory=memory,
    verbose=True
)

@app.get("/ask")
def ask_question(query: str):
    response = decide_tool(query)  # Let AI decide the best action
    return {"response": response}

# Run with: uvicorn gemini_agent:app --reload
