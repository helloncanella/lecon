class AABB {
  constructor(shape) {
    var aabb, highest, lowest, point;

    switch (shape.name) {
      case 'selection':
      case 'stroke':
        var points = shape.points;

        points.forEach(function(element) {
          point = element;
          if (!lowest && !highest) {
            lowest = JSON.parse(JSON.stringify(point));
            highest = JSON.parse(JSON.stringify(point));
          }
          if (point.x > highest.x) {
            highest.x = point.x;
          }
          if (point.x < lowest.x) {
            lowest.x = point.x;
          }
          if (point.y > highest.y) {
            highest.y = point.y;
          }
          if (point.y < lowest.y) {
            lowest.y = point.y;
          }
        }, this);

        break;
    }
    this.topLeft = {
      x: lowest.x,
      y: lowest.y
    };
    this.width = highest.x - lowest.x;
    this.height = highest.y - lowest.y;
  }
}

export default AABB;
