import { type DocassembleInterview } from './types.js';

export const createDocassembleInterview = (interviewId: string) => {};

export type DocassembleClientContext = {
  fetch: typeof fetch;
  apiUrl: string;
  apiKey: string;
};

export class DocassembleClient {
  constructor(private ctx: DocassembleClientContext) {}

  async getInterviews() {
    const result = await this.makeRequest<{ items: DocassembleInterview[] }>(
      'interviews',
      'GET'
    );
    if (!result.ok) {
      return result;
    } else {
      return {
        ok: true as const,
        value: result.value.items,
      };
    }
  }

  addPackage(githubUrl: string, branch: string) {
    return this.makeRequest('package', 'POST', {
      github_url: githubUrl,
      branch,
    });
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'POST' | 'GET',
    payload?: any
  ) {
    const result = await this.ctx.fetch(`${this.ctx.apiUrl}/api/${endpoint}`, {
      method,
      headers: {
        'X-API-Key': this.ctx.apiKey,
      },
      body: JSON.stringify(payload),
    });
    if (result.status !== 200) {
      const error = await result.text();
      const statusText = result.statusText;
      return {
        ok: false as const,
        error: `[${result.status}] ${statusText}: ${error}`,
      };
    }
    return {
      ok: true as const,
      value: (await result.json()) as T,
    };
  }
}
