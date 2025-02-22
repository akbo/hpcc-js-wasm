import { expect } from "chai";
import { Zstd } from "@hpcc-js/wasm/zstd";

describe("zstd", function () {
    it("version", async function () {
        const zstd = await Zstd.load();
        const v = zstd.version();
        expect(v).to.be.a.string;
        expect(v).to.not.be.empty;
    });

    it("compress", async function () {
        const zstd = await Zstd.load();
        const data = new Uint8Array(Array.from({ length: 1000 }, (_, i) => i % 256));
        const compressed_data = zstd.compress(data);
        const data2 = zstd.decompress(compressed_data);
        expect(data).to.deep.equal(data2);
    });
});
