import { createAgent, HumanMessage, summarizationMiddleware, SystemMessage } from "langchain";
import { llm } from "../Config/llm.js";
import { searchMovieTool } from "./Tools/searchTool.js";
import { allMovieTool } from "./Tools/allMovie.js";
import { singleMovieTool } from "./Tools/singleMovieTool.js";
import { MemorySaver } from "@langchain/langgraph";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

const DB_URI = "postgresql://neondb_owner:npg_9EyHGVF0bdYK@ep-morning-fire-a1hjpqqp-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const checkpointer = PostgresSaver.fromConnString(DB_URI);

await checkpointer.setup()
// const checkpointer = new MemorySaver();

const movieAgent = createAgent({

    model:llm,
    tools:[searchMovieTool , allMovieTool , singleMovieTool],
     middleware: [
    summarizationMiddleware({
      model:llm,
      trigger: { tokens:500},
      keep: { messages: 3 },
    }),
  ],
    checkpointer,


})

    // const msg = [
    //     // new SystemMessage(`

    //     //     You are helpful movie Assistance
    //     //     Always use tool and give user answer
    //     //     Dont Generate by urslef , always use tool
    //     //     dont forget to answer user in last
            
    //     //     Tools:
    //     //     --search all movies using query (query=name,description,genre)
    //     //     --get all movies 
    //     //     --fetch single movie by matching id , if movie not found then try again
            
    //     //     `),

    //         new HumanMessage("my name is yash")
    // ]

// const result = await movieAgent.invoke(
//     {messages:[new HumanMessage("my name is yash")]},
//     {
//         configurable:{
//             thread_id:"1"
//         }
//     }
// )

// console.log(result);

// msg.push(new HumanMessage("what is my name?"))

// const result2 = await movieAgent.invoke(
//      {messages:msg},
//     {
//         configurable:{
//             thread_id:"1"
//         }
//     }

// )

// console.log(result2);

const result3 = await movieAgent.invoke(
    {
        messages:[new HumanMessage("hey my name is yash")]
    },
     {
        configurable:{
            thread_id:"0"
        }
    }

)

const r2 = await movieAgent.invoke(
    {
        messages:[new HumanMessage("now tell me ai vs ml")]
    },
     {
        configurable:{
            thread_id:"0"
        }
    }

)
    console.log("\n\n\n response after msg 2",r2);
    

const r3 = await movieAgent.invoke(
    {
        messages:[new HumanMessage("why to choose php over ts")]
    },
     {
        configurable:{
            thread_id:"0"
        }
    }

)

  console.log("\n\n\n response after msg 3",r3);

const r4 = await movieAgent.invoke(
    {
        messages:[new HumanMessage("i love ts , it provide best dx , great auto-complete, best packages , so why i should choose php?")]
    },
     {
        configurable:{
            thread_id:"0"
        }
    }

)

  console.log("\n\n\n response after msg 4",r4);


const r5 = await movieAgent.invoke(
    {
        messages:[new HumanMessage("now give final comparison bw php and ts and final whom to choose?")]
    },
     {
        configurable:{
            thread_id:"0"
        }
    }

)


  console.log("\n\n\n response after msg 5",r5);


