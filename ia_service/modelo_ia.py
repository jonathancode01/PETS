def analisar_descricao(descricao):
    # Modelo simples baseado em palavras-chave
    palavras_urgentes = ['sangue', 'acidente', 'desmaio', 'emergência']
    palavras_moderadas = ['dor', 'vômito', 'diarreia']
    
    if any(palavra in descricao.lower() for palavra in palavras_urgentes):
        return "Urgente"
    elif any(palavra in descricao.lower() for palavra in palavras_moderadas):
        return "Moderado"
    else:
        return "Normal"
