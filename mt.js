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
            b = (a >>> 0 < 2496) ? a + 4 | 0 : 0;
            c = heapi32[b >> 2] | 0;
            d = -(c & 1) & -1727483681 ^
                heapi32[(a + 1588 - (a >>> 0 < 912 ? 0 : 2496)) >> 2] ^
                (c & 2147483646 | heapi32[a >> 2] & -2147483648) >>> 1;
            c = d >>> 11 ^ d;
            heapi32[a >> 2] = d;
            heapi32[625] = b;
            b = c << 7 & -1658038656 ^ c;
            c = b << 15 & -272236544 ^ b;
            return c >>> 18 ^ c | 0;
        }

        function initialize(seed) {
            seed = seed | 0;
            var a = 1, b = 0, c = 0;
            heapi32[0] = seed;
            b = seed;
            while (1) {
                seed = imul(b >>> 30 ^ b, 1812433253) + a | 0;
                heapi32[(a << 2) >> 2] = seed;
                c = a + 1 | 0;
                if (c >>> 0 < 624) {
                    a = c;
                    b = seed;
                } else {
                    break;
                }
            }
            heapi32[2496 >> 2] = 0;
            return;
        }

        return {
            random: random,
            initialize: initialize,
        }
    }(global, {}, buffer);

    asm.initialize(seed | 0);

    this.random = asm.random;
    this.initialize = function (seed) {
	new Int32Array(buffer, 2500, 1)[0] = 0;
	asm.initialize(seed);;
    }
}
