

import axios from "axios";
import Swal from "sweetalert2";
import 'animate.css/animate.min.css'; 

const axiosDefault = axios.create({
    baseURL: "https://mindful-gurukul-assignment-server.vercel.app",
    
});

// Adding a request interceptor
axiosDefault.interceptors.request.use(
    (config) => {
        //  modifying the request config here if needed
       
        return config;
    },
    (error) => {
        // Doing something with the request error
        return Promise.reject(error);
    }
);

// Adding a response interceptor
axiosDefault.interceptors.response.use(
    (response) => {
        //  modifying the response data here if needed
        return response;
    },
    (error) => {
        // Checking if it's a network error
        if (!error.response) {
           
            Swal.fire({
                title: "The Internet?",
                text: "May be you lost your network connection?",
                icon: "question",
            showClass: {
                    popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
                },
                hideClass: {
                    popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
                }
            });
            // Handle the network error here (e.g., show an internet error message)
        } else {
            // Handle other types of errors
            console.error("Error:", error);
        }
        return Promise.reject(error);
    }
);

const UseAxiosDefault = () => {
    return axiosDefault;
};

export default UseAxiosDefault;
