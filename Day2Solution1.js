function day2Solution1(data) {
    const counts = {"red": 12, "blue": 14, "green": 13}
    data = data.split('\n');
    let total = 0;
    for (let game of data) {
        let info = game.split(": ");
        const cubeSets = info[1].split("; ")
        const gameId = parseInt(info[0].split(" ")[1], 10);
        let isGameImpossible = false
        for (let set of cubeSets) {
            let colors = set.split(", ");
            for (let color of colors) {
                let count = color.split(" ");
                if (counts[count[1]] < parseInt(count[0], 10)) {
                    isGameImpossible = true;
                }
            }
        }
        if (!isGameImpossible) total += gameId
    }
    return total;
}