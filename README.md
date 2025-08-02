# OpenFGA Modeling MCP Server

A specialized MCP (Model Context Protocol) server designed exclusively for OpenFGA authorization modeling. This server provides expert-level guidance on OpenFGA concepts, Zanzibar patterns, relationship-based access control (ReBAC), and fine-grained authorization modeling.

## Features

- **🎯 OpenFGA-First Design**: Purpose-built for OpenFGA authorization modeling workflows
- **🔍 Intelligent Pattern Recognition**: Automatically detects 31+ OpenFGA-specific patterns and keywords
- **📚 Expert Knowledge Base**: 600+ lines of comprehensive OpenFGA modeling documentation
- **⚡ Instant Context Switching**: Immediate expert guidance when OpenFGA concepts are mentioned
- **🛠️ Developer-Optimized**: TypeScript implementation with comprehensive logging and debugging
- **🔧 Seamless Integration**: Native VS Code Copilot integration with automatic context triggering

## Supported OpenFGA Context Areas

1. **Authorization Model Design** - Complete guidance for creating OpenFGA models, DSL syntax, and type definitions
2. **Relationship Modeling** - Expert patterns for defining user-object relationships and permissions
3. **Zanzibar Concepts** - Deep understanding of Google's Zanzibar paper and ReBAC principles
4. **Testing & Validation** - Best practices for testing authorization models and relationship tuples

## OpenFGA Expert Auto-Integration

This MCP server is exclusively designed for **OpenFGA authorization modeling** with intelligent auto-detection:

### 🎯 **Automatic OpenFGA Detection**
The server automatically detects OpenFGA-related queries using 31+ patterns:
- `openfga`, `zanzibar`, `rebac`, `fga`
- `authorization model`, `access control`, `permission check`
- `relationship tuple`, `user relation object`, `can user`
- And many more OpenFGA-specific terms

### 🚀 **Usage in VS Code Copilot**
Simply use OpenFGA terminology in your questions:
```
How do I create an OpenFGA authorization model?
Design ReBAC with OpenFGA
OpenFGA JavaScript SDK implementation
What are OpenFGA relationship tuples?
```

The MCP server will automatically provide expert OpenFGA modeling context without needing explicit `@mcp` calls!

## Installation

```bash
# Clone the OpenFGA Modeling MCP Server
git clone <repository-url>
cd mcp-server
npm install
npm run build
```

## Development

```bash
npm run dev
```

### Logging

Enable detailed logging for OpenFGA modeling sessions:
```bash
LOG_LEVEL=DEBUG npm run dev
```

## Usage

The OpenFGA Modeling MCP Server provides two main tools:

### 1. `get_context_for_query`
Analyzes a query and returns relevant context prompt.

**Parameters:**
- `query` (string): The query to analyze

**Example queries:**
- "Create an authorization model for a document management system" 
- "Create an authorization model for <Company Name>" 
- "Create an authorization model for <Company Website>" 
- "Split the model in modules" 
- "Add support for customer roles at the organization level" 
- "Add support for temporal access for documents" 
- "Run all tests and make sure they pass"

### 2. `list_available_contexts`
Lists all available OpenFGA context prompts and their trigger patterns.

## VS Code Integration

To use the OpenFGA Modeling MCP Server with Visual Studio Code:

1. **Install an MCP extension**:
   - `Copilot MCP` (automatalabs.copilot-mcp) - Recommended
   - `MCP Server Runner` (zebradev.mcp-server-runner)
   - `VSCode MCP Server` (semanticworkbenchteam.mcp-server-vscode)

2. **Configure the server** in your VS Code settings:
   ```json
   {
     "mcp.servers": {
       "openfga-modeling": {
         "command": "node",
         "args": ["dist/index.js"],
         "cwd": "/path/to/openfga-modeling-mcp-server"
       }
     }
   }
   ```

3. **Use in Copilot Chat**:
   ```
   @mcp get_context_for_query "Create an OpenFGA authorization model"
   ```

## Adding New OpenFGA Context

