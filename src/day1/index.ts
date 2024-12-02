import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
var test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/day1/test_input.txt' : 'src/day1/input.txt'
const column1: number[] = []
const column2: number[] = []
try {
    const data = fs.readFileSync(filePath, 'utf8')
    const lines = data.trim().split('\n')
    lines.forEach((line: string) => {
        const [col1, col2] = line.trim().split(/\s+/).map(Number)
        column1.push(col1)
        column2.push(col2)
    });
} catch (err) {
    console.error('Error reading the file:', err);
}

if (args[0] == '1') {
    column1.sort((a, b) => a - b)
    column2.sort((a, b) => a - b)
    var sum = 0
    for (let i = 0; i < column1.length; i++) {
        sum += Math.abs(column1[i] - column2[i])
    }
    console.log(sum)
}

if (args[0] == '2') {
    var sum = 0
    for (let i = 0; i < column1.length; i++) {
        var occurence = 0
        for (let j = 0; j < column2.length; j++) {
            if (column1[i] == column2[j]) {
                occurence += 1
            }
        }
        sum += occurence * column1[i]
    }
    console.log(sum)
}
