import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/catalog'
import TileGrid from './TileGrid'

/** Home: one big photo per category (animals, transport, food, toys). */
export default function CategoryHome() {
  const navigate = useNavigate()
  return (
    <TileGrid
      variant="categories"
      tiles={CATEGORIES.map((category) => ({
        key: category.id,
        label: category.nameArabic,
        images: category.coverImages,
        onClick: () => navigate(`/${category.id}`),
      }))}
    />
  )
}
