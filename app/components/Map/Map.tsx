import 'maplibre-gl/dist/maplibre-gl.css' // See notes below
import { FedGeometry, FedGeometryProperties } from './FedGeometry'
import { GeoJsonLayer } from 'deck.gl'
import {
  MapboxOverlay as DeckOverlay,
  MapboxOverlayProps as DeckOverlayProps,
} from '@deck.gl/mapbox'
import {
  NavigationControl,
  Popup,
  useControl,
  Map as MapLibreMap,
} from '@vis.gl/react-maplibre'
import { getPartyColor } from './colorHelpers'
import { useState } from 'react'

function DeckGLOverlay(props: DeckOverlayProps) {
  const overlay = useControl(() => new DeckOverlay(props))
  overlay.setProps(props)
  return null
}

const FED_GEOMETRIES_URL =
  'https://mountainmath.s3.ca-central-1.amazonaws.com/fed_geos.geojson'

const MAP_STYLE_URL = 'http://178.128.226.129/styles/style_census.json'

export default function Map() {
  const [selected, setSelected] = useState<FedGeometry>()

  const layers = [
    new GeoJsonLayer<FedGeometryProperties>({
      id: 'fed-2023',
      data: FED_GEOMETRIES_URL,
      filled: true,
      stroked: true,
      getLineWidth: 2,
      getFillColor: (f) => getPartyColor(f.properties.Winner, 200),
      getLineColor: [255, 255, 255, 255], // White
      lineWidthUnits: 'pixels',
      highlightColor: (f) => getPartyColor(f.object.properties.Winner, 200),
      pickable: true,
      autoHighlight: true,
      onClick: (info) => setSelected(info.object),
      // @ts-expect-error In interleaved mode, render the layer under map
      // labels. We also have to ignore a type error here (beforeId works, but
      // it is not known as a property of the GeoJsonLayer type)
      beforeId: 'non_residential_overlay',
    }),
  ]

  return (
    <MapLibreMap
      initialViewState={{
        longitude: -100,
        latitude: 55,
        zoom: 4,
      }}
      style={{ width: '100vw', height: '80vh' }}
      mapStyle={MAP_STYLE_URL}
    >
      {selected && (
        // TODO: This does not work. Probably has to do with interleaved mode?
        // See https://github.com/visgl/deck.gl/discussions/9132
        <Popup
          key={selected.properties.Name}
          anchor="bottom"
          style={{ zIndex: 10 }} /* position above deck.gl canvas */
          longitude={selected.properties.centroid[0]}
          latitude={selected.properties.centroid[1]}
        >
          {selected.properties.Name}
        </Popup>
      )}
      <DeckGLOverlay layers={layers} interleaved />
      <NavigationControl position="top-right" />
    </MapLibreMap>
  )
}
