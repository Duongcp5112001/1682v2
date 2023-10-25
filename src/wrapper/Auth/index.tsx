import React, { useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { Avatar, Layout, MenuProps, theme } from "antd";

import { ROUTES } from "~/routes";

import styles from "./styles.module.scss";
import {
  LaptopOutlined,
  TagOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Header from "~/components/molecules/Header";
import Sider from "antd/es/layout/Sider";
import history from "~/utils/history";
import SideNav from "~/components/molecules/Sidebar";
import { RootState, useAppSelector } from "~/store";
import { UserRole } from "~/utils/constant";
import FriendList from "~/components/molecules/FriendList";
import AdsList from "~/components/molecules/AdsList";

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
        key: ROUTES.Friend,
        label: <Link to={''}>Friend</Link>,
        icon: <UsergroupAddOutlined  style={{ fontSize: "18px" }} />,
        url: ROUTES.Friend,
        content: "Friend",
      },
      {
        key: '2',
        label: <Link to={''}>Group</Link>,
        icon: <TagOutlined  style={{ fontSize: "18px" }} />,
        url: 'ROUTES.Group',
        content: "Group",
      },
      {
        key: ROUTES.Game,
        label: <Link to={ROUTES.Game}>Game</Link>,
        icon: <LaptopOutlined  style={{ fontSize: "18px" }} />,
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
