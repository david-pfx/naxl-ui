// Create application menu from models

// by David M Bennett david@andl.org

import models from './models/all_models';

export default {
    getMenus: function getMenus() {
        //console.log('models', models)
        let menus = Object.keys(models)
            .map(k => ({ id: k, text: models[k].label || k }))
            .sort((a,b) => a.text < b.text ? -1 : 1)
        //console.log('menus', menus)

        //const appmenus = Object.entries(models).map(m => { return { id: m.id, text: m.label } })
        return [{
            id: 'demos',/*
            title: 'Apps',
            icon: 'play',*/
            menus: menus
        }]
    }
}
