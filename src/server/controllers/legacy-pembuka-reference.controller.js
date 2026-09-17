import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pembuka = require("../legacy-db/data_pembuka.json");

/** Old-BE compatibility slice for GET /pembuka. */
export async function handleLegacyPembukaReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/pembuka") return null;

  return Response.json(pembuka, { status: 200 });
}
