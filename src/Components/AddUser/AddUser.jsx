import { useContext } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosDefault from "../../Hooks/UseAxiosDefault";
import Swal from "sweetalert2";


const AddUser = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const axiosDefault = UseAxiosDefault()
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target 
        const name = form.name.value
        const mobile = form.mobile.value 
        const email = form.email.value 
        const userInfo = {
            userName : name,
            phone : mobile,
            email : email,
            creatorEmail : user?.email
        }
        if(userInfo) {
            axiosDefault.post('/user', userInfo)
              .then(res => {
                if (res?.data?.insertedId) {
                  Swal.fire(
                    'Successful!',
                    'You have successfully added the user',
                    'success'
                  )
                  .then(result => {
                    if (result.isConfirmed) {
                      navigate('/dashboard');
                    }
                  });
                }
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }
    }
    return (
        <div className="lg:w-[40vw] mx-auto md:w-[70vw] mt-[10vh] w-[90vw]">
             <form onSubmit={handleSubmit}  className="md:card-body lg:drop-shadow-xl md:shadow-lg md:shadow-black w-full h-auto">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text ">User Name</span>
                                        </label>
                                        <input type="text" name="name" placeholder="User Name" className="input  input-bordered" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text ">Mobile</span>
                                        </label>
                                        <input type="number" placeholder="Mobile" name="mobile" className="input  input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text ">Email</span>
                                        </label>
                                        <input type="email" placeholder="Email" name="email" className="input  input-bordered" required />

                                    </div>
                                    <div className="flex flex-row-reverse justify-between items-center mt-[5vh]">
                                        
                                        <button className="btn hover:bg-[#af2b9e] bg-[#e944d3] text-black font-medium flex justify-center items-center gap-2">
                                        <input type="submit" className="" value="Save" />
                                        <VscSaveAs className="relative z-10"></VscSaveAs>
                                        </button>
                                        <button onClick={()=>{navigate('/dashboard')}} className=" btn btn-ghost bg-gray-300">Cancel</button>
                                    </div>
                                    </form>
        </div>
    );
};

export default AddUser;