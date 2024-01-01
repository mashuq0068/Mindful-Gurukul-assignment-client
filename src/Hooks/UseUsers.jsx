import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosDefault from "./UseAxiosDefault";


const UseUsers = () => {
       const axiosDefault = UseAxiosDefault()
     const {user , loading} = useContext(AuthContext)
    const { data:users , isPending , isLoading , refetch} = useQuery({
        queryKey:["users"],
        queryFn : async()=>{
            const response = await axiosDefault.get(`/users?email=${user?.email}`);
            return response.data

        },
        enabled:!loading
      
    })
    if( isPending){
        return(
            <span className="fixed top-[50vh] left-[45vw] loading loading-spinner text-secondary"></span>
        )
    }
    return {users , isPending , isLoading , refetch}
};

export default UseUsers;