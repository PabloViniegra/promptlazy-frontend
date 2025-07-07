import type { OptimizedPromptSections } from '@/types/prompt'

export function formatOptimizedPrompt(optimizedPrompt: string | undefined): Partial<OptimizedPromptSections> {
  if (!optimizedPrompt) return {}

  const lines = optimizedPrompt.split('\n')
  const sections: Partial<OptimizedPromptSections> = {}
  let currentSection: keyof OptimizedPromptSections | null = null

  const sectionMap: Record<string, keyof OptimizedPromptSections> = {
    'entrada_mejorada': 'prompt_mejorado',
    'entrada mejorada': 'prompt_mejorado',
    'salida_deseada': 'salida_deseada',
    'salida deseada': 'salida_deseada',
    'explicación_de_los_cambios': 'explicación_de_los_cambios',
    'explicación de los cambios': 'explicación_de_los_cambios',
    'prompt_mejorado': 'prompt_mejorado',
    'prompt mejorado': 'prompt_mejorado'
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line || line === '---') continue

    let sectionMatch = line.match(/^\*\*\s*([^:]+):?\s*\*\*$/i)
    if (sectionMatch) {
      const sectionName = sectionMatch[1].toLowerCase().trim()
      if (sectionName === 'entrada inicial') continue
      if (sectionMap[sectionName]) {
        currentSection = sectionMap[sectionName]
        sections[currentSection] = ''
      }
      continue
    }

    sectionMatch = line.match(/^\s*([^:]+):\s*$/i)
    if (sectionMatch) {
      const sectionName = sectionMatch[1].toLowerCase().trim()
      if (sectionMap[sectionName]) {
        currentSection = sectionMap[sectionName]
        sections[currentSection] = ''
      }
      continue
    }

    if (currentSection) {
      const currentContent = sections[currentSection] || ''
      const separator = currentContent && !currentContent.endsWith('\n') ? '\n' : ''
      sections[currentSection] = currentContent ? `${currentContent}${separator}${line}` : line
    }
  }

  return sections
}
