import axios from "axios"
import { tool } from "langchain"

export const allMovie = async () => {

    const movie = await axios.get("http://localhost:3000/movie")

    return JSON.stringify(movie.data)
    
}

// const result = await allMovie();

// console.log(result);

export const allMovieTool = tool(

    allMovie,
    {

        name:"get all movie",
        description:"get all movie"

    }

)

