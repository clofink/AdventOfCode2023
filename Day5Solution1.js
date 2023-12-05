function day5Solution1(data) {
    data = data.split("\n");
    let currentField = "seeds";
    const mappings = {seedToSoil: [], soilToFertilizer: [], fertilizerToWater: [], waterToLight: [], lightToTemp: [], tempToHumidity: [], humidityToLocation: []}
    let seeds;
    for (let line of data) {
        if (line === "") continue;
        switch (currentField) {
            case "seeds":
                if (line === "seed-to-soil map:") {
                    currentField = "seedToSoil";
                    break;
                }
                seeds = line.split(": ")[1].split(" ");
                break;
            case "seedToSoil":
                if (line === "soil-to-fertilizer map:") {
                    currentField = "soilToFertilizer";
                    break;
                }
                parseMapping(line, "seedToSoil");
                break;
            case "soilToFertilizer":
                if (line === "fertilizer-to-water map:") {
                    currentField = "fertilizerToWater";
                    break;
                }
                parseMapping(line, "soilToFertilizer");
                break;
            case "fertilizerToWater":
                if (line === "water-to-light map:") {
                    currentField = "waterToLight";
                    break;
                }
                parseMapping(line, "fertilizerToWater");
                break;
            case "waterToLight":
                if (line === "light-to-temperature map:") {
                    currentField = "lightToTemp";
                    break;
                }
                parseMapping(line, "waterToLight");
                break;
            case "lightToTemp":
                if (line === "temperature-to-humidity map:") {
                    currentField = "tempToHumidity";
                    break;
                }
                parseMapping(line, "lightToTemp");
                break;
            case "tempToHumidity":
                if (line === "humidity-to-location map:") {
                    currentField = "humidityToLocation";
                    break;
                }
                parseMapping(line, "tempToHumidity");
                break;
            case "humidityToLocation":
                parseMapping(line, "humidityToLocation");
                break;
            default:
                console.log(`unknown field "${currentField}"`);
                break;
        }
    }
    const order = Object.keys(mappings);
    let lowest = parseInt(seeds[0], 10);
    for (let seed of seeds) {
        let value = parseInt(seed);
        for (let mapping of order) {
            for (let range of mappings[mapping]) {
                if (value >= range.srcLow && value <= range.srcHigh) {
                    value = (range.destLow - range.srcLow) + value;
                    break;
                }
            }
        }
        if (value < lowest) lowest = value;
    }
    return lowest

    function parseMapping(rangeLine, mappingDest) {
        const rangeInfo = rangeLine.split(" ");
        const destRangeStart = parseInt(rangeInfo[0], 10)
        const sourceRangeStart = parseInt(rangeInfo[1], 10)
        const rangeLen = parseInt(rangeInfo[2], 10)
        mappings[mappingDest].push({srcLow: sourceRangeStart, srcHigh: sourceRangeStart + rangeLen - 1, destLow: destRangeStart, destHigh: destRangeStart + rangeLen - 1})
    }
}
