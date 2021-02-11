import {lazy} from "react";

//Layout
const LayoutAdmin = lazy(() => import("../layouts/LayoutAdmin"));
const LayoutBasic = lazy(() => import("../layouts/LayoutBasic"));

//Admin pages
const AdminHome = lazy(() => import("../pages/admin"));
const AdminSingIn = lazy(() => import("../pages/admin/SignIn"));
const AdminUsers = lazy(() => import("../pages/admin/Users"));
const AdminMenuWeb = lazy(() => import("../pages/admin/MenuWeb"));
const AdminBlog = lazy(() => import("../pages/admin/Blog"));

//Pages
const Home = lazy(() => import("../pages/Home"));
const Contact = lazy(() => import("../pages/Contact"));

// Other
const Error404 = lazy(() => import("../pages/Error404"));


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
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                path: "/admin/blog",
                component: AdminBlog,
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