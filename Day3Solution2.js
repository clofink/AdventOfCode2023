function day3Solution2(data) {
    data = data.split('\n');
    let total = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let current = data[i][j];
            if (current === "*") {
                count++
                let partNums = adjacentPartNumers(i,j);
                if (partNums.length === 2) {
                    total += (partNums[0] * partNums[1])
                }
            }
        }
    }
    return total;

    function isNum(char) {
        return !isNaN(parseInt(char, 10))
    }

    function getNumGoingLeft(first, startI, startJ) {
        let currentNum = first;
        let currentIndex = startJ-2;
        // keep going while the digitals are numbers
        while (!isNaN(parseInt(data[startI][currentIndex]))) {
            currentNum += data[startI][currentIndex];
            currentIndex--;
        }
        return parseInt(currentNum.split("").reverse().join(""), 10);
    }

    function getNumGoingRight(first, startI, startJ) {
        let currentNum = first;
        let currentIndex = startJ+2;
        // keep going while the digitals are numbers
        while (!isNaN(parseInt(data[startI][currentIndex]))) {
            currentNum += data[startI][currentIndex];
            currentIndex++;
        }
        return parseInt(currentNum, 10)
    }

    function adjacentPartNumers(i,j) {
        let adjacentNums = [];
        let above, below, left, right;
        if (i > 0) {
            above = data[i-1].substring(j-1 >= 0 ? j - 1 : 0, j + 2 < data[i-1].length ? j + 2 : data[i-1].length);
            let isFirstNum = isNum(above[0]);
            let isSecondNum = isNum(above[1]);
            let isThirdNum = isNum(above[2]);
            if (isFirstNum && isSecondNum && isThirdNum) {
                // the whole top
                adjacentNums.push(parseInt(above, 10));
            }
            else if (isFirstNum && isThirdNum) {
                // both sides
                adjacentNums.push(getNumGoingLeft(above[0], i-1, j))
                adjacentNums.push(getNumGoingRight(above[2], i-1, j))
            }
            else if (isFirstNum && isSecondNum) {
                // just left
                adjacentNums.push(getNumGoingLeft(above[1], i-1, j+1))
            }
            else if (isSecondNum && isThirdNum) {
                // just right
                adjacentNums.push(getNumGoingRight(above[1], i-1, j-1))
            }
            else if (isFirstNum) {
                // just left
                adjacentNums.push(getNumGoingLeft(above[0], i-1, j))
            }
            else if (isThirdNum) {
                // just right
                adjacentNums.push(getNumGoingRight(above[2], i-1, j))
            }
            else if (isSecondNum) {
                // just middle
                adjacentNums.push(parseInt(above[1], 10))
            }
        }
        if (i < data.length - 1) {
            below = data[i+1].substring(j-1 >= 0 ? j - 1 : 0, j + 2 < data[i+1].length ? j + 2 : data[i+1].length);
            let isFirstNum = isNum(below[0]);
            let isSecondNum = isNum(below[1]);
            let isThirdNum = isNum(below[2]);
            if (isFirstNum && isSecondNum && isThirdNum) {
                // the whole top
                adjacentNums.push(parseInt(below));
            }
            else if (isFirstNum && isThirdNum) {
                // both sides
                adjacentNums.push(getNumGoingRight(below[2], i+1, j))
                adjacentNums.push(getNumGoingLeft(below[0], i+1, j))
            }
            else if (isFirstNum && isSecondNum) {
                // just left
                adjacentNums.push(getNumGoingLeft(below[1], i+1, j+1))
            }
            else if (isSecondNum && isThirdNum) {
                // just right
                adjacentNums.push(getNumGoingRight(below[1], i+1, j-1))
            }
            else if (isFirstNum) {
                // just left
                adjacentNums.push(getNumGoingLeft(below[0], i+1, j))
            }
            else if (isThirdNum) {
                // just right
                adjacentNums.push(getNumGoingRight(below[2], i+1, j))
            }
            else if (isSecondNum) {
                // just middle
                adjacentNums.push(parseInt(above[1], 10))
            }
        }
        if (j - 1 > 0) {
            left = data[i][j-1];
            if (!isNaN(parseInt(left))) {
                adjacentNums.push(getNumGoingLeft(left, i, j))
            }
        }
        if (j < data[i].length) {
            right = data[i][j+1];
            if (!isNaN(parseInt(right))) {
                adjacentNums.push(getNumGoingRight(right, i, j))
            }
        }
        return adjacentNums;
    }
}