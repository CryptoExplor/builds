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
          // Read and evaluate the file directly
          const filePath = path.join(toolsDir, file)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          
          // Simple parser: extract the default export object
          // Match: export default { ... }
          const match = fileContent.match(/export\s+default\s+({[\s\S]*?});?\s*$/m)
          
          if (!match) {
            console.error(`Could not parse ${file}: No default export found`)
            return null
          }

          // Safely evaluate the object
          const tool = eval(`(${match[1]})`)
          
          return {
            ...tool,
            slug: tool.slug || file.replace('.js', '')
          }
        } catch (err) {
          console.error(`Error loading tool ${file}:`, err.message)
          return null
        }
      })
      .filter(Boolean)
      .filter(t => t.visibility !== 'private')
      .sort((a, b) => new Date(b.launched) - new Date(a.launched))
      .map((tool, index) => ({
        ...tool,
        serial: index + 1,
      }))

    return tools
  } catch (error) {
    console.error('Error loading tools:', error)
    return []
  }
}
