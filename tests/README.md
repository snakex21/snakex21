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

## Wojna Er: illustrated battles and tactical pacing (2026-10-01)

Run `npm test` for all 90 checks. The ten new battle checks exercise recruitment
limits, formation passing, role counters, both teams' fortification damage,
affordable AI decisions, scaled economy, pause behavior, one-time bounties,
bounded particles, and deterministic seeded strategy comparisons. Canvas artwork
has no combat RNG side effects. The prior shared-coordinate check now locates
the drawn fortress instead of the removed rectangular placeholder; the kill
check still asserts a single hit/award, at the deliberately retuned 22 XP.

Design aims: preserve an opening for decisions, make a mixed army more useful
than repeated purchases of one unit, reach a first evolution in roughly one to
two minutes of active fighting, and make later-era units affordable from their
era's income. The three old strategies use the same simple once-per-second
orders and immediate affordable evolution; they are repeatable probes, not a
model of human play or a claim that the game is fun.

Measured with the actual simulation at 60 Hz, seeds 1, 7 and 42:

| Strategy | Before (c75f980) | This pass |
| --- | --- | --- |
| Repeated cheapest unit | Won in 26 / 28 / 27 seconds | Lost in 240 / 194 / 189 seconds |
| Cycle all three unit types | Won in 27 / 28 / 29 seconds | Won in 240 / 144 / 312 seconds |
| Repeated second unit | Loss 63 / loss 69 / win 92 seconds | Lost in 197 / 240 / 208 seconds |
| First mixed-army evolution | 15 / 14 / 15 seconds | 60 / 54 / 53 seconds |

Five additional mixed-army seeds (13, 77, 123, 343, 2026) produced four wins and
one loss, with battles lasting 135–243 seconds and first evolution at 58–61
seconds. Seed 77 is included in the test matrix so mixed recruitment is not
mistaken for an unconditional win. Most winning probes reach the future; a
strong modern-era push can still finish earlier. No minimum match timer exists.

Intentional balance changes are confined to this game:

- 1.2-second muster, 14 living units per team, 26-pixel same/shorter-range
  formation spacing; short-range units can pass a shooting ally
- Guard takes 65% volley damage; piercing deals 150% against guard; volley
  deals 150% against piercing. Recruitment cards expose these roles
- Bases take 22% normal damage, with a 1.5x bonus for catapult/tank/hover siege
- Hits/kills earn 2/20 XP times the attacker's era multiplier, and kills pay
  a 20% cost bounty once; era incomes are 7/20/65/220 gold per second
- Both armies pay the same evolution XP cost; AI maintains a guard and buys
  counters to visible composition, with a little seeded variety
- The first turret is affordable at 100 gold, upgrades cap at three, and damage
  scales with the player's era; the future drone now fires a visible projectile

Original unit HP, damage, range, movement, reload, costs and enemy HP multiplier
are preserved. Start/pause/visibility, 60 Hz stepping, hotkeys, stable buttons,
projectile interception, no-overdraft guards and damage-preserving evolution
remain covered. There is no runtime framework or new network dependency.

The twelve original vector silhouettes, four environments and bases are drawn
from code in `art.js`. A temporary local native-canvas rendering checked all
four scenes; that tooling is outside the repository and the production page.
Public browser gameplay and responsive rendering must be checked separately
after the reviewed GitHub Pages deployment. Synthetic bots do not establish
human enjoyment, input comfort or browser rendering quality.

Live browser review also caught decorative clouds drawing into the aspect-ratio
gutters. A regression failed on the published first pass; clipping the drawing
to its transformed virtual battlefield fixes it without changing the simulation.
