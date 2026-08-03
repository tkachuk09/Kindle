import { motion } from 'framer-motion'

function ProductDescription() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-2xl px-6 py-32 text-center"
    >
      <h2
        className="text-xl font-semibold text-amber-50 sm:text-2xl"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        A personal habit tracker, built to actually feel good to use.
      </h2>
      <p className="mt-6 text-sm leading-relaxed text-neutral-400">
        Every day you check off a habit, you're kindling a small fire — stay
        consistent and it keeps burning. Miss a day and it only dims, never
        goes out. Real discipline, without the all-or-nothing pressure that
        kills motivation.
      </p>
    </motion.section>
  )
}

export default ProductDescription
