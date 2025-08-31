import { Map } from 'lucide-react'

const MapPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Map View</h1>
        <p className="text-muted-foreground">
          Interactive map with report locations and clusters
        </p>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h2>
        <p className="text-muted-foreground">
          This page will contain an interactive map powered by OpenStreetMap with Leaflet.js.
        </p>
      </div>
    </div>
  )
}

export default MapPage
