import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMetaMask } from "metamask-react";
import {
  Layout,
  Calendar,
  Button,
  Modal,
  Collapse,
  Col,
  Radio,
  Row,
  Select,
} from "antd";
import { Web3Context } from "..";
import { SendOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Panel } = Collapse;

dayjs.extend(customParseFormat);

const disabledDate = (current) => {
  // Can not select days before today and today
  return current > dayjs().endOf("day");
};

function CalendarView() {
  const { database, alchemy } = useContext(Web3Context);
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [monthdata, setMonthData] = useState([]);
  const [yearData, setYearData] = useState({});
  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYYMM"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFocus, setModalFocus] = useState({
    title: "",
    notes: [],
  });

  const onChange = (date, dateString) => {
    setPickDate(date.format("YYYY-MM-DD"));
    if (date.format("YYYYMM") !== currentMonth) {
      setMonthData([]);
      monthToNotes(date.format("YYYYMM"));
      setCurrentMonth(date.format("YYYYMM"));
    }
  };

  const onPanelChange = (date) => {
    // setMonthData([]);
  };

  const getListData = (value) => {
    let listData = [];
    monthdata.map((note) => {
      if (note.date === value) {
        listData.push(note);
      }
    });
    return listData;
  };

  const getNote_arweave = async (date, txId) => {
    const transaction = await database.getData(txId)
    if (transaction) {
      const decrypted = await database.decryptByPrivateKey(
        transaction,
        JSON.parse(localStorage.getItem("mnemonicPhrase"))
      );
      setMonthData((prev) => [
        ...prev,
        {
          date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`,
          title: "",
          content: decrypted,
        },
      ]);
    } else {
      setMonthData((prev) => [
        ...prev,
        {
          date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`,
          title: "",
          content: "<Now pending...>",
        },
      ]);
    }
  };

  const monthToNotes = (month) => {
    alchemy.monthToNotes(ethereum, account, month).then((encodedResult) => {
      const arr = alchemy.interface.decodeFunctionResult(
        alchemy.interface.functions["monthToNotes(uint256)"],
        encodedResult
      );
      arr.map((element) => {
        element.map((item) => {
          getNote_arweave(item[0], item[1]);
        });
      });
    });
  };

  useEffect(() => {
    setMonthData([]);
    monthToNotes(dayjs().format("YYYYMM"));
  }, []);

  const viewNote = (e) => {
    setModalFocus({
      title: e.target.parentNode.value,
      notes: getListData(e.target.parentNode.value),
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (modalFocus.notes.length !== 0) {
      setIsModalOpen(true);
    }
  }, [modalFocus]);

  // const genExtra = () => <SendOutlined onClick={handleShare} />;
  // const handleShare = () => {
  //   console.log("share");
  // };

  const dateCellRender = (value) => {
    const num = getListData(value.format("YYYY-MM-DD"));
    if (value < dayjs().endOf("day")) {
      return num.length !== 0 ? (
        <div
          className="notes-month"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <>
            <Button
              className="viewButton"
              value={value.format("YYYY-MM-DD")}
              key={value.format("YYYY-MM-DD")}
              onClick={(e) => viewNote(e)}
            >
              <p style={{ fontSize: 15 }}>View</p>
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

  const monthCellRender = (value) => {
    // monthToNotes(value.format("YYYYMM"));
  };

  return (
    <Layout className="site-layout">
      <div className="site-calendar-demo-card">
        <Modal
          open={isModalOpen}
          title={[<div style={{ fontSize: 30 }}>{modalFocus.title}</div>]}
          footer={[
            <Button key="Ok" onClick={handleOk} style={{ marginTop: 10 }}>
              Close
            </Button>,
          ]}
          closeIcon={[]}
          width={"40%"}
        >
          <Collapse
            bordered={false}
            style={{ backgroundColor: "white" }}
            expandIconPosition={"end"}
          >
            {modalFocus.notes.map((item, i) => (
              <>
                <Panel
                  header={item.title === "" ? "Note" : item.title}
                  key={i}
                  // extra={genExtra()}
                  style={{
                    border: "#1677FF solid 2px",
                    margin: 10,
                    borderRadius: 20,
                  }}
                >
                  <p>{item.content}</p>
                </Panel>
              </>
            ))}
          </Collapse>
        </Modal>
        <div>
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            disabledDate={disabledDate}
            onChange={onChange}
            onPanelChange={onPanelChange}
            headerRender={({ value, onChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];
              let current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current = current.month(i);
                months.push(localeData.monthsShort(current));
              }
              for (let i = start; i < end; i++) {
                monthOptions.push(
                  <Select.Option key={i} value={i} className="month-item">
                    {months[i]}
                  </Select.Option>
                );
              }
              const year = value.year();
              const month = value.month();
              const options = [];
              for (let i = dayjs().year() - 3; i < dayjs().year() + 1; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>
                );
              }
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    height: 54,
                    paddingRight: 10,
                  }}
                >
                  {/* <div
                    style={{
                      color: "#1677FF",
                      fontSize: 15,
                      border: "2px solid #1677FF",
                      borderRadius: 20,
                      paddingLeft: 15,
                      paddingRight: 15,
                      // marginLeft: 50,
                    }}
                  >
                    {value.format("MMMM")}
                  </div> */}
                  <Row gutter={8}>
                    {/* <Col>
                    <Radio.Group
                      size="small"
                      onChange={(e) => onTypeChange(e.target.value)}
                      value={type}
                    >
                      <Radio.Button value="month">Month</Radio.Button>
                      <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>
                  </Col> */}

                    <Col>
                      <Select
                        size="middle"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        value={year}
                        onChange={(newYear) => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                      >
                        {options}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size="middle"
                        dropdownMatchSelectWidth={false}
                        value={month}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
export default CalendarView;
