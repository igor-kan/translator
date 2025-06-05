"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LanguageGroups, type LanguageGroup } from "@/lib/language-groups"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"

interface SettingsProps {
  selectedLanguages: Record<string, boolean>
  onSelectionChange: (selectedLanguages: Record<string, boolean>) => void
  onClose: () => void
}

export function Settings({ selectedLanguages, onSelectionChange, onClose }: SettingsProps) {
  const [localSelectedLanguages, setLocalSelectedLanguages] = useState<Record<string, boolean>>(selectedLanguages)
  const [activeTab, setActiveTab] = useState<string>("romance")

  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedLanguages(selectedLanguages)
  }, [selectedLanguages])

  const handleLanguageToggle = (langCode: string, checked: boolean) => {
    setLocalSelectedLanguages((prev) => ({
      ...prev,
      [langCode]: checked,
    }))
  }

  const handleGroupToggle = (group: LanguageGroup, checked: boolean) => {
    const newSelectedLanguages = { ...localSelectedLanguages }
    LanguageGroups[group].languages.forEach((lang) => {
      newSelectedLanguages[lang.code] = checked
    })
    setLocalSelectedLanguages(newSelectedLanguages)
  }

  const isGroupSelected = (group: LanguageGroup) => {
    return LanguageGroups[group].languages.every((lang) => localSelectedLanguages[lang.code])
  }

  const isGroupPartiallySelected = (group: LanguageGroup) => {
    const languages = LanguageGroups[group].languages
    const selectedCount = languages.filter((lang) => localSelectedLanguages[lang.code]).length
    return selectedCount > 0 && selectedCount < languages.length
  }

  const handleSave = () => {
    onSelectionChange(localSelectedLanguages)
    onClose()
  }

  const handleSelectAll = () => {
    const newSelectedLanguages = { ...localSelectedLanguages }
    Object.keys(LanguageGroups).forEach((group) => {
      LanguageGroups[group as LanguageGroup].languages.forEach((lang) => {
        newSelectedLanguages[lang.code] = true
      })
    })
    setLocalSelectedLanguages(newSelectedLanguages)
  }

  const handleDeselectAll = () => {
    const newSelectedLanguages = { ...localSelectedLanguages }
    Object.keys(LanguageGroups).forEach((group) => {
      LanguageGroups[group as LanguageGroup].languages.forEach((lang) => {
        newSelectedLanguages[lang.code] = false
      })
    })
    setLocalSelectedLanguages(newSelectedLanguages)
  }

  return (
    <Card className="w-full border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
          Language Settings
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20"
          >
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeselectAll}
            className="border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            Deselect All
          </Button>
        </div>

        <Tabs defaultValue="romance" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4 bg-rose-100/50 dark:bg-rose-900/20">
            {Object.keys(LanguageGroups).map((group) => (
              <TabsTrigger
                key={group}
                value={group}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
              >
                {LanguageGroups[group as LanguageGroup].name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(LanguageGroups).map((group) => (
            <TabsContent key={group} value={group} className="mt-0">
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`group-${group}`}
                    checked={isGroupSelected(group as LanguageGroup)}
                    data-state={isGroupPartiallySelected(group as LanguageGroup) ? "indeterminate" : undefined}
                    onCheckedChange={(checked) => handleGroupToggle(group as LanguageGroup, checked === true)}
                    className="border-rose-300 dark:border-rose-700 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-rose-500 data-[state=checked]:to-amber-500 data-[state=checked]:border-0"
                  />
                  <Label htmlFor={`group-${group}`} className="font-medium">
                    Select All {LanguageGroups[group as LanguageGroup].name} Languages
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {LanguageGroups[group as LanguageGroup].languages.map((lang) => (
                  <div key={lang.code} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lang-${lang.code}`}
                      checked={localSelectedLanguages[lang.code] || false}
                      onCheckedChange={(checked) => handleLanguageToggle(lang.code, checked === true)}
                      className="border-amber-300 dark:border-amber-700 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-rose-500 data-[state=checked]:to-amber-500 data-[state=checked]:border-0"
                    />
                    <Label htmlFor={`lang-${lang.code}`}>{lang.name}</Label>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white border-0"
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
