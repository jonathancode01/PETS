# UNIPET - Hospital Veterinário 24h

## Descrição
Sistema web para triagem inteligente de pets.

## Pré-requisitos
- Docker e Docker Compose instalados.
- Node.js e npm para frontend e backend.

## Como Executar
1. Clone o repositório.
2. No diretório `root/`, execute:
   - `cd frontend && npm install && npm run build`
   - `cd backend && npm install`
   - `cd ia_service && pip install -r requirements.txt`
3. Em `root/`, execute `docker-compose up --build`.
4. Acesse:
   - Formulário: http://localhost:3000
   - Painel: http://localhost:3000/painel

## Scripts
- Frontend: `npm run start` (em dev)
- Backend: `npm run dev`
- IA: `uvicorn api:app --reload`

Este projeto demonstra full-stack com integração de IA, design responsivo e animações.