import { createBrowserRouter } from "react-router-dom";
import MainRoot from "../Roots/MainRoot";
import HomePage from "../Pages/HomePage/HomePage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import LoginPage from "../Pages/LoginPage/LoginPage";

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
        }
     ]
    }
])
export default Router