# Portafolio — Nelson Ramos

Guía de uso e instalación del portafolio personal.

## Requisitos

- Node.js 16+
- npm o yarn

## Instalación

```bash
git clone https://github.com/nelsonalejandro/portafolio.git
cd portafolio
npm install
```

## Variables de Entorno

El proyecto usa una variable de entorno para la API de Groq (chat asistente).

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
2. Edita `.env` con tu API key de Groq:
   ```env
   VITE_GROQ_API_KEY=tu_api_key_aqui
   ```
3. `.env` está en `.gitignore` y **nunca se sube al repositorio**. Solo se versiona `.env.example`.

Obtén una API key gratuita en [https://console.groq.com](https://console.groq.com).

## Desarrollo

```bash
npm run dev
```

Abrir en `http://localhost:5173`.

## Producción

```bash
npm run build
```

Los archivos generados quedan en `dist/`.

## Contacto

**Nelson Ramos** — Desarrollador Full-Stack

- Email: [nelsonalejandroramosrivera@gmail.com](mailto:nelsonalejandroramosrivera@gmail.com)
- LinkedIn: [linkedin.com/in/nelsonalejandroramosrivera](https://www.linkedin.com/in/nelsonalejandroramosrivera)
- GitHub: [github.com/nelsonalejandro](https://github.com/nelsonalejandro)
- Instagram: [@nelsonalejandroramos](https://www.instagram.com/nelsonalejandroramos)

---

© Copyleft Nelson Ramos — Talca, Chile
