const fs = require('fs')
const os = require('os')
const path = require('path')
const logPath = path.join(__dirname, '../server.log');



module.exports = (req, res, next) => {

    console.log('logger работает');
    const now = Date.now()
    const {url, method} = req

    const data = `${now}: вызван ${method} по ${url}`
    
    console.log(data);

    fs.appendFile(logPath, data + os.EOL, (err) => {
        if (err) {
            console.log(err)
        }
    })

    next()
}