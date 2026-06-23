import { tool, type ToolsProvider } from "@lmstudio/sdk";
import { z } from "zod";

import { buildConfigSchematics } from "./configSchematics.js";

const configSchematics = buildConfigSchematics();

// ---------------------------------------------------------------------------
// Language info
// ---------------------------------------------------------------------------

interface LangInfo {
  code: string;
  name: string;
  native: string;
  flags: string[];
}

const LANGUAGES: LangInfo[] = [
  { code: "en",  name: "English",     native: "English",       flags: ["the", "and", "is", "are", "was", "were", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "this", "that", "with", "from", "what", "when", "where", "which", "about", "there", "their", "they", "its", "it's"] },
  { code: "es",  name: "Spanish",     native: "Español",       flags: ["el", "la", "los", "las", "y", "es", "son", "está", "están", "tiene", "tienen", "han", "había", "con", "para", "por", "qué", "cómo", "dónde", "cuándo", "del", "más", "pero", "esto", "esta", "ese", "esa"] },
  { code: "fr",  name: "French",      native: "Français",      flags: ["le", "la", "les", "des", "est", "sont", "et", "avec", "dans", "sur", "pour", "avoir", "être", "faire", "elle", "ils", "nous", "vous", "ce", "cette", "ces", "donc", "mais", "quoi", "comment", "où"] },
  { code: "de",  name: "German",      native: "Deutsch",       flags: ["der", "die", "das", "ist", "sind", "und", "mit", "auf", "für", "nicht", "ein", "eine", "einen", "einer", "dem", "den", "des", "denn", "aber", "oder", "weil", "wenn", "wie", "wo", "was"] },
  { code: "it",  name: "Italian",     native: "Italiano",      flags: ["il", "la", "lo", "gli", "le", "è", "sono", "e", "con", "per", "non", "che", "un", "una", "dell", "della", "delle", "degli", "questo", "questa", "anche", "cosa", "come", "dove"] },
  { code: "pt",  name: "Portuguese",  native: "Português",     flags: ["o", "a", "os", "as", "é", "são", "e", "com", "para", "por", "não", "um", "uma", "de", "da", "do", "dos", "das", "em", "no", "na", "nos", "nas", "que", "como", "onde"] },
  { code: "nl",  name: "Dutch",       native: "Nederlands",    flags: ["de", "het", "is", "zijn", "en", "met", "voor", "op", "in", "niet", "een", "van", "aan", "dat", "die", "wat", "hoe", "waar", "maar", "omdat", "als", "dan"] },
  { code: "pl",  name: "Polish",      native: "Polski",        flags: ["i", "w", "na", "z", "do", "się", "jest", "są", "nie", "to", "że", "co", "jak", "gdzie", "kiedy", "ale", "lub", "ten", "ta", "to", "mój", "twój"] },
  { code: "ru",  name: "Russian",     native: "Русский",       flags: ["и", "в", "на", "с", "к", "о", "не", "что", "это", "он", "она", "они", "мы", "вы", "ты", "как", "где", "когда", "но", "или", "если", "потому", "за"] },
  { code: "ja",  name: "Japanese",    native: "日本語",         flags: ["は", "が", "を", "に", "へ", "で", "と", "から", "まで", "の", "か", "も", "て", "いる", "ます", "です", "した", "する", "なる", "ある", "ない", "こと", "これ", "それ"] },
  { code: "ko",  name: "Korean",      native: "한국어",         flags: ["은", "는", "이", "가", "을", "를", "에", "에서", "로", "으로", "와", "과", "도", "만", "하다", "되다", "있다", "없다", "않다", "그", "이", "저"] },
  { code: "zh",  name: "Chinese",     native: "中文",           flags: ["的", "了", "是", "在", "和", "也", "就", "都", "而", "及", "与", "着", "或", "一个", "没有", "我们", "他们", "可以", "因为", "所以", "但是"] },
  { code: "ar",  name: "Arabic",      native: "العربية",       flags: ["في", "من", "على", "إلى", "عن", "مع", "كان", "هذا", "هذه", "ذلك", "هو", "هي", "هم", "أن", "إن", "لا", "ما", "هل", "و", "ف", "ب"] },
  { code: "tr",  name: "Turkish",     native: "Türkçe",        flags: ["ve", "bir", "bu", "ile", "için", "olarak", "olan", "ama", "veya", "gibi", "kadar", "daha", "en", "çok", "var", "yok", "ne", "nasıl", "nerede"] },
  { code: "sv",  name: "Swedish",     native: "Svenska",       flags: ["och", "är", "att", "det", "en", "ett", "som", "på", "i", "för", "med", "inte", "har", "hade", "den", "de", "var", "när", "hur"] },
  { code: "da",  name: "Danish",      native: "Dansk",         flags: ["og", "er", "at", "det", "en", "et", "som", "på", "i", "for", "med", "ikke", "har", "havde", "den", "de", "var", "når", "hvordan"] },
  { code: "fi",  name: "Finnish",     native: "Suomi",         flags: ["ja", "on", "ei", "se", "että", "mutta", "tai", "kanssa", "varten", "olla", "tämä", "tuo", "siellä", "täällä", "missä", "milloin"] },
  { code: "cs",  name: "Czech",       native: "Čeština",       flags: ["a", "je", "se", "na", "v", "do", "že", "to", "ale", "nebo", "si", "jsem", "jste", "mám", "máš", "má", "jsou", "kdy", "kde", "jak"] },
  { code: "hu",  name: "Hungarian",   native: "Magyar",        flags: ["és", "a", "az", "nem", "hogy", "egy", "van", "voltak", "de", "vagy", "mert", "ha", "még", "ezt", "azt", "itt", "ott", "hol", "hogyan"] },
  { code: "ro",  name: "Romanian",    native: "Română",        flags: ["și", "de", "în", "pe", "cu", "la", "este", "sunt", "nu", "dar", "sau", "că", "mai", "un", "o", "aceasta", "acest", "cum", "unde"] },
  { code: "el",  name: "Greek",       native: "Ελληνικά",      flags: ["και", "το", "η", "στο", "σε", "με", "για", "από", "είναι", "δεν", "θα", "έχει", "έχουν", "ότι", "αλλά", "ή", "αν", "πως", "όταν"] },
  { code: "th",  name: "Thai",        native: "ไทย",           flags: ["ที่", "ของ", "ใน", "และ", "กับ", "เป็น", "มี", "ได้", "ไม่", "เพื่อ", "ว่า", "ให้", "จะ", "การ", "นี้", "นั้น", "เขา", "เรา", "คุณ"] },
  { code: "vi",  name: "Vietnamese",  native: "Tiếng Việt",    flags: ["và", "của", "trong", "với", "có", "không", "được", "đã", "sẽ", "đang", "là", "một", "những", "các", "này", "đó", "như", "cho", "tôi"] },
  { code: "hi",  name: "Hindi",       native: "हिन्दी",         flags: ["है", "और", "में", "का", "की", "के", "से", "को", "यह", "वह", "ये", "वे", "नहीं", "हैं", "था", "थे", "थी", "करना", "होना"] },
  { code: "bn",  name: "Bengali",     native: "বাংলা",          flags: ["ও", "এবং", "এর", "তে", "এ", "সে", "তা", "থেকে", "করে", "হয়", "না", "কি", "কী", "কোন", "কিছু", "সব", "জন্য", "বাংলা"] },
];

