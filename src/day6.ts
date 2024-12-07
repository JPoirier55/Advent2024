import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
let test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/inputs/day6_test_input.txt' : 'src/inputs/day6_input.txt'
let lines: string[] = [];
try {
    const data = fs.readFileSync(filePath, 'utf8')
    lines = data.trim().split('\n')
} catch (err) {
    console.error('Error reading the file:', err);
}

function createMap(lines: string[]) {
    const length = lines[0].length
    const obstacles = []
    let startingLocation: number[] = []
    const openSpaces = []
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < length; j++) {
            // if (lines[i][j] == '#') {
            //     obstacles.push([i,j])
            // }
            // console.log(lines[i][j])
            if (lines[i][j] == '^') {
                startingLocation = [i, j]
            }
            // else {
            //     openSpaces.push([i,j])
            // }
        }

    }
    return startingLocation
}

if (args[0] == '1') {
    const startingLocation = createMap(lines)
    // const length = lines[0].length
    // for (let i = 0; i < lines.length; i++) {
    //     for (let j = 0; j < length; j++) {

    //     }

    // }
    console.log(startingLocation)
    let i = startingLocation[0]
    let j = startingLocation[1]
    let direction = 'up'
    const locationsHit: number[][] = []
    const width = lines[0].length
    const height = lines.length
    // let cur = [i,j]
    let next = lines[i + 1][j + 1]
    locationsHit.push([i, j])
    while (true) {
        console.log(lines[i][j])
        console.log('location: ' + i + ':' + j)

        if (direction == 'up') {
            console.log('moving up')
            if (i >= 0) {
                lines[i - 1][j] === '#' ? (direction = 'right') : (i -= 1)
            } else break
        }
        else if (direction == 'right') {
            console.log('moving right')
            if (j < width - 1) {
                lines[i][j + 1] === '#' ? (direction = 'down') : (j += 1)
            } else break
        }
        else if (direction == 'down') {
            console.log('moving down')
            if (i < height - 1) {
                lines[i + 1][j] === '#' ? (direction = 'left') : (i += 1)
            } else break
        }
        else if (direction == 'left') {
            console.log('moving left')
            if (j >= 0) {
                lines[i][j - 1] === '#' ? (direction = 'up') : (j -= 1)
            }
        }
        locationsHit.push([i, j])
    }
    const dedupedArray = Array.from(
        locationsHit.reduce((map, item) => map.set(item.toString(), item), new Map()).values()
    )
    console.log(dedupedArray.length)
}

if (args[0] == '2') {

}