function day7Solution2(data) {
    data = data.split("\n");
    const cardOrder = "AKQT98765432J";
    const hands = {five: [], four: [], full: [], three: [], twoPair:[], pair: [], high: []}
    for (let line of data) {
        const handInfo = {};
        handInfo.hand = line.split(" ")[0];
        handInfo.bid = parseInt(line.split(" ")[1], 10);
        const hand = {};

        for (let char of handInfo.hand) {
            if (char === "J") continue;
            if (!hand[char]) hand[char] = 0;
            hand[char]++;
        }
        const counts = Object.values(hand)
        let count2s = counts.join("").split("2").length - 1 || 0;
        let count3s = counts.join("").split("3").length - 1 || 0;
        let count4s = counts.join("").split("4").length - 1 || 0;
        let count5s = counts.join("").split("5").length - 1 || 0;
        let countJs = handInfo.hand.split("J").length - 1 || 0;
        
        // five of a kind
        if (
            (count5s === 1) || 
            (count4s === 1 && countJs === 1) ||
            (count3s === 1 && countJs === 2) ||
            (count2s === 1 && countJs === 3) ||
            (countJs >= 4)
        ) {
            hands.five.push(handInfo);
        }
        // four of a kind
        else if (
            (count4s === 1) ||
            (count3s === 1 && countJs === 1) ||
            (count2s === 1 && countJs === 2) ||
            (countJs === 3)
        ) {
            hands.four.push(handInfo);
        }
        // full house
        else if (
            (count3s === 1 && count2s === 1) ||
            (count2s === 2 && countJs === 1)
        ) {
            hands.full.push(handInfo);
        }
        // three of a kind
        else if (
            (count3s === 1) ||
            (count2s === 1 && countJs === 1) ||
            (countJs === 2)
        ) {
            hands.three.push(handInfo)
        }
        // two pair
        else if (count2s === 2) {
            hands.twoPair.push(handInfo);
        }
        // pair
        else if (
            (count2s === 1) || 
            (countJs === 1)
        ) {
            hands.pair.push(handInfo);
        }
        // high card
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