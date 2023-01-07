import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMetaMask } from "metamask-react";
import { Layout, Calendar, Button, Modal, Card } from "antd";
import { WalletContext, AlchemyContext } from "..";

const { Header, Content } = Layout;

dayjs.extend(customParseFormat);

const fakedata = [
  { date: "2023-01-07", content: "bbb" },
  { date: "2023-01-07", content: "ccc" },
  { date: "2023-01-03", content: "ddd" },
  { date: "2022-12-25", content: "merry ch" },
  { date: "2022-12-25", content: "eeee" },
  { date: "2022-12-25", content: "happy" },
];

const disabledDate = (current) => {
  // Can not select days before today and today
  return current > dayjs().endOf("day");
};

function CalendarView() {
  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Alchemy = useContext(AlchemyContext);
  const arweave = useContext(WalletContext);
  const onChange = (date, dateString) => {
    setPickDate(date.format("YYYY-MM-DD"));
  };

  const [modalFocus, setModalFocus] = useState({
    title: "",
    content: [],
  });
  const [realdata, setRealdata] = useState([]);

  const getListData = (value) => {
    let listData = [];
    realdata.map((note) => {
      console.log("compare:", note.date, value);
      if (note.date === value) {
        listData.push(note.content);
      }
    });
    return listData;
  };

  console.log("realdata:", realdata);

  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const getNote_arweave = async (date, txId) => {
    console.log(date);
    const transaction = await arweave.arweave.transactions.getData(txId);
    console.log(transaction);
    if (transaction) {
      const decrypted = await arweave.decryptByPrivateKey(
        transaction,
        JSON.parse(localStorage.getItem("mnemonicPhrase"))
      );
      setRealdata((prev) => [
        ...prev,
        {
          date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`,
          content: decrypted,
        },
      ]);
    } else {
      setRealdata((prev) => [
        ...prev,
        [
          {
            date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`,
            content: "<Now pending...>",
          },
        ],
      ]);
    }
  };

  const monthToNotes = (month) => {
    Alchemy.monthToNotes(ethereum, account, month).then((encodedResult) => {
      console.log(encodedResult, Alchemy.interface.functions);
      const arr = Alchemy.interface.decodeFunctionResult(
        Alchemy.interface.functions["monthToNotes(uint256)"],
        encodedResult
      );
      arr.map((element) => {
        element.map((item) => {
          getNote_arweave(item[0], item[1]);
        });
      });
    });
  };

  // console.log(ethereum);

  useEffect(() => {
    // console.log("heelo");
    monthToNotes(dayjs().format("YYYYMM"));
  }, []);

  const viewNote = (e) => {
    console.log(getListData(e.target.parentNode.value));
    setModalFocus({
      title: e.target.parentNode.value,
      content: getListData(e.target.parentNode.value),
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dateCellRender = (value) => {
    const num = getListData(value.format("YYYY-MM-DD"));
    console.log(num);
    // console.log("a:", num, value);
    if (value < dayjs().endOf("day")) {
      return num.length !== 0 ? (
        <div
          className="notes-month"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <>
            <Button
              value={value.format("YYYY-MM-DD")}
              key={value.format("YYYY-MM-DD")}
              onClick={(e) => viewNote(e)}
              style={{ marginTop: 5, marginLeft: 5, marginRight: 2, width: 65 }}
            >
              View
            </Button>
          </>

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
        <Modal
          title={modalFocus.title}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {modalFocus.content.map((item) => (
            <Card style={{ marginBottom: 30 }}>{item}</Card>
          ))}
        </Modal>
        <Calendar
          dateCellRender={dateCellRender}
          disabledDate={disabledDate}
          onChange={onChange}
        />
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

// switch (value) {
//   case 8:
//     listData = [
//       {
//         // type: "success",
//       },
//     ];
//     break;
//   case 10:
//     listData = [
//       {
//         type: "warning",
//       },
//     ];
//     break;
//   case 15:
//     listData = [
//       {
//         type: "error",
//       },
//     ];
//     break;
//   case 16:
//     listData = [{ type: "error" }];
//     break;
//   default:
// }
