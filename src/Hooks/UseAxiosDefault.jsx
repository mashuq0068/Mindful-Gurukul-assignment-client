import axios from "axios";

const axiosDefault = axios.create({
    baseURL : 'https://mindful-gurukul-assignment-server.vercel.app'
})

const UseAxiosDefault = () => {
    return (
        axiosDefault
    );
};

export default UseAxiosDefault;