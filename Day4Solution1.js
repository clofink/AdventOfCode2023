function day4Solution1(data) {
    data = data.split("\n");
    let total = 0;
    for (let line of data) {
        const cardNums = line.split(/:\s+/)[1].split(/\s+\|\s+/)[0].split(/\s+/);
        const myNums = line.split(/:\s+/)[1].split(/\s+\|\s+/)[1].split(/\s+/);
        let matches = 0;
        for (let num of myNums) {
            if (num === "") continue;
            if (cardNums.indexOf(num) >= 0) {
                if (!matches) matches = 1;
                else matches *= 2;
            }
        }
        total += matches;
    }
    return total;
}