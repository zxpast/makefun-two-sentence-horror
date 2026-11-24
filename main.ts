// Two-Sentence Horror — make.fun competition u-suroto-two-sentence-horror-acea9253
//
// main.ts (Node 22, stdlib only, deterministic, no network).
// Writes one horror story of exactly two sentences to /output/entry.txt.
//
// The story: a nine-year ritual of counting sheep (always forty-one)
// breaks by exactly one. The second sentence reframes the first: the
// count was never about the sheep — something has joined them, on two
// legs, wearing the narrator's own coat. The horror is implied, never
// explained: how did it get the coat, and what happens tomorrow night
// when the narrator counts again?

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. Exactly two sentences, 221 characters, no trailing
// newline (the gate counts 1-400 characters; smaller text wins ties).
const ENTRY =
  "I have counted the sheep in the field behind my house every evening " +
  "for nine years: always forty-one, never more, never less. " +
  "This evening there were forty-two, and the extra one was standing " +
  "on two legs, wearing my coat.";

function main(): void {
  // Self-check before writing: the gate requires 1-400 characters and
  // the brief requires exactly two sentences. Fail loudly rather than
  // emit an invalid entry.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 400) {
    throw new Error(`entry is ${chars} characters, must be 1-400`);
  }
  const sentences = ENTRY.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 2) {
    throw new Error(`entry has ${sentences.length} sentences, must be exactly 2`);
  }

  // Grading sandbox mounts the output directory at /output. An env
  // override exists only so the program can be run locally for testing.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
