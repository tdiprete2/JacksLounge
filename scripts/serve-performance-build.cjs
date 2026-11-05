// Controlled gzip lab server, NOT a public deployment server.
// Usage: node scripts/serve-performance-build.cjs [build-directory] [port]
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { gzipSync } = require("node:zlib");
const root = path.resolve(process.argv[2] || "dist/public");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  const url = new URL(req.url, "http://lab");
  let file = path.resolve(root, "." + decodeURIComponent(url.pathname));
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  const ext = path.extname(file);
  let data = fs.readFileSync(file);
  const headers = { "Content-Type": types[ext] || "application/octet-stream", "Cache-Control": "no-store", "Vary": "Accept-Encoding" };
  if (/\bgzip\b/.test(req.headers["accept-encoding"] || "") && [".html", ".js", ".css", ".svg"].includes(ext)) {
    data = gzipSync(data);
    headers["Content-Encoding"] = "gzip";
  }
  res.writeHead(200, headers).end(data);
}).listen(Number(process.argv[3] || 8080), "0.0.0.0", () => console.log(`Gzip lab server: ${root}`));
