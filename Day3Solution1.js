function day3Solution1(data) {
    data = data.split('\n');
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        let currentNum = "";
        for (let j = 0; j < data[i].length; j++) {
            let current = data[i][j]
            let isSymbol = isNaN(parseInt(data[i][j])) && current !== ".";
            let isPeriod = current === ".";
            isNumber = !isNaN(parseInt(data[i][j]))
            if (!isNaN(parseInt(current, 10))) {
                currentNum += current;
            }
            if ((isPeriod && currentNum) || (isSymbol && currentNum) || (isNumber && j === data[i].length - 1 && currentNum)) {
                let numStartIndex;
                let numEndIndex;
                if (isNumber && j === data[i].length - 1) {
                    numStartIndex = j - (currentNum.length - 1);
                    numEndIndex = j;
    
                }
                else {
                    numStartIndex = j - currentNum.length;
                    numEndIndex = j - 1;
                }
                
                if (hasAdjacentSymbol(i, j, numStartIndex, numEndIndex)) {
                    total += parseInt(currentNum, 10);
                }
                currentNum = "";
            }
        }
    }
    return total;

    function hasAdjacentSymbol(i, j, numStartIndex, numEndIndex) {
        if (i > 0) {
            // there is a row above this
            let adjacentAbove = data[i-1].substring(numStartIndex - 1 >= 0 ? numStartIndex - 1 : 0, numEndIndex + 2 < data[i-1].length ? numEndIndex + 2 : data[i-1].length)
            for (let char of adjacentAbove) {
                if (isNaN(parseInt(char), 10) && char !== ".") {
                    return true;
                }
            }
        }
        if (i < data.length - 1) {
            // there is a row below this
            let adjacentBelow = data[i+1].substring(numStartIndex - 1 >= 0 ? numStartIndex - 1 : 0, numEndIndex + 2 < data[i+1].length ? numEndIndex + 2 : data[i+1].length)
            for (let char of adjacentBelow) {
                if (isNaN(parseInt(char), 10) && char !== ".") {
                    return true;
                }
            }
        }
        if (numStartIndex - 1 > 0) {
            // there is stuff to the left
            let adjacentLeft = data[i][numStartIndex-1];
            if (isNaN(parseInt(adjacentLeft), 10) && adjacentLeft !== ".") {
                return true;
            }
        }
        if (numEndIndex < data[i].length) {
            // there is stuff to the right
            let adjacentRight = data[i][numEndIndex + 1];
            if (adjacentRight && isNaN(parseInt(adjacentRight), 10) && adjacentRight !== ".") {
                return true;
            }
        }
        return false;
    }
}