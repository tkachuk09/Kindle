import Hero from './components/Hero'
import ProductDescription from './components/ProductDescription'
import HabitDrawer from './components/HabitDrawer'

function App() {
  return (
    <div className="min-h-screen text-neutral-100">
      <HabitDrawer />
      <Hero />
      <ProductDescription />
    </div>
  )
}

export default App
