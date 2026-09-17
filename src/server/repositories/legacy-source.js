import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** The former query monolith, split by domain without changing handler names. */
export const legacyHandlers = Object.assign(
  {},
  require("./handlers/auth.cjs"),
  require("./handlers/profile-about.cjs"),
  require("./handlers/kdeks.cjs"),
  require("./handlers/structure.cjs"),
  require("./handlers/directorate.cjs"),
  require("./handlers/hot-issue.cjs"),
  require("./handlers/profile.cjs"),
  require("./handlers/content.cjs"),
  require("./handlers/news.cjs"),
  require("./handlers/users.cjs"),
  require("./handlers/regional.cjs"),
  require("./handlers/banners.cjs"),
  require("./handlers/data.cjs"),
);

export function selectHandlers(names) {
  return Object.fromEntries(
    names.filter((name) => typeof legacyHandlers[name] === "function").map((name) => [name, legacyHandlers[name]]),
  );
}
