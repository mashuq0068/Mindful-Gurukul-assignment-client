

import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";


import { VscSaveAs } from "react-icons/vsc";

import { useContext } from "react";

import { AuthContext } from "../../Providers/AuthProvider";



const Login = () => {
    
  const {
    loginUser,
   
     } = useContext(AuthContext)
  const navigate  = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target 
    
     const email = form.email.value
     const password = form.password.value
    console.log( email , password )
    if(email && password){
        loginUser(email , password)
        .then(res => {
            console.log(res)
            if(res){
               navigate(location?.state ? location?.state : '/')
               
            }
        })
        .catch(error => {
            console.error(error.message)
           toast.error("Your email or password may be invalid")
        })
    }
           
          
          
    
     
  }
    return (
        <div className="relative">
        <div className="linear absolute w-[100%] top-[2%]  pb-[10%] ">
           
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{className:" text-center"}}
                
            />
            <h1 className=" text-4xl text-gradient font-bold text-center mt-8 mb-12 ">Login</h1>
            <div className="w-[90%]  lg:w-[45%] mx-auto">
           
            <div className="hero w-full  bg-base-200">
  <div className=" w-full  ">
  
    <div className=" flex-shrink-0 w-full  h-auto md:shadow-black md:shadow-lg bg-base-100">
        
      <form onSubmit={handleSubmit} className="md:card-body lg:w-full h-auto">
      
        
        <div className="form-control">
          <label className="label">
            <span className="label-text ">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input  input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text ">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input  input-bordered" required />
          
        </div>
        

        <div>
          <p className="text-black mt-3  text-center ">New here ? go for <Link to='/signUp' className="text-gradient font-bold ">Sign Up</Link></p>
        </div>
        <div className="form-control mt-6">
          <button className="text-red text-center mt-3 cursor-pointer hover:before:bg-redborder-red-500 relative w-full py-3 overflow-hidden border  border-purple-500  rounded-xl flex justify-center items-center gap-2 font-semibold  bg-white  shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r from-[#e944d3] to-[#25baff]  before:transition-all before:duration-100 hover:text-black hover:border-none hover:before:left-0 hover:shadow-purple-500 hover:before:w-full ">
               <input type="submit" className="relative z-10" value="Login" />
               <VscSaveAs className="relative z-10"></VscSaveAs>
            </button>
        </div>
      
       
      </form>
    </div>
  </div>
</div>
            </div>
        </div>
        </div>
    );
};

export default Login;
