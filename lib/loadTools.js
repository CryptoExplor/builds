import fs from 'fs'
import path from 'path'

const toolsDir = path.join(process.cwd(), 'tools')

export function loadTools() {
  try {
    const files = fs.readdirSync(toolsDir)

    const tools = files
      .filter(f => f.endsWith('.js'))
      .map(file => {
        // Use require for .js files in Node environment
        const toolPath = path.join(toolsDir, file)
        // Clear require cache for hot reload in dev
        delete require.cache[require.resolve(toolPath)]
        const tool = require(toolPath).default
        
        return {
          ...tool,
          // Override slug from filename if not provided
          slug: tool.slug || file.replace('.js', '')
        }
      })
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