import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL!,
    withCredentials: true, 
});



  

export const fetchMovies = async ({query}:{query:string}) => {
    try {
        const fullUrl = query? `?searchId=${query}` : ''
        const response = await instance.get(fullUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies', error)
        throw error
    }
}

export const updateSearchCount = async (query:string,movie:Movie) => {
        try {
             await instance.post('update-search-count', {query,...movie})
        } catch (error) {
            console.log(error)
        }
}

export const getTrendingMovies = async () => {
    try {
        const response = await instance.get('get-trending-movies')
  
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}