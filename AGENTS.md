## Structure

- Source in `src/` with `@/*` path alias to `./src/*`
- App Router (`src/app/`), React 18 via Next.js 14
- Purely client-side app — no API routes, server components, or `getServerSideProps`

## Commands

- `npm run dev` / `npm run build` / `npm run lint`
- Typecheck: `npx tsc --noEmit` (no npm script)

## Config Constraints

- `next.config.mjs` — Next.js 14 does not support `next.config.ts`
- `.eslintrc.json` — ESLint 8 (not flat config `.eslint.config.mjs`)
- `tsconfig.json`: `jsx: "preserve"` — Next.js handles JSX transform internally

## Notes

- No test framework configured
- CSS imports Google Fonts directly (`Pacifico`) in `globals.css` — not using `next/font`
