// run with 
// node typechecker.js
import structuredClone from '@ungap/structured-clone';

//const parser = require("./autogenparser")
const {
    TAG_RECT, TAG_NAT_NUM, TAG_COLOR, TAG_HOR, TAG_VERT, TAG_PLUS, TAG_TIMES, TAG_VARIABLE, TAG_ROTATION, TAG_ROT, TAG_REPX, TAG_REPY,
    TAG_IDENTIFIER, TAG_VAR_CALL, TAG_OVER, TAG_PROGRAM, TAG_ASSIGNMENT, TAG_FUNC, TAG_FUN_CALL, TAG_TYPE_EQUALITY, TAG_ARG, TAG_SOLID, TAG_PIXEL,
    TAG_NAT
} = require('./parserASTfunction.js');



//let testAST = parser.parse('hor (rect(1, 1, red), rect(1, 1, blue))')
//let testAST = parser.parse('rect(1, 1, blue);')
//let testAST = parser.parse('rect x = rect(1, 1, blue); x;')
//let testAST = parser.parse('rect x = rect(2,2,blue); rect y = rect(1,1,green); hor(x, y);');
//let testAST = parser.parse('define thefunc (int x) { rect(1, 1, blue); } rect(1,1,green);')
//let testAST = parser.parse('define thefunc (int x) { rect(1, 1, blue); } thefunc(2);')

//let testAST = parser.parse('define weee(int x, int y) { rect(x, y, blue); } int twe = 3; weee(1, twe);');


//ones that specifically throw errors intentionally
//let testAST = parser.parse('rect x = rect(2,2,blue); rect y = rect(1,1,green); hor(a, b);');
//let testAST = parser.parse('rect x = rect(2,2,blue); x = 3; rect(1, 1, blue);');

//console.log(check(context, testAST))

export default function typechecker(node) {
    const context = {}
    return check(context, node);
}

