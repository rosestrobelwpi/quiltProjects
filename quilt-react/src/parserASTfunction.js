//here we will write the parser!

//TAGS for Types
TAG_RECT = "RECT"
TAG_NAT = "NAT"
//changed as there is already a Rot class in the expressions
TAG_ROTATION = "ROTATION"
TAG_PIXEL = "PIXEL"
TAG_DEPENDENT_FUNC = "DEPENDENT_FUNC"
TAG_IDENTITY = "IDENTITY"
TAG_TYPE_EQUALITY = "TYPE_EQUALITY"

//TAGS for Values
TAG_LAMBDA = "LAMBDA"
TAG_PIX = "PIX"
TAG_COLORS = "COLORS"
TAG_NAT_NUM = "NAT_NUM"
TAG_ZERO = "ZERO"
TAG_NINETY = "NINETY"
TAG_ONE_EIGHTY = "ONE_EIGHTY"
TAG_TWO_SEVENTY = "TWO_SEVENTY"
TAG_REFL = "REFL"

//TAGS for Expressions
TAG_VALUE = "VALUE"
TAG_VARIABLE = "VARIABLE"
TAG_SIDE_BY_SIDE = "SIDE_BY_SIDE"
TAG_SOLID = "SOLID"
TAG_HOR = "HOR"
TAG_VERT = "VERT"
TAG_OVER = "OVER"
TAG_REPX = "REPX"
TAG_REPY = "REPY"
TAG_ROT = "ROT"
TAG_PLUS = "PLUS"
TAG_TIMES = "TIMES"
TAG_BUG = "BUG"

TAG_VAR_CALL = "VAR_CALL"
TAG_ARG = "ARG"
TAG_IDENTIFIER = "IDENTIFIER"
TAG_COLOR = "COLOR"
TAG_PROGRAM = "PROGRAM"
TAG_ASSIGNMENT = "ASSIGNMENT"
TAG_FUN_CALL = "FUN_CALL"
TAG_FUNC = "FUNC"

// class ASTNode {
// //abstract class for js?
//     tag = TAG_BUG;
// }

//TYPES
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
    this.red = r
    this.green = g
    this.blue = b
    this.alpha = a
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


//VALUES
function Lambda(x, t, e) {
    this.tag = TAG_LAMBDA;
    this.x = x;
    this.t = t;
    this.e = e;
}

//diff naming convention for this one
function Pix(r, g, b, a) {
    this.tag = TAG_PIX;
    this.red = r
    this.green = g
    this.blue = b
    this.alpha = a
}

