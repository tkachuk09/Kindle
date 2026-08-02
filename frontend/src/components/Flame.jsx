import { motion } from 'framer-motion'
import { useMemo } from 'react'
import FireCanvas from './FireCanvas'

const EMBER_COUNT = 10

function Embers({ width, height }) {
  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * width * 0.55,
        delay: Math.random() * 3.5,
        duration: 2.6 + Math.random() * 2.4,
        size: 2 + Math.random() * 4,
      })),
    [width],
  )

  return (
    <>
      {embers.map((e) => (
        <motion.span
          key={e.id}
          className="absolute rounded-full bg-amber-300"
          style={{
            width: e.size,
            height: e.size,
            left: `calc(50% + ${e.x}px)`,
            bottom: height * 0.55,
            boxShadow: '0 0 8px 3px rgba(251, 191, 36, 0.85)',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, -height * 0.45, -height * 0.85],
            x: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 45],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  )
}

function Flame({ height = 256 }) {
  const width = height * 0.78

  return (
    <div
      style={{ width, height }}
      className="relative flex items-end justify-center overflow-visible select-none"
    >
      <motion.div
        className="absolute rounded-full bg-orange-600/30 blur-3xl"
        style={{
          width: width * 1.7,
          height: width * 1.7,
          bottom: -width * 0.25,
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <FireCanvas width={width} height={height} />
      <Embers width={width} height={height} />
    </div>
  )
}

export default Flame
