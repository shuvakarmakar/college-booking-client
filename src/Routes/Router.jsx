import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Colleges from "../Pages/Colleges/Colleges";
import Admission from "../Pages/Admission/Admission";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Error from "../Pages/Error/Error";
import Profile from "../Pages/Profile/Profile";
import MyCollege from "../Pages/MyCollege/MyCollege";
import CollegeDetails from "../Pages/Home/CollegeCards/CollegeDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            },
            {
                path: "colleges",
                element: <Colleges></Colleges>
            },
            {
                path: "admission",
                element: <Admission></Admission>
            },
            {
                path: "mycollege",
                element: <MyCollege></MyCollege>
            },
            {
                path: "profile",
                element: <Profile></Profile>
            },
            {
                path: "colleges/:collegeId",
                element: <CollegeDetails></CollegeDetails>,
                // loader: ({ params }) => fetch(`http://localhost:5000/collegeDetails/${params.id}`)
            }
        ]
    },
    {
        path: "*",
        element: <Error></Error>
    }
])