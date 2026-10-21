function Portada() {
  return (
       <section className="relative flex h-[80svh] min-h-[520px] items-end overflow-hidden bg-acero-900 bg-[url('/img/delorean-principal.jpg')] bg-[length:170%_auto] bg-[position:50%_20%] bg-no-repeat text-white md:h-screen md:items-center md:bg-cover md:bg-[position:50%_37.38%]">
      <div className="absolute inset-0 bg-linear-to-t from-acero-900 via-acero-900/50 to-black/20 md:bg-linear-to-b md:from-black/60 md:via-black/70 md:to-acero-900" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 md:pb-0">
        <p
          className="font-titulo text-base italic uppercase sm:text-xl md:text-3xl"
          style={{ fontWeight: 800, fontStretch: '125%' }}
        >
          ¿Listo para
        </p>
        <h1
          className="font-titulo text-4xl leading-none text-flux-500 italic uppercase sm:text-6xl md:text-8xl"
          style={{ fontWeight: 900, fontStretch: '125%' }}
        >
          vivir el sueño?
        </h1>
        <p className="mt-4 max-w-md text-base text-white/90 md:text-xl">
          Mira nuestra lista de DeLorean clásicos y personalizados.
        </p>
        <a
          href="#/catalogo"
          className="mt-6 inline-block rounded-full border-2 border-white px-6 py-3 font-semibold tracking-wide uppercase transition hover:bg-white hover:text-acero-900"
        >
          Ver catálogo
        </a>
      </div>
    </section>
  )
}

export default Portada
