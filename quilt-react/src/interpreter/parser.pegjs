{
  class Plus {
    constructor(left, right) {
      this.tag = "PLUS";
      this.left = left;
      this.right = right;
    }
  }

  class Times {
    constructor(left, right) {
      this.tag = "TIMES";
      this.left = left;
      this.right = right;
    }
  }

  class Rect {
    constructor(width, height, color) {
      this.tag = "RECT";
      this.width = width;
      this.height = height;
      this.color = color;
    }
  }

  class Hor {
    constructor(left, right) {
      this.tag = "HOR";
      this.left = left;
      this.right = right;
    }
  }

  class Vert {
    constructor(left, right) {
      this.tag = "VERT";
      this.left = left;
      this.right = right;
    }
  }
}

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce((result, element) => {
        if (element[1] === "+") return new Plus(result, element[3]);
        if (element[1] === "-") return result - element[3];
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce((result, element) => {
        if (element[1] === "*") return new Times(result, element[3]);
        if (element[1] === "/") return result / element[3];
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Integer
  / Rectangle
  / RectExpr

RectExpr
  = "hor" _ "(" shape1:RectObj ")" _ "(" shape2:RectObj ")" {
      return new Hor(shape1, shape2);
    }
  / "vert" _ "(" shape1:RectObj ")" _ "(" shape2:RectObj ")" {
      return new Vert(shape1, shape2);
    }

RectObj
  = Rectangle
  / RectExpr  // Allow nested RectExpr compositions

Rectangle
  = "rect" _ width:Integer _ height:Integer _ color:Color {
      return new Rect(width, height, color);
    }

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

Color
  = "Red" { return "Red"; }
  / "Orange" { return "Orange"; }
  / "Yellow" { return "Yellow"; }
  / "Green" { return "Green"; }
  / "Blue" { return "Blue"; }
  / "Purple" { return "Purple"; }
  / "Pink" { return "Pink"; }
  / "Brown" { return "Brown"; }
  / "Gray" { return "Gray"; }
  / "Black" { return "Black"; }
  / "White" { return "White"; }

_ "whitespace"
  = [ \t\n\r]*
