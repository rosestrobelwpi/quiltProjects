// here we will write the parser!

// TAGS for Types
const TAG_RECT = "RECT";
const TAG_NAT = "NAT";
const TAG_ROTATION = "ROTATION"; // changed as there is already a Rot class in the expressions
const TAG_PIXEL = "PIXEL";
const TAG_DEPENDENT_FUNC = "DEPENDENT_FUNC";
const TAG_IDENTITY = "IDENTITY";
const TAG_TYPE_EQUALITY = "TYPE_EQUALITY";

// TAGS for Values
const TAG_LAMBDA = "LAMBDA";
const TAG_PIX = "PIX";
const TAG_COLORS = "COLORS";
const TAG_NAT_NUM = "NAT_NUM";
const TAG_ZERO = "ZERO";
const TAG_NINETY = "NINETY";
const TAG_ONE_EIGHTY = "ONE_EIGHTY";
const TAG_TWO_SEVENTY = "TWO_SEVENTY";
const TAG_REFL = "REFL";

// TAGS for Expressions
const TAG_VALUE = "VALUE";
const TAG_VARIABLE = "VARIABLE";
const TAG_SIDE_BY_SIDE = "SIDE_BY_SIDE";
const TAG_SOLID = "SOLID";
const TAG_HOR = "HOR";
const TAG_VERT = "VERT";
const TAG_OVER = "OVER";
const TAG_REP = "REP";
const TAG_ROT = "ROT";
const TAG_PLUS = "PLUS";
const TAG_TIMES = "TIMES";
const TAG_BUG = "BUG";
const TAG_VAR_CALL = "VAR_CALL";
const TAG_ARG = "ARG";
const TAG_IDENTIFIER = "IDENTIFIER";
const TAG_COLOR = "COLOR";

// Types
function Rect(w, h, c) {
    this.tag = TAG_RECT;
    this.width = w;
    this.height = h;
    this.color = c;
}

function Nat(v) {
    this.tag = TAG_NAT;
    this.value = v;
}

function Rotation(v) {
    this.tag = TAG_ROTATION;
    this.value = v;
}

function Pixel(r, g, b, a) {
    this.tag = TAG_PIXEL;
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
}

function DependentFunc(n, a, b) {
    this.tag = TAG_DEPENDENT_FUNC;
    this.name = n;
    this.args = a;
    this.body = b;
}

function Identity(l, r) {
    this.tag = TAG_IDENTITY;
    this.left = l;
    this.right = r;
}

function TypeEquality(l, r) {
    this.tag = TAG_TYPE_EQUALITY;
    this.left = l;
    this.right = r;
}

// Values
function Lambda(x, t, e) {
    this.tag = TAG_LAMBDA;
    this.x = x;
    this.t = t;
    this.e = e;
}

function Pix(r, g, b, a) {
    this.tag = TAG_PIX;
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
}

function Colors(r, g, b, a) {
    this.tag = TAG_COLORS;
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
}

function NatNum(v) {
    this.tag = TAG_NAT_NUM;
    this.value = v;
}

function Zero(v) {
    this.tag = TAG_ZERO;
    this.value = v;
}

function Ninety(v) {
    this.tag = TAG_NINETY;
    this.value = v;
}

function OneEighty(v) {
    this.tag = TAG_ONE_EIGHTY;
    this.value = v;
}

function TwoSeventy(v) {
    this.tag = TAG_TWO_SEVENTY;
    this.value = v;
}

function Refl(v) {
    this.tag = TAG_REFL;
    this.value = v;
}

// Expressions
function Value(v) {
    this.tag = TAG_VALUE;
    this.value = v;
}

function Variable(n, v) {
    this.tag = TAG_VARIABLE;
    this.name = n;
    this.value = v;
}

function SideBySide(l, r) {
    this.tag = TAG_SIDE_BY_SIDE;
    this.left = l;
    this.right = r;
}

function Solid(w, h, c) {
    this.tag = TAG_SOLID;
    this.width = w;
    this.height = h;
    this.color = c;
}

function Hor(d) {
    this.tag = TAG_HOR;
    this.design = d;
}

function Vert(d) {
    this.tag = TAG_VERT;
    this.design = d;
}

function Over(a, d) {
    this.tag = TAG_OVER;
    this.anchor = a;
    this.design = d;
}

