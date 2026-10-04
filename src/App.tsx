import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import CategoryHome from './components/CategoryHome'
import ItemGrid from './components/ItemGrid'
import VideoScreen from './components/VideoScreen'
import { KidLockProvider } from './lock/KidLock'
import { ParentGate } from './lock/ParentGate'

/** Links from the first version (/video/cow) still work. */
function LegacyVideoRedirect() {
  const { animalId = '' } = useParams()
  return <Navigate to={`/animals/${animalId}`} replace />
}

export default function App() {
  return (
    <KidLockProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CategoryHome />} />
          <Route path="/video/:animalId" element={<LegacyVideoRedirect />} />
          <Route path="/:categoryId" element={<ItemGrid />} />
          <Route path="/:categoryId/:itemId" element={<VideoScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ParentGate />
    </KidLockProvider>
  )
}
