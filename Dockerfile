FROM node:20-bookworm AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build

RUN apt update && \
  apt install -y git
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm deploy --filter=doj-demo --prod /app/doj-demo
#RUN pnpm deploy --filter=spotlight --prod /app/spotlight

FROM base AS doj-demo

LABEL org.opencontainers.image.description 10x-atj DOJ demo

COPY --from=build /app/doj-demo /app/doj-demo
COPY --from=build /usr/src/app/apps/doj-demo/dist /app/doj-demo/dist
WORKDIR /app/doj-demo

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD [ "node", "./dist/server/entry.mjs" ]

#HEALTHCHECK --interval=5m --timeout=3s \
#  CMD curl -f http://localhost:4321/ || exit 1
