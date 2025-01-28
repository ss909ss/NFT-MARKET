import Discover from "../pages/Discover/Discover"
import Error from "../pages/Error/Error"
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
       {
        path:"*",
        element: <Error/>
       },
]

export default routes