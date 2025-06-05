"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface DetectedLanguagesProps {
  detectedLanguages: Array<{
    language: string
    code: string
    confidence: number
  }>
  selectedLanguageCode: string
  onSelect: (languageCode: string) => void
}

export function DetectedLanguages({ detectedLanguages, selectedLanguageCode, onSelect }: DetectedLanguagesProps) {
  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Multiple languages detected</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
              We detected multiple possible languages. Please select the correct one:
            </p>
            <div className="flex flex-wrap gap-2">
              {detectedLanguages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={lang.code === selectedLanguageCode ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSelect(lang.code)}
                  className={
                    lang.code === selectedLanguageCode
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white border-0"
                      : "border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/30"
                  }
                >
                  {lang.language}
                  <span className="ml-1 text-xs opacity-70">({Math.round(lang.confidence * 100)}%)</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
