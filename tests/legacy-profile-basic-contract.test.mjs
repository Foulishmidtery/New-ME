import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const contactsController = fs.readFileSync(path.join(root, "src/server/controllers/legacy-contacts.controller.js"), "utf8");
const mapsController = fs.readFileSync(path.join(root, "src/server/controllers/legacy-maps.controller.js"), "utf8");
const repositorySource = fs.readFileSync(path.join(root, "src/server/repositories/profile.repository.js"), "utf8");

test("Contacts keeps Old-BE list, update redirect and questbook response", () => {
  assert.ok(contactsController.includes("/contacts"));
  assert.ok(contactsController.includes("/updatecontacts"));
  assert.ok(contactsController.includes("/questbook"));
  assert.match(contactsController, /rows\.length \? rows : \{ success: false \}/);
  assert.match(contactsController, /`\/c_edit\/\$\{encodeURIComponent\(body\.id \?\? ""\)\}`/);
  assert.match(contactsController, /Response\.json\(\{ success: true \}, \{ status: 200 \}\)/);
  assert.match(repositorySource, /SELECT \* FROM contacts/);
  assert.match(repositorySource, /INSERT INTO questbook/);
});

test("Maps keeps Old-BE list and successful update redirect", () => {
  assert.ok(mapsController.includes("/maps"));
  assert.ok(mapsController.includes("/updatemaps"));
  assert.match(mapsController, /rows\.length \? rows : \{ success: false \}/);
  assert.match(mapsController, /`\/m_edit\/\$\{encodeURIComponent\(body\.id \?\? ""\)\}`/);
  assert.match(repositorySource, /SELECT \* FROM map/);
  assert.match(repositorySource, /UPDATE map SET embed=\$1 WHERE id=\$2/);
});
