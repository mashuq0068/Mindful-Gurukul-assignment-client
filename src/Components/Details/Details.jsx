import { Link, useParams } from "react-router-dom";
import UseAxiosDefault from "../../Hooks/UseAxiosDefault";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaRegEdit } from "react-icons/fa"



const Details = () => {
    const params = useParams()
    console.log(params?.id)
    const axiosDefault = UseAxiosDefault()
    const { loading } = useContext(AuthContext)
    

    const { data, isPending, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await axiosDefault.get(`/user/${params?.id}`);
            return response.data

        },
        enabled: !loading

    })
    if (isPending || isLoading) {

        return <span className="loading fixed left-[50vw] top-[50vh] loading-spinner text-secondary"></span>

    }

    return (
        <div className=" flex justify-center md:w-auto w-[90%] mx-auto items-center h-screen">
            <div className=" space-y-5 drop-shadow-xl shadow-lg px-4 md:px-12 py-8 shadow-black">
                <p><span className=" text-gray-600 font-bold">Name</span> :  {data?.userName}</p>
                <p><span className=" text-gray-600 font-bold"> Email </span>: {data?.email}</p>
                <p><span className=" text-gray-600 font-bold"> Phone </span> : {data?.phone} </p>
                <Link to={`/edit/${params.id}`} className="btn bg-[#e944d3] hover:bg-[#be31ac]">Edit <FaRegEdit /></Link>
            </div>
        </div>
    )

};

export default Details;