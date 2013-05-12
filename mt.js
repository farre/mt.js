if (!Math.imul) Math.imul = function(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al * bl + ((ah * bl + al * bh) << 16)) | 0;
};

function createMersenneTwister(seed) {
    var buffer = new ArrayBuffer(4096);
    var global = {Math: Math, Int32Array: Int32Array};
    var asm = function (global, env, buffer) {
        "use asm";
        var heapi32 = new global.Int32Array(buffer);

        var imul = global.Math.imul;

        function random() {
            var a = 0, b = 0, c = 0, d = 0;
            a = heapi32[625] | 0;
            b = ((a + 1 | 0) >>> 0) % 624;
            c = (a << 2) | 0;
            d = heapi32[(b << 2) >> 2] | 0;
            heapi32[c >> 2] =
                -(d & 1) & -1727483681 ^
                heapi32[(((a + 397 | 0) >>> 0) % 624 << 2) >> 2] ^
                (d & 2147483646 | heapi32[c >> 2] & -2147483648) >>> 1;
            c = heapi32[(heapi32[625] << 2) >> 2] | 0;
            d = c >>> 11 ^ c;
            heapi32[625] = b;
            b = d << 7 & -1658038656 ^ d;
            d = b << 15 & -272236544 ^ b;
            return d >>> 18 ^ d | 0;
        }

        function init(seed) {
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
            init: init,
        }
    }(global, {}, buffer);
    asm.init(seed);
    return asm.random;
}
