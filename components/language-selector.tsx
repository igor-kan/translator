"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"
import { LanguageGroups, type LanguageGroup } from "@/lib/language-groups"

interface LanguageSelectorProps {
  onSelect: (languageCode: string) => void
  onClose: () => void
}

export function LanguageSelector({ onSelect, onClose }: LanguageSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Flatten all languages into a single array
  const allLanguages = Object.keys(LanguageGroups).flatMap((group) => {
    return LanguageGroups[group as LanguageGroup].languages.map((lang) => ({
      ...lang,
      group: LanguageGroups[group as LanguageGroup].name,
    }))
  })

  // Filter languages based on search query
  const filteredLanguages =
    searchQuery.trim() === ""
      ? allLanguages
      : allLanguages.filter(
          (lang) =>
            lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lang.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lang.group.toLowerCase().includes(searchQuery.toLowerCase()),
        )

  const handleSelect = (languageCode: string) => {
    onSelect(languageCode)
  }

  return (
    <Card className="border-rose-100 dark:border-rose-900 shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-rose-700 dark:text-rose-300">Select Language</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-500">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            ref={inputRef}
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 border-rose-100 dark:border-rose-900 focus:border-rose-300 dark:focus:border-rose-700"
          />
        </div>

        <div className="h-60 overflow-auto">
          <div className="space-y-1">
            {filteredLanguages.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                className="w-full justify-start text-left hover:bg-rose-50 dark:hover:bg-rose-900/20"
                onClick={() => handleSelect(lang.code)}
              >
                <span className="font-medium">{lang.name}</span>
                <span className="ml-2 text-xs text-slate-500">({lang.code})</span>
                <span className="ml-auto text-xs text-amber-500">{lang.group}</span>
              </Button>
            ))}

            {filteredLanguages.length === 0 && (
              <div className="py-4 text-center text-slate-500">No languages found matching "{searchQuery}"</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
