import React, { Component } from 'preact'
import { Consumer } from 'tiny-atom/preact'
import Item from '../components/Item'

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

export default class Segments extends Component {
  render (props, state) {
    const map = function (state) {
      return {
        events: state.data.googleAM.items.map(event => {
          const object = makeObject(event.url.split('?')[1])
          const name = object.iu || object.iu_parts || object.slotname
          const segments = object.cust_params && object.cust_params.permutive && object.cust_params.permutive.length
          const targeted = segments ? '✔ Targeted' : 'Not targeted'

          return <Item payload={object} title={name} subtitle={targeted} />
        })
      }
    }
    return (
      <Consumer map={map} >
        {({ events }) => (
          <div className=''>
            <h1 class='view-title'>Google Ad Manager</h1>
            { events }
          </div>
        )}
      </Consumer>
    )
  }
}
