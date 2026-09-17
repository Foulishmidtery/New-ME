import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const gender = require("../legacy-db/data_gender.json");

/** Old-BE compatibility slice for GET /gender. */
export async function handleLegacyGenderReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/gender") return null;

  return Response.json(gender, { status: 200 });
}
