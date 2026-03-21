import axios from "axios"
import { tool } from "langchain";
import {z} from "zod"

export const singleMovie = async ({id}) => {

    const movie = await axios.get(`http://localhost:3000/movie/${id}`)

    return JSON.stringify(movie.data)
    
}

const result = await singleMovie({"id":"69bd406d5279ad05e733f9fb"});
// console.log(result);

export const singleMovieTool = tool(

    singleMovie,

    {

        name:"fetch single movie",
        description:"fetch single movie by id",
        schema:z.object({

            id:z.string().describe("id of movie")
        }
        )
    }

)
