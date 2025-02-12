import os
from fastapi import FastAPI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.memory import ConversationBufferMemory
from langchain.agents import initialize_agent, Tool

# Load API Key
os.environ["GOOGLE_API_KEY"] = ""

# Initialize FastAPI App
app = FastAPI()

# Set up AI model & memory
llm = ChatGoogleGenerativeAI(model="gemini-pro")
memory = ConversationBufferMemory(memory_key="chat_history")

# Define tools (e.g., web search)
def fetch_latest_cutoff(query: str):
    return f"Fetching latest cutoff details for {query}..."

tools = [Tool(name="Cutoff Search", func=fetch_latest_cutoff, description="Fetch latest cutoff scores")]

# Initialize AI Agent
agent = initialize_agent(tools=tools, llm=llm, agent="zero-shot-react-description", memory=memory, verbose=True)

@app.get("/ask")
def ask_question(query: str):
    response = agent.run(query)
    return {"response": response}

# Run with: uvicorn gemini_agent:app --reload