const LANG_MAP = new Map(LANGUAGES.map((l) => [l.code, l]));

// ---------------------------------------------------------------------------
// Simple phrase dictionary (common phrases for demo-quality translation)
// ---------------------------------------------------------------------------

const PHRASE_DICT: Record<string, Record<string, string>> = {
  en: {
    hello: "hello", goodbye: "goodbye", thanks: "thank you",
    yes: "yes", no: "no", please: "please",
    "how are you": "how are you", "good morning": "good morning",
    "good night": "good night", "my name is": "my name is",
    "I don't understand": "I don't understand",
    "help": "help", "sorry": "sorry",
  },
  es: {
    hello: "hola", goodbye: "adiós", thanks: "gracias",
    yes: "sí", no: "no", please: "por favor",
    "how are you": "cómo estás", "good morning": "buenos días",
    "good night": "buenas noches", "my name is": "me llamo",
    "I don't understand": "no entiendo",
    help: "ayuda", sorry: "lo siento",
  },
  fr: {
    hello: "bonjour", goodbye: "au revoir", thanks: "merci",
    yes: "oui", no: "non", please: "s'il vous plaît",
    "how are you": "comment allez-vous",
    "good morning": "bonjour",
    "good night": "bonne nuit",
    "my name is": "je m'appelle",
    "I don't understand": "je ne comprends pas",
    help: "aide", sorry: "désolé",
  },
  de: {
    hello: "hallo", goodbye: "tschüss", thanks: "danke",
    yes: "ja", no: "nein", please: "bitte",
    "how are you": "wie geht's",
    "good morning": "guten Morgen",
    "good night": "gute Nacht",
    "my name is": "ich heiße",
    "I don't understand": "ich verstehe nicht",
    help: "hilfe", sorry: "entschuldigung",
  },
  it: {
    hello: "ciao", goodbye: "arrivederci", thanks: "grazie",
    yes: "sì", no: "no", please: "per favore",
    "how are you": "come stai",
    "good morning": "buongiorno",
    "good night": "buona notte",
    "my name is": "mi chiamo",
    "I don't understand": "non capisco",
    help: "aiuto", sorry: "mi dispiace",
  },
  pt: {
    hello: "olá", goodbye: "tchau", thanks: "obrigado",
    yes: "sim", no: "não", please: "por favor",
    "how are you": "como vai",
    "good morning": "bom dia",
    "good night": "boa noite",
    "my name is": "me chamo",
    "I don't understand": "não entendo",
    help: "ajuda", sorry: "desculpe",
  },
};

