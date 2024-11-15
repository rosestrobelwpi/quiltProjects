import evaluator from './interpreter.js';
import parser from './parser.js';


test("square", () => {
    expect(evaluator(parser.parse("rect(1,1,red)"))).toEqual({"x": 0, "y": 0, "width": 1, "height": 1, "color": "red"});
});

test("rectangle", () => {
    expect(evaluator(parser.parse("rect(1,2,red)"))).toEqual({"x": 0, "y": 0, "width": 1, "height": 2, "color": "red"});
});