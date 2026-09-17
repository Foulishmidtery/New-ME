import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const peserta = require("../legacy-db/data_peserta.json");

/** Old-BE compatibility slice for GET /peserta. */
export async function handleLegacyPesertaReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/peserta") return null;

  return Response.json(peserta, { status: 200 });
}
