import { ROUTES } from "~/routes";
import { getCookie, removeCookie, setCookie } from "./cookie";
import history from "./history";
import { UserRole } from "./constant";

export const getFileName = (path: string) => {
  const index = path.lastIndexOf("/");
  return path.substring(index + 1);
};

interface IHandleLogin {
  accessToken?: string;
  expiresOn?: Date | null;
  callbackUrl?: string;
  userId?: string;
  userRole?: any;
}

export const handleLogin = ({
  accessToken,
  expiresOn,
  callbackUrl,
  userId,
  userRole,
}: IHandleLogin) => {
  if (typeof window === "undefined" || !accessToken) return;
  const expires = expiresOn ? +new Date(expiresOn) : 9999;
  setCookie("token", accessToken, {
    expires,
  });
  if (userId) {
    setCookie("userId", userId, { expires });
  }

  if (getCookie('token')) {
    if (userRole === UserRole.Member) {
      history.push(ROUTES.Posts);
    } else {
      history.push(callbackUrl ?? ROUTES.DashBoard);
    }
    // window.location.reload();
  }

};

export const handleLogout = (callbackUrl = ROUTES.Home) => {
  removeCookie("token");
  removeCookie("userId");
  removeCookie("refreshToken");
  removeCookie("userName");
  localStorage.clear();
  if (callbackUrl) {
    history.push(callbackUrl);
  }
};

export const encryptionUserName = (userName: string) => {
  let encryptedString = "";
    let count = 0;
    
    for (let i = 0; i < userName?.length; i++) {
        if (i > 0 && i < userName?.length - 1) {
          encryptedString += "*";
          count++;
        } else {
          encryptedString += userName[i];
        }
    }
    
  return encryptedString;
}

export const checkFriend = (me: any, member: any) => {
  const isFriend = me?.friends.find((item: any) => item?.friendId === member?._id)
  if (isFriend) {
    return true;
  } else {
    return false
  }
}


export const checkForbiddenWord = (content: any) => {
  return content.replace('test', '****')
}