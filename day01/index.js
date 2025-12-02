const assert = require("node:assert");
const { stdin } = require("node:process");
const readline = require("node:readline");

function setup() {
    let rl = readline.createInterface(process.stdin);
    let values = [];
    rl.on("line", (line) => {
        const direction = line[0];
        const rawValue = parseInt(line.substring(1));
        const signedValue = direction === 'R' ? rawValue : -rawValue;
        values.push(signedValue);
    });

    rl.once("close", () => main(values));
}

function main(values, start = 50) {
    const { count, midCount } = values.reduce((acc, val) => {

        let remaining = val;
        let position = acc.position;
        while (remaining !== 0) {
            if (remaining < 0) {
                if (remaining < -100) {
                    remaining += 100;
                    acc.midCount++;
                } else {
                    if (position !== 0 && position + remaining < 0) {
                        acc.midCount++;
                    }
                    position = trueMod(position + remaining, 100);
                    remaining = 0;
                }
            } else {
                if (remaining > 100) {
                    remaining -= 100;
                    acc.midCount++;
                } else {
                    if (position !== 0 && position + remaining > 100) {
                        acc.midCount++;
                    }
                    position = (position + remaining) % 100;
                    remaining = 0;
                }
            }
        }

        if (position === 0) {
            acc.count++;
            acc.midCount++;
        }
        
        acc.position = position;
        return acc;
    }, {position: start, count: 0, midCount: 0})

    console.log(count);
    console.log(midCount);
}

function trueMod(integer, modulus) {
    if (integer >= 0) {
        return integer % modulus;
    }

    let shrunkInt = integer;
    while (Math.abs(shrunkInt) > modulus) {
        shrunkInt += modulus;
    }

    return modulus + shrunkInt;
}

setup();