const fs = require('fs-extra')
const path = require('path')
const {Architect, Trainer} = require('synaptic')
const t_set = require('./samples/t_set.json')

function getabs(subpath, ...args) {return path.join(__dirname, ...args, subpath)}

let myNetwork = new Architect.Perceptron(100, 10, 10)
let trainer = new Trainer(myNetwork)
trainer.train(t_set);
fs.writeFileSync(getabs('samples/network.json'), JSON.stringify(myNetwork.toJSON()))