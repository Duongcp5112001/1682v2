import loadable from "~/utils/loadable";
import Auth from "~/wrapper/Auth";

const Home = loadable(() => import("~/pages/home"));
const Posts = loadable(() => import("~/pages/posts/lists"));
const PostDetails = loadable(() => import("~/pages/posts/[id]"));
const Login = loadable(() => import("~/pages/login"));
const ResetPassword = loadable(() => import("~/pages/resetPassword"));


export const ROUTES = {
  Home: "/",
  Posts: "/posts",
  PostDetails: (id: number | string) => `/posts/${id}`,
  // no auth
  Login: "/login",
  ResetPassword: "/resetPassword",
};

const routes = [
  {
    exact: true,
    path: ROUTES.Home,
    component: Home,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.Posts,
    component: Posts,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.PostDetails(":id"),
    component: PostDetails,
    layout: Auth,
    isAuth: true,
  },

  // no auth
  { exact: true, path: ROUTES.Login, component: Login, isAuth: false },
  {
    exact: true,
    path: ROUTES.ResetPassword,
    component: ResetPassword,
    isAuth: false,
  },
];

export default routes;
