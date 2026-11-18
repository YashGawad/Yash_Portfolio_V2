import { useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider'
import { CustomCursor } from './components/common/CustomCursor'
import { ParticleCanvas } from './components/common/ParticleCanvas'
import { Preloader } from './components/common/Preloader'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { SelectedWork } from './components/sections/SelectedWork'
import { About } from './components/sections/About'
import { Capabilities } from './components/sections/Capabilities'
import { TechArsenal } from './components/sections/TechArsenal'
import { Certifications } from './components/sections/Certifications'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'

export function App() {
  const [, setPreloaderDone] = useState(false)

  const handlePreloaderComplete = () => {
    setPreloaderDone(true)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)
  }

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <ParticleCanvas />
      <Preloader onComplete={handlePreloaderComplete} />
      <div className="relative min-h-screen flex flex-col bg-[#07090e] text-[#f8fafc] selection:bg-cyan-500/25 selection:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-grow relative z-10">
          <Hero />
          <SelectedWork />
          <About />
          <Capabilities />
          <TechArsenal />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}

export default App
