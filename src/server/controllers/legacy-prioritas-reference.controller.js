import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const prioritas = require("../legacy-db/data_prioritas.json");

/** Old-BE compatibility slice for GET /prioritas. */
export async function handleLegacyPrioritasReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/prioritas") return null;

  return Response.json(prioritas, { status: 200 });
}
