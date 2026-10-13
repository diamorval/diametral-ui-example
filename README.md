# @diametral/design-system example

A realistic consulting-firm dashboard built only from
[`@diametral/design-system`](https://www.npmjs.com/package/@diametral/design-system), installed from npm
like any consumer would. It exists to prove the published package works from
the outside, and to show what the design system can do.

**Live demo:** https://diamorval.github.io/diametral-ui-example/

## Run it

```bash
pnpm install
pnpm dev
```

## How it uses the package

```css
/* src/index.css */
@import "@diametral/design-system/tailwind.css";
@source "./**/*.{ts,tsx}";
```

```tsx
import { Button, DataTable, Sidebar } from "@diametral/design-system/react"
import mark from "@diametral/design-system/assets/logo/diametral-mark.svg"
```

That's the whole setup: one stylesheet import, one `@source` line, and
components from the package root.

## Checks

`pnpm test` builds the app and runs a Playwright smoke test over every page:
each renders its heading with no console errors, the flat styling applies, dark
mode and the command palette work. CI runs it on every push and weekly, so a new
`@diametral/design-system` release that breaks consumers shows up here.
