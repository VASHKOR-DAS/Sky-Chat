import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Chat from "../../pages/Chat/Chat";
import Home from "../../pages/Home/Home/Home";
import SearchFriendsDrawer from "../../components/miscellaneous/SearchFriendsDrawer";

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
            element: <Chat></Chat>
        },
        {
            path: "/drawer",
            element: <SearchFriendsDrawer></SearchFriendsDrawer>
        },
    ]
}]);