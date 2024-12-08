import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
let test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/inputs/day7_test_input.txt' : 'src/inputs/day7_input.txt'
let lines: string[] = [];
try {
    const data = fs.readFileSync(filePath, 'utf8')
    lines = data.trim().split('\n')
} catch (err) {
    console.error('Error reading the file:', err);
}

function generateBinaryCombinations(length: number): number[][] {
    const combinations: number[][] = [];
    const totalCombinations = 1 << length; // 2^length

    for (let i = 0; i < totalCombinations; i++) {
        const binaryString = i.toString(3).padStart(length, '0'); // Convert to binary and pad with zeros
        const combination = binaryString.split('').map(Number); // Convert to an array of numbers
        combinations.push(combination);
    }

    return combinations;
}

function generateTriCombinations(values: number[], length: number): number[][] {
    const combinations: number[][] = [];
    const totalCombinations = Math.pow(values.length, length); // Total combinations: length^number of values

    for (let i = 0; i < totalCombinations; i++) {
        const combination: number[] = [];
        let index = i;

        for (let j = 0; j < length; j++) {
            combination.push(values[index % values.length]); // Get the current value
            index = Math.floor(index / values.length); // Update the index for the next place value
        }

        combinations.push(combination.reverse()); // Reverse to match proper order
    }

    return combinations;
}

function insertBetween(array: string[], values: number[], operators: string[]): string[] {
    if (array.length <= 1) return array; // If array has 0 or 1 element, no insertion needed
    const result: string[] = [];
    let index = 0
    for (let i = 0; i < array.length; i++) {
        result.push(array[i]); // Add the current element
        if (i < array.length - 1) {
            result.push(operators[values[index]]); // Add the value in between
            index += 1
        }
    }
    return result;
}

if (args[0] == '1') {
    let totalSum = 0
    lines.forEach(line => {
        const testValue = parseInt(line.split(':')[0])
        const terms = line.split(':')[1].trimStart().split(' ')
        // const newTerms = insertBetween(terms, -1)
        const operators = ['+', '*']

        // console.log(testValue)
        // console.log(terms)
        // console.log(newTerms)
        // console.log(getCombinations(terms, terms.length))
        const combinations = generateBinaryCombinations(terms.length - 1);
        for (let i = 0; i < combinations.length; i++) {
            const newterm = insertBetween(terms, combinations[i], operators)
            // console.log(newterm.join(''))
            let sum = 0
            let value = newterm[0]
            // console.log('value1: ' + value)
            for (let j = 1; j < newterm.length; j += 2) {

                // console.log(eval(value + newterm.slice(j, j + 2).join('')))
                value = eval(value + newterm.slice(j, j + 2).join(''))
                // if (!['*', '+'].includes(newterm[j])) {
                // sum += eval(value + newterm.slice(j, j + 2).join(''))
                // console.log(sum)
                // }
            }
            const intValue = parseInt(value)
            if (intValue == testValue) {
                console.log('success: ' + intValue)
                totalSum += intValue
                break
            }
            // console.log(sum)

        }



    });
    console.log(totalSum)
}

if (args[0] == '2') {
    let totalSum = 0
    lines.forEach(line => {
        const testValue = parseInt(line.split(':')[0])
        const terms = line.split(':')[1].trimStart().split(' ')
        // const newTerms = insertBetween(terms, -1)
        const operators = ['+', '*', '||']

        // console.log(testValue)
        // console.log(terms)
        // console.log(newTerms)
        // console.log(getCombinations(terms, terms.length))
        const combinations = generateTriCombinations([0, 1, 2], terms.length - 1);
        for (let i = 0; i < combinations.length; i++) {
            const newterm = insertBetween(terms, combinations[i], operators)
            // console.log(newterm.join(''))
            let sum = 0
            let value = newterm[0]
            // console.log('value1: ' + value)
            for (let j = 1; j < newterm.length; j += 2) {
                if (newterm[j] == '||') {
                    value = value + newterm.slice(j, j + 2).join('').replace('||', '')

                } else {
                    value = eval(value + newterm.slice(j, j + 2).join(''))
                }

            }
            const intValue = parseInt(value)
            if (intValue == testValue) {
                totalSum += intValue
                break
            }
            // console.log(sum)

        }



    });
    console.log(totalSum)
}