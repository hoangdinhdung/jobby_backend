const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js');

let modules = {};

files.forEach(file => {
    try {
        // try to import if error => skip
        const modulePath = path.join(__dirname, file);
        const moduleName = path.basename(modulePath, '.js');
        modules = {
            ...modules,
            ...require(modulePath)
        };
    } catch (error) {
        
    }
});

module.exports = modules;