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
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AboutPage from "../Pages/AboutPage/AboutPage";
import OpenAi from "../Pages/OpenAi/OpenAi";

const Router = createBrowserRouter([
    // main (root)
    {
     path:'/',
     element : <MainRoot></MainRoot>,
     errorElement : <ErrorPage></ErrorPage>,
    //  children
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
        },
        {
            path:'/about',
            element:<AboutPage></AboutPage>
        },
        {
            path:'/open-ai',
            element:<OpenAi></OpenAi>
        }
     ]
    }
])
export default Router