function Rep(l, r) {
    this.tag = TAG_REP;
    this.left = l;
    this.right = r;
}

function Rot(l, r) {
    this.tag = TAG_ROT;
    this.left = l;
    this.right = r;
}

function Plus(l, r) {
    this.tag = TAG_PLUS;
    this.left = l;
    this.right = r;
}

function Times(l, r) {
    this.tag = TAG_TIMES;
    this.left = l;
    this.right = r;
}

function VarCall(n, v) {
    this.tag = TAG_VAR_CALL;
    this.name = n;
    this.value = v;
}

function Arg(n, t) {
    this.tag = TAG_ARG;
    this.name = n;
    this.type = t;
}

function Identifier(n) {
    this.tag = TAG_IDENTIFIER;
    this.name = n;
}

function Color(n) {
    this.tag = TAG_COLOR;
    this.name = n;
}

function expr_size(expr) {
    switch (expr.tag) {
        case TAG_RECT:
            return expr_size(expr.width) + expr_size(expr.height) + expr_size(this.color) + 1;
        case TAG_NAT:
            return 1;
        case TAG_ROT:
            return 1;
        case TAG_PIXEL:
            return expr_size(expr.red) + expr_size(expr.green) + expr_size(expr.blue) + expr_size(expr.alpha) + 1;
        case TAG_DEPENDENT_FUNC:
            return expr_size(expr.name) + expr_size(expr.args) + expr_size(expr.body) + 1;
        case TAG_IDENTITY:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
        case TAG_TYPE_EQUALITY:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
        case TAG_LAMBDA:
            return expr_size(expr.x) + expr_size(expr.t) + expr_size(expr.e) + 1;
        case TAG_PIX:
        case TAG_COLORS:
            return expr_size(expr.red) + expr_size(expr.green) + expr_size(expr.blue) + expr_size(expr.alpha) + 1;
        case TAG_NAT_NUM:
        case TAG_ZERO:
        case TAG_NINETY:
        case TAG_ONE_EIGHTY:
        case TAG_TWO_SEVENTY:
            return 1;
        case TAG_REFL:
            return expr_size(expr.value) + 1;
        case TAG_VALUE:
            return 1;
        case TAG_VARIABLE:
            return expr_size(expr.name) + expr_size(expr.value);
        case TAG_SIDE_BY_SIDE:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
        case TAG_SOLID:
            return expr_size(expr.width) + expr_size(expr.height) + expr_size(expr.color) + 1;
        case TAG_HOR:
        case TAG_VERT:
            return expr_size(expr.design) + 1;
        case TAG_OVER:
            return expr_size(expr.anchor) + expr_size(expr.design) + 1;
        case TAG_REP:
        case TAG_ROT:
        case TAG_PLUS:
        case TAG_TIMES:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
        case TAG_VAR_CALL:
            return expr_size(expr.name) + expr_size(expr.value) + 1;
        case TAG_ARG:
            return expr_size(expr.name) + expr_size(expr.type) + 1;
        case TAG_IDENTIFIER:
        case TAG_COLOR:
            return expr_size(expr.name) + 1;
    }
}

// Export all tags and classes
module.exports = { 
    TAG_RECT, TAG_NAT, TAG_ROTATION, TAG_PIXEL, TAG_DEPENDENT_FUNC, TAG_IDENTITY, TAG_TYPE_EQUALITY,
    TAG_LAMBDA, TAG_PIX, TAG_COLORS, TAG_NAT_NUM, TAG_ZERO, TAG_NINETY, TAG_ONE_EIGHTY, TAG_TWO_SEVENTY, TAG_REFL,
    TAG_VALUE, TAG_VARIABLE, TAG_SIDE_BY_SIDE, TAG_SOLID, TAG_HOR, TAG_VERT, TAG_OVER, TAG_REP, TAG_ROT, TAG_PLUS,
    TAG_TIMES, TAG_BUG, TAG_VAR_CALL, TAG_ARG, TAG_IDENTIFIER, TAG_COLOR,
    Rect, Nat, Rotation, Pixel, DependentFunc, Identity, TypeEquality,
    Lambda, Pix, Colors, NatNum, Zero, Ninety, OneEighty, TwoSeventy, Refl,
    Value, Variable, SideBySide, Solid, Hor, Vert, Over, Rep, Rot, Plus, Times, VarCall, Arg, Identifier, Color
};
