import PropTypes from 'prop-types';

import { NavLink, useNavigate } from 'react-router-dom';


import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

// import { useState } from 'react';




// const navItems = ['home', 'about', 'contact'];

const Navbar = () => {
  // home an dbiodatas should be handle reload
  const {user , logOutUser} = useContext(AuthContext)
  const navigate = useNavigate()
  // const [bgColor , setBgColor] = React.useState("transparent")
  
  const handleLogOut = () => {
    logOutUser()
    .then(res => {
      if(res)
      {
      toast.success("You has been logged out")
      }
    })
    .catch(error => {
      console.error(error.message)
    })}

  const links = 
  
  <>
   <ul className='flex lg:gap-[15%] gap-[4vh] lg:flex-row flex-col  uppercase font-semibold'>
   <NavLink  to={'/'}>Home</NavLink>
   <NavLink to={'/dashboard'}>Dashboard</NavLink>
   <NavLink to={'/contact'}>Faq</NavLink>
 { user?  <button onClick={handleLogOut} className='uppercase lg:-ml-0 -ml-28  md:-ml-18'>Logout</button> : 
 <NavLink to='/login' className='uppercase lg:-ml-0 -ml-28 md:-ml-18 '>Login</NavLink>
 }
       
  
   </ul>
  
  </>
 
  
  
   
    
      
  
   
  
    return (
      <>  
        <div className="navbar sticky top-0 mb-[5vh]  backdrop-blur-3xl  z-50  bg-transparent">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm rounded-md shadow-xl dropdown-content mt-3 z-[1] p-2 pl-[7vw] md:pl-[4vw] pt-[4vh] bg-base-100  h-[40vh] w-52">
        <div>
        {links}
        </div>
    
      </ul>
    </div>
   <div className='flex justify-center items-center gap-3 '>
   <img className='w-[16%]'
        src="https://multichannelworks.com/wp-content/uploads/2015/10/users.png"
        alt=""
        
      />
          <p className=' 2xl:text-2xl text-xl md:w-auto w-[50vw] font-bold text-gradient '>User Hub</p>
   </div>
  </div>
  <div className=" hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
   <div>
   {links}
   </div>
    
    </ul>
  </div>
  <div className="navbar-end">
  
  </div>
</div>
       
       </>
    
   ) }
   Navbar.propTypes = {
   
    window: PropTypes.func,
  };
        


export default Navbar;