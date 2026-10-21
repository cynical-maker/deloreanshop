import { useState } from 'react'
import { pesos } from '../utils/formato.js'

// Número de WhatsApp de la tienda: 57 (Colombia) + celular, sin espacios
const WHATSAPP_TIENDA = '573171651365'
const estiloCampo = 'rounded-lg border border-acero-200 px-3 py-2 font-normal outline-none focus:border-flux-600'

function FormularioPedido({ items, onCerrar, onEnviado }) {
  const [datos, setDatos] = useState({ nombre: '', celular: '', direccion: '', pago: 'Transferencia bancaria' })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0)

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function validar() {
    const n = {}
    if (datos.nombre.trim().length < 3) n.nombre = 'Escribe tu nombre completo.'
    if (!/^3\d{9}$/.test(datos.celular)) n.celular = 'El celular debe tener 10 dígitos y empezar por 3.'
    if (datos.direccion.trim().length < 5) n.direccion = 'Escribe la ciudad y dirección de entrega.'
    return n
  }

  function enviar(e) {
    e.preventDefault()
    const n = validar()
    setErrores(n)
    if (Object.keys(n).length > 0) return
    const lineas = items.map(
      (i) => `- ${i.cantidad} x ${i.nombre} (${i.opcion}): ${pesos(i.precio * i.cantidad)}`,
    )
    const mensaje = [
      '¡Hola, DeloreanSHOP! Quiero hacer este pedido:',
      ...lineas,
      `Total: ${pesos(total)}`,
      `Nombre: ${datos.nombre}`,
      `Celular: ${datos.celular}`,
      `Dirección: ${datos.direccion}`,
      `Pago: ${datos.pago}`,
    ].join('\n')
    window.open(`https://wa.me/${WHATSAPP_TIENDA}?text=${encodeURIComponent(mensaje)}`, '_blank')
    setEnviado(true)
    onEnviado()
  }

  const campos = [
    ['nombre', 'Nombre completo', 'text', ''],
    ['celular', 'Celular', 'tel', '3171651365'],
    ['direccion', 'Ciudad y dirección', 'text', 'Cartagena, Cra. 3 # 35-20'],
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onCerrar}>
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {enviado ? (
          <div className="py-6 text-center">
            <h2 className="font-titulo text-2xl text-acero-900">¡Pedido enviado!</h2>
            <p className="mt-2 text-acero-700">Se abrió WhatsApp con el resumen. Envía el mensaje y te confirmaremos.</p>
            <button onClick={onCerrar} className="mt-6 rounded-full bg-acero-900 px-6 py-3 font-semibold text-white">
              Seguir viendo coches
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
            <h2 className="font-titulo text-2xl text-acero-900">Datos de entrega</h2>
            <p className="rounded-lg bg-acero-50 p-3 text-sm">
              Total del pedido: <strong>{pesos(total)}</strong>
            </p>
            {campos.map(([name, etiqueta, type, ph]) => (
              <label key={name} className="flex flex-col gap-1 text-sm font-medium">
                {etiqueta}
                <input name={name} type={type} placeholder={ph} value={datos[name]} onChange={cambiar} className={estiloCampo} />
                {errores[name] && <span className="text-red-600">{errores[name]}</span>}
              </label>
            ))}
            <label className="flex flex-col gap-1 text-sm font-medium">
              Forma de pago
              <select name="pago" value={datos.pago} onChange={cambiar} className={estiloCampo}>
                <option>Transferencia bancaria</option>
                <option>Financiación</option>
                <option>Pago de contado</option>
              </select>
            </label>
            <div className="mt-2 flex gap-3">
              <button type="button" onClick={onCerrar} className="flex-1 rounded-full border border-acero-200 py-3 font-semibold hover:bg-acero-50">
                Volver
              </button>
              <button type="submit" className="flex-1 rounded-full bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
                Enviar por WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
export default FormularioPedido
