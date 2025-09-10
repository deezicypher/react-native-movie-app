import axios from 'axios';


const url = "http://192.168.126.239:3000/api/movies/";

export const fetchMovies = async ({query}:{query:string}) => {
    try {
        const fullUrl = query? `${url}?searchId=${query}` : url
        const response = await axios.get(fullUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies', error)
        throw error
    }
}