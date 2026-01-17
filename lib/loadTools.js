import fs from 'fs'
import path from 'path'

const toolsDir = path.join(process.cwd(), 'tools')

export function loadTools() {
  try {
    // Check if tools directory exists
    if (!fs.existsSync(toolsDir)) {
      console.warn('Tools directory not found')
      return []
    }

    const files = fs.readdirSync(toolsDir)

    const tools = files
      .filter(f => f.endsWith('.js'))
      .map(file => {
        try {
          // Dynamic import path - this is what causes the warning but it's unavoidable
          const toolPath = path.join(toolsDir, file)
          
          // For production builds, use a more stable require
          const tool = require(toolPath).default
          
          return {
            ...tool,
            // Override slug from filename if not provided
            slug: tool.slug || file.replace('.js', '')
          }
        } catch (err) {
          console.error(`Error loading tool ${file}:`, err.message)
          return null
        }
      })
      .filter(Boolean) // Remove any null entries from failed loads
      .filter(t => t.visibility !== 'private')
      .sort((a, b) => new Date(b.launched) - new Date(a.launched))
      .map((tool, index) => ({
        ...tool,
        // Auto-generate serial numbers
        serial: index + 1,
      }))

    return tools
  } catch (error) {
    console.error('Error loading tools:', error)
    return []
  }
}
