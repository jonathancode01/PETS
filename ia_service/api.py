from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from modelo_ia import analisar_descricao

app = FastAPI()

class DescricaoInput(BaseModel):
    descricao: str

@app.post("/predict")
def predict(input: DescricaoInput):
    status = analisar_descricao(input.descricao)
    return {"status": status}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)