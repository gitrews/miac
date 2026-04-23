import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PatientJourney from './pages/PatientJourney'
import RegistrarJourney from './pages/RegistrarJourney'
import DoctorJourney from './pages/DoctorJourney'
import SystemIntegration from './pages/SystemIntegration'
import CompleteFlow from './pages/CompleteFlow'
import StepRouter from './pages/StepRouter'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<PatientJourney />} />
        <Route path="/registrar" element={<RegistrarJourney />} />
        <Route path="/doctor" element={<DoctorJourney />} />
        <Route path="/integration" element={<SystemIntegration />} />
        <Route path="/flow" element={<CompleteFlow />} />
        <Route path="/step/:stepId" element={<StepRouter />} />
      </Routes>
    </Layout>
  )
}

export default App
