
import { Link } from "react-router-dom";


const Banner = () => {
 
   
  return (
    <div className="flex lg:px-12 drop-shadow-2xl mt-[10vh] mb-[20vh]  flex-col gap-12 items-center justify-between  text-black ">
      {/* Left Side (Image) */}
      <div   className="lg:w-1/2 md:px-14 px-2 lg:p-0 ">
        <img
          
          src="https://www.kaiostech.com/wp-content/uploads/Blog-200700-05-Key-Visual.png"
          alt="Banner Image"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side (Text) */}
      <div className="lg:w-1/2 md:w-[70vw] mx-auto w-[90%]  lg:pl-10 flex gap-4 flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl text-gradient font-bold text-center lg:text-3xl 2xl:text-4xl  mb-4 tracking-wider">
          Unlock the Potential of Our User Management System
        </h1>
        <p className="  text-center  text-gray-500 ">
        Seamlessly handle user information, streamline processes, and enhance efficiency in your workflow.
          Our platform is designed to make user management a breeze, so you can focus on what matters most.
        </p>
        <Link  to='/dashboard' className="text-red text-center mt-3 cursor-pointer hover:before:bg-redborder-red-500 relative w-[60%] md:w-[50%] py-3 overflow-hidden border  border-purple-500  rounded-xl flex justify-center items-center gap-2 font-semibold  bg-white  shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r from-[#e944d3] to-[#25baff]  before:transition-all before:duration-100 hover:text-black hover:border-none hover:before:left-0 hover:shadow-purple-500 hover:before:w-full ">
        <span
          className="relative z-10"
        >
          Go to Dashboard
        </span>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
