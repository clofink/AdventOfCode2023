function day4Solution1(data) {
    data = data.split("\n");
    let total = 0;
    for (let line of data) {
        const card = line.split(": ")[0]
        const cardNums = line.split(": ")[1].split(" | ")[0].split(" ");
        const myNums = line.split(": ")[1].split(" | ")[1].split(" ");
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