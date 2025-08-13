import merge from 'lodash.merge'


process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";


let envConfig 


if ( stage === 'production') {
    envConfig = require('./prod').default
} else if (stage === 'tesing'){
    envConfig = require('./testing').default
} else {
    envConfig = require('./local').default
}

// port can be dynamically changed to PORT if prod is selected
export default merge({
    stage, 
    env: process.env.NODE_ENV,
    port: 3001, 
    logging: false,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
}, envConfig)