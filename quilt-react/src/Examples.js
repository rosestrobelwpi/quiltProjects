import React, { useEffect, useRef } from "react";
import "./examples.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import parser from "./parser";
import evaluator from "./interpreter";

const colorPalette = {
  // red: '#b57c7c',
  // orange: '#d9a078',
  // yellow: '#c8b77a',
  // green: '#85a586',
  // blue: '#6a8caf',
  // purple: '#9e86a6',
  // black: '#4d4d4d',
  // pink: '#d8a6b8',
  // brown: '#a58c72',
  // grey: '#b0b0b0',
};

// Function to draw a single rectangle
const drawRectangle = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(width), Math.ceil(height));
};

// Function to render a design on a canvas
const renderDesign = (canvas, code) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  try {
    const parsedInput = parser.parse(code);
    const design = evaluator(parsedInput);

    const maxWidth = design.width
    const maxHeight = design.height

    const scaleX = (canvas.width) / maxWidth;
    const scaleY = (canvas.height) / maxHeight;
    const scale = Math.min(scaleX, scaleY); // Uniform scaling

    if (design.patches && Array.isArray(design.patches)) {
      design.patches.forEach((patch) => {
        drawRectangle(
          ctx,
          patch.x * scale,
          patch.y * scale,
          patch.width * scale,
          patch.height * scale,
          colorPalette[patch.color] || patch.color
        );
      });
    } else if (design.x !== undefined && design.y !== undefined) {
      drawRectangle(
        ctx,
        design.x * scale,
        design.y * scale,
        design.width * scale,
        design.height * scale,
        colorPalette[design.color] || design.color
      );
    }
  } catch (error) {
    console.error("Error visualizing code:", error);
  }
};

