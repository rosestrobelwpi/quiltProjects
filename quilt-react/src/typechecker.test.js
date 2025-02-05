import typecheck from './typechecker.js';
import parser from './parser.js';

//add comments with intent
//tests for error messages as well

//rect correct
test("rect correct", () => {
    expect(typecheck(parser.parse("rect(1,1,red);"))).toEqual("RECT");
});

//rect incorrect values
test("rectangle bad vals", () => {
    expect(() => { typecheck(parser.parse("rect(1,red,red);"))} ).toThrow();
});

//rect incorrect color
test("rectangle bad color", () => {
    expect(() => { typecheck(parser.parse("rect(1,1, yuuuck);"))} ).toThrow();
});

//rect with int vars correct
test("rect with var inputs correct", () => {
    expect(typecheck(parser.parse("int a = 3; int b = 4; rect(a, b, red);"))).toEqual("RECT");
});


//rect with int vars incorrect
test("rect with vars incorrect", () => {
    expect(() => { typecheck(parser.parse("int a = 3; rect b = rect(1, 2, blue); rect(a, b, red);"))}  ).toThrow();
});

//rectangles with plus and times are good w parens
test("rects with plus and times are good w parens", () => {
    expect(typecheck(parser.parse("rect((3*2), (4+1), blue);"))).toEqual("RECT");
});

//rectangles with plus and times are good w parens
test("rects +* good w vars", () => {
    expect(typecheck(parser.parse("int y = 3; int b = 1; rect((b*2), (4+y), blue);"))).toEqual("RECT");
});

//rects *+ bad w vars
test("rects +* bad w vars", () => {
    expect(() => { typecheck(parser.parse("int y = 3; int b = 1; rect m = rect(1,b,red); rect((b*2), (4+m), blue);"))}  ).toThrow();
});







//hor good
test("hor good", () => {
    expect(typecheck(parser.parse("(hor(rect(1,2,red),rect(1,2,blue)));"))).toEqual("RECT");
});

//hor good verts inside
test("hor good verts inside", () => {
    expect(typecheck(parser.parse("hor(vert(rect(1,2,red),rect(1,2,blue)),vert(rect(1,2,red),rect(1,2,blue)),vert(rect(1,2,blue),rect(1,2,green)));"))).toEqual("RECT");
});

//hor good verts inside plus vars
test("hor good verts inside and vars", () => {
    expect(typecheck(parser.parse("int x = 3; rect y = rect(1,2,blue); hor(vert(y,y),vert(rect(x,x,red),rect(1,2,blue)),vert(rect(1,2,red),rect(1,2,blue)),vert(rect(1,2,blue),rect(1,2,green)));"))).toEqual("RECT");
});

//hor bad verts inside plus vars
test("hor bad verts inside plus vars", () => {
    expect(() => { typecheck(parser.parse("int x = 3; rect y = rect(1,2,blue); hor(vert(x,y),vert(rect(x,x,red),rect(1,2,blue)),vert(rect(1,2,red),rect(1,2,blue)),vert(rect(1,2,blue),rect(1,2,green)));"))}  ).toThrow();
});

//var hor good verts inside plus vars
test("var hor good verts inside and vars", () => {
    expect(typecheck(parser.parse("int x = 3; rect y = rect(1,2,blue); rect wow = hor(vert(y,y),vert(rect(x,x,red),rect(1,2,blue)),vert(rect(1,2,red),rect(1,2,blue)),vert(rect(1,2,blue),rect(1,2,green))); vert(wow, wow);"))).toEqual("RECT");
});

//hor good func
test("hor good func", () => {
    expect(typecheck(parser.parse("define func(rect x, rect y) {hor(x, y);}func(rect(1, 2, blue), rect(1, 2, red));"))).toEqual("RECT");
});




//the same tests but with verts
//vert good
test("vert good", () => {
    expect(typecheck(parser.parse("(vert(rect(1,2,red),rect(1,2,blue)));"))).toEqual("RECT");
});

