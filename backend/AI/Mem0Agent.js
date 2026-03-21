import { createAgent, HumanMessage, summarizationMiddleware } from "langchain";
import MemoryClient from 'mem0ai';
import { llm } from "../Config/llm.js";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

const DB_URI = "postgresql://neondb_owner:npg_9EyHGVF0bdYK@ep-morning-fire-a1hjpqqp-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const checkpointer = PostgresSaver.fromConnString(DB_URI);


await checkpointer.setup()

const client = new MemoryClient({ apiKey: "m0-D7czmnhhA00USoYTT9tfO5GaOK6PAxZzTexFVpcr" });

const Mem0Agent = createAgent({
    model:llm,
     middleware: [
        summarizationMiddleware({
          model:llm,
          trigger: { tokens:500},
          keep: { messages: 3 },
        }),
      ],
    checkpointer,
    
})

const query = " which diff i asked to you prev ";

const filters = {
OR: [
  { user_id: "yash11" }
]
};

const results = await client.search(query, {api_version: "v2", filters: filters})

// console.log(JSON.stringify(results));


const msg = [

  
    { role: "user", content:  `my memory is ${JSON.stringify(results)}` },
    { role: "user", content: query }
]

const agent = await Mem0Agent.invoke(

    {messages:msg},

    {
        configurable:{thread_id:"17"}
    }
)

console.log(agent);


await client.add(msg, { user_id: "yash11" });