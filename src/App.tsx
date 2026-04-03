import { useEffect, useRef, useState } from 'react'

/* ───────────── Scroll Reveal Hook ───────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass =
    'font-heading text-sm uppercase tracking-wider hover:text-fire transition-colors duration-300 cursor-pointer'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-3xl">🔥</span>
          <span className="font-heading text-2xl font-bold text-offwhite group-hover:text-fire transition-colors">
            DAYMAY
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#carta" className={linkClass}>La Carta</a>
          <a href="#opiniones" className={linkClass}>Opiniones</a>
          <a href="#horarios" className={linkClass}>Horarios</a>
          <a href="#contacto" className={linkClass}>Contacto</a>
          <a
            href="tel:+34650656634"
            className="btn-shimmer text-offwhite font-heading text-sm uppercase tracking-wider px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-300"
          >
            📞 Llamar y Recoger
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`w-6 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-charcoal/98 backdrop-blur-lg px-6 py-6 flex flex-col gap-5 border-t border-charcoal-medium">
          <a href="#carta" className={linkClass} onClick={() => setMenuOpen(false)}>La Carta</a>
          <a href="#opiniones" className={linkClass} onClick={() => setMenuOpen(false)}>Opiniones</a>
          <a href="#horarios" className={linkClass} onClick={() => setMenuOpen(false)}>Horarios</a>
          <a href="#contacto" className={linkClass} onClick={() => setMenuOpen(false)}>Contacto</a>
          <a
            href="tel:+34650656634"
            className="btn-shimmer text-offwhite font-heading text-center text-sm uppercase tracking-wider px-5 py-3 rounded-full mt-2"
          >
            📞 Llamar y Recoger
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_bg.png"
          alt="Ambiente rústico Daymay"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />
      </div>

      {/* Ember particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-fire rounded-full opacity-60 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 bg-fire/15 border border-fire/30 rounded-full px-5 py-2 mb-8">
          <span className="text-fire text-sm font-semibold uppercase tracking-widest font-heading">
            📍 Horche, Guadalajara
          </span>
        </div>

        {/* H1 */}
        <h1 className="animate-fade-in-up font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-offwhite">No es solo pizza.</span>
          <br />
          <span className="text-offwhite">No es solo asador.</span>
          <br />
          <span className="text-fire">Es Daymay.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-200 text-offwhite-dark text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-light leading-relaxed">
          Comida casera, recién hecha y con ingredientes de verdad. 
          Del horno de leña a tu mesa — o para que te lo lleves calentito.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#carta"
            className="btn-shimmer animate-pulse-glow w-full sm:w-auto text-offwhite font-heading text-lg uppercase tracking-wider px-10 py-4 rounded-full hover:scale-105 transition-transform duration-300 font-semibold"
          >
            🍕 Ver la Carta
          </a>
          <a
            href="https://maps.google.com/?q=Asador+Pizzeria+Daymay+Horche"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border-2 border-mustard text-mustard font-heading text-lg uppercase tracking-wider px-10 py-4 rounded-full hover:bg-mustard hover:text-charcoal transition-all duration-300 font-semibold"
          >
            📍 Cómo llegar a recoger
          </a>
        </div>

        {/* Trust badge */}
        <div className="animate-fade-in delay-500 mt-12 flex items-center justify-center gap-3 text-offwhite-dark">
          <div className="flex gap-0.5 text-mustard text-xl">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
          <span className="text-lg font-semibold">4.7 / 5</span>
          <span className="text-sm opacity-70">— Google Reviews</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-offwhite/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-fire rounded-full animate-fade-in" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   CATEGORÍAS ESTRELLA
   ═══════════════════════════════════════════════ */
const categories = [
  {
    title: 'Pizzas al Horno',
    description:
      'Masa artesanal, ingredientes frescos y el sabor inconfundible del horno de leña. Desde las clásicas hasta nuestras creaciones especiales.',
    image: '/images/hero_pizza.png',
    badge: '🔥 Las favoritas',
    color: 'from-fire/80 to-fire-dark/90',
  },
  {
    title: 'Hamburguesas Top',
    description:
      'De la smash clásica a nuestra joya: la hamburguesa de Wagyu. Carne de primera, pan brioche artesano y salsas caseras.',
    image: '/images/burger_wagyu.png',
    badge: '🥩 Con Wagyu',
    color: 'from-mustard/70 to-fire/80',
  },
  {
    title: 'El Asador',
    description:
      'Pollos asados dorados y crujientes y paletillas de cordero que se deshacen. La tradición del asador de toda la vida.',
    image: '/images/asador_chicken.png',
    badge: '👨‍🍳 Tradición',
    color: 'from-amber-700/80 to-charcoal/90',
  },
  {
    title: 'Para Empezar',
    description:
      'Croquetas caseras, patatas bravas, alitas crujientes… El aperitivo perfecto mientras esperas el plato fuerte.',
    image: '/images/starters_tapas.png',
    badge: '🍴 Entrantes',
    color: 'from-charcoal-medium/80 to-charcoal/90',
  },
]

