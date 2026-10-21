import { useState } from 'react'
import { pesos } from '../utils/formato.js'

function DetalleProducto({ producto, onAgregar, onCerrar }) {
  const [opcion, setOpcion] = useState(producto.opciones[0])
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4" onClick={onCerrar}>
      <div
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={producto.imagen} alt={producto.nombre} className="rounded-xl" />
        <h2 className="mt-4 font-titulo text-2xl text-acero-900">{producto.nombre}</h2>
        <p className="mt-1 text-lg font-semibold">{pesos(producto.precio)}</p>
        <p className="mt-3 text-sm text-acero-700">{producto.descripcion}</p>
        <p className="mt-4 text-sm font-semibold">Versión / personalización</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {producto.opciones.map((o) => (
            <button
              key={o}
              onClick={() => setOpcion(o)}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                opcion === o ? 'border-flux-600 bg-flux-500 text-acero-900' : 'border-acero-200 hover:bg-acero-50'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={onCerrar} className="flex-1 rounded-full border border-acero-200 py-3 font-semibold hover:bg-acero-50">
            Cerrar
          </button>
          <button
            onClick={() => onAgregar(producto, opcion)}
            className="flex-1 rounded-full bg-fuego-500 py-3 font-semibold text-white hover:bg-fuego-600"
          >
            Agregar al garaje
          </button>
        </div>
      </div>
    </div>
  )
}
export default DetalleProducto
