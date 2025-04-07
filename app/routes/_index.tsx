import type { MetaFunction } from '@remix-run/cloudflare'
import Map from '~/components/Map/Map'

export const meta: MetaFunction = () => {
  return [{ title: 'Canada Election Explorer 2025' }]
}

export default function Index() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>
        <Map />
      </div>
    </div>
  )
}
