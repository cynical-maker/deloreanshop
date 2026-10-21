import TarjetaProducto from './TarjetaProducto.jsx'

function ListaProductos({ productos, onVerDetalle }) {
  if (productos.length === 0) {
    return <p className="mt-10 text-center text-acero-700">No hay modelos con esos filtros.</p>
  }
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
      {productos.map((p) => (
        <TarjetaProducto key={p.id} producto={p} onVerDetalle={onVerDetalle} />
      ))}
    </div>
  )
}
export default ListaProductos
