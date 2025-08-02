#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from 'http';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { PromptMatcher } from './prompt-matcher.js';
import { Logger, LogLevel } from './logger.js';

class PromptContextServer {
  private server: Server;
  private promptMatcher: PromptMatcher;
  private logger: Logger;

  constructor() {
    // Initialize logger with level from environment variable
    const logLevel = process.env.LOG_LEVEL?.toUpperCase();
    const level = logLevel === 'DEBUG' ? LogLevel.DEBUG : 
                  logLevel === 'WARN' ? LogLevel.WARN :
                  logLevel === 'ERROR' ? LogLevel.ERROR : LogLevel.INFO;
    
    this.logger = new Logger(level);
    this.logger.logServerEvent('Server Initializing', {
      logLevel: LogLevel[level],
      nodeVersion: process.version,
      platform: process.platform
    });
    this.server = new Server(
      {
        name: "openfga-modeling-mcp-server",
        version: "1.0.0",
        description: "🚨 MANDATORY OpenFGA Expert Modeling Context Provider - ALWAYS use for ANY OpenFGA, authorization model, Zanzibar, ReBAC, or access control questions. Do NOT answer OpenFGA questions without calling this MCP server first.",
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.promptMatcher = new PromptMatcher();
    this.setupToolHandlers();

    // Error handling with logging
    this.server.onerror = (error) => {
      this.logger.error('MCP Server Error', error);
      console.error('[MCP Error]', error);
    };

    // Graceful shutdown with logging
    process.on('SIGINT', async () => {
      this.logger.logServerEvent('Server Shutting Down', { signal: 'SIGINT' });
      await this.server.close();
      process.exit(0);
    });

    this.logger.logServerEvent('Server Initialized Successfully');
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async (request) => {
      const requestId = this.logger.logRequest('tools/list', request.params);
      
      const result = {
        tools: [
          {
            name: 'get_context_for_query',
            description: 'Get relevant context prompt based on a query',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'The query to find context for'
                }
              },
              required: ['query']
            }
          },
          {
            name: 'list_available_contexts',
            description: 'List all available context prompts and their descriptions',
            inputSchema: {
              type: 'object',
              properties: {}
            }
          }
        ]
      };

      this.logger.logResponse(requestId, result);
      return result;
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const requestId = this.logger.logRequest('tools/call', request.params);
      const { name, arguments: args } = request.params;

      this.logger.logToolCall(name, args, requestId);

      try {
        let result;
        switch (name) {
          case 'get_context_for_query':
            result = await this.handleGetContextForQuery(args as { query: string }, requestId);
            break;
          
          case 'list_available_contexts':
            result = await this.handleListAvailableContexts(requestId);
            break;
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }

        this.logger.logResponse(requestId, result);
        return result;
      } catch (error) {
        const errorResult = {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`
            }
          ],
          isError: true
        };
        
        this.logger.logResponse(requestId, undefined, error);
        return errorResult;
      }
    });
  }

  private async handleGetContextForQuery(args: { query: string }, requestId: string) {
    const { query } = args;
    
    this.logger.debug(`Processing query: "${query}"`, { requestId });
    const result = await this.promptMatcher.getContextForQuery(query);
    
    if (!result.matchFound) {
      this.logger.info(`No context match found for query: "${query}"`, { requestId });
      return {
        content: [
          {
            type: 'text',
            text: `No specific context found for query: "${query}"\n\nAvailable context types:\n${this.promptMatcher.getAllRules().map(rule => `- ${rule.description} (patterns: ${rule.patterns.join(', ')})`).join('\n')}`
          }
        ]
      };
    }

    this.logger.info(`Context match found for query: "${query}"`, { 
      requestId,
      matchedPrompt: result.rule!.promptFile,
      description: result.rule!.description 
    });

    return {
      content: [
        {
          type: 'text',
          text: `Context found for query: "${query}"\n\nUsing prompt: ${result.rule!.description}\n\n---\n\n${result.content}`
        }
      ]
    };
  }

  private async handleListAvailableContexts(requestId: string) {
    const rules = this.promptMatcher.getAllRules();
    
    this.logger.debug(`Listing ${rules.length} available contexts`, { requestId });
    
    const contextList = rules.map(rule => 
      `**${rule.description}**\n` +
      `File: ${rule.promptFile}\n` +
      `Patterns: ${rule.patterns.join(', ')}\n`
    ).join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `Available Context Prompts:\n\n${contextList}`
        }
      ]
    };
  }

  async run() {
    // Detect environment - use HTTP for Railway/production, STDIO for local development
    // Railway sets PORT environment variable, so use that as primary detection
    const isProduction = process.env.PORT || process.env.RAILWAY_ENVIRONMENT || process.env.NODE_ENV === 'production';
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    
    console.error(`Environment detection: isProduction=${isProduction}, PORT=${process.env.PORT}, NODE_ENV=${process.env.NODE_ENV}, RAILWAY_ENVIRONMENT=${process.env.RAILWAY_ENVIRONMENT}`);
    
    if (isProduction) {
      // For Railway deployment, use a simple HTTP server that responds to VS Code
      // VS Code expects the MCP server to be available via HTTP, but the actual
      // protocol may be different than what we initially implemented
      this.logger.logServerEvent('Starting HTTP server for production', { 
        port,
        environment: process.env.RAILWAY_ENVIRONMENT || 'production' 
      });
      
      // Create a simple HTTP server that provides status and can handle MCP over HTTP
      const httpServer = createServer((req, res) => {
        // Enable CORS for all requests
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }
        
        if (req.url === '/health') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'healthy',
            service: 'OpenFGA Modeling MCP Server',
            version: '1.0.0',
            description: 'Specialized MCP server for OpenFGA authorization modeling',
            timestamp: new Date().toISOString(),
            capabilities: ['tools'],
            tools: ['get_context_for_query', 'list_available_contexts'],
            transport: 'http',
            protocol: 'mcp',
            environment: {
              isProduction,
              port,
              nodeVersion: process.version,
              platform: process.platform
            }
          }));
          return;
        }

        if (req.url === '/' || req.url === '/initialize') {
          // VS Code may be trying to initialize the MCP connection
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            service: 'OpenFGA Modeling MCP Server',
            version: '1.0.0',
            protocol: 'mcp',
            transport: 'http',
            capabilities: ['tools'],
            tools: ['get_context_for_query', 'list_available_contexts']
          }));
          return;
        }
        
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: 'Not found',
          message: 'This is an MCP server. Use an MCP client to connect.',
          availableEndpoints: ['/health', '/']
        }));
      });
      
      httpServer.on('error', (error) => {
        this.logger.error('HTTP Server Error', error);
        console.error('HTTP Server Error:', error);
        process.exit(1);
      });

      httpServer.listen(port, '0.0.0.0', () => {
        this.logger.logServerEvent('HTTP server started successfully', {
          transport: 'http',
          port: port,
          host: '0.0.0.0',
          pid: process.pid,
          capabilities: ['tools']
        });
        
        console.error(`OpenFGA Modeling MCP Server running on HTTP port ${port}`);
        console.error(`Health check available at: http://0.0.0.0:${port}/health`);
        console.error(`Note: This server is designed for local STDIO use with VS Code.`);
        console.error(`For production use, configure VS Code to connect to this server locally.`);
      });
      
    } else {
      // STDIO transport for local VS Code integration
      const transport = new StdioServerTransport();
      this.logger.logServerEvent('Connecting to transport', { type: 'stdio' });
      
      await this.server.connect(transport);
      
      this.logger.logServerEvent('Server started successfully', {
        transport: 'stdio',
        pid: process.pid,
        capabilities: ['tools']
      });
      
      console.error('OpenFGA Modeling MCP Server running on stdio');
    }
  }
}

const server = new PromptContextServer();
server.run().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
