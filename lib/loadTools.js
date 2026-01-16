import fs from 'fs';
import path from 'path';

const toolsDirectory = path.join(process.cwd(), 'tools');

export async function loadTools() {
  // Read all files in the tools directory
  const filenames = fs.readdirSync(toolsDirectory);
  
  // Process each tool file
  const tools = filenames
    .filter(filename => filename.endsWith('.js'))
    .map(filename => {
      // Dynamically import the tool module
      const toolModule = require(path.join(toolsDirectory, filename));
      return {
        ...toolModule.default,
        slug: filename.replace('.js', '')
      };
    })
    .sort((a, b) => a.serial - b.serial); // Sort by serial number
  
  return tools;
}