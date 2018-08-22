'use strict'

import Prefs from './prefs.js'

class JaPrefs {
  constructor(options) {
    if ('undefined' === typeof options) {
      options = {}
    }

    this.options = Object.assign({
        id: "japanese-prefectures",
        label: "{en}\n{name}",
        minzoom: 0,
        maxzoom: 9,
        textFont: ['Noto Sans Regular'],
        textSize: 14,
        before: "",
      }, options
    )

    this.geojson = {
      type: 'FeatureCollection',
      features: []
    };

    for (let i = 0; i < Prefs.length; i++) {
      const props = Object.assign({
        name: "",
        en: "",
        code: "",
      }, Prefs[i])

      this.geojson.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [Prefs[i].lng, Prefs[i].lat]
        },
        properties: props
      })
    }
  }

  getGeoJSON() {
    return this.geojson
  }

  getLayer() {
    return {
      "id": `${this.options.id}-label`,
      "type": "symbol",
      "minzoom": this.options.minzoom,
      "maxzoom": this.options.maxzoom,
      "source": this.options.id,
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 2,
      },
      "layout": {
        "text-field": this.options.label,
        "text-font": this.options.textFont,
        "text-size": this.options.textSize,
        "text-anchor": "center",
        "text-max-width": 10,
        "text-offset": [0, 0],
        "text-allow-overlap": false,
      }
    }
  }

  addTo(map) {
    map.on('load', () => {
      map.addSource(this.options.id, {
        type: "geojson",
        data: this.geojson,
      })

      map.addLayer(this.getLayer(), this.options.before);
    })
  }
}

export default JaPrefs
