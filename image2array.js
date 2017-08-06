const assert = require('assert')

module.exports = function (image) {
    let input = new Array(100)
    let counter = 0
    assert(100 === image.bitmap.width*image.bitmap.height, 'Invalid image size')
    image = image.greyscale()
    image.scan(0,0,image.bitmap.width,image.bitmap.height, (x,y,idx) => {
        let green = image.bitmap.data[idx+1]
        input[counter++] = green < 128 ? 0 : 1                
    })
    assert(counter === 100, 'Invalid image size/T')
    return input
}