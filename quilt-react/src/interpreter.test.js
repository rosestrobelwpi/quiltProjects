import evaluator from './interpreter.js';
import parser from './parser.js';


test("square", () => {
    expect(evaluator(parser.parse("rect(1,1,red)"))).toEqual({"x": 0, "y": 0, "width": 1, "height": 1, "color": "red"});
});

test("rectangle", () => {
    expect(evaluator(parser.parse("rect(1,2,red)"))).toEqual({"x": 0, "y": 0, "width": 1, "height": 2, "color": "red"});
});

test("simple hor() - heights compatible", () => {
    expect(evaluator(parser.parse("(hor(rect(1,2,red),rect(1,2,blue)))"))).toEqual({
        "width": 2,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 2,
                "color": "red"
            },
            {
                "x": 1,
                "y": 0,
                "width": 1,
                "height": 2,
                "color": "blue"
            }
        ]
    });
});

test("simple hor() - heights incompatible", () => {
    expect(() => { evaluator(parser.parse("(hor(rect(1,2,red),rect(1,3,blue)))"))}).toThrow(); //FIXME in interpreter change returns to Throws
});
