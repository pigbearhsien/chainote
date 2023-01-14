export const base64converter = (converted) => {
  const mapper = {
    "-": "+",
    _: "/",
  };
  return converted.replace(/[-_]/g, (m) => mapper[m]);
};

export const parseTime = (origin) => {
  const splited = origin.toString().split(" ");

  const month = splited[1];
  const day = splited[2];
  const year = splited[3];

  const result = year + monthMapper[month] + day;

  return result;
};

const monthMapper = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};