//verts good hors inside
test("verts good hors inside", () => {
    expect(typecheck(parser.parse("vert(hor(rect(1,2,red),rect(1,2,blue)),hor(rect(1,2,red),rect(1,2,blue)),hor(rect(1,2,blue),rect(1,2,green)));"))).toEqual("RECT");
});

//vert good hors inside plus vars
test("vert good hor inside and vars", () => {
    expect(typecheck(parser.parse("int x = 3; rect y = rect(1,2,blue); vert(hor(y,y),hor(rect(x,x,red),rect(1,2,blue)),hor(rect(1,2,red),rect(1,2,blue)),hor(rect(1,2,blue),rect(1,2,green)));"))).toEqual("RECT");
});

//vert bad hors inside plus vars
test("vert bad hors inside plus vars", () => {
    expect(() => { typecheck(parser.parse("int x = 3; rect y = rect(1,2,blue); vert(hor(x,y),hor(rect(x,x,red),rect(1,2,blue)),hor(rect(1,2,red),rect(1,2,blue)),hor(rect(1,2,blue),rect(1,2,green)));"))}  ).toThrow();
});

//var vert good verts inside plus vars
test("var vert good verts inside and vars", () => {
    expect(typecheck(parser.parse("int x = 3; rect y = rect(1,2,blue); rect wow = vert(hor(y,y),hor(rect(x,x,red),rect(1,2,blue)),hor(rect(1,2,red),rect(1,2,blue)),hor(rect(1,2,blue),rect(1,2,green))); hor(wow, wow);"))).toEqual("RECT");
});

//vert good func
test("vert good func", () => {
    expect(typecheck(parser.parse("define func(rect x, rect y) {vert(x, y);}func(rect(1, 2, blue), rect(1, 2, red));"))).toEqual("RECT");
});






//over good
test("over good", () => {
    expect(typecheck(parser.parse("over(TL, vert(rect(1,2,red),rect(1,2,blue)));"))).toEqual("RECT");
});

//over vars good
test("over vars good", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); over(BL, hor(x,rect(1,2,blue)));"))).toEqual("RECT");
});

//over vars good 1 rect
test("over vars good 1 rect", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); over(C, x);"))).toEqual("RECT");
});

//over vars good func
test("over vars good func", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); define yay (rect b) { over(TR, b); } yay(x);"))).toEqual("RECT");
});

//over bad wrong letters
test("over bad wrong letters", () => {
    expect(() => typecheck(parser.parse("over(a, vert(rect(1,2,red),rect(1,2,blue)));"))).toThrow();
});

//over bad wrong vals
test("over bad wrong vals", () => {
    expect(() => typecheck(parser.parse("int x = 3; over(C, x);"))).toThrow();
});

//over as var good
test("over as var good", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = over(BR, x, x); hor(x, y);"))).toEqual("RECT");
});

//over with nested overs
test("over w nested overs", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = over(BR, over(C, x), over(TL, x, x)); hor(x, y);"))).toEqual("RECT");
});



//rot good
test("rot good", () => {
    expect(typecheck(parser.parse("rot(90, vert(rect(1,2,red),rect(1,2,blue)));"))).toEqual("RECT");
});

//rot vars good
test("rot vars good", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rot(180, hor(x,rect(1,2,blue)));"))).toEqual("RECT");
});

//rot vars good 1 rect
test("rot vars good 1 rect", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rot(270, x);"))).toEqual("RECT");
});

//rot vars good func
test("rot vars good func", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); define yay (rect b) { rot(0, b); } yay(x);"))).toEqual("RECT");
});

//rot bad wrong #s
test("rot bad wrong nums", () => {
    expect(() => typecheck(parser.parse("over(3, vert(rect(1,2,red),rect(1,2,blue)));"))).toThrow();
});