1. Create a new markdown file in the `prompts/` directory focused on OpenFGA concepts
2. Add OpenFGA-specific patterns to the `PromptMatcher` class in `src/prompt-matcher.ts`
3. Rebuild the project to include new OpenFGA guidance

Example OpenFGA pattern rule:
```typescript
{
  patterns: ['openfga model', 'authorization model', 'relationship tuple'],
  promptFile: 'openfga-advanced-patterns.md',
  description: 'Advanced OpenFGA modeling patterns and examples'
}
```

## Project Structure

```
openfga-modeling-mcp-server/
├── src/
│   ├── index.ts              # Main OpenFGA MCP server
│   ├── prompt-matcher.ts     # OpenFGA pattern matching logic
│   └── logger.ts             # Comprehensive logging system
├── prompts/
│   └── authorization-model.md # Core OpenFGA modeling guidance (600+ lines)
├── package.json
├── tsconfig.json
└── README.md
```

# OpenFGA Modeling MCP Server

A specialized MCP (Model Context Protocol) server that provides expert-level OpenFGA authorization context for development workflows. This server automatically detects OpenFGA-related queries and delivers comprehensive guidance on authorization modeling, Zanzibar patterns, and fine-grained access control.

## 🎯 Key Features

- **🚨 OpenFGA Expert Context**: Mandatory expert guidance for all OpenFGA, authorization model, Zanzibar, ReBAC, and access control questions
- **🔍 Intelligent Pattern Matching**: Automatically detects 31+ OpenFGA-related patterns and keywords
- **📝 Comprehensive Documentation**: 600+ lines of detailed OpenFGA modeling guidance
- **⚡ Fast Response**: Built-in caching and optimized pattern matching
- **🛠️ Developer-First**: TypeScript implementation with comprehensive logging
- **🔧 VS Code Integration**: Seamless integration with GitHub Copilot and MCP extensions

## 🚀 Automatic OpenFGA Detection

The server automatically triggers expert context for queries containing:

### Core OpenFGA Terms
- `openfga`, `zanzibar`, `rebac`, `fga`
- `authorization model`, `auth model`, `access control`
- `relationship tuple`, `user relation object`
- `permission check`, `can user`, `access check`

### Authorization Concepts  
- `rbac`, `abac`, `permission`, `role based`
- `attribute based`, `authentication`, `security model`
- `fine grained access control`, `relationship based access control`

### Technical Implementation
- `openfga dsl`, `openfga schema`, `openfga relations`
- `openfga types`, `authorization tuple`

## 📦 Installation

```bash
# Clone and setup
git clone <repository-url>
cd mcp-server
npm install
npm run build
```

## 🔧 Development

```bash
# Development mode with hot reload
npm run dev

# Watch mode
npm run watch

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Logging & Debugging

The server includes comprehensive logging capabilities:

```bash
# Enable debug logging
LOG_LEVEL=DEBUG npm run dev

# Available log levels: DEBUG, INFO, WARN, ERROR
LOG_LEVEL=INFO npm run dev
```

**Log Features:**
- Request/response tracking with unique IDs
- Performance timing
- Tool call monitoring
- Resource access logging
- Server event tracking

## 🛠️ MCP Tools

### 1. `get_context_for_query`
**Purpose**: Analyzes queries and returns relevant OpenFGA context

**Parameters:**
- `query` (string): The query to analyze for OpenFGA patterns

**Example Usage:**
```typescript
{
  "tool": "get_context_for_query",
  "arguments": {
    "query": "How do I create an OpenFGA authorization model?"
  }
}
```

**Triggers Expert Context For:**
- "Create an authorization model"
- "OpenFGA relationship tuples" 
- "Zanzibar implementation"
- "ReBAC with OpenFGA"
- "Permission checks"

### 2. `list_available_contexts`
**Purpose**: Lists all available context prompts and their trigger patterns

**Parameters:** None

**Returns:** Complete list of available contexts with descriptions and patterns

## 📚 Resources

The server exposes OpenFGA documentation as MCP resources:

- **URI**: `prompt://authorization-model.md`
- **Content**: 600+ lines of comprehensive OpenFGA guidance
- **Format**: Markdown with examples and best practices

