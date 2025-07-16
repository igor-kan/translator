// This is a mock implementation - in a real application, you would integrate with actual APIs

// Mock language detection
export async function detectLanguage(text: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would use a service like Google Cloud Translation API

  // For demo purposes, we'll try to make more accurate detections based on common phrases
  const lowerText = text.toLowerCase().trim()

  // Simple pattern matching for demo purposes
  if (lowerText.includes("hello") || lowerText.includes("how are you") || lowerText.includes("good morning")) {
    return [{ language: "English", code: "en", confidence: 0.95 }]
  } else if (lowerText.includes("hola") || lowerText.includes("cómo estás") || lowerText.includes("buenos días")) {
    return [{ language: "Spanish", code: "es", confidence: 0.95 }]
  } else if (lowerText.includes("bonjour") || lowerText.includes("comment allez-vous") || lowerText.includes("merci")) {
    return [{ language: "French", code: "fr", confidence: 0.95 }]
  } else if (lowerText.includes("guten tag") || lowerText.includes("wie geht es dir") || lowerText.includes("danke")) {
    return [{ language: "German", code: "de", confidence: 0.95 }]
  } else if (lowerText.includes("你好") || lowerText.includes("谢谢") || lowerText.includes("再见")) {
    return [{ language: "Chinese (Simplified)", code: "zh-CN", confidence: 0.95 }]
  } else if (lowerText.includes("こんにちは") || lowerText.includes("ありがとう") || lowerText.includes("さようなら")) {
    return [{ language: "Japanese", code: "ja", confidence: 0.95 }]
  } else if (lowerText.includes("привет") || lowerText.includes("спасибо") || lowerText.includes("до свидания")) {
    return [{ language: "Russian", code: "ru", confidence: 0.95 }]
  } else if (lowerText.includes("नमस्ते") || lowerText.includes("धन्यवाद") || lowerText.includes("अलविदा")) {
    return [{ language: "Hindi", code: "hi", confidence: 0.95 }]
  } else if (lowerText.includes("مرحبا") || lowerText.includes("شكرا") || lowerText.includes("مع السلامة")) {
    return [{ language: "Arabic", code: "ar", confidence: 0.95 }]
  } else if (
    lowerText.includes("안녕하세요") ||
    lowerText.includes("감사합니다") ||
    lowerText.includes("안녕히 가세요")
  ) {
    return [{ language: "Korean", code: "ko", confidence: 0.95 }]
  } else if (lowerText.includes("olá") || lowerText.includes("obrigado") || lowerText.includes("adeus")) {
    return [{ language: "Portuguese", code: "pt", confidence: 0.95 }]
  } else if (lowerText.includes("hallo") || lowerText.includes("dank je") || lowerText.includes("tot ziens")) {
    return [{ language: "Dutch", code: "nl", confidence: 0.95 }]
  } else if (lowerText.includes("hej") || lowerText.includes("tack") || lowerText.includes("adjö")) {
    return [{ language: "Swedish", code: "sv", confidence: 0.95 }]
  } else if (lowerText.includes("hei") || lowerText.includes("takk") || lowerText.includes("ha det")) {
    return [{ language: "Norwegian", code: "no", confidence: 0.95 }]
  } else if (lowerText.includes("שלום") || lowerText.includes("תודה") || lowerText.includes("להתראות")) {
    return [{ language: "Hebrew", code: "he", confidence: 0.95 }]
  }

  // If no clear match, return multiple possibilities with appropriate confidence levels
  // This simulates ambiguous text that could be in multiple languages
  if (text.length < 10) {
    return [
      { language: "English", code: "en", confidence: 0.65 },
      { language: "Spanish", code: "es", confidence: 0.55 },
      { language: "French", code: "fr", confidence: 0.45 },
    ]
  }

  // Default to English for longer text with no clear language markers
  return [{ language: "English", code: "en", confidence: 0.85 }]
}

// Mock text correction
export async function correctText(text: string, language: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 700))

  // In a real app, you would use a service like LanguageTool API

  // For demo, we'll make more meaningful corrections based on common errors
  let corrected = text
  const corrections = []

  if (language === "en") {
    // English corrections
    if (text.toLowerCase().includes("i am good") && !text.includes("I am good")) {
      corrected = text.replace(/i am good/i, "I am good")
      corrections.push({
        original: text,
        corrected,
        explanation: "Capitalized 'I' pronoun",
      })
    }

    if (text.toLowerCase().includes("dont") && !text.includes("don't")) {
      corrected = text.replace(/dont/i, "don't")
      corrections.push({
        original: text,
        corrected,
        explanation: "Added apostrophe to contraction",
      })
    }
  } else if (language === "es") {
    // Spanish corrections
    if (text.includes("como estas") && !text.includes("cómo estás")) {
      corrected = text.replace(/como estas/i, "cómo estás")
      corrections.push({
        original: text,
        corrected,
        explanation: "Added accent marks",
      })
    }
  } else if (language === "pt") {
    // Portuguese corrections
    if (text.includes("nao") && !text.includes("não")) {
      corrected = text.replace(/nao/i, "não")
      corrections.push({
        original: text,
        corrected,
        explanation: "Added tilde",
      })
    }
  } else if (language === "fr") {
    // French corrections
    if (text.includes("ca va") && !text.includes("ça va")) {
      corrected = text.replace(/ca va/i, "ça va")
      corrections.push({
        original: text,
        corrected,
        explanation: "Added cedilla",
      })
    }
  }

  // If no specific corrections, just ensure first letter is capitalized for most languages
  if (corrections.length === 0 && text.length > 0 && /^[a-z]/.test(text)) {
    corrected = text.charAt(0).toUpperCase() + text.slice(1)
    corrections.push({
      original: text,
      corrected,
      explanation: "Capitalized first letter",
    })
  }

  return {
    text: corrected,
    corrections,
  }
}