//rot bad wrong vals
test("rot bad wrong vals", () => {
    expect(() => typecheck(parser.parse("int whyyy = 3; rot(0, whyyy);"))).toThrow();
});

//rot as var good
test("rot as var good", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = rot(90, x); hor(x, y);"))).toEqual("RECT");
});

//rot with nested rots
test("rot w nested rots", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = rot(90, rot(180, x)); hor(x, y);"))).toEqual("RECT");
});







//repX good
test("repX good", () => {
    expect(typecheck(parser.parse("repX(9, vert(rect(1,2,red),rect(1,2,blue)));"))).toEqual("RECT");
});

//repX vars good
test("repX vars good", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); repX(9, hor(x,rect(1,2,blue)));"))).toEqual("RECT");
});

//repX vars good 1 rect
test("repX vars good 1 rect", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); repX(20, x);"))).toEqual("RECT");
});

//repX vars good func
test("repX vars good func", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); define yay (rect b) { repX(1, b); } yay(x);"))).toEqual("RECT");
});

//repX bad wrong #s
test("repX bad wrong nums", () => {
    expect(() => typecheck(parser.parse("repX(a, vert(rect(1,2,red),rect(1,2,blue)));"))).toThrow();
});

//repX bad wrong vals
test("repX bad wrong vals", () => {
    expect(() => typecheck(parser.parse("int whyyy = 3; repX(2, whyyy);"))).toThrow();
});

//repX bad too many args
test("repX bad too many vals", () => {
    expect(() => typecheck(parser.parse("int whyyy = 3; repX(2, whyyy, whyyy);"))).toThrow();
});

//repX as var good
test("repX as var good", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = repX(9, x); hor(x, y);"))).toEqual("RECT");
});

//repX with nested rots
test("repX w nested rots", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = repX(9, repX(7, x)); hor(x, y);"))).toEqual("RECT");
});







//repY good
test("repY good", () => {
    expect(typecheck(parser.parse("repY(9, vert(rect(1,2,red),rect(1,2,blue)));"))).toEqual("RECT");
});

//repY vars good
test("repY vars good", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); repY(9, hor(x,rect(1,2,blue)));"))).toEqual("RECT");
});

//repY vars good 1 rect
test("repY vars good 1 rect", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); repY(20, x);"))).toEqual("RECT");
});

//repY vars good func
test("repY vars good func", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); define yay (rect b) { repY(1, b); } yay(x);"))).toEqual("RECT");
});

//repY bad wrong #s
test("repY bad wrong nums", () => {
    expect(() => typecheck(parser.parse("repY(a, vert(rect(1,2,red),rect(1,2,blue)));"))).toThrow();
});

//repY bad wrong vals
test("repY bad wrong vals", () => {
    expect(() => typecheck(parser.parse("int whyyy = 3; repY(2, whyyy);"))).toThrow();
});

//repY bad too many args
test("repY bad too many vals", () => {
    expect(() => typecheck(parser.parse("int whyyy = 3; repY(2, whyyy, whyyy);"))).toThrow();
});

//repY as var good
test("repY as var good", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = repY(9, x); hor(x, y);"))).toEqual("RECT");
});

//repY with nested rots
test("repY w nested rots", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = repY(9, repY(7, x)); hor(x, y);"))).toEqual("RECT");
});

//repX and repY 
test("repX and repY", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); rect y = repY(9, repX(7, x)); repX(2, y);"))).toEqual("RECT");
});






// var good
test("var good init", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); x;"))).toEqual("RECT");
});

// incorrectly type a var
test("var typed wrong", () => {
    expect(() => typecheck(parser.parse("int whyyy = rect(2,2,blue); rect(1,1,blue);"))).toThrow();
});

// incorrectly type a var2
test("var typed wrong2", () => {
    expect(() => typecheck(parser.parse("rect whyyy = 3; rect(1,1,blue);"))).toThrow();
});