function check(context, node){
    switch (node.tag) {
        case TAG_PROGRAM:
            //definitions, quilt
            if (node.definitions === undefined)
                return check(context, node.quilt)
            else {
                for (let x=0; x < node.definitions.length; x++){
                    let theDef = checkDefn(context, node.definitions[x])
                    //can be function, variable, assignment
                    if (!(theDef === TAG_FUNC || theDef === TAG_VARIABLE || theDef === TAG_ASSIGNMENT)){
                        throw new Error(`Expected Definitions for a design, got ${theDef}.`);
                    }
                }
                return check(context, node.quilt);
            }
        case TAG_NAT_NUM:
            if (Number.isInteger(node.value)) {
                return TAG_NAT_NUM;
            }
            else {
                throw new Error(`Expected a natural number, got ${node.value}.`);
            }

        case TAG_PLUS:
            if (check(context, node.left) === TAG_NAT_NUM && check(context, node.right) === TAG_NAT_NUM) {
                return TAG_NAT_NUM;
                return TAG_NAT_NUM;
            }
            else {
                throw new Error(`Expected two natural numbers to add, got ${node.left.value} and ${node.right.value}.`);
            }

        //this may not work?
        case TAG_TYPE_EQUALITY:
            return TAG_TYPE_EQUALITY;
        
        case TAG_TIMES:
            if (check(context, node.left) === TAG_NAT_NUM && check(context, node.right) === TAG_NAT_NUM) {
                return TAG_NAT_NUM;
                return TAG_NAT_NUM;
            }
            else {
                throw new Error(`Expected two natural numbers to multiply, got ${node.left} and ${node.right}.`);
            }

        case TAG_VARIABLE:
            //should not get to here?
            return checkDefn(context, node);

        case TAG_ASSIGNMENT:
            //also should not get to here
            return checkDefn(context, node);

        case TAG_FUNC:
            //should not reach this either I think
            return checkDefn(context, node);

        case TAG_VAR_CALL:
            //get the tag of the variable
            let curTag = context[node.name];
            if (curTag === undefined){
                throw new Error(`Variable ${node.name} was not properly defined.`);
            }
            else {return curTag;}


        case TAG_FUN_CALL:
            //first, make sure tags of inputted args match func args tags
            let theFunc = context[node.name];
            let oldTags = theFunc[0];
            let theBody = theFunc[1];
            let newCon = structuredClone(context); //may need to clone instead?
            if (oldTags.length !== node.args.length) {
                throw new Error(`Amount of inputs do not match function number of inputs.`);
            }
            for (let x=0; x < oldTags.length; x++){
                //first get old tag
                let curOld = check(context, oldTags[x]);
                //then get new tag
                let curNew = check(context, node.args[x]);
                //then check if equal + add to new context
                if (curOld === curNew){
                    newCon[oldTags[x].name] = curNew; //setting new context nameofarg = tag
                }
                //if not, throw error msg
                else {
                    throw new Error(`Argument types of function call do not match function inputs.`);
                }
            }
            //second, clone context + put inputted args into new context I DID
            //third, check body tag w new context- should output rect
            return check(newCon, theBody);


        //returns the identifier type
        case TAG_ARG:
            return check(context, node.type);

        //MAY NEED TO CHANGE?
        case TAG_IDENTIFIER:
            let theType = node.name;
            if (theType === 'int') {
                return TAG_NAT_NUM;
            }
            else if (theType === 'rect') {
                return TAG_RECT;
            }
            else if (theType === 'solid') {
                return TAG_SOLID;
            }
            else if (theType === 'str') {
                throw new Error(`This is a placeholder for str. Not implemented.`);
            }
            else if (theType === 'rot') {
                return TAG_ROT;
            }     //"int" / "rect" / "solid" / "str" / "rot"
            else {throw new Error(`No adequate type given. Got a ${theType}`);}

        case TAG_VERT:
            for (let x=0; x < node.design.length; x++){
                let theRect = check(context, node.design[x])
                if (theRect !== TAG_RECT){
                    throw new Error(`Expected Rectangles for a design, got ${theRect}.`);
                }
            }
            return TAG_RECT;

        case TAG_HOR:
            for (let x=0; x < node.design.length; x++){
                let theRect = check(context, node.design[x])
                if (theRect !== TAG_RECT){
                    throw new Error(`Expected Rectangles for a design, got ${theRect}.`);
                }
            }
            return TAG_RECT;

        //Over has an anchor but I believe I am strict with what can be an anchor
        //It won't accept anything other than TL/TR/BL/BR/C
        case TAG_OVER:
            for (let x=0; x < node.design.length; x++){
                let theRect = check(context, node.design[x])
                if (theRect !== TAG_RECT){
                    throw new Error(`Expected Rectangles for a design, got ${theRect}.`);
                }
            }
            return TAG_RECT;

        case TAG_REPX:
            if (check(context, node.value) !== TAG_NAT_NUM) {
                throw new Error(`Expected Integer to repeat over, got ${node.left}.`);
            }
            if (check(context, node.design) !== TAG_RECT) {
                throw new Error(`Expected some kind of rect, got ${check(context, node.design)}.`)
            }
            return TAG_RECT;

        case TAG_REPY:
            if (check(context, node.value) !== TAG_NAT_NUM) {
                throw new Error(`Expected Integer to repeat over, got ${node.left}.`);
            }
            if (check(context, node.design) !== TAG_RECT) {
                throw new Error(`Expected some kind of rect, got ${check(context, node.design)}.`)
            }
            return TAG_RECT;

        case TAG_ROT:
            if (check(context, node.angle) !== TAG_ROTATION) {
                throw new Error(`Expected 0/90/180/270 to rotate by, got ${node.left}.`);
            }
            if (check(context, node.design) !== TAG_RECT) {
                throw new Error(`Expected some kind of rect, got ${check(context, node.design)}.`)
            }
            return TAG_RECT;

        //may need to change
        case TAG_ROTATION:
            if (node.value === 0 || node.value === 90 || node.value === 180 || node.value === 270){
                return TAG_ROTATION;
            }
            else {
                throw new Error(`Expected 0/90/180/270 to rotate by, got ${node.value}.`);
            }

        case TAG_RECT:
            if (check(context, node.width) !== TAG_NAT_NUM) {
                throw new Error(`Expected width as an integer, got ${node.width}.`);
            }
            if (check(context, node.height) !== TAG_NAT_NUM) {
                throw new Error(`Expected height as an integer, got ${node.height}.`);
            }
            if (check(context, node.color) !== TAG_COLOR) {
                throw new Error(`Expected a color, got ${node.color}.`);
            }
            return TAG_RECT;

        case TAG_COLOR:
            let colorArray = ["red", "orange", "yellow", "green", "blue", "purple", "black", "pink", "brown", "grey", "gray", "white", "larry"];
            if (colorArray.includes(node.name)){
                return TAG_COLOR;
            }
            else {
                throw new Error(`Expected a color, got ${node.name}.`);
            }

        //we also technically have solid, its not used
        case TAG_SOLID:
            if (check(context, node.width) !== TAG_NAT_NUM) {
                throw new Error(`Expected width as an integer, got ${node.width}.`);
            }
            if (check(context, node.height) !== TAG_NAT_NUM) {
                throw new Error(`Expected height as an integer, got ${node.height}.`);
            }
            if (check(context, node.color) !== TAG_COLOR) {
                throw new Error(`Expected a color, got ${node.color}.`);
            }
            return TAG_RECT;

        //technically have pixel, its not used
        case TAG_PIXEL:
            if (check(context, node.red) !== TAG_NAT_NUM || check(context, node.green) !== TAG_NAT_NUM
                || check(context, node.red) !== TAG_NAT_NUM || check(context, node.red) !== TAG_NAT_NUM) {
                    throw new Error(`Pixels are not rgba values (integers).`);
                }
            else {
                return TAG_PIXEL;
            }
        default:
            throw new Error(`Tag did not match any implemented tags`);
    }
}



