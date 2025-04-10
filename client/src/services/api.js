import axios from 'axios';

const API_URI = 'http://localhost:5000/api';

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/upload`, data);

        // Safely check if response.data has a path
        if (response.data && response.data.path) {
            return response.data; // ✅ All good
        } else {
            console.error('❌ Upload succeeded but no path returned:', response.data);
            return { path: null };
        }
    } catch (error) {
        console.log('❌ Error while calling the API:', error.message);
        return { path: null }; // So the frontend doesn’t crash
    }
};
