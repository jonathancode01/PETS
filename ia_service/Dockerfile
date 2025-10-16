# Usar uma imagem base do Python
FROM python:3.9-slim

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo de dependências e instalar
COPY requirements.txt .


RUN pip install --no-cache-dir -r requirements.txt

# Copiar todos os arquivos da IA para dentro do container
COPY . .

# Expor a porta que a API vai usar
EXPOSE 8000

# Comando para iniciar a API quando o container rodar
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]