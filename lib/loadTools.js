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
 * Import all tool files using static imports
 * IMPORTANT: When you add a new tool, add it to this object
 * This is required for Next.js/Vercel bundling to work correctly
 */
function importAllTools() {
  const toolModules = {
    'farmlabs.js': require('../tools/farmlabs.js'),
    'tempo.js': require('../tools/tempo.js'),
    'celonft.js': require('../tools/celonft.js'),
    'circle-faucet.js': require('../tools/circle-faucet.js'),
    'github-bot.js': require('../tools/github-bot.js'),
    'nexus-counter.js': require('../tools/nexus-counter.js'),
    'weather-app.js': require('../tools/weather-app.js'),
    'stacks-tipjar.js': require('../tools/stacks-tipjar.js'),
    'intuition-counter.js': require('../tools/intuition-counter.js'),
    'celo-simulator.js': require('../tools/celo-simulator.js'),
    'solayer-faucet.js': require('../tools/solayer-faucet.js'),
    // ADD NEW TOOLS HERE:
    // 'my-new-tool.js': require('../tools/my-new-tool.js'),
  }

  return toolModules
}

/**
 * Loads and validates all tool files
 * Safe for Next.js build-time static generation on Vercel
 * @returns {Array} Array of validated tool objects
 */
export function loadTools() {
  try {
    const toolModules = importAllTools()
    const slugs = new Set()
    const tools = []

    for (const [filename, toolModule] of Object.entries(toolModules)) {
      // Skip template files
      if (filename.startsWith('_')) continue

      try {
        const tool = toolModule.default || toolModule

        // Add slug from filename if not present
        tool.slug = tool.slug || filename.replace('.js', '')

        // Validate the tool
        validateTool(tool, filename)

        // Check for duplicate slugs
        if (slugs.has(tool.slug)) {
          throw new Error(`[tools/${filename}] Duplicate slug detected: ${tool.slug}`)
        }
        slugs.add(tool.slug)

        tools.push(tool)

      } catch (err) {
        console.error(`Error loading tool ${filename}:`, err.message)
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
