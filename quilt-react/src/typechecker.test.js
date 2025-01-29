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

//rect with int vars correct
test("rect with var inputs correct", () => {
    expect(typecheck(parser.parse("int a = 3; int b = 4; rect(a, b, red);"))).toEqual("RECT");
});


//rect with int vars incorrect
test("rect with vars incorrect", () => {
    expect(() => { typecheck(parser.parse("int a = 3; rect b = rect(1, 2, blue); rect(a, b, red);"))}  ).toThrow();
});

//hor good
test("simple hor() - heights compatible", () => {
    expect(typecheck(parser.parse("(hor(rect(1,2,red),rect(1,2,blue)));"))).toEqual("RECT");
});

//func good - using args
test("func good-using args", () => {
    expect(typecheck(parser.parse("define thefunc(int x, int y) { rect(x, y, blue); } thefunc(1,2);"))).toEqual("RECT");
});


//func good - using args and vars to call
test("func good-using args and vars to call", () => {
    expect(typecheck(parser.parse("define thefunc(int x, int y) { rect(x, y, blue); } int a = 3; int b = 17; thefunc(a,b);"))).toEqual("RECT");
});

test("fhfoalafnd vars to call", () => {
    expect(typecheck(parser.parse("rect(32, (4+1), blue);"))).toEqual("RECT");
});







test("simple function with hor", () => {
    expect(typecheck(parser.parse("define func(rect x, rect y) {hor(x, y);}func(rect(1, 2, blue), rect(1, 2, red));"))).toEqual("RECT");
});

// test("simple hor() - heights incompatible", () => {
//     expect(() => { typecheck(parser.parse("(hor(rect(1,2,red),rect(1,3,blue)));"))}).toThrow(); //FIXME in interpreter change returns to Throws
// });