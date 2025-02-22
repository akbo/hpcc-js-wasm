import { expect } from "chai";
import { Engine, Format, Graphviz } from "@hpcc-js/wasm/graphviz";
import { badDot, dot } from "./dot001.js";
import { ortho } from "./dot002.js";

export const formats: Format[] = ["svg", "dot", "json", "dot_json", "xdot_json", "plain", "plain-ext"];
export const engines: Engine[] = ["circo", "dot", "fdp", "sfdp", "neato", "osage", "patchwork", "twopi"];

describe("all combos", function () {
    for (const engine of engines) {
        for (const format of formats) {
            it(`${engine}-${format}`, async function () {
                const graphviz = await Graphviz.load();
                const result = graphviz.layout(dot, format, engine);
                expect(result).to.be.a("string");
                expect(result).to.not.be.empty;
            });
        }
    }
});

describe("graphviz", async function () {
    it("version", async function () {
        const graphviz = await Graphviz.load();
        const v = graphviz.version();
        expect(v).to.be.a.string;
        expect(v).to.not.be.empty;
    });

    it("circo", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.circo(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;
    });
    it("dot", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.dot(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("blank-dot", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.dot("", "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.be.empty;
    });
    it("fdp", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.fdp(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("sfdp", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.sfdp(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("neato", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.neato(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("osage", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.osage(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("patchwork", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.patchwork(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("twopi", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.twopi(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
});

describe("Graphviz API", function () {

    it("version", async function () {
        const graphviz = await Graphviz.load();
        const v = graphviz.version();
        expect(v).to.be.a.string;
        expect(v).to.not.be.empty;
    });

    it("circo", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.circo(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("dot", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.dot(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;
    });
    it("blank-dot", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.dot("", "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.be.empty;

    });
    it("fdp", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.fdp(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("sfdp", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.sfdp(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("neato", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.neato(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("osage", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.osage(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("patchwork", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.patchwork(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });
    it("twopi", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.twopi(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;

    });

    it("images", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.layout('digraph { a[image="./resources/hpcc-logo.png"]; }', "svg", "dot", { images: [{ path: "./resources/hpcc-logo.png", width: "272px", height: "92px" }] });
        expect(svg).to.be.a("string");
        expect(svg).to.contain('<image xlink:href="./resources/hpcc-logo.png" width="204px" height="69px" preserveAspectRatio="xMinYMin meet"');

    });

    this.timeout(5000);
    it("ortho", async function () {
        const graphviz = await Graphviz.load();
        const svg = graphviz.dot(ortho, "svg");
        expect(svg).to.be.not.empty;
    });
});

describe("bad dot", function () {

    it("dot", async function () {
        const graphviz = await Graphviz.load();
        try {
            graphviz.dot(badDot, "svg");
            expect(true).to.be.false;
        } catch (e: any) {
            expect(typeof e.message).to.equal("string");
            expect(e.message).to.contain("syntax error in line");
        }
        const svg = graphviz.dot(dot, "svg");
        expect(svg).to.be.a("string");
        expect(svg).to.not.be.empty;
        try {
            const svg = graphviz.dot(badDot, "svg");
            expect(true).to.be.false;
        } catch (e: any) {
            expect(typeof e.message).to.equal("string");
            expect(e.message).to.contain("syntax error in line");
        }
    });
});

describe("options", async function () {

    it("create", async function () {
        const graphviz = await Graphviz.load();
        expect(graphviz).to.exist;
    });

    it("nop", async function () {
        const graphviz = await Graphviz.load();
        const plain1 = graphviz.dot(dot, "plain");
        const plain2 = graphviz.dot(dot, "plain", { nop: 0 });
        const plain3 = graphviz.dot(dot, "plain", { nop: 1 });
        const plain4 = graphviz.dot(dot, "plain", { nop: 2 });
        expect(plain1).to.equal(plain2);
        expect(plain1).to.equal(plain3);
        expect(plain1).to.equal(plain4);
    });

    it("yInvert", async function () {
        const graphviz = await Graphviz.load();
        const plain1 = graphviz.dot(dot, "plain");
        const plain2 = graphviz.dot(dot, "plain", { yInvert: false });
        const plain3 = graphviz.dot(dot, "plain", { yInvert: true });
        const plain4 = graphviz.dot(dot, "plain", { yInvert: false });
        const plain5 = graphviz.dot(dot, "plain", { yInvert: true });
        expect(plain1).to.equal(plain2);
        expect(plain1).to.not.equal(plain3);
        expect(plain1).to.equal(plain4);
        expect(plain1).to.not.equal(plain5);
    });
});
