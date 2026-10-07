import { LocationPage, locationMetadata } from '@/components/LocationPage'
import { locationBySlug } from '@/content/locations'

const location = locationBySlug('rijschool-doesburg')

export const metadata = locationMetadata(location)

export default function Page() {
  return <LocationPage location={location} />
}
