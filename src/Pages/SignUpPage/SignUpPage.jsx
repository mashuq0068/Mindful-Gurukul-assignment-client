

import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";


import { VscSaveAs } from "react-icons/vsc";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";


const SignUp = () => {
  const {
    createUser,
    userWithGoogle
     } = useContext(AuthContext)
  const navigate  = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target 
     const name = form.name.value
     const photoUrl = form.photoUrl.value
     const email = form.email.value
     const password = form.password.value
     console.log(name , photoUrl , email , password)
     if(password.length < 6) {
      return toast.error( " password should be more than 6 characters")
       
     }
     else if(/^[^A-Z]*$/.test(password)){
      return   toast.error("Password must be have at least one capital letter")
        
     }
     else if(/^[^!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/.test(password)){
      return   toast.error("Special character must be included in password")
        
     }
     createUser(email, password)
       
        
            .then(data => {
                console.log(data)
                if(password.length < 6) {
                  return toast.error( " password should be more than 6 characters")
                   
                 }
                 else if(/^[^A-Z]*$/.test(password)){
                  return   toast.error("Password must be have at least one capital letter")
                    
                 }
                 else if(/^[^!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/.test(password)){
                  return   toast.error("Special character must be included in password")
                    
                 }
             

                  updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoUrl
                })
                    .then(() => {
                        console.log("profile updated")
                    })
                    .catch(errorData => {
                       
                          
                       
                        console.error(errorData.code)
                    })
                 

                
              
                
                    
                 navigate('/signIn') 
                   
            })
            .catch(error => {
              
               if(error.code === "auth/email-already-in-use"){
                toast.error(error.code)
                return;
               }
               
                console.error(error.code)
            })
            

           
          }
          const handleGoogle = () => {
            userWithGoogle()
                .then(data => {
                    console.log(data)
                    navigate('/')
                })
                .catch(error => {
                    
                    console.error(error.code)
                })
    
     
  }
    return (
        <div className="relative">
            {/* <div className="">
           
            <img className="opacity-70 md:h-auto md:w-auto w-[100vw]  " src="https://static01.nyt.com/images/2018/03/22/style/22mealshare-1/00mealshare-1-superJumbo.jpg" alt="" />
            <div className="bg-black opacity-70 absolute top-0 left-0 w-[100vw] h-full"></div>
        </div> */}
        <div className="linear absolute w-[100%] top-[2%]  pb-[10%] ">
           
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{className:"2xl:text-2xl text-center"}}
                
            />
            <h1 className=" text-4xl text-gradient font-bold text-center mt-8 mb-12 ">Sign<span className=""> Up</span></h1>
            <div className="w-[80%]  lg:w-[35%] mx-auto">
           
            <div className="hero w-full  bg-base-200">
  <div className=" w-full flex-col ">
  
    <div className=" flex-shrink-0 w-full  h-auto shadow-2xl bg-base-100">
        
      <form onSubmit={handleSubmit} className="card-body w-full h-auto">
      <div className="form-control">
          <label className="label">
            <span className="label-text ">Name</span>
          </label>
          <input type="text" name="name" placeholder="Name" className="input  input-bordered" required />
        </div>
        
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
        <div className="form-control">
          <label className="label">
            <span className="label-text ">Phone</span>
          </label>
          <input type="number" placeholder="Phone Number" name="phone" className="input  input-bordered" required />
          
        </div>
        <div>
          <p className="text-black mt-3  text-center ">Already a user ? go for <Link to='/login' className="text-gradient font-bold ">login</Link></p>
        </div>
        <div className="form-control mt-6">
          <button className="text-red text-center mt-3 cursor-pointer hover:before:bg-redborder-red-500 relative w-full py-3 overflow-hidden border  border-purple-500  rounded-xl flex justify-center items-center gap-2 font-semibold  bg-white  shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r from-[#e944d3] to-[#25baff]  before:transition-all before:duration-100 hover:text-black hover:border-none hover:before:left-0 hover:shadow-purple-500 hover:before:w-full ">
               <input type="submit" className="relative z-10" value="Save" />
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

export default SignUp;
