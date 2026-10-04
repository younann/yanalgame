import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AnimalGrid from './components/AnimalGrid'
import VideoScreen from './components/VideoScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimalGrid />} />
        <Route path="/video/:animalId" element={<VideoScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
