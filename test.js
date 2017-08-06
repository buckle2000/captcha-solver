const fs = require('fs-extra')
const path = require('path')
const jimp = require('jimp')
const assert = require('assert')

const {Network, Trainer} = require('synaptic')
const image2array = require('./image2array')

function getabs(subpath, ...args) {return path.join(__dirname, ...args, subpath)}

let network = Network.fromJSON(require('./samples/network.json'))
let foldername = new Date().toUTCString().replace(/[^0-9]/g,'')

async function act() {
    let counter = 0
    for (let filename of fs.readdirSync(getabs('samples/sliced')).slice(0,10)) {
        let src = getabs(filename, 'samples/sliced')
        let image
        try {
            image = await jimp.read(src)
        } catch (err) {
            console.log(src)
            throw err
        }
        let input = image2array(image)
        delete image
        let output = network.activate(input)
        assert(output.length === 10)
        assert(output.every((number) => typeof(number)==='number'))
        let max_index
        output.reduce((prev, curr, curr_index) => {
            assert(typeof(prev)==='number')
            if (curr > prev) {
                max_index = curr_index
                return curr
            } else return prev
        }, -Infinity)
        console.log(counter,':',max_index)
        fs.copySync(src, getabs(`${counter++}.bmp`, 'samples/test', foldername))
    }
}

fs.mkdirsSync(getabs(foldername, 'samples/test'))
act()