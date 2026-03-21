// 📦 Import ChatOllama from langchain/ollama
import { ChatOllama } from "@langchain/ollama"
import { configDotenv } from "dotenv";
// 🌱 Load environment variables
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
  model: "deepseek-v3.1:671b",
})