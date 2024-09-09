import { useContext } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosDefault from "../../Hooks/UseAxiosDefault";
import Swal from "sweetalert2";
import moment from "moment";


const AddUser = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const axiosDefault = UseAxiosDefault()
    // handle onSubmit of add user
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
            creatorEmail : user?.email,
            insertedAt : moment().format('MMMM Do YYYY, h:mm:ss a'),
            
        }
        if(userInfo) {
          // save user to server
            axiosDefault.post('/user', userInfo)
              .then(res => {
                if (res?.data?.insertedId) {
                  // if successful showing modal
                  Swal.fire(
                    'Successful!',
                    'You have successfully added the user',
                    'success'
                  )
                  .then(result => {
                    // if modal confirmed navigate to dashboard
                    if (result.isConfirmed) {
                      navigate('/dashboard');
                    }
                  });
                }
              })
              // handle error to save user in server
              .catch(error => {
                console.error('Error:', error);
              });
          }
    }
    return (
      // main div
        <div className="lg:w-[40vw] md:px-0 px-5 md:py-0 py-5 rounded-md md:drop-shadow-2xl md:shadow-2xl bg-white mx-auto md:w-[70vw]  w-[90vw]">
          {/* form of add user */}
             <form onSubmit={handleSubmit}  className="md:card-body lg:drop-shadow-xl  w-full h-auto">
                                    {/* name */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text ">user name</span>
                                        </label>
                                        <input type="text" name="name" placeholder="user name" className="input  input-bordered" required />
                                    </div>
                                   {/* mobile */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text ">mobile</span>
                                        </label>
                                        <input type="number" placeholder="mobile" name="mobile" className="input  input-bordered" required />
                                    </div>
                                    {/* email */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text ">email</span>
                                        </label>
                                        <input type="email" placeholder="email" name="email" className="input  input-bordered" required />

                                    </div>
                                    {/* button div */}
                                    <div className="flex flex-row-reverse justify-between items-center mt-[5vh]">
                                        {/* save button */}
                                        <button className="btn hover:bg-[#af2b9e] bg-[#e944d3] text-white font-medium flex justify-center items-center gap-2">
                                        <input type="submit" className="" value="Save" />
                                        <VscSaveAs className="relative z-10"></VscSaveAs>
                                        </button>
                                        {/* cancel button */}
                                        <button onClick={()=>{navigate('/dashboard')}} className=" btn btn-ghost bg-gray-300">Cancel</button>
                                    </div>
                                    </form>
        </div>
    );
};

export default AddUser;