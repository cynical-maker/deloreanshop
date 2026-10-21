import { useEffect, useState } from 'react'
import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import Filtros from './components/Filtros.jsx'
import ListaProductos from './components/ListaProductos.jsx'
import DetalleProducto from './components/DetalleProducto.jsx'
import Carrito from './components/Carrito.jsx'
import FormularioPedido from './components/FormularioPedido.jsx'
import Aviso from './components/Aviso.jsx'
import PiePagina from './components/PiePagina.jsx'

function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem('deloreanshop-carrito')) ?? []
  } catch {
    return []
  }
}

function App() {
  const [ruta, setRuta] = useState(window.location.hash)
  const [productos, setProductos] = useState([])
  const [categoria, setCategoria] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('')
  const [detalle, setDetalle] = useState(null)
  const [carrito, setCarrito] = useState(leerCarrito)
  const [verCarrito, setVerCarrito] = useState(false)
  const [verPedido, setVerPedido] = useState(false)
  const [aviso, setAviso] = useState('')

  const enCatalogo = ruta === '#/catalogo'

  // Cambia de página cuando cambia el # de la dirección
  useEffect(() => {
    const cambiar = () => {
      setRuta(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', cambiar)
    return () => window.removeEventListener('hashchange', cambiar)
  }, [])

  useEffect(() => {
    fetch('/productos.json').then((r) => r.json()).then(setProductos)
  }, [])

  useEffect(() => {
    localStorage.setItem('deloreanshop-carrito', JSON.stringify(carrito))
  }, [carrito])

  const visibles = productos
    .filter((p) => categoria === 'todos' || p.categoria === categoria)
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => (orden === 'menor' ? a.precio - b.precio : orden === 'mayor' ? b.precio - a.precio : 0))

  function agregar(producto, opcion) {
    const clave = `${producto.id}-${opcion}`
    setCarrito((actual) =>
      actual.some((i) => i.clave === clave)
        ? actual.map((i) => (i.clave === clave ? { ...i, cantidad: i.cantidad + 1 } : i))
        : [...actual, { clave, id: producto.id, nombre: producto.nombre, imagen: producto.imagen, precio: producto.precio, opcion, cantidad: 1 }],
    )
    setDetalle(null)
    setAviso(`${producto.nombre} se agregó al garaje`)
    setTimeout(() => setAviso(''), 2000)
  }

  function cambiarCantidad(clave, delta) {
    setCarrito((a) => a.map((i) => (i.clave === clave ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i)))
  }

  return (
    <div className="min-h-screen bg-acero-50 text-acero-900">
      <Encabezado
        cantidad={carrito.reduce((s, i) => s + i.cantidad, 0)}
        onAbrirCarrito={() => setVerCarrito(true)}
        transparente={!enCatalogo}
      />

      {enCatalogo ? (
        <main className="mx-auto max-w-6xl px-4 pt-28 pb-16">
          <h1 className="font-titulo text-3xl text-acero-900">Catálogo</h1>
          <Filtros categoria={categoria} busqueda={busqueda} orden={orden} onCategoria={setCategoria} onBusqueda={setBusqueda} onOrden={setOrden} />
          <ListaProductos productos={visibles} onVerDetalle={setDetalle} />
        </main>
      ) : (
        <Portada />
      )}

      <PiePagina />

      {detalle && <DetalleProducto producto={detalle} onAgregar={agregar} onCerrar={() => setDetalle(null)} />}
      {verCarrito && (
        <Carrito
          items={carrito}
          onCambiarCantidad={cambiarCantidad}
          onQuitar={(clave) => setCarrito((a) => a.filter((i) => i.clave !== clave))}
          onPedir={() => { setVerCarrito(false); setVerPedido(true) }}
          onCerrar={() => setVerCarrito(false)}
        />
      )}
      {verPedido && <FormularioPedido items={carrito} onCerrar={() => setVerPedido(false)} onEnviado={() => setCarrito([])} />}
      <Aviso mensaje={aviso} />
    </div>
  )
}

export default App