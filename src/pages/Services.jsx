import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

function ParallaxImage({ src, alt }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden relative border border-brand-sandstone bg-brand-alabaster">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[112%] absolute top-[-6%] left-0 object-cover scale-[1.01] transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
      />
    </div>
  );
}

function Reveal({ children, delay = 0, y = 30 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const serviceCards = [
  {
    column: 'left',
    image: '/assets/flower_boutique.png',
    alt: 'Luxury Flower Arrangement by Cut & Cure',
    label: 'FLORAL ARTISTRY',
    title: 'Flower Boutique',
    description: 'Bespoke arrangements for the discerning eye. A fusion of botanical rarity and artistic expression.',
  },
  {
    column: 'right',
    image: '/assets/coffee_experience.png',
    alt: 'Specialty Coffee Cup Latte Art',
    label: 'THE ART OF ESPRESSO',
    title: 'Specialty Coffee',
    description: 'A curated sensory journey of rare beans. Every cup is a testament to the art of the perfect extraction.',
  },
  {
    column: 'left',
    image: '/assets/landscaping.png',
    alt: 'Premium Architectural Plants & Landscaping Layout',
    label: 'BOTANICAL DESIGN',
    title: 'Plants & Landscaping',
    description: 'Bespoke green sanctuaries for premium living. Architecting nature inside the modern urban landscape.',
  },
  {
    column: 'right',
    image: '/assets/events.png',
    alt: 'Curated Table Setting for Luxury Event',
    label: 'CURATED SCENOGRAPHY',
    title: 'Events Organization',
    description: 'Crafting moments of timeless elegance. Transforming visions into unforgettable sensory experiences.',
  },
];

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);
  const servicesRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  const smoothServicesProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });
  const leftY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [80, -80]);
  const rightY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [-80, 80]);
  const headerParallaxY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [30, -30]);

  return (
    <section ref={servicesRef} className="py-[160px] bg-brand-alabaster overflow-hidden border-b border-brand-sandstone/10" id="services">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <Reveal>
          <motion.div
            style={{ y: headerParallaxY }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline mb-24 text-left"
          >
            <div className="md:col-span-7">
              <span className="label-caps text-brand-espresso mb-4 block">OUR OFFERINGS</span>
              <h2 className="display-lg uppercase text-brand-charcoal">
                Curated for the<br />Discerning
              </h2>
            </div>
            <div className="md:col-span-5 body-lg text-brand-charcoal/70 md:pl-8">
              <p>Experience a lifestyle destination where every detail is considered and every moment is elevated.</p>
            </div>
          </motion.div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {serviceCards.map((card) => (
            <motion.div key={card.title} style={{ y: card.column === 'left' ? leftY : rightY }}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="card-premium bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 cursor-pointer"
              >
                <Reveal>
                  <div className="w-full aspect-[4/5] relative">
                    <ParallaxImage src={card.image} alt={card.alt} />
                    <div className="absolute top-4 right-4 z-20 bg-brand-charcoal/90 backdrop-blur-md text-brand-gold border border-brand-gold/20 text-[9px] uppercase tracking-[0.22em] py-1.5 px-3.5 font-sans font-medium">
                      Coming Soon
                    </div>
                  </div>
                  <div className="text-center flex flex-col gap-4 mt-6">
                    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold">{card.label}</span>
                    <h3 className="font-display text-[28px] font-light uppercase text-brand-charcoal tracking-wide">{card.title}</h3>
                    <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                      {card.description}
                    </p>
                    <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                      Discover More &rarr;
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
