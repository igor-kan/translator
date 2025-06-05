"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { getPhoneticTranscription } from "@/lib/language-services"

interface TranslationResultProps {
  translation: {
    text: string
    language: string
    code: string
    literalTranslation: string
    alternativeTranslations: string[]
  }
  detectedLanguage: string
}

export function TranslationResult({ translation, detectedLanguage }: TranslationResultProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [phoneticText, setPhoneticText] = useState("")
  const [showAlternatives, setShowAlternatives] = useState(false)

  const playAudio = () => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true)

      // Get phonetic transcription
      const phonetics = getPhoneticTranscription(translation.text, translation.code)
      setPhoneticText(phonetics)

      const utterance = new SpeechSynthesisUtterance(translation.text)
      utterance.lang = translation.code

      utterance.onend = () => {
        setIsPlaying(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  const getWordDefinitionUrl = (word: string, langCode: string) => {
    // This is a simplified example - in a real app, you might use different
    // dictionary services based on the language
    return `https://www.wordreference.com/${langCode}/definition/${encodeURIComponent(word)}`
  }

  const toggleAlternatives = () => {
    setShowAlternatives(!showAlternatives)
  }

  const hasAlternatives = translation.alternativeTranslations && translation.alternativeTranslations.length > 0

  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-rose-50 dark:from-slate-900 dark:to-rose-950/30">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-rose-500/10 to-amber-500/10 dark:from-rose-500/20 dark:to-amber-500/20 p-3 flex justify-between items-start">
          <h4 className="font-medium text-rose-700 dark:text-rose-300">{translation.language}</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={playAudio}
            disabled={isPlaying}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            <Volume2 className={`h-4 w-4 ${isPlaying ? "text-amber-500 animate-pulse" : ""}`} />
            <span className="sr-only">Listen</span>
          </Button>
        </div>

        <div className="p-4">
          <p className="mb-3 text-slate-800 dark:text-slate-200">{translation.text}</p>

          {phoneticText && (
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-3 bg-rose-50 dark:bg-rose-900/20 p-2 rounded-md">
              <p className="font-mono">{phoneticText}</p>
            </div>
          )}

          <div className="text-sm mb-3">
            <p className="text-slate-500 dark:text-slate-400 mb-1">Literal translation:</p>
            <p className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md text-sm">{translation.literalTranslation}</p>
          </div>

          {hasAlternatives && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center w-full justify-between mb-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                onClick={toggleAlternatives}
              >
                <span>Alternative translations</span>
                {showAlternatives ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {showAlternatives && (
                <div className="space-y-2 mb-3">
                  {translation.alternativeTranslations.map((alt, index) => (
                    <p key={index} className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-md text-sm">
                      {alt}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="text-sm flex flex-wrap">
            {translation.text.split(/\s+/).map((word, index) => (
              <a
                key={index}
                href={getWordDefinitionUrl(word, translation.code)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mr-1 mb-1 px-2 py-1 bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-amber-900/30 rounded hover:from-rose-200 hover:to-amber-200 dark:hover:from-rose-800/30 dark:hover:to-amber-800/30 transition-colors duration-200"
              >
                {word}
                <ExternalLink className="ml-1 h-3 w-3 text-amber-500" />
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
