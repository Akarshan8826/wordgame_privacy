"use strict";

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const page = fs.readFileSync(path.join(__dirname, "public", "privacy-policy.html"));
const logo = fs.readFileSync(path.join(__dirname, "public", "app-logo.png"));
const port = Number(process.env.PORT) || 3000;

const server = http.createServer((request, response) => {
  const method = request.method;
  const pathname = new URL(request.url, "http://localhost").pathname;

  if (method !== "GET" && method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  const headOnly = method === "HEAD";
  if (pathname === "/health") {
    const body = JSON.stringify({ status: "ok" });
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end(headOnly ? undefined : body);
    return;
  }

  if (pathname === "/" || pathname === "/privacy-policy") {
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    response.end(headOnly ? undefined : page);
    return;
  }

  if (pathname === "/app-logo.png") {
    response.writeHead(200, {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(headOnly ? undefined : logo);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(headOnly ? undefined : "Not found");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Word Circle backend listening on port ${port}`);
});
