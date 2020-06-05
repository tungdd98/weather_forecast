const DATA = {
  "attrs": [
    {
      "name": "Nhiệt độ",
      "value": ["t.cao", "t.trung bình", "t.thấp"]
    },
    {
      "name": "Độ ẩm",
      "value": ["d.cao", "d.trung bình", "d.thấp"]
    },
    {
      "name": "Mây",
      "value": ["nhiều", "ít"]
    },
    {
      "name": "Gió",
      "value": ["mạnh", "nhẹ"]
    },
    {
      "name": "Thời tiết",
      "value": ["mưa", "nắng nóng", "mát mẻ", "lạnh"]
    }
  ],
  "data": [
    // ["cao", "cao", "", "mạnh", "mát mẻ"],// 1
    ["t.cao", "d.cao", "nhiều", "mạnh", "mát mẻ"],
    ["t.cao", "d.cao", "ít", "mạnh", "mát mẻ"],

    // ["cao", "cao", "", "nhẹ", "nắng nóng"], // 2
    ["t.cao", "d.cao", "nhiều", "nhẹ", "nắng nóng"], 
    ["t.cao", "d.cao", "ít", "nhẹ", "nắng nóng"], 

    // ["cao", "trung bình", "nhiều", "", "mưa"], // 3
    ["t.cao", "d.trung bình", "nhiều", "mạnh", "mưa"], 
    ["t.cao", "d.trung bình", "nhiều", "nhẹ", "mưa"], 

    // ["cao", "trung bình", "ít", "", "nắng nóng"], // 4
    ["t.cao", "d.trung bình", "ít", "mạnh", "nắng nóng"], 
    ["t.cao", "d.trung bình", "ít", "nhẹ", "nắng nóng"], 

    ["t.cao", "d.thấp", "", "", "nắng nóng"], // 5

    // ["trung bình", "", "nhiều", "mạnh", "mưa"], // 6
    ["t.trung bình", "d.cao", "nhiều", "mạnh", "mưa"], 
    ["t.trung bình", "d.trung bình", "nhiều", "mạnh", "mưa"], 
    ["t.trung bình", "d.thấp", "nhiều", "mạnh", "mưa"], 

    // ["trung bình", "", "nhiều", "nhẹ", "mát mẻ"], // 7
    ["t.trung bình", "d.cao", "nhiều", "nhẹ", "mát mẻ"],
    ["t.trung bình", "d.trung bình", "nhiều", "nhẹ", "mát mẻ"],

    // ["trung bình", "thấp", "ít", "", "mát mẻ"], // 8
    ["t.trung bình", "d.thấp", "ít", "mạnh", "mát mẻ"], // 8
    ["t.trung bình", "d.cao", "ít", "nhẹ", "mát mẻ"], // 8
    ["t.trung bình", "d.trung bình", "ít", "mạnh", "mát mẻ"], // 8

    // ["thấp", "", "", "mạnh", "lạnh"], // 9
    ["t.thấp", "d.cao", "nhiều", "mạnh", "lạnh"], // 9
    ["t.thấp", "d.cao", "ít", "mạnh", "lạnh"], // 9
    ["t.thấp", "d.thấp", "ít", "mạnh", "lạnh"], // 9
    ["t.thấp", "d.trung bình", "ít", "mạnh", "lạnh"], // 9
    ["t.thấp", "d.trung bình", "nhiều", "mạnh", "lạnh"], // 9
    ["t.thấp", "d.thấp", "nhiều", "mạnh", "lạnh"], // 9

    // ["thấp", "", "nhiều", "nhẹ", "lạnh"], // 10
    ["t.thấp", "d.cao", "nhiều", "nhẹ", "lạnh"], 
    ["t.thấp", "d.trung bình", "nhiều", "nhẹ", "lạnh"], 
    ["t.thấp", "d.thấp", "nhiều", "nhẹ", "lạnh"], 

    // ["thấp", "", "ít", "nhẹ", "mát mẻ"], // 11
    ["t.thấp", "d.cao", "ít", "nhẹ", "mát mẻ"], 
    ["t.thấp", "d.trung bình", "ít", "nhẹ", "mát mẻ"], 
    ["t.thấp", "d.thấp", "ít", "nhẹ", "mát mẻ"], 
  ],
  "target": ["mưa", "nắng nóng", "mát mẻ", "lạnh"]
}
export default DATA