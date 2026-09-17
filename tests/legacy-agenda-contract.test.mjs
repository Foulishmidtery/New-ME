import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(path.join(root, "src/server/repositories/agenda.repository.js"), "utf8");
const serviceSource = fs.readFileSync(path.join(root, "src/server/services/agenda.service.js"), "utf8");
const controllerSource = fs.readFileSync(path.join(root, "src/server/controllers/legacy-agenda.controller.js"), "utf8");

test("legacy Agenda search keeps Old-BE LIKE semantics and 200-character input cap", () => {
  const legacySearch = repositorySource.match(/async legacySearch\(keyword\) \{([\s\S]*?)\n  \},/);
  assert.ok(legacySearch, "legacySearch must exist");
  assert.match(legacySearch[1], /slice\(0, 200\)/);
  assert.match(legacySearch[1], /organizer LIKE \$1/);
  assert.doesNotMatch(legacySearch[1], /ILIKE/);
});

test("legacy Agenda create normalizes T but update preserves raw agenda_datetime", () => {
  assert.match(repositorySource, /legacyValues\(data, \{ normalizeAgendaDatetime: true \}\)/);
  const legacyUpdate = repositorySource.match(/async legacyUpdate\(data, timestamp\) \{([\s\S]*?)\n  \},/);
  assert.ok(legacyUpdate, "legacyUpdate must exist");
  assert.match(legacyUpdate[1], /legacyValues\(data\)/);
  assert.doesNotMatch(legacyUpdate[1], /normalizeAgendaDatetime: true/);
});

test("legacy Agenda update keeps Old-BE created_at and updated_at side effect", () => {
  const legacyUpdate = repositorySource.match(/async legacyUpdate\(data, timestamp\) \{([\s\S]*?)\n  \},/);
  assert.ok(legacyUpdate);
  assert.match(legacyUpdate[1], /created_at=\$24, updated_at=\$25/);
});

test("legacy Agenda timestamp keeps Old-BE non-padded date construction", () => {
  assert.match(serviceSource, /const month = now\.getMonth\(\) \+ 1/);
  assert.match(serviceSource, /`\$\{now\.getFullYear\(\)\}-\$\{month\}-\$\{now\.getDate\(\)\}`/);
});

test("legacy Agenda graph preserves historical response field mapping", () => {
  const graph = repositorySource.match(/async legacyGraph\(\) \{([\s\S]*?)\n  \},\n\};/);
  assert.ok(graph, "legacyGraph must exist");
  assert.match(graph[1], /totalKegiatan: wilayah\?\.wilayah/);
  assert.match(graph[1], /totalPeserta: participants\?\.participants/);
  assert.match(graph[1], /totalWilayah: kegiatan\?\.kegiatan/);
});

test("legacy Agenda controller owns all Old-BE Agenda routes and redirects mutations to /a", () => {
  for (const pathname of ["/agenda", "/agenda_graph", "/search_agenda", "/insertagenda", "/updateagenda"]) {
    assert.ok(controllerSource.includes(pathname), `missing legacy Agenda path ${pathname}`);
  }
  assert.ok(controllerSource.includes('const DETAIL_RE = /^\\/agendadetails\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('const DELETE_RE = /^\\/deleteagenda\\/([^/]+)$/;'));
  assert.match(controllerSource, /legacyRedirect\(request, "\/a"\)/);
  assert.match(controllerSource, /rows\.length \? rows : \{ success: false \}/);
});
