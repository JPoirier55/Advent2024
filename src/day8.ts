import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
let test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/inputs/day8_test_input.txt' : 'src/inputs/day8_input.txt'
let lines: string[] = [];
try {
    const data = fs.readFileSync(filePath, 'utf8')
    lines = data.trim().split('\n')
} catch (err) {
    console.error('Error reading the file:', err);
}

function createMap(lines: string[]) {
    let map = new Map<string, number[][]>()
    const width = lines[0].length
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < width; j++) {
            const curChar = lines[i][j]
            if (curChar != '.') {
                if (map.has(curChar)) {
                    map.get(curChar)?.push([i, j])
                } else {
                    map.set(curChar, [[i, j]])
                }
            }
        }

    }
    return map
}

function getCombinations<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];

    function combine(start: number, current: T[]) {
        if (current.length === size) {
            result.push([...current]);
            return;
        }

        for (let i = start; i < array.length; i++) {
            current.push(array[i]); // Include element
            combine(i + 1, current); // Recurse for the next element
            current.pop(); // Backtrack
        }
    }

    combine(0, []);
    return result;
}

function calculateDist(combo: number[][]) {
    const x = combo[0][0] - combo[1][0]
    const y = combo[0][1] - combo[1][1]
    return [x, y]
}

function addDist(location: number[], dist: number[], add: boolean): number[] {
    // console.log('location: ' + location)
    // console.log('adding dist: ' + dist)
    const x = add ? location[0] + dist[0] : location[0] - dist[0]
    const y = add ? location[1] + dist[1] : location[1] - dist[1]
    // console.log('result: ' + [x, y])
    return [x, y]
}

function deduplicate(points: number[][]): number[][] {
    const uniquePoints = new Set<string>(); // Use a Set to track unique points
    const result: [number, number][] = [];

    for (const [x, y] of points) {
        const key = `${x},${y}`; // Convert point to a string key
        if (!uniquePoints.has(key)) {
            uniquePoints.add(key); // Add to the Set
            result.push([x, y]); // Add to the result array
        }
    }

    return result;
}

if (args[0] == '1') {
    let totalSum = 0
    const map = createMap(lines)
    let interferences: number[][] = []
    map.forEach((value, key) => {
        // console.log(`${key}: ${value}`);
        // console.log(value)
        const combos = getCombinations(value, 2)
        // console.log(combos)
        combos.forEach(combo => {
            const dist = calculateDist(combo)
            interferences.push(addDist(combo[0], dist, true))
            interferences.push(addDist(combo[1], dist, false))
            interferences = interferences.filter(([x, y]) => x >= 0 && x < lines[0].length && y >= 0 && y < lines.length)
        });
    });
    // console.log(interferences)
    interferences = deduplicate(interferences)
    // console.log(interferences)
    console.log(interferences.length)
}

if (args[0] == '2') {
    let totalSum = 0
    const map = createMap(lines)
    let interferences: number[][] = []
    map.forEach((value, key) => {
        // console.log(`${key}: ${value}`);
        // console.log(value)
        const combos = getCombinations(value, 2)
        // console.log(combos)
        combos.forEach(combo => {
            const dist = calculateDist(combo)
            for (let i = 0; i < 50; i++) {
                interferences.push(addDist(combo[0], [dist[0] * i, dist[1] * i], true))
                interferences.push(addDist(combo[1], [dist[0] * i, dist[1] * i], false))
            }

            interferences = interferences.filter(([x, y]) => x >= 0 && x < lines[0].length && y >= 0 && y < lines.length)
        });
    });
    // console.log(interferences)
    interferences = deduplicate(interferences)
    console.log(interferences)
    console.log(interferences.length)
}