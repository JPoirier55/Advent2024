import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
let test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/inputs/day2_test_input.txt' : 'src/inputs/day2_input.txt'
let lines: string[] = [];
try {
    const data = fs.readFileSync(filePath, 'utf8')
    lines = data.trim().split('\n')
} catch (err) {
    console.error('Error reading the file:', err);
}

if (args[0] == '1') {
    let sum = 0
    lines.forEach(line => {
        const levels = line.split(' ').map((str) => parseInt(str))
        console.log(levels)
        let cur: number = levels[0]
        let last: number | null = null
        let safe = true
        let increasing = true
        if (levels[0] - levels[levels.length - 1] > 0) {
            increasing = false
        }

        for (let i = 0; i < levels.length; i++) {
            cur = levels[i]
            if (last != null) {
                if (
                    (Math.abs(cur - last) > 3) ||
                    (increasing && (cur - last < 0)) ||
                    (!increasing && (cur - last > 0)) ||
                    (cur - last == 0)
                ) {

                    break
                }
            }
            last = cur
        }
        if (safe) sum += 1
        console.log(safe)
    });
    console.log(sum)
}

function isSafe(cur: number, last: number, increasing: boolean): boolean {
    const absCheck = (Math.abs(cur - last) > 3)
    const inc = (increasing && (cur - last < 0))
    const dec = (!increasing && (cur - last > 0))
    const nonZero = (cur - last == 0)
    if (absCheck || inc || dec || nonZero) {
        return false
    } else {
        return true
    }
}

function checkArray(levels: number[]) {
    const increasing = (levels[0] - levels[levels.length - 1] < 0) ? true : false
    for (let i = 0; i < levels.length; i++) {
        if (i != 0) {
            if (!isSafe(levels[i], levels[i - 1], increasing)) {
                return i
            }
        }
    }
    return 0
}

if (args[0] == '2') {
    let sum = 0
    lines.forEach(line => {
        const levels = line.split(' ').map((str) => parseInt(str))
        const check = checkArray(levels)
        if (check != 0) {
            const splicedLevels = [...levels]
            splicedLevels.splice(check - 1, 1)
            const splicedCheck = checkArray(splicedLevels)
            if (splicedCheck == 0) {
                sum += 1
            } else {
                const otherSplicedLevels = [...levels]
                otherSplicedLevels.splice(check, 1)
                const otherSplicedCheck = checkArray(otherSplicedLevels)
                if (otherSplicedCheck == 0) {
                    sum += 1
                }
            }
        } else {
            sum += 1
        }
    });
    console.log(sum)

}