function Examples() {
  const exampleDesigns = [
    {
      id: 1,
      code: "rect brown = rect(1,1,sienna);\nrect black = rect(1,1,black);\nrect yellow = rect(1,1,goldenrod);\nrect background = rect(1,1,cadetblue);\nrect red = rect(1,1,firebrick);\nrect a = hor(repX(6,background),repX(4,black),repX(6,background));\nrect b = hor(repX(5,background),repX(1,black),repX(3,red),repX(1,black),repX(6,background));\nrect c = hor(repX(4,background),repX(1,black),repX(2,red),repX(2,black),repX(7,background));\nrect d = hor(repX(3,background),repX(1,black),repX(4,brown),repX(1,black),repX(7,background));\nrect e = hor(repX(2,background),repX(1,black),repX(1,brown),repX(1,black),repX(2,brown),repX(1,black),repX(1,brown),repX(1,black),repX(1,background),repX(4,black),repX(1,background));\nrect f = hor(repX(2,background),repX(1,black),repX(1,brown),repX(1,black),repX(2,brown),repX(1,black),repX(1,brown),repX(2,black),repX(4,brown),repX(1,black));\nrect g = hor(repX(1,background),repX(1,black),repX(3,yellow),repX(2,brown),repX(1,black),repX(1,brown),repX(1,black),repX(5,brown),repX(1,black));\nrect h = hor(repX(2,background),repX(2,black),repX(10,brown),repX(1,black),repX(1,background));\nrect i = hor(repX(1,background),repX(1,black),repX(13,brown),repX(1,black));\nrect j = hor(repX(1,black),repX(8,brown),repX(1,black),repX(2,brown),repX(1,black),repX(2,brown),repX(1,black));\nrect k = hor(repX(1,black),repX(9,brown),repX(2,black),repX(2,brown),repX(1,black),repX(1,background));\nrect l = hor(repX(1,black),repX(12,brown),repX(2,black),repX(1,background));\nrect m = hor(repX(1,background),repX(2,black),repX(10,brown),repX(1,black),repX(2,background));\nrect n = hor(repX(2,background),repX(2,black),repX(8,brown),repX(2,black),repX(2,background));\nrect o = hor(repX(3,background),repX(10,black),repX(3,background));\nrect p = hor(repX(2,background),repX(1,black),repX(3,yellow),repX(1,black),repX(3,yellow),repX(1,black),repX(5,background));\nvert(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);"
    },
    {
      id: 2,
      code: "rect one = hor(rect(1,1,darkslateblue), rect(1,1,paleturquoise), rect(2,1,darkslateblue));\nrect two = hor(rect(3,1,lightsalmon), rect(1,1,darkslateblue));\nrect three = hor(rect(1,1,darkslateblue), rect(3,1,palegoldenrod));\nrect four = hor(rect(2,1,darkslateblue), rect(1,1,plum), rect(1,1,darkslateblue));\nrect block = vert(one, two, three, four);\nrect bigBlock = vert(hor(rot(270, block), block), hor(rot(180, block), rot(90, block)));\nrepY(4, repX(4, bigBlock));"
    },
    {
      id: 3,
      code: "rect red = rect(1,1,red);\nrect orange = rect(1,1,orange);\nrect yellow = rect(1,1,yellow);\nrect green = rect(1,1,green);\nrect blue = rect(1,1,blue);\nrect purple = rect(1,1,purple);\nrect r = hor(red,orange,yellow,green,blue,purple);\nvert(r,r,r,r,r,r);"
    },
    {
      id: 4,
      code: "rect r = rect(6,1,black);\nrect o = rect(6,1,salmon);\nrect y = rect(6,1,gold);\nrect g = rect(6,1,mediumseagreen);\nrect b = rect(6,1,steelblue);\nrect p = rect(6,1,black);\nrect block = vert(r,o,y,g,b,p);\nrect row = repX(6, hor(block, rot(90, block)));\nrepY(6, vert(row, rot(180, row)));"
    },
    { 
      id: 5, 
      code: "rect yellowRect = rect(1, 1, yellow);\nrect blackRect = rect(1, 1, black);\nrect yellowBackground = hor(repX(10, yellowRect));\nrect eyes = hor(yellowRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect);\nrect topLip = hor(yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect, blackRect,yellowRect, yellowRect);\nrect midLip = hor(yellowRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect);\nrect bottomLip = hor(yellowRect, yellowRect, yellowRect, yellowRect, blackRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect);\nvert(yellowBackground, yellowBackground, yellowBackground, eyes, yellowBackground, yellowBackground, topLip, midLip, bottomLip, yellowBackground);" 
    },
    { 
      id: 6,
      code: "rect grey = rect(1, 1, grey);\nrect black = rect(1, 1, black);\nrect top = hor(grey, black);\nrect bottom = hor(black, grey);\nrect repeat = repX(4, (vert(top, bottom)));\nvert(repeat, repeat, repeat, repeat);" },
    { 
      id: 7, 
      code: "rect black = rect(1,1,black);\nrect yellow = rect(1,1,gold);\nrect faceTop = rect(3,3,gold);\nrect smileTop = hor(yellow,black,yellow,yellow,black,yellow);\nrect smileBottom = hor(yellow,rect(4,1,black),yellow);\nrect smile = vert(smileTop,smileBottom);\nrect facePiece = over(C,faceTop,black);\nvert(hor(facePiece,facePiece),smile,rect(6,1,gold));"
    },  
    {
      id: 8,
      code: "rect blu = rect(1,1,mediumblue);\nrect whi = rect(1,1,white);\nrect yel = rect(1,1,yellow);\nrect ora = rect(1,1,orange);\nrect bro = rect(1,1,brown);\nrect ra = repX(15, blu);\nrect rb = hor(repX(5, blu), repX(5, whi), repX(5, blu));\nrect rc = hor(repX(4, blu), repX(7, whi), repX(4,blu));\nrect rd = hor(repX(3, blu), repX(9, whi), repX(3,blu));\nrect re = hor(repX(2, blu), repX(11, whi), repX(2,blu));\nrect rf = hor(blu, repX(2,whi), bro, repX(7,whi), bro, whi, repX(2, blu));\nrect rg = hor(blu, repX(13, whi), blu);\nrect rh = hor(blu, repX(4,whi), ora, repX(3,whi), ora, repX(4,whi),blu);\nrect ri = hor(repX(5, whi), repX(2,ora), whi, repX(2,ora), repX(5,whi));\nrect rj = hor(repX(5, whi), repX(5, ora), repX(5, whi));\nrect rk = hor(repX(4, whi), repX(2, ora), bro, ora, bro, ora, yel, repX(4, whi));\nrect rl = hor(repX(3, whi), repX(8, ora), yel, repX(3, whi));\nrect rm = hor(blu, repX(3, whi), repX(6, ora), yel, repX(3, whi), blu); \nrect rn = hor(repX(2, blu), repX(2, whi), repX(6, ora), yel, repX(2, whi), repX(2, blu));	\nrect ro = hor(repX(2, blu), repX(3, whi), repX(4, ora), yel, repX(3, whi), repX(2, blu));\nrect rp = hor(repX(2, blu), repX(4, whi), repX(3, yel), repX(4, whi), repX(2, blu));\nrect rq = hor(blu, repX(13, whi), blu);\nrect duckFace = vert(ra, rb, rc, rd, re, re, rf, rg, rh, ri, rj, rj, rk, rl, rm, rm, repY(5, rn), ro, rp, rq, rq);\nrect blueBackgroundLeft = rect(14, 25, mediumblue);\nrect blueBackgroundRight = rect(13, 25, mediumblue);\nrect topHalf = hor(blueBackgroundLeft, duckFace, blueBackgroundRight);\n\nrect rr = repX(14, blu);\nrect rs = hor(repX(13, blu), whi);\nrect rt = hor(repX(12, blu), repX(2, whi));\nrect ru = hor(repX(11, blu), repX(3, whi));\nrect rv = hor(repX(10, blu), repX(4, whi));\nrect rw = hor(repX(9, blu), repX(5, whi));\nrect rx = hor(repX(8, blu), repX(6, whi));\nrect ry = hor(repX(7, blu), repX(7, whi));\nrect rz = hor(repX(6, blu), repX(8, whi));\nrect raa = hor(repX(5, blu), repX(9, whi));\nrect rbb = hor(repX(4, blu), repX(10, whi));\nrect rcc = hor(repX(3, blu), repX(11, whi));\nrect leftBody = vert(rr, rr, rs, rt, rt, ru, rv, rv, rw, rx, ry, ry, rz, raa, raa, rbb, rbb, rcc);\n\ndefine rightHelper(int x, int y) {\n  hor(repX(x, rect(1,1,white)), repX(y, rect(1,1,mediumblue)));\n}\n\nrect rdd = rightHelper(1, 13);\nrect ree = rightHelper(2,12);\nrect rff = rightHelper(3,11);\nrect rgg = rightHelper(4,10);\nrect rhh = rightHelper(5,9);\nrect rii = rightHelper(6,8);\nrect rjj = rightHelper(7,7);\nrect rkk = rightHelper(8,6);\nrect rll = rightHelper(9,5);\nrect rmm = rightHelper(10,4);\nrect rnn = rightHelper(11,3);\nrect rightBody = vert(rr, rr, rdd, rdd, ree, rff, rgg, rgg, rhh, rii, rii, rjj, rkk, rll, rll, rmm, rmm, rnn);\nrect middleBody = rect(14, 18, white);\nrect bottomHalf = hor(leftBody, middleBody, rightBody);\nrect goose = vert(topHalf, bottomHalf);\nrect gooseRow = repX(2, hor(goose, rot(180, goose)));\nrect gooseRowTwo = repX(2, hor(rot(180, goose), goose));\nrect goosePattern = repY(2, vert(gooseRow, gooseRowTwo));\nrect border = rect(200, 200, white);\nrect borderBorder = rect(210, 210, orange);\nover(C, borderBorder, border, goosePattern);"
    },
    {
      id: 9,
      code: "rect triangle = over(BR, rect(12,12,gold), over(TL, rect(11,11,olive), over(BR, rect(10,10, gold), over(TL, rect(9,9,olive), over(BR, rect(8,8,gold), over(TL,  rect(7,7,olive), over(BR, rect(6,6, gold), over(TL, rect(5,5,olive), over(BR, rect(4,4,gold), over(TL, rect(3,3,olive), over(BR, rect(2,2,gold), rect(1,1,olive))))))))))));\n\nrect triangleTwo = over(BR, rect(12,12,mediumorchid), over(TL, rect(11,11,slateblue), over(BR, rect(10,10, mediumorchid), over(TL, rect(9,9,slateblue), over(BR, rect(8,8,mediumorchid), over(TL,  rect(7,7,slateblue), over(BR, rect(6,6, mediumorchid), over(TL, rect(5,5,slateblue), over(BR, rect(4,4,mediumorchid), over(TL, rect(3,3,slateblue), over(BR, rect(2,2,mediumorchid), rect(1,1,slateblue))))))))))));\n\ndefine star(rect one, rect two, rect triangler) {\n      vert(hor(one, rot(270, triangler), rot(180, triangler), one), hor(rot(90, triangler), two, two, triangler), hor(rot(180, triangler), two, two, rot(270, triangler)), hor(one, triangler, rot(90, triangler), one));\n}\n\nrect quiltBlock = star(rect(12, 12, green), rect(12,12,sienna), triangle);\nrect quiltBlockTwo = star(rect(12,12,indigo), rect(12,12,lightpink), triangleTwo);\nvert(hor(quiltBlock, quiltBlockTwo, quiltBlock), hor(quiltBlockTwo, quiltBlock, quiltBlockTwo), hor(quiltBlock, quiltBlockTwo, quiltBlock));"
    },  
    {
      id: 10,
      code: "rect red = rect(1,1,red);\nrect black = rect(1,1,black);\nrect X = hor(red,black,red);\nrect Y = hor(black,red,black);\nvert(X,Y,X);",
    },
    {
      id: 11,
      code: "rect grey = rect(1,1,mintcream);\nrect brown = rect(1,1,tan);\nrect black = rect(1,1,black);\nrect pink = rect(1,1,pink);\nrect rowOne = repX(6,grey);\nrect rowTwo = repX(6,brown);\nrect rowThree = hor(black,grey,brown,brown,grey,black);\nrect rowFour = rowTwo;\nrect rowFive = hor(grey,brown,pink,pink,brown,grey);\nrect rowSix = rowFive;\nvert(rowOne,rowTwo,rowThree,rowFour,rowFive,rowSix);"
    },
    {
      id: 12,
      code: "rect red = rect(5,5,crimson);\nrect white = rect(4,4,grey);\nrect blue = rect(3,3,mediumblue);\nrect center = rect(1,1,black);\nover(C,red,white,blue,center);"
    },
    {
      id: 13,
      code: "define checkerboard(rect a, rect b, rect x, rect y) {\nreturn repX(4, hor(vert(a,b,x,y,a,b,x,y), vert(y,x,b,a,y,x,b,a)));\n}\nrect theGreen = rect(1, 1, darkseagreen);\nrect theYellow = rect(1,1,khaki);\nrect theBlue = rect(1,1,darkcyan);\nrect thePurple = rect(1,1, mediumslateblue);\ncheckerboard(theGreen, theBlue, theYellow, thePurple);"
    },
    {
      id: 14, 
      code: "rect triangle = over(BR, rect(12,12,lightcoral), over(TL, rect(11,11,white), over(BR, rect(10,10, lightcoral), over(TL, rect(9,9,white), over(BR, rect(8,8,lightcoral), over(TL,  rect(7,7,white), over(BR, rect(6,6, lightcoral), over(TL, rect(5,5,white), over(BR, rect(4,4,lightcoral), over(TL, rect(3,3,white), over(BR, rect(2,2,lightcoral), rect(1,1,white))))))))))));\n\nrect triangleTwo = over(BR, rect(12,12,crimson), over(TL, rect(11,11,white), over(BR, rect(10,10, crimson), over(TL, rect(9,9,white), over(BR, rect(8,8,crimson), over(TL,  rect(7,7,white), over(BR, rect(6,6, crimson), over(TL, rect(5,5,white), over(BR, rect(4,4,crimson), over(TL, rect(3,3,white), over(BR, rect(2,2,crimson), rect(1,1,white))))))))))));\n\ndefine heart(rect one, rect two, rect triangler) {\n      vert(hor(rot(180, triangler), rot(270, triangler), rot(180, triangler), rot(270, triangler)), hor(one, one, one, one), hor(rot(90, triangler), one, one, triangler), hor(two, rot(90, triangler), triangler, two));\n}\n\nrect pinkHeart = heart(rect(12,12,lightcoral), rect(12,12, white), triangle);\nrect redHeart = heart(rect(12,12,crimson), rect(12,12,white), triangleTwo);\nrect row = hor(pinkHeart, redHeart, pinkHeart, redHeart, pinkHeart);\nrect rowTwo = hor(redHeart, pinkHeart, redHeart, pinkHeart, redHeart);\nrect quilt = vert(row, rowTwo, row, rowTwo, row);\nover(C, rect((48*5+20), (48*5+20), crimson), quilt);"
    },
    {
      id: 15, 
      code: "rect one = rect(2,2,orange);\nrect two = rect(2,3,darkorange);\nrect three = rect(2,1,coral);\nrect four = rect(2,3,tomato);\nrect five = rect(2,1,orangered);\nrect blockOne = hor(vert(one, two), vert(three, four, five));\n\nrect six = rect(2,3,yellowgreen);\nrect seven = rect(4,3,olive);\nrect eight = rect(3,2,olivedrab);\nrect nine = rect(3,2,darkolivegreen);\nrect blockTwo = vert(hor(six, seven), hor(eight, nine));\n\nrect ten = rect(5,2,cadetblue);\nrect eleven = rect(2,4,steelblue);\nrect twelve = rect(3,2,cornflowerblue);\nrect thirteen = rect(3,3,royalblue);\nrect fourteen = rect(2,5,mediumblue);\nrect fifteen = rect(2,3,navy);\nrect blockThree = hor(vert(ten, hor(vert(twelve, thirteen), fourteen)), vert(eleven, fifteen));\n\nrect sixteen = rect(5,1,peru);\nrect seventeen = rect(2,3,saddlebrown);\nrect eighteen = rect(5,2,sienna);\nrect blockFour = hor(seventeen, vert(sixteen, eighteen));\n\nrect nineteen = rect(3,3,plum);\nrect twenty = rect(2,2,mediumorchid);\nrect twentyone = rect(2,5,rosybrown);\nrect twentytwo = rect(1,7,rebeccapurple);\nrect blockFive = vert(nineteen, hor(vert(twenty, twentyone), twentytwo));\n\nrect twentythree = rect(2,7,gold);\nrect twentyfour = rect(3,3,yellow);\nrect twentyfive = rect(2,4,khaki);\nrect twentysix = rect(1,4,goldenrod);\nrect blockSix = hor(twentythree, vert(twentyfour, hor(twentyfive, twentysix)));\n\nrect twentyseven = rect(3,5,pink);\nrect twentyeight = rect(2,3,lightpink);\nrect twentynine = rect(2,3,hotpink);\nrect thirty = rect(3,1,palevioletred);\nrect thirtyone = rect(5,2,mediumvioletred);\nrect blockSeven = vert(hor(vert(twentyseven, thirty), vert(twentyeight, twentynine)), thirtyone);\n\nhor(vert(hor(blockOne, blockTwo), hor(vert(blockThree, blockFour), blockFive)), vert(blockSix, blockSeven));"
    },
    {
      id:16,
      code: "rect aliceblue = rect(1,1,aliceblue); \nrect antiquewhite = rect(1,1,antiquewhite); \nrect aqua = rect(1,1,aqua); \nrect aquamarine = rect(1,1,aquamarine); \nrect azure = rect(1,1,azure);\nrect beige = rect(1,1,beige);\nrect bisque = rect(1,1,bisque);\nrect black = rect(1,1,black);\nrect blanchedalmond = rect(1,1,blanchedalmond);\nrect blue = rect(1,1,blue);\nrect blueviolet = rect(1,1,blueviolet);\nrect brown = rect(1,1,brown);\nrect burlywood = rect(1,1,burlywood);\nrect cadetblue = rect(1,1,cadetblue);\nrect chartreuse = rect(1,1,chartreuse);\nrect chocolate = rect(1,1,chocolate);\nrect coral = rect(1,1,coral);\nrect cornflowerblue = rect(1,1,cornflowerblue);\nrect cornsilk = rect(1,1,cornsilk);\nrect crimson = rect(1,1,crimson);\nrect cyan = rect(1,1,cyan);\nrect darkblue = rect(1,1,darkblue);\nrect darkcyan = rect(1,1,darkcyan);\nrect darkgoldenrod = rect(1,1,darkgoldenrod);\nrect darkgrey = rect(1,1,darkgrey);\nrect darkgreen = rect(1,1,darkgreen);\nrect darkkhaki = rect(1,1,darkkhaki);\nrect darkmagenta = rect(1,1,darkmagenta);\nrect darkolivegreen = rect(1,1,darkolivegreen);\nrect darkorange = rect(1,1,darkorange);\nrect darkorchid = rect(1,1,darkorchid);\nrect darkred = rect(1,1,darkred);\nrect darksalmon = rect(1,1,darksalmon);\nrect darkseagreen = rect(1,1,darkseagreen);\nrect darkslateblue = rect(1,1,darkslateblue);\nrect darkslategrey = rect(1,1,darkslategrey);\nrect darkturquoise = rect(1,1,darkturquoise);\nrect darkviolet = rect(1,1,darkviolet);\nrect deeppink = rect(1,1,deeppink);\nrect deepskyblue = rect(1,1,deepskyblue);\nrect dimgrey = rect(1,1,dimgrey);\nrect dodgerblue = rect(1,1,dodgerblue);\nrect firebrick = rect(1,1,firebrick);\nrect floralwhite = rect(1,1,floralwhite);\nrect forestgreen = rect(1,1,forestgreen);\nrect fuchsia = rect(1,1,fuchsia);\nrect gainsboro = rect(1,1,gainsboro);\nrect ghostwhite = rect(1,1,ghostwhite);\nrect gold = rect(1,1,gold);\nrect goldenrod = rect(1,1,goldenrod);\nrect grey = rect(1,1,grey);\nrect green = rect(1,1,green);\nrect greenyellow = rect(1,1,greenyellow);\nrect honeydew = rect(1,1,honeydew);\nrect hotpink = rect(1,1,hotpink);\nrect indianred = rect(1,1,indianred);\nrect indigo = rect(1,1,indigo);\nrect ivory = rect(1,1,ivory);\nrect khaki = rect(1,1,khaki);\nrect lavender = rect(1,1,lavender);\nrect lavenderblush = rect(1,1,lavenderblush);\nrect lawngreen = rect(1,1,lawngreen);\nrect lemonchiffon = rect(1,1,lemonchiffon);\nrect lightblue = rect(1,1,lightblue);\nrect lightcoral = rect(1,1,lightcoral);\nrect lightcyan = rect(1,1,lightcyan);\nrect lightgoldenrodyellow = rect(1,1,lightgoldenrodyellow);\nrect lightgrey = rect(1,1,lightgrey);\nrect lightgreen = rect(1,1,lightgreen);\nrect lightpink = rect(1,1,lightpink);\nrect lightsalmon = rect(1,1,lightsalmon);\nrect lightseagreen = rect(1,1,lightseagreen);\nrect lightskyblue = rect(1,1,lightskyblue);\nrect lightslategrey = rect(1,1,lightslategrey);\nrect lightsteelblue = rect(1,1,lightsteelblue);\nrect lightyellow = rect(1,1,lightyellow);\nrect lime = rect(1,1,lime);\nrect limegreen = rect(1,1,limegreen);\nrect linen = rect(1,1,linen);\nrect magenta = rect(1,1,magenta);\nrect maroon = rect(1,1,maroon);\nrect mediumaquamarine = rect(1,1,mediumaquamarine);\nrect mediumblue = rect(1,1,mediumblue);\nrect mediumorchid = rect(1,1,mediumorchid);\nrect mediumpurple = rect(1,1,mediumpurple);\nrect mediumseagreen = rect(1,1,mediumseagreen);\nrect mediumslateblue = rect(1,1,mediumslateblue);\nrect mediumspringgreen = rect(1,1,mediumspringgreen);\nrect mediumturquoise = rect(1,1,mediumturquoise);\nrect mediumvioletred = rect(1,1,mediumvioletred);\nrect midnightblue = rect(1,1,midnightblue);\nrect mintcream = rect(1,1,mintcream);\nrect mistyrose = rect(1,1,mistyrose);\nrect moccasin = rect(1,1,moccasin);\nrect navajowhite = rect(1,1,navajowhite);\nrect navy = rect(1,1,navy);\nrect oldlace = rect(1,1,oldlace);\nrect olive = rect(1,1,olive);\nrect olivedrab = rect(1,1,olivedrab);\nrect orange = rect(1,1,orange);\nrect orangered = rect(1,1,orangered);\nrect orchid = rect(1,1,orchid);\nrect palegoldenrod = rect(1,1,palegoldenrod);\nrect palegreen = rect(1,1,palegreen);\nrect paleturquoise = rect(1,1,paleturquoise);\nrect palevioletred = rect(1,1,palevioletred);\nrect papayawhip = rect(1,1,papayawhip);\nrect peachpuff = rect(1,1,peachpuff);\nrect peru = rect(1,1,peru);\nrect pink = rect(1,1,pink);\nrect plum = rect(1,1,plum);\nrect powderblue = rect(1,1,powderblue);\nrect purple = rect(1,1,purple);\nrect rebeccapurple = rect(1,1,rebeccapurple);\nrect red = rect(1,1,red);\nrect rosybrown = rect(1,1,rosybrown);\nrect royalblue = rect(1,1,royalblue);\nrect saddlebrown = rect(1,1,saddlebrown);\nrect salmon = rect(1,1,salmon);\nrect sandybrown = rect(1,1,sandybrown);\nrect seagreen = rect(1,1,seagreen);\nrect seashell = rect(1,1,seashell);\nrect sienna = rect(1,1,sienna);\nrect silver = rect(1,1,silver);\nrect skyblue = rect(1,1,skyblue);\nrect slateblue = rect(1,1,slateblue);\nrect slategrey = rect(1,1,slategrey);\nrect snow = rect(1,1,snow);\nrect springgreen = rect(1,1,springgreen);\nrect steelblue = rect(1,1,steelblue);\nrect tan = rect(1,1,tan);\nrect teal = rect(1,1,teal);\nrect thistle = rect(1,1,thistle);\nrect tomato = rect(1,1,tomato);\nrect turquoise = rect(1,1,turquoise);\nrect violet = rect(1,1,violet);\nrect wheat = rect(1,1,wheat);\nrect white = rect(1,1,white);\nrect whitesmoke = rect(1,1,whitesmoke);\nrect yellow = rect(1,1,yellow);\nrect yellowgreen = rect(1,1,yellowgreen);\nrect a = hor(pink, lightpink, hotpink, deeppink, palevioletred, mediumvioletred, thistle, plum, orchid, violet, fuchsia, magenta);\nrect b = hor(mediumorchid, darkorchid, darkviolet, blueviolet, darkmagenta, purple, mediumpurple, mediumslateblue, slateblue, darkslateblue, rebeccapurple, indigo);\nrect c = hor(lightsalmon, salmon, darksalmon, lightcoral, indianred, coral, tomato, orangered, red, crimson, firebrick, brown);\nrect d = hor(maroon, darkred, saddlebrown, sienna, chocolate, orange, darkorange, gold, yellow, khaki, goldenrod, darkgoldenrod);\nrect e = hor(darkkhaki, greenyellow, chartreuse, lawngreen, lime, limegreen, palegreen, lightgreen, mediumspringgreen, springgreen, mediumseagreen, seagreen);\nrect f = hor(forestgreen, green, darkgreen, yellowgreen, olivedrab, darkolivegreen, olive, mediumaquamarine, darkseagreen, lightseagreen, darkcyan, teal);\nrect g = hor(aqua, cyan, lightcyan, paleturquoise, aquamarine, turquoise, mediumturquoise, darkturquoise, cadetblue, steelblue, lightsteelblue, lightblue);\nrect h = hor(powderblue, lightskyblue, skyblue, cornflowerblue, deepskyblue, dodgerblue, royalblue, blue, mediumblue, darkblue, navy, midnightblue);\nrect i = hor(lightgrey, silver, darkgrey, dimgrey, grey, lightslategrey, slategrey, darkslategrey, black, blanchedalmond, bisque, navajowhite,);\nrect j = hor(wheat, burlywood, tan, rosybrown, sandybrown, peru, lightyellow, cornsilk, lemonchiffon, lightgoldenrodyellow, papayawhip, moccasin);\nrect k = hor(peachpuff, palegoldenrod, antiquewhite, linen, lavenderblush, mistyrose, lavender, gainsboro, whitesmoke, seashell, beige, oldlace);\nrect l = hor(floralwhite, ivory,snow, honeydew, mintcream, azure, aliceblue, ghostwhite, white, white, white, white);\nvert(a, b, c, d, e, f, g, h, i, j, k, l);"
    }
  ];

  
  
  

  const canvasRefs = useRef([]);

  useEffect(() => {
    exampleDesigns.forEach((example, index) => {
      const canvas = canvasRefs.current[index];
      if (canvas) {
        renderDesign(canvas, example.code);
      }
    });
  }, [exampleDesigns]);

  return (
    <div className="examples-container">
      <div className="navbar">
        <ul>
          <li>
            <a href="/" id="logo">
              Quilt Designer
            </a>
          </li>
        </ul>
        <div className="navbar-links">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/play">Play</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/examples">Tutorial</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="document-links">
        <ul>
          <li>
            <a href="/gettingStarted">
              <FontAwesomeIcon icon={faHouse} className="icon" /> Definitions & Variables
            </a>
          </li>
          <li>
            <a href="/functions">
              <FontAwesomeIcon icon={faPenFancy} className="icon" /> Functions
            </a>
          </li>
        </ul>
      </div>
      <h1>Examples</h1>
      <div className="responsive-container">
      <div className="picture-container">
        {exampleDesigns.map((example, index) => (
          <Link
            key={example.id}
            to={`/play/${encodeURIComponent(example.code)}`}
          >
            <canvas
              ref={(el) => (canvasRefs.current[index] = el)}
              width={325}
              height={325}
              title={example.code}
              className="example-canvas"
            />
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Examples;