const fs = require('fs-extra')
const path = require('path')
const assert = require('assert')
const jimp = require('jimp')
const uuidv1 = require('uuid/v1');
const request = require('request')

function getabs(subpath, ...args) {return path.join(__dirname, ...args, subpath)}

async function slice_all_samples() {
    for (let filename of fs.readdirSync(getabs('samples/raw'))) {
        let image
        try {
            image = await jimp.read(getabs(filename, 'samples/raw'))
        } catch (err) {throw err}
        for (let x=0;x<40;x+=10) {
            assert(image.bitmap.width === 40, 'Invalid width')
            assert(image.bitmap.height === 10, 'Invalid height')
            image.clone().crop(x,0,10,10).write(getabs(`${uuidv1()}.bmp`, 'samples/sliced'))
        }
    }
}

fs.mkdirsSync(getabs('samples/sliced'))
slice_all_samples()