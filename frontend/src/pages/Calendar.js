import React, { useContext, useState, useEffect } from "react";
import { Input } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMetaMask } from "metamask-react";
import { Layout, Calendar } from "antd";
import { useApp } from "../UseApp";
import { AlchemyContext } from "..";

const { Header, Content } = Layout;
const { TextArea } = Input;

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          // type: "success",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "error",
        },
      ];
      break;
    case 16:
      listData = [{ type: "error" }];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return "  ";
  } else {
    return "  ";
  }
};

function CalendarView() {
  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const onChange = (date, dateString) => {
    setPickDate(dateString);
    console.log(pickDate);
  };

  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const monthToNotes = (date) => {
    // console.log(date);
    Alchemy.dateToNotes(ethereum, account, date + "11").then(
      (encodedResult) => {
        // console.log(encodedResult);
        const arr = Alchemy.interface.decodeFunctionResult(
          Alchemy.interface.functions["dateToNotes(uint256)"],
          encodedResult
        );
        // console.log(arr);
      }
    );
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    // console.log("num:", num);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const num = getListData(value);
    console.log(num);
    return num.length !== 0 ? (
      <div className="notes-month">
        <div style={{ fontSize: 25 }}>・</div>
      </div>
    ) : (
      <div className="notes-month">
        <div style={{ fontSize: 25, color: "#ffffff" }}>・</div>
      </div>
    );
  };

  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          {
            // type: "success",
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: "warning",
          },
        ];
        break;
      case 15:
        listData = [
          {
            type: "error",
          },
        ];
        break;
      case 16:
        listData = [{ type: "error" }];
        break;
      default:
    }
    return listData || [];
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return "  ";
    } else {
      return "  ";
    }
  };

  function CalendarView() {
    const Alchemy = useContext(AlchemyContext);
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    const monthToNotes = (month) => {
      Alchemy.monthToNotes(ethereum, account, Number(month)).then(
        (encodedResult) => {
          // console.log(encodedResult);
          const arr = Alchemy.interface.decodeFunctionResult(
            Alchemy.interface.functions["dateToNotes(uint256)"],
            encodedResult
          );
          // console.log(arr);
        }
      );
    };
    useEffect(() => {
      monthToNotes(dayjs().format("YYYYMM"));
    }, []);

    const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
    const onChange = (date, dateString) => {
      setPickDate(dateString);
      // console.log(pickDate);
    };
    const onPanelChange = (value, mode) => {
      // console.log(value.format("YYYY-MM-DD"), mode);
    };

    const monthCellRender = (value) => {
      const num = getMonthData(value);
      // console.log("num:", num);
      return num ? (
        <div className="notes-month">
          <section>{num}</section>
        </div>
      ) : null;
    };
    const dateCellRender = (value) => {
      const num = getListData(value);
      // console.log(num);
      return num.length !== 0 ? (
        <div className="notes-month">
          <div style={{ fontSize: 25 }}>・</div>
        </div>
      ) : (
        <div className="notes-month">
          <div style={{ fontSize: 25, color: "#ffffff" }}>・</div>
        </div>
      );
    };

    return (
      <Layout className="site-layout">
        <div
          className="site-calendar-demo-card"
          style={{
            padding: 24,
            marginTop: 50,
            marginRight: "10%",
          }}
        >
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            fullscreen={false}
            onChange={onChange}
            onPanelChange={onPanelChange}
          />
        </div>
        <Content
          className="site-layout-background"
          style={{
            // margin: '24px 16px',
            padding: 24,
            paddingTop: 40,
            minHeight: 280,
            borderRadius: 20,
            marginTop: 10,
            marginBottom: 50,
            marginLeft: "5%",
            marginRight: "15%",
            //   filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2))",
          }}
        ></Content>
      </Layout>
    );
  }
}
export default CalendarView;
