function day6Solution1(data) {
    data = data.split("\n");
    const times = data[0].split(/:\s+/)[1].split(/\s+/);
    const records =  data[1].split(/:\s+/)[1].split(/\s+/);
    let total = 1;
    for (let t = 0; t < times.length; t++) {
        let betterCount = 0;
        let numTime = parseInt(times[t], 10);
        let record = parseInt(records[t], 10);
        for (let i = 0; i < numTime; i++) {
            let distance = (numTime - i) * i;
            if (distance > record) betterCount++
        }
        total *= betterCount;
    }
    return total
}