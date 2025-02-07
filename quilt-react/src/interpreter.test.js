import evaluator from './interpreter.js';
import parser from './parser.js';

//templates
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });
// test("", () => {
//     expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;    
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
test("hor() nested in hor() - compatable", () => {
    expect(evaluator(parser.parse("hor(hor(rect(1,1,red), rect(1,1,blue)), hor(rect(1,1,yellow), rect(1,1,green)));"))).toEqual({
        "width": 4,
        "height": 1,
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
                "x": 2,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 3,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "green"
            }
        ]
    });  
});

//5 hor() nested, compatable
test("5 hor() nested in hor() - compatable", () => {
    expect(evaluator(parser.parse("hor(hor(hor(hor(hor(rect(1,1,yellow), rect(1,1,green)), rect(1,1,red)), rect(1,1,pink)), rect(1,1,blue)), hor(rect(1,1,yellow), rect(1,1,brown)));"))).toEqual({
        "width": 7,
        "height": 1,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 2,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 3,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "pink"
            },
            {
                "x": 4,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 5,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 6,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "brown"
            }
        ]
    });  
});

//2 hor() nested, incompatable
test("hor() nested in hor() - incompatable", () => {
    expect(() => {evaluator(parser.parse("hor(hor(rect(1,2,red), rect(1,2,blue)), hor(rect(1,1,yellow), rect(1,1,green)));"))}).toThrow;    
});

//5 hor() nested, incompatable
// test("", () => {
//     expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;    
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
//     expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;    
// });

//5 vert() nested, incompatable
// test("", () => {
//     expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;    
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
test("over() 2 nested - compatable", () => {
    expect(evaluator(parser.parse("over(C, rect(3,3, red), over(C, rect(2,2,blue), rect(1,1,yellow)));"))).toEqual({
        "width": 3,
        "height": 3,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 3,
                "height": 3,
                "color": "red"
            },
            {
                "x": 0.5,
                "y": 0.5,
                "width": 2,
                "height": 2,
                "color": "blue"
            },
            {
                "x": 1,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "yellow"
            }
        ]
    });  
});

//5 over() nested, compatable
test("over() 5 nested - compatable", () => {
    expect(evaluator(parser.parse("over(BR, rect(6,6, red), over(TL, rect(5,5,blue), over(BR, rect(4,4,yellow), over(TL, rect(3,3,green), over(C, rect(2,2,purple), rect(1,1,grey))))));"))).toEqual({
        "width": 6,
        "height": 6,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 6,
                "height": 6,
                "color": "red"
            },
            {
                "x": 1,
                "y": 1,
                "width": 5,
                "height": 5,
                "color": "blue"
            },
            {
                "x": 1,
                "y": 1,
                "width": 4,
                "height": 4,
                "color": "yellow"
            },
            {
                "x": 2,
                "y": 2,
                "width": 3,
                "height": 3,
                "color": "green"
            },
            {
                "x": 2,
                "y": 2,
                "width": 2,
                "height": 2,
                "color": "purple"
            },
            {
                "x": 2.5,
                "y": 2.5,
                "width": 1,
                "height": 1,
                "color": "grey"
            }
        ]
    });  
});

//2 over() nested, incompatable
test("over() 2 nested - incompatable", () => {
    expect(() => {evaluator(parser.parse("over(C, rect(2,2, red), over(C, rect(3,2,blue), rect(1,1,yellow)));"))}).toThrow;    
});

//5 over() nested, incompatable
test("over() 5 nested - incompatable", () => {
    expect(() => {evaluator(parser.parse("over(BR, rect(6,6, red), over(TL, rect(5,5,blue), over(BR, rect(2,4,yellow), over(TL, rect(3,3,green), over(C, rect(2,2,purple), rect(1,1,grey))))));"))}).toThrow;    
});

//over() with designs (ADD MULTIPLE)
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });
// test("", () => {
//     expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;    
// });

