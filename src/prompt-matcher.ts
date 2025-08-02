import { promises as fs } from 'fs';
import path from 'path';

export interface PromptRule {
  patterns: string[];
  promptFile: string;
  description: string;
}

export class PromptMatcher {
  private rules: PromptRule[] = [
    {
      patterns: [
        'authorization model',
        'auth model',
        'access control',
        'rbac',
        'abac',
        'permission',
        'role based',
        'attribute based',
        'authentication',
        'auth',
        'security model',
        'openfga',
        'openfga model',
        'openfga authorization',
        'openfga auth',
        'openfga dsl',
        'openfga schema',
        'openfga relations',
        'openfga types',
        'zanzibar',
        'relationship based access control',
        'rebac',
        'fine grained access control',
        'fga',
        'tuple',
        'relationship tuple',
        'authorization tuple',
        'user relation object',
        'permission check',
        'can user',
        'access check'
      ],
      promptFile: 'authorization-model.md',
      description: 'Author authorization models with OpenFGA'
    }
   
  ];

  /**
   * Find the best matching prompt based on the query
   */
  public findBestMatch(query: string): PromptRule | null {
    const lowercaseQuery = query.toLowerCase();
    console.error(`[DEBUG] Matching query: "${query}"`);
    
    // Look for exact matches first
    for (const rule of this.rules) {
      for (const pattern of rule.patterns) {
        if (lowercaseQuery.includes(pattern.toLowerCase())) {
          console.error(`[DEBUG] Pattern match found: "${pattern}" -> ${rule.promptFile}`);
          return rule;
        }
      }
    }
    
    console.error(`[DEBUG] No pattern match found for query: "${query}"`);
    return null;
  }

  /**
   * Get all available rules
   */
  public getAllRules(): PromptRule[] {
    return [...this.rules];
  }

  /**
   * Load prompt content from file
   */
  public async loadPromptContent(promptFile: string): Promise<string> {
    const promptsDir = path.join(process.cwd(), 'prompts');
    const filePath = path.join(promptsDir, promptFile);
    
    console.error(`[DEBUG] Loading prompt file: ${filePath}`);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      console.error(`[DEBUG] Successfully loaded prompt file: ${promptFile} (${content.length} chars)`);
      return content;
    } catch (error) {
      console.error(`[ERROR] Failed to load prompt file ${promptFile}:`, error);
      throw new Error(`Failed to load prompt file ${promptFile}: ${error}`);
    }
  }

  /**
   * Get context for a query
   */
  public async getContextForQuery(query: string): Promise<{
    rule: PromptRule | null;
    content: string | null;
    matchFound: boolean;
  }> {
    const rule = this.findBestMatch(query);
    
    if (!rule) {
      return {
        rule: null,
        content: null,
        matchFound: false
      };
    }

    try {
      const content = await this.loadPromptContent(rule.promptFile);
      return {
        rule,
        content,
        matchFound: true
      };
    } catch (error) {
      throw new Error(`Error loading context: ${error}`);
    }
  }
}
