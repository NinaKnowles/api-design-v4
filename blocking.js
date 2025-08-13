
// below doesn't really take long to do so it's not a big deal

// but  in some cases where it is CPU intensive we need to consider blocking code
// in these situations we need to think about implementing asynchronous code 

// const me = 'nina'
// console.log(me)

// below is synchronous and is blocking, you might wanna do it asynchonously
// const fs = require('fs')
// const path = require('path')
// const result = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8');
// console.log(result)

// non blocking async
// something that is cpu intensive in route handlers should be made non blocking async

const fs = require('fs/promises')
const path = require('path')

const read = async() => {
    const result2 = fs.readFile(path.join(__dirname, 'package.json'), 'utf-8');
    console.log(result2)
    return result2
}

read().then(f => console.log(f))
console.log('hi')

// another way is to use child process, this is ideally for CPU intensive things that we have control over e.g. CRON jobs 
// not something the user has control of