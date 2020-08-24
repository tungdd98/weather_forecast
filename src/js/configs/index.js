const configs = {
  temp: {
    cao: { min: 30 },
    "trung bình": { min: 20, max: 29 },
    thấp: { max: 19 },
  },
  humidity: {
    cao: { min: 80, max: 100 },
    "trung bình": { min: 40, max: 79 },
    thấp: { min: 0, max: 39 },
  },
  clouds: {
    nhiều: { min: 30, max: 100 },
    ít: { min: 0, max: 29 },
  },
  wind: {
    mạnh: { min: 10 },
    nhẹ: { max: 9 },
  },
};

export default configs;
