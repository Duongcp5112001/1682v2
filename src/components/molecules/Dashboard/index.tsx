import React, { useMemo } from "react";
import { Column, Bar, Pie, DualAxes } from "@ant-design/plots";
import { Row, Col, Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useDashboard } from "~/hooks/useDashboard";

import Meta from "antd/es/card/Meta";
import Spin from "~/components/atoms/Spin";
import styles from "./styles.module.scss";

const listMonth= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const Dashboards = () => {
  const today = new Date();
  const currentMonth = today.getMonth();

  // const { data, isFetching, isLoading } = useDashboard(true);
  const dataDashBoard: any = [];
  
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
      return dataDashBoard?.totalBookEachYear?.map((item: any) => ({
        type: item.year,
        value: item.bookCount,
      }));
    }
  }, [dataDashBoard?.totalBookEachYear]);

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

  const dataLineChart = dataDashBoard?.interactionCount;
  
  const transformedData = useMemo(() => {
    return []
  }, [dataLineChart])

  const configLineChart = {
    data: transformedData ? transformedData : [],
    xField: 'name',
    yField: 'value',
    seriesField: 'type',
    xAxis: {
      label: {
        autoRotate: true, // Enable automatic rotation of labels
        overflow: 'hidden', // Hide any overflowing text
        whiteSpace: 'nowrap', // Prevent line breaks
        textOverflow: 'ellipsis', // Display ellipsis (...) for overflowed text
        width: 50, // Set a fixed width for the label (adjust as needed)
      },
    },
    isGroup: true,
    columnStyle: {
      radius: [10, 10, 0, 0],
    },
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

  const info = useMemo(() => {
    return []
  }, [dataDashBoard]);

  return (
    <div className={styles.dashboardContainer}>
      <Spin spinning={false}>
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
                    'info?.percent'
                  }
                  precision={2}
                  valueStyle={{ color: "#3f8600" , fontSize: 14 }}
                  prefix={ <ArrowUpOutlined />}
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
              <h3>Year's posts</h3>
              <div className={styles.statistic}>
                <h1 className={styles.cardInfoValue}>
                  {dataDashBoard?.thisYearPostCount}
                </h1>
                <Statistic
                  className="mt-2 ml-2"
                  value={'infoByYear?.percent'}
                  precision={2}
                  valueStyle={{ color: "#3f8600" , fontSize: 14 }}
                  prefix={ <ArrowUpOutlined />}
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
                <Column {...configLineChart} height={300} />
              </Card>
              <Meta
                style={{ marginTop: 23 }}
                title="Interactions of book"
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
                title="Number of books published per year"
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
