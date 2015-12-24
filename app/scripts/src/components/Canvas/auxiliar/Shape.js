import AABB from './AABB';

class Shape extends createjs.Shape {
  setAABB() {

    var aabb = new AABB(Object.assign({},this));

    var
      width = aabb.width,
      height = aabb.height,
      topLeft = Object.assign({}, aabb.topLeft);

    this.setBounds(topLeft.x, topLeft.y, width, height);

    return this;
  }
}

export default Shape;
