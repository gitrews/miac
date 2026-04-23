import Hero from '../components/sections/Hero'
import ProcessScheme from '../components/sections/ProcessScheme'
import Roles from '../components/sections/Roles'
import StepsTimeline from '../components/sections/StepsTimeline'
import KPICards from '../components/sections/KPICards'
import Cases from '../components/sections/Cases'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessScheme />
      <Roles />
      <StepsTimeline />
      <KPICards />
      <Cases />
      <CTA />
    </>
  )
}
