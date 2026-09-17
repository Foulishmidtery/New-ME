import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const negara = require("../legacy-db/data_negara.json");

/** Old-BE compatibility slice for GET /negara. */
export async function handleLegacyNegaraReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/negara") return null;

  return Response.json(negara, { status: 200 });
}
