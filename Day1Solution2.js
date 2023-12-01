function day1Solution2(data) {
    let total = 0;
    data = data.split('\n')
    const numWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    for (let line of data) {
        let firstNum;
        let lastNum;
        let firstNumIndex;
        let lastNumIndex;
        let firstNumWord;
        let lastNumWord;
        let firstNumWordIndex;
        let lastNumWordIndex;
        for (let num of numWords) {
            let numWordIndex = line.indexOf(num);
            let numWordIndexLast = line.lastIndexOf(num);
            if (numWordIndex === -1) continue;
            if (firstNumWordIndex === undefined || numWordIndex < firstNumWordIndex) {
                firstNumWordIndex = numWordIndex;
                firstNumWord = num;
            }
            if (lastNumWordIndex === undefined || numWordIndexLast > lastNumWordIndex) {
                console.log(num, numWordIndexLast)
                lastNumWordIndex = numWordIndexLast;
                lastNumWord = num;
            }
        }
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (!isNaN(parseInt(char, 10))) {
                if (!firstNum) {
                    firstNumIndex = i;
                    firstNum = char;
                }
                lastNumIndex = i;
                lastNum = char;
            }
        }
        let actualLast;
        let actualFirst;
        if (lastNumIndex !== undefined && lastNumWordIndex === undefined) {
            actualLast = parseInt(lastNum, 10);
        }
        else if (lastNumIndex === undefined && lastNumWordIndex !== undefined) {
            actualLast = numWords.indexOf(lastNumWord) + 1;
        }
        else if (lastNumIndex !== undefined && lastNumWordIndex !== undefined && lastNumIndex > lastNumWordIndex) {
            actualLast = parseInt(lastNum, 10);
        }
        else {
            actualLast = numWords.indexOf(lastNumWord) + 1;
        }
        if (firstNumIndex !== undefined && firstNumWordIndex === undefined) {
            actualFirst = parseInt(firstNum, 10);
        }
        else if (firstNumIndex === undefined && firstNumWordIndex !== undefined) {
            actualFirst = numWords.indexOf(firstNumWord) + 1;
        }
        else if (firstNumIndex !== undefined && firstNumWordIndex !== undefined && firstNumIndex < firstNumWordIndex) {
            actualFirst = parseInt(firstNum, 10);
        }
        else {
            actualFirst = numWords.indexOf(firstNumWord) + 1;
        }
        let combined;
        if (actualFirst !== 0 && actualLast !== 0) combined = parseInt(actualFirst.toString() + actualLast.toString(), 10);
        else if (actualFirst === 0 && actualLast !== 0) combined = actualLast;
        else if (actualFirst !== 0 && actualLast === 0) combined = actualFirst;
        total = total + combined;
    }

    return total;
}