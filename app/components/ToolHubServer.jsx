import { loadTools } from '../../lib/loadTools';
import ToolHubClient from './ToolHubClient';

export default async function ToolHubServer() {
  const tools = await Promise.resolve(loadTools());
  
  return <ToolHubClient tools={tools} />;
}