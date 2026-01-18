import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const toolsDir = path.join(process.cwd(), 'tools')

/**
 * Validates a tool object against the required schema
 * @param {Object} tool
 * @param {string} file
 */
function validateTool(tool, file) {
  const required = [
    'name',
    'slug',
    'description',
    'category',
    'tags',
    'status',
    'visibility',
    'liveUrl',
    'github',
    'launched',
  ]

  for (const key of required) {
    if (!tool[key]) {
      throw new Error(`[tools/${file}] missing required field: ${key}`)
    }
  }

  const validStatuses = ['alpha', 'beta', 'production', 'paused']
  if (!validStatuses.includes(tool.status)) {
    throw new Error(
      `[tools/${file}] invalid status: ${tool.status}. Must be one of: ${validStatuses.join(', ')}`
    )
  }

  const validVisibility = ['public', 'private']
  if (!validVisibility.includes(tool.visibility)) {
    throw new Error(
      `[tools/${file}] invalid visibility: ${tool.visibility}. Must be one of: ${validVisibility.join(', ')}`
    )
  }

  if (!Array.isArray(tool.category) || tool.category.length === 0) {
    throw new Error(`[tools/${file}] category must be a non-empty array`)
  }

  if (!Array.isArray(tool.tags) || tool.tags.length === 0) {
    throw new Error(`[tools/${file}] tags must be a non-empty array`)
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!datePattern.test(tool.launched)) {
    throw new Error(
      `[tools/${file}] launched date must be YYYY-MM-DD, got: ${tool.launched}`
    )
  }

  const launchedDate = new Date(tool.launched)
  if (isNaN(launchedDate.getTime())) {
    throw new Error(`[tools/${file}] launched date is invalid`)
  }

  try {
    new URL(tool.liveUrl)
  } catch {
    throw new Error(`[tools/${file}] liveUrl is not a valid URL`)
  }

  try {
    new URL(tool.github)
  } catch {
    throw new Error(`[tools/${file}] github is not a valid URL`)
  }

  if (tool.farcaster) {
    try {
      new URL(tool.farcaster)
    } catch {
      throw new Error(`[tools/${file}] farcaster is not a valid URL`)
    }
  }
}

/**
 * Loads and validates all tool files
 * Safe for Next.js build-time static generation (Vercel compatible)
 */
export async function loadTools() {
  if (!fs.existsSync(toolsDir)) {
    console.warn('⚠️  tools/ directory not found')
    return []
  }

  const files = fs.readdirSync(toolsDir)
  const slugs = new Set()
  const tools = []

  for (const file of files) {
    if (!file.endsWith('.js') || file.startsWith('_')) continue

    const filePath = path.join(toolsDir, file)
    const fileUrl = pathToFileURL(filePath).href

    try {
      const module = await import(fileUrl)
      const tool = module.default ?? module

      tool.slug = tool.slug || file.replace('.js', '')

      validateTool(tool, file)

      if (slugs.has(tool.slug)) {
        throw new Error(`[tools/${file}] duplicate slug: ${tool.slug}`)
      }

      slugs.add(tool.slug)
      tools.push(tool)
    } catch (err) {
      console.error(`❌ Error loading tools/${file}: ${err.message}`)
      if (process.env.NODE_ENV === 'production') {
        throw err
      }
    }
  }

  const publicTools = tools
    .filter(t => t.visibility !== 'private')
    .sort((a, b) => new Date(b.launched) - new Date(a.launched))

  const featured = publicTools.filter(t => t.featured === true)
  const regular = publicTools.filter(t => t.featured !== true)

  const sorted = [...featured, ...regular]

  const withSerials = sorted.map((tool, index) => ({
    ...tool,
    serial: index + 1,
  }))

  console.log(`✅ Loaded ${withSerials.length} tools (${featured.length} featured)`)

  return withSerials
}
