# Targeted regression checks

Run with Node.js 20 or newer:

```sh
npm ci --ignore-scripts
npm test
```

The site itself remains static HTML/JavaScript and needs no npm dependencies.
`linkedom` is used only by tests to execute the actual inline page scripts with
synthetic DOM, storage and input events. Tests do not contact external services,
use private data or launch a browser.

Coverage: 2048 score, no-op moves, vertical adjacency, merge rules, all four
move directions (160 seeded fixtures), keyboard shortcuts, touch tap/cancel/
multi-touch/restart; task-list corrupt JSON/schema, unavailable/quota-limited
storage, ID collisions, completion persistence, HTML text and Enter/IME input.

This is not browser rendering or real-device touch testing. Before publication,
check both pages in a real browser at desktop and mobile widths: 2048 tile text,
swipe/scroll behavior, task storage warning readability and keyboard focus.

The original pages at ff671a01a7747a56f05141c89a088d4db1ff9be0 failed 9 of the
first 11 regression cases. The two passing controls covered legitimate game-over
and one-merge-per-move behavior. The changed pages pass all 19 tests.

The task-list page preserves its original CRLF line endings. For a whitespace
check that respects those existing endings:

```sh
git -c core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol diff --check
```
