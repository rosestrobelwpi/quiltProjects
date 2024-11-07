const {
    TAG_RECT, TAG_NAT, TAG_COLOR, TAG_HOR, TAG_VERT, TAG_PLUS, TAG_TIMES, TAG_VARIABLE, TAG_DEPENDENT_FUNC
} = require('./parserASTfunction');

const parser = require("./parser");

// Define environment as a JavaScript object for storing variables and functions
const environment = {};

// Patch and Design classes for quilt elements
function Patch(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
}

function Design(maxWidth, maxHeight, patches) {
    this.width = maxWidth;
    this.height = maxHeight;
    this.patches = patches;
}

// Evaluator function processes different tags and builds Design/Patch structures
function evaluator(env, node) {
    switch (node.tag) {
        case TAG_NAT:
            return node.value;

        case TAG_COLOR:
            return node.name;

        case TAG_RECT:
            const width = evaluator(env, node.width);
            const height = evaluator(env, node.height);
            const color = evaluator(env, node.color);
            return new Patch(0, 0, width, height, color);

        case TAG_HOR:
            return processHorizontalDesign(env, node.design);

        case TAG_VERT:
            return processVerticalDesign(env, node.design);

        case TAG_PLUS:
            return evaluator(env, node.left) + evaluator(env, node.right);

        case TAG_TIMES:
            return evaluator(env, node.left) * evaluator(env, node.right);

        default:
            console.log("Unknown tag:", node.tag);
            return null;
    }
}

// Helper function for horizontal designs
function processHorizontalDesign(env, designs) {
    let allPatches = [];
    let prevPatch = evaluator(env, designs[0]);
    let height = prevPatch.height;
    let sumWidths = prevPatch.width;
    allPatches.push(prevPatch);

    for (let i = 1; i < designs.length; i++) {
        const currentDesign = evaluator(env, designs[i]);

        if (currentDesign.height !== height) {
            console.error("Error: Heights need to match in hor()");
            return null;
        }

        currentDesign.x = prevPatch.x + prevPatch.width;
        sumWidths += currentDesign.width;
        allPatches.push(currentDesign);
        prevPatch = currentDesign;
    }

    return new Design(sumWidths, height, allPatches);
}

// Helper function for vertical designs
function processVerticalDesign(env, designs) {
    let allPatches = [];
    let prevPatch = evaluator(env, designs[0]);
    let width = prevPatch.width;
    let sumHeights = prevPatch.height;
    allPatches.push(prevPatch);

    for (let i = 1; i < designs.length; i++) {
        const currentDesign = evaluator(env, designs[i]);

        if (currentDesign.width !== width) {
            console.error("Error: Widths need to match in vert()");
            return null;
        }

        currentDesign.y = prevPatch.y + prevPatch.height;
        sumHeights += currentDesign.height;
        allPatches.push(currentDesign);
        prevPatch = currentDesign;
    }

    return new Design(width, sumHeights, allPatches);
}

// Evaluates variable declarations and function definitions
function evaluatorDefn(env, node) {
    switch (node.tag) {
        case TAG_VARIABLE:
            env[node.name] = evaluator(env, node);
            break;

        case TAG_DEPENDENT_FUNC:
            env[node.name] = [node.args, node.body];
            break;

        default:
            console.log("Unknown definition type:", node.tag);
    }
}

// Interpret expressions for console output (for debugging)
function interpret(expression) {
    switch (expression.tag) {
        case TAG_NAT:
            console.log("Processing a natural number");
            break;
        case TAG_COLOR:
            console.log("Processing a color");
            break;
        case TAG_RECT:
            console.log("Processing a rectangle");
            break;
        case TAG_HOR:
            console.log("Processing a horizontal design");
            break;
        case TAG_VERT:
            console.log("Processing a vertical design");
            break;
        default:
            console.log("Unknown tag");
    }
}

module.exports = { evaluator, evaluatorDefn, interpret, Patch, Design };