// Comprehensive dictionary of translations for common phrases
const translationDictionary = {
  // Hello
  hello: {
    en: "Hello",
    es: "Hola",
    fr: "Bonjour",
    de: "Hallo",
    it: "Ciao",
    pt: "Olá",
    ro: "Salut",
    nl: "Hallo",
    sv: "Hej",
    no: "Hei",
    da: "Hej",
    is: "Halló",
    fi: "Hei",
    ru: "Привет",
    ja: "こんにちは",
    "zh-CN": "你好",
    "zh-TW": "你好",
    ko: "안녕하세요",
    ar: "مرحبا",
    he: "שלום",
    hi: "नमस्ते",
    bn: "হ্যালো",
    ta: "வணக்கம்",
    te: "హలో",
    mr: "नमस्कार",
    gu: "નમસ્તે",
    kn: "ನಮಸ್ಕಾರ",
    ml: "ഹലോ",
    pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    vi: "Xin chào",
    th: "สวัสดี",
    id: "Halo",
    ms: "Helo",
    tr: "Merhaba",
    sw: "Habari",
    pl: "Cześć",
    uk: "Привіт",
    zu: "Sawubona",
  },

  // How are you?
  "how are you": {
    en: "How are you?",
    es: "¿Cómo estás?",
    fr: "Comment allez-vous?",
    de: "Wie geht es dir?",
    it: "Come stai?",
    pt: "Como está você?",
    ro: "Ce mai faci?",
    nl: "Hoe gaat het?",
    sv: "Hur mår du?",
    no: "Hvordan har du det?",
    da: "Hvordan har du det?",
    is: "Hvernig hefur þú það?",
    fi: "Mitä kuuluu?",
    ru: "Как дела?",
    ja: "お元気ですか？",
    "zh-CN": "你好吗？",
    "zh-TW": "你好嗎？",
    ko: "어떻게 지내세요?",
    ar: "كيف حالك؟",
    he: "מה שלומך?",
    hi: "आप कैसे हैं?",
    bn: "আপনি কেমন আছেন?",
    ta: "நீங்கள் எப்படி இருக்கிறீர்கள்?",
    te: "మీరు ఎలా ఉన్నారు?",
    mr: "तुम्ही कसे आहात?",
    gu: "તમે કેમ છો?",
    kn: "ನೀವು ಹೇಗಿದ್ದೀರಿ?",
    ml: "സുഖമാണോ?",
    pa: "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
    vi: "Bạn khỏe không?",
    th: "คุณเป็นอย่างไรบ้าง?",
    id: "Apa kabar?",
    ms: "Apa khabar?",
    tr: "Nasılsın?",
    sw: "Hali gani?",
    pl: "Jak się masz?",
    uk: "Як справи?",
    zu: "Unjani?",
  },

  // Thank you
  "thank you": {
    en: "Thank you",
    es: "Gracias",
    fr: "Merci",
    de: "Danke",
    it: "Grazie",
    pt: "Obrigado",
    ro: "Mulțumesc",
    nl: "Dank je",
    sv: "Tack",
    no: "Takk",
    da: "Tak",
    is: "Takk",
    fi: "Kiitos",
    ru: "Спасибо",
    ja: "ありがとう",
    "zh-CN": "谢谢",
    "zh-TW": "謝謝",
    ko: "감사합니다",
    ar: "شكرا لك",
    he: "תודה",
    hi: "धन्यवाद",
    bn: "ধন্যবাদ",
    ta: "நன்றி",
    te: "ధన్యవాదాలు",
    mr: "धन्यवाद",
    gu: "આભાર",
    kn: "ಧನ್ಯವಾದಗಳು",
    ml: "നന്ദി",
    pa: "ਧੰਨਵਾਦ",
    vi: "Cảm ơn",
    th: "ขอบคุณ",
    id: "Terima kasih",
    ms: "Terima kasih",
    tr: "Teşekkür ederim",
    sw: "Asante",
    pl: "Dziękuję",
    uk: "Дякую",
    zu: "Ngiyabonga",
  },

  // Goodbye
  goodbye: {
    en: "Goodbye",
    es: "Adiós",
    fr: "Au revoir",
    de: "Auf Wiedersehen",
    it: "Arrivederci",
    pt: "Adeus",
    ro: "La revedere",
    nl: "Tot ziens",
    sv: "Adjö",
    no: "Ha det",
    da: "Farvel",
    is: "Bless",
    fi: "Näkemiin",
    ru: "До свидания",
    ja: "さようなら",
    "zh-CN": "再见",
    "zh-TW": "再見",
    ko: "안녕히 가세요",
    ar: "مع السلامة",
    he: "להתראות",
    hi: "अलविदा",
    bn: "বিদায়",
    ta: "பிரியாவிடை",
    te: "వీడ్కోలు",
    mr: "निरोप",
    gu: "આવજો",
    kn: "ವಿದಾಯ",
    ml: "വിട",
    pa: "ਅਲਵਿਦਾ",
    vi: "Tạm biệt",
    th: "ลาก่อน",
    id: "Selamat tinggal",
    ms: "Selamat tinggal",
    tr: "Hoşça kal",
    sw: "Kwaheri",
    pl: "Do widzenia",
    uk: "До побачення",
    zu: "Hamba kahle",
  },

  // Good morning
  "good morning": {
    en: "Good morning",
    es: "Buenos días",
    fr: "Bonjour",
    de: "Guten Morgen",
    it: "Buongiorno",
    pt: "Bom dia",
    ro: "Bună dimineața",
    nl: "Goedemorgen",
    sv: "God morgon",
    no: "God morgen",
    da: "God morgen",
    is: "Góðan daginn",
    fi: "Hyvää huomenta",
    ru: "Доброе утро",
    ja: "おはようございます",
    "zh-CN": "早上好",
    "zh-TW": "早安",
    ko: "좋은 아침",
    ar: "صباح الخير",
    he: "בוקר טוב",
    hi: "सुप्रभात",
    bn: "সুপ্রভাত",
    ta: "காலை வணக்கம்",
    te: "శుభోదయం",
    mr: "सुप्रभात",
    gu: "સુપ્રભાત",
    kn: "ಶುಭೋದಯ",
    ml: "സുപ്രഭാതം",
    pa: "ਸ਼ੁਭ ਸਵੇਰ",
    vi: "Chào buổi sáng",
    th: "สวัสดีตอนเช้า",
    id: "Selamat pagi",
    ms: "Selamat pagi",
    tr: "Günaydın",
    sw: "Habari za asubuhi",
    pl: "Dzień dobry",
    uk: "Доброго ранку",
    zu: "Sawubona ekuseni",
  },

  // Good afternoon
  "good afternoon": {
    en: "Good afternoon",
    es: "Buenas tardes",
    fr: "Bon après-midi",
    de: "Guten Tag",
    it: "Buon pomeriggio",
    pt: "Boa tarde",
    ro: "Bună ziua",
    nl: "Goedemiddag",
    sv: "God eftermiddag",
    no: "God ettermiddag",
    da: "God eftermiddag",
    is: "Góðan dag",
    fi: "Hyvää iltapäivää",
    ru: "Добрый день",
    ja: "こんにちは",
    "zh-CN": "下午好",
    "zh-TW": "午安",
    ko: "좋은 오후",
    ar: "مساء الخير",
    he: "צהריים טובים",
    hi: "सुपारंभ",
    bn: "শুভ অপরাহ্ন",
    ta: "மதிய வணக்கம்",
    te: "శుభ మధ్యాహ్నం",
    mr: "शुभ दुपार",
    gu: "શુભ બપોર",
    kn: "ಶುಭ ಮಧ್ಯಾಹ್ನ",
    ml: "ശുഭ ഉച്ച",
    pa: "ਸ਼ੁਭ ਦੁਪਹਿਰ",
    vi: "Chào buổi chiều",
    th: "สวัสดีตอนบ่าย",
    id: "Selamat sore",
    ms: "Selamat sore",
    tr: "İyi günler",
    sw: "Habari za mchana",
    pl: "Dzień dobry",
    uk: "Добрий день",
    zu: "Sawubona emini",
  },

  // Good evening
  "good evening": {
    en: "Good evening",
    es: "Buenas noches",
    fr: "Bonsoir",
    de: "Guten Abend",
    it: "Buonasera",
    pt: "Boa noite",
    ro: "Bună seara",
    nl: "Goedenavond",
    sv: "God kväll",
    no: "God kveld",
    da: "God aften",
    is: "Gott kvöld",
    fi: "Hyvää iltaa",
    ru: "Добрый вечер",
    ja: "こんばんは",
    "zh-CN": "晚上好",
    "zh-TW": "晚安",
    ko: "안녕하세요",
    ar: "مساء الخير",
    he: "ערב טוב",
    hi: "शुभ संध्या",
    bn: "শুভ সন্ধ্যা",
    ta: "மாலை வணக்கம்",
    te: "శుభ సాయంత్రం",
    mr: "शुभ संध्याकाळ",
    gu: "શુભ સાંજ",
    kn: "ಶುಭ ಸಂಜೆ",
    ml: "ശുഭ സന്ധ്യ",
    pa: "ਸ਼ੁਭ ਸ਼ਾਮ",
    vi: "Chào buổi tối",
    th: "สวัสดีตอนเย็น",
    id: "Selamat malam",
    ms: "Selamat petang",
    tr: "İyi akşamlar",
    sw: "Habari za jioni",
    pl: "Dobry wieczór",
    uk: "Добрий вечір",
    zu: "Sawubona kusihlwa",
  },

  // I love you
  "i love you": {
    en: "I love you",
    es: "Te quiero",
    fr: "Je t'aime",
    de: "Ich liebe dich",
    it: "Ti amo",
    pt: "Eu te amo",
    ro: "Te iubesc",
    nl: "Ik hou van je",
    sv: "Jag älskar dig",
    no: "Jeg elsker deg",
    da: "Jeg elsker dig",
    is: "Ég elska þig",
    fi: "Rakastan sinua",
    ru: "Я тебя люблю",
    ja: "愛してる",
    "zh-CN": "我爱你",
    "zh-TW": "我愛你",
    ko: "사랑해요",
    ar: "أحبك",
    he: "אני אוהב אותך",
    hi: "मैं तुमसे प्यार करता हूँ",
    bn: "আমি তোমাকে ভালোবাসি",
    ta: "நான் உன்னை காதலிக்கிறேன்",
    te: "నేను నిన్ను ప్రేమిస్తున్నాను",
    mr: "मी तुझ्यावर प्रेम करतो",
    gu: "હું તને પ્રેમ કરું છું",
    kn: "ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ",
    ml: "ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു",
    pa: "ਮੈਂ ਤੁਹਾਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ",
    vi: "Tôi yêu bạn",
    th: "ฉันรักคุณ",
    id: "Aku cinta kamu",
    ms: "Saya cinta kamu",
    tr: "Seni seviyorum",
    sw: "Nakupenda",
    pl: "Kocham cię",
    uk: "Я тебе кохаю",
    zu: "Ngiyakuthanda",
  },

  // My name is
  "my name is": {
    en: "My name is",
    es: "Me llamo",
    fr: "Je m'appelle",
    de: "Ich heiße",
    it: "Mi chiamo",
    pt: "Meu nome é",
    ro: "Numele meu este",
    nl: "Mijn naam is",
    sv: "Jag heter",
    no: "Jeg heter",
    da: "Jeg hedder",
    is: "Ég heiti",
    fi: "Nimeni on",
    ru: "Меня зовут",
    ja: "私の名前は",
    "zh-CN": "我的名字是",
    "zh-TW": "我的名字是",
    ko: "제 이름은",
    ar: "اسمي هو",
    he: "שמי הוא",
    hi: "मेरा नाम है",
    bn: "আমার নাম",
    ta: "என் பெயர்",
    te: "నా పేరు",
    mr: "माझे नाव आहे",
    gu: "મારું નામ છે",
    kn: "ನನ್ನ ಹೆಸರು",
    ml: "എന്റെ പേര്",
    pa: "ਮੇਰਾ ਨਾਮ ਹੈ",
    vi: "Tên tôi là",
    th: "ฉันชื่อ",
    id: "Nama saya",
    ms: "Nama saya",
    tr: "Benim adım",
    sw: "Jina langu ni",
    pl: "Nazywam się",
    uk: "Мене звати",
    zu: "Igama lami ngu",
  },

  // Where is the bathroom?
  "where is the bathroom": {
    en: "Where is the bathroom?",
    es: "¿Dónde está el baño?",
    fr: "Où sont les toilettes?",
    de: "Wo ist die Toilette?",
    it: "Dov'è il bagno?",
    pt: "Onde fica o banheiro?",
    ro: "Unde este baia?",
    nl: "Waar is het toilet?",
    sv: "Var är toaletten?",
    no: "Hvor er toalettet?",
    da: "Hvor er toilettet?",
    is: "Hvar er klósettið?",
    fi: "Missä on vessa?",
    ru: "Где туалет?",
    ja: "お手洗いはどこですか？",
    "zh-CN": "洗手间在哪里？",
    "zh-TW": "洗手間在哪裡？",
    ko: "화장실이 어디에 있나요?",
    ar: "أين الحمام؟",
    he: "איפה השירותים?",
    hi: "बाथरूम कहां है?",
    bn: "বাথরুম কোথায়?",
    ta: "கழிவறை எங்கே?",
    te: "బాత్రూమ్ ఎక్కడ ఉంది?",
    mr: "बाथरूम कुठे आहे?",
    gu: "બાથરૂમ ક્યાં છે?",
    kn: "ಬಾತ್ರೂಮ್ ಎಲ್ಲಿದೆ?",
    ml: "ബാത്ത്റൂം എവിടെയാണ്?",
    pa: "ਬਾਥਰੂਮ ਕਿੱਥੇ ਹੈ?",
    vi: "Nhà vệ sinh ở đâu?",
    th: "ห้องน้ำอยู่ที่ไหน?",
    id: "Di mana kamar mandinya?",
    ms: "Di mana tandas?",
    tr: "Tuvalet nerede?",
    sw: "Choo kiko wapi?",
    pl: "Gdzie jest łazienka?",
    uk: "Де туалет?",
    zu: "Kuphi indlu yangasese?",
  },

  // I don't understand
  "i don't understand": {
    en: "I don't understand",
    es: "No entiendo",
    fr: "Je ne comprends pas",
    de: "Ich verstehe nicht",
    it: "Non capisco",
    pt: "Eu não entendo",
    ro: "Nu înțeleg",
    nl: "Ik begrijp het niet",
    sv: "Jag förstår inte",
    no: "Jeg forstår ikke",
    da: "Jeg forstår ikke",
    is: "Ég skil ekki",
    fi: "En ymmärrä",
    ru: "Я не понимаю",
    ja: "わかりません",
    "zh-CN": "我不明白",
    "zh-TW": "我不明白",
    ko: "이해가 안 돼요",
    ar: "أنا لا أفهم",
    he: "אני לא מבין",
    hi: "मैं समझ नहीं पा रहा हूँ",
    bn: "আমি বুঝতে পারছি না",
    ta: "எனக்கு புரியவில்லை",
    te: "నాకు అర్థం కాలేదు",
    mr: "मला समजत नाही",
    gu: "મને સમજાતું નથી",
    kn: "ನನಗೆ ಅರ್ಥವಾಗುತ್ತಿಲ್ಲ",
    ml: "എനിക്ക് മനസ്സിലാകുന്നില്ല",
    pa: "ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਉਂਦੀ",
    vi: "Tôi không hiểu",
    th: "ฉันไม่เข้าใจ",
    id: "Saya tidak mengerti",
    ms: "Saya tidak faham",
    tr: "Anlamıyorum",
    sw: "Sielewi",
    pl: "Nie rozumiem",
    uk: "Я не розумію",
    zu: "Angiqondi",
  },

  // Please
  please: {
    en: "Please",
    es: "Por favor",
    fr: "S'il vous plaît",
    de: "Bitte",
    it: "Per favore",
    pt: "Por favor",
    ro: "Te rog",
    nl: "Alstublieft",
    sv: "Snälla",
    no: "Vær så snill",
    da: "Venligst",
    is: "Vinsamlegast",
    fi: "Ole hyvä",
    ru: "Пожалуйста",
    ja: "お願いします",
    "zh-CN": "请",
    "zh-TW": "請",
    ko: "제발",
    ar: "من فضلك",
    he: "בבקשה",
    hi: "कृपया",
    bn: "দয়া করে",
    ta: "தயவுசெய்து",
    te: "దయచేసి",
    mr: "कृपया",
    gu: "કૃપા કરીને",
    kn: "ದಯವಿಟ್ಟು",
    ml: "ദയവായി",
    pa: "ਕਿਰਪਾ ਕਰਕੇ",
    vi: "Làm ơn",
    th: "กรุณา",
    id: "Tolong",
    ms: "Sila",
    tr: "Lütfen",
    sw: "Tafadhali",
    pl: "Proszę",
    uk: "Будь ласка",
    zu: "Ngicela",
  },

  // Yes
  yes: {
    en: "Yes",
    es: "Sí",
    fr: "Oui",
    de: "Ja",
    it: "Sì",
    pt: "Sim",
    ro: "Da",
    nl: "Ja",
    sv: "Ja",
    no: "Ja",
    da: "Ja",
    is: "Já",
    fi: "Kyllä",
    ru: "Да",
    ja: "はい",
    "zh-CN": "是",
    "zh-TW": "是",
    ko: "네",
    ar: "نعم",
    he: "כן",
    hi: "हां",
    bn: "হ্যাঁ",
    ta: "ஆம்",
    te: "అవును",
    mr: "होय",
    gu: "હા",
    kn: "ಹೌದು",
    ml: "അതെ",
    pa: "ਹਾਂ",
    vi: "Vâng",
    th: "ใช่",
    id: "Ya",
    ms: "Ya",
    tr: "Evet",
    sw: "Ndiyo",
    pl: "Tak",
    uk: "Так",
    zu: "Yebo",
  },

  // No
  no: {
    en: "No",
    es: "No",
    fr: "Non",
    de: "Nein",
    it: "No",
    pt: "Não",
    ro: "Nu",
    nl: "Nee",
    sv: "Nej",
    no: "Nej",
    da: "Nej",
    is: "Nei",
    fi: "Ei",
    ru: "Нет",
    ja: "いいえ",
    "zh-CN": "不",
    "zh-TW": "不",
    ko: "아니요",
    ar: "لا",
    he: "לא",
    hi: "नहीं",
    bn: "না",
    ta: "இல்லை",
    te: "లేదు",
    mr: "नाही",
    gu: "ના",
    kn: "ಇಲ್ಲ",
    ml: "ഇല്ല",
    pa: "ਨਹੀਂ",
    vi: "Không",
    th: "ไม่",
    id: "Tidak",
    ms: "Tidak",
    tr: "Hayır",
    sw: "Hapana",
    pl: "Nie",
    uk: "Ні",
    zu: "Cha",
  },
}

