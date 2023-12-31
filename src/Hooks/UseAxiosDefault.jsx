import axios from "axios";

const axiosDefault = axios.create({
    baseURL : 'http://localhost:5000'
})

const UseAxiosDefault = () => {
    return (
        axiosDefault
    );
};

export default UseAxiosDefault;