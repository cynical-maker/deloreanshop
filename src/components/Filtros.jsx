const CATEGORIAS = [
  ['todos', 'Todos'],
  ['pelicula', 'Película'],
  ['clasico', 'Clásicos'],
  ['Personalizados', 'Personalizados']
]

function Filtros({ categoria, busqueda, orden, onCategoria, onBusqueda, onOrden }) {
  const campo = 'rounded-lg border border-acero-200 bg-white px-3 py-2 text-sm outline-none focus:border-flux-600'
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map(([valor, texto]) => (
          <button
            key={valor}
            onClick={() => onCategoria(valor)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              categoria === valor ? 'bg-acero-900 text-white' : 'bg-white text-acero-700 hover:bg-acero-200'
            }`}
          >
            {texto}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Buscar modelo…"
          className={`${campo} flex-1`}
        />
        <select value={orden} onChange={(e) => onOrden(e.target.value)} className={campo}>
          <option value="">Ordenar</option>
          <option value="menor">Precio: menor a mayor</option>
          <option value="mayor">Precio: mayor a menor</option>
        </select>
      </div>
    </div>
  )
}
export default Filtros
