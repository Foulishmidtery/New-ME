# Migration Progress — Old-BE → New-ME

Last updated: 2026-09-17

Compatibility baseline: `Foulishmidtery/Old-BE@0984f0182738303627dab16fbec60c948e926e01`

## Current status

| Area | Status | Notes |
| --- | --- | --- |
| Dependency reproducibility | 🔴 Blocked | `package.json` / lockfile are not tracked in the current GitHub snapshot. Do not invent dependency versions. |
| Old-BE baseline lock | ✅ Implemented | `migration/old-be-baseline.json` locks the compatibility commit. |
| Route baseline checker | ✅ Implemented | `scripts/compare-old-be-routes.mjs` compares Old-BE `db.*` routes with `legacy-route-manifest.js`. |
| Auth / local login cookies | ⚠️ Implemented, runtime verification required | Legacy response/cookie contract moved to `legacy-auth.controller.js`. |
| SSO cookie expiry / logout domain | ⚠️ Implemented, browser verification required | 24-day expiry and `.kneks.go.id` clear-cookie behavior restored. |
| `/storage/*` aliases | ⚠️ Implemented, runtime verification required | Five Old-BE aliases restored with traversal protection, ETag and byte-range support. |
| Data Menu legacy contract | ⚠️ Implemented, DB verification required | Legacy ordering/validation/redirect drift separated from modern `/api/data-menus`. |
| Agenda | ⚠️ Implemented, DB verification required | All Agenda legacy routes including `/agenda_graph` now use repository/service/controller compatibility flow. |
| Province | ⚠️ Implemented, DB verification required | Legacy Province routes now bypass the monolithic adapter. |
| Tagging | ⚠️ Implemented, DB verification required | Legacy Tagging routes now bypass the monolithic adapter. |
| Zona KHAS | ⚠️ Implemented, DB verification required | Dedicated repository/service restores province `ORDER BY id DESC`, nested response and date rules. |
| CMS page role matrix | ❌ Not complete | Do not add a generic role rule; Old-BE has per-page role combinations that must be extracted first. |
| Upload behavior parity | ❌ Not complete | Old-BE upload MIME/filter/filename behavior differs by route. Global replacement would be unsafe. |
| Legacy `.cjs` fallback | ⚠️ Still active | Remains required for domains not yet migrated. |
| HTTP/DB golden master | ⚠️ Partial | Static/contract tests exist; live DB/HTTP parity still requires a runnable dependency manifest and dev DB. |

## Native compatibility dispatch order

`src/app/[...legacy]/route.js` currently routes migrated domains before the fallback adapter:

1. Auth
2. Agenda
3. Data Menu
4. Province
5. Tagging
6. Zona KHAS
7. remaining routes → `legacy-handler-adapter.js`

This preserves legacy URLs while progressively reducing dependency on the adapter/fallback.

## Compatibility tests

The repository now contains contract tests for:

- auth/local cookies and SSO cookies;
- legacy storage aliases;
- Data Menu compatibility behavior;
- Agenda compatibility behavior;
- Province and Tagging compatibility behavior;
- Zona KHAS compatibility behavior.

`.github/workflows/compatibility-baseline.yml` checks migrated-source syntax, executes these tests with Node's built-in test runner, checks out the locked Old-BE commit, and compares Old-BE database routes with the New-ME manifest.

CI execution result must still be verified from the GitHub Actions run. A workflow file existing in the repository is not considered proof that the gate is green.

## Important compatibility fixes completed in source

### Auth

- legacy local login response no longer exposes the internal `user` object;
- host-only local cookies preserve the Old-BE observable attributes;
- SSO cookies use `.kneks.go.id`, `Secure`, `SameSite=None`, and the Old-BE 24-day expiry;
- SSO logout clears cookies using the same domain scope.

### Data Menu

Legacy endpoints preserve:

- `SELECT * FROM data_menu` without adding `ORDER BY`;
- no new required-field validation on the legacy path;
- HTTP 200 + `{ "success": false }` for empty list/detail;
- mutation redirect to `/menu_data`.

The modern `/api/data-menus` API remains additive and may retain its own validation/order behavior.

### Agenda

Legacy endpoints preserve:

- `ORDER BY agenda_datetime DESC`;
- search using `LIKE`, not `ILIKE`;
- the historical 200-character search cap;
- create-time `T` replacement behavior;
- update-time raw `agenda_datetime` behavior;
- the Old-BE side effect that overwrites both `created_at` and `updated_at` during update;
- `/agenda_graph` historical response mapping;
- mutation redirect to `/a`.

### Zona KHAS

Legacy endpoints preserve:

- province ordering `ORDER BY id DESC`;
- one nested `zonakhas` collection per province;
- `inauguration`/`inaugurated` becoming `NULL` unless status is `diresmikan`;
- empty detail/map response behavior;
- mutation redirect to `/zk`.

## Remaining blockers / next safe work

1. Recover and track the real `package.json` and lockfile from the actual New-ME development source; do not reconstruct versions by guessing.
2. Verify the compatibility workflow result and repair any route-manifest drift it reports.
3. Extract Old-BE CMS page role rules into a generated/static role matrix before enabling CMS authorization guards.
4. Build route-specific upload compatibility before migrating News/Photo/Files/Opini/Banner upload-heavy domains.
5. Continue low-risk native extraction for other non-upload domains before touching security-sensitive Users/KDEKS flows.

A domain is not marked ✅ complete until live request/response and DB side effects are verified against the locked Old-BE baseline.
