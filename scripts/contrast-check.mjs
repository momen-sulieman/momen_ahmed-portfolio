#!/usr/bin/env node
/**
 * Reads the colour tokens straight out of src/styles/globals.css and gates
 * every text/background pair the UI actually renders at WCAG AA (4.5:1), in
 * both themes. There is no second palette file to drift out of sync — if a
 * token changes, this sees it.
 *
 * Non-text marks (the skill-bar palette) are reported against a 3:1
 * guideline but don't fail the build: they always ship beside a visible
 * text label, so colour never carries the meaning alone.
 *
 * Run via `npm run contrast` (part of `npm run check`).
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CSS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "styles",
  "globals.css",
);

const TEXT_MIN = 4.5;
const MARK_MIN = 3;

/** text token -> the surfaces it is rendered on */
const TEXT_PAIRS = [
  ["foreground", ["background", "surface", "surface-raised", "accent-subtle"]],
  ["secondary", ["background", "surface", "surface-raised", "accent-subtle"]],
  ["tertiary", ["background", "surface", "surface-raised", "accent-subtle"]],
  ["accent", ["background", "surface", "surface-raised", "accent-subtle"]],
  ["accent-foreground", ["accent"]],
  ["danger-foreground", ["danger"]],
  ["success", ["background", "surface"]],
];

/** non-text fills, checked but not gated */
const MARK_PAIRS = [
  ["chart-1", ["surface", "surface-raised"]],
  ["chart-2", ["surface", "surface-raised"]],
  ["chart-3", ["surface", "surface-raised"]],
  ["chart-4", ["surface", "surface-raised"]],
];

function extractTokens(css, selector) {
  const block = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`, "s"));
  if (!block) throw new Error(`No "${selector}" block found in globals.css`);
  const tokens = {};
  const re = /--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g;
  let match;
  while ((match = re.exec(block[1]))) tokens[match[1]] = match[2];
  return tokens;
}

function luminance(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const int = parseInt(h.slice(0, 6), 16);
  const channels = [(int >> 16) & 255, (int >> 8) & 255, int & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const css = readFileSync(CSS_PATH, "utf8");
const themes = {
  light: extractTokens(css, ":root"),
  dark: extractTokens(css, "\\.dark"),
};

let failures = 0;
let checked = 0;

for (const [theme, tokens] of Object.entries(themes)) {
  console.log(`\n${theme}`);

  for (const [fg, backgrounds] of TEXT_PAIRS) {
    for (const bg of backgrounds) {
      if (!tokens[fg] || !tokens[bg]) {
        console.log(`  [SKIP] ${fg} on ${bg} — token missing`);
        continue;
      }
      const value = ratio(tokens[fg], tokens[bg]);
      const pass = value >= TEXT_MIN;
      if (!pass) failures += 1;
      checked += 1;
      console.log(
        `  [${pass ? "PASS" : "FAIL"}] ${fg} on ${bg}  ${value.toFixed(2)}:1`,
      );
    }
  }

  for (const [mark, backgrounds] of MARK_PAIRS) {
    for (const bg of backgrounds) {
      if (!tokens[mark] || !tokens[bg]) continue;
      const value = ratio(tokens[mark], tokens[bg]);
      if (value < MARK_MIN) {
        console.log(
          `  [note] ${mark} on ${bg}  ${value.toFixed(2)}:1 — below ${MARK_MIN}:1, relies on its text label`,
        );
      }
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} pair(s) below ${TEXT_MIN}:1. Fix the tokens in globals.css.`);
  process.exit(1);
}

console.log(`\nAll ${checked} text pairs meet ${TEXT_MIN}:1 across both themes.`);
