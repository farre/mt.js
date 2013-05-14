if (!Math.imul) Math.imul = function(a, b) {
    var ah  = a >>> 16;
    var al = a & 0xffff;
    var bh  = b >>> 16;
    var bl = b & 0xffff;
    return (al * bl + ((ah * bl + al * bh) << 16)) | 0;
};

function MersenneTwister(seed) {
    var buffer = new ArrayBuffer(4096);
    var global = {Math: Math, Int32Array: Int32Array};
    var asm = function (global, env, buffer) {
        "use asm";
        var heapi32 = new global.Int32Array(buffer);
        var imul = global.Math.imul;

        function random() {
            var a = 0, b = 0, c = 0, d = 0;
            a = heapi32[625] | 0;
            b = a + ((a >>> 0 < 2496) ? 4 : -2496) | 0;
            c = heapi32[b >> 2] | 0;
            d = -(c & 1) & 0x9908b0df ^
                heapi32[(a + (a >>> 0 < 912 ? 1588 : -908)) >> 2] ^
                (c & 0x7ffffffe | heapi32[a >> 2] & 0x80000000) >>> 1;
            c = d >>> 11 ^ d;
            heapi32[a >> 2] = d;
            heapi32[625] = b;
            b = c << 7 & 0x9d2c5680 ^ c;
            c = b << 15 & 0xefc60000 ^ b;
            return c >>> 18 ^ c | 0;
        }

        function initialize(seed) {
            seed = seed | 0;
            var a = 1, b = 0, c = 0;
            heapi32[0] = seed;
            b = seed;
            while (1) {
                seed = imul(b >>> 30 ^ b, 0x6c078965) + a | 0;
                heapi32[(a << 2) >> 2] = seed;
                c = a + 1 | 0;
                if (c >>> 0 < 624) {
                    a = c;
                    b = seed;
                } else {
                    break;
                }
            }
            heapi32[624] = 0;
            heapi32[625] = 0;
        }

        return {
            random: random,
            initialize: initialize,
        }
    }(global, {}, buffer);

    asm.initialize(seed ? seed | 0 : new Date().getTime());

    this.random = asm.random;
    this.initialize = asm.initialize;
}
