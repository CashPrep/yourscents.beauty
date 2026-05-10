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

// Describes how two note families interact when layered
const FAMILY_SYNERGY: Record<string, Record<string, string>> = {
  amber: {
    woody:    'warm amber accords anchor the woody drydown, adding depth and longevity',
    spicy:    'amber\u2019s resinous sweetness amplifies spice without turning sharp',
    musky:    'amber and musk merge into a skin-close, sensual base',
    floral:   'amber lifts floral notes into something richer and more intoxicating',
    gourmand: 'amber adds a golden warmth that rounds out gourmand sweetness',
    citrus:   'amber grounds citrus brightness so it lingers instead of disappearing',
    fresh:    'amber\u2019s warmth contrasts fresh notes, creating a signature tension',
  },
  woody: {
    amber:    'woody dryness contrasts amber\u2019s sweetness for a balanced, earthy finish',
    spicy:    'wood and spice share dry warmth, making the combination feel cohesive',
    musky:    'woody accords give musk a natural, forest-floor grounding',
    floral:   'woody base lifts florals off the skin and extends their longevity',
    citrus:   'cedar or sandalwood softens citrus\u2019 sharpness into a smooth accord',
    fresh:    'damp wood notes complement fresh accords with an outdoor naturalness',
    gourmand: 'woody dryness prevents gourmand notes from becoming cloying',
  },
  spicy: {
    amber:    'spice rides amber\u2019s warmth, projecting further and more evenly',
    woody:    'spice and wood share the same dry, aromatic register',
    musky:    'spice gives musk an edge, making the skin scent feel more complex',
    floral:   'a spicy undercurrent gives florals an unexpected, alluring bite',
    gourmand: 'spice adds intrigue to sweet gourmand notes, preventing one-dimensionality',
    citrus:   'pepper or cardamom sharpens citrus into a sophisticated opening',
  },
  floral: {
    musky:    'musk amplifies floral diffusion, pushing petals outward on the skin',
    woody:    'woody accords give florals a rooted, sustainable foundation',
    citrus:   'bright citrus opens the floral heart with freshness and clarity',
    powdery:  'powdery accords soften florals into something skin-like and intimate',
    gourmand: 'gourmand sweetness turns florals lush and almost edible',
    fresh:    'fresh accords keep florals airy and modern rather than heavy',
  },
  citrus: {
    floral:   'citrus top notes brighten the floral heart for a radiant opening',
    woody:    'woody base extends ephemeral citrus far beyond its natural lifespan',
    fresh:    'citrus and fresh accords combine into a clean, ozonic brightness',
    musky:    'musk anchors citrus so the brightness stays rather than evaporating',
  },
  musky: {
    floral:   'musk acts as a diffuser, projecting floral notes further from the skin',
    amber:    'warm musk and amber blur together into an irresistibly skin-close base',
    woody:    'musky accords blend seamlessly with woody drydown notes',
    spicy:    'musk softens spice\u2019s edge into something sensual rather than sharp',
  },
  fresh: {
    woody:    'fresh accords and woody base create a just-stepped-outdoors effect',
    citrus:   'fresh + citrus is the quintessential clean, modern pairing',
    floral:   'fresh accords keep florals light and wearable for daytime',
    musky:    'clean musk extends freshness beyond the first hour',
  },
  gourmand: {
    amber:    'amber\u2019s warmth deepens gourmand sweetness from dessert to perfume',
    woody:    'woody dryness offsets sweetness so the combination reads sophisticated',
    spicy:    'spice gives sweet gourmand notes a complex, mulled quality',
    musky:    'musk rounds out gourmand edges into a pillowy, enveloping finish',
  },
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
  stackReasoning: string   // NEW: human-readable explanation of why these fragrances work together
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

/**
 * Generates a human-readable explanation of why this fragrance stack works.
 * Uses the dominant note families of each fragrance + the FAMILY_SYNERGY map.
 */
export function buildStackReasoning(items: WardrobeItem[]): string {
  if (items.length < 2) return ''

  // Find the dominant accord/family per fragrance
  const getDominantFamily = (item: WardrobeItem): string => {
    // Prefer explicit accords over notes for dominance
    const sources = [...(item.accords || []), ...(item.notes || [])]
    const familyCounts: Record<string, number> = {}
    sources.forEach(s => {
      const f = getNoteFamily(s.toLowerCase())
      if (f !== 'other') familyCounts[f] = (familyCounts[f] || 0) + 1
    })
    const sorted = Object.entries(familyCounts).sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0] ?? 'other'
  }

  // Pull one representative accord per fragrance for display
  const getTopAccord = (item: WardrobeItem): string => {
    const accords = item.accords || []
    return accords[0] ?? item.notes?.[0] ?? 'complex'
  }

  const fragranceProfiles = items.map(item => ({
    name: item.fragrance_name,
    dominantFamily: getDominantFamily(item),
    topAccord: getTopAccord(item),
  }))

  // Build shared family sentence
  const allFamilies = fragranceProfiles.map(f => f.dominantFamily)
  const sharedFamilies = allFamilies.filter((f, i) => allFamilies.indexOf(f) !== i)
  const uniqueFamilies = [...new Set(allFamilies)]

  // Get the synergy description between the two dominant families
  const [fA, fB] = uniqueFamilies
  const synergyDesc =
    FAMILY_SYNERGY[fA]?.[fB] ??
    FAMILY_SYNERGY[fB]?.[fA] ??
    'their contrasting profiles create an unexpected, memorable signature'

  const names = fragranceProfiles.map(f => f.name)
  const accordList = fragranceProfiles.map(f => f.topAccord).join(' and ')

  if (sharedFamilies.length > 0) {
    // They share a family — explain resonance
    const shared = sharedFamilies[0]
    return `${names.join(' + ')} resonate because both share ${shared} accords, creating a unified ${shared} through-line. The contrast between ${fragranceProfiles[0].topAccord} and ${fragranceProfiles[1]?.topAccord ?? accordList} keeps the stack from feeling one-dimensional.`
  }

  // Different families — explain the tension/complement
  return `${names.join(' + ')} work together because ${synergyDesc}. The interplay between ${fragranceProfiles[0].topAccord} and ${fragranceProfiles[1]?.topAccord ?? 'contrasting notes'} gives the stack a complexity neither fragrance achieves alone.`
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

  // Generate stack reasoning
  const stackReasoning = buildStackReasoning(items)

  return {
    stackName,
    occasionFit: occasionScores.slice(0, 4),
    noteBreakdown,
    layeringAdvice,
    confidence,
    applicationOrder: sorted.map(i => i.fragrance_name),
    stackReasoning,
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

  const scored = wardrobe.map(item => ({
    item,
    score: scoreFragranceForOccasion(item, occasionKey),
  })).sort((a, b) => b.score - a.score)

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
