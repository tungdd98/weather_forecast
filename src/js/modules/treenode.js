/** 
 * Mô tả cây cần tạo
 * @author tungdd
 *  
 */
class TreeNode {
  constructor(attrs = []) {
    this._n           = 0
    this._childs      = null
    this._attrs       = attrs
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
  }
  addNode(child) {
    if(this.n < this.childs.length) {
      this.childs[this.n] = child
    }
    this.n++
  }
}

export default TreeNode