// incorrectly type a var3
test("var typed wrong3", () => {
    expect(() => typecheck(parser.parse("rect whyyy = 3; hor(whyyy, whyyy);"))).toThrow();
});

// correctly type a var2
test("var good init2", () => {
    expect(typecheck(parser.parse("int y = 3; rect(y,y,blue);"))).toEqual("RECT");
});

//reuse it bad
test("var used wrong", () => {
    expect(() => typecheck(parser.parse("rect whyyy = rect(2,2,blue); rect(whyyy, whyyy, blue);"))).toThrow();
});

// reassign a var
test("var reassign good", () => {
    expect(typecheck(parser.parse("int y = 3; int x = 2; y = x; rect(y, x, blue);"))).toEqual("RECT");
});

// reassing a var to another var
test("var assgn 2 var good", () => {
    expect(typecheck(parser.parse("rect x = hor(rect(1, 1, blue), rect(1,1,red)); rect y = x; y;"))).toEqual("RECT");
});

// reassign var to another var thats wrong
test("var assgn 2 var bad", () => {
    expect(() => typecheck(parser.parse("rect x = hor(rect(1, 1, blue), rect(1,1,red)); int y = x; rect(2,2,blue);"))).toThrow();
});

//reassign a var to a func
test("func assgn 2 var good", () => {
    expect(typecheck(parser.parse("define aFun (int x) { hor(rect(x, 1, blue), rect(1,x,red));} rect y = rect(1,1,blue); y = aFun(2); y;"))).toEqual("RECT");
});

// reuse a var good with asngment
test("asngment varcall *", () => {
    expect(typecheck(parser.parse("int y = 3; int x = 2; x = y * x; rect(x,y,blue);"))).toEqual("RECT");
});

// var never inited
test("var not initted", () => {
    expect(() => typecheck(parser.parse("y = rect(2,2,blue); rect(2,2,green);"))).toThrow();
});

// reuse a var bad with asngment
test("asngment varcall + bad", () => {
    expect(() => typecheck(parser.parse("int y = 3; rect x = rect(1,2,blue); x = y + x; rect(x,y,blue);"))).toThrow();
});

//varcall good
test("varcall good", () => {
    expect(typecheck(parser.parse("int yey = 2 * 4; rect(yey,1,blue);"))).toEqual("RECT");
});

//reassign a var to a wrong func
test("reasgn var to wrong func", () => {
    expect(() => typecheck(parser.parse("int yey = 1; define aFun (rect z) { hor(z,z); } yey = aFun(rect(2,2,blue)); rect(2,2,green);"))).toThrow();
});

// int x = 3; func arg x; x=2; etc
test("same name var + arg", () => {
    expect(typecheck(parser.parse("define theF (int x) { rect(x,x,blue); } int x = 3; theF(x);"))).toEqual("RECT");
});

//using arg in func outside of func = error
test("scope bad arg outside func", () => {
    expect(() => typecheck(parser.parse("define aFun (rect z) { hor(z,z); } hor(z,z);"))).toThrow();
});

//redefining var bad
test("var redefine bad", () => {
    expect(() => typecheck(parser.parse("rect z = rect(1,1,blue); int z = 3; rect(1,1,blue);"))).toThrow();
});

//redefining func bad
test("func redefine bad", () => {
    expect(() => typecheck(parser.parse("define theFun (int y) {rect(y,y,blue);} define theFun (int z) { rect(z,z,blue);} rect(1,1,blue);"))).toThrow();
});

//var and func same name
test("var + func named same", () => {
    expect(() => typecheck(parser.parse("rect z = rect(1,1,blue); define z (int y) {rect(1,1,blue);} rect(1,1,blue);"))).toThrow();
});

//args + var named same
test("vars + args named same", () => {
    expect(typecheck(parser.parse("rect z = rect(1,1,blue); define yay (int z) {rect(z,z,blue);} yay(2);"))).toEqual("RECT");
});

