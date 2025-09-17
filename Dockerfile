# Use a imagem oficial do Node.js como base
FROM node:20  AS development

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo de dependências para o container (para aproveitar o cache)
COPY package.json pnpm-lock.yaml ./

# Instala as dependências da aplicação com pnpm
RUN pnpm install --frozen-lockfile

# Copia os arquivos da aplicação para o container
COPY . .

# Compila a aplicação NestJS
RUN pnpm run build

# Use a imagem oficial do Node.js como base
FROM node:20  AS production

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

# Copia os arquivos da aplicação para o container
EXPOSE ${APP_PORT}

# Compila a aplicação NestJS
CMD [ "node", "dist/main" ]
