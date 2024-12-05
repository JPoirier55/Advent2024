import * as fs from 'fs'

const args = process.argv.slice(2)
console.log('Command-line arguments:', args)
let test = false
if (args[1] == 'test') test = true
const filePath = test ? 'src/inputs/day5_test_input.txt' : 'src/inputs/day5_input.txt'
let lines: string[] = [];
let updates: string[][] = [];
try {
    const data = fs.readFileSync(filePath, 'utf8')
    lines = data.trim().split('\n')
    updates = lines.filter(
        line => (!line.includes('|') && line != '')
    ).map(
        update => update.split(',')
    )
    // console.log(updates)

} catch (err) {
    console.error('Error reading the file:', err);
}

function prettyPrintMap(map: Map<string, Map<string, string[]>>): void {
    map.forEach((innerMap, outerKey) => {
        console.log(`Key: ${outerKey}`);
        innerMap.forEach((valueArray, innerKey) => {
            console.log(`  ${innerKey}: [${valueArray.join(", ")}]`);
        });
    });
}

function createRuleHashMap(lines: string[]): Map<string, Map<string, string[]>> {
    const ruleMap = new Map();
    lines.filter(
        line => line.includes('|')
    ).map(
        rule => {
            const first = rule.split('|')[0]
            const second = rule.split('|')[1]

            if (ruleMap.has(first)) {
                if (ruleMap.get(first).has('before')) {
                    ruleMap.get(first).get('before').push(second)
                } else {
                    ruleMap.get(first).set('before', [second])
                }
            } else {
                ruleMap.set(first, new Map().set('before', [second]))
            }
            if (ruleMap.has(second)) {
                if (ruleMap.get(second).has('after')) {
                    ruleMap.get(second).get('after').push(first)
                } else {
                    ruleMap.get(second).set('after', [first])
                }
            } else {
                ruleMap.set(second, new Map().set('after', [first]))
            }
        }
    )
    // prettyPrintMap(ruleMap)
    return ruleMap
}

function checkRule(page: string, updates: string[], pageRules: Map<string, string[]> | undefined): string {
    const before = pageRules?.get('before')
    const after = pageRules?.get('after')
    if (before !== undefined) {
        for (let i = 0; i < before.length; i++) {
            const index = updates.indexOf(before[i])
            const pageIndex = updates.indexOf(page)
            if (index !== -1) {
                if (pageIndex > index) {
                    return before[i]
                }
            }
        }
    }
    if (after !== undefined) {
        for (let i = 0; i < after.length; i++) {
            const index = updates.indexOf(after[i])
            const pageIndex = updates.indexOf(page)
            if (index !== -1) {
                if (pageIndex < index) {
                    return after[i]
                }
            }
        }
    }
    return 'good'
}

function isOrderedSubset(subset: string[], mainArray: string[]) {
    let subsetIndex = 0; // Pointer for the subset

    for (const value of mainArray) {
        if (value === subset[subsetIndex]) {
            subsetIndex++; // Move the pointer if there's a match
        }
        if (subsetIndex === subset.length) {
            return true; // All elements of the subset were found in order
        }
    }

    return false; // Subset not completely found in order
}

if (args[0] == '1') {
    let sum = 0
    const rules = createRuleHashMap(lines)
    // check map, check index of other number and 
    // see if its greater than index of current number
    for (let i = 0; i < updates.length; i++) {
        let pageCheck = true
        for (let j = 0; j < updates[i].length; j++) {
            const page: string = updates[i][j]
            const pageRules = rules.get(page)
            const check = checkRule(page, updates[i], pageRules)
            if (check != 'good') {
                pageCheck = false
            }
        }
        if (pageCheck) sum += parseInt(updates[i][Math.floor(updates[i].length / 2)])
    }
    console.log(sum)
}

if (args[0] == '2') {
    let sum = 0
    const badPages = []
    const badNumber = []
    const rules = createRuleHashMap(lines)
    // console.log(rules)
    // check map, check index of other number and 
    // see if its greater than index of current number
    for (let i = 0; i < updates.length; i++) {
        const checks = []
        for (let j = 0; j < updates[i].length; j++) {
            const page: string = updates[i][j]
            const pageRules = rules.get(page)
            const check = checkRule(page, updates[i], pageRules)
            if (check != 'good') {
                checks.push([check, page])
            }

        }
        if (checks.length > 0) {
            const uniqueArrays = Array.from(
                new Set(checks.map(subArray => JSON.stringify(subArray.sort())))
            ).map(str => JSON.parse(str));
            console.log('uniqueArrays: ' + uniqueArrays)
            console.log(updates[i])
            const update = updates[i]
            let arr: string[] = []
            for (let i = 0; i < uniqueArrays.length; i++) {
                console.log('uniqueArray[i][0]: ' + uniqueArrays[i][0])
                arr = update
                const numLeft = uniqueArrays[i][0]
                const numRight = uniqueArrays[i][1]
                const index1 = update.indexOf(numLeft)
                const index2 = update.indexOf(numRight)
                const temp = arr[index1];
                arr[index1] = arr[index2];
                arr[index2] = temp;
                // console.log(arr[Math.floor(arr.length / 2)])
                console.log(arr)

            }
            console.log(arr[Math.floor(arr.length / 2)])
            sum += parseInt(arr[Math.floor(arr.length / 2)])
            break
        }
        
    }
    console.log(sum)
}