## 🔗 VS Code Integration

### Prerequisites
Install an MCP-compatible extension:
- **Copilot MCP** (`automatalabs.copilot-mcp`) - Recommended
- **MCP Server Runner** (`zebradev.mcp-server-runner`) 
- **VSCode MCP Server** (`semanticworkbenchteam.mcp-server-vscode`)

### Configuration

**Option 1: Using mcp-config.json**
```json
{
  "mcpServers": {
    "openfga-context": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/absolute/path/to/mcp-server"
    }
  }
}
```

**Option 2: VS Code Settings**
```json
{
  "mcp.servers": {
    "openfga-context": {
      "command": "node", 
      "args": ["dist/index.js"],
      "cwd": "/absolute/path/to/mcp-server"
    }
  }
}
```

### Usage in VS Code Copilot

Once configured, simply mention OpenFGA concepts in your questions:

```
"How do I create an OpenFGA authorization model?"
"Design ReBAC patterns with OpenFGA"  
"OpenFGA JavaScript SDK implementation"
"What are relationship tuples in OpenFGA?"
"Help me with Zanzibar-style permissions"
```

The server automatically provides expert context without explicit `@mcp` calls!

## 🏗️ Project Structure

```
openfga-modeling-mcp-server/
├── src/
│   ├── index.ts              # Main OpenFGA MCP server implementation
│   ├── prompt-matcher.ts     # OpenFGA pattern matching and rule engine
│   └── logger.ts             # Comprehensive logging system
├── prompts/
│   └── authorization-model.md # OpenFGA expert guidance (600+ lines)
├── dist/                     # Compiled JavaScript output
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── mcp-config.json           # MCP server configuration
└── USAGE.md                  # Detailed OpenFGA usage examples
```

## 🔬 Technical Details

### Architecture
- **Framework**: Model Context Protocol (MCP) SDK
- **Language**: TypeScript with ES2022 target
- **Transport**: STDIO for VS Code integration
- **Pattern Engine**: Custom rule-based matching system
- **Logging**: Structured logging with performance metrics

### Key Components

1. **PromptContextServer**: Main server class handling MCP protocol for OpenFGA contexts
2. **PromptMatcher**: Intelligent pattern matching specifically for OpenFGA query analysis
3. **Logger**: Comprehensive logging with OpenFGA modeling session tracking
4. **Resource System**: Exposes OpenFGA documentation as MCP resources

### Performance Features
- Lazy loading of OpenFGA prompt content
- In-memory caching of OpenFGA pattern matches
- Optimized string matching algorithms for authorization concepts
- Request ID tracking for OpenFGA modeling session debugging

## 🧪 Testing & Validation

```bash
# Run tests
npm test

# Test with demo queries
npm run demo

# Test MCP integration
npm run mcp-test

# Test OpenFGA scenarios
npm run test-openfga
```

## 📈 Monitoring & Observability

The server provides rich observability through structured logging:

- **Request Tracking**: Unique IDs for each request/response cycle
- **Performance Metrics**: Timing data for all operations
- **Pattern Matching**: Debug info for query analysis
- **Resource Access**: Monitoring of prompt file access
- **Error Handling**: Comprehensive error logging and recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-context`
3. Add new prompt files to `prompts/` directory
4. Update pattern rules in `src/prompt-matcher.ts`
5. Test thoroughly with `npm test`
6. Submit a pull request

### Adding New OpenFGA Context Types

1. Create a new `.md` file in `prompts/` focused on specific OpenFGA concepts
2. Add OpenFGA-related pattern rules to `PromptMatcher.rules`
3. Test pattern matching with various OpenFGA queries
4. Update documentation with new OpenFGA modeling capabilities

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Related Resources

- [OpenFGA Documentation](https://openfga.dev)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [VS Code MCP Extensions](https://marketplace.visualstudio.com/search?term=mcp)
- [Zanzibar Paper](https://research.google/pubs/pub48190/)

---

**🚨 Note**: This MCP server is exclusively designed for OpenFGA authorization modeling workflows and automatically provides expert guidance for all OpenFGA, Zanzibar, and ReBAC development questions.
