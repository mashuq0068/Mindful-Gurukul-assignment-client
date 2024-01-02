
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoute = ({children}) => {
    
    const {user , loading} = useContext(AuthContext)
    const location = useLocation()
    if(user){
      return children
    }
    else if (loading){
  return (
    <span className="loading  fixed top-[50vh] left-[50vw] loading-spinner text-secondary"></span>
      );
    }
   return( 
    <Navigate state={location?.pathname} to='/signUp'></Navigate>
   

    )
    
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default PrivateRoute;