// ---------------------------------------------------------------------------
// Language detection
// ---------------------------------------------------------------------------

function detectLanguage(text: string): LangInfo[] {
  const lower = text.toLowerCase();
  const tokens = lower.split(/[^\p{L}]/u).filter(Boolean);
  const scored: { lang: LangInfo; score: number }[] = [];

  for (const lang of LANGUAGES) {
    let score = 0;
    for (const flag of lang.flags) {
      if (lower.includes(flag)) score += flag.length;
    }
    // Bonus for script detection
    if (lang.code === "ja" && /[\u3040-\u309F\u30A0-\u30FF]/.test(text)) score += 50;
    if (lang.code === "ko" && /[\uAC00-\uD7AF]/.test(text)) score += 50;
    if (lang.code === "zh" && /[\u4E00-\u9FFF]/.test(text)) {
      // exclude Japanese kanji overlap by checking for kana
      if (!/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) score += 50;
    }
    if (lang.code === "ru" && /[\u0400-\u04FF]/.test(text)) score += 50;
    if (lang.code === "el" && /[\u0370-\u03FF]/.test(text)) score += 50;
    if (lang.code === "ar" && /[\u0600-\u06FF]/.test(text)) score += 50;
    if (lang.code === "th" && /[\u0E00-\u0E7F]/.test(text)) score += 50;
    if (lang.code === "hi" && /[\u0900-\u097F]/.test(text)) score += 50;
    if (lang.code === "bn" && /[\u0980-\u09FF]/.test(text)) score += 50;

    if (score > 0) scored.push({ lang, score });
  }

  scored.sort((a, b) => b.score - a.score);

  // If no script matches, use top N languages with word-based detection
  if (scored.length === 0 || scored[0].score < 10) {
    for (const lang of LANGUAGES.slice(0, 6)) { // top 6 common
      let score = 0;
      for (const flag of lang.flags) {
        if (tokens.includes(flag)) score += 2;
      }
      if (score > 0) scored.push({ lang, score });
    }
    scored.sort((a, b) => b.score - a.score);
  }

  return scored.slice(0, 3).map((s) => s.lang);
}

