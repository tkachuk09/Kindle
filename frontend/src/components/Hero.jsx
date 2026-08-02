import { motion } from 'framer-motion'

const WORD = 'Kindle'
const EASE = [0.16, 1, 0.3, 1]

function Hero() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div
        className="relative flex text-6xl font-bold tracking-tight text-amber-50 sm:text-7xl"
        style={{
          textShadow: '0 0 50px rgba(251,146,60,0.4)',
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      >
        {WORD.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.14, ease: EASE }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.9, ease: EASE }}
        className="relative mt-4 text-sm tracking-[0.2em] text-neutral-500 uppercase"
      >
        steady fire. steady mind.
      </motion.p>
    </div>
  )
}

export default Hero
