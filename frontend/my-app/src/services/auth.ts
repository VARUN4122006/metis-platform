import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUser = async (userData: any) => {
    const response = await axios.post(
        `${API}/register`,
        userData
    );

    return response.data;
};

export const loginUser = async (userData: any) => {
    const response = await axios.post(
        `${API}/login`,
        userData
    );

    return response.data;
};