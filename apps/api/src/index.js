import { createServer } from "node:http";

const PORT = Number(process.env.PORT) || 3001;

/**
 * Stub API NewSite — routes prévues (sites, publish, magic links).
 * Pas encore de SQL ni d’auth ; répond juste pour valider le monorepo.
 */
const routes = {
  "GET /health": () => ({
    ok: true,
    service: "@newsite/api",
    status: "stub",
  }),
  "GET /": () => ({
    name: "NewSite API",
    version: "0.0.0",
    message: "Stub minimal. CRUD sites / publish / magic links à venir.",
    planned: [
      "POST /sites",
      "GET /sites/:id",
      "PUT /sites/:id",
      "POST /sites/:id/publish",
      "GET /public/:slug",
    ],
  }),
};

const server = createServer((req, res) => {
  const method = req.method ?? "GET";
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const key = `${method} ${url.pathname}`;
  const handler = routes[key];

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (!handler) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found", path: url.pathname }));
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify(handler(), null, 2));
});

server.listen(PORT, () => {
  console.log(`@newsite/api (stub) écoute sur http://localhost:${PORT}`);
});
