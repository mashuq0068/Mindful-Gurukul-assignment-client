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

    // loading data of user details
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
        
        <div className="flex justify-center  items-center h-screen bg-gradient-to-r from-[#3490dc] to-[#6574cd]">
            <div className="w-[90%] md:w-auto space-y-5 mx-auto p-8 bg-white rounded-md md:drop-shadow-2xl md:shadow-2xl ">
                <p><span className=" text-gray-600 font-bold">Name</span> :  {data?.userName}
                </p>
                <p><span className=" text-gray-600 font-bold"> Email </span>: {data?.email}</p>
                <p><span className=" text-gray-600 font-bold"> Phone </span> : {data?.phone} </p>
                <Link to={`/edit/${params.id}`} className="btn bg-[#e944d3] hover:bg-[#be31ac] flex items-center gap-2 mt-4 px-6 py-2 rounded-md text-white">
                    <span>Edit</span>
                    <FaRegEdit />
                </Link>
            </div>
        </div>

    )

};

export default Details;