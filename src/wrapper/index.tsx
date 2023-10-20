import React, { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import routes, { ROUTES } from "~/routes";
import Blank from "~/layouts";
import { getCookie } from "~/utils/cookie";
import NotFound from "~/pages/404";
import { useAppDispatch } from "~/store";
import { useMember } from "~/hooks/useMember";
import { setUserInfo, setUserMessages } from "~/store/userInfo";
import { setUserId } from "~/store/chatMessages";
import { message } from "antd";
import { getSelfNotification } from "~/api/notification";
import { setAllNotifications } from "~/store/notification";
// import { socket } from "~/socket";

function Wrapper() {
  const token = getCookie("token");
  const userId = getCookie("userId");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: dataMember } = useMember();
  // useEffect(() => {
  //   const getSelfMessages = async () => {
  //     try {
  //       const res = await getAllMessages();

  //       if (res && !res.errorCode && !res.errors.length) {
  //         const { data } = res;
  //         dispatch(setUserMessages(data));
  //       } else {
  //         message.error("Fail to load messages");
  //       }
  //     } catch (error) {
  //       message.error("Fail to load messages");
  //     }
  //   };

  //   const getSelfNotifications = async () => {
  //     try {
  //       const res = await getSelfNotification();

  //       if (res && !res.errorCode && !res.errors.length) {
  //         const { data } = res;
  //         dispatch(setAllNotifications(data));
  //       } else {
  //         message.error("Fail to load notifications");
  //       }
  //     } catch (error) {
  //       message.error("Fail to load notifications");
  //     }
  //   };

  //   if (!token) {
  //     navigate(ROUTES.Login);
  //   } else {
  //     getSelfMessages();
  //     getSelfNotifications();
  //   }
  // }, [token, dispatch]);

  useEffect(() => {
    if (dataMember) {
      dispatch(setUserInfo(dataMember?.member));
      dispatch(setUserId(dataMember.member._id));
    }
  }, [dataMember?.member, dispatch]);

  return (
    <Routes>
      {routes.map((route, index) => {
        const Layout = route.layout ?? React.Fragment;
        if (route.isAuth) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <React.Fragment>
                  <Blank>
                    <Layout>
                      <route.component />
                    </Layout>
                  </Blank>
                </React.Fragment>
              }
            />
          );
        }
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <React.Fragment>
                <Blank>
                  <Layout>
                    <route.component />
                  </Layout>
                </Blank>
              </React.Fragment>
            }
          />
        );
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Wrapper;
