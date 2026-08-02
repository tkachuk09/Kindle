import { useEffect, useRef } from 'react'

function spawnParticle(width, height) {
  return {
    x: width / 2 + (Math.random() - 0.5) * width * 0.32,
    y: height - 2,
    vx: (Math.random() - 0.5) * 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 0.6,
    age: 0,
    maxAge: 45 + Math.random() * 35,
    radius: height * 0.05 + Math.random() * height * 0.035,
  }
}

function FireCanvas({ width, height }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const particles = []
    const maxParticles = 90
    let frame = 0
    let raf

    function tick() {
      frame++
      if (particles.length < maxParticles) {
        particles.push(spawnParticle(width, height))
      }

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.age++
        const t = p.age / p.maxAge
        if (t >= 1) {
          particles.splice(i, 1)
          continue
        }

        p.y -= (1.3 + p.speed) * (1 - t * 0.25)
        p.x += p.vx + Math.sin(frame * 0.06 + p.phase) * 0.5
        p.x += (width / 2 - p.x) * 0.012 * t

        const r = p.radius * (1 - t * 0.8)
        const alpha = t < 0.12 ? t / 0.12 : 1 - (t - 0.12) / 0.88

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(r, 0.1))
        if (t < 0.3) {
          grad.addColorStop(0, `rgba(255,247,214,${0.9 * alpha})`)
          grad.addColorStop(0.5, `rgba(253,186,116,${0.7 * alpha})`)
          grad.addColorStop(1, 'rgba(251,146,60,0)')
        } else if (t < 0.65) {
          grad.addColorStop(0, `rgba(251,146,60,${0.8 * alpha})`)
          grad.addColorStop(0.6, `rgba(234,88,12,${0.5 * alpha})`)
          grad.addColorStop(1, 'rgba(154,52,18,0)')
        } else {
          grad.addColorStop(0, `rgba(194,65,12,${0.5 * alpha})`)
          grad.addColorStop(1, 'rgba(87,13,13,0)')
        }

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(r, 0.1), 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    tick()
    return () => cancelAnimationFrame(raf)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className="absolute bottom-0"
    />
  )
}

export default FireCanvas
