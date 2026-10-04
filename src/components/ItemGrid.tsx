import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getCategory } from '../data/catalog'
import BackButton from './BackButton'
import TileGrid from './TileGrid'

/** One category's items, with a big back-to-home button on top. */
export default function ItemGrid() {
  const navigate = useNavigate()
  const { categoryId = '' } = useParams()
  const category = getCategory(categoryId)
  if (!category) return <Navigate to="/" replace />

  return (
    <TileGrid
      variant="items"
      header={<BackButton to="/" label="رجوع" icon="🏠" className="min-h-16 w-full" />}
      tiles={category.items.map((item) => ({
        key: item.id,
        label: item.nameArabic,
        images: [item.imageUrl],
        onClick: () => navigate(`/${category.id}/${item.id}`),
      }))}
    />
  )
}