//args used bad
test("args used bad", () => {
    expect(() => typecheck(parser.parse("define yay (int z, rect x) {rect(x,z,blue);} yay(2, rect(2,2,green));"))).toThrow();
});

//mixed args good
test("mixed args good", () => {
    expect(typecheck(parser.parse("define yay (int z, rect x) {hor(x,rect(z,z,blue));} yay(2, rect(2,2,green));"))).toEqual("RECT");
});



//func doesnt return rect
test("func doesnt return rect", () => {
    expect(() => typecheck(parser.parse("define yay (int z) {z;} rect(2,2,blue);"))).toThrow();
});

//func doesnt return rect
test("func doesnt return rect2", () => {
    expect(() => typecheck(parser.parse("define yay (int z) {z;} yay(3);"))).toThrow();
});

//func call args bad
test("func call args bad", () => {
    expect(() => typecheck(parser.parse("define yay (int z, rect x) {rect(z,x,blue);} yay(3, rect(1,1,green));"))).toThrow();
});

///args used outside func
test("args used outside func", () => {
    expect(() => typecheck(parser.parse("define yay (rect z) {hor(z,z);} rect oh = yay(rect(1,2,red)); z = rect(1,1,green); yay(z);"))).toThrow();
});

///args used outside func2
test("args used outside func2", () => {
    expect(() => typecheck(parser.parse("define yay (rect z) {rect(1,1,blue);} z = rect(1,1,green); yay(z);"))).toThrow();
});

//func returns var? like var in body
test("func rets var", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); define yay (rect z) {x;} yay(rect(1,1,green));"))).toEqual("RECT");
});

//func returns var? like var in body
test("func rets var2", () => {
    expect(typecheck(parser.parse("rect x = rect(1,1,blue); define yay (rect z) {hor(x,z);} yay(rect(1,1,green));"))).toEqual("RECT");
});

//funcall inside funcall
test("funcall inside funcall", () => {
    expect(typecheck(parser.parse("define wow(int x) {rect(x,x,blue);} define yay (rect z) {hor(wow(2),z);} yay(rect(1,1,green));"))).toEqual("RECT");
});

//funcall to func that doesnt exist
test("funcall to func doesnt exist", () => {
    expect(() => typecheck(parser.parse("yay(rect(1,1,green));"))).toThrow();
});

//funcalls w same name diff args? num of args?
test("funcalls same names bad", () => {
    expect(() => typecheck(parser.parse("define wow(int x) {rect(x,x,blue);} define wow (rect z, int y) {rect(y,y,blue);} wow(rect(1,1,green), 3);"))).toThrow();
});

//funcall w num of args wrong
test("funcall num of args bad", () => {
    expect(() => typecheck(parser.parse("define wow(int x) {rect(x,x,blue);} wow(4, 5, 3);"))).toThrow();
});












//with vals:
// init bad
// double init func

//func good - using args
test("func good-using args", () => {
    expect(typecheck(parser.parse("define thefunc(int x, int y) { rect(x, y, blue); } thefunc(1,2);"))).toEqual("RECT");
});


//func good - using args and vars to call
test("func good-using args and vars to call", () => {
    expect(typecheck(parser.parse("define thefunc(int x, int y) { rect(x, y, blue); } int a = 3; int b = 17; thefunc(a,b);"))).toEqual("RECT");
});






//goofy stuff or stuff that doesnt work


//tbh> unsure whattlll happen
// IS THIS BAD OR GOOD?????????????????????????????????????
test("var good init- color names", () => {
    expect(typecheck(parser.parse("int blue = 3; int y = 4; rect(y,blue,blue);"))).toEqual("RECT");
});


// //func no args
// test("func no args", () => {
//     expect(typecheck(parser.parse("define z () {rect(1,1,blue);} z;"))).toEqual("RECT");
// });

