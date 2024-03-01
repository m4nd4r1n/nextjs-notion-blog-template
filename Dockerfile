FROM node:20-slim AS builder
ARG BUN_VERSION=1.0.29
WORKDIR /app
# Install Bun
RUN apt update && apt install -y bash curl unzip && \
 curl https://bun.sh/install | bash -s -- bun-v$BUN_VERSION
ENV PATH="$PATH:/root/.bun/bin"
COPY . .
RUN bun install --frozen-lockfile
ARG NOTION_PAGE_ID
RUN bun run build

FROM node:20-slim
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV NODE_ENV production
CMD ["node", "server.js"]
