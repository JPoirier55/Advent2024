import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
let test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/inputs/day4_test_input.txt' : 'src/inputs/day4_input.txt'
let lines: string[][] = [];
try {
    const data = fs.readFileSync(filePath, 'utf8')
    const line_arr = data.trim().split('\n')
    for (let i = 0; i < line_arr.length; i++) {
        lines[i] = line_arr[i].split('')
    }
} catch (err) {
    console.error('Error reading the file:', err);
}

if (args[0] == '1') {
    let sum = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const letter = lines[i][j]
            const width = lines[0].length
            const length = lines.length
            if (letter == 'X') {
                // left
                if (j >= 3) {
                    if (lines[i][j - 1] + lines[i][j - 2] + lines[i][j - 3] == 'MAS') {
                        sum += 1
                    }
                }
                // up left
                if ((j >= 3) && (i >= 3)) {
                    if (lines[i - 1][j - 1] + lines[i - 2][j - 2] + lines[i - 3][j - 3] == 'MAS') {
                        sum += 1
                    }
                }
                // up
                if (i >= 3) {
                    if (lines[i - 1][j] + lines[i - 2][j] + lines[i - 3][j] == 'MAS') {
                        sum += 1
                    }
                }
                // up right
                if ((i >= 3) && (j < width - 3)) {
                    if ((lines[i - 1][j + 1] + lines[i - 2][j + 2] + lines[i - 3][j + 3] == 'MAS')) {
                        sum += 1
                    }
                }
                // right
                if (j < width - 3) {
                    if (lines[i][j + 1] + lines[i][j + 2] + lines[i][j + 3] == 'MAS') {
                        sum += 1
                    }
                }
                // down right
                if ((i < length - 3) && (j < width - 3)) {
                    if (lines[i + 1][j + 1] + lines[i + 2][j + 2] + lines[i + 3][j + 3] == 'MAS') {
                        sum += 1
                    }
                }
                // down
                if (i < length - 3) {
                    if (lines[i + 1][j] + lines[i + 2][j] + lines[i + 3][j] == 'MAS') {
                        sum += 1
                    }
                }
                // down left
                if ((i < length - 3) && (j >= 3)) {
                    if (lines[i + 1][j - 1] + lines[i + 2][j - 2] + lines[i + 3][j - 3] == 'MAS') {
                        sum += 1
                    }
                }
            }
        }
    }
    console.log(sum)
}

if (args[0] == '2') {
    let sum = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const letter = lines[i][j]
            const width = lines[0].length
            const length = lines.length
            if (letter == 'A') {
                const options = ['MAS', 'SAM']
                if ((j >= 1) && (i >= 1) && (j < width - 1) && (i < length - 1)) {
                    const upLeft = lines[i - 1][j - 1]
                    const upRight = lines[i - 1][j + 1]
                    const bottomRight = lines[i + 1][j + 1]
                    const bottomLeft = lines[i + 1][j - 1]
                    if (
                        options.includes(bottomLeft + 'A' + upRight) && 
                        options.includes(bottomRight + 'A' + upLeft)
                    ) {
                        sum += 1
                    }
                }
            }
        }
    }
    console.log(sum)
}
