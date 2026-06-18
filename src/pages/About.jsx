import { motion } from 'framer-motion';

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

export default function About() {
  return (
    <section className="py-32 md:py-40 bg-[#f5f1eb]" id="about">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <Reveal y={40}>
            <div className="relative overflow-hidden rounded-[32px] h-[500px] md:h-[650px] image-reveal-mask">
              <motion.img
                src="/assets/flower_boutique.png"
                alt="Cut & Cure"
                className="w-full h-full object-cover"
                whileInView={{ scale: 1 }}
                initial={{ scale: 1.08 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[32px] p-8 md:p-14 shadow-sm"
            >
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold block mb-6">
                ABOUT CUT & CURE
              </span>

              <h2 className="font-display text-[42px] md:text-[68px] leading-[0.95] font-light text-brand-charcoal mb-8 tracking-[-0.02em]">
                Where
                Beauty
                Meets
                Lifestyle
              </h2>

              <p className="text-lg text-brand-espresso/80 leading-relaxed mb-6 font-light">
                Cut & Cure is a luxury lifestyle destination designed to bring together beauty, nature, craftsmanship and hospitality under one elegant roof.
              </p>

              <p className="text-lg text-brand-espresso/80 leading-relaxed font-light">
                Inspired by the art of thoughtful living, we create experiences that transform everyday moments into lasting memories through flowers, landscapes, coffee and events.
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
