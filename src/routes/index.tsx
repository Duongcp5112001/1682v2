import loadable from "~/utils/loadable";
import Auth from "~/wrapper/Auth";

const Home = loadable(() => import("~/pages/home"));
const MemberProfile = loadable(() => import("~/pages/profile/[id]"));
const Groups = loadable(() => import("~/pages/groups/lists"));
const GroupDetails = loadable(() => import("~/pages/groups/[id]"));
const Posts = loadable(() => import("~/pages/posts/lists"));
const PostDetails = loadable(() => import("~/pages/posts/[id]"));
const Friend = loadable(() => import("~/pages/friends"));
const Contact = loadable(() => import("~/pages/contactAdmin"));
const Game = loadable(() => import("~/pages/game"));


const Login = loadable(() => import("~/pages/login"));
const ResetPassword = loadable(() => import("~/pages/resetPassword"));


export const ROUTES = {
  Home: "/",
  Posts: "/posts",
  Friend: "/friends",
  Groups: "/groups",
  GroupDetails: (id: number | string) => `/group/${id}`,

  Contact: "/contact",
  Game: "/game",
  MemberProfile: (id: number | string) => `/profile/${id}`,
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
    path: ROUTES.MemberProfile(":id"),
    component: MemberProfile,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.Friend,
    component: Friend,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.Groups,
    component: Groups,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.GroupDetails(":id"),
    component: GroupDetails,
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
  {
    exact: true,
    path: ROUTES.Game,
    component: Game,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.Contact,
    component: Contact,
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
