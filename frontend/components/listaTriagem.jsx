export function listaTriagem ({ triagens }) {

    return (
        <div>
            <h2>Lista de Triagem</h2>
            <table>
                <thead>
                    <tr>
                       <th>Senha</th>
                       <th>Prioridade</th>
                       <th>Hora de Chegada</th>
                    </tr>
                </thead>

                <tbody>
                    {triagens.map((triagem) => (
                        <tr key={triagem.id}>
                            <td>{triagem.senha}</td>
                            <td>{triagem.prioridade}</td>
                            <td>{new Date(triagem.horaChegada).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}