import Create from "../pages/Create/Create"
import Discover from "../pages/Discover/Discover"
import Edit from "../pages/Edit/Edit"
import Error from "../pages/Error/Error"
import Frequently from "../pages/Frequently/Frequently"
import Home from "../pages/Home/Home"
import ProfilePage from "../pages/Profile/Profile"
import Auth from "../pages/Register/Auth"
import Upload from "../pages/Upload/Upload"
import OneItem from "../pages/OneItem/OneItem"

const routes = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/frequently",
        element: <Frequently/>
    },
    {
        path: "/discover",
        element: <Discover/>
    },
    {
        path: "/editProfile",
        element: <Edit/>
    },
    {
        path: "/uploadItem",
        element: <Upload/>
    },
    {
        path: "*",
        element: <Error/>
    },
    {
        path: "/create",
        element: <Create/>
    },
    {
        path: "/profile",
        element: <ProfilePage/>
    },
    {
        path: "/auth",
        element: <Auth/>
    },
    {
      path: "/oneItem",
      element: <OneItem/>
    },
]

export default routes