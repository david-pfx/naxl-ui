
// load models from server at start-up

import { prepModel } from '../utils/dico'
import dataLayer from '../utils/data-layer'

// simple logging function, easy to disable
function logall(...args) {
    console.log(...args)
}

let models = {}

// load and prepare all models
function loadAllModels(cb) {
    dataLayer.getMany('table')
    .then(response => {
        let newmod = {}
        response.data.forEach(m => { 
            m.id = m.entity
            newmod[m.id] = prepModel(m) 
        })
        //logall('models', newmod)	
        models = newmod
        if (cb) cb()
    })
    .catch(err => {
        logall('error', err)	
    })
    
    
}

export { models as default, loadAllModels }
