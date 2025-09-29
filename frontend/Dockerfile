# Estágio 1: Build da Aplicação com Node.js
# Usamos uma imagem leve do Node baseada em Alpine Linux
FROM node:lts-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala todas as dependências do projeto
RUN npm install

# Copia o resto do código-fonte do projeto para o container
COPY . .

# Executa o script de build, que gera a pasta /dist com os arquivos estáticos
RUN npm run build


# Estágio 2: Servidor de Produção com Nginx
# Usamos uma imagem super leve do Nginx baseada em Alpine
FROM nginx:stable-alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nosso arquivo de configuração personalizado do Nginx (que vamos criar a seguir)
COPY nginx.conf /etc/nginx/conf.d

# Copia os arquivos estáticos gerados no Estágio 1 para a pasta que o Nginx usa para servir sites
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx quando o container rodar
CMD ["nginx", "-g", "daemon off;"]