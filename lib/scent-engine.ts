// ScentStack Recommendation Engine
// All logic is based on real fragrance note families and accord compatibility.

export const OCCASION_PROFILES: Record<string, {
  name: string
  description: string
  targetAccords: string[]
  targetNotes: string[]
  avoidAccords: string[]
  season?: string[]
}> = {
  date_night: {
    name: 'Date Night',
    description: 'Romantic, alluring, and memorable',
    targetAccords: ['amber', 'floral', 'vanilla', 'musky', 'woody', 'oud', 'rose'],
    targetNotes: ['rose', 'jasmine', 'vanilla', 'sandalwood', 'musk', 'amber', 'patchouli', 'iris'],
    avoidAccords: ['green', 'aquatic', 'citrus'],
    season: ['evening'],
  },
  office: {
    name: 'Office / Daytime',
    description: 'Professional, clean, and approachable',
    targetAccords: ['woody', 'fresh', 'citrus', 'powdery', 'clean'],
    targetNotes: ['bergamot', 'cedar', 'vetiver', 'light musk', 'white tea', 'violet', 'iris'],
    avoidAccords: ['oud', 'heavy amber', 'gourmand', 'spicy'],
    season: ['morning', 'daytime'],
  },
  summer_day: {
    name: 'Summer Day',
    description: 'Bright, airy, and refreshing',
    targetAccords: ['citrus', 'aquatic', 'fresh', 'green', 'fruity'],
    targetNotes: ['lemon', 'bergamot', 'neroli', 'sea salt', 'grapefruit', 'white flowers', 'cucumber'],
    avoidAccords: ['heavy amber', 'oud', 'smoky'],
    season: ['summer', 'spring'],
  },
  winter_evening: {
    name: 'Winter Evening',
    description: 'Warm, cozy, and enveloping',
    targetAccords: ['amber', 'woody', 'spicy', 'vanilla', 'oud', 'smoky'],
    targetNotes: ['cinnamon', 'clove', 'vanilla', 'tonka bean', 'oud', 'sandalwood', 'benzoin'],
    avoidAccords: ['aquatic', 'fresh', 'green'],
    season: ['winter', 'fall', 'evening'],
  },
  wedding: {
    name: 'Wedding / Formal',
    description: 'Elegant, timeless, and sophisticated',
    targetAccords: ['floral', 'powdery', 'woody', 'amber', 'white floral'],
    targetNotes: ['rose', 'peony', 'lily', 'jasmine', 'iris', 'white musk', 'sandalwood'],
    avoidAccords: ['heavy spice', 'smoky', 'gourmand'],
  },
  casual_weekend: {
    name: 'Casual Weekend',
    description: 'Easy, comfortable, and carefree',
    targetAccords: ['fresh', 'woody', 'fruity', 'citrus', 'musky'],
    targetNotes: ['apple', 'peach', 'cedar', 'light musk', 'bergamot', 'grapefruit'],
    avoidAccords: [],
  },
  gym_sport: {
    name: 'Gym / Sport',
    description: 'Clean, invigorating, and fresh',
    targetAccords: ['aquatic', 'fresh', 'citrus', 'aromatic'],
    targetNotes: ['mint', 'eucalyptus', 'grapefruit', 'sea salt', 'aquatic'],
    avoidAccords: ['heavy amber', 'oud', 'vanilla', 'gourmand'],
  },
  night_out: {
    name: 'Night Out / Club',
    description: 'Bold, confident, and attention-grabbing',
    targetAccords: ['oud', 'amber', 'spicy', 'woody', 'musky'],
    targetNotes: ['oud', 'amber', 'patchouli', 'pepper', 'cardamom', 'tobacco', 'leather'],
    avoidAccords: ['clean', 'powdery', 'aquatic'],
    season: ['evening'],
  },
}