// Literal word-for-word translations (back-translations)
const literalTranslations = {
  // Hello
  hello: {
    en: "Hello",
    es: "Hello (Hola)",
    fr: "Hello (Bonjour)",
    de: "Hello (Hallo)",
    it: "Hello (Ciao)",
    pt: "Hello (Olá)",
    ro: "Hello (Salut)",
    nl: "Hello (Hallo)",
    sv: "Hello (Hej)",
    no: "Hello (Hei)",
    da: "Hello (Hej)",
    is: "Hello (Halló)",
    fi: "Hello (Hei)",
    ru: "Hello (Привет)",
    ja: "Hello (こんにちは)",
    "zh-CN": "Hello (你好)",
    "zh-TW": "Hello (你好)",
    ko: "Hello (안녕하세요)",
    ar: "Hello (مرحبا)",
    he: "Hello (שלום)",
    hi: "Hello (नमस्ते)",
    bn: "Hello (হ্যালো)",
    ta: "Hello (வணக்கம்)",
    te: "Hello (హలో)",
    mr: "Hello (नमस्कार)",
    gu: "Hello (નમસ્તે)",
    kn: "Hello (ನಮಸ್ಕಾರ)",
    ml: "Hello (ഹലോ)",
    pa: "Hello (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
    vi: "Hello (Xin chào)",
    th: "Hello (สวัสดี)",
    id: "Hello (Halo)",
    ms: "Hello (Helo)",
    tr: "Hello (Merhaba)",
    sw: "Hello (Habari)",
    pl: "Hello (Cześć)",
    uk: "Hello (Привіт)",
    zu: "Hello (Sawubona)",
  },

  // How are you?
  "how are you": {
    en: "How are you?",
    es: "How are you? (¿Cómo estás?)",
    fr: "How are you? (Comment allez-vous?)",
    de: "How are you? (Wie geht es dir?)",
    it: "How are you? (Come stai?)",
    pt: "How are you? (Como está você?)",
    ro: "How are you? (Ce mai faci?)",
    nl: "How are you? (Hoe gaat het?)",
    sv: "How are you? (Hur mår du?)",
    no: "How are you? (Hvordan har du det?)",
    da: "How are you? (Hvordan har du det?)",
    is: "How are you? (Hvernig hefur þú það?)",
    fi: "How are you? (Mitä kuuluu?)",
    ru: "How are you? (Как дела?)",
    ja: "How are you? (お元気ですか？)",
    "zh-CN": "How are you? (你好吗？)",
    "zh-TW": "How are you? (你好嗎？)",
    ko: "How are you? (어떻게 지내세요?)",
    ar: "How are you? (كيف حالك؟)",
    he: "How are you? (מה שלומך?)",
    hi: "How are you? (आप कैसे हैं?)",
    bn: "How are you? (আপনি কেমন আছেন?)",
    ta: "How are you? (நீங்கள் எப்படி இருக்கிறீர்கள்?)",
    te: "How are you? (మీరు ఎలా ఉన్నారు?)",
    mr: "How are you? (तुम्ही कसे आहात?)",
    gu: "How are you? (તમે કેમ છો?)",
    kn: "How are you? (ನೀವು ಹೇಗಿದ್ದೀರಿ?)",
    ml: "How are you? (സുഖമാണോ?)",
    pa: "How are you? (ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?)",
    vi: "How are you? (Bạn khỏe không?)",
    th: "How are you? (คุณเป็นอย่างไรบ้าง?)",
    id: "How are you? (Apa kabar?)",
    ms: "How are you? (Apa khabar?)",
    tr: "How are you? (Nasılsın?)",
    sw: "How are you? (Hali gani?)",
    pl: "How are you? (Jak się masz?)",
    uk: "How are you? (Як справи?)",
    zu: "How are you? (Unjani?)",
  },

  // Thank you
  "thank you": {
    en: "Thank you",
    es: "Thank you (Gracias)",
    fr: "Thank you (Merci)",
    de: "Thank you (Danke)",
    it: "Thank you (Grazie)",
    pt: "Thank you (Obrigado)",
    ro: "Thank you (Mulțumesc)",
    nl: "Thank you (Dank je)",
    sv: "Thank you (Tack)",
    no: "Thank you (Takk)",
    da: "Thank you (Tak)",
    is: "Thank you (Takk)",
    fi: "Thank you (Kiitos)",
    ru: "Thank you (Спасибо)",
    ja: "Thank you (ありがとう)",
    "zh-CN": "Thank you (谢谢)",
    "zh-TW": "Thank you (謝謝)",
    ko: "Thank you (감사합니다)",
    ar: "Thank you (شكرا لك)",
    he: "Thank you (תודה)",
    hi: "Thank you (धन्यवाद)",
    bn: "Thank you (ধন্যবাদ)",
    ta: "Thank you (நன்றி)",
    te: "Thank you (ధన్యవాదాలు)",
    mr: "Thank you (धन्यवाद)",
    gu: "Thank you (આભાર)",
    kn: "Thank you (ಧನ್ಯವಾದಗಳು)",
    ml: "Thank you (നന്ദി)",
    pa: "Thank you (ਧੰਨਵਾਦ)",
    vi: "Thank you (Cảm ơn)",
    th: "Thank you (ขอบคุณ)",
    id: "Thank you (Terima kasih)",
    ms: "Thank you (Terima kasih)",
    tr: "Thank you (Teşekkür ederim)",
    sw: "Thank you (Asante)",
    pl: "Thank you (Dziękuję)",
    uk: "Thank you (Дякую)",
    zu: "Thank you (Ngiyabonga)",
  },
}

