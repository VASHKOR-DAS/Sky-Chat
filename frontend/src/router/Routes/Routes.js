import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Chat from "../../pages/Chat/Chat";
import Home from "../../pages/Home/Home/Home";
import App from "../../App";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([{
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/chats",
            element: <PrivateRoute><Chat></Chat></PrivateRoute>
        },
        {
            path: "/app",
            element: <App></App>
        },
    ]
}]);