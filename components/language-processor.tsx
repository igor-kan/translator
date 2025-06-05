"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TranslationResult } from "@/components/translation-result"
import { Loader2, SettingsIcon, Globe } from "lucide-react"
import { detectLanguage, correctText, translateText, getLiteralTranslation } from "@/lib/language-services"
import { LanguageGroups, type LanguageGroup } from "@/lib/language-groups"
import { Settings } from "@/components/settings"
import { LanguageSelector } from "@/components/language-selector"
import { DetectedLanguages } from "@/components/detected-languages"

export function LanguageProcessor() {
  const [inputText, setInputText] = useState("")
  const [detectedLanguages, setDetectedLanguages] = useState<
    Array<{ language: string; code: string; confidence: number }>
  >([])
  const [detectedLanguage, setDetectedLanguage] = useState("")
  const [detectedLanguageCode, setDetectedLanguageCode] = useState("")
  const [correctedText, setCorrectedText] = useState("")
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("romance")
  const [showSettings, setShowSettings] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState<Record<string, boolean>>({
    // Default selected languages
    en: true,
    es: true,
    fr: true,
    de: true,
    it: true,
    pt: true,
    ro: true,
    nl: true,
    sv: true,
    no: true,
    da: true,
    is: true,
    fi: true,
    ru: true,
    "zh-CN": true,
    "zh-TW": true,
    ja: true,
    ko: true,
    ar: true,
    he: true,
    hi: true,
    bn: true,
    ta: true,
    te: true,
    vi: true,
    th: true,
    id: true,
    ms: true,
  })
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [manualLanguageCode, setManualLanguageCode] = useState<string | null>(null)

  const processText = async () => {
    if (!inputText.trim()) return

    setIsProcessing(true)
    try {
      // Step 1: Detect language or use manually selected language
      let detected
      if (manualLanguageCode) {
        // Find the language name from the code
        let languageName = ""
        Object.keys(LanguageGroups).forEach((group) => {
          const lang = LanguageGroups[group as LanguageGroup].languages.find((l) => l.code === manualLanguageCode)
          if (lang) {
            languageName = lang.name
          }
        })

        detected = {
          language: languageName,
          code: manualLanguageCode,
          confidence: 1.0,
        }

        // Reset manual selection after use
        setManualLanguageCode(null)
      } else {
        // Auto-detect languages
        const detectedResults = await detectLanguage(inputText)
        setDetectedLanguages(detectedResults)

        // Use the highest confidence language by default
        detected = detectedResults[0]

        // If confidence is low, we'll make sure to show the language selection UI
        if (detected.confidence < 0.8 && detectedResults.length === 1) {
          // Add some alternative language options with lower confidence
          const alternativeLanguages = [
            { language: "English", code: "en", confidence: detected.confidence * 0.8 },
            { language: "Spanish", code: "es", confidence: detected.confidence * 0.7 },
            { language: "French", code: "fr", confidence: detected.confidence * 0.6 },
          ].filter((lang) => lang.code !== detected.code)

          // Add the alternatives and re-sort by confidence
          setDetectedLanguages([detected, ...alternativeLanguages].sort((a, b) => b.confidence - a.confidence))
        }
      }

      setDetectedLanguage(detected.language)
      setDetectedLanguageCode(detected.code)

      // Step 2: Correct text
      const corrected = await correctText(inputText, detected.code)
      setCorrectedText(corrected.text)

      // Step 3: Translate to multiple languages
      const allTranslations: Record<string, any> = {}

      for (const group of Object.keys(LanguageGroups)) {
        const languages = LanguageGroups[group as LanguageGroup].languages
        const groupTranslations: Record<string, any> = {}

        for (const lang of languages) {
          // Skip languages that aren't selected
          if (!selectedLanguages[lang.code]) continue

          // Skip the detected language itself
          if (lang.code === detected.code) continue

          const translation = await translateText(corrected.text, lang.code)

          // Get literal translation back to detected language
          const literalTranslation = await getLiteralTranslation(translation.text, detected.code, lang.code)

          // Get alternative translations (up to 2)
          const alternativeTranslations = await Promise.all([
            translateText(corrected.text, lang.code, true),
            translateText(corrected.text, lang.code, true),
          ])

          groupTranslations[lang.code] = {
            text: translation.text,
            language: lang.name,
            code: lang.code,
            literalTranslation: literalTranslation.text,
            alternativeTranslations: alternativeTranslations
              .map((t) => t.text)
              .filter((t) => t !== translation.text && t !== ""), // Remove duplicates and empty strings
          }
        }

        // Only add the group if it has translations
        if (Object.keys(groupTranslations).length > 0) {
          allTranslations[group] = groupTranslations
        }
      }

      setTranslations(allTranslations)
    } catch (error) {
      console.error("Error processing text:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const toggleLanguageSelector = () => {
    setShowLanguageSelector(!showLanguageSelector)
  }

  const handleLanguageSelectionChange = (newSelectedLanguages: Record<string, boolean>) => {
    setSelectedLanguages(newSelectedLanguages)
  }

  const handleManualLanguageSelect = (langCode: string) => {
    setManualLanguageCode(langCode)
    setShowLanguageSelector(false)
  }

  const handleDetectedLanguageSelect = (langCode: string) => {
    const lang = detectedLanguages.find((l) => l.code === langCode)
    if (lang) {
      setDetectedLanguage(lang.language)
      setDetectedLanguageCode(lang.code)

      // Re-process with the selected language
      processTextWithLanguage(lang.code)
    }
  }

  const processTextWithLanguage = async (languageCode: string) => {
    if (!inputText.trim()) return

    setIsProcessing(true)
    try {
      // Find language name
      let languageName = ""
      Object.keys(LanguageGroups).forEach((group) => {
        const lang = LanguageGroups[group as LanguageGroup].languages.find((l) => l.code === languageCode)
        if (lang) {
          languageName = lang.name
        }
      })

      // Step 2: Correct text
      const corrected = await correctText(inputText, languageCode)
      setCorrectedText(corrected.text)

      // Step 3: Translate to multiple languages
      const allTranslations: Record<string, any> = {}

      for (const group of Object.keys(LanguageGroups)) {
        const languages = LanguageGroups[group as LanguageGroup].languages
        const groupTranslations: Record<string, any> = {}

        for (const lang of languages) {
          // Skip languages that aren't selected
          if (!selectedLanguages[lang.code]) continue

          // Skip the detected language itself
          if (lang.code === languageCode) continue

          const translation = await translateText(corrected.text, lang.code)

          // Get literal translation back to detected language
          const literalTranslation = await getLiteralTranslation(translation.text, languageCode, lang.code)

          // Get alternative translations (up to 2)
          const alternativeTranslations = await Promise.all([
            translateText(corrected.text, lang.code, true),
            translateText(corrected.text, lang.code, true),
          ])

          groupTranslations[lang.code] = {
            text: translation.text,
            language: lang.name,
            code: lang.code,
            literalTranslation: literalTranslation.text,
            alternativeTranslations: alternativeTranslations
              .map((t) => t.text)
              .filter((t) => t !== translation.text && t !== ""), // Remove duplicates and empty strings
          }
        }

        // Only add the group if it has translations
        if (Object.keys(groupTranslations).length > 0) {
          allTranslations[group] = groupTranslations
        }
      }

      setTranslations(allTranslations)
    } catch (error) {
      console.error("Error processing text:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Get available tabs (only those with selected languages)
  const availableTabs = Object.keys(LanguageGroups).filter((group) => {
    const languages = LanguageGroups[group as LanguageGroup].languages
    return languages.some((lang) => selectedLanguages[lang.code])
  })

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguageSelector}
                  className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                >
                  <Globe className="h-4 w-4" />
                  <span>Select Language</span>
                </Button>
                {manualLanguageCode && (
                  <div className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded-full">
                    {Object.keys(LanguageGroups)
                      .map((group) => {
                        const lang = LanguageGroups[group as LanguageGroup].languages.find(
                          (l) => l.code === manualLanguageCode,
                        )
                        if (lang) return lang.name
                        return null
                      })
                      .filter(Boolean)}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSettings}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>

            {showLanguageSelector && (
              <LanguageSelector onSelect={handleManualLanguageSelect} onClose={toggleLanguageSelector} />
            )}

            <Textarea
              placeholder="Enter text in any language..."
              className="min-h-[120px] text-lg border-rose-100 dark:border-rose-900 focus:border-rose-300 dark:focus:border-rose-700 focus:ring-rose-200 dark:focus:ring-rose-800"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button
              onClick={processText}
              className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white border-0"
              disabled={isProcessing || !inputText.trim()}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                "Translate"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {showSettings && (
        <Settings
          selectedLanguages={selectedLanguages}
          onSelectionChange={handleLanguageSelectionChange}
          onClose={toggleSettings}
        />
      )}

      {!isProcessing && correctedText && (
        <>
          {detectedLanguages.length > 1 ? (
            <DetectedLanguages
              detectedLanguages={detectedLanguages}
              selectedLanguageCode={detectedLanguageCode}
              onSelect={handleDetectedLanguageSelect}
            />
          ) : (
            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div>
                    <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Detected Language</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      We detected: <span className="font-semibold">{detectedLanguage}</span>
                      <span className="ml-1 text-xs opacity-70">
                        ({Math.round((detectedLanguages[0]?.confidence || 0.9) * 100)}% confidence)
                      </span>
                    </p>
                    <p className="text-xs mt-2 text-amber-600 dark:text-amber-500">
                      If this is incorrect, you can select a different language using the "Select Language" button
                      above.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {correctedText && (
        <div className="space-y-4">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                Detected Language:
                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
                  {detectedLanguage}
                </span>
              </h2>
              {inputText !== correctedText && (
                <div className="mb-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Corrected text:</p>
                  <p className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-md">{correctedText}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {availableTabs.length > 0 && (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <Tabs defaultValue={availableTabs[0]} value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-6 bg-rose-100/50 dark:bg-rose-900/20">
                  {availableTabs.map((group) => (
                    <TabsTrigger
                      key={group}
                      value={group}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
                    >
                      {LanguageGroups[group as LanguageGroup].name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {availableTabs.map((group) => (
                  <TabsContent key={group} value={group} className="mt-0">
                    <h3 className="text-lg font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
                      {LanguageGroups[group as LanguageGroup].name} Languages
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {translations[group] &&
                        Object.keys(translations[group]).map((langCode) => (
                          <TranslationResult
                            key={langCode}
                            translation={translations[group][langCode]}
                            detectedLanguage={detectedLanguage}
                          />
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
