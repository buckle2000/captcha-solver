const fs = require('fs-extra')
const path = require('path')
const assert = require('assert')
const jimp = require('jimp')
const image2array = require('./image2array')

function getabs(subpath, ...args) {return path.join(__dirname, ...args, subpath)}


async function generate_training_set() {
    let training_set = []
    for (let i=0;i<=9;++i) {
        for (let filename of fs.readdirSync(getabs(`samples/labeled/${i}`))) {
            let image = await jimp.read(getabs(`samples/labeled/${i}/${filename}`))
            let input = image2array(image)
            let output = new Array(10).fill(0)
            output[i] = 1
            training_set.push({
                input,
                output
            })
        }
    }
    return training_set
}

async function generate_and_save() {
    let t_set = await generate_training_set()
    fs.mkdirsSync(getabs('samples'))
    fs.writeFileSync(getabs('t_set.json', 'samples'), JSON.stringify(t_set))
}

generate_and_save()