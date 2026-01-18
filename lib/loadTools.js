import fs from 'fs'
import path from 'path'

const toolsDir = path.join(process.cwd(), 'tools')

/**
 * Validates a tool object against the required schema
 * @param {Object} tool - Tool object to validate
 * @param {string} file - Filename for error messages
 * @throws {Error} If validation fails
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
    'launched'
  ]

  // Check required fields
  for (const key of required) {
    if (!tool[key]) {
      throw new Error(`[tools/${file}] missing required field: ${key}`)
    }
  }

  // Validate status
  const validStatuses = ['alpha', 'beta', 'production', 'paused']
  if (!validStatuses.includes(tool.status)) {
    throw new Error(`[tools/${file}] invalid status: ${tool.status}. Must be one of: ${validStatuses.join(', ')}`)
  }

  // Validate visibility
  const validVisibility = ['public', 'private']
  if (!validVisibility.includes(tool.visibility)) {
    throw new Error(`[tools/${file}] invalid visibility: ${tool.visibility}. Must be one of: ${validVisibility.join(', ')}`)
  }

  // Validate arrays
  if (!Array.isArray(tool.category) || tool.category.length === 0) {
    throw new Error(`[tools/${file}] category must be a non-empty array`)
  }

  if (!Array.isArray(tool.tags) || tool.tags.length === 0) {
    throw new Error(`[tools/${file}] tags must be a non-empty array`)
  }

  // Validate date format (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!datePattern.test(tool.launched)) {
    throw new Error(`[tools/${file}] launched date must be in YYYY-MM-DD format, got: ${tool.launched}`)
  }

  // Validate date is valid
  const launchedDate = new Date(tool.launched)
  if (isNaN(launchedDate.getTime())) {
    throw new Error(`[tools/${file}] launched date is invalid: ${tool.launched}`)
  }

  // Validate URLs
  try {
    new URL(tool.liveUrl)
  } catch (e) {
    throw new Error(`[tools/${file}] liveUrl is not a valid URL: ${tool.liveUrl}`)
  }

  try {
    new URL(tool.github)
  } catch (e) {
    throw new Error(`[tools/${file}] github is not a valid URL: ${tool.github}`)
  }

  // Validate optional Farcaster URL if present
  if (tool.farcaster) {
    try {
      new URL(tool.farcaster)
    } catch (e) {
      throw new Error(`[tools/${file}] farcaster is not a valid URL: ${tool.farcaster}`)
    }
  }
}

/**
 * Loads and validates all tool files from the tools directory
 * @returns {Array} Array of validated tool objects
 */
export async function loadTools() {
  try {
    // Check if tools directory exists
    if (!fs.existsSync(toolsDir)) {
      console.warn('⚠️  Tools directory not found')
      return []
    }

    const files = fs.readdirSync(toolsDir)
    const slugs = new Set()
    const tools = []

    for (const file of files) {
      // Skip non-JS files and template
      if (!file.endsWith('.js') || file.startsWith('_')) continue

      try {
        // Safe import instead of eval
        const filePath = path.join(toolsDir, file)
        const toolModule = await import(filePath)
        const tool = toolModule.default || toolModule

        // Add slug from filename if not present
        tool.slug = tool.slug || file.replace('.js', '')

        // Validate the tool
        validateTool(tool, file)

        // Check for duplicate slugs
        if (slugs.has(tool.slug)) {
          throw new Error(`[tools/${file}] Duplicate slug detected: ${tool.slug}`)
        }
        slugs.add(tool.slug)

        tools.push(tool)

      } catch (err) {
        console.error(`Error loading tool ${file}:`, err.message)
        // In development, continue; in production, throw
        if (process.env.NODE_ENV === 'production') {
          throw err
        }
      }
    }

    // Filter out private tools
    const publicTools = tools.filter(t => t.visibility !== 'private')

    // Sort by launch date (newest first)
    publicTools.sort((a, b) => new Date(b.launched) - new Date(a.launched))

    // Separate featured and non-featured
    const featured = publicTools.filter(t => t.featured === true)
    const regular = publicTools.filter(t => t.featured !== true)

    // Combine: featured first, then regular
    const sorted = [...featured, ...regular]

    // Add serial numbers
    const withSerials = sorted.map((tool, index) => ({
      ...tool,
      serial: index + 1,
    }))

    console.log(`✅ Loaded ${withSerials.length} tools (${featured.length} featured)`)

    return withSerials

  } catch (error) {
    console.error('❌ Error loading tools:', error)
    if (process.env.NODE_ENV === 'production') {
      throw error
    }
    return []
  }
}

// For non-async contexts (backwards compatibility)
export function loadToolsSync() {
  // This is a temporary sync wrapper for generateStaticParams
  // You should migrate to async loadTools() everywhere
  const Module = require('module')
  const originalRequire = Module.prototype.require

  const tools = []
  const slugs = new Set()
  const files = fs.readdirSync(toolsDir)

  for (const file of files) {
    if (!file.endsWith('.js') || file.startsWith('_')) continue

    try {
      const filePath = path.join(toolsDir, file)
      delete require.cache[require.resolve(filePath)]
      const tool = require(filePath).default || require(filePath)

      tool.slug = tool.slug || file.replace('.js', '')
      validateTool(tool, file)

      if (slugs.has(tool.slug)) {
        throw new Error(`[tools/${file}] Duplicate slug detected: ${tool.slug}`)
      }
      slugs.add(tool.slug)
      tools.push(tool)
    } catch (err) {
      console.error(`Error loading tool ${file}:`, err.message)
      if (process.env.NODE_ENV === 'production') throw err
    }
  }

  const publicTools = tools.filter(t => t.visibility !== 'private')
  publicTools.sort((a, b) => new Date(b.launched) - new Date(a.launched))

  const featured = publicTools.filter(t => t.featured === true)
  const regular = publicTools.filter(t => t.featured !== true)
  const sorted = [...featured, ...regular]

  return sorted.map((tool, index) => ({ ...tool, serial: index + 1 }))
}