//over() using TL with two compatable designs
test("over() TL design - compatable", () => {
    expect(evaluator(parser.parse("over(TL, hor(rect(2,4,blue), rect(2,4,red)), hor(rect(1,2,yellow), rect(1,2,green))); "))).toEqual({
        "width": 4,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "blue"
            },
            {
                "x": 2,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "red"
            },
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 2,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 0,
                "width": 1,
                "height": 2,
                "color": "green"
            }
        ]
    });  
});

//over() using TR with two compatable designs
test("over() TR design - compatable", () => {
    expect(evaluator(parser.parse("over(TR, hor(rect(2,4,blue), rect(2,4,red)), hor(rect(1,2,yellow), rect(1,2,green))); "))).toEqual({
        "width": 4,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "blue"
            },
            {
                "x": 2,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "red"
            },
            {
                "x": 2,
                "y": 0,
                "width": 1,
                "height": 2,
                "color": "yellow"
            },
            {
                "x": 3,
                "y": 0,
                "width": 1,
                "height": 2,
                "color": "green"
            }
        ]
    });  
});

//over() using BL with two compatable designs
test("over() BL design - compatable", () => {
    expect(evaluator(parser.parse("over(BL, hor(rect(2,4,blue), rect(2,4,red)), hor(rect(1,2,yellow), rect(1,2,green))); "))).toEqual({
        "width": 4,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "blue"
            },
            {
                "x": 2,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "red"
            },
            {
                "x": 0,
                "y": 2,
                "width": 1,
                "height": 2,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 2,
                "width": 1,
                "height": 2,
                "color": "green"
            }
        ]
    });  
});

//over() using BR with two compatable designs
test("over() BR design - compatable", () => {
    expect(evaluator(parser.parse("over(BR, hor(rect(2,4,blue), rect(2,4,red)), hor(rect(1,2,yellow), rect(1,2,green))); "))).toEqual({
        "width": 4,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "blue"
            },
            {
                "x": 2,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "red"
            },
            {
                "x": 2,
                "y": 2,
                "width": 1,
                "height": 2,
                "color": "yellow"
            },
            {
                "x": 3,
                "y": 2,
                "width": 1,
                "height": 2,
                "color": "green"
            }
        ]
    });  
});

//over() using C with two compatable designs
test("over() C design - compatable", () => {
    expect(evaluator(parser.parse("over(C, hor(rect(2,4,blue), rect(2,4,red)), hor(rect(1,2,yellow), rect(1,2,green))); "))).toEqual({
        "width": 4,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "blue"
            },
            {
                "x": 2,
                "y": 0,
                "width": 2,
                "height": 4,
                "color": "red"
            },
            {
                "x": 1,
                "y": 1,
                "width": 1,
                "height": 2,
                "color": "yellow"
            },
            {
                "x": 2,
                "y": 1,
                "width": 1,
                "height": 2,
                "color": "green"
            }
        ]
    });  
});

//over() with second design being too wide
test("over() second design too wide - incompatable", () => {
    expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;  
});


//over() with second design being too tall
test("over() second design too tall - incompatable", () => {
    expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;  
});


//over() with second design being too wide and too tall
test("over() design - incompatable", () => {
    expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;  
});

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
test("rot() 0deg design", () => {
    expect(evaluator(parser.parse("rot(0, hor(rect(3, 1, black), rect(1,1, yellow))); "))).toEqual({
        "width": 4,
        "height": 1,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 3,
                "height": 1,
                "color": "black"
            },
            {
                "x": 3,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            }
        ]
    });  
});

//rot() using 90 degrees to rotate a design
test("rot() 90deg design", () => {
    expect(evaluator(parser.parse("rot(90, hor(rect(3, 1, black), rect(1,1, yellow))); "))).toEqual({
        "width": 1,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 3,
                "color": "black"
            },
            {
                "x": 0,
                "y": 3,
                "width": 1,
                "height": 1,
                "color": "yellow"
            }
        ]
    });  
});

