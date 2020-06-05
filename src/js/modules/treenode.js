/** 
 * Mô tả cây cần tạo
 * @author tungdd
 *  
 */
class TreeNode {
  constructor(attrs = []) {
    this._n           = 0
    this._numberLabel = 0
    this._childs      = null
    this._attrs       = attrs
  }
  get n() {
    return this._n
  }
  set n(n) {
    this._n = n
  }
  get numberLabel() {
    return this._numberLabel
  }
  set numberLabel(numberLabel) {
    this._numberLabel = numberLabel
  }
  get childs() {
    return this._childs
  }
  set childs(childs) {
    this._childs = childs
  }
  get attrs() {
    return this._attrs
  }
  set attrs(attrs) {
    this._attrs = attrs
  }
  init() {
    this.childs = []
    for(let i in this.attrs.value) {
      this.childs[i] = new TreeNode()
    }
    this.numberLabel = this.attrs.value.length == 0 ? 1 : 0
  }
  addNode(child) {
    if(this.n < this.childs.length) {
      this.childs[this.n] = child
      this.numberLabel    = this.numberLabel + child.numberLabel
    }
    this.n++
  }
}

export default TreeNode