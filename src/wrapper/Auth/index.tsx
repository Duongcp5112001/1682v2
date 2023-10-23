import React, { useMemo, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { Avatar, Carousel, Layout, MenuProps, theme } from "antd";

import { ROUTES } from "~/routes";

import styles from "./styles.module.scss";
import {
  UnorderedListOutlined,
  TagsOutlined,
  DashboardOutlined,
  TagOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  AccountBookOutlined,
  DollarCircleOutlined,
  HeartOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Content, Footer } from "antd/es/layout/layout";
import Header from "~/components/molecules/Header";
import Sider from "antd/es/layout/Sider";
import history from "~/utils/history";
import SideNav from "~/components/molecules/Sidebar";
import { RootState, useAppSelector } from "~/store";
import defaultAvatar from '~/assets/images/defaultUser.png'
import { UserRole } from "~/utils/constant";
import Ads from "~/components/molecules/Ads";
import adsImage from '~/assets/images/ads.png'
import FriendList from "~/components/molecules/FriendList";

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
        key: '1',
        label: 
          <Link
            style={{display: "flex"}}
            to={''}
          >
            <Avatar src={userData?.avatar}/>
            <p style={{margin: 0, marginLeft: 12}}>{userData?.username}</p>
          </Link>
      },
      {
        key: 'ROUTES.Books',
        label: <Link to={''}>Friend</Link>,
        icon: <UsergroupAddOutlined  style={{ fontSize: "18px" }} />,
        url: 'ROUTES.Friend',
        content: "Friend",
      },
      {
        key: '2',
        label: <Link to={''}>Group</Link>,
        icon: <TagOutlined  style={{ fontSize: "18px" }} />,
        url: 'ROUTES.Group',
        content: "Group",
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
          style={{ padding: "24px 0", background: colorBgContainer }}
        >
          <Sider
            className={styles.contentSider}
            style={{ background: colorBgContainer }}
          >
            <SideNav menus={menuLeft} />
            <div
              className={styles.adsContainer}
            >
              <img src={adsImage} alt="" />
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
