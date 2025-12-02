const assert = require("node:assert");
const { stdin } = require("node:process");
const readline = require("node:readline");

function setup() {
    let rl = readline.createInterface(process.stdin);
    let values = [];
    rl.on("line", (line) => {
        const direction = line[0];
        const rawValue = parseInt(line.substring(1));
        const adjustedValue = direction === 'R' ? rawValue : 100 - (rawValue % 100);
        values.push(adjustedValue);
    });

    rl.once("close", () => main(values));
}

function main(values, start = 50) {
    const { position, count } = values.reduce((acc, val) => {
        const newPosition = Math.abs((acc.position + val) % 100);
        if (newPosition === 0 && val !== 0) {
            acc.count += 1;
        }
        console.debug("Cur: %d, Add: %d, Res: %d", acc.position, val, newPosition)
        acc.position = newPosition;
        return acc;
    }, {position: start, count: 0})

    console.log(count);
}

setup();