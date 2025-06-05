export type LanguageGroup =
  | "romance"
  | "germanic"
  | "slavic"
  | "eastAsian"
  | "southAsian"
  | "african"
  | "middleEastern"
  | "turkic"
  | "other"

type Language = {
  name: string
  code: string
}

type LanguageGroupInfo = {
  name: string
  languages: Language[]
}

export const LanguageGroups: Record<LanguageGroup, LanguageGroupInfo> = {
  romance: {
    name: "Romance",
    languages: [
      { name: "French", code: "fr" },
      { name: "Spanish", code: "es" },
      { name: "Italian", code: "it" },
      { name: "Portuguese", code: "pt" },
      { name: "Romanian", code: "ro" },
      { name: "Catalan", code: "ca" },
      { name: "Galician", code: "gl" },
    ],
  },
  germanic: {
    name: "Germanic",
    languages: [
      { name: "English", code: "en" },
      { name: "German", code: "de" },
      { name: "Dutch", code: "nl" },
      { name: "Swedish", code: "sv" },
      { name: "Norwegian", code: "no" },
      { name: "Danish", code: "da" },
      { name: "Icelandic", code: "is" },
      { name: "Afrikaans", code: "af" },
    ],
  },
  slavic: {
    name: "Slavic",
    languages: [
      { name: "Russian", code: "ru" },
      { name: "Polish", code: "pl" },
      { name: "Czech", code: "cs" },
      { name: "Ukrainian", code: "uk" },
      { name: "Bulgarian", code: "bg" },
      { name: "Serbian", code: "sr" },
      { name: "Croatian", code: "hr" },
      { name: "Slovak", code: "sk" },
      { name: "Slovenian", code: "sl" },
      { name: "Macedonian", code: "mk" },
      { name: "Belarusian", code: "be" },
    ],
  },
  eastAsian: {
    name: "East Asian",
    languages: [
      { name: "Chinese (Simplified)", code: "zh-CN" },
      { name: "Chinese (Traditional)", code: "zh-TW" },
      { name: "Japanese", code: "ja" },
      { name: "Korean", code: "ko" },
      { name: "Vietnamese", code: "vi" },
      { name: "Thai", code: "th" },
      { name: "Lao", code: "lo" },
      { name: "Khmer", code: "km" },
      { name: "Burmese", code: "my" },
      { name: "Filipino", code: "fil" },
      { name: "Indonesian", code: "id" },
      { name: "Malay", code: "ms" },
      { name: "Mongolian", code: "mn" },
    ],
  },
  southAsian: {
    name: "South Asian",
    languages: [
      { name: "Hindi", code: "hi" },
      { name: "Bengali", code: "bn" },
      { name: "Tamil", code: "ta" },
      { name: "Telugu", code: "te" },
      { name: "Marathi", code: "mr" },
      { name: "Urdu", code: "ur" },
      { name: "Gujarati", code: "gu" },
      { name: "Kannada", code: "kn" },
      { name: "Malayalam", code: "ml" },
      { name: "Nepali", code: "ne" },
      { name: "Sinhala", code: "si" },
      { name: "Punjabi", code: "pa" },
      { name: "Odia", code: "or" },
      { name: "Assamese", code: "as" },
    ],
  },
  african: {
    name: "African",
    languages: [
      { name: "Swahili", code: "sw" },
      { name: "Amharic", code: "am" },
      { name: "Yoruba", code: "yo" },
      { name: "Igbo", code: "ig" },
      { name: "Zulu", code: "zu" },
      { name: "Xhosa", code: "xh" },
      { name: "Afrikaans", code: "af" },
      { name: "Hausa", code: "ha" },
      { name: "Somali", code: "so" },
      { name: "Malagasy", code: "mg" },
      { name: "Kinyarwanda", code: "rw" },
    ],
  },
  middleEastern: {
    name: "Middle Eastern",
    languages: [
      { name: "Arabic", code: "ar" },
      { name: "Hebrew", code: "he" },
      { name: "Persian", code: "fa" },
      { name: "Kurdish", code: "ku" },
      { name: "Turkish", code: "tr" },
    ],
  },
  turkic: {
    name: "Turkic",
    languages: [
      { name: "Turkish", code: "tr" },
      { name: "Azerbaijani", code: "az" },
      { name: "Kazakh", code: "kk" },
      { name: "Uzbek", code: "uz" },
      { name: "Kyrgyz", code: "ky" },
      { name: "Turkmen", code: "tk" },
      { name: "Tatar", code: "tt" },
    ],
  },
  other: {
    name: "Other",
    languages: [
      { name: "Finnish", code: "fi" },
      { name: "Hungarian", code: "hu" },
      { name: "Greek", code: "el" },
      { name: "Estonian", code: "et" },
      { name: "Latvian", code: "lv" },
      { name: "Lithuanian", code: "lt" },
      { name: "Albanian", code: "sq" },
      { name: "Armenian", code: "hy" },
      { name: "Georgian", code: "ka" },
      { name: "Basque", code: "eu" },
      { name: "Catalan", code: "ca" },
      { name: "Irish", code: "ga" },
      { name: "Welsh", code: "cy" },
    ],
  },
}
