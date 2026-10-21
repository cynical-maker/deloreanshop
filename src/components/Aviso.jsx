function Aviso({ mensaje }) {
  if (!mensaje) return null
  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-acero-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
      {mensaje}
    </div>
  )
}
export default Aviso
