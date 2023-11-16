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

// Admin
const DashBoard = loadable(() => import("~/pages/dashboard"));
const ManageAccount = loadable(() => import("~/pages/account"));
const ManageGroup = loadable(() => import("~/pages/manageGroup"));
const ManageAds = loadable(() => import("~/pages/ads"));
const ManageFWord = loadable(() => import("~/pages/manageFWord"));

//No Auth
const Login = loadable(() => import("~/pages/login"));
const GetSecurityQuestion = loadable(() => import("~/pages/getSecurityQuestion"));
const AnswerQuestion = loadable(() => import("~/pages/answerQuestion"));
const ResetPassword = loadable(() => import("~/pages/resetPassword"));

// Unauthorize 
const Unauthorize = loadable(() => import("~/pages/404"));

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

  // Admin
  DashBoard: '/dashboard',
  ManageAccount: '/manage-account',
  ManageGroup: '/manage-group',
  ManageAds: '/manage-ads',
  ManageFWord: '/manage-fword',

  // no auth
  Login: "/login",
  GetSecurityQuestion: "/get-security-question",
  AnswerQuestion: "/answer-question",
  ResetPassword: "/resetPassword",

  //Unauthorize
  Unauthorize: "/404"
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

  // Admin 
  {
    exact: true,
    path: ROUTES.DashBoard,
    component: DashBoard,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.ManageAccount,
    component: ManageAccount,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.ManageGroup,
    component: ManageGroup,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.ManageAds,
    component: ManageAds,
    layout: Auth,
    isAuth: true,
  },
  {
    exact: true,
    path: ROUTES.ManageFWord,
    component: ManageFWord,
    layout: Auth,
    isAuth: true,
  },

  // no auth
  { exact: true, path: ROUTES.Login, component: Login, isAuth: false },
  {
    exact: true,
    path: ROUTES.GetSecurityQuestion,
    component: GetSecurityQuestion,
    isAuth: false,
  },
  {
    exact: true,
    path: ROUTES.AnswerQuestion,
    component: AnswerQuestion,
    isAuth: false,
  },
  {
    exact: true,
    path: ROUTES.ResetPassword,
    component: ResetPassword,
    isAuth: false,
  },

  // Unauthorize
  {
    exact: true,
    path: ROUTES.Unauthorize,
    component: Unauthorize,
    isAuth: false,
  },
];

export default routes;