export const NOTE_FAMILY_MAP: Record<string, string[]> = {
  citrus: ['bergamot', 'lemon', 'lime', 'grapefruit', 'orange', 'mandarin', 'neroli', 'yuzu', 'clementine'],
  floral: ['rose', 'jasmine', 'iris', 'lily', 'peony', 'violet', 'lavender', 'ylang-ylang', 'magnolia', 'gardenia'],
  woody: ['cedar', 'sandalwood', 'vetiver', 'patchouli', 'guaiac wood', 'agarwood', 'birch'],
  amber: ['amber', 'benzoin', 'labdanum', 'tonka bean', 'resin'],
  fresh: ['sea salt', 'aquatic', 'ozone', 'cucumber', 'white tea', 'green tea'],
  spicy: ['pepper', 'cardamom', 'cinnamon', 'clove', 'ginger', 'nutmeg', 'saffron'],
  gourmand: ['vanilla', 'caramel', 'chocolate', 'coffee', 'almond', 'honey', 'praline'],
  musky: ['musk', 'white musk', 'ambroxan', 'ambergris', 'civet'],
  green: ['grass', 'leaf', 'basil', 'violet leaf', 'tomato leaf', 'fig leaf'],
  fruity: ['apple', 'peach', 'raspberry', 'blackcurrant', 'pear', 'plum', 'apricot'],
}

export interface WardrobeItem {
  id: string
  fragrance_id: string
  fragrance_name: string
  brand: string
  notes: string[]
  accords: string[]
  image_url?: string
}

export interface StackAnalysis {
  stackName: string
  occasionFit: { occasion: string; score: number; description: string }[]
  noteBreakdown: { family: string; notes: string[]; strength: number }[]
  layeringAdvice: string[]
  confidence: 'high' | 'medium' | 'experimental'
  applicationOrder: string[]
}

export function scoreFragranceForOccasion(item: WardrobeItem, occasionKey: string): number {
  const profile = OCCASION_PROFILES[occasionKey]
  if (!profile) return 0
  let score = 0
  const allNotes = [...(item.notes || []), ...(item.accords || [])].map(n => n.toLowerCase())
  profile.targetAccords.forEach(accord => {
    if (allNotes.some(n => n.includes(accord))) score += 15
  })
  profile.targetNotes.forEach(note => {
    if (allNotes.some(n => n.includes(note))) score += 10
  })
  profile.avoidAccords.forEach(accord => {
    if (allNotes.some(n => n.includes(accord))) score -= 20
  })
  return Math.max(0, Math.min(100, score))
}

export function getNoteFamily(note: string): string {
  const normalizedNote = note.toLowerCase()
  for (const [family, notes] of Object.entries(NOTE_FAMILY_MAP)) {
    if (notes.some(n => normalizedNote.includes(n) || n.includes(normalizedNote))) {
      return family
    }
  }
  return 'other'
}

