import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const usia = require("../legacy-db/data_usia.json");

/** Old-BE compatibility slice for GET /usia. */
export async function handleLegacyUsiaReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/usia") return null;

  return Response.json(usia, { status: 200 });
}
