# MCP TypeScript Tools Server

A Model Context Protocol (MCP) server implementation in TypeScript that provides various utility tools for LLMs like Claude. This server includes calculator, datetime, and note-taking tools, with an extensible architecture for adding more tools.

## Features

- 🧮 Calculator tool for basic mathematical operations
- 📅 DateTime tool for current date/time in different formats
- 📝 Notes tool for saving and retrieving text notes
- 🔌 Compatible with Claude for Desktop and Cursor
- 🚀 Easy to extend with new tools

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- Claude for Desktop and/or Cursor (for using the tools)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd MCP
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Setting Up with Claude for Desktop

1. Open or create your Claude desktop configuration file:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Add the MCP server configuration:
```json
{
  "mcpServers": {
    "MCPllmContext": {
      "command": "node",
      "args": [
        "ABSOLUTE_PATH_TO_YOUR_PROJECT/dist/index.js"
      ]
    }
  }
}
```
Replace `ABSOLUTE_PATH_TO_YOUR_PROJECT` with the actual path to your project directory.

3. Restart Claude for Desktop
4. Look for the hammer icon in the input box to confirm the tools are available

## Setting Up with Cursor

1. Open Cursor
2. Go to `Cursor Settings` > `Features` > `MCP`
3. Click on `+ Add New MCP Server`
4. Fill in the form:
   - Type: stdio
   - Name: MCPllmContext
   - Command: `node ABSOLUTE_PATH_TO_YOUR_PROJECT/dist/index.js`

## Available Tools

### Calculator
- Tool name: `calculate`
- Description: Evaluates mathematical expressions
- Usage: "Calculate 2 + 2"

### DateTime
- Tool name: `current-date`
- Description: Returns current date/time
- Formats: "short" or "long"
- Usage: "What's today's date?"

### Notes
- Tool name: `save-note`, `get-note`, `list-notes`
- Description: Save and retrieve text notes
- Usage: "Save a note titled 'Meeting' with content 'Discuss project'"

## Adding New Tools

1. Create a new file in `src/tools/` (e.g., `src/tools/myTool.ts`)
2. Implement your tool using the template:
```typescript
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerMyTools(server: McpServer) {
  server.tool(
    "tool-name",
    { 
      param: z.string().describe("Parameter description") 
    },
    async ({ param }) => {
      return {
        content: [{ type: "text", text: "Result" }]
      };
    }
  );
}
```
3. Export your tool in `src/tools/index.ts`
4. Register your tool in `src/index.ts`

## Development

```bash
# Build the project
npm run build

# Run the server directly
node dist/index.js

# Watch for changes (if you have nodemon installed)
nodemon dist/index.js
```

## Troubleshooting

### Claude for Desktop Issues
- Check the logs at `%APPDATA%\Claude\logs\mcp*.log` (Windows) or `~/Library/Logs/Claude/mcp*.log` (macOS)
- Verify the path in `claude_desktop_config.json` is absolute and correct
- Make sure the server is built (`npm run build`)
- Restart Claude for Desktop after configuration changes

### Cursor Issues
- Verify the command path in Cursor's MCP settings
- Try refreshing the tool list in the MCP settings
- Check Cursor's logs for any error messages

