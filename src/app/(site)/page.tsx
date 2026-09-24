import { Navbar } from '@/sections/Navbar'
import { Hero } from '@/sections/Hero'
import { WhatIBuild } from '@/sections/WhatIBuild'
import { SelectedWork } from '@/sections/SelectedWork'
import { HowIThink } from '@/sections/HowIThink'
import { Process } from '@/sections/Process'
import { Numbers } from '@/sections/Numbers'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <WhatIBuild />
      <SelectedWork />
      <HowIThink />
      <Process />
      <Numbers />
      <Contact />
      <Footer />
    </main>
  )
}
