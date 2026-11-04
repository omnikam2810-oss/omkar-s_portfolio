// Generates the seamless paper-grain tile: public/grain.png.
// It is a black speckle with the grain strength baked into its alpha channel.
// That is mathematically the same as multiply at 7% on a grey noise tile, but plain alpha
// compositing is far cheaper than mix-blend-mode over the whole viewport.
// Run: node scripts/make-grain.mjs public
import { writeFileSync } from "node:fs";
import { deflateSync, crc32 } from "node:zlib";

const SIZE = 160;
const OUT = process.argv[2];

// Seeded PRNG (mulberry32) so the output is reproducible.
let seed = 0x9e3779b9;
const rand = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Roughly gaussian white noise, then a light wrap-around blur so the grain isn't pixel-sharp
// (the wrap keeps the tile seamless).
const raw = Float32Array.from({ length: SIZE * SIZE }, () => rand() + rand() + rand() - 1.5);
const at = (x, y) => raw[((y + SIZE) % SIZE) * SIZE + ((x + SIZE) % SIZE)];
const noise = new Float32Array(SIZE * SIZE);
for (let y = 0; y < SIZE; y++)
  for (let x = 0; x < SIZE; x++)
    noise[y * SIZE + x] = (at(x, y) * 2 + at(x + 1, y) + at(x - 1, y) + at(x, y + 1) + at(x, y - 1)) / 6;

// Same noise the old feTurbulence overlay had: light speckle around ~221/255.
const grey = Uint8Array.from(noise, (n) => Math.max(0, Math.min(255, Math.round(221 + n * 70))));
// light theme: black with alpha = 7% * (1 - grey)   (same as multiply by grey at 7%)
const light = Uint8Array.from(grey, (g) => Math.round(255 * 0.07 * (1 - g / 255)));

function png(alpha, tone) {
  // grayscale + alpha: 2 bytes per pixel (tone 0 = black, 255 = white)
  const stride = SIZE * 2;
  const rows = Buffer.alloc((stride + 1) * SIZE);
  for (let y = 0; y < SIZE; y++) {
    rows[y * (stride + 1)] = 0; // filter: none
    for (let x = 0; x < SIZE; x++) {
      rows[y * (stride + 1) + 1 + x * 2] = tone;
      rows[y * (stride + 1) + 2 + x * 2] = alpha[y * SIZE + x];
    }
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body) >>> 0);
    return Buffer.concat([len, body, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(SIZE, 0);
  ihdr.writeUInt32BE(SIZE, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 4; // grayscale + alpha
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(rows, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

writeFileSync(`${OUT}/grain.png`, png(light, 0));
console.log("wrote", SIZE + "px tile to", OUT);
