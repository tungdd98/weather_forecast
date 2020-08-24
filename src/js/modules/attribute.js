/**
 * Mô tả thuộc tính cần xét
 * @author tungdd
 *
 */
class Attribute {
  /**
   *
   * @param {*} name tên thuộc tính
   * @param {*} value các giá trị của thuộc tính
   */
  constructor(name, value) {
    this._name = name;
    this._value = value;
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  addValue(value) {
    if (!this.value.includes(value)) this.value.push(value);
  }
}

export default Attribute;
