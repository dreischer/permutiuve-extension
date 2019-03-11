import React from 'preact'
import { OPEN_KEY } from './constants'
import { Events, Segments } from './Views'

const initialState = {
  open: JSON.parse(window.localStorage[OPEN_KEY] || 'false'),
  data: {
    events: [],
    segments: [],
    eventCount: 0,
    segmentCount: 0
  },
  navigation: {
    activeItem: 'events',
    items: [
      { name: 'Events', id: 'events', content: <Events /> },
      { name: 'Segments', id: 'segments', content: <Segments /> }
    ]
  }
}

const actions = {
  addEvent ({ get, set, dispatch }, event) {
    const { data } = get()
    var nextEvents = [...data.events, event]
    const newData = Object.assign({}, data, {
      events: nextEvents,
      eventCount: nextEvents.length
    })
    set({ data: newData })
  },
  updateSegments ({ get, set, dispatch }) {
    window.parent.permutive.segments(segments => {
      const { data } = get()
      const newData = Object.assign({}, data, {
        segments,
        segmentCount: segments.length
      })
      set({ data: newData })
    })
  }
}

export { initialState, actions }
