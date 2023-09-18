import { DocassembleInterview } from './types';

export const createDocassembleInterview = (interviewId: string) => {};

export type DocassembleClientContext = {
  apiUrl: string;
  apiKey: string;
};

export class DocassembleClient {
  constructor(private ctx: DocassembleClientContext) {}

  getInterviews = () => {
    return fetch(`${this.ctx.apiUrl}/api/interviews`, {
      headers: {
        'X-API-Key': this.ctx.apiKey,
      },
    })
      .then(response => response.json())
      .then(data => {
        return {
          ok: true,
          interviews: data.items as DocassembleInterview[],
        };
      })
      .catch(error => {
        return {
          ok: false,
          error: error.message,
        };
      });
  };
}
