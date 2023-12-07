function day7Solution2(data) {
    data = data.split("\n");
    const cardOrder = "AKQT98765432J";
    const hands = {five: [], four: [], full: [], three: [], twoPair:[], pair: [], high: []}
    for (let line of data) {
        const handInfo = {};
        handInfo.hand = line.split(" ")[0];
        handInfo.bid = parseInt(line.split(" ")[1], 10);
        const hand = {};
        let count2s
        let count3s
        let count4s
        let count5s
        let countJs

        if (handInfo.hand === "JJJJJ") {
            count2s = 0
            count3s = 0
            count4s = 0
            count5s = 1
            countJs = 5
        }
        else {
            for (let char of handInfo.hand) {
                if (char === "J") continue;
                if (!hand[char]) hand[char] = 0;
                hand[char]++;
            }
            const counts = Object.values(hand)
            count2s = counts.join("").split("2").length - 1 || 0;
            count3s = counts.join("").split("3").length - 1 || 0;
            count4s = counts.join("").split("4").length - 1 || 0;
            count5s = counts.join("").split("5").length - 1 || 0;
            countJs = handInfo.hand.split("J").length - 1 || 0;
        }
        // five of a kind
        if (count5s === 1) {
            hands.five.push(handInfo);
        }
        else if (count4s === 1 && countJs === 1) {
            hands.five.push(handInfo);
        }
        else if (count3s === 1 && countJs === 2) {
            hands.five.push(handInfo);
        }
        else if (count2s === 1 && countJs === 3) {
            hands.five.push(handInfo);
        }
        else if (countJs === 4) {
            hands.five.push(handInfo);
        }
        // four of a kind
        else if (count4s === 1) {
            hands.four.push(handInfo);
        }
        else if (count3s === 1 && countJs === 1) {
            hands.four.push(handInfo);
        }
        else if (count2s === 1 && countJs === 2) {
            hands.four.push(handInfo);
        }
        else if (countJs === 3) {
            hands.four.push(handInfo);
        }
        // full house
        else if (count3s === 1 && count2s === 1) {
            hands.full.push(handInfo);
        }
        else if (count2s === 2 && countJs === 1) {
            hands.full.push(handInfo);
        }
        else if (count3s === 1) {
            hands.three.push(handInfo)
        }
        else if (count2s === 1 && countJs === 1) {
            hands.three.push(handInfo)
        }
        else if (countJs === 2) {
            hands.three.push(handInfo);
        }
        else if (count2s === 2) {
            hands.twoPair.push(handInfo);
        }
        else if (count2s === 1) {
            hands.pair.push(handInfo);
        }
        else if (countJs === 1) {
            hands.pair.push(handInfo);
        }
        else {
            hands.high.push(handInfo)
        }
    }
    let rankedHands = [];
    for (let type in hands) {
        const sortedHands = hands[type].toSorted(sortHands)
        rankedHands = rankedHands.concat(sortedHands);
    }
    rankedHands.reverse();

    let total = 0;
    for (let i = 0; i < rankedHands.length; i++) {
        total += rankedHands[i].bid * (i + 1)
    }
    return total;

    function sortHands(a, b) {
        for (let i = 0; i<a.hand.length; i++) {
            if (a.hand[i] === b.hand[i]) continue;
            return cardOrder.indexOf(a.hand[i]) - cardOrder.indexOf(b.hand[i]);
        }
    }

}