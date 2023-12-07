function day7Solution1(data) {
    data = data.split("\n");
    const cardOrder = "AKQJT98765432";
    const hands = {five: [], four: [], full: [], three: [], twoPair:[], pair: [], high: []}
    for (let line of data) {
        const handInfo = {};
        handInfo.hand = line.split(" ")[0];
        handInfo.bid = parseInt(line.split(" ")[1], 10);
        const hand = {};
        for (let char of handInfo.hand) {
            if (!hand[char]) hand[char] = 0;
            hand[char]++;
        }
        const cards = Object.keys(hand);
        const counts = Object.values(hand)
        let count1s = counts.join("").split("1").length - 1 || 0;
        let count2s = counts.join("").split("2").length - 1 || 0;
        let count3s = counts.join("").split("3").length - 1 || 0;
        let count4s = counts.join("").split("4").length - 1 || 0;
        let count5s = counts.join("").split("5").length - 1 || 0;
        // five of a kind
        if (count5s === 1) {
            hands.five.push(handInfo);
        }
        else if (count4s === 1) {
            hands.four.push(handInfo);
        }
        else if (count3s === 1 && count2s === 1) {
            hands.full.push(handInfo);
        }
        else if (count3s === 1) {
            hands.three.push(handInfo)
        }
        else if (count2s === 2) {
            hands.twoPair.push(handInfo);
        }
        else if (count2s === 1) {
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