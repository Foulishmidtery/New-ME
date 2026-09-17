import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const area = require("../legacy-db/data_area.json");

/** Old-BE compatibility slice for GET /area. */
export async function handleLegacyAreaReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/area") return null;

  return Response.json(area, { status: 200 });
}
