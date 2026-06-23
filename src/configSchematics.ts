import { createConfigSchematics } from "@lmstudio/sdk";

export function buildConfigSchematics() {
  return createConfigSchematics()
    .field("defaultTargetLang", "string", {}, "en")
    .build();
}
