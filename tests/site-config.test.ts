import assert from "node:assert/strict";
import test from "node:test";
import { HOURS, PATHS, PUBLIC_ROUTES, SITE, getPublicRoute, normalizePublicPath } from "../shared/site";

test("every public route is unique and canonicalized with a trailing slash", () => {
  const paths = PUBLIC_ROUTES.map((route) => route.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const path of paths) {
    assert.ok(path === "/" || path.endsWith("/"));
    assert.equal(getPublicRoute(path?.replace(/\/$/, ""))?.path, path);
  }
});

test("registered menu cluster routes are public", () => {
  assert.equal(getPublicRoute(PATHS.pizza)?.path, PATHS.pizza);
  assert.equal(getPublicRoute(PATHS.wings)?.path, PATHS.wings);
  assert.equal(normalizePublicPath("/menu?source=test"), PATHS.menu);
});

test("all service schedules cover each weekday exactly once", () => {
  const expectedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  for (const schedule of Object.values(HOURS)) {
    assert.deepEqual(schedule.map(({ day }) => day), expectedDays);
  }
});

test("the canonical order URL is secure", () => {
  assert.match(SITE.orderUrl, /^https:\/\/olo\.spoton\.com\//);
});