import { LanguageProcessor } from "@/components/language-processor"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 dark:from-slate-950 dark:to-rose-950 p-4">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-1 rounded-full">
              <div className="bg-white dark:bg-slate-900 rounded-full p-3">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 text-center">
                  Polyglot Translator
                </h1>
              </div>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Translate text between languages with advanced features for language learning
          </p>
          <LanguageProcessor />
        </div>
      </div>
    </main>
  )
}
