import axios from "axios"
import { tool } from "langchain"
import z from "zod"

export const searchMovie = async ({query}) => {

    const movie = await axios.get(`http://localhost:3000/movie/search?q=${query}`)

    // console.log(movie.data.movies);
    return JSON.stringify(movie.data)

}

// await searchMovie({"query":"shadow"})
// const allmovie2 = await allMovie();

// console.log(allmovie2
    
// );


 export const searchMovieTool = tool(

    searchMovie,

    {
        name:"search movie",
        description:"search movie by name description and genre",
        schema:z.object({
            query:z.string().describe("query for movie")
        })
    }
 )



