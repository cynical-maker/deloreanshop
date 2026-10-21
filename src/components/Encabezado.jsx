import { useEffect, useState } from 'react'

function Encabezado({ cantidad, onAbrirCarrito, transparente }) {
  const [bajo, setBajo] = useState(false)

  // Detecta si la página ya se desplazó un poco
  useEffect(() => {
    const revisar = () => setBajo(window.scrollY > 60)
    revisar()
    window.addEventListener('scroll', revisar)
    return () => window.removeEventListener('scroll', revisar)
  }, [])

  // Transparente solo en la portada y arriba del todo; en el catálogo siempre oscuro
  const solido = bajo || !transparente

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        solido ? 'bg-acero-900 shadow' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <a href="#/" aria-label="DeloreanSHOP, inicio">
          <img src="/img/logo-cabecera.png" alt="DeloreanSHOP" className="h-8 w-auto md:h-10" />
        </a>
        <button
          onClick={onAbrirCarrito}
          className="rounded-full border-2 border-white bg-transparent px-4 py-2 text-sm font-semibold text-white uppercase transition hover:bg-white hover:text-acero-900"
        >
          Garaje ({cantidad})
        </button>
      </div>
    </header>
  )
}

export default Encabezado