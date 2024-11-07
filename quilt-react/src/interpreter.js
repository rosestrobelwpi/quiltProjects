
const parser = require("./autogenparser")

//our environment is a javascript object
const environment = {}

//want some objects to hold information about the patches/designs
function Patch(x, y, width, height, color) {
    this.x = x,
    this.y = y,
    this.width = width,
    this.height = height,
    this.color = color
}

function Design(maxWidth, maxHeight, patches) {
    this.width = maxWidth,
    this.height = maxHeight,
    this.patches = patches
}

//some sample strings to parse
//testAST = parser.parse("(2+2)*(1+2)")
//testAST = parser.parse("(vert (rect 1 2) (rect 2 2))")
//testAST = parser.parse("(vert (vert (rect 2 2 red)(rect 2 2 blue))(vert (rect 2 2 yellow)(rect 2 2 green)))")
//testAST = parser.parse("(vert (rect 2 2) (hor (rect 1 2) (rect 2 2)))")
//testAST = parser.parse("(vert (hor (rect 2 2 blue) (rect 2 3 red)) (rect 2 3 yellow))")
//testAST = parser.parse("(vert (rect 1 2 red)(rect 2 2 blue)(rect 2 2 green)(rect 3 3 pink))")
//testAST = parser.parse("(vert (vert (rect 1 1 red)(rect 1 1 blue))(vert (rect 2 2 green)(rect 2 2 yellow))(vert (rect 3 3 black)(rect 3 3 pink)))")
//testAST = parser.parse("(vert (vert (rect 1 1 red)(rect 1 1 blue)(rect 1 1 red))(vert (rect 2 2 green)(rect 2 2 yellow)(rect 2 2 green))(vert (rect 3 3 black)(rect 3 3 pink)(rect 3 3 black)))")
testAST = parser.parse("hor(vert(rect(1, 2, red), rect(1, 2, blue), rect(1, 2, red)), vert(rect(2, 2, yellow), rect(2, 2, green), rect(2, 2, yellow)), vert(rect(3, 2, black), rect(3, 2, pink), rect(3, 2, black)))")
//testAST = parser.parse("vert(hor(rect(2, 1, red), rect(2, 1, blue), rect(2, 1, red)), hor(rect(2, 2, yellow), rect(2, 2, green), rect(2, 2, yellow)), hor(rect(2, 3, black), rect(2, 3, pink), rect(2, 3, black)))")
//testAST = parser.parse("vert(rect(2, 2, red), rect(3, 3, blue))")

console.log(evaluator(environment, testAST))
//evaluator(environment, testAST)

