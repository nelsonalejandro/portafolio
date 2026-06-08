const GROQ_API_BASE = 'https://api.groq.com/openai/v1';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B' },
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B' },
];

export class GroqService {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('GROQ_API_KEY no configurada. Define VITE_GROQ_API_KEY en .env');
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
        const response = await fetch(`${GROQ_API_BASE}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
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
            throw new GroqRateLimitError('Límite de solicitudes alcanzado en Groq.');
          }

          if (response.status >= 500 && attempt < maxRetries) {
            await sleep(1000 * attempt);
            continue;
          }

          throw new GroqApiError(`Groq API error (${response.status}): ${text}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || '';

      } catch (err) {
        if (err instanceof GroqRateLimitError || err instanceof GroqApiError) {
          throw err;
        }
        if (attempt === maxRetries) {
          throw new GroqApiError(`Error de conexión con Groq: ${err.message}`);
        }
        await sleep(1000 * attempt);
      }
    }
  }
}

export class GroqApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GroqApiError';
  }
}

export class GroqRateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GroqRateLimitError';
  }
}