export function analyzeStack(items: WardrobeItem[], occasionHint?: string): StackAnalysis {
  const allNotes = items.flatMap(i => i.notes || [])
  const allAccords = items.flatMap(i => i.accords || [])

  // Group notes by family
  const familyMap: Record<string, string[]> = {}
  allNotes.forEach(note => {
    const family = getNoteFamily(note)
    if (!familyMap[family]) familyMap[family] = []
    if (!familyMap[family].includes(note)) familyMap[family].push(note)
  })

  const noteBreakdown = Object.entries(familyMap).map(([family, notes]) => ({
    family,
    notes,
    strength: Math.min(100, notes.length * 20),
  })).sort((a, b) => b.strength - a.strength)

  // Score for all occasions
  const occasionScores = Object.entries(OCCASION_PROFILES).map(([key, profile]) => {
    const totalScore = items.reduce((sum, item) => sum + scoreFragranceForOccasion(item, key), 0)
    return {
      occasion: profile.name,
      score: Math.round(totalScore / items.length),
      description: profile.description,
    }
  }).sort((a, b) => b.score - a.score)

  // Determine layering application order (base → middle → top)
  // Heavier/longer-lasting scents go first
  const heavyAccords = ['oud', 'amber', 'woody', 'vanilla', 'musk', 'spicy']
  const sorted = [...items].sort((a, b) => {
    const aHeavy = (a.accords || []).filter(ac => heavyAccords.some(h => ac.toLowerCase().includes(h))).length
    const bHeavy = (b.accords || []).filter(ac => heavyAccords.some(h => ac.toLowerCase().includes(h))).length
    return bHeavy - aHeavy
  })

  // Confidence based on accord compatibility
  const uniqueFamilies = new Set(noteBreakdown.map(n => n.family)).size
  const confidence: 'high' | 'medium' | 'experimental' =
    uniqueFamilies <= 3 ? 'high' : uniqueFamilies <= 5 ? 'medium' : 'experimental'

  const layeringAdvice = [
    `Apply ${sorted[0]?.fragrance_name} first — it has the heaviest base notes and longest sillage.`,
    sorted.length > 1 ? `Layer ${sorted[1]?.fragrance_name} on top while the first is still damp.` : '',
    sorted.length > 2 ? `Finish with ${sorted[2]?.fragrance_name} for the top note accent.` : '',
    'Apply to pulse points: wrists, neck, and inner elbows.',
    confidence === 'experimental' ? 'This is an experimental combination — test on skin before committing.' : '',
  ].filter(Boolean)

  const dominantFamilies = noteBreakdown.slice(0, 2).map(n => n.family)
  const stackName = generateStackName(dominantFamilies, occasionScores[0]?.occasion)

  return {
    stackName,
    occasionFit: occasionScores.slice(0, 4),
    noteBreakdown,
    layeringAdvice,
    confidence,
    applicationOrder: sorted.map(i => i.fragrance_name),
  }
}

export function buildOccasionStack(wardrobe: WardrobeItem[], occasionKey: string): {
  stack: WardrobeItem[]
  analysis: StackAnalysis
  occasionName: string
  confidence: string
} {
  const profile = OCCASION_PROFILES[occasionKey]
  if (!profile) throw new Error('Unknown occasion')

  // Score every wardrobe item for this occasion
  const scored = wardrobe.map(item => ({
    item,
    score: scoreFragranceForOccasion(item, occasionKey),
  })).sort((a, b) => b.score - a.score)

  // Take top 1-3 fragrances. Solo if top score is very high, duo/trio otherwise.
  let stack: WardrobeItem[]
  if (scored[0]?.score >= 70) {
    stack = [scored[0].item]
    if (scored[1]?.score >= 40) stack.push(scored[1].item)
    if (scored[2]?.score >= 30 && stack.length === 2) stack.push(scored[2].item)
  } else {
    stack = scored.slice(0, 2).map(s => s.item)
  }

  const analysis = analyzeStack(stack, occasionKey)

  return {
    stack,
    analysis,
    occasionName: profile.name,
    confidence: analysis.confidence,
  }
}

function generateStackName(families: string[], occasion?: string): string {
  const adjectives: Record<string, string> = {
    floral: 'Blooming',
    woody: 'Driftwood',
    citrus: 'Bright',
    amber: 'Golden',
    musky: 'Velvet',
    spicy: 'Ember',
    gourmand: 'Sweet',
    fresh: 'Coastal',
    green: 'Forest',
    fruity: 'Nectar',
    other: 'Signature',
  }
  const nouns: Record<string, string> = {
    floral: 'Garden',
    woody: 'Cabin',
    citrus: 'Morning',
    amber: 'Dusk',
    musky: 'Silk',
    spicy: 'Twilight',
    gourmand: 'Reverie',
    fresh: 'Shore',
    green: 'Trail',
    fruity: 'Grove',
    other: 'Blend',
  }
  const adj = adjectives[families[0]] || 'Signature'
  const noun = nouns[families[1] || families[0]] || 'Stack'
  return `${adj} ${noun}`
}
