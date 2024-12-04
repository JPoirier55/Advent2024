import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
let test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/inputs/day3_test_input.txt' : 'src/inputs/day3_input.txt'
let lines: string[] = [];
try {
    const data = fs.readFileSync(filePath, 'utf8')
    lines = data.trim().split('\n')
} catch (err) {
    console.error('Error reading the file:', err);
}

if (args[0] == '1') {
    const regex = /mul\((\d+),(\d+)\)/g;
    const matches = [];
    let match;
    let sum = 0;
    lines.forEach(code => {
        while ((match = regex.exec(code)) !== null) {
            const firstDigit = parseInt(match[1], 10); 
            const secondDigit = parseInt(match[2], 10); 
            matches.push([firstDigit, secondDigit]);
            sum += firstDigit * secondDigit
        }
    });
    console.log(sum)
}

if (args[0] == '2') {
    const regex = /(mul|do|don't)\((\d*,?\d*)\)/g;
    let match;
    let do_command = true
    let sum = 0
    lines.forEach(code => {
        while ((match = regex.exec(code)) !== null) {
            const operation = match[1];
            if (operation == 'do') {
                do_command = true
            }
            if (operation == "don't") {
                do_command = false
            }
            if (do_command) {
                if (match[2] != '') {
                    const firstDigit = parseInt(match[2].split(',')[0], 10);
                    const secondDigit = parseInt(match[2].split(',')[1], 10);
                    sum += firstDigit * secondDigit
                }
            }
        }
    })
    console.log(sum)
}