function Categories() {
  const ref = useReveal()
  return (
    <section id="carta" className="py-20 sm:py-28 bg-charcoal">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-heading text-fire text-sm uppercase tracking-[0.3em] font-semibold">
            Nuestra Carta
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mt-3 mb-4">
            ¿Qué te apetece hoy?
          </h2>
          <p className="text-offwhite-dark text-lg max-w-2xl mx-auto">
            Cuatro mundos de sabor bajo el mismo techo. Todo hecho aquí, todo hecho de verdad.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`card-hover group relative rounded-2xl overflow-hidden bg-charcoal-light border border-charcoal-medium delay-${(i + 1) * 100}`}
            >
              {/* Image */}
              <div className="relative h-56 sm:h-52 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm text-offwhite text-xs font-heading uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {cat.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-xl font-bold text-offwhite mb-2 group-hover:text-fire transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="text-offwhite-dark text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-fire/0 group-hover:border-fire/40 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA under cards */}
        <div className="text-center mt-12">
          <a
            href="tel:+34650656634"
            className="inline-flex items-center gap-3 bg-fire hover:bg-fire-dark text-offwhite font-heading text-base uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-fire/30"
          >
            📞 Llama y recoge tu pedido caliente
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   SOCIAL PROOF — RESEÑAS
   ═══════════════════════════════════════════════ */
const reviews = [
  {
    name: 'María G.',
    stars: 5,
    text: '¡Los pollos asados son espectaculares! Crujientes por fuera y jugosísimos por dentro. Se nota que es comida hecha con cariño, como la de toda la vida.',
    highlight: 'el asador',
  },
  {
    name: 'Carlos R.',
    stars: 5,
    text: 'Las pizzas del horno de leña no tienen comparación en la zona. Y las hamburguesas de Wagyu... ¡brutales! Relación calidad-precio insuperable.',
    highlight: 'el sabor',
  },
  {
    name: 'Laura M.',
    stars: 5,
    text: 'El trato es familiar y cercano, te sientes como en casa. Los niños repiten siempre. Recoger el pedido es rapidísimo, todo listo y calentito.',
    highlight: 'trato familiar',
  },
  {
    name: 'Javier P.',
    stars: 4,
    text: 'Las paletillas de cordero son para morirse. Cantidad generosísima y un sabor de esos que te hacen volver cada fin de semana. ¡Imprescindible!',
    highlight: 'cantidad',
  },
]

