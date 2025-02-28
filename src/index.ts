import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  registerCalculatorTools,
  registerDateTimeTools,
  registerNoteTools
} from './tools/index.js';

// Create an MCP server
const server = new McpServer({
  name: "MCPllmContext",
  version: "1.0.0"
});

// Register all tools
registerCalculatorTools(server);
registerDateTimeTools(server);
registerNoteTools(server);

// Start the server
const start = async () => {
  try {
    console.error("Starting MCP server..."); // This will show in logs
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP server started successfully");
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

start();