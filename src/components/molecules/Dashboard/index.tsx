import React, { useMemo } from "react";
import { Column, Bar, Pie, DualAxes } from "@ant-design/plots";
import { Row, Col, Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useDashboard } from "~/hooks/useDashboard";

import Meta from "antd/es/card/Meta";
import Spin from "~/components/atoms/Spin";
import styles from "./styles.module.scss";
import { getCookie } from "~/utils/cookie";

const listMonth= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const Dashboards = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const token = getCookie("token");

  const { data, isFetching, isLoading } = useDashboard(token);
  const dataDashBoard = data?.data;
  

  const infoPostCount = useMemo(() => {
    if(dataDashBoard) {
      const { todayPostCount, yesterdayPostCount } = dataDashBoard;
  
      let percent = 0;
      let type = "equal";
  
      if (todayPostCount > yesterdayPostCount) {
        type = "greaterThan";
        percent =
          yesterdayPostCount === 0 ? 100 : todayPostCount / yesterdayPostCount;
      } else if (todayPostCount < yesterdayPostCount) {
        type = "lessThan";
        percent = todayPostCount === 0 ? 100 : yesterdayPostCount / todayPostCount;
      }
  
      return {
        type,
        percent,
      };
    } else {
      return {}
    }
  }, [dataDashBoard]);

  const infoAdsClick = useMemo(() => {
    if(dataDashBoard) {
      const { todayAdClickCount, yesterdayAdClickCount } = dataDashBoard;
      let percent = 0;
      let type = "equal";
      if (todayAdClickCount > yesterdayAdClickCount) {
        type = "greaterThan";
        percent = yesterdayAdClickCount === 0 ? 100 : todayAdClickCount / yesterdayAdClickCount;
      } else if (todayAdClickCount < yesterdayAdClickCount) {
        type = "lessThan";
        percent = todayAdClickCount === 0 ? 100 : yesterdayAdClickCount / todayAdClickCount;
      }
      return {
        type,
        percent,
      };
    } else {
      return {}
    }
  },[dataDashBoard])

  // number user contributors by month
  const dataColumnChart = useMemo(() => {
    return []
  }, [dataDashBoard?.numberAuthorByMonth]);
  

  const config = {
    data: dataColumnChart ? dataColumnChart : [],
    xField: "month",
    yField: "value",
  };

  // total ideas for all system in each year
  const dataPieChart = useMemo(() => {
    if (dataDashBoard) {
      const pieChartData = Object.entries(dataDashBoard.newlyCreatedAccount).map(([type, value]) => ({
        type,
        value,
      }));
      return pieChartData;
    } else {
      return []
    }
  }, [dataDashBoard?.newlyCreatedAccount]);

  const configPieChart = {
    data: dataPieChart ? dataPieChart : [],
    appendPadding: 10,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100)?.toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  
  const dualLineData = useMemo(() => {
    const data = [
      {
        name: 'Group 1',
        like: 30,
        dislike: 10,
        comment: 5
      },
      {
        name: 'Group 2',
        like: 23,
        dislike: 4,
        comment: 9
      },
      {
        name: 'Group 3',
        like: 25,
        dislike: 5,
        comment: 4
      },
      {
        name: 'Group 4',
        like: 10,
        dislike: 5,
        comment: 22
      },
      {
        name: 'Group 5',
        like: 100,
        dislike: 7,
        comment: 10
      },
    ];
    // if (dataDashBoard) {
    //   return dataDashBoard.groupActivityCount.map((group: any) => ({
    //     name: group.name,
    //     like: group.activities?.like,
    //     dislike: group.activities?.dislike
    //   }))
    // }
    return data
  }, [dataDashBoard?.groupActivityCount])

  const configDualLineChart = {
    data: [dualLineData, dualLineData],
    xField: 'name',
    yField: ['dislike', 'like'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
        smooth: true,
        color: '#5AD8A6',
      },
    ],
  };

  const dataBarChart = useMemo(() => {
    return []
  }, [dataDashBoard?.numberAuthorByMonth]);
  

  const configBarChart = {
    data: dataBarChart ? dataBarChart?.reverse() : [],
    isStack: true,
    xField: 'bookCount',
    yField: 'month',
    seriesField: 'type',
  };

  return (
    <div className={styles.dashboardContainer}>
      <Spin spinning={isLoading || isFetching}>
        <Row gutter={25}>
          <Col 
            xxl={{ span: 12}}
            xl={{ span: 12}}
            lg={{ span: 12}}
            md={{ span: 24}}
            sm={{ span: 24}}
            xs={{ span: 24}}
          >
            <Card>
              <h3>Today's posts</h3>
              <div className={styles.statistic}>
                <h1 className={styles.cardInfoValue}>
                  {dataDashBoard?.todayPostCount}
                </h1>
                <Statistic
                  className="mt-2 ml-2"
                  value={
                    infoPostCount?.percent
                  }
                  precision={2}
                  valueStyle={{ color:  infoPostCount?.type === 'lessThan' ? 'red' : "#3f8600" , fontSize: 14 }}
                  prefix={ infoPostCount?.type === 'lessThan' ? <ArrowDownOutlined/> : <ArrowUpOutlined />}
                  suffix="%"
                />
              </div>
            </Card>
          </Col>
          <Col 
            xxl={{ span: 12}}
            xl={{ span: 12}}
            lg={{ span: 12}}
            md={{ span: 24}}
            sm={{ span: 24}}
            xs={{ span: 24}}
          >
            <Card>
              <h3>Today's ads click</h3>
              <div className={styles.statistic}>
                <h1 className={styles.cardInfoValue}>
                  {dataDashBoard?.todayAdClickCount}
                </h1>
                <Statistic
                  className="mt-2 ml-2"
                  value={infoAdsClick?.percent}
                  precision={2}
                  valueStyle={{ color:  infoAdsClick?.type === 'lessThan' ? 'red' : "#3f8600" , fontSize: 14 }}
                  prefix={ infoAdsClick?.type === 'lessThan' ? <ArrowDownOutlined/> : <ArrowUpOutlined />}
                  suffix="%"
                />
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4" gutter={16}>
          <Col 
            xxl={{ span: 10}}
            xl={{ span: 10}}
            lg={{ span: 10}}
            md={{ span: 24}}
            sm={{ span: 24}}
            xs={{ span: 24}}
          >
            <Card>
              <Card className={styles.cardColumnChart}>
                <Column {...config} height={300} color="#dfe7f7" />
              </Card>
              <Meta
                style={{ marginTop: 23 }}
                title="Author contribution"
                description={
                  <Statistic
                    title="than last month"
                    value={'authorContribution?.percent'}
                    style={{ display: "flex" }}
                    precision={2}
                    valueStyle={{
                      color: "#3f8600" ,
                      fontSize: 14,
                      marginLeft: 5,
                    }}
                    prefix={ <ArrowUpOutlined />}
                    suffix="%"
                  />
                }
              />
            </Card>
          </Col>
          <Col 
            xxl={{ span: 14}}
            xl={{ span: 14}}
            lg={{ span: 14}}
            md={{ span: 24}}
            sm={{ span: 24}}
            xs={{ span: 24}}
          >
            <Card
              className={styles.dualLineChart}
            >
              <Card>
                <DualAxes {...configDualLineChart} height={300} />
              </Card>
              <Meta
                style={{ marginTop: 23 }}
                title="Top groups interactions"
              />
            </Card>
          </Col>
        </Row>
        <Row className="mt-4" gutter={[16, 16]}>
          <Col 
            xxl={{ span: 12}}
            xl={{ span: 12}}
            lg={{ span: 12}}
            md={{ span: 24}}
            sm={{ span: 24}}
            xs={{ span: 24}}
          >
            <Card>
              <Card>
                <Pie {...configPieChart} height={300} />
              </Card>
              <Meta
                style={{ marginTop: 23 }}
                title="Number of account created per year"
              />
            </Card>
          </Col>
          <Col 
            xxl={{ span: 12}}
            xl={{ span: 12}}
            lg={{ span: 12}}
            md={{ span: 24}}
            sm={{ span: 24}}
            xs={{ span: 24}}
          >
            <Card>
              <Card>
                <Bar {...configBarChart} height={300} />
              </Card>
              <Meta
                style={{ marginTop: 23 }}
                title="Book topics per month"
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Dashboards;