function SocialProof() {
  const ref = useReveal()
  return (
    <section id="opiniones" className="py-20 sm:py-28 bg-charcoal-light relative overflow-hidden">
      {/* Decorative ember */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-fire/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-mustard/5 rounded-full blur-3xl" />

      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-heading text-fire text-sm uppercase tracking-[0.3em] font-semibold">
            Opiniones Reales
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mt-3 mb-4">
            Lo que dicen nuestros vecinos
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-0.5 text-mustard text-2xl">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <span className="text-offwhite text-2xl font-bold font-heading">4.7</span>
            <span className="text-offwhite-dark text-sm">en Google</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-charcoal border border-charcoal-medium rounded-2xl p-6 hover:border-fire/30 transition-all duration-500 group"
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-mustard text-base mb-4">
                {Array.from({ length: review.stars }, (_, j) => (
                  <span key={j}>★</span>
                ))}
                {Array.from({ length: 5 - review.stars }, (_, j) => (
                  <span key={j} className="text-charcoal-medium">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-offwhite-dark text-sm leading-relaxed mb-5 italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-fire/20 flex items-center justify-center text-fire font-bold text-sm font-heading">
                    {review.name.charAt(0)}
                  </div>
                  <span className="text-offwhite font-medium text-sm">
                    {review.name}
                  </span>
                </div>
                <span className="text-fire/70 text-xs font-heading uppercase tracking-wider">
                  {review.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   HORARIOS + CTA RECOGIDA
   ═══════════════════════════════════════════════ */
function Schedule() {
  const ref = useReveal()
  return (
    <section id="horarios" className="py-20 sm:py-28 bg-charcoal relative">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-heading text-fire text-sm uppercase tracking-[0.3em] font-semibold">
            Cuándo encontrarnos
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mt-3 mb-4">
            Horarios y Recogida
          </h2>
        </div>

        {/* Schedule card */}
        <div className="bg-charcoal-light border border-charcoal-medium rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto">
          {/* Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {/* Open days */}
            <div className="bg-charcoal rounded-2xl p-6 border border-charcoal-medium">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🟢</span>
                <h3 className="font-heading text-lg font-bold text-offwhite uppercase tracking-wider">
                  Jueves a Domingo
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-offwhite-dark text-sm">Comidas</span>
                  <span className="text-offwhite font-semibold font-heading text-lg">10:00 – 15:00</span>
                </div>
                <div className="w-full h-px bg-charcoal-medium" />
                <div className="flex items-center justify-between">
                  <span className="text-offwhite-dark text-sm">Cenas</span>
                  <span className="text-offwhite font-semibold font-heading text-lg">19:00 – 23:00</span>
                </div>
              </div>
            </div>

            {/* Closed days */}
            <div className="bg-charcoal rounded-2xl p-6 border border-charcoal-medium">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🔴</span>
                <h3 className="font-heading text-lg font-bold text-offwhite uppercase tracking-wider">
                  Lun – Miércoles
                </h3>
              </div>
              <div className="flex items-center justify-center h-20">
                <span className="text-offwhite-dark text-lg font-heading uppercase tracking-wider">
                  Cerrado
                </span>
              </div>
            </div>
          </div>

          {/* CTA Highlight Box */}
          <div className="relative bg-gradient-to-r from-fire/15 via-fire/10 to-mustard/10 border-2 border-fire/40 rounded-2xl p-6 sm:p-8 text-center overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-fire/10 rounded-full blur-3xl" />
            
            <span className="text-4xl mb-4 block">🔥</span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-offwhite mb-3">
              Para disfrutar al máximo
            </h3>
            <p className="text-offwhite-dark text-base sm:text-lg leading-relaxed mb-6 max-w-lg mx-auto">
              Te recomendamos <strong className="text-fire font-semibold">comer en nuestro local</strong> o{' '}
              <strong className="text-mustard font-semibold">recoger tu pedido</strong> recién hecho — así te lo llevas calentito y en su punto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://maps.google.com/?q=Asador+Pizzeria+Daymay+Horche"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-shimmer text-offwhite font-heading uppercase tracking-wider px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 font-semibold"
              >
                📍 Ven a vernos
              </a>
              <a
                href="tel:+34650656634"
                className="w-full sm:w-auto border-2 border-mustard text-mustard font-heading uppercase tracking-wider px-8 py-4 rounded-full hover:bg-mustard hover:text-charcoal transition-all duration-300 font-semibold"
              >
                📞 Recoge tu pedido caliente
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer id="contacto" className="bg-charcoal-light border-t border-charcoal-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🔥</span>
              <span className="font-heading text-2xl font-bold text-offwhite">DAYMAY</span>
            </div>
            <p className="text-offwhite-dark text-sm leading-relaxed mb-4">
              Asador Pizzería Daymay — Horche, Guadalajara.
              <br />
              Comida casera de verdad, hecha con cariño desde siempre.
            </p>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-fire hover:text-fire-light transition-colors duration-300 font-heading uppercase tracking-wider text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Síguenos en Instagram
            </a>
          </div>

          {/* Col 2: Location */}
          <div>
            <h4 className="font-heading text-lg font-bold text-offwhite uppercase tracking-wider mb-4">
              📍 Encuéntranos
            </h4>
            <p className="text-offwhite-dark text-sm leading-relaxed mb-4">
              Horche, Guadalajara
              <br />
              (Castilla-La Mancha)
            </p>
            <a
              href="https://maps.google.com/?q=Asador+Pizzeria+Daymay+Horche"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-fire/10 hover:bg-fire/20 text-fire border border-fire/30 rounded-full px-5 py-2.5 text-sm font-heading uppercase tracking-wider transition-all duration-300"
            >
              Ver en Google Maps →
            </a>
          </div>

          {/* Col 3: Phone CTA */}
          <div>
            <h4 className="font-heading text-lg font-bold text-offwhite uppercase tracking-wider mb-4">
              📞 Haz tu pedido
            </h4>
            <a
              href="tel:+34650656634"
              className="block text-fire text-3xl sm:text-4xl font-heading font-bold hover:text-fire-light transition-colors duration-300 mb-4"
            >
              650 65 66 34
            </a>
            <p className="text-offwhite-dark text-sm leading-relaxed">
              Llama, pide y recoge en local.
              <br />
              <span className="text-mustard font-medium">Todo listo y calentito.</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-charcoal-medium flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-charcoal-medium text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Asador Pizzería Daymay — Horche, Guadalajara. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-offwhite-dark text-xs">
            <span>Hecho con</span>
            <span className="text-fire">🔥</span>
            <span>y mucho cariño</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════
   APP — MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <Hero />
      <Categories />
      <SocialProof />
      <Schedule />
      <Footer />
    </div>
  )
}
