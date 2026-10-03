const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = 'poolside/laguna-s-2.1:free';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const MODELS = [
  { id: 'poolside/laguna-s-2.1:free', name: 'Laguna S 2.1 (Free)' },
  { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B (Free)' }
];

export class OpenRouterService {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY no configurada. Define VITE_OPENROUTER_API_KEY en .env');
    }
    this.apiKey = apiKey;
  }

  async chat(messages, { model = DEFAULT_MODEL, maxRetries = 3 } = {}) {
    const body = {
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    };

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(`${OPENROUTER_API_BASE}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': 'http://localhost:5173', 
            'X-Title': 'Nelson Ramos Portfolio', 
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const text = await response.text().catch(() => '');

          if (response.status === 429) {
            if (attempt < maxRetries) {
              await sleep(Math.min(1000 * Math.pow(2, attempt), 10000));
              continue;
            }
            throw new OpenRouterRateLimitError('Límite de solicitudes alcanzado en OpenRouter.');
          }

          if (response.status >= 500 && attempt < maxRetries) {
            await sleep(1000 * attempt);
            continue;
          }

          throw new OpenRouterApiError(`OpenRouter API error (${response.status}): ${text}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || '';

      } catch (err) {
        if (err instanceof OpenRouterRateLimitError || err instanceof OpenRouterApiError) {
          throw err;
        }
        if (attempt === maxRetries) {
          throw new OpenRouterApiError(`Error de conexión con OpenRouter: ${err.message}`);
        }
        await sleep(1000 * attempt);
      }
    }
  }
}

export class OpenRouterApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OpenRouterApiError';
  }
}

export class OpenRouterRateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OpenRouterRateLimitError';
  }
}
