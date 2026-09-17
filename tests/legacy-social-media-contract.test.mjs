import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(path.join(root, "src/server/controllers/legacy-social-media.controller.js"), "utf8");
const repositorySource = fs.readFileSync(path.join(root, "src/server/repositories/profile.repository.js"), "utf8");

test("Social Media keeps Old-BE list/detail/delete/update contract", () => {
  for (const pathname of ["/sosmed", "/updatesosmed"]) {
    assert.ok(controllerSource.includes(pathname), `missing Social Media path ${pathname}`);
  }
  assert.ok(controllerSource.includes('const SOCIAL_DETAIL_RE = /^\\/detailsosmed\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('const SOCIAL_DELETE_RE = /^\\/deletesosmed\\/([^/]+)$/;'));
  assert.match(controllerSource, /legacyRedirect\(request, "\/sm"\)/);
  assert.match(repositorySource, /SELECT \* FROM social_medias/);
  assert.match(repositorySource, /UPDATE social_medias SET name=\$1, logo=\$2, link=\$3 WHERE id=\$4/);
});

test("Post Social Media preserves list ordering, frontend filter and /psm redirects", () => {
  for (const pathname of ["/postsosmed", "/postsosmedfe", "/insertpostsosmed", "/updatepostsosmed"]) {
    assert.ok(controllerSource.includes(pathname), `missing Post Social Media path ${pathname}`);
  }
  assert.ok(controllerSource.includes('const POST_DETAIL_RE = /^\\/postdetailsosmed\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('const POST_DELETE_RE = /^\\/postdeletesosmed\\/([^/]+)$/;'));
  assert.match(controllerSource, /legacyRedirect\(request, "\/psm"\)/);
  assert.match(repositorySource, /SELECT \* FROM post_social_medias ORDER BY id DESC/);
  assert.match(repositorySource, /SELECT \* FROM post_social_medias WHERE id_sosmed=\$1 AND flag=\$2 ORDER BY id ASC/);
  assert.match(repositorySource, /\['1', 'kneks'\]/);
});

test("Social Media empty reads retain Old-BE HTTP 200 false shape", () => {
  assert.match(controllerSource, /rows\.length \? rows : \{ success: false \}/);
  assert.match(controllerSource, /row \? \[row\] : \{ success: false \}/);
  assert.match(controllerSource, /status: 200/);
});
