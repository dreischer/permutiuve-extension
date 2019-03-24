import React from 'preact'
import { Events, Segments } from './Views'
import { OPEN_KEY, OPEN_CLASSNAME } from './constants'

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
  },
  toggleOpen ({ get, set, dispatch }) {
    const { open } = get()
    const nowOpen = !open
    window.localStorage[OPEN_KEY] = nowOpen
    if (nowOpen) {
      window.frameElement.classList.add(OPEN_CLASSNAME)
    } else {
      window.frameElement.classList.remove(OPEN_CLASSNAME)
    }
    set({ open: nowOpen })
  },
  setMenuLocation ({ get, set, dispatch }, id) {
    const { navigation } = get()
    set({
      navigation: {
        ...navigation,
        activeItem: id
      }
    })
  }
}

export { initialState, actions }
