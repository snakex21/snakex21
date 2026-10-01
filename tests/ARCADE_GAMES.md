# Arcade verification and catalog inventory (2026-10-01)

Run `npm test` after all changes are integrated. The tests execute production
scripts against a synthetic DOM, canvas and controlled clocks. They are not
browser screenshots, a physical-touch test, a gamepad test, or a certification
that each game is enjoyable or fully implemented.

`games-startup.test.cjs` enumerates the actual catalog rather than maintaining a
second list. Every one of its **24 non-Wojna entries** initializes with storage
unavailable, executes two animation frames if applicable, and exposes a catalog
return link. Quiz and Wheel catalog entries are landing pages; their actual
`play.html` controllers have separate board tests. Wojna is covered by its own
lifecycle/battle/balance suites. Total catalog size: **25 games**.

## Executed arcade coverage

| Game and route under `gry/` | Executed evidence | Implemented changes / limits |
| --- | --- | --- |
| Tower `tower/tower.html` | Existing start/restart, storage, placement guards, 30/60/120 Hz tests; new explicit pause, hidden-tab pause and focused-game-button shortcut tests | Pause/Resume and New game controls; placing while paused resumes without scoring. A long human run and actual mobile rendering remain untested |
| Flappy `flappy/flappy.html` | Existing timer ownership, stale callbacks, death/restart, scoring, pipe-gap, pointer and storage tests; new bird/pipe/spawn pause and visibility tests | Explicit pause and header-aware whole-board scale. Original 20ms physics retained. Real mobile taps and display fit require browser QA |
| Dino `dino/dino.html` | Repeated start/death/restart; same elapsed movement/score at 30/60/120 Hz; one speed increase per milestone; storage and pause/focus guards | Single persistent fixed-step loop, bounded speed, controls, hidden-tab pause; no seeded full-course bot or human difficulty assessment |
| Snake `snakex21/snake.html` | Unrelated/modified key rejection; rapid two-turn queue; legal vacating-tail move; full-board win; stale reset tick and pause; unavailable score storage | Single accepted turn per tick, bounded nonrecursive food selection, explicit inline end state, restart/pause. Whole-board fixture tests the win condition, not a human route to it |
| Arkanoid `arkanoid/arkanoid.html` | Repeated Start/Continue; stale life-loss callback; scaled touch coordinate; 30/60/120 Hz ball state; visibility pause | Single fixed-step loop, guarded levels/timers, paddle-top bounce, per-hit brick response, bounded ball speed. Full multi-level human completion not tested |
| Pong `pong/pong.html` | Existing nine score/restart/timer/mode/scaled-pointer tests; new pause during win and stale cancelled-serve tests | Keyboard AI controls, touch controls for both halves, pause/hidden-tab guard, visible round winner, bounded speed. Two-player simultaneous real touch not tested |
| Space Invaders `spaceinvaders/spaceinvaders.html` | Space firing; navigation key isolation; last-life death; dead-shot idempotence; one bullet/one score; restart wave reset; invasion loss; hidden pause | Documented Space/X inputs, start/restart/pause and touch buttons, live bounds before collisions, brief hit invulnerability, bottom bullet removal. Full wave progression/human difficulty not certified |
| Tetris `tetris/tetris.html` | Startup with unavailable storage; touch-control presence; repeat/modifier pause rejection; hidden-tab pause; one RAF | Five onscreen controls and safe frame delta. No new exhaustive rotation/line-clear/scoring proof; existing engine retained |
| Z-Type `ztype/ztype.html` | Wait-for-start, whole-word score, pause/restart, actual board-floor loss, no input after loss, 30/60/120 Hz movement | Request-driven rounds, one RAF, explicit restart/pause, mobile text input, board-relative enemy coordinates. Soft keyboard viewport behavior requires device QA |
| Typing `typing/typing.html` | Completing every supplied word ends once and ignores later input; startup smoke | Round-token timer guard, composition-input guard, correct elapsed-time final WPM, exhaustion completion. Accuracy is still measured per completed word |
| Clicker `clicker/clicker.html` | Malformed save schema, HTML-like saved values, blocked storage, valid purchase and save failure | Recompute costs/rates from built-in definitions and validated counts; no saved HTML, keyboard upgrades, current affordability on first paint. No offline-production feature added |
| 2048 `2048/2048.html` | Existing merge/no-op/vertical game-over, four-direction seeded fixtures, key/touch/cancel/multitouch/restart tests plus storage-unavailable startup | No new game logic changes in this arcade pass |

The 12 remaining non-Wojna catalog games are Memory, Chess, Hangman,
Tic-tac-toe, Wheel, Quiz, Saper, Sudoku, Solitaire, Wordle, Connect4 and Simon.
See [BOARD_GAMES.md](BOARD_GAMES.md) for their exact tests and explicit rules or
coverage limits. Their pages are included in the catalog startup enumeration.

Thirteen focused arcade regressions failed before the corresponding changes;
Tower/Flappy's new pause tests were added immediately after their implementations.
The focused suite is regression evidence, not a claim that every possible
start/play/pause/restart/death branch of every game was exhaustively tested.

Successful Start, Resume, Restart and Continue actions focus the playfield (or
Z-Type/Typing text input). Focus regressions dispatch gameplay keys at the
resulting active element, in addition to testing header shortcut isolation.

## Browser QA matrix still required after approved deployment

Use each route above at desktop size and 390×700, with 320px width as the narrow
stress case. Verify the actual visible UI, then:

- Tower: Start → place a block → P while game button focused → resume → miss → restart
- Flappy: Start → several taps → pause → switch tabs → resume → ground/pipe death → rapid restart; check the whole scaled board and overlay buttons
- Dino/Snake: keyboard and touch controls → pause/tab hide → resume → actual collision → restart
- Arkanoid: mouse/touch drag across the scaled board → lose a life → restart during cooldown → finish a level → Continue twice → final death
- Pong: AI pointer/keyboard → pause; switch to two-player → left/right touch; score seven → visible result → next round
- Invaders: Start, arrows, hold Space/X, hold/release touch controls, pause/tab hide, lose all lives and restart
- Tetris: all five onscreen controls, keyboard rotations, pause/resume, blocked top, restart
- Z-Type: Start → type a complete target → pause → mobile keyboard → miss a target → restart
- Typing: input → duration change → completion/results → restart; Clicker: buy, reload, keyboard buy, unavailable storage

## Legacy noncatalog routes

- `kolkos/kolkos.html`: board worker tested AI-turn guard and timer cancellation; not a full gameplay review
- `pingpong/Ping-pong.html`: dedicated tests now cover waiting for Start, repeated restart with one timer, seventh-point immediate terminal state, retained winner result, clean new match, scaled pointer clamp, navigation-safe pause and tab-hide pause. Keyboard and touch controls were added; no automatic win reset remains
- `pongcoop/pongcoop.html`: dedicated tests cover unrelated/navigation/repeated key isolation, explicit next serve, seventh-point terminal state, fresh match, one timer through repeated restart, scaled left/right touch controls and tab-hide pause. The compact legacy global-key engine is now a scoped controller; the original Q/A and arrow keys and URL remain
- Browser follow-through for both legacy routes: Start → keyboard/pointer play → pause → point → seventh point → restart; include two simultaneous fingers for Coop. Synthetic tests do not establish actual two-finger device behavior or full human play quality

No push or deployment is part of this change. Final deployed browser verification
must identify the exact commit and flows exercised separately from these tests.
