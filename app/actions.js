import React from 'preact'
import { Events, Segments, GoogleAM } from './Views'
import { OPEN_KEY, OPEN_CLASSNAME, DFP_REQUESTS_KEY } from './constants'

const initialState = {
  open: JSON.parse(window.localStorage[OPEN_KEY] || 'false'),
  data: {
    events: {
      items: [],
      count: 0
    },
    segments: {
      items: [],
      count: 0
    },
    googleAM: {
      items: JSON.parse(window.sessionStorage[DFP_REQUESTS_KEY] || '[]'),
      count: JSON.parse(window.sessionStorage[DFP_REQUESTS_KEY] || '[]').length
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
    const nextEvents = [...data.events.items, event]
    const newData = {
      ...data,
      events: {
        items: nextEvents,
        count: nextEvents.length
      }
    }
    set({ data: newData })
  },
  updateSegments ({ get, set, dispatch }) {
    window.parent.permutive.segments(segs => {
      const { data } = get()
      const newData = {
        ...data,
        segments: {
          items: segs,
          count: segs.length
        }
      }
      set({ data: newData })
    })
  },
  addDfp ({ get, set, dispatch }, message) {
    if (message.data.type !== 'perm_extension_dfpRequest') {
      return
    }
    const { data } = get()
    const dfpEvents = [...data.googleAM.items, message.data.data]
    const newData = {
      ...data,
      googleAM: {
        items: dfpEvents,
        count: dfpEvents.length
      }
    }
    set({ data: newData })
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
