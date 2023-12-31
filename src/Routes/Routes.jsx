import { createBrowserRouter } from "react-router-dom";
import MainRoot from "../Roots/MainRoot";
import HomePage from "../Pages/HomePage/HomePage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import AddUserPage from "../Pages/AddUserPage/AddUserPage";
import PrivateRoute from "./PrivateRoute";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import EditPage from "../Pages/EditPage/EditPage";

const Router = createBrowserRouter([
    {
     path:'/',
     element : <MainRoot></MainRoot>,
     children : [
        {
            path : '/',
            element:<HomePage></HomePage>
        },
        {
            path : '/signUp',
            element : <SignUpPage></SignUpPage>
        },
        {
            path : '/login',
            element : <LoginPage></LoginPage>
        },
        {
            path:'/dashboard',
            element:<PrivateRoute><DashboardPage></DashboardPage></PrivateRoute>
        },
        {
            path:'/addUser' , 
            element:<AddUserPage></AddUserPage>
        },
        {
            path:'/details/:id',
            element:<DetailsPage></DetailsPage>
        },
        {
            path:'/edit/:id',
            element:<EditPage></EditPage>
        }
     ]
    }
])
export default Router