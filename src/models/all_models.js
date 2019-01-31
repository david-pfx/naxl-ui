
// load models from server at start-up

import { prepModel } from '../utils/dico'
import dataLayer from '../utils/data-layer'

// simple logging function, easy to disable
function logall(...args) {
    console.log(...args)
}

let callBacks = [],
    isDone = false,
    models = {}

// simplifies compatibility
export { models as default }

// add a callback to the list to be called when done
export function watchModels(cb) {
    cb(isDone)
    if (cb && !callBacks.includes(cb))
        callBacks.push(cb)
}

// load and prepare all models, notify any registered callbacks
export function loadAllModels(cb) {
    isDone = false
    watchModels(cb)

    dataLayer.getMany('table', { join: 'all' })
    .then(response => {
        let newmod = {}
        response.data.forEach(m => { 
            m.id = m.entity
            newmod[m.id] = prepModel(m) 
        })
        models = newmod
        isDone = true
        callBacks.map(cb => cb(isDone))
    })
    .catch(err => {
        logall('error', err)	
        isDone = true
        callBacks.map(cb => cb(isDone))
    })
}
