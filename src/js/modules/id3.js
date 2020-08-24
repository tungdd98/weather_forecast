/**
 * Mô tả thuật toán
 * @author tungdd
 *
 */
import TreeNode from "./treenode.js";
import Attribute from "./attribute.js";

class TreeID3 {
  constructor(data = [], attrs = [], target = []) {
    this._data = data;
    this._attrs = attrs;
    this._target = target;
    this._solution = "";
    this._tree = null;
    this._depth = null;
  }

  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
  }
  get attrs() {
    return this._attrs;
  }
  set attrs(attrs) {
    this._attrs = attrs;
  }
  get target() {
    return this._target;
  }
  set target(target) {
    this._target = target;
  }
  get solution() {
    return this._solution;
  }
  set solution(solution) {
    this._solution = solution;
  }
  get tree() {
    return this._tree;
  }
  set tree(tree) {
    this._tree = tree;
  }
  get depth() {
    return this._depth;
  }
  set depth(depth) {
    this._depth = depth;
  }

  /**
   * Tính entropy
   * @param {*} arrayValue
   */
  entropy(arrayValue = []) {
    const size = arrayValue.length;
    let isCheckEntropy1 = true;
    let isCheckEntropy0 = 0;

    for (let i = 0; i < size - 1; i++) {
      for (let j = i + 1; j < size; j++) {
        if (arrayValue[i] !== arrayValue[j]) {
          isCheckEntropy1 = false;
          break;
        }
      }
    }

    if (isCheckEntropy1) {
      return 1;
    }

    for (let i = 0; i < size; i++) {
      if (arrayValue[i] === 0) {
        isCheckEntropy0++;
      }
    }

    if (isCheckEntropy0 === size - 1) {
      return 0;
    }

    const total = arrayValue.reduce((acc, cur) => (acc += cur), 0);
    const rates = arrayValue.map((elm) => parseFloat(elm / total), []);
    const entropy = rates.reduce((acc, cur) => {
      let valueCur = cur !== 0 ? -cur * Math.log2(cur) : 0;
      return (acc += valueCur);
    }, 0);

    return entropy;
  }

  /**
   * Tính gain từng thuộc tính
   * @param {*} data
   * @param {*} attr
   * @param {*} bestAt
   */
  gain(data = [], attr = null, bestAt = "") {
    const sizeTarget = this.target.length;
    const countBase = Array(sizeTarget).fill(0);
    const countAttr = [];
    const col = this.attrs.indexOf(attr);

    if (attr) {
      for (let i in attr.value) {
        countAttr[i] = Array(sizeTarget).fill(0);
      }
      for (let i in data) {
        let j = attr.value.indexOf(data[i][col]);

        if (j > -1) {
          let valTargetData = data[i][data[0].length - 1];
          let idx = this.target.indexOf(valTargetData);

          if (idx > -1) {
            countBase[idx]++;
            countAttr[j][idx]++;
          }
        }
      }
      const total = data.length;
      let result = this.entropy(countBase);

      for (let i in attr.value) {
        let rateValue =
          countAttr[i].reduce((acc, cur) => (acc += cur), 0) / total;
        result -= rateValue * this.entropy(countAttr[i]);
      }
      this.solution += `<div>Gain(${bestAt}, ${attr.name}) = ${result}</div>`;
      return result;
    }

    return 0;
  }

  /**
   * Tìm thuộc tính có gain cao nhất
   * @param {*} data
   * @param {*} attrs
   * @param {*} bestAt
   */
  getBestAttribute(data, attrs, bestAt) {
    let maxGain = this.gain(data, attrs[0], bestAt);
    let idxMax = 0;

    for (let i = 1; i < attrs.length - 1; i++) {
      let attr = attrs[i];
      let currGain = this.gain(data, attr, bestAt);
      if (maxGain < currGain) {
        maxGain = currGain;
        idxMax = i;
      }
    }
    this.solution =
      this.solution +
      `<div>=> Ta chọn thuộc tính tốt nhất là: ${attrs[idxMax].name}</div>`;

    return attrs[idxMax];
  }

  /**
   * Kiểm tra dữ liệu mục tiêu có còn trùng lặp hay không
   * Nếu tất cả đều thuộc cùng 1 lớp thì trả về nút lá có giá trị là lớp đấy
   * @param {*} data
   */
  isDuplicateData(data) {
    const newData = data.map((value) => value[value.length - 1]);
    const duplicateData = newData.filter(
      (value, index) => newData.indexOf(value) === index
    );

    if (duplicateData.length > 1) {
      return {
        ok: false,
        label: "",
      };
    }

    return {
      ok: true,
      label: duplicateData[0],
    };
  }

  /**
   * Giải thuật ID3
   * @param {*} data
   * @param {*} attrs
   * @param {*} bestAt
   */
  initID3(data, attrs, bestAt) {
    this.solution =
      this.solution +
      `<p class="text-center" style="font-size: 16px; border-bottom: 1px dashed #333; font-weight: 600">Xét nút ${bestAt}</p>`;
    if (this.isDuplicateData(data).ok) {
      let label = this.isDuplicateData(data).label;
      this.solution += `\nTrả về nút gốc với nhãn ${label}`;
      let branch = new TreeNode(new Attribute(label, []));
      branch.init();
      return branch;
    } else {
      // console.log('Vẫn còn giá trị trùng lặp')
    }
    if (attrs.length === 0) {
      this.solution += `\nCác thuộc tính rỗng => Trả về nút gốc có giá trị phổ biến nhất`;
      let branch = new TreeNode(new Attribute("", []));
      branch.init();
      return branch;
    }
    let bestAttr = this.getBestAttribute(data, attrs, bestAt);
    let idxMax = attrs.indexOf(bestAttr);
    let root = new TreeNode(bestAttr);
    root.init();

    for (let i in bestAttr.value) {
      const value = bestAttr.value[i];
      const dataNew = [];
      for (let j in data) {
        if (data[j][idxMax] === value && data[j][idxMax] !== "") {
          dataNew.push(data[j]);
        }
      }
      if (dataNew.length === 0) {
        this.solution += `\nCác thuộc tính rỗng => Trả về nút gốc có giá trị phổ biến nhất`;
        let branch = new TreeNode(new Attribute("", []));
        branch.init();
        // return branch
      } else {
        this.solution += "\n";
        attrs.splice(idxMax, 1, null);
        const copy = [...attrs];
        root.addNode(this.initID3(dataNew, copy, value));
      }
    }
    return root;
  }

  /**
   * Tính độ sâu của cây
   * @params tree
   * @return (int) depth
   */
  getDepth(tree) {
    let depth = 0;

    if (tree.childs && tree.childs.length === 0) return 1;
    if (tree.childs) {
      depth = this.getDepth(tree.childs[0]);
      for (let i = 1; i < tree.childs.length; i++) {
        let depthChild = this.getDepth(tree.childs[i]);
        if (depth < depthChild) depth = depthChild;
      }
      depth++;
    }

    return depth;
  }

  /**
   * Xây dựng cây
   * @param
   * @return
   */
  getTree() {
    this.solution = "";
    const attrs = [...this.attrs];
    const data = [...this.data];
    this.tree = this.initID3(data, attrs, "gốc");
    this.depth = this.getDepth(this.tree);
  }
}

export default TreeID3;
