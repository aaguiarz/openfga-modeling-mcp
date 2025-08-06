# OpenFGA Modeling MCP Server

A specialized MCP (Model Context Protocol) server that provides expert-level OpenFGA authorization modeling guidance. Get instant access to comprehensive OpenFGA knowledge directly in VS Code through our hosted Railway deployment.

## 🚀 **Quick Start - Use Immediately**

**No installation required!** Connect directly to our hosted server:

### 1. **Configure Your MCP Client**

#### VS Code MCP Extensions
Add this configuration to your VS Code MCP settings:

```json
{
  "mcpServers": {
    "openfga-mcp": {
      "url": "https://mcp.openfga.dev/mcp",
      "type": "http",
      "description": "OpenFGA Authorization Model Context Provider"
    }
  }
}
```

### 2. **Start Using**

Some possible prompts:

```
"Create an authorization model for a document management system"
"Create an authorization model for <Company Name>"
"Create an authorization model for <Website>"
"Add support for custom roles"
"Add support for temporary access at the document level"
"Split the model in modular models"
```

The server automatically provides expert context - no `@mcp` calls needed!

## 🎯 **Key Features**

- **🚨 OpenFGA Expert Context**: Mandatory guidance for all authorization modeling questions
- **🔍 Intelligent Detection**: Automatically recognizes 31+ OpenFGA-specific patterns
- **📚 Expert Knowledge**: 600+ lines of comprehensive OpenFGA modeling documentation
- **⚡ Instant Access**: Cloud-hosted on Railway for zero-setup usage
- **🛠️ Production Ready**: TypeScript implementation with comprehensive logging
- **🔧 VS Code Native**: Seamless GitHub Copilot integration

## 🌐 **Railway Deployment**

Our production server is hosted on Railway for reliable, instant access:

- **Production URL**: https://mcp.openfga.dev
- **MCP Endpoint**: https://omcp.openfga.dev/mcp
- **Health Check**: https://mcp.openfga.dev/health
- **Protocol**: MCP Streamable HTTP (2025-03-26)

**Benefits:**
- ✅ Zero-downtime deployments
- ✅ Automatic SSL/HTTPS
- ✅ CORS enabled for browser clients
- ✅ High availability with load balancing
- ✅ Always up-to-date with latest OpenFGA guidance

### Test Connection
```bash
# Health check
curl https://mcp.openfga.dev/health

# MCP endpoint test
curl -H "Accept: text/event-stream" \
     https://mcp.openfga.dev/mcp
```

## � **Automatic OpenFGA Detection**

The server automatically triggers expert context for queries containing:

### Core OpenFGA Terms
- `openfga`, `zanzibar`, `rebac`, `fga`
- `authorization model`, `auth model`, `access control`
- `relationship tuple`, `user relation object`
- `permission check`, `can user`, `access check`

### Authorization Concepts  
- `rbac`, `abac`, `permission`, `role based`
- `attribute based`, `fine grained access control`
- `relationship based access control`

### Technical Implementation
- `openfga dsl`, `openfga schema`, `openfga relations`
- `openfga types`, `authorization tuple`

## �️ **Available Tools**

### 1. `get_context_for_query`
Analyzes queries and returns relevant OpenFGA context.

**Parameters:**
- `query` (string): The query to analyze for OpenFGA patterns

**Example queries:**
- "Create an authorization model for a document management system"
- "Add support for customer roles at the organization level"
- "Split the model in modules"
- "Add support for temporal access for documents"

### 2. `list_available_contexts`
Lists all available OpenFGA context prompts and their trigger patterns.

## 📚 **Supported Context Areas**

1. **Authorization Model Design** - Complete guidance for creating OpenFGA models, DSL syntax, and type definitions
2. **Relationship Modeling** - Expert patterns for defining user-object relationships and permissions
3. **Zanzibar Concepts** - Deep understanding of Google's Zanzibar paper and ReBAC principles
4. **Testing & Validation** - Best practices for testing authorization models and relationship tuples

## 🏗️ **Local Development (Optional)**

If you want to run locally or contribute:

```bash
# Clone and setup
git clone https://github.com/aaguiarz/openfga-modeling-mcp.git
cd openfga-modeling-mcp
npm install
npm run build

# Development mode
npm run dev

# Enable debug logging
LOG_LEVEL=DEBUG npm run dev
```

### Local VS Code Configuration
```json
{
  "mcpServers": {
    "openfga-context": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/absolute/path/to/openfga-modeling-mcp"
    }
  }
}
```

## 🔬 **Technical Details**

- **Framework**: Model Context Protocol (MCP) SDK
- **Language**: TypeScript with ES2022 target
- **Transport**: HTTP for production, STDIO for local development
- **Pattern Engine**: Custom rule-based OpenFGA query matching
- **Logging**: Structured logging with performance metrics

### Project Structure
```
openfga-modeling-mcp/
├── src/
│   ├── index.ts              # Main MCP server implementation
│   ├── prompt-matcher.ts     # OpenFGA pattern matching engine
│   └── logger.ts             # Comprehensive logging system
├── prompts/
│   └── authorization-model.md # OpenFGA expert guidance (600+ lines)
├── dist/                     # Compiled JavaScript output
└── package.json              # Project dependencies and scripts
```

## 📄 **License**

MIT License - see LICENSE file for details

## 🔗 **Related Resources**

- [OpenFGA Documentation](https://openfga.dev)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [VS Code MCP Extensions](https://marketplace.visualstudio.com/search?term=mcp)
- [Zanzibar Paper](https://research.google/pubs/pub48190/)

---

**🚨 Note**: This MCP server is exclusively designed for OpenFGA authorization modeling workflows and automatically provides expert guidance for all OpenFGA, Zanzibar, and ReBAC development questions.
