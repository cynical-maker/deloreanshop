import { pesos } from '../utils/formato.js'

function TarjetaProducto({ producto, onVerDetalle }) {
  return (
    <button
      onClick={() => onVerDetalle(producto)}
      className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full transition duration-300 group-hover:scale-105"
        />
        {producto.nuevo && (
          <span className="absolute top-3 left-3 rounded-full bg-fuego-500 px-3 py-1 text-xs font-bold text-white">
            Nuevo
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[10px] font-semibold tracking-wide text-flux-600 uppercase sm:text-xs">
          {producto.categoria}
        </p>
        <h3 className="mt-1 text-sm font-bold text-acero-900 sm:text-base">{producto.nombre}</h3>
        <p className="mt-1 text-sm font-semibold sm:text-lg">{pesos(producto.precio)}</p>
      </div>
    </button>
  )
}

export default TarjetaProducto