// Accurate phonetic transcriptions
const phoneticTranscriptions = {
  en: {
    Hello: "/həˈloʊ/",
    "How are you?": "/haʊ ɑr juː/",
    "Thank you": "/θæŋk juː/",
    Goodbye: "/ˌɡʊdˈbaɪ/",
    "Good morning": "/ɡʊd ˈmɔrnɪŋ/",
    "I love you": "/aɪ lʌv juː/",
    "My name is": "/maɪ neɪm ɪz/",
    "Where is the bathroom?": "/wɛr ɪz ðə ˈbæθruːm/",
    "I don't understand": "/aɪ doʊnt ˌʌndərˈstænd/",
    Please: "/pliːz/",
    Yes: "/jɛs/",
    No: "/noʊ/",
    "Excuse me": "/ɪkˈskjuːz miː/",
    "How much does this cost?": "/haʊ mʌtʃ dʌz ðɪs kɔst/",
    "I'm sorry": "/aɪm ˈsɔri/",
    "What time is it?": "/wʌt taɪm ɪz ɪt/",
  },
  es: {
    Hola: "/ˈo.la/",
    "¿Cómo estás?": "/ˈko.mo esˈtas/",
    Gracias: "/ˈɡɾa.θjas/",
    Adiós: "/aˈðjos/",
    "Buenos días": "/ˈbwe.nos ˈdi.as/",
    "Te quiero": "/te ˈkje.ɾo/",
    "Me llamo": "/me ˈʝa.mo/",
    "¿Dónde está el baño?": "/ˈdon.de esˈta el ˈba.ɲo/",
    "No entiendo": "/no enˈtjen.do/",
    "Por favor": "/poɾ faˈβoɾ/",
    Sí: "/si/",
    No: "/no/",
    Disculpe: "/disˈkul.pe/",
    "¿Cuánto cuesta esto?": "/ˈkwan.to ˈkwes.ta ˈes.to/",
    "Lo siento": "/lo ˈsjen.to/",
    "¿Qué hora es?": "/ke ˈo.ɾa es/",
  },
  fr: {
    Bonjour: "/bɔ̃.ʒuʁ/",
    "Comment allez-vous?": "/kɔ.mɑ̃ t‿a.le vu/",
    Merci: "/mɛʁ.si/",
    "Au revoir": "/o ʁə.vwaʁ/",
    Bonjour: "/bɔ̃.ʒuʁ/",
    "Je t'aime": "/ʒə tɛm/",
    "Je m'appelle": "/ʒə ma.pɛl/",
    "Où sont les toilettes?": "/u sɔ̃ le twa.lɛt/",
    "Je ne comprends pas": "/ʒə nə kɔ̃.pʁɑ̃ pa/",
    "S'il vous plaît": "/sil vu plɛ/",
    Oui: "/wi/",
    Non: "/nɔ̃/",
    "Excusez-moi": "/ɛk.sky.ze mwa/",
    "Combien ça coûte?": "/kɔ̃.bjɛ̃ sa kut/",
    "Je suis désolé": "/ʒə sɥi de.zɔ.le/",
    "Quelle heure est-il?": "/kɛl œʁ ɛ.t‿il/",
  },
  de: {
    Hallo: "/ˈhalo/",
    "Wie geht es dir?": "/viː geːt ɛs diːɐ̯/",
    Danke: "/ˈdaŋkə/",
    "Auf Wiedersehen": "/aʊ̯f ˈviːdɐˌzeːən/",
    "Guten Morgen": "/ˈɡuːtn̩ ˈmɔʁɡn̩/",
    "Ich liebe dich": "/ɪç ˈliːbə dɪç/",
    "Ich heiße": "/ɪç ˈhaɪ̯sə/",
    "Wo ist die Toilette?": "/voː ɪst diː toaˈlɛtə/",
    "Ich verstehe nicht": "/ɪç fɛɐ̯ˈʃteːə nɪçt/",
    Bitte: "/ˈbɪtə/",
    Ja: "/jaː/",
    Nein: "/naɪ̯n/",
    Entschuldigung: "/ɛntˈʃʊldɪɡʊŋ/",
    "Wie viel kostet das?": "/viː fiːl ˈkɔstət das/",
    "Es tut mir leid": "/ɛs tuːt miːɐ̯ laɪ̯t/",
    "Wie spät ist es?": "/viː ʃpɛːt ɪst ɛs/",
  },
  pt: {
    Olá: "/oˈla/",
    "Como está você?": "/ˈkomu ɪsˈta voˈse/",
    Obrigado: "/obɾiˈɡadu/",
    Adeus: "/aˈdews/",
    "Bom dia": "/bõ ˈdʒia/",
    "Eu te amo": "/ew tʃi ˈɐmu/",
    "Meu nome é": "/mew ˈnomi ɛ/",
    "Onde fica o banheiro?": "/ˈõdʒi ˈfika u bɐˈɲejɾu/",
    "Eu não entendo": "/ew nɐ̃w̃ ẽˈtẽdu/",
    "Por favor": "/puɾ faˈvoɾ/",
    Sim: "/sĩ/",
    Não: "/nɐ̃w̃/",
    "Com licença": "/kõ liˈsẽsɐ/",
    "Quanto custa isso?": "/ˈkwɐ̃tu ˈkustɐ ˈisu/",
    "Sinto muito": "/ˈsĩtu ˈmujtu/",
    "Que horas são?": "/ki ˈɔɾɐs sɐ̃w̃/",
  },
  nl: {
    Hallo: "/ˈhɑloː/",
    "Hoe gaat het?": "/ˈhu ˈɣaːt ɦɛt/",
    "Dank je": "/ˈdɑŋk jə/",
    "Tot ziens": "/tɔt ˈzins/",
    Goedemorgen: "/ˈɣudəˌmɔrɣən/",
    "Ik hou van je": "/ɪk ɦɑu vɑn jə/",
    "Mijn naam is": "/mɛin naːm ɪs/",
    "Waar is het toilet?": "/ʋaːr ɪs ɦɛt toiˈlɛt/",
    "Ik begrijp het niet": "/ɪk bəˈɣrɛip ɦɛt nit/",
    Alstublieft: "/ˌɑlstyˈblift/",
    Ja: "/jaː/",
    Nee: "/neː/",
    "Pardon": "/pɑrˈdɔn/",
    "Hoeveel kost dit?": "/ˈhuvil kɔst dɪt/",
    "Het spijt me": "/ɦɛt spɛit mə/",
    "Hoe laat is het?": "/ˈhu ˈlaːt ɪs ɦɛt/",
  },
  sv: {
    Hej: "/hej/",
    "Hur mår du?": "/hʉːr moːr dʉː/",
    Tack: "/tak/",
    Adjö: "/aˈjøː/",
    "God morgon": "/guːd ˈmɔrɡɔn/",
    "Jag älskar dig": "/jɑːɡ ˈɛlskar dej/",
    "Jag heter": "/jɑːɡ ˈheːtɛr/",
    "Var är toaletten?": "/vɑːr æːr tʊaˈlɛtːən/",
    "Jag förstår inte": "/jɑːɡ fœˈʂtoːr ˈɪntə/",
    Snälla: "/ˈsnɛlːa/",
    Ja: "/jaː/",
    Nej: "/nɛj/",
    Ursäkta: "/ʉˈʂɛkta/",
    "Hur mycket kostar det?": "/hʉːr ˈmʏkːət ˈkɔstar deːt/",
    "Förlåt": "/fœˈroːt/",
    "Vad är klockan?": "/vɑːd æːr ˈklɔkːan/",
  },
  ja: {
    こんにちは: "/konnichiwa/",
    "お元気ですか？": "/o-genki desu ka/",
    ありがとう: "/arigatō/",
    さようなら: "/sayōnara/",
    おはようございます: "/ohayō gozaimasu/",
    愛してる: "/aishiteru/",
    私の名前は: "/watashi no namae wa/",
    "お手洗いはどこですか？": "/o-tearai wa doko desu ka/",
    わかりません: "/wakarimasen/",
    お願いします: "/onegaishimasu/",
    はい: "/hai/",
    いいえ: "/iie/",
    すみません: "/sumimasen/",
    "これはいくらですか？": "/kore wa ikura desu ka/",
    ごめんなさい: "/gomen nasai/",
    "今何時ですか？": "/ima nanji desu ka/",
  },
  "zh-CN": {
    你好: "/nǐ hǎo/",
    "你好吗？": "/nǐ hǎo ma/",
    谢谢: "/xiè xiè/",
    再见: "/zài jiàn/",
    早上好: "/zǎo shàng hǎo/",
    我爱你: "/wǒ ài nǐ/",
    我的名字是: "/wǒ de míng zì shì/",
    "洗手间在哪里？": "/xǐ shǒu jiān zài nǎ lǐ/",
    我不明白: "/wǒ bù míng bái/",
    请: "/qǐng/",
    是: "/shì/",
    不: "/bù/",
    对不起: "/duì bù qǐ/",
    "这个多少钱？": "/zhè ge duō shǎo qián/",
    对不起: "/duì bù qǐ/",
    "现在几点了？": "/xiàn zài jǐ diǎn le/",
  },
  ko: {
    "안녕하세요": "/annyeonghaseyo/",
    "어떻게 지내세요?": "/eotteoke jinaeseyo/",
    "감사합니다": "/gamsahamnida/",
    "안녕히 가세요": "/annyeonghi gaseyo/",
    "좋은 아침": "/joeun achim/",
    "사랑해요": "/saranghaeyo/",
    "제 이름은": "/je ireumeun/",
    "화장실이 어디에 있나요?": "/hwajangsiri eodie innayo/",
    "이해가 안 돼요": "/ihaega an dwaeyo/",
    "제발": "/jebal/",
    "네": "/ne/",
    "아니요": "/aniyo/",
    "실례합니다": "/sillyehamnida/",
    "이것은 얼마인가요?": "/igeos-eun eolmaingayo/",
    "죄송합니다": "/joesonghamnida/",
    "지금 몇 시인가요?": "/jigeum myeot siingayo/",
  },
  he: {
    "שלום": "/shalom/",
    "מה שלומך?": "/ma shlomkha/",
    "תודה": "/toda/",
    "להתראות": "/lehitraot/",
    "בוקר טוב": "/boker tov/",
    "אני אוהב אותך": "/ani ohev otkha/",
    "שמי הוא": "/shmi hu/",
    "איפה השירותים?": "/eifo ha-sherutim/",
    "אני לא מבין": "/ani lo mevin/",
    "בבקשה": "/bevakasha/",
    "כן": "/ken/",
    "לא": "/lo/",
    "סליחה": "/slikha/",
    "כמה זה עולה?": "/kama ze ole/",
    "אני מצטער": "/ani mitzta'er/",
    "מה השעה?": "/ma ha-sha'a/",
  },
}

