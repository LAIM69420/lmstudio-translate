# lmstudio-translate

Language detection, language listing, and phrase translation, deferring full translations to the model.

| | |
|---|---|
| Type | tools |
| Tools | 3 |
| Version | 1.0.0 |

## Tools

| Tool | What it does |
|---|---|
| `translate_detect` | Identify the language of a string |
| `translate_langs` | List supported languages |
| `translate_phrase` | Translate a short phrase |

## Requirements

| Requirement | Detail |
|---|---|
| None | Detection and phrase tables are local; longer translations use the model |

## Configuration

`defaultTargetLang`.

Configured in LM Studio under Integrations → lmstudio-translate; field definitions live in `src/configSchematics.ts`.

## Privileged surface

None beyond the text you pass. Note that anything translated becomes part of the transcript in two languages.

## Failure modes

| Symptom | Cause |
|---|---|
| Wrong detection on short inputs | Single words are ambiguous between related languages |

## Example prompts

- "What language is this?"
- "Translate 'good morning' to Thai."

## Development

```bash
npm install    # also runs `lms dev --install`
npm run build  # tsc
```

## Status

| Item | State |
|---|---|
| Compiles | verified with `tsc --noEmit` against the current toolchain |
| Tests | none — no smoke harness in this repo yet |
| Verified against | LM Studio 0.4.28 |
| Known gaps | no behavioural tests; docs written from source review |

## License

MIT
