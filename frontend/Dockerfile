# Etapa 1: Build da aplicação React (Vite)
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do build do React (dist) para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
