import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

const INPUT_DIR = "./public/photos";
const MAX_WIDTH = 1400;
const QUALITY = 82;

const files = readdirSync(INPUT_DIR).filter((f) =>
  [".jpg", ".jpeg", ".png", ".webp"].includes(extname(f).toLowerCase())
);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const filePath = join(INPUT_DIR, file);
  const before = statSync(filePath).size;
  totalBefore += before;

  const image = sharp(filePath);
  const meta = await image.metadata();

  const pipeline = image
    .rotate() // auto-rotate based on EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });

  const buffer = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
  const after = buffer.length;
  totalAfter += after;

  const pct = Math.round((1 - after / before) * 100);
  await sharp(buffer).toFile(filePath);

  console.log(`${file.padEnd(35)} ${kb(before)} → ${kb(after)}  (-${pct}%)`);
}

console.log(`\nTotal: ${mb(totalBefore)} → ${mb(totalAfter)}  (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);

function kb(b) { return `${Math.round(b / 1024)}KB`; }
function mb(b) { return `${(b / 1024 / 1024).toFixed(1)}MB`; }
