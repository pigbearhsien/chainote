import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMetaMask } from "metamask-react";
import { Layout, Calendar, Button } from "antd";
import { AlchemyContext } from "..";

const { Header, Content } = Layout;

dayjs.extend(customParseFormat);

const disabledDate = (current) => {
  // Can not select days before today and today
  return current > dayjs().endOf("day");
};
const getListData = (value) => {
  let listData;
  switch (value) {
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

function CalendarView() {
  console.log(ethereum);
  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const Alchemy = useContext(AlchemyContext);
  const onChange = (date, dateString) => {
    setPickDate(date.format("YYYY-MM-DD"));
  };

  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const monthToNotes = (month) => {
    Alchemy.monthToNotes(ethereum, account, month).then((encodedResult) => {
      console.log(encodedResult, Alchemy.interface.functions);
      const arr = Alchemy.interface.decodeFunctionResult(
        Alchemy.interface.functions["monthToNotes(uint256)"],
        encodedResult
      );
      console.log(arr);
    });
  };

  console.log(ethereum);

  useEffect(() => {
    monthToNotes(dayjs().format("YYYYMM"));
  }, []);

  const dateCellRender = (value) => {
    const num = getListData(value.format("YYYY-MM-DD"));
    if (value < dayjs().endOf("day")) {
      return num.length !== 0 ? (
        <div
          className="notes-month"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button>View</Button>
          <div style={{ fontSize: 50 }}>{num.length}</div>
        </div>
      ) : (
        <div className="notes-month">
          <div style={{ fontSize: 50, color: "#ffffff" }}></div>
        </div>
      );
    }
  };

  return (
    <Layout className="site-layout">
      <div className="site-calendar-demo-card" style={{}}>
        {/* <Calendar
          dateCellRender={dateCellRender}
          // monthCellRender={monthCellRender}
          disabledDate={disabledDate}
          onChange={onChange}
        /> */}
      </div>
    </Layout>
  );
}
export default CalendarView;

// const getMonthData = (value) => {
//   if (value.month() === 8) {
//     return "  ";
//   } else {
//     return "  ";
//   }
// };

// const monthCellRender = (value) => {
//   const num = getMonthData(value);
//   return num ? (
//     <div className="notes-month">
//       <section>{num}</section>
//     </div>
//   ) : null;
// };
