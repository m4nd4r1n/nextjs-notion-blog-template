# nextjs-notion-blog-template

A [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) blog template, based on [Next.js App Router](https://nextjs.org/docs/app) and using [react-notion-x](https://github.com/NotionX/react-notion-x) to render notion posts.

Inspired by [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog), [Nobelium](https://github.com/craigary/nobelium).

## Quick Start

### Vercel

1. Duplicate [notion template](https://notion.so/7c9b63b3dc8a4bf0a168a0fc81bff5a8), publish to web.
2. Fork this repo
3. Personalize `blog.config.ts`
4. Deploy on [Vercel](https://vercel.com), set environment variables (see [.env.example](https://github.com/m4nd4r1n/blog/blob/main/.env.example) for what environment variables you need to set).

### Docker

1. Duplicate [notion template](https://notion.so/7c9b63b3dc8a4bf0a168a0fc81bff5a8), publish to web.
2. Clone this repo
3. Personalize `blog.config.ts`
4. Setup environment variables
   ```
   cp .env.example .env.local
   ```
   Then fill the variables in `.env.local`.
5. Set env
   ```
   export NOTION_PAGE_ID=xxx # your Page ID
   ```
6. Build
   ```
   docker build -t nextjs-notion-blog:latest --build-arg NOTION_PAGE_ID .
   ```
7. Run
   ```
   docker run -d --name nextjs-notion-blog -p 3000:3000 --env-file .env.local nextjs-notion-blog:latest
   ```
