import { useEffect, useState } from 'react'
import LandingPage from './components/LandingPage'
import AppPage from './components/AppPage'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function navigate(to) {
    window.history.pushState({}, '', to)
    setPath(to)
  }

  if (path === '/app') {
    return <AppPage onNavigate={navigate} />
  }

  return <LandingPage onNavigate={navigate} />
}

export default App
