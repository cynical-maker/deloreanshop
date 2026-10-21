function Portada() {
  return (
    <section
      className="relative flex h-screen min-h-[560px] items-center bg-cover bg-no-repeat text-white"
      style={{
        backgroundImage: "url('/img/delorean-principal.jpg')",
        backgroundPosition: '50% 37.38%',
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/70 to-acero-900" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <p className="text-sm font-bold tracking-widest italic uppercase">¿Listo para</p>
        <h1 className="font-titulo text-5xl leading-none text-flux-500 italic uppercase md:text-7xl">
          vivir el sueño?
        </h1>
        <p className="mt-4 max-w-md text-lg font-bold italic">
          Mira nuestra lista de DeLorean clásicos y personalizados.
        </p>
        <a
        href="#/catalogo"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full border-2 border-white px-6 py-2 font-semibold uppercase hover:bg-white hover:text-acero-900">
  Ver catálogo
</a>
      </div>
    </section>
  )
}

export default Portada