import axios from "axios"

const geoapify_url = import.meta.env.VITE_Geoapify_URL 
const geoapify_api_key = import.meta.env.VITE_Geoapify_API_KEY


export const addressFetch = async (lat,lon) => {
    try {
        const res = await axios.get(`${geoapify_url}reverse?lat=${lat}&lon=${lon}&apiKey=${geoapify_api_key}`)
        return res
        
    } catch (error) {
        return error
    }
}