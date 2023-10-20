import loadable from "~/utils/loadable";
import Auth from "~/wrapper/Auth";

const Home = loadable(() => import("~/pages/home"));
const Login = loadable(() => import("~/pages/login"));
const ResetPassword = loadable(() => import("~/pages/resetPassword"));


export const ROUTES = {
  Home: "/",
  
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
