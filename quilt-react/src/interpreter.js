import structuredClone from "@ungap/structured-clone";

const {
    TAG_RECT, TAG_NAT_NUM, TAG_COLOR, TAG_HOR, TAG_VERT, TAG_PLUS, TAG_TIMES, TAG_VARIABLE, TAG_ROTATION, TAG_ROT, TAG_REPX, TAG_REPY,
    TAG_VAR_CALL, TAG_OVER, TAG_PROGRAM, TAG_ASSIGNMENT, TAG_FUNC, TAG_FUN_CALL
} = require('./parserASTfunction.js');

const parser = require("./parser.js");



//want some objects to hold information about the patches/designs
function Patch(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    //FIXME testing out images
    //this.rotationFromOriginal = rotationFromOriginal;
}

function Design(maxWidth, maxHeight, patches) {
    this.width = maxWidth;
    this.height = maxHeight;
    this.patches = patches;
}


//ERRORS TO ADD: at least 2 rectangles for hor,vert,etc

export default function evaluator(node) {
    //our environment is a javascript object
    const environment = {};
    return evaluatorLogic(environment, node);
}

//returns a Patch or Design object, containing information about every patch that is to be displayed
function evaluatorLogic(env, node) {
    switch (node.tag) {
        case TAG_PROGRAM:
            for (let defn of node.definitions) {
                //Add everything to environment that needs to be there
                evaluatorLogic(env, defn) //FIXME would it be better to directly call evaluatorDefn?
            }
            let quilt = evaluatorLogic(env, node.quilt)
            console.log("QUILT:", quilt)
            return quilt

        case TAG_VARIABLE:
        case TAG_ASSIGNMENT://this is actually re-assignment, the initial assignment happens in Variable - but essentially doing the same thing as Variable
        case TAG_FUNC:
            evaluatorDefn(env, node)
            break;
        
        case TAG_VAR_CALL: 
            let lookup = env[node.name];
            let clone = structuredClone(lookup); // don't want to directly change the original in case we are reusing a rectangle in multiple places
            if (lookup instanceof Patch) {
                Object.setPrototypeOf(clone, Patch.prototype); // because JS is STUPID and has to be reminded that it is a Patch object
            } else if (lookup instanceof Design) {
                Object.setPrototypeOf(clone, Design.prototype); // because JS is STUPID and has to be reminded that it is a Design object
            } else {
                // console.log("i am trying to lookup", node.name)
                // console.log("i got a ", clone)
                // console.log("bad environment lookup");
            }
            return clone;

        case TAG_FUN_CALL:
            //node has function name and the function inputs
            //environment has parameter names and function body
            let lookUp = env[node.name]
            let paramNames = lookUp[0]
            let funcBody = lookUp[1]

            //evaluate each input first
            let evaluatedArgs = []
            for (let arg of node.args) {
                console.log("arg tag!!", arg.tag)
                evaluatedArgs.push(evaluatorLogic(env, arg))
                console.log("what did it giv?!", evaluatedArgs)
            }

            //insert into environment (like a variable)
            //UPDATED here for new environment
            const newEnvironment = structuredClone(env)
            let i = 0;
            for (let evaluatedArg of evaluatedArgs) {
                newEnvironment[paramNames[i].name] = evaluatedArg;
                i++;
            }

            //now we can evaluate the function body, now that the environment has the input names connected to the values
            console.log("this is func body", funcBody)
            console.log("env before lookin at funcbody maybe", newEnvironment)
            return evaluatorLogic(newEnvironment, funcBody)
       
        case TAG_NAT_NUM:
            return node.value

        case TAG_ROTATION:
            return node.value

        case TAG_COLOR:
            return node.name
        
        case TAG_RECT:
            //single patch, initialize to origin, give it the width, height, color
            let width = evaluatorLogic(env, node.width)
            let height = evaluatorLogic(env, node.height)
            let color = evaluatorLogic(env, node.color) 
            return new Patch(0, 0, width, height, color) //set all patches to be at (0,0) initially, then update when combining into Design (in hor/vert/etc)
        
        case TAG_OVER:
            let anchor = node.anchor
            let firstDesignOver = evaluatorLogic(env, node.design[0]) //can be a Patch or Design
            let allPatchesOver = []
            let x;
            let y;
            if (firstDesignOver instanceof Patch) {
                allPatchesOver.push(firstDesignOver)
                x = firstDesignOver.x
                y = firstDesignOver.y
            } else if (firstDesignOver instanceof Design) {
                allPatchesOver.push(firstDesignOver.patches)
                allPatchesOver = allPatchesOver.flat()
                x = firstDesignOver.patches[0].x //taking first patch in design's coordinates, should always be in the correct order
                y = firstDesignOver.patches[0].y
            } else {
                console.log("this is not a Patch or Design, something went wrong")
            }

            for (let i = 1; i < (node.design).length; i++) {
                let currentDesign = evaluatorLogic(env, node.design[i])
                if (currentDesign.width >  firstDesignOver.width && currentDesign.height > firstDesignOver.height) {
                    throw new Error("Patch #" + (i+1) + " is wider AND taller than the Design it is being placed over. Please put the larger Design first.")
                } else if(currentDesign.width >  firstDesignOver.width) {
                    throw new Error("Patch #" + (i+1) + " is wider than the Design it is being placed over. Please put the larger Design first.")
                } else if (currentDesign.height > firstDesignOver.height) {
                    throw new Error("Patch #" + (i+1) + " is taller than the Design it is being placed over. Please put the larger Design first.")
                }

                if (currentDesign instanceof Patch) {
                    switch(anchor) {
                        case "TL":
                            currentDesign.x = x
                            currentDesign.y = y
                            break;
                        case "TR":
                            currentDesign.x = (x + firstDesignOver.width) - currentDesign.width
                            currentDesign.y = y
                            break;
                        case "BL":
                            currentDesign.x = x
                            currentDesign.y = (y + firstDesignOver.height) - currentDesign.height
                            break;
                        case "BR":
                            currentDesign.x = (x + firstDesignOver.width) - currentDesign.width
                            currentDesign.y = (y + firstDesignOver.height) - currentDesign.height
                            break;
                        case "C":
                            currentDesign.x = firstDesignOver.width/2.0 - currentDesign.width/2.0
                            currentDesign.y = firstDesignOver.height/2.0 - currentDesign.height/2.0
                            break;
                        default:
                            console.log("Unsupported Anchor Tag")
                    }
                    allPatchesOver.push(currentDesign)

                } else if (currentDesign instanceof Design) {
                    //calculate change in location using first patch in the Design patches array
                    let xOffset = currentDesign.patches[0].x - x
                    let yOffset = currentDesign.patches[0].y - y
                    for (let patch of currentDesign.patches) {
                        switch(anchor) {
                            case "TL":
                                patch.x -= xOffset
                                patch.y -= yOffset
                                break;
                            //FIXME math from here on quick (not fully thought out) so may have bugs (tested with just 2 examples)
                            case "TR":
                                patch.x += (x + firstDesignOver.width) - currentDesign.width
                                patch.y -= yOffset
                                break;
                            case "BL":
                                patch.x -= xOffset 
                                patch.y += (y + firstDesignOver.height) - currentDesign.height
                                break;
                            case "BR":
                                patch.x += (x + firstDesignOver.width) - currentDesign.width
                                patch.y += (y + firstDesignOver.height) - currentDesign.height
                                break;
                            case "C":
                                patch.x += firstDesignOver.width/2.0 - currentDesign.width/2.0
                                patch.y += firstDesignOver.height/2.0 - currentDesign.height/2.0
                                break;
                            default:
                                console.log("Unsupported Anchor Tag")
                        }
                        allPatchesOver.push(patch)   
                    }
                } else {
                    console.log("this is not a Patch or Design, something went wrong")
                }
            }

            return new Design(firstDesignOver.width, firstDesignOver.height, allPatchesOver)

        case TAG_ROT:
            let angle = evaluatorLogic(env, node.angle)
            let designRot = evaluatorLogic(env, node.design)
            if (designRot instanceof Patch) {
                switch (angle) { 
                    case 0:
                        //designRot.rotationFromOriginal = 0; //#FIXME testing images, could be an issue if sum can be more than 270 (may have to mod)
                        break;
                    case 180: //no change needed
                        //designRot.rotationFromOriginal = 180; //#FIXME testing images, could be an issue if sum can be more than 270 (may have to mod)
                        break; 
                    case 90:
                        //designRot.rotationFromOriginal = 90; //#FIXME testing images, could be an issue if sum can be more than 270 (may have to mod)
                        let tempWidth90 = designRot.width
                        designRot.width = designRot.height;
                        designRot.height = tempWidth90
                        break;
                    case 270: //switch width and height
                        //designRot.rotationFromOriginal = 270; //#FIXME testing images, could be an issue if sum can be more than 270 (may have to mod)
                        let tempWidth270 = designRot.width
                        designRot.width = designRot.height;
                        designRot.height = tempWidth270
                        break;
                    default:
                        console.log("Angle not supported")
                }
            } else if (designRot instanceof Design) {
                //height and width of overall Design need to be switched if rotation is 90 or 270
                if (angle === 90 || angle === 270) {
                    let tempWidth = designRot.width
                    designRot.width = designRot.height;
                    designRot.height = tempWidth
                }
                for (let patch of designRot.patches) {
                    let x;
                    let y;
                    let tempWidth;
                    switch (angle) { //assuming clockwise rotation
                        case 0: //no change needed
                            // | | |
                            // | |*|
                            //patch.rotationFromOriginal = 0;
                            break; 
                        case 90:
                            // | | |
                            // |*| |
                            patch.y += patch.height //moving to what the reference corner should be after the rotation
                            x = patch.x
                            y = patch.y

                            patch.x = -y //equations to rotating round origin
                            patch.y = x  //will result in clockwise movement
                            
                            tempWidth = patch.width //since 90 degrees, the widths and the heights will be switched
                            patch.width = patch.height;
                            patch.height = tempWidth
                            
                            patch.x += designRot.width //in order to display in the correct position on canvas, have to perform translation

                            //patch.rotationFromOriginal = 90;
                            break;
                        case 180: 
                            // |*| |
                            // | | |
                            patch.x += patch.width //appropriate reference corner
                            patch.y += patch.height
                            x = patch.x
                            y = patch.y
                            patch.x = -x //equations to rotating round origin
                            patch.y = -y //will result in clockwise movement
                            
                            patch.x += designRot.width //have to move horizontally and vertically 
                            patch.y += designRot.height 

                            //patch.rotationFromOriginal = 180;
                            break;
                        case 270: 
                            // | |*|
                            // | | |
                            patch.x += patch.width //appropriate reference corner
                            x = patch.x
                            y = patch.y
                            patch.x =  y //equations to rotating round origin
                            patch.y = -x  //will result in clockwise movement
                            
                            tempWidth = patch.width //since 180 degrees, the widths and the heights will be switched
                            patch.width = patch.height;
                            patch.height = tempWidth
                            
                            patch.y += designRot.height //this has to just move vertically since it's above (below) the x-axis (screen coordingates upside down)
                            
                            //patch.rotationFromOriginal = 270;
                            break;
                        default:
                            console.log("Angle not supported")
                    }
                }
            } else {
                console.log("this is not a Patch or Design, something went wrong")
            }
            return designRot;

        case TAG_REPX: //assuming we are repeating in the x direction
            console.log("NODE.DESIGN", node.design)
            let original = evaluatorLogic(env, node.design)
            console.log('ORIGINAL:', original)
            let numRepetitions = evaluatorLogic(env, node.value)
            let allPatchesRep = []

            if (original instanceof Patch) {
                allPatchesRep.push(original)
                let prevX = original.x
                for (let i = 1; i < numRepetitions; i++) { //start at 1 since we've already taken care of the first repetition
                    let newRep = new Patch(prevX + original.width, original.y, original.width, original.height, original.color)
                    allPatchesRep.push(newRep)
                    prevX = newRep.x
                }
            } else if (original instanceof Design) {
                allPatchesRep.push(original.patches)
                allPatchesRep = allPatchesRep.flat() //to ensure 1d array
                for (let i = 1; i < numRepetitions; i++) {
                    let newRep = structuredClone(original) //deep copy - doesn't display the word "Patch" when logged to console, fix on next line
                    Object.setPrototypeOf(newRep, Design.prototype) //it seemed to be working without this, but just for consistancy, give it its prototype back (because JS is STUPID)
                    for (let patch of newRep.patches) {
                        patch.x += (i * original.width) //i represents which repetition we are on, so this calculation will give us the correct offset
                        allPatchesRep.push(patch)
                    }
                }
            }
            return new Design(original.width*numRepetitions, original.height, allPatchesRep)

        case TAG_REPY: //assuming we are repeating in the y direction
            console.log("NODE.DESIGN", node.design)
            let originalY = evaluatorLogic(env, node.design)
            console.log('ORIGINAL:', originalY)
            let numRepetitionsY = evaluatorLogic(env, node.value)
            let allPatchesRepY = []

            if (originalY instanceof Patch) {
                allPatchesRepY.push(originalY)
                let prevY = originalY.y
                for (let i = 1; i < numRepetitionsY; i++) { //start at 1 since we've already taken care of the first repetition
                    let newRep = new Patch(originalY.x, prevY + originalY.height, originalY.width, originalY.height, originalY.color)
                    allPatchesRepY.push(newRep)
                    prevY = newRep.y
                }
            } else if (originalY instanceof Design) {
                allPatchesRepY.push(originalY.patches)
                allPatchesRepY = allPatchesRepY.flat() //to ensure 1d array
                for (let i = 1; i < numRepetitionsY; i++) {
                    let newRep = structuredClone(originalY) //deep copy - doesn't display the word "Patch" when logged to console, fix on next line
                    Object.setPrototypeOf(newRep, Design.prototype) //it seemed to be working without this, but just for consistancy, give it its prototype back (because JS is STUPID)
                    for (let patch of newRep.patches) {
                        patch.y += (i * originalY.height) //i represents which repetition we are on, so this calculation will give us the correct offset
                        allPatchesRepY.push(patch)
                    }
                }
            }
            return new Design(originalY.width, originalY.height*numRepetitionsY, allPatchesRepY)

        case TAG_HOR:
           //first one we don't change, it will be positioned at the origin
           let firstDesignHor = evaluatorLogic(env, node.design[0])
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
               console.log("First element is not a Patch or Design, something went wrong")
           }
           
           //now we process all of the rest of the patches/designs
           console.log(firstDesignHor)
           let sumWidthsHor = firstDesignHor.width //since this is placing horizontally, we add all the widths to get the overall Design width
           let cumulativeWidths = firstDesignHor.width //need to keep track of where to place designs after the first two
           for (let i = 1; i < (node.design).length; i++) { //start at index 1 bc already took care of the first one
                let currentDesign = evaluatorLogic(env, node.design[i]) //recursively process the very next Patch/Design
                if (currentDesign.height !== heightHor) { //check to make sure heights are compatable, works regardless of if it's a Design or a Patch
                    throw new Error("Heights need to be the same in order to place Patches horizontally.");
                    //return "unsuccessful :( please make sure heights match when using hor()";
                }

                if (currentDesign instanceof Patch) { //Patch case is easier since we only have to worry about a single Patch
                    //currentDesign.x = (prevPatchHor.width + prevPatchHor.x) //since hor, this calculation will give us the correct x-value
                    currentDesign.x += cumulativeWidths
                    sumWidthsHor += currentDesign.width //width bookkeeping
                    allPatchesHor.push(currentDesign) //add updated Patch to our collection
                    prevPatchHor = currentDesign //making sure to update prevPatch so that the next processed Patch has the correct information
                    cumulativeWidths += currentDesign.width
                } else if (currentDesign instanceof Design) { //Design case more complicated since we have to loop through all the Patches inside
                    let lastPatch = {}
                    for (let patch of currentDesign.patches) {
                        //patch.x += (prevPatchHor.width + prevPatchHor.x) //FIXME this doesn't work for overlay
                        patch.x += cumulativeWidths
                        allPatchesHor.push(patch) //add updated Patches as we modify each
                        lastPatch = patch 
                    }
                    cumulativeWidths += currentDesign.width
                    prevPatchHor = lastPatch
                    sumWidthsHor += currentDesign.width //width bookkeeping
                } else {
                   console.log("Not a Patch or Design, something went wrong")
                }
            }         
            
            return new Design(sumWidthsHor, heightHor, allPatchesHor)


        case TAG_VERT:
           //first one we don't change, it will be positioned at the origin
           let firstDesignVert = evaluatorLogic(env, node.design[0])
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
               console.log("First element is not a Patch or Design, something went wrong")
           }
           
           //now we process all of the rest of the patches/designs
           let sumHeightsVert = firstDesignVert.height //since this is placing vertically, we add all the heights to get the overall Design height
           let cumulativeHeights = firstDesignVert.height
           for (let i = 1; i < (node.design).length; i++) { //start at index 1 bc already took care of the first one
                let currentDesign = evaluatorLogic(env, node.design[i]) //recursively process the very next Patch/Design
                if (currentDesign.width !== widthVert) { //check to make sure widths are compatable, works regardless of if it's a Design or a Patch
                    throw new Error("Widths need to be the same in order to place Patches vertically.")
                }
                if (currentDesign instanceof Patch) { //Patch case is easier since we only have to worry about a single Patch
                    //currentDesign.y = (prevPatchVert.height + prevPatchVert.y) //since vert, this calculation will give us the correct y-value
                    currentDesign.y += cumulativeHeights
                    sumHeightsVert += currentDesign.height //height bookkeeping
                    allPatchesVert.push(currentDesign) //add updated Patch to our collection
                    prevPatchVert = currentDesign //making sure to update prevPatch so that the next processed Patch/Design has the correct information
                    cumulativeHeights += currentDesign.height
                } else if (currentDesign instanceof Design) { //Design case more complicated since we have to loop through all the Patches inside
                    let lastPatch = {} //eventually will want to set prevPatchVert to be the last Patch in the Design
                    for (let patch of currentDesign.patches) {
                        //patch.y += (prevPatchVert.height + prevPatchVert.y) //doesn't work with overlay
                        patch.y += cumulativeHeights
                        allPatchesVert.push(patch) //add updated Patches as we modify each
                        lastPatch = patch //when for loop terminates, lastPatch will contain the very last patch in the Design
                    }
                    cumulativeHeights += currentDesign.height //incrementing to prepare for next design
                    prevPatchVert = lastPatch //make sure to update for next Patch/Design
                    sumHeightsVert += currentDesign.height //height bookkeeping, design should already know its overall height
                } else {
                   console.log("Not a Patch or Design, something went wrong")
                }
            }         

            return new Design(widthVert, sumHeightsVert, allPatchesVert)

        case TAG_PLUS:
            return evaluatorLogic(env, node.left) + evaluatorLogic(env, node.right)

        case TAG_TIMES:
            return evaluatorLogic(env, node.left) * evaluatorLogic(env, node.right)
        
        default:
            console.log(node.tag, "Tag does not match any implemented tags - evaluatorLogic()")
    }
}


function evaluatorDefn (env, node) {
    switch (node.tag) {
        case TAG_VARIABLE:
        case TAG_ASSIGNMENT:
            //console.log("BEFORE", env)
            env[node.name] = evaluatorLogic(env, node.value) //store evaluated value in environment 
            //console.log("AFTER", env)
            break;

        case TAG_FUNC:
            env[node.name] = [node.args, node.body] 
            break;
        
        default:
            console.log("Tag does not match any implemented tags - evaluatorDefn")
    }
}