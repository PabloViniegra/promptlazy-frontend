import type { OptimizedPromptSections } from '@/types/prompt'

export function formatOptimizedPrompt(optimizedPrompt: string | undefined): Partial<OptimizedPromptSections> {
  if (!optimizedPrompt) return {}

  const sections: Partial<OptimizedPromptSections> = {}

  const sectionRegex = /(^|\n)\*\*\s*([^:]+):?\s*\*\*/g
  const sectionMatches = [...optimizedPrompt.matchAll(sectionRegex)]

  if (sectionMatches.length === 0) {
    return { prompt_mejorado: optimizedPrompt.trim() }
  }

  for (let i = 0; i < sectionMatches.length; i++) {
    const match = sectionMatches[i]
    const sectionName = match[2].toLowerCase().trim()
    const sectionStart = match.index! + match[0].length
    const sectionEnd = i < sectionMatches.length - 1 ? sectionMatches[i + 1].index! : optimizedPrompt.length

    const sectionContent = optimizedPrompt
      .slice(sectionStart, sectionEnd)
      .replace(/^\s*\n\s*|\s*$/g, '')

    let sectionKey: string
    if (sectionName.includes('entrada mejorada')) {
      sectionKey = 'prompt_mejorado'
    } else if (sectionName.includes('explicación de los cambios') || sectionName.includes('explicacion de los cambios')) {
      sectionKey = 'explicación_de_los_cambios'
    } else if (sectionName.includes('entrada inicial')) {
      sectionKey = 'entrada_inicial'
      continue
    } else {
      continue
    }

    if (sectionContent) {
      sections[sectionKey] = sectionContent.trim()
    }
  }
  if (Object.keys(sections).length === 0) {
    return { prompt_mejorado: optimizedPrompt.trim() }
  }

  return sections
}