//returns Design object, containing information about every patch that is to be displayed
function evaluator (env, node) {
    switch (node.tag) {
        case TAG_NAT:
            return node.value
            break;

        case TAG_COLOR:
            return node.name
            break;
        
        case TAG_RECT:
            //single patch, initialize to origin, give it the width, height, color
            let width = evaluator(env, node.width)
            let height = evaluator(env, node.height)
            let color = evaluator(env, node.color) 
            return new Patch(0, 0, width, height, color) //set all patches to be at (0,0) initially, then update when combining into Design (in hor/vert/etc)
            break;

        case TAG_HOR:
           //first one we don't change, it will be positioned at the origin
           let firstDesignHor = evaluator(env, node.design[0])
           let allPatchesHor = [] //keep track of all patches to put in the new Design object
           let prevPatchHor = {} //keep track of the last patch processed for calculating the next coordinates
           let heightHor = null
           if (firstDesignHor instanceof Patch) {
               allPatchesHor.push(firstDesignHor)
               prevPatchHor = firstDesignHor //keep track of last patch
               heightHor = firstDesignHor.height //height to match is height of this single patch
           } else if (firstDesignHor instanceof Design) {
               allPatchesHor.push(firstDesignHor.patches)
               allPatchesHor = allPatchesHor.flat() // so that we just have a 1D array
               prevPatchHor = firstDesignHor.patches[(firstDesignHor.patches).length - 1] //keep track of very last patch
               heightHor = firstDesignHor.height //height to match is the overall height of this design
           } else {
               print("First element is not a Patch or Design, something went wrong")
           }
           
           //now we process all of the rest of the patches/designs
           let sumWidthsHor = firstDesignHor.width //since this is placing horizontally, we add all the widths to get the overall Design width
           for (let i = 1; i < (node.design).length; i++) { //start at index 1 bc already took care of the first one
                let currentDesign = evaluator(env, node.design[i]) //recursively process the very next Patch/Design
                if (currentDesign.height != heightHor) { //check to make sure heights are compatable, works regardless of if it's a Design or a Patch
                    console.error("Input Error: Heights need to be the same in order to place Patches horizontally.")
                    return "unsuccessful :( please make sure heights match when using hor()";
                }
                if (currentDesign instanceof Patch) { //Patch case is easier since we only have to worry about a single Patch
                    currentDesign.x = (prevPatchHor.width + prevPatchHor.x) //since hor, this calculation will give us the correct x-value
                    sumWidthsHor += currentDesign.width //width bookkeeping
                    allPatchesHor.push(currentDesign) //add updated Patch to our collection
                    prevPatchHor = currentDesign //making sure to update prevPatch so that the next processed Patch has the correct information
                } else if (currentDesign instanceof Design) { //Design case more complicated since we have to loop through all the Patches inside
                    let lastPatch = {}
                    for (let patch of currentDesign.patches) {
                        patch.x = (prevPatchHor.width + prevPatchHor.x)
                        allPatchesHor.push(patch) //add updated Patches as we modify each
                        lastPatch = patch 
                    }
                    prevPatchHor = lastPatch
                    sumWidthsHor += currentDesign.width //width bookkeeping
                } else {
                   print("Not a Patch or Design, something went wrong")
                }
            }         
            //appearently need "..." (spread operator) in order for Math.max to work on array
            return new Design(sumWidthsHor, heightHor, allPatchesHor)
            break;

        case TAG_VERT:
           //first one we don't change, it will be positioned at the origin
           let firstDesignVert = evaluator(env, node.design[0])
           let allPatchesVert = [] //keep track of all patches to put in the new Design object
           let prevPatchVert = {} //keep track of the last patch processed for calculating the next coordinates
           let widthVert = null //first Patch will determine the width for the Vert
           if (firstDesignVert instanceof Patch) {
               allPatchesVert.push(firstDesignVert)
               prevPatchVert = firstDesignVert //keep track of last patch
               widthVert = firstDesignVert.width 
           } else if (firstDesignVert instanceof Design) {
               allPatchesVert.push(firstDesignVert.patches)
               allPatchesVert = allPatchesVert.flat() // so that we just have a 1D array
               prevPatchVert = firstDesignVert.patches[(firstDesignVert.patches).length - 1] //keep track of very last patch
               widthVert = firstDesignVert.width
           } else {
               print("First element is not a Patch or Design, something went wrong")
           }
           
           //now we process all of the rest of the patches/designs
           let sumHeightsVert = firstDesignVert.height //since this is placing vertically, we add all the heights to get the overall Design height
           for (let i = 1; i < (node.design).length; i++) { //start at index 1 bc already took care of the first one
                let currentDesign = evaluator(env, node.design[i]) //recursively process the very next Patch/Design
                if (currentDesign.width != widthVert) { //check to make sure widths are compatable, works regardless of if it's a Design or a Patch
                    console.error("Input Error: Widths need to be the same in order to place Patches vertically.")
                    return "unsuccessful :( please make sure widths match when using vert()";
                }
                if (currentDesign instanceof Patch) { //Patch case is easier since we only have to worry about a single Patch
                    currentDesign.y = (prevPatchVert.height + prevPatchVert.y) //since vert, this calculation will give us the correct y-value
                    sumHeightsVert += currentDesign.height //height bookkeeping
                    allPatchesVert.push(currentDesign) //add updated Patch to our collection
                    prevPatchVert = currentDesign //making sure to update prevPatch so that the next processed Patch/Design has the correct information
                } else if (currentDesign instanceof Design) { //Design case more complicated since we have to loop through all the Patches inside
                    let lastPatch = {} //eventually will want to set prevPatchVert to be the last Patch in the Design
                    for (let patch of currentDesign.patches) {
                        patch.y += (prevPatchVert.height + prevPatchVert.y)
                        allPatchesVert.push(patch) //add updated Patches as we modify each
                        lastPatch = patch //when for loop terminates, lastPatch will contain the very last patch in the Design
                    }
                    prevPatchVert = lastPatch //make sure to update for next Patch/Design
                    sumHeightsVert += currentDesign.height //height bookkeeping, design should already know its overall height
                } else {
                   print("Not a Patch or Design, something went wrong")
                }
            }         

            return new Design(widthVert, sumHeightsVert, allPatchesVert)
            break;

        case TAG_PLUS:
            return evaluator(node.left) + evaluator(node.right)
            break;

        case TAG_TIMES:
            return evaluator(node.left) * evaluator(node.right)
            break;
    }
}

//shallow copy
function evaluatorDefn (env, node) {
    switch (node.tag) {
        case TAG_VARIABLE:
            let keyVar = node.name //key is the name of the variable
            env[`${keyVar}`] = evaluator(env, node) //value is the value returned after evaluating the value (reword to not use the word value 3 times)
            break;

        case TAG_DEPENDENT_FUNC:
            key = node.name //we should change the name of these
            env[`${key}`] = [node.args, node.body] //is this right idk im so tired
            break;
    }
}