// Mock translation
export async function translateText(text: string, targetLanguage: string, alternative = false) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Check if the text matches any common phrase
  const lowerText = text.toLowerCase().trim()

  // Try to find an exact match in our dictionary
  for (const [phrase, translations] of Object.entries(translationDictionary)) {
    if (lowerText === phrase || lowerText.includes(phrase)) {
      if (translations[targetLanguage]) {
        return {
          text: translations[targetLanguage],
          language: targetLanguage,
        }
      }
    }
  }

  // For longer or more complex text, use our predefined translations
  // In a real app, you would use a service like Google Translate API or DeepL
  const translations: Record<string, string> = {
    en: "Hello, how are you today?",
    es: "¡Hola! ¿Cómo estás hoy?",
    fr: "Bonjour, comment allez-vous aujourd'hui?",
    de: "Hallo, wie geht es Ihnen heute?",
    it: "Ciao, come stai oggi?",
    pt: "Olá, como está você hoje?",
    ro: "Salut, ce mai faci astăzi?",
    nl: "Hallo, hoe gaat het vandaag met je?",
    sv: "Hej, hur mår du idag?",
    no: "Hei, hvordan har du det i dag?",
    da: "Hej, hvordan har du det i dag?",
    is: "Halló, hvernig hefur þú það í dag?",
    fi: "Hei, miten voit tänään?",
    ru: "Привет, как ты сегодня?",
    ja: "こんにちは、今日の調子はどうですか？",
    "zh-CN": "你好，今天怎么样？",
    "zh-TW": "你好，今天怎麼樣？",
    ko: "안녕하세요, 오늘 어떻게 지내세요?",
    ar: "مرحبا، كيف حالك اليوم؟",
    he: "שלום, מה שלומך היום?",
    hi: "नमस्ते, आज आप कैसे हैं?",
    bn: "হ্যালো, আজ আপনি কেমন আছেন?",
    ta: "வணக்கம், இன்று எப்படி இருக்கிறீர்கள்?",
    te: "హలో, మీరు ఈరోజు ఎలా ఉన్నారు?",
    mr: "नमस्कार, आज आपण कसे आहात?",
    gu: "નમસ્તે, આજે તમે કેવા છો?",
    kn: "ನಮಸ್ಕಾರ, ನೀವು ಇಂದು ಹೇಗಿದ್ದೀರಿ?",
    ml: "ഹലോ, ഇന്ന് നിങ്ങൾക്ക് എങ്ങനെയുണ്ട്?",
    pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਅੱਜ ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
    vi: "Xin chào, hôm nay bạn khỏe không?",
    th: "สวัสดี คุณเป็นอย่างไรบ้างวันนี้?",
    id: "Halo, apa kabar hari ini?",
    ms: "Helo, apa khabar hari ini?",
    tr: "Merhaba, bugün nasılsın?",
    sw: "Habari, hali gani leo?",
    pl: "Cześć, jak się masz dzisiaj?",
    uk: "Привіт, як ти сьогодні?",
    zu: "Sawubona, unjani namhlanje?",
  }

  // Alternative translations with slight variations
  const alternativeTranslations: Record<string, string[]> = {
    en: ["Hi there, how's your day going?", "Hey, how are you feeling today?"],
    es: ["Hola, ¿qué tal estás hoy?", "Hola, ¿cómo te va hoy?"],
    fr: ["Salut, comment ça va aujourd'hui?", "Bonjour, vous allez bien aujourd'hui?"],
    de: ["Hi, wie geht's dir heute?", "Guten Tag, wie fühlen Sie sich heute?"],
    pt: ["Oi, como vai você hoje?", "Olá, tudo bem contigo hoje?"],
    ro: ["Bună, cum te simți azi?", "Salut, ce faci astăzi?"],
    nl: ["Hey, hoe is je dag?", "Hallo, voel je je goed vandaag?"],
    sv: ["Hallå, hur går det idag?", "Hej, känner du dig bra idag?"],
    no: ["Hallo, hvordan går dagen?", "Hei, føler du deg bra i dag?"],
    da: ["Hallo, hvordan går det i dag?", "Hej, har du det godt i dag?"],
    is: ["Sæll, hvernig gengur dagurinn?", "Halló, líður þér vel í dag?"],
    fi: ["Moi, miten päiväsi sujuu?", "Hei, tunnetko olosi hyväksi tänään?"],
    ru: ["Здравствуйте, как вы сегодня?", "Привет, как дела сегодня?"],
    "zh-CN": ["嗨，你今天好吗？", "你好，今天感觉如何？"],
    "zh-TW": ["嗨，你今天好嗎？", "你好，今天感覺如何？"],
    ko: ["안녕, 오늘 어때요?", "안녕하세요, 오늘 기분이 어떠세요?"],
    ar: ["أهلاً، كيف حالك اليوم؟", "مرحباً، كيف تشعر اليوم؟"],
    he: ["היי, איך היום שלך?", "שלום, איך אתה מרגיש היום?"],
    hi: ["हैलो, आज आप कैसा महसूस कर रहे हैं?", "नमस्कार, आज का दिन कैसा है?"],
    bn: ["হাই, আজ আপনার দিন কেমন যাচ্ছে?", "হ্যালো, আজ আপনি কেমন বোধ করছেন?"],
    ta: ["ஹாய், உங்கள் நாள் எப்படி செல்கிறது?", "வணக்கம், இன்று நீங்கள் எப்படி உணருகிறீர்கள்?"],
    te: ["హాయ్, మీ రోజు ఎలా సాగుతోంది?", "హలో, మీరు ఈరోజు ఎలా అనిపిస్తున్నారు?"],
    vi: ["Chào, ngày của bạn thế nào?", "Xin chào, hôm nay bạn cảm thấy thế nào?"],
    th: ["หวัดดี วันนี้เป็นอย่างไรบ้าง?", "สวัสดี วันนี้คุณรู้สึกอย่างไร?"],
    id: ["Hai, bagaimana harimu?", "Halo, bagaimana perasaanmu hari ini?"],
    ms: ["Hai, bagaimana hari anda?", "Helo, bagaimana perasaan anda hari ini?"],
    tr: ["Selam, günün nasıl geçiyor?", "Merhaba, bugün kendini nasıl hissediyorsun?"],
    sw: ["Jambo, unaendeleaje leo?", "Habari yako, leo unajisikiaje?"],
    pl: ["Hej, jak ci mija dzień?", "Cześć, jak się dziś czujesz?"],
    uk: ["Привіт, як проходить твій день?", "Вітаю, як ти почуваєшся сьогодні?"],
    zu: ["Sawubona, usuku lwakho lunjani?", "Sawubona, uzizwa kanjani namhlanje?"],
  }
  
  // Return the predefined translation or a modified version of the original text
  const baseTranslation = translations[targetLanguage] || `${text} (${targetLanguage})`

  // If alternative is requested, return a different version if available
  if (alternative && alternativeTranslations[targetLanguage] && alternativeTranslations[targetLanguage].length > 0) {
    const randomIndex = Math.floor(Math.random() * alternativeTranslations[targetLanguage].length)
    return {
      text: alternativeTranslations[targetLanguage][randomIndex],
      language: targetLanguage,
    }
  }

  return {
    text: baseTranslation,
    language: targetLanguage,
  }
}

