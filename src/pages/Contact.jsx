import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function Contact() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setShowSuccess(true);
      setEmail('');
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <section className="py-16 bg-neutral-50 text-center" id="contact">
      <div className="max-w-md w-full mx-auto px-6">
        <Reveal>
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 block mb-2">
              Join the Atelier
            </span>
            <h2 className="font-display text-2xl font-light uppercase text-neutral-800 mb-3 tracking-wide">
              Stay Updated
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              Receive exclusive event invitations and the latest luxury updates from Dubai.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1">
              <label htmlFor="emailAddress" className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Email Address</label>
              <input
                type="email"
                id="emailAddress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
                required
                className="luxury-input uppercase text-sm tracking-wide"
              />
            </div>

            <button
              type="submit"
              className="btn-premium w-full mt-2 py-3.5 bg-neutral-900 text-white text-xs tracking-widest uppercase hover:bg-neutral-800 font-medium"
            >
              Subscribe
            </button>
          </form>

          <AnimatePresence>
            {showSuccess && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-xs text-emerald-700 tracking-wide"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
