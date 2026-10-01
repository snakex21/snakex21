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

## Workshop refresh (2026-10-01)

The suite now has 46 checks. New coverage includes both catalogs (35 tool links,
query deep links, Polish diacritics, empty states, session/focus restoration across pagehide, unavailable
storage, missing game artwork), theme resilience, all modified local links,
home search, opt-in weather, request failures/timeouts and stale response races.
Pong tests cover duplicate victory timers, manual restart/mode changes and scaled
pointer coordinates. The unmodified Pong failed 8 of the 9 new cases.

No build step or browser/runtime dependency was added to the site. The local cloud
browser blocks localhost and file URLs; browser visual QA is performed against
the authorized GitHub Pages deployment, separately from these DOM/unit checks.

## Calm home and game lifecycle checks (2026-10-01)

The homepage keeps the original `weatherCity` key, restores the saved city on
reload and handles offline/invalid responses without losing the saved choice.
Quotes are bundled public-domain excerpts and need no API. The six category
links are intentionally simple; search and filters remain in the catalogues.

The game suite reproduces seven bugs in the previous Wojna Er, Tower and Flappy
implementations before the fixes. It covers fixed-time movement/economy,
start/pause/visibility/game-over guards, recruitment focus identity, shared
battlefield coordinates, projectile impacts, duplicate loops, stale timers,
keyboard/pointer controls and unavailable/corrupt local storage. Unit stats and
costs in Wojna Er are unchanged. Combat runs at the original 60 Hz baseline.

These synthetic checks do not certify real-device touch or mobile rendering.
Public GitHub Pages browser checks, including actual play and reloads, are
reported separately from the tests. No localhost/proxy workaround is used.
