import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const toolsDirectory = path.join(__dirname, '..', 'tools');

export function loadTools() {
  // Read all files in the tools directory
  const filenames = fs.readdirSync(toolsDirectory);
  
  // Process each tool file
  const tools = filenames
    .filter(filename => filename.endsWith('.js'))
    .map(filename => {
      // Dynamically import the tool module
      const toolPath = path.join(toolsDirectory, filename);
      // Use dynamic require for server-side rendering
      const toolModule = require(toolPath);
      return {
        ...toolModule.default,
        slug: filename.replace('.js', '')
      };
    });
  
  return tools.sort((a, b) => a.serial - b.serial); // Sort by serial number
}