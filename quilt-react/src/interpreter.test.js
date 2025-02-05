import evaluator from './interpreter.js';
import parser from './parser.js';

//template
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });


//simple square
test("square", () => {
    expect(evaluator(parser.parse("rect(1,1,red);"))).toEqual({"x": 0, "y": 0, "width": 1, "height": 1, "color": "red"});
});

//rectangle (taller)
test("tall rectangle", () => {
    expect(evaluator(parser.parse("rect(1,2,red);"))).toEqual({"x": 0, "y": 0, "width": 1, "height": 2, "color": "red"});
});

//rectangle (wider)
test("wide rectangle", () => {
    expect(evaluator(parser.parse("rect(2,1,red);"))).toEqual({"x": 0, "y": 0, "width": 2, "height": 1, "color": "red"});
});

//add two numbers
test("add two numbers in rect()", () => {
    expect(evaluator(parser.parse("rect((1+2), 3, red);"))).toEqual({
        "x": 0,
        "y": 0,
        "width": 3,
        "height": 3,
        "color": "red"
    });  
});

//multiply two numbers
test("multiply two numbers in rect()", () => {
    expect(evaluator(parser.parse("rect((2*2), 4, red);"))).toEqual({
        "x": 0,
        "y": 0,
        "width": 4,
        "height": 4,
        "color": "red"
    });  
});

//add and multiply, nesting
test("nested arithmetic in rect()", () => {
    expect(evaluator(parser.parse("rect((4+(2*2)), (1+1+1+1), red);"))).toEqual({
        "x": 0,
        "y": 0,
        "width": 8,
        "height": 4,
        "color": "red"
    });  
});

//hor() with compatable rectangles
test("simple hor() - heights compatible", () => {
    expect(evaluator(parser.parse("hor(rect(1,2,red),rect(1,2,blue));"))).toEqual({
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

//hor() but the heights are not compatable
test("simple hor() - heights incompatible", () => {
    expect(() => { evaluator(parser.parse("hor(rect(1,2,red),rect(1,3,blue));"))}).toThrow(); //FIXME in interpreter change returns to Throws
});

//vert() with compatible rectangles
test("simple vert() - widths compatible", () => {
    expect(evaluator(parser.parse("vert(rect(1,2,red),rect(1,2,blue));"))).toEqual({
        "width": 1,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 2,
                "color": "red"
            },
            {
                "x": 0,
                "y": 2,
                "width": 1,
                "height": 2,
                "color": "blue"
            }
        ]
    });  
});

//vert() with incompatible rectangles
test("simple vert() - widths incompatible ", () => {
    expect(() => {evaluator(parser.parse("vert(rect(1,1,red),rect(2,1,blue));"))}).toThrow();
});

//hor() inside vert(), using compatable squares
test("hor() nested in vert(), square - compatable", () => {
    expect(evaluator(parser.parse("vert(hor(rect(1,1,red), rect(1,1,blue)), hor(rect(1,1,yellow), rect(1,1,green)));"))).toEqual({
        "width": 2,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            }
        ]
    });  
});

//hor() inside vert(), using compatable rectangles
test("hor() nested in vert(), rectangle - compatable", () => {
    expect(evaluator(parser.parse("vert(hor(rect(2,1,red), rect(3,1,blue)), hor(rect(3,1,yellow), rect(2,1,green)));"))).toEqual({
        "width": 5,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 1,
                "color": "red"
            },
            {
                "x": 2,
                "y": 0,
                "width": 3,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 1,
                "width": 3,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 3,
                "y": 1,
                "width": 2,
                "height": 1,
                "color": "green"
            }
        ]
    });  
});


//hor() inside vert(), using incompatable rectangles (widths between first and second design don't match)
test("hor() nested in vert() - incompatable", () => {
    expect(() => {evaluator(parser.parse("vert(hor(rect(3,1,red), rect(2,1,blue)), hor(rect(1,1,yellow), rect(1,1,green)));"))}).toThrow;  
});

//vert() inside hor(), using compatable squares
test("vert() nested in hor(), square - compatable", () => {
    expect(evaluator(parser.parse("hor(vert(rect(1,1,red), rect(1,1,blue)), vert(rect(1,1,yellow), rect(1,1,green)));"))).toEqual({
        "width": 2,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 0,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 1,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            }
        ]
    });  
});

//vert() inside hor(), using compatable rectangles
test("vert() nested in hor(), rectangle - compatable", () => {
    expect(evaluator(parser.parse("hor(vert(rect(1,2,red), rect(1,3,blue)), vert(rect(1,3,yellow), rect(1,2,green)));"))).toEqual({
        "width": 2,
        "height": 5,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 2,
                "color": "red"
            },
            {
                "x": 0,
                "y": 2,
                "width": 1,
                "height": 3,
                "color": "blue"
            },
            {
                "x": 1,
                "y": 0,
                "width": 1,
                "height": 3,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 3,
                "width": 1,
                "height": 2,
                "color": "green"
            }
        ]
    });  
});

//vert() inside hor(), using incompatable rectangles
test("vert() nested in hor() - incompatable", () => {
    expect(() => {evaluator(parser.parse("hor(vert(rect(1,2,red), rect(1,2,blue)), vert(rect(1,1,yellow), rect(1,1,green)));"))}).toThrow;  
});

