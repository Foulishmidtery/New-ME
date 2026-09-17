import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const kbli = require("../legacy-db/data_kbli.json");

/**
 * Old-BE compatibility slice for GET /kbli.
 * The legacy endpoint returns the static JSON payload verbatim with HTTP 200.
 */
export async function handleLegacyKbliReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/kbli") return null;

  return Response.json(kbli, { status: 200 });
}
