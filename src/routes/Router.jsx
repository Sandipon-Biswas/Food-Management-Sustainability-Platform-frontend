import {
    createBrowserRouter,

} from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "../privateRoute/PrivateRoute";
import InventoryPage from "../pages/InventoryPage";
import LogsPage from "../pages/LogsPage";
import ResourcesPage from "../pages/ResourcesPage";
import ProfilePage from "../pages/ProfilePage";
import UploadPage from "../pages/UploadPage";



const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "register",
                Component: RegisterPage
            },
            {
                path: "login",
                Component: LoginPage
            },
            {
                path: "dashboard",
                element: <PrivateRoute><DashboardPage /></PrivateRoute>
            },
            {
                path: "inventory",
                element: <PrivateRoute><InventoryPage/></PrivateRoute>
            },
            {
                path: "logs",
                element: <PrivateRoute><LogsPage/></PrivateRoute>
            },
            {
                path: "resources",
                element: <PrivateRoute><ResourcesPage/></PrivateRoute>
            },
            {
                path: "profile",
                element: <PrivateRoute><ProfilePage/></PrivateRoute>
            },
            {
                path: "upload",
                element: <PrivateRoute><UploadPage/></PrivateRoute>
            }


        ]
    }
])

export default router;