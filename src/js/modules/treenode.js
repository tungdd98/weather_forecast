/** 
 * Mô tả nút cây cần tạo
 * @author tungdd
 *  
 */
class TreeNode {
  /**
   * n: số nhánh của của nút
   * attr: thuộc tính đang được biểu diễn ở nút đó
   * childs: danh sách nút con của nút đó
   * @param {*} attr 
   */
  constructor(attr) {
    this._n           = 0 
    this._childs      = null
    this._attr        = attr
  }
  get n() {
    return this._n
  }
  set n(n) {
    this._n = n
  }
  get childs() {
    return this._childs
  }
  set childs(childs) {
    this._childs = childs
  }
  get attr() {
    return this._attr
  }
  set attr(attr) {
    this._attr = attr
  }
  /**
   * Hàm khởi tạo nút
   */
  init() {
    this.childs = []
    for(let i in this.attr.value) {
      this.childs[i] = new TreeNode()
    }
  }
  /**
   * Hàm thêm nút mới vào nút hiện tại
   * @param {*} child 
   */
  addNode(child) {
    if(this.n < this.childs.length) {
      this.childs[this.n] = child
    }
    this.n++
  }
}

export default TreeNode