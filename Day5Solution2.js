function day5Solution2(data) {
    data = data.split("\n");
    let currentField = "seeds";
    const mappings = {seedToSoil: [], soilToFertilizer: [], fertilizerToWater: [], waterToLight: [], lightToTemp: [], tempToHumidity: [], humidityToLocation: []}
    let seedRanges = [];
    for (let line of data) {
        if (line === "") continue;
        switch (currentField) {
            case "seeds":
                if (line === "seed-to-soil map:") {
                    currentField = "seedToSoil";
                    break;
                }
                let tempSeeds = line.split(": ")[1].split(" ");
                while (tempSeeds.length > 0) {
                    let rangeStart = parseInt(tempSeeds.shift(), 10);
                    let rangeLen = parseInt(tempSeeds.shift(), 10);
                    seedRanges.push([rangeStart, rangeStart + rangeLen - 1]);
                }
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
    // within each list of transformations, do a while loop
    let currentRanges = seedRanges;
    for (let mapping of order) {
        let tempRanges = [];
        while (currentRanges.length > 0) {
            let rangesChecked = 0;
            let rangesToCheck = mappings[mapping].length;
            const currentRange = currentRanges.shift();
            const rangeLow = currentRange[0];
            const rangeHigh = currentRange[1];
            for (let range of mappings[mapping]) {
                rangesChecked++;
                // low is within range
                if (rangeLow >= range.srcLow && rangeLow < range.srcHigh) {
                    // the whole range is included
                    if (rangeHigh <= range.srcHigh && rangeHigh > range.srcLow) {
                        const srcDestDiff = range.destLow - range.srcLow;
                        tempRanges.push([srcDestDiff + rangeLow, srcDestDiff + rangeHigh]);
                        break;
                    }
                    else {
                        const includedCount = Math.min(range.srcHigh - rangeLow, rangeHigh - rangeLow);
                        // create a new range from what of this range is in the next range and add it to tempRanges
                        const srcDestDiff = range.destLow - range.srcLow;
                        tempRanges.push([srcDestDiff + rangeLow, srcDestDiff + (rangeLow + includedCount)]);
                        // create a new range from what is left and add to currentRanges
                        currentRanges.push([rangeLow + includedCount + 1, rangeHigh]);
                        break;
                    }
                }
                // high is within range
                else if (rangeHigh <= range.srcHigh && rangeHigh > range.srcLow) {
                    // apparently unused??
                    console.log("here")
                }
                // all ranges have been checked and it isn't in any
                if (rangesChecked >= rangesToCheck) {
                    tempRanges.push([rangeLow, rangeHigh]);
                    break;
                }
            }
        }
        currentRanges = structuredClone(tempRanges);
        tempRanges = [];
    }
    let lowest = currentRanges[0][0]
    for (let range of currentRanges) {
        if (range[0] < lowest) lowest = range[0]
    }
    return lowest;

    function parseMapping(rangeLine, mappingDest) {
        const rangeInfo = rangeLine.split(" ");
        const destRangeStart = parseInt(rangeInfo[0], 10)
        const sourceRangeStart = parseInt(rangeInfo[1], 10)
        const rangeLen = parseInt(rangeInfo[2], 10)
        mappings[mappingDest].push({srcLow: sourceRangeStart, srcHigh: sourceRangeStart + rangeLen - 1, destLow: destRangeStart, destHigh: destRangeStart + rangeLen - 1})
    }
}
