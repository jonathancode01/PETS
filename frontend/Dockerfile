# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servidor NGINX
FROM nginx:alpine

# Remove configuração padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do React para o NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma config personalizada do NGINX (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
