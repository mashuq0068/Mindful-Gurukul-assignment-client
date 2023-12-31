import { useNavigate, useParams } from "react-router-dom";
import UseAxiosDefault from "../../Hooks/UseAxiosDefault";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { VscSaveAs } from "react-icons/vsc";
import Swal from "sweetalert2";


const Edit = () => {
    const params = useParams()
    const axiosDefault = UseAxiosDefault()
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate()
   

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
            creatorEmail: user?.email
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
        <div className="lg:w-[40vw] mx-auto md:w-[70vw] mt-[10vh] w-[90vw]">
            <form onSubmit={handleSubmit} className="md:card-body lg:drop-shadow-xl md:shadow-lg md:shadow-black w-full h-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">User Name</span>
                    </label>
                    <input defaultValue={data?.userName} type="text" name="name" placeholder="User Name" className="input  input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">Mobile</span>
                    </label>
                    <input defaultValue={data?.phone} type="number" placeholder="Mobile" name="mobile" className="input  input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">Email</span>
                    </label>
                    <input defaultValue={data?.email} type="email" placeholder="Email" name="email" className="input  input-bordered" required />

                </div>
                <div className="flex flex-row-reverse justify-between items-center mt-[5vh]">

                    <button className="btn hover:bg-[#af2b9e] bg-[#e944d3] text-black font-medium flex justify-center items-center gap-2">
                        <input type="submit" className="" value="Edit & Save" />
                        <VscSaveAs className="relative z-10"></VscSaveAs>
                    </button>
                    <button onClick={() => { navigate('/dashboard') }} className=" btn btn-ghost bg-gray-300">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;