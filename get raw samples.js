const fs = require('fs-extra')
const path = require('path')
const uuidv1 = require('uuid/v1');
const request = require('request')

function getabs(subpath) {return path.join(__dirname, subpath)}

function get_sample() {
    return new Promise((resolve, reject) => {
        request.get('http://zmdjsbyy.com/admin/GetCode.asp')
        .on('response', function(response) {
            if (response.statusCode !== 200) reject('Status code error')
            resolve()
        })
        .pipe(fs.createWriteStream(getabs(`samples/raw/${uuidv1()}.bmp`)))
    });
}

async function get_200_samples() {
    for (let i=0;i<200;++i) {
        await get_sample()
    }
}

fs.mkdirsSync(getabs('samples/raw'))
get_200_samples()