import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Avatar, Layout, MenuProps, Spin, theme } from "antd";
import { RootState, useAppSelector } from "~/store";
import { UserRole } from "~/utils/constant";
import { ROUTES } from "~/routes";
import { Content } from "antd/es/layout/layout";
import { LoadingOutlined } from '@ant-design/icons';

import Header from "~/components/molecules/Header";
import Sider from "antd/es/layout/Sider";
import history from "~/utils/history";
import SideNav from "~/components/molecules/Sidebar";
import FriendList from "~/components/molecules/FriendList";
import AdsList from "~/components/molecules/AdsList";

//User Icon navbar
import friendsIcon from '~/assets/images/friendsIcon.svg';
import groupsIcon from '~/assets/images/groupIcon.svg';
import gameIcon from '~/assets/images/gameIcon.svg';

// Admin icon nav bar
import dashBoardIcon from '~/assets/images/dashBoardIcon.svg';
import accountIcon from '~/assets/images/accountIcon.svg';
import adsIcon from '~/assets/images/adsIcon.svg';


import styles from "./styles.module.scss";
import Svg from "~/components/atoms/Svg";
import { Authorization } from "../Authorization";
type MenuItem = Required<MenuProps>["items"][number];
interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

function Auth(props: Props) {
  const { children = null } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const userData = useAppSelector(
    (state: RootState) => state.userInfo.userData
  );

  const menuLeft: MenuItem[] = useMemo(() => {
    if (userData && userData.role && userData.role !== UserRole.Admin) {
      return [ 
        {
          key: ROUTES.MemberProfile(userData?._id),
          label: (
            <Link style={{display: "flex"}} to={''}>
              <Avatar src={userData?.avatar}/>
              <p style={{margin: 0, marginLeft: 12}}>{userData?.username}</p>
            </Link>
          ),
          url: ROUTES.MemberProfile(userData?._id),
          content: "My Profile",
        },
        {
          key: ROUTES.Friend,
          label: <Link to={ROUTES.Friend}>Friend</Link>,
          icon: <Svg src={friendsIcon} className="w-5"/>,
          url: ROUTES.Friend,
          content: "Friend",
        },
        {
          key: ROUTES.Groups,
          label: <Link to={ROUTES.Groups}>Group</Link>,
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
        }
      ];
    } else {
      return [ 
        {
          key: ROUTES.MemberProfile(userData?._id),
          label: 
          (
            userData ? 
            <Link style={{display: "flex"}} to={''}>
              <Avatar src={userData?.avatar}/>
              <p style={{margin: 0, marginLeft: 12}}>{userData?.username}</p>
            </Link> : <Spin indicator={antIcon} />
          ),
          url: ROUTES.MemberProfile(userData?._id),
          content: "My Profile",
        },
        {
          key: ROUTES.DashBoard,
          label: <Link to={ROUTES.DashBoard}>Dashboard</Link>,
          icon: <Svg src={dashBoardIcon} className="w-5"/>,
          url: ROUTES.DashBoard,
          content: "Dashboard",
        },
        {
          key: ROUTES.ManageAccount,
          label: <Link to={ROUTES.ManageAccount}>Account</Link>,
          icon: <Svg src={friendsIcon} className="w-5"/>,
          url: ROUTES.ManageAccount,
          content: "Account",
        },
        {
          key: ROUTES.ManageGroup,
          label: <Link to={ROUTES.ManageGroup}>Group</Link>,
          icon: <Svg src={groupsIcon} className="w-5"/>,
          url: ROUTES.ManageGroup,
          content: "Group",
        },
        {
          key: ROUTES.ManageAds,
          label: <Link to={ROUTES.ManageAds}>Manage Ads</Link>,
          icon: <Svg src={adsIcon} className="w-5"/>,
          url: ROUTES.ManageAds,
          content: "Manage Ads",
        },
      ];
    }
    
  },[userData]
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
            width={250}
            className={styles.contentSider}
            style={{ background: colorBgContainer }}
          >
            <SideNav menus={menuLeft} />
            <div
              className={styles.adsContainer}
            >
              <Authorization roles={[UserRole.Member]}>
                <AdsList/>
              </Authorization>
            </div>
          </Sider>
          <Content className={styles.contentList}>{children}</Content>
          <Authorization roles={[UserRole.Member]}>
            <div className={styles.friendListContainer}>
              <FriendList />
            </div>
          </Authorization>
        </Layout>
      </Content>
    </Layout>
  );
}

export default Auth;
