function day9Solution1(data) {
    data = data.split("\n");
    let total = 0;
    for (let line of data) {
        let numStrings = line.split(" ");
        let nums = []
        for (let num of numStrings) {
            nums.push(parseInt(num, 10));
        }
        maxCount = 0;
        let layers = [[...nums]];
        let newNums = structuredClone(nums)
        while (!allZeroes(newNums)) {
            maxCount++;
            let tempNums = [];
            for (let i = 1; i < newNums.length; i++) {
                tempNums.push(newNums[i] - newNums[i-1])
            }
            layers.push([...tempNums]);
            newNums = tempNums
        }
        layers.reverse();
        let value = 0;
        let allVal = [0]
        for (let i = 1; i < layers.length; i++) {
            let lastValOfLayer = layers[i][layers[i].length - 1];
            value += lastValOfLayer;
            allVal.push(value)
        }
        total += value;
    }
    return total;
}

function allZeroes(numArr) {
    for (let num of numArr) {
        if (num !== 0) return false;
    }
    return true;
}