import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Avatar, Layout, MenuProps, theme } from "antd";
import { RootState, useAppSelector } from "~/store";
import { UserRole } from "~/utils/constant";
import { ROUTES } from "~/routes";
import { Content } from "antd/es/layout/layout";

import Header from "~/components/molecules/Header";
import Sider from "antd/es/layout/Sider";
import history from "~/utils/history";
import SideNav from "~/components/molecules/Sidebar";
import FriendList from "~/components/molecules/FriendList";
import AdsList from "~/components/molecules/AdsList";

import friendsIcon from '~/assets/images/friendsIcon.svg';
import groupsIcon from '~/assets/images/groupIcon.svg';
import gameIcon from '~/assets/images/gameIcon.svg';

import styles from "./styles.module.scss";
import Svg from "~/components/atoms/Svg";
type MenuItem = Required<MenuProps>["items"][number];
interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

function Auth(props: Props) {
  const { children = null } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userData = useAppSelector(
    (state: RootState) => state.userInfo.userData
  );
  const menuLeft: MenuItem[] = useMemo(
    () => [
      {
        key: ROUTES.MemberProfile(userData?._id),
        label: 
          <Link
            style={{display: "flex"}}
            to={''}
          >
            <Avatar src={userData?.avatar}/>
            <p style={{margin: 0, marginLeft: 12}}>{userData?.username}</p>
          </Link>,
        url: ROUTES.MemberProfile(userData?._id),
        content: "My Profile",
      },
      {
        key: ROUTES.Friend,
        label: <Link to={''}>Friend</Link>,
        icon: <Svg src={friendsIcon} className="w-5"/>,
        url: ROUTES.Friend,
        content: "Friend",
      },
      {
        key: ROUTES.Groups,
        label: <Link to={''}>Group</Link>,
        icon: <Svg src={groupsIcon} className="w-5"/>,
        url: ROUTES.Groups,
        content: "Groups",
      },
      {
        key: ROUTES.Game,
        label: <Link to={ROUTES.Game}>Game</Link>,
        icon: <Svg src={gameIcon} className="w-5" />,
        url: ROUTES.Game,
        content: "Game",
      },
    ],
    [userData]
  );

  return (
    <Layout className={styles.layoutContainer}>
      <div className="header">
        <Header />
      </div>
      <Content className={styles.contentMain}>
        <Layout
          className={styles.contentNav}
          style={{ background: colorBgContainer }}
        >
          <Sider
            className={styles.contentSider}
            style={{ background: colorBgContainer }}
          >
            <SideNav menus={menuLeft} />
            <div
              className={styles.adsContainer}
            >
              <AdsList/>
            </div>
          </Sider>
          <Content className={styles.contentList}>{children}</Content>
          <div className={styles.friendListContainer}>
            <FriendList />
          </div>
        </Layout>
      </Content>
    </Layout>
  );
}

export default Auth;
