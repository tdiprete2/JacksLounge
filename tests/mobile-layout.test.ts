import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("pizza cards reference real photos rather than missing image files", () => {
  const source = fs.readFileSync("client/src/pages/Pizza.tsx", "utf8");
  const photos = [...source.matchAll(/\bimage:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(photos.length, 3);
  for (const photo of photos) {
    assert.ok(fs.existsSync(`client/public${photo}`), `Missing pizza photo: ${photo}`);
    if (photo.endsWith("-desktop.webp")) {
      assert.ok(fs.existsSync(`client/public${photo.replace("-desktop.webp", "-mobile.webp")}`));
    }
  }
  assert.equal([...source.matchAll(/\{item\.image && <div/g)].length, 2);
  assert.doesNotMatch(source, /-rotate-12|scale-125/);
});

test("menu price rows can wrap on narrow screens without losing prices", () => {
  const source = fs.readFileSync("client/src/pages/Menu.tsx", "utf8");
  assert.match(source, /flex min-w-0 flex-col items-start/);
  assert.match(source, /sm:flex-row/);
  assert.doesNotMatch(source, /whitespace-nowrap/);
  assert.match(source, /\{item\.price\}/);
  assert.match(source, /\{item\.prices\}/);
});

test("right drawer fades within the viewport and has a touch-sized close button", () => {
  const source = fs.readFileSync("client/src/components/ui/sheet.tsx", "utf8");
  assert.doesNotMatch(source, /slide-in-from-right|slide-out-to-right/);
  assert.match(source, /SheetPrimitive\.Close className="[^"]*h-11 w-11/);
});
