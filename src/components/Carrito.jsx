import { pesos } from '../utils/formato.js'

function Carrito({ items, onCambiarCantidad, onQuitar, onPedir, onCerrar }) {
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0)
  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onCerrar}>
      <aside
        className="ml-auto flex h-full w-full max-w-md flex-col bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-titulo text-2xl text-acero-900">Tu garaje</h2>
          <button onClick={onCerrar} className="text-2xl leading-none" aria-label="Cerrar">×</button>
        </div>
        <div className="mt-4 flex-1 overflow-y-auto">
          {items.length === 0 && <p className="text-acero-700">Aún no has agregado ningún DeLorean.</p>}
          {items.map((i) => (
            <div key={i.clave} className="flex gap-3 border-b border-acero-200 py-3">
              <img src={i.imagen} alt="" className="w-20 rounded-lg" />
              <div className="flex-1 text-sm">
                <p className="font-semibold">{i.nombre}</p>
                <p className="text-acero-700">{i.opcion}</p>
                <p className="font-semibold">{pesos(i.precio * i.cantidad)}</p>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={() => onCambiarCantidad(i.clave, -1)} className="h-7 w-7 rounded-full border">−</button>
                  <span>{i.cantidad}</span>
                  <button onClick={() => onCambiarCantidad(i.clave, 1)} className="h-7 w-7 rounded-full border">+</button>
                  <button onClick={() => onQuitar(i.clave)} className="ml-auto text-red-600">Quitar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-lg font-bold">Total: {pesos(total)}</p>
        <button
          disabled={items.length === 0}
          onClick={onPedir}
          className="mt-3 rounded-full bg-fuego-500 py-3 font-semibold text-white hover:bg-fuego-600 disabled:opacity-40"
        >
          Hacer pedido
        </button>
      </aside>
    </div>
  )
}
export default Carrito
