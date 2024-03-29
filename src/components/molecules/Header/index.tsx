import React, { useState } from "react";
import { Badge, Dropdown, Layout, MenuProps, Spin, message, Input, SelectProps, Divider } from "antd";
import { removeCookie } from "~/utils/cookie";
import { ROUTES } from "~/routes";

import history from "~/utils/history";
import loadable from "~/utils/loadable";
import iconNotification from "~/assets/images/bellIcon.svg";
import logoutIcon from "~/assets/images/logoutIcon.svg";
import profileIcon from "~/assets/images/profileIcon.svg";
import logo from "~/assets/images/logo_transparent.png";

import { RootState, useAppDispatch, useAppSelector } from "~/store";
import { setUserInfo } from "~/store/userInfo";
import { Authorization } from "~/wrapper/Authorization";
import { SUCCESS, UserRole } from "~/utils/constant";
import { useNavigate } from "react-router-dom";
import { setAllNotifications } from "~/store/notification";
import { getSelfNotification, markAllAsRead, markAsRead } from "~/api/notification";
import { LoadingOutlined } from '@ant-design/icons';
import styles from "./styles.module.scss";
import Select from "~/components/atoms/Select";
import { search } from "~/api/member";
import SearchInput from "~/components/atoms/HeaderSearch";


const { Search } = Input;
const { Header: LayoutHeader } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Svg = loadable(() => import("~/components/atoms/Svg"));

export default function Header() {
  const me = useAppSelector((state: RootState) => state.userInfo.userData);
  const dispatch = useAppDispatch();
  const allNotifications = useAppSelector(
    (state: RootState) => state.notification.allNotifications
  );

  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    dispatch(setUserInfo({}));
    history.push(ROUTES.Login);
  };

  const handleClickLogo = () => {
    history.push("/");
  };

  const showProfile = () => {
    history.push(ROUTES.MemberProfile(me?._id));
  };

  const handleClickNotification = async (notification: any) => {
    if (!notification.read) {
      navigate(ROUTES.PostDetails(notification.post))
      const res = await markAsRead(notification._id)
      const { data } = res;
      if (res && !res.errorCode && !res.errors.length) {
        dispatch(setAllNotifications(data));
      } else {
        message.error("Fail to load notifications");
      }
    }
    navigate(ROUTES.PostDetails(notification.post))

  }


  const items: MenuProps["items"] = [
    {
      key: "1",
      label: 
      <Authorization roles={[UserRole.Member]}>
        <div onClick={showProfile} className="flex">
          <Svg src={profileIcon} className='w-5 mr-2'/>
          Profile
        </div>
      </Authorization>
    },
    me && me.role !== UserRole.Admin ? {
      type: "divider",
    } : null,
    {
      key: "4",
      label: 
      <div onClick={logout} className="flex">
        <Svg src={logoutIcon} className='w-5 mr-2'/>
        Logout
      </div>,
    },
  ];

  const notificationItem = allNotifications?.map((item) => (
    {
      key: item._id,
      label: (
        <div
          onClick={() => handleClickNotification(item)}
          className="max-w-[250px]"
          style={{ color: item?.read ? "rgb(113 113 122)" : "rgb(99 102 241)" }}
        >
          {item.content}
        </div>
      ),
    }
  ))

  const handleMarkAllAsRead = async () => {
    try {
      const res = await markAllAsRead()
      if (res) {
        if (res.msg === SUCCESS) {
          dispatch(setAllNotifications(res.data));
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout className={styles.header}>
      <LayoutHeader className={styles.coverHeader}>
        <div
          onClick={handleClickLogo}
          className={`${styles.title} cursor-pointer`}
          tabIndex={0}
        >
          <Svg className={styles.logo} src={logo} />

          <h3 className='my-0 mx-3 text-primary text-lg font-semibold'>Mystic</h3>
        </div>
        { me && me?.role === UserRole.Member ?
          <div className="m-auto w-[500px]">
            <SearchInput placeholder="Search on mystic" className='w-100 border-primary'/>
          </div>
          :
          <div className="w-[500px] m-auto text-2xl font-semibold text-primary text-center">
            { me && me?.role === UserRole.Admin ? 
            <div>Admin System</div>
            :
            <Spin indicator={antIcon} />
            }
          </div>
        }

        <div className={styles.info}>
          <Authorization roles={[UserRole.Member]}>
            <Dropdown
              placement="bottomLeft"
              overlayStyle={{
                maxHeight: "40vh",
                overflowX: "hidden",
                overflowY: "scroll",
              }}
              menu={
                {
                  items: [
                    {
                      key: '1',
                      label: (
                        <div
                          onClick={() => handleMarkAllAsRead()}
                          className="flex items-center justify-center bg-violet-200 py-1 font-medium"
                        >
                          Mark All As Read
                        </div>
                      ),
                    },
                    ...notificationItem
                  ]
                }
              }
            >
              <Badge
                count={allNotifications?.filter((item) => !item.read).length}
                size="small"
              >
                <Svg
                  src={iconNotification}
                  alt="icon notification"
                  className={styles.iconNotification}
                />
              </Badge>
            </Dropdown>
          </Authorization>
          { me ? 
            <Dropdown menu={{ items }}>
              <div className={styles.coverInfo}>
                <div className={styles.avatar}>
                  <Svg
                    src={me?.avatar}
                    alt="icon avatar"
                    className={styles.iconAvatar}
                  />
                </div>

                <div className={styles.name}>
                  {me?.username}
                </div>
              </div>
            </Dropdown>
            : <Spin indicator={antIcon} />
          }
        </div>
      </LayoutHeader>
    </Layout>
  );
}
