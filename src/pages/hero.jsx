import { motion } from 'framer-motion';

function TextReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ scrollToSection }) {
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden" id="home">
      <div className="absolute inset-0 z-10">
        <img
          src="/assets/hero_cover.png"
          alt="Cut & Cure Dubai Luxury Interior Atmosphere"
          className="w-full h-full object-cover scale-[1.04]"
          style={{ animation: 'slowZoom 25s infinite alternate ease-in-out' }}
        />
      </div>

      <div className="absolute inset-0 bg-black/35 z-20" />

      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 w-full max-w-[1440px] mx-auto px-8 md:px-20"
      >
        <div className="max-w-[700px] text-white">
          <motion.div variants={heroItemVariants}>
            <span className="inline-flex items-center border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.25em]">
              EST. 2026
            </span>
          </motion.div>

          <motion.h1
            variants={heroItemVariants}
            className="mt-8 font-display text-[58px] md:text-[100px] leading-[0.92] font-light tracking-[-0.02em]"
          >
            <TextReveal text="Where Luxury" delay={0.5} />
            <br />
            <TextReveal text="Meets Life" delay={0.7} />
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="mt-8 text-[18px] md:text-[22px] leading-relaxed text-white/85 max-w-[580px]"
          >
            A bespoke flower boutique, premium landscaping, specialty coffee and curated event experiences coming soon to the heart of Dubai.
          </motion.p>

          <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4 mt-10">
            <a
              href="#services"
              onClick={scrollToSection('services')}
              className="btn-premium bg-white text-black px-8 py-4 rounded-full text-sm uppercase tracking-[0.18em] font-medium"
            >
              Discover More
            </a>

            <a
              href="#about"
              onClick={scrollToSection('about')}
              className="btn-outline-premium text-white px-8 py-4 rounded-full text-sm uppercase tracking-[0.18em]"
            >
              Our Story
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 left-8 md:left-20 z-30 scroll-indicator"
      >
        <div className="scroll-indicator-line" />
        <span className="scroll-indicator-text text-[10px] uppercase tracking-[0.3em] text-white/70">
          Scroll To Explore
        </span>
      </motion.div>
    </section>
  );
}
