var imul = function(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};

var buffer = new ArrayBuffer(2600 * 10);

var asm = (function (global, env, buffer) {
    "use asm";
    var heapi8 = new global.Int8Array(buffer);
    var heapi32 = new global.Int32Array(buffer);
    var i = env.STACKTOP | 0;
    var o = 0;
    var p = 0;
    var q = 0;
    var r = 0;
    var s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0.0,
        x = 0,
        y = 0,
        z = 0,
        A = 0.0;
    var B = 0;
    var C = 0;
    var D = 0;
    var E = 0;
    var F = 0;
    var G = 0;
    var H = 0;
    var I = 0;

    var imul = global.imul;

    function _rnd() {
        var a = 0,
            b = 0,
            c = 0,
            d = 0;
        a = heapi32[626] | 0;
        b = ((a + 1 | 0) >>> 0) % 624;
        c = 8 + (a << 2) | 0;
        d = heapi32[8 + (b << 2) >> 2] | 0;
        heapi32[c >> 2] = -(d & 1) & -1727483681 ^ heapi32[8 + (((a + 397 | 0) >>> 0) % 624 << 2) >> 2] ^ (d & 2147483646 | heapi32[c >> 2] & -2147483648) >>> 1;
        c = heapi32[8 + (heapi32[626] << 2) >> 2] | 0;
        d = c >>> 11 ^ c;
        heapi32[626] = b;
        b = d << 7 & -1658038656 ^ d;
        d = b << 15 & -272236544 ^ b;
        return d >>> 18 ^ d | 0
    }

    function _init(seed) {
        seed = seed | 0;
        var a = 0,
            c = 0,
            d = 0,
            e = 0;
        a = i | 0;
        heapi32[a >> 2] = seed;
        c = 1;
        d = seed;
        while (1) {
            seed = imul(d >>> 30 ^ d, 1812433253) + c | 0;
            heapi32[a + (c << 2) >> 2] = seed;
            e = c + 1 | 0;
            if (e >>> 0 < 624) {
                c = e;
                d = seed;
            } else {
                break;
            }
        }
        heapi32[a + 2496 >> 2] = 0;
        _memcpy(8, a | 0, 2500);
        return
    }
    function _memcpy(a, b, c) {
        a = a | 0;
        b = b | 0;
        c = c | 0;
        var d = 0;
        d = a | 0;
        if ((a & 3) == (b & 3)) {
            while (a & 3) {
                if ((c | 0) == 0) return d | 0;
                heapi8[a] = heapi8[b] | 0;
                a = a + 1 | 0;
                b = b + 1 | 0;
                c = c - 1 | 0
            }
            while ((c | 0) >= 4) {
                heapi32[a >> 2] = heapi32[b >> 2] | 0;
                a = a + 4 | 0;
                b = b + 4 | 0;
                c = c - 4 | 0
            }
        }
        while ((c | 0) > 0) {
            heapi8[a] = heapi8[b] | 0;
            a = a + 1 | 0;
            b = b + 1 | 0;
            c = c - 1 | 0
        }
        return d | 0
    }

    return {
        random: _rnd,
        init: _init,
    }
})
// EMSCRIPTEN_END_ASM
({
    imul: imul,
    Int8Array: Int8Array,
    Int32Array: Int32Array,
}, {
    STACKTOP: 3000,
    STACK_MAX: 10000,
}, buffer);

asm.init(1337);
console.log(asm.random());
console.log(asm.random());
console.log(asm.random());
