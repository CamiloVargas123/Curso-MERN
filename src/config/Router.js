//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin pages
import AdminHome from "../pages/admin";
import AdminSingIn from "../pages/admin/SignIn";

//Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

// Other
import Error404 from "../pages/Error404";


const router = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:  [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSingIn,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
]

export default router;