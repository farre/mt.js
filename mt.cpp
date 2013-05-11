// ~/src/emscripten/emcc -O2 mt.cpp -s ASM_JS=1 -s DOUBLE_MODE=0 --llvm-lto 1 -s EXPORTED_FUNCTIONS="['_init','_rnd', '_main']" -o mt_proto.js
#include <random>

static std::mt19937 mt;

extern "C" {
  void init(unsigned seed) {
    mt = std::mt19937(seed);
  }

  unsigned rnd() {
    return mt();
  }
}