//2 hor() nested, compatable
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//5 hor() nested, compatable
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//2 hor() nested, incompatable
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//5 hor() nested, incompatable
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//2 vert() nested, compatable
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//5 vert() nested, compatable
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//2 vert() nested, incompatable
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//5 vert() nested, incompatable
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//over() using TL with two compatable rectangles
test("over() TL - compatable", () => {
    expect(evaluator(parser.parse("over(TL, rect(2,2,red), rect(1,1,blue));"))).toEqual({
        "width": 2,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 2,
                "color": "red"
            },
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            }
        ]
    });  
});

//over() using TR with two compatable rectangles
test("over() TR - compatable", () => {
    expect(evaluator(parser.parse("over(TR, rect(2,2,red), rect(1,1,blue));"))).toEqual({
        "width": 2,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 2,
                "color": "red"
            },
            {
                "x": 1,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            }
        ]
    });  
});

//over() using BL with two compatable rectangles
test("over() BL - compatable", () => {
    expect(evaluator(parser.parse("over(BL, rect(2,2,red), rect(1,1,blue));"))).toEqual({
        "width": 2,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 2,
                "color": "red"
            },
            {
                "x": 0,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "blue"
            }
        ]
    });  
});

//over() using BR with two compatable rectangles
test("over() BR - compatable", () => {
    expect(evaluator(parser.parse("over(BR, rect(2,2,red), rect(1,1,blue));"))).toEqual({
        "width": 2,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 2,
                "color": "red"
            },
            {
                "x": 1,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "blue"
            }
        ]
    });  
});


//over() using C with two compatable rectangles
test("over() C - compatable", () => {
    expect(evaluator(parser.parse("over(C, rect(2,2,red), rect(1,1,blue));"))).toEqual({
        "width": 2,
        "height": 2,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 2,
                "color": "red"
            },
            {
                "x": 0.5,
                "y": 0.5,
                "width": 1,
                "height": 1,
                "color": "blue"
            }
        ]
    });  
});


//over() with second rectangle being too wide
test("over() second too wide - incompatable", () => {
    expect(() => {evaluator(parser.parse("over(C, rect(2,2,blue), rect(3,1,red));"))}).toThrow;  
});


//over() with second rectangle being too tall
test("over() second too tall - incompatable", () => {
    expect(() => {evaluator(parser.parse("over(C, rect(2,2,blue), rect(1,3,red));"))}).toThrow;  
});


//over() with second rectangle being too wide and too tall
test("over() - incompatable", () => {
    expect(() => {evaluator(parser.parse("over(C, rect(2,2,blue), rect(3,3,red));"))}).toThrow;  
});


//2 over() nested, compatable

//5 over() nested, compatable

//2 over() nested, incompatable

//5 over() nested, incompatable

//over() with designs (ADD MULTIPLE)

//rot() using 0 degrees to rotate a rectangle
test("rot() 0deg rectangle", () => {
    expect(evaluator(parser.parse("rot(0, rect(2,1,red));"))).toEqual({
        "x": 0,
        "y": 0,
        "width": 2,
        "height": 1,
        "color": "red"
    });  
});

//rot() using 90 degrees to rotate a rectangle
test("rot() 90deg rectangle", () => {
    expect(evaluator(parser.parse("rot(90, rect(2,1,red));"))).toEqual({
        "x": 0,
        "y": 0,
        "width": 1,
        "height": 2,
        "color": "red"
    });  
});

//rot() using 180 degrees to rotate a rectangle
test("rot() 180deg rectangle", () => {
    expect(evaluator(parser.parse("rot(180, rect(2,1,red));"))).toEqual({
        "x": 0,
        "y": 0,
        "width": 2,
        "height": 1,
        "color": "red"
    });  
});

//rot() using 270 degrees to rotate a rectangle
test("rot() 270deg rectangle", () => {
    expect(evaluator(parser.parse("rot(270, rect(2,1,red));"))).toEqual({
        "x": 0,
        "y": 0,
        "width": 1,
        "height": 2,
        "color": "red"
    });  
});

//rot() using 0 degrees to rotate a design
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//rot() using 90 degrees to rotate a design
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//rot() using 180 degrees to rotate a design
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//rot() using 270 degrees to rotate a design
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//repX() with rectangle
test("repX() rectangle", () => {
    expect(evaluator(parser.parse("repX(4, rect(1,1,blue));"))).toEqual({
        "width": 4,
        "height": 1,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 1,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 2,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 3,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            }
        ]
    });  
});

//repX() with design
// test("repX() design", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//repY() with rectangle
test("repY() rectangle", () => {
    expect(evaluator(parser.parse("repY(4, rect(1,1,blue));"))).toEqual({
        "width": 1,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 2,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 3,
                "width": 1,
                "height": 1,
                "color": "blue"
            }
        ]
    });  
});

//repY() with design
// test("repY() design", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });

//(continue later)


//defining and using integer variables
test("simple int variables", () => {
    expect(evaluator(parser.parse("int a = 3; int b = 4; rect(a, b, red);"))).toEqual({
            "x": 0,
            "y": 0,
            "width": 3,
            "height": 4,
            "color": "red"
        });
});




//defining and calling a function using hor with compatable rectangles
test("simple function with hor", () => {
    expect(evaluator(parser.parse("define func(rect x, rect y) {hor(x, y);}func(rect(1, 2, blue), rect(1, 2, red));"))).toEqual({
            "width": 2,
            "height": 2,
            "patches": [
                {
                    "x": 0,
                    "y": 0,
                    "width": 1,
                    "height": 2,
                    "color": "blue"
                },
                {
                    "x": 1,
                    "y": 0,
                    "width": 1,
                    "height": 2,
                    "color": "red"
                }
            ]
    });
});

