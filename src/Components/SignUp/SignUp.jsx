

import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";


import { VscSaveAs } from "react-icons/vsc";

import { useContext, useState } from "react";
import Select from 'react-select';
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosDefault from "../../Hooks/UseAxiosDefault";



const SignUp = () => {
    const [selectedState, setSelectedState] = useState({ value: 'Gujarat', label: 'Gujarat' });
    const [checkBoxRequired , setCheckBoxRequired] = useState(false)
    const axiosDefault = UseAxiosDefault()

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
    };

    const {
        createUser,
       

    } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const phone = form.phone.value
      
        console.log(name, email, password, phone, selectedState)
        if (password.length < 6) {
            return toast.error(" password should be more than 6 characters")

        }
        else if (/^[^A-Z]*$/.test(password)) {
            return toast.error("Password must be have at least one capital letter")

        }
        else if (/^[^!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/.test(password)) {
            return toast.error("Special character must be included in password")

        }
        createUser(email, password)


            .then(data => {
                console.log(data)
               


                updateProfile(auth.currentUser, {
                    displayName: name,
                })
                    .then(() => {
                        console.log("profile updated")
                        const userInfo = {
                            userName : name,
                            phone : phone,
                            email : email,
                            creatorEmail :email

                        }
                        if(userInfo){
                        axiosDefault.post('/user' , userInfo)
                        .then(res => {
                            console.log(res.data)
                        })
                        }
                    })
                    .catch(errorData => {



                        console.error(errorData.code)
                    })






                navigate('/login')
                toast.success("You signed up successfully and your details has been saved")

            })
            .catch(error => {

                if (error.code === "auth/email-already-in-use") {
                    toast.error(error.code)
                    return;
                }

                console.error(error.code)
            })







    }
    return (
        <div className="relative">
            
            <div className="linear absolute w-[100%] top-[2%]  pb-[10%] ">

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{ className: " text-center" }}

                />
                <h1 className=" text-4xl text-gradient font-bold text-center mt-8 mb-12 ">Sign<span className=""> Up</span></h1>
                <div className="w-[90%]  lg:w-[45%] mx-auto">

                    <div className="hero w-full  bg-base-200">
                        <div className=" w-full flex-col ">

                            <div className=" flex-shrink-0 w-full  h-auto md:shadow-black md:shadow-lg bg-base-100">

                                <form onSubmit={handleSubmit} className="md:card-body w-full h-auto">
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
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text mb-3">Gender</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <input type="radio" name="gender" value="male" id="male" className="radio radio-primary" required/>
                                            <label htmlFor="male" className="2xl:text-[17px] text-[14px]">Male</label>

                                            <input type="radio" name="gender" value="female" id="female" className="radio radio-primary" required />
                                            <label htmlFor="female" className="2xl:text-[17px] text-[14px]">Female</label>

                                            <input type="radio" name="gender" value="others" id="others" className="radio radio-primary" required/>
                                            <label htmlFor="others" className="2xl:text-[17px] text-[14px]">Others</label>
                                        </div>
                                    </div>

                                    <div className="form-control mb-4 mt-4 checkbox-group required" >
                                        <label className="label">
                                            <span className="label-text mb-3">How did you hear about this?</span>
                                        </label>
                                        <div className="flex items-start flex-col  gap-4">
                                            <div className="flex justify-center items-center gap-1">
                                                <input type="checkbox" name="source[]" value="LinkedIn" id="linkedin" className="checkbox  checkbox-primary" />
                                                <label className=" 2xl:text-[17px] text-[14px]" htmlFor="linkedin">LinkedIn</label>
                                            </div>

                                            <div className="flex justify-center items-center gap-1">
                                                <input type="checkbox" name="source[]" value="Friends" id="friends" className="checkbox checkbox-primary"  />
                                                <label htmlFor="friends" className="2xl:text-[17px] text-[14px]">Friends</label>
                                            </div>

                                            <div className="flex justify-center items-center gap-1">
                                                <input type="checkbox" name="source[]" value="JobPortal" id="jobportal" className="checkbox checkbox-primary" />
                                                <label htmlFor="jobportal" className="2xl:text-[17px] text-[14px]" >Job Portal</label>
                                            </div>

                                            <div className="flex justify-center items-center gap-1">
                                                <input type="checkbox" name="source[]" value="Others" id="othersource" className="checkbox checkbox-primary" />
                                                <label htmlFor="othersource" className="2xl:text-[17px] text-[14px]">Others</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">City</span>
                                        </label>
                                        <select name="city" className="select 2xl:text-[17px] text-[14px] select-bordered">
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Pune">Pune</option>
                                            <option value="Ahmedabad">Ahmedabad</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-base">State</span>
                                        </label>
                                        <Select
                                            value={selectedState}
                                            onChange={handleStateChange}
                                            defaultValue={"Gujarat"}
                                            className=" 2xl:text-[17px] text-[14px]"
                                            options={[
                                                { value: 'Gujarat', label: 'Gujarat' },
                                                { value: 'Maharashtra', label: 'Maharashtra' },
                                                { value: 'Karnataka', label: 'Karnataka' },
                                            ]}
                                            name="state"
                                        />

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