// ---------------------------------------------------------------------------
// Tools provider
// ---------------------------------------------------------------------------

export const toolsProvider: ToolsProvider = async (ctl) => {
  const config = ctl.getPluginConfig(configSchematics);
  const defaultTargetLang: string = config.get("defaultTargetLang");

  const detectTool = tool({
    name: "translate_detect",
    description: "Detect the language(s) of a given text. Returns language codes, names, and confidence indicators.",
    parameters: {
      text: z.string().min(1).max(5000).describe("Text to analyse"),
    },
    async implementation({ text }) {
      const results = detectLanguage(text);
      if (results.length === 0) return "Could not determine language.";
      const lines = results.map((l, i) => {
        const pct = Math.max(0, 100 - i * 35);
        return `${i + 1}. ${l.name} (${l.native}) — ${l.code} — ${pct}% confidence`;
      });
      return lines.join("\n");
    },
  });

  const langsTool = tool({
    name: "translate_langs",
    description: "List all supported language codes and names for translation/detection.",
    parameters: {},
    async implementation() {
      const lines = LANGUAGES.map((l) => `${l.code.padEnd(5)} ${l.name.padEnd(16)} ${l.native}`);
      return "Supported languages:\n\n" + lines.join("\n");
    },
  });

  const phraseTool = tool({
    name: "translate_phrase",
    description: "Translate a common phrase or word between supported languages. Uses a built-in dictionary — works best for everyday phrases (hello, thanks, etc.). For full sentences, ask the LLM to do the translation.",
    parameters: {
      text: z.string().min(1).max(200).describe("Phrase to translate"),
      from: z.string().length(2).optional().describe("Source language code (auto-detect if omitted)"),
      to: z.string().length(2).describe(`Target language code (default: ${defaultTargetLang})`),
    },
    async implementation({ text, from, to }) {
      const targetCode = to ?? defaultTargetLang;
      const targetLang = LANG_MAP.get(targetCode);
      if (!targetLang) return `Unknown target language code: "${targetCode}". Use 'translate_langs' to see supported codes.`;

      const lower = text.toLowerCase().trim();

      // Detect source if not provided
      let sourceCode = from;
      if (!sourceCode) {
        const detected = detectLanguage(text);
        sourceCode = detected.length > 0 ? detected[0].code : "en";
      }

      if (sourceCode === targetCode) return `Already ${LANG_MAP.get(targetCode)?.name ?? targetCode}: "${text}"`;

      // Look up in dictionary
      const sourceDict = PHRASE_DICT[sourceCode];
      const targetDict = PHRASE_DICT[targetCode];

      if (sourceDict && targetDict) {
        // Try direct lookup from source to target
        for (const [phrase, srcPhrase] of Object.entries(sourceDict)) {
          if (lower === phrase || lower === srcPhrase) {
            return targetDict[phrase] ?? `[No dictionary entry]`;
          }
        }
      }

      // Fallback: try reverse lookup
      if (sourceDict && targetDict) {
        for (const [phrase, srcPhrase] of Object.entries(sourceDict)) {
          if (lower === srcPhrase) {
            return targetDict[phrase] ?? `[No dictionary entry]`;
          }
        }
      }

      return `No dictionary entry found for "${text}" (${sourceCode}→${targetCode}). Consider asking the LLM to translate this for you — it can handle full sentence translation.`;
    },
  });

  return [detectTool, langsTool, phraseTool];
};
