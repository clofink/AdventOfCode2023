function day1Solution1(data) {
    let total = 0;
    data = data.split('\n')
    for (let line of data) {
        let firstNum;
        let lastNum;
        for (let char of line) {
            if (!isNaN(parseInt(char, 10))) {
                if (!firstNum) firstNum = char;
                lastNum = char;
            }
        }
        total = total + parseInt(firstNum + lastNum, 10)
    }
    return total;
}