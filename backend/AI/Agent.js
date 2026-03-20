import { createAgent, HumanMessage, SystemMessage } from "langchain";
import { llm } from "../Config/llm.js";
import { searchMovieTool } from "./Tools/allmovieTool.js";

const movieAgent = createAgent({

    model:llm,
    tool:[searchMovieTool]


})

    const msg = [
        new SystemMessage(`

            You are helpful movie Assistance
            Always use tool and give user answer
            Dont Generate by urslef , always use tool
            dont forget to answer user in last
            
            Tools:
            --search all movies using query (query=name,description,genre)
            
            `),

            new HumanMessage("search movie by name Shadow ")
    ]

const result = await movieAgent.invoke({
    messages:msg
})

console.log(result);
