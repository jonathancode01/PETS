// src/components/ListaDePacientes.jsx

export default function ListaDePacientes({ pacientes = [] }) {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg bg-gray-800/50">
      <table className="w-full text-left text-2xl">
        <thead className="bg-brand-blue-dark/50 text-white uppercase tracking-wider">
          <tr>
            <th className="p-5">Tutor</th>
            <th className="p-5">Pet</th>
            <th className="p-5">Espécie</th>
            <th className="p-5 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-blue-dark/30">
          {pacientes.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-transparent' : 'bg-brand-blue-dark/20'}>
              <td className="p-5 font-medium">{item.tutor}</td>
              <td className="p-5">{item.pet}</td>
              <td className="p-5">{item.especie}</td>
              <td className="p-5 text-center">
                <span className={`px-4 py-1 rounded-full font-semibold text-lg ${
                    item.status === 'Aguardando'
                      ? 'bg-brand-green text-brand-dark'
                      : 'bg-brand-pink text-white animate-pulse'
                  }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}