//rot() using 180 degrees to rotate a design
test("rot() 180deg design", () => {
    expect(evaluator(parser.parse("rot(180, hor(rect(3, 1, black), rect(1,1, yellow))); "))).toEqual({
        "width": 4,
        "height": 1,
        "patches": [
            {
                "x": 1,
                "y": 0,
                "width": 3,
                "height": 1,
                "color": "black"
            },
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            }
        ]
    });  
});

//rot() using 270 degrees to rotate a design
test("rot() 270deg design", () => {
    expect(evaluator(parser.parse("rot(270, hor(rect(3, 1, black), rect(1,1, yellow))); "))).toEqual({
        "width": 1,
        "height": 4,
        "patches": [
            {
                "x": 0,
                "y": 1,
                "width": 1,
                "height": 3,
                "color": "black"
            },
            {
                "x": 0,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            }
        ]
    });  
});

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
test("repX() design", () => {
    expect(evaluator(parser.parse("repX(10, hor(vert(rect(1,1,blue), rect(1,1,red)), vert(rect(1,1,yellow), rect(1,1,green))));"))).toEqual({
        "width": 20,
        "height": 2,
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
                "color": "red"
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
            },
            {
                "x": 2,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 2,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 3,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 3,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 4,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 4,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 5,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 5,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 6,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 6,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 7,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 7,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 8,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 8,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 9,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 9,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 10,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 10,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 11,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 11,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 12,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 12,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 13,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 13,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 14,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 14,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 15,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 15,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 16,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 16,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 17,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 17,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 18,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 18,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 19,
                "y": 0,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 19,
                "y": 1,
                "width": 1,
                "height": 1,
                "color": "green"
            }
        ]
    });  
});

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
test("repY() design", () => {
    expect(evaluator(parser.parse("repY(10, hor(vert(rect(1,1,blue), rect(1,1,red)), vert(rect(1,1,yellow), rect(1,1,green))));"))).toEqual({
        "width": 2,
        "height": 20,
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
                "color": "red"
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
                "color": "red"
            },
            {
                "x": 1,
                "y": 2,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 3,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 0,
                "y": 4,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 5,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 4,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 5,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 0,
                "y": 6,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 7,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 6,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 7,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 0,
                "y": 8,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 9,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 8,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 9,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 0,
                "y": 10,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 11,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 10,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 11,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 0,
                "y": 12,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 13,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 12,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 13,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 0,
                "y": 14,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 15,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 14,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 15,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 0,
                "y": 16,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 17,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 16,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 17,
                "width": 1,
                "height": 1,
                "color": "green"
            },
            {
                "x": 0,
                "y": 18,
                "width": 1,
                "height": 1,
                "color": "blue"
            },
            {
                "x": 0,
                "y": 19,
                "width": 1,
                "height": 1,
                "color": "red"
            },
            {
                "x": 1,
                "y": 18,
                "width": 1,
                "height": 1,
                "color": "yellow"
            },
            {
                "x": 1,
                "y": 19,
                "width": 1,
                "height": 1,
                "color": "green"
            }
        ]
    });  
});

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

//defining and using rect variable
test("simple rect variable", () => {
    expect(evaluator(parser.parse("rect a = rect(1,1,red); a;"))).toEqual({
        "x": 0,
        "y": 0,
        "width": 1,
        "height": 1,
        "color": "red"
    });  
});

//defining and using rect (design) variable
test("simple rect (design) variable", () => {
    expect(evaluator(parser.parse("rect a = hor(rect(1,1,red), rect(1,1,grey)); a;"))).toEqual({
        "width": 2,
        "height": 1,
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
                "color": "grey"
            }
        ]
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


//templates
// test("", () => {
//     expect(evaluator(parser.parse("CODE_HERE"))).toEqual(OBJECT_HERE);  
// });
// test("", () => {
//     expect(() => {evaluator(parser.parse("CODE_HERE"))}).toThrow;    
// });
