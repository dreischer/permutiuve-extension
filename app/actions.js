import React from 'preact'
import { Events, Segments, GoogleAM } from './Views'
import { OPEN_KEY, OPEN_CLASSNAME, DFP_REQUESTS_KEY } from './constants'

const initialState = {
  open: JSON.parse(window.localStorage[OPEN_KEY] || 'false'),
  data: {
    events: {
      items: [],
      count: 0,
      filter: null
    },
    segments: {
      items: [],
      count: 0,
      filter: null
    },
    googleAM: {
      items: JSON.parse(window.sessionStorage[DFP_REQUESTS_KEY] || '[]'),
      count: JSON.parse(window.sessionStorage[DFP_REQUESTS_KEY] || '[]').length,
      filter: null
    }
  },
  navigation: {
    activeItem: 'events',
    items: [
      { name: 'Events', id: 'events', component: <Events /> },
      { name: 'Segments', id: 'segments', component: <Segments /> },
      { name: 'Google AM', id: 'googleAM', component: <GoogleAM /> }
    ]
  }
}

const actions = {
  addEvent ({ get, set, dispatch }, event) {
    const { data } = get()
    const dataCopy = { ...data }
    dataCopy.events.items.push(event)
    dataCopy.events.count = dataCopy.events.items.length

    set({ data: dataCopy })
  },
  updateSegments ({ get, set, dispatch }) {
    window.parent.permutive.segments(segs => {
      const { data } = get()
      const dataCopy = { ...data }
      dataCopy.segments.items = segs
      dataCopy.segments.count = segs.length

      set({ data: dataCopy })
    })
  },
  addDfp ({ get, set, dispatch }, message) {
    if (message.data.type !== 'perm_extension_dfpRequest') {
      return
    }
    const { data } = get()
    const dataCopy = { ...data }
    dataCopy.googleAM.items.push(message.data.data)
    dataCopy.googleAM.count = dataCopy.googleAM.items.length

    set({ data: dataCopy })
  },
  setFilter ({ get, set, dispatch }, payload) {
    const { data } = get()
    const dataCopy = { ...data }
    dataCopy[payload.type].filter = payload.value

    set({ data: dataCopy })
  },
  toggleOpen ({ get, set, dispatch }) {
    const { open } = get()

    if (open) {
      window.frameElement.classList.remove(OPEN_CLASSNAME)
    } else {
      window.frameElement.classList.add(OPEN_CLASSNAME)
    }

    window.localStorage[OPEN_KEY] = !open
    set({ open: !open })
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
