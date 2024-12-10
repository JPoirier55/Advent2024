import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
let test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/inputs/day9_test_input.txt' : 'src/inputs/day9_input.txt'
let lines: string = '';
try {
    const data = fs.readFileSync(filePath, 'utf8')
    lines = data.trim()
} catch (err) {
    console.error('Error reading the file:', err);
}

function calcCheckSum(blocks: string[]) {
    let checksum = 0
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] == '.') break
        checksum += parseInt(blocks[i]) * i
    }
    return checksum
}

function buildBlocks(lines: string) {
    const blocks: string[] = []
    let fileId = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < parseInt(lines[i]); j++) {
            if (i % 2 !== 0) {
                blocks.push('.')
            } else {
                blocks.push(fileId.toString())
            }
        }
        if (i % 2 !== 0) fileId += 1
    }

    return blocks
}



if (args[0] == '1') {
    console.log(lines)
    const blocks = buildBlocks(lines)

    let removeIndex = blocks.length - 1
    if (blocks[removeIndex] == '.') {
        removeIndex -= 1
    }
    for (let i = 0; i < blocks.length; i++) {
        if (i >= removeIndex) {
            break
        }
        if (blocks[i] == '.') {
            let temp = blocks[removeIndex]
            while (temp == '.') {
                removeIndex -= 1
                if (i >= removeIndex) {
                    break
                }
                temp = blocks[removeIndex]
            }
            blocks[removeIndex] = blocks[i]
            blocks[i] = temp
            removeIndex -= 1
        }
    }
    console.log(calcCheckSum(blocks))
}

function getBlockLengths(indices: number[]): number[] {
    const lengths: number[] = [];
    let blockLength = 1;

    for (let i = 1; i < indices.length; i++) {
        if (indices[i] === indices[i - 1] + 1) {
            blockLength++;
        } else {
            lengths.push(blockLength);
            blockLength = 1;
        }
    }
    lengths.push(blockLength);
    return lengths;
}

function groupIndices(array: string[]): Record<string, number[]> {
    const indexMap: Record<string, number[]> = {};
    array.forEach((value, index) => {
        if (!indexMap[value]) {
            indexMap[value] = [];
        }
        indexMap[value].push(index);
    });
    return indexMap;
}
function reconstructArray(mapping: Record<string, number[]>): string[] {
    // Step 1: Determine the size of the original array
    const maxIndex = Math.max(...Object.values(mapping).flat());
    const reconstructedArray = new Array(maxIndex + 1).fill(null);

    // Step 2: Populate the array using the mapping
    for (const [value, indices] of Object.entries(mapping)) {
        for (const index of indices) {
            reconstructedArray[index] = value;
        }
    }

    return reconstructedArray;
}

function insertZeros(array: number[], positions: number[]): number[] {
    positions.sort((a, b) => a - b); // Ensure positions are sorted
    for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        array.splice(position, 0, 0); // Insert a 0 at the specified position
    }
    return array;
}

function buildBlocks2(lines: string) {
    const blocks: string[] = []
    let fileId = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < parseInt(lines[i]); j++) {
            if (i % 2 !== 0) {
                blocks.push('.')
            } else {
                blocks.push(fileId.toString())
            }
        }
        if (i % 2 !== 0) fileId += 1
    }

    return blocks
}

if (args[0] == '2') {
    // console.log(lines)
    const blocks = buildBlocks2(lines)

    // console.log(blocks)

    let removeIndex = blocks.length - 1
    while (blocks[removeIndex] == '.') {
        removeIndex -= 1
    }
    let startNumber = parseInt(blocks[removeIndex])

    const blockMap = groupIndices(blocks)
    const ogBlockLengths = getBlockLengths(blockMap['.'])
    let emptyBlockLengths: number[] = []
    let curindex = 0
    for (let index = 0; index < ogBlockLengths.length; index++) {
        emptyBlockLengths[index + curindex] = ogBlockLengths[index]
        for (let index2 = 0; index2 < ogBlockLengths[index]; index2++) {
            insertZeros(emptyBlockLengths, [index + ogBlockLengths[index] + 1])
            curindex += 1
        }
    }
    console.log(emptyBlockLengths)

    for (let i = startNumber; i >= 0; i--) {
        for (let j = 0; j < emptyBlockLengths.length; j++) {
            if (blockMap[i].length <= emptyBlockLengths[j]) {
                for (let k = 0; k < blockMap[i].length; k++) {

                    const temp = blockMap['.'][j + k]
                    blockMap['.'][j + k] = blockMap[i][k]
                    emptyBlockLengths[j] -= 1

                    blockMap[i][k] = temp
                }
                break
            }
        }
        console.log(reconstructArray(blockMap))
    }
}