function day9Solution1(data) {
    data = data.split("\n");
    let total = 0;
    for (let line of data) {
        let numStrings = line.split(" ");
        let nums = []
        for (let num of numStrings) {
            nums.push(parseInt(num, 10));
        }
        let layers = [[...nums]];
        while (!allZeroes(nums)) {
            let tempNums = [];
            for (let i = 1; i < nums.length; i++) {
                tempNums.push(nums[i] - nums[i-1])
            }
            layers.push([...tempNums]);
            nums = tempNums
        }
        let value = 0;
        for (let i = layers.length - 2; i >= 0; i--) {
            value += layers[i][layers[i].length - 1];
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