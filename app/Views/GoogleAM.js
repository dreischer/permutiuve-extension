import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'
import List from '../components/List'

export default class Events extends Component {
  render (props, state) {
    const map = function (state) {
      return {
        items: state.data.googleAM.items.map(mapDFP),
        filter: state.data.googleAM.filter
      }
    }
    return (
      <Consumer map={map} >
        {({ items, filter, dispatch }) => (
          <List items={items} filter={filter} setFilter={function (value) {
            dispatch('setFilter', { type: 'googleAM', value })
          }} title='Google AM' />
        )}
      </Consumer>
    )
  }
}

function mapDFP (item) {
  const object = makeObject(item.url.split('?')[1])
  const name = object.iu || object.iu_parts || object.slotname
  const segments = object.cust_params && object.cust_params.permutive && object.cust_params.permutive.length
  const subtitle = segments ? '✔ Targeted' : 'Not targeted'

  return {
    name,
    subtitle,
    payload: object
  }
}

function makeObject (str) {
  const output = {}
  const nested = ['cust_params', 'prev_scp', 'scp']
  const array = ['permutive', 'plat', 'eid', 'iu_parts', 'enc_prev_ius', 'prev_iu_szs', 'fws']

  str.split('&').forEach(param => {
    const parts = param.split('=')
    const isNested = nested.indexOf(parts[0]) !== -1
    const isArray = array.indexOf(parts[0]) !== -1

    if (isArray) {
      output[parts[0]] = decodeURIComponent(parts[1]).split(',')
    } else if (isNested) {
      output[parts[0]] = makeObject(decodeURIComponent(parts[1]))
    } else {
      output[parts[0]] = decodeURIComponent(parts[1])
    }
  })

  return output
}