function checkDefn (context, node) {
    switch (node.tag) {
        //can be function, variable, assignment

        case TAG_VARIABLE:
            //if context already has variable name that is bad
            //so we check if it has: if yes, send error, else add to con
            //however- maybe we dont care about that?? i cant tell
            if (check(context, node.type) !== check(context, node.value)) {
                throw new Error(`Expected a ${check(context, node.type)}, got a ${check(context, node.value)}.`);
            }

            if (context[node.name] !== undefined) {
                console.log("context", context[node.name])
                throw new Error(`Expected a new variable declaration, got old ${node.name}.`); }
            else {
                context[node.name] = check(context, node.value); } //puts tag into context
            //returning tag_variable because this only gets called when defining variables
            //so the program needs to know it did it correctly
            return TAG_VARIABLE;

        case TAG_ASSIGNMENT:
            //BECAUSE ASSIGNMENTS ONLY CURRENTLY ACCEPT INT / RECT
            //THAT IS WHAT WE WILL KEEP IT AS
            //....
            //except maybe we can keep as is?
            //first get the old tag
            let oldTag = context[node.name];
            if (oldTag === undefined) {
                throw new Error(`No typed variable available to reassign for ${node.name}.`)
            }
            if (oldTag !== check(context, node.value)) {
                throw new Error(`Old type does not match new type of variable.`); }//tag didnt match old tag, this is error
            //"int" / "rect" / "solid" / "str" / "rot"
            //returning assignment tag because this only gets called at the beginning of program
            //when defining assignments
            //i think?
            return TAG_ASSIGNMENT;

        case TAG_FUNC:
            //i have name, args, body
            //first check if exists already
            if (context[node.name] !== undefined) {
                throw new Error(`Function ${node.name} was already declared.`);
            }
            else {
                //args + body
                //arg returns the identifier type
                //can i slot this into context?
                let fakeCon = structuredClone(context);
                //idk about args. Will check back. there is problem.
                //check thru args put into fakcecon not real so that they r not vars and then check that fakecon w body expr
                //if return rect yippe
                for (let x=0; x<node.args.length; x++){
                    let theArg = check(context, node.args[x]);
                    //should be only nat_num / rect
                    if (!(theArg === TAG_RECT || theArg === TAG_NAT_NUM)){
                        throw new Error(`Expected a rect or natural number for an argument, got ${theArg}.`);
                    } else {
                        fakeCon[node.args[x].name] = theArg;
                    }
                }
                // now i check body with fakecon which has args
                if (check(fakeCon, node.body) !== "RECT") {
                    throw new Error(`Expected a RECT, got a ${check(context, node.body)}.`);
                }
                // (let x=0; x < node.definitions.length; x++){
                //     let theDef = checkDefn(context, node.definitions[x])
                //     //can be function, variable, assignment
                //     if (!(theDef === TAG_FUNC || theDef === TAG_VARIABLE || theDef === TAG_ASSIGNMENT)){
                //         throw new Error(`Expected Definitions for a design, got ${theDef}.`);
                //     }
                //inserting into context as is- will change later depending on what inputs
                context[node.name] = [node.args, node.body];
            }
            return TAG_FUNC;
        default:
            throw new Error(`Tag did not match any implemented tags`);
    }
}