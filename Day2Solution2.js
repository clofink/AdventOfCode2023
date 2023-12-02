function day2Solution2(data) {
    data = data.split('\n');
    let totalPower = 0;
    for (let game of data) {
        const lowest = {"green": 0, "red": 0, "blue": 0}
        let info = game.split(": ");
        const cubeSets = info[1].split("; ")
        for (let set of cubeSets) {
            let colors = set.split(", ");
            for (let color of colors) {
                let count = color.split(" ");
                if (lowest[count[1]] < parseInt(count[0], 10)) lowest[count[1]] = parseInt(count[0], 10)
            }
        }
        totalPower = totalPower + (lowest.blue * lowest.green * lowest.red)
    }
    return totalPower;
}