import Discover from "../pages/Discover/Discover"
import Frequently from "../pages/Frequently/Frequently"
import Home from "../pages/Home/Home"

const  routes = [
    {
     path:"/",
     element: <Home/>
    },
    {
        path:"/frequently",
        element: <Frequently/>
       },
       {
        path:"/discover",
        element: <Discover/>
       },
]

export default routes