// Get literal translation back to the source language
export async function getLiteralTranslation(text: string, sourceLanguage: string, targetLanguage: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Check if we have a literal translation for this phrase
  const lowerText = text.toLowerCase().trim()

  // Try to find a match in our literal translations dictionary
  for (const [phrase, translations] of Object.entries(literalTranslations)) {
    if (lowerText === translationDictionary[phrase]?.[targetLanguage]?.toLowerCase()) {
      // We found a match, return the literal translation
      return {
        text: translations[sourceLanguage] || `${translationDictionary[phrase]?.[sourceLanguage]}`,
        language: sourceLanguage,
      }
    }
  }

  // If no match found, return a generic literal translation
  return {
    text: `${text}`,
    language: sourceLanguage,
  }
}

// Mock phonetic transcription
export function getPhoneticTranscription(text: string, languageCode: string) {
  // In a real app, you would use specialized libraries or APIs for phonetic transcription

  // Check if we have a phonetic transcription for this exact phrase
  if (phoneticTranscriptions[languageCode]) {
    for (const [phrase, transcription] of Object.entries(phoneticTranscriptions[languageCode])) {
      if (text === phrase || text.includes(phrase)) {
        return transcription
      }
    }
  }

  // If no exact match, return a generic phonetic transcription
  const genericPhonetics: Record<string, string> = {
    en: "/fəˈnɛtɪk trænsˈkrɪpʃən/",
    es: "/foˈnetika tɾansˈkɾipθjon/",
    fr: "/fɔnetik tʁɑ̃skʁipsjɔ̃/",
    de: "/foˈneːtɪʃə tʁansˈkʁɪpʦi̯oːn/",
    it: "/foˈnɛtika traskriˈtsjone/",
    pt: "/fuˈnɛtika tɾɐ̃skɾiˈsɐ̃w̃/",
    ro: "/foˈnetikə transkripˈtsie/",
    nl: "/foˈnetisə trɑnsˈkrɪpsi/",
    sv: "/foˈneːtɪsk transkrɪpˈɧoːn/",
    no: "/fuˈneːtɪsk transkrɪpˈʃuːn/",
    da: "/foˈneˀtisk transkʁipˈɕoˀn/",
    is: "/ˈfouːnɛtɪsk ˈtʰranskrɪpʰsjoun/",
    fi: "/foˈneːttinen trɑnsˈkriptio/",
    ru: "/fənjɪˈtjitɕɪskəjə trənskrjipˈtsɨjə/",
    ja: "/oɴʃokɯ teɪoɴ/",
    "zh-CN": "/yīn biāo/",
    "zh-TW": "/yīn biāo/",
    ko: "/ɸonetʰik tʰɯɾɛnskʰɯɾipsʰʌn/",
    ar: "/kitaːba sˤautija/",
    he: "/tiqluv foneti/",
    hi: "/dhvanyātmak pratilekhan/",
    bn: "/dhoni likhon/",
    ta: "/oli peyarppu/",
    te: "/dhvani lipyantarīkaraṇa/",
    mr: "/dhvanyātmak lipyantaran/",
    gu: "/dhvanyātmak lipyantaran/",
    kn: "/dhvanyātmaka lipyantarīkaraṇa/",
    ml: "/dhvanyātmakamāya lipyantaraṇam/",
    pa: "/dhunātmak lipi-antar/",
    vi: "/phiên âm/",
    th: "/kaan thɔɔŋ siǎŋ/",
    id: "/transkripsi fonetik/",
    ms: "/transkripsi fonetik/",
    tr: "/fonetik transkripsiyonu/",
    sw: "/fonetiki uandishi/",
    pl: "/fɔnɛtɨt͡ʂna transkrɨpt͡sja/",
    uk: "/fɔnɛtɨt͡ʃna transkrɨpt͡sija/",
    zu: "/ukubhalwa kwemisindo/",
  }

  return genericPhonetics[languageCode] || "/fəˈnɛtɪk trænsˈkrɪpʃən/"
}
