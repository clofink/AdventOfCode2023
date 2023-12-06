function day6Solution2(data) {
    data = data.split("\n");
    const time = parseInt(data[0].split(/:\s+/)[1].split(/\s+/).join(""), 10);
    const record =  parseInt(data[1].split(/:\s+/)[1].split(/\s+/).join(""), 10);
    let betterCount = 0;
    for (let i = 0; i < time; i++) {
        let distance = (time - i) * i;
        if (distance > record) betterCount++
    }
    return betterCount;
}