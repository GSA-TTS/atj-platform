# base image with Node.js and playwright preinstalled
FROM mcr.microsoft.com/playwright:v1.43.1-jammy as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=test
WORKDIR /srv/apps/atj-platform
COPY . .
RUN corepack enable
RUN pnpm install --filter=@atj/spotlight --filter=@atj/design --frozen-lockfile

FROM base as test
ENV E2E_ENDPOINT=http://localhost:9090
ENV CI=true
RUN npm install -g serve
EXPOSE 9090
EXPOSE 9191
RUN pnpm build --filter=@atj/spotlight --filter=@atj/design
WORKDIR ./e2e
RUN serve ../apps/spotlight/dist -p 9090 & sleep 5; pnpm playwright test;
RUN serve ../packages/design/storybook-static -p 9191 & sleep 5; pnpm --filter=end-to-end-tests test:storybook --url http://localhost:9191 --config-dir ../packages/design/.storybook/ --browsers firefox chromium

FROM base as serve
ENV E2E_ENDPOINT=http://localhost:4321
EXPOSE 4321 9292 9323
CMD ["pnpm", "dev", "--filter=@atj/spotlight", "--", "--host"]