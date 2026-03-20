// 📦 Import ChatOllama from langchain/ollama
import { ChatOllama } from "@langchain/ollama"
import { configDotenv } from "dotenv";
// 🌱 Load environment variables
import { config } from "dotenv"
configDotenv();

// 🤖 Initialize LLM with Ollama API
export const llm = new ChatOllama({
    // 🌐 Ollama API base URL
    baseUrl:"https://ollama.com",
    // 🔑 Authorization header
      headers: {
    Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
  },
    // 🧠 Custom model
  model: "kimi-k2-thinking",
})