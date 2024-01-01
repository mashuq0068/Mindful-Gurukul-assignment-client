import { useNavigate, useParams } from "react-router-dom";
import UseAxiosDefault from "../../Hooks/UseAxiosDefault";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { VscSaveAs } from "react-icons/vsc";
import Swal from "sweetalert2";
import moment from "moment";


const Edit = () => {
    const params = useParams()
    const axiosDefault = UseAxiosDefault()
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate()
   
    // loading single user details for form default value
    const { data, isPending, isLoading, refetch } = useQuery({
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
    // handle onSubmit edit form
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const mobile = form.mobile.value
        const email = form.email.value
        const userInfo = {
            userName: name,
            phone: mobile,
            email: email,
            creatorEmail: user?.email,
            insertedAt : data?.insertedAt,
            modifiedAt : moment().format('MMMM Do YYYY, h:mm:ss a')
        }
        if (userInfo) {
            axiosDefault.patch(`/user/${data?._id}`, userInfo)
                .then(res => {
                    console.log(res.data)
                    if (res?.data?.modifiedCount > 0) {
                        Swal.fire(
                            'Successful!',
                            'You have successfully updated the user',
                            'success'
                        )
                        navigate('/dashboard');

                    }
                })
        }

    }
    return (
        // main form div
        <div className="lg:w-[40vw] rounded-md md:drop-shadow-2xl md:shadow-2xl md:py-0 py-5 text-[10px]  md:px-0 px-5 bg-white mx-auto md:w-[70vw]  w-[90vw]">
            {/* form of edit */}
            <form onSubmit={handleSubmit} className="md:card-body lg:drop-shadow-xl  w-full h-auto">
                {/* name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">user name</span>
                    </label>
                    <input defaultValue={data?.userName} type="text" name="name" placeholder="user name" className="input  input-bordered" required />
                </div>
                {/* phone */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">mobile</span>
                    </label>
                    <input defaultValue={data?.phone} type="number" placeholder="mobile" name="mobile" className="input  input-bordered" required />
                </div>
                {/* email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">email</span>
                    </label>
                    <input defaultValue={data?.email} type="email" placeholder="email" name="email" className="input  input-bordered" required />

                </div>
                {/*  button div*/}
                <div className="flex flex-row-reverse justify-between items-center mt-[5vh]">
                     {/* edit button */}
                    <button className="btn hover:bg-[#af2b9e] bg-[#e944d3] text-white font-medium flex justify-center items-center gap-2">
                        <input type="submit" className="" value="Edit & Save" />
                        <VscSaveAs className="relative z-10"></VscSaveAs>
                    </button>
                    {/* cancel button */}
                    <button onClick={() => { navigate('/dashboard') }} className=" btn btn-ghost bg-gray-300">Cancel</button>
                </div>
            </form>
        </div>
        

    );
};

export default Edit;