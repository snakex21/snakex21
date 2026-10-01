# Wojna Er normal-mode rules and evidence (2026-10-01)

Run `npm test` or `node --test tests/war-balance.test.cjs tests/war-battle.test.cjs`.
These execute the actual production simulation at 60 Hz with controlled inputs.
They do not establish browser rendering, human enjoyment or competitive balance.
The earlier mixed-era firing-line, fortress-front and projectile-interception
regressions remain in the suite.

## Causes and deliberate design decisions

The enemy constructor had an undisclosed 20% HP multiplier. XP was paid per hit
and multiplied by the attacker's era, so fast-firing advanced units earned
research much faster and could farm obsolete troops. AI evolved immediately;
a human had to notice a button. Higher eras multiply gold income substantially.
Movement speed itself had no hidden enemy multiplier.

Both armies now use identical troop definitions and a fixed XP budget for each
victim: 2 × (1 + victim era × 2) distributed by actual HP removed, then 20 × that
multiplier once on death. Attack speed, overkill and attacker technology cannot
inflate this budget. Troop costs, 1.2-second training and 14-unit limit match.

Equal-era income over ten active seconds is tested exactly:

| Era | Gold per army | Research XP per army |
| --- | ---: | ---: |
| Stone | 70 | 20 |
| Medieval | 200 | 50 |
| Modern | 650 | 120 |
| Future | 2200 | 0 |

The **Normal** opponent deliberately waits for player era unlocks. It pays the
full 500/1500/4000 XP costs and waits at least 12 active seconds after the relevant
unlock and between catch-up evolutions. Its first order is at 4 seconds, then
once every 2 seconds. This is an explicit forgiving difficulty rule, separate
from fixing hidden stats and runaway XP; it is not a claim of symmetric AI.
The opponent still buys affordable counters and continues fighting while waiting.
The player-only turret and manual human decisions also make the game asymmetric.

The HUD and instructions explain research, E/T shortcuts, readiness and the
opponent's earliest response. Pausing freezes research and progression clocks.
The battle canvas tracks element resizing when shared navigation wraps.

## Defensive support and camping control

Peer review found that the initial level-three tower could defeat every stone
wave indefinitely while banking more than 6000 XP, followed by multiple player
evolutions. That tuning was rejected before publication.

Tower levels now deal 15/20/25 damage × player-era multiplier, with an 80-frame
cooldown counter, and keep the existing range and 100/150/225 gold upgrade costs.
It remains useful support but needs an army. At seeds 1/7/42/77/2026, buying only
the three tower levels without evolving loses in 117–139 seconds, below the
research needed to skip all eras. Tower-only play with immediate evolution also
loses in 634–637 seconds at seeds 1/7/42; it cannot win or camp indefinitely.

## Complete strategy probes on the final support tuning

All strategies cycle the three troop types, retry unaffordable orders, use actual
prices and never alter resources. The defensive policy buys a tower only with
spare gold after reserving the next troop cost. Aggressive play buys no tower.

- Defensive: first order 5s, orders every 3s, evolution 8s after readiness
- Aggressive: first order 5s, orders every 2s, evolution 8s after readiness
- Slower novice: first order 10s, orders every 4s, evolution 20s after readiness

| Seed | Defensive result | Aggressive result | Slower novice result |
| ---: | --- | --- | --- |
| 1 | Win 195.6s | Win 329.0s | Win 183.6s |
| 7 | Win 146.3s | Win 354.8s | Win 191.3s |
| 42 | Win 157.1s | Win 153.9s | Win 182.8s |
| 77 | Win 159.3s | Win 173.6s | Win 186.8s |
| 2026 | Win 171.2s | Win 348.7s | Win 180.9s |

Every defensive and novice run bought all three tower levels; aggressive runs
bought zero. All kept both gold balances nonnegative and enemy era lead at zero.
Novice bases fell as low as 79–93% health; the other winning probes took no base
damage. These are viability probes, not representative human success rates.

Losing controls remain: seed42 idle loses at171.2s; mixed orders every4s without
a tower lose at207.2s. Ineffective first-slot-only play also has a real loss
condition. A mixed army is helpful, not an artificial prerequisite for winning.

`simulateNormal` in `tests/helpers/war-harness.cjs` returns every successful
purchase/evolution plus 30-second snapshots of both eras, HP, gold, XP, armies
and tower level. Use those traces when investigating a strategy; do not rely
only on terminal win/loss. Example invocation:

```js
const { simulateNormal } = require('./tests/helpers/war-harness.cjs');
console.log(JSON.stringify(simulateNormal(42, {orderEvery: 3, turret: true}), null, 2));
```

## Browser gate

Before claiming playability, exercise the reviewed deployed commit from start to
victory/defeat, pause/resume, evolution, focus changes and restart. Inspect actual
mobile control fit. The cloud browser blocked local preview with
`ERR_BLOCKED_BY_CLIENT`; no alternate route was used to bypass it. Final live
QA and any observed issues must be reported separately from synthetic results.
