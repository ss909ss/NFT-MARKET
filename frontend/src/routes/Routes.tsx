import Create from "../pages/Create/Create"
import Discover from "../pages/Discover/Discover"
import Edit from "../pages/Edit/Edit"
import Error from "../pages/Error/Error"
import Frequently from "../pages/Frequently/Frequently"
import Home from "../pages/Home/Home"
import ProfilePage from "../pages/Profile/Profile"
import Auth from "../pages/Register/Login"
import Upload from "../pages/Upload/Upload"
import OneItem from "../pages/OneItem/OneItem"
import Register from "../pages/Register/Register"
import Login from "../pages/Register/Login"
import OnSale from "../components/onSale/onSale"

import Collectibles from "../components/Collectibles/Collectibles"

const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/frequently",
        element: <Frequently />
    },
    {
        path: "/discover",
        element: <Discover />
    },
    {
        path: "/editProfile",
        element: <Edit />
    },
    {
        path: "/uploadItem",
        element: <Upload />
    },
    {
        path: "*",
        element: <Error />
    },
    {
        path: "/create",
        element: <Create />
    },

    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/nft/:id",
        element: <OneItem />
    },
    {
        path: "/register",
        element: <Register />
    },

    // {
    //     path: "/profile/*",
    //     element: <ProfilePage />,
    //     children: [
    //         { path: "on-sale", element: <OnSale /> },
    //         { path: "collectibles", element: <Collectibles /> },
    //         // { path: "created", element: <Created /> },
    //         // { path: "likes", element: <Likes /> },
    //         // { path: "following", element: <Following /> },
    //         // { path: "followers", element: <Followers /> },
    //     ],
    // },

    // {
    //     path: "/on-sale",
    //     element: <OnSale />
    // },
    // {
    //     path: "/collectibles",
    //     element: <Collectibles />
    // },
    // {
    //     path: "/created",
    //     element: <Created />
    // },
    // {
    //     path: "/likes",
    //     element: <Likes />
    // },
    // {
    //     path: "/following",
    //     element: <Following />
    // },
    // {
    //     path: "/followers",
    //     element: <Followers />
    // },

]

export default routes