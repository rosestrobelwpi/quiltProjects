// interpreter.js
const { Rect, Hor, Vert, Solid, Pixel } = require("./parserASTfunction");

class Design {
    constructor() {
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.patches = [];
    }

    addPatch(patch) {
        this.patches.push(patch);
        this.maxWidth = Math.max(this.maxWidth, patch.x + patch.width);
        this.maxHeight = Math.max(this.maxHeight, patch.y + patch.height);
    }
}

class Patch {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

// Evaluator function to interpret the AST and produce a Design object
function evaluator(env, node) {
    const design = new Design();

    function evalNode(node, xOffset = 0, yOffset = 0) {
        switch (node.constructor) {
            case Rect:
                return new Patch(xOffset, yOffset, node.width, node.height, 'gray');
            
            case Solid:
                return new Patch(xOffset, yOffset, node.width, node.height, `rgba(${node.color.red}, ${node.color.green}, ${node.color.blue}, ${node.color.alpha})`);

            case Hor:
                const leftPatch = evalNode(node.left, xOffset, yOffset);
                const rightPatch = evalNode(node.right, xOffset + leftPatch.width, yOffset);
                design.addPatch(leftPatch);
                design.addPatch(rightPatch);
                return new Patch(xOffset, yOffset, leftPatch.width + rightPatch.width, Math.max(leftPatch.height, rightPatch.height));

            case Vert:
                const topPatch = evalNode(node.top, xOffset, yOffset);
                const bottomPatch = evalNode(node.bottom, xOffset, yOffset + topPatch.height);
                design.addPatch(topPatch);
                design.addPatch(bottomPatch);
                return new Patch(xOffset, yOffset, Math.max(topPatch.width, bottomPatch.width), topPatch.height + bottomPatch.height);

            default:
                throw new Error(`Unknown node type: ${node.constructor.name}`);
        }
    }

    const rootPatch = evalNode(node);
    design.addPatch(rootPatch);
    return design;
}

module.exports = evaluator;
