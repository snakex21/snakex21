# Board and puzzle game checks (2026-10-01)

Run `node --test tests/board-lifecycle.test.cjs`, or `npm test` for the full suite.
The focused suite has 34 cases, loading the production scripts in a synthetic
DOM with seeded randomness and controlled timers. It does not launch a browser,
load a CDN, or certify real-device input/rendering. Full-suite results should be
reported for the final integrated commit, separately from these focused checks.

| Game | Executed coverage | Changes / remaining scope |
| --- | --- | --- |
| Simon | Repeated Start, stale next-round callback, absent AudioContext | All playback callbacks cancelled on restart; audio initializes after gesture; native pad buttons and 1–4 keys. Real audio playback not tested. |
| Saper | Every neighbor position on 3×3 boards; flag cap/removal; flood/reset; safe-cell victory; first-mine relocation; touch flag mode | One neighbor function for counts/flood, synchronous bounded flood, first reveal safe, timer resets and begins on first reveal. Large boards scroll within the game area. |
| Chess | Pending/repeated AI restart; mode switch; promotion input lock; pawn attacks; castling through check; king-capture rejection; pin; legal castling; human/AI opening | Cancelled AI timeout, guarded promotion, keyboard square controls. Explicit UI notice: no en passant, repetition, 50-move, or insufficient-material draw rules. AI strength and all chess positions are not certified. |
| Connect4 | Full-board draw, horizontal win, post-win rejection, full-column rejection, restart | Draw termination; keyboard column controls and fluid board. Other win directions retained but not individually covered here. |
| Wordle | Repeated-letter allocation, six failed rows, restart during reveals, shortcut filtering, Backspace, native keyboard buttons | Restart and inline result feedback replace delayed alerts; mobile keyboard/grid sizing. Bundled 16-word answer list and acceptance of arbitrary five-letter guesses remain. |
| Sudoku | Four successive seeded unique puzzles, numeric sanitization, correct completed board, repeated new game | Finite shuffles and unique-solution clue removal. This is not a human difficulty rating; clue removal may stop short of 40 holes if uniqueness requires it. |
| Solitaire | 52-card deal, stale waste selection reset, foundation move and flip, foundation-to-tableau return | Reset clears selection/win timer; keyboard activation and fluid cards. No undo, solvability guarantee, or completed human deal test. |
| Memory | Locked preview, reset during mismatch, malformed best-score JSON shape, all nine pairs, stopped timer and 100% accuracy | Preview/mismatch timers owned by the current round; keyboard activation; paired symbols in addition to colors. Browser glyph rendering requires visual QA. |
| Tic-tac-toe | Reset during AI delay; all human continuations against deterministic AI from the player-first empty board | Minimax detects simulated draws; reset cancels AI callback. The exhaustive tree is for the existing deterministic tie-breaking policy and starting side. |
| Kolkos (legacy) | AI-turn click guard and AI cancellation on reset | Existing lifecycle passed; no gameplay source change was needed. Not evidence of a full review of this legacy duplicate. |
| Hangman | Alphabet input through game end, capped mistakes, locked result/score | Explicit finished state; ignores repeat/modifier/edit-field shortcuts. Full winning-word branch and all hints not enumerated. |
| Quiz | 10-question flow, completion/restart, duplicate answer rejection | One mode controller replaces conflicting duplicate functions/listeners; stale answers locked; questions are a small stable computing/components set replacing dubious historical and placeholder entries. |
| Wheel | No CDN required; empty spin; literal HTML-like participant name; repeated spin; reset mid-spin; complete winner selection; second round | Vanilla canvas controller, text-only names/results, fixed-duration animation, input lock while spinning, reset cancellation; 100-name limit. Randomness is ordinary `Math.random`, not suitable for regulated/prize drawings. |

Responsive sizing and keyboard controls are scoped to game areas. Header,
shared theme, catalog navigation and shared shell are owned by the separate
shell change. This suite intentionally does not evaluate their visual design.

## Browser follow-through

At 320–375 CSS pixels, check Wordle's entire keyboard, all eight Chess files,
all seven Connect4 columns, Saper's internal horizontal scrolling, and all seven
Solitaire piles. For Memory verify that symbols are invisible during the hidden
phase. Check Simon audio after Start, reset during all pending animations, and
keyboard focus after board rerenders. Parent browser QA should report the exact
routes and flows it actually exercised, independently of these synthetic checks.
