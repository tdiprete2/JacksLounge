// Re-encode oversized public food images in place, keeping aspect ratio.
// Existing smaller assets and original uploads are untouched.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

for (const folder of ["featured", "sections"]) {
  const directory = path.resolve("client/public/images", folder);
  for (const file of await fs.readdir(directory)) {
    if (!file.endsWith(".webp")) continue;
    const target = path.join(directory, file);
    const before = (await fs.stat(target)).size;
    if (before < 500000) continue;
    const width = file.includes("-mobile") ? 640 : 1200;
    const buffer = await sharp(target)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    if (buffer.length >= before) continue;
    await fs.writeFile(target, buffer);
    console.log(`${folder}/${file}: ${before} -> ${buffer.length} bytes`);
  }
}