//diff naming convention for this one
function Colors(r, g, b, a) {
    this.tag = TAG_COLORS;
    this.red = r
    this.green = g
    this.blue = b
    this.alpha = a
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


//EXPRESSIONS
function Value(v) {
    this.tag = TAG_VALUE;
    this.value = v;
}

function Variable(t, n, v) {
    this.tag = TAG_VARIABLE;
    this.type = t;
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

function RepX(v, d) {
    this.tag = TAG_REPX;
    this.value = v;
    this.design = d;
}

function RepY(v, d) {
    this.tag = TAG_REPY;
    this.value = v;
    this.design = d;
}

function Rot(a, d) {
    this.tag = TAG_ROT;
    this.angle = a;
    this.design = d;
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

function VarCall(n) {
    this.tag = TAG_VAR_CALL;
    this.name = n;
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

function Program(d, q) {
    this.tag = TAG_PROGRAM;
    this.definitions = d;
    this.quilt = q;
}

function Assignment(n, v) {
    this.tag = TAG_ASSIGNMENT;
    this.name = n;
    this.value = v;
}

function FunCall(n, a) {
    this.tag = TAG_FUN_CALL;
    this.name = n;
    this.args = a;
}

function Func(n, a, b) {
    this.tag = TAG_FUNC;
    this.name = n;
    this.args = a;
    this.body = b;
}

function expr_size (expr) {
    switch (expr.tag) {
        //TYPES
        case TAG_RECT:
            return expr_size(expr.width) + expr_size(expr.height) + expr_size(this.color) + 1;
            break;
        case TAG_NAT:
            return 1;
            break;
        case TAG_ROT:
            return 1;
            break;
        case TAG_PIXEL:
            return expr_size(expr.red) + expr_size(expr.green) + expr_size(expr.blue) + expr_size(expr.alpha) + 1;
            break;

        //declaration?
        case TAG_DEPENDENT_FUNC:
            return expr_size(expr.name) + expr_size(expr.args) + expr_size(expr.body) + 1; 
            break;

        case TAG_IDENTITY:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
            break;
        case TAG_TYPE_EQUALITY:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
            break;
        case TAG_LAMBDA:
            return expr_size(expr.x) + expr_size(expr.t) + expr_size(expr.e) + 1;
            break;
        case TAG_PIX:
            return expr_size(expr.red) + expr_size(expr.green) + expr_size(expr.blue) + expr_size(expr.alpha) + 1;
            break;
        case TAG_COLORS:
            return expr_size(expr.red) + expr_size(expr.green) + expr_size(expr.blue) + expr_size(expr.alpha) + 1;
            break;
        case TAG_NAT_NUM:
            return 1;
            break;
        case TAG_ZERO:
            return 1;
            break;
        case TAG_NINETY:
            return 1;
            break;
        case TAG_ONE_EIGHTY:
            return 1;
            break;
        case TAG_TWO_SEVENTY:
            return 1;
            break;
        case TAG_REFL:
            return expr_size(expr.value) + 1;
            break;
        case TAG_VALUE:
            return 1;
            break;

        //declaration??
        case TAG_VARIABLE:
            return expr_size(expr.type) + expr_size(expr.name) + expr_size(expr.value) + 1;
            break;

        case TAG_SIDE_BY_SIDE:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
            break;
        case TAG_SOLID:
            return expr_size(expr.width) + expr_size(expr.height) + expr_size(expr.color) + 1;
            break;
        case TAG_HOR:
            return expr_size(expr.design) + 1;
            break;
        case TAG_VERT:
            return expr_size(expr.design) + 1;
            break;
        case TAG_OVER:
            return expr_size(expr.anchor) + expr_size(expr.design) + 1;
            break;
        case TAG_REPX:
            return expr_size(expr.value) + expr_size(expr.design) + 1;
            break;
        case TAG_REPY:
            return expr_size(expr.value) + expr_size(expr.design) + 1;
            break;
        case TAG_ROT:
            return expr_size(expr.angle) + expr_size(expr.design) + 1;
            break;
        case TAG_PLUS:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
            break;
        case TAG_TIMES:
            return expr_size(expr.left) + expr_size(expr.right) + 1;
            break;
        case TAG_VAR_CALL:
            return expr_size(expr.name) + 1;
            break;
        case TAG_ARG:
            return expr_size(expr.name) + expr_size(expr.type) + 1;
            break;
        case TAG_IDENTIFIER:
            return expr_size(expr.name) + 1;
            break;
        case TAG_COLOR:
            return expr_size(expr.name) + 1;
            break;
        case TAG_PROGRAM:
            return expr_size(expr.definitions) + expr_size(expr.quilt) + 1;
        case TAG_ASSIGNMENT:
            return expr_size(expr.name) + expr_size(expr.value) + 1;
        case TAG_FUN_CALL:
            return expr_size(expr.name) + expr_size(expr.args) + 1;
        case TAG_FUNC:
            return expr_size(expr.name) + expr_size(expr.args) + expr_size(expr.body) + 1;
    }
}

module.exports = { Rect, Nat, Rotation, Pixel, DependentFunc, Identity, TypeEquality,
                   Lambda, Pix, Colors, NatNum, Zero, Ninety, OneEighty, TwoSeventy, Refl,
                   Value, Variable, SideBySide, Solid, Hor, Vert, Over, RepX, RepY, Rot, Plus, Times, VarCall, Arg, Identifier, Color, Program, Assignment, FunCall, Func}