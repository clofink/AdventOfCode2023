function day7Solution1(data) {
    data = data.split("\n");
    const cardOrder = "AKQJT98765432";
    const hands = []
    for (let line of data) {
        const handInfo = {};
        handInfo.hand = line.split(" ")[0];
        handInfo.bid = parseInt(line.split(" ")[1], 10);
        const hand = {};
        for (let char of handInfo.hand) {
            if (!hand[char]) hand[char] = 0;
            hand[char]++;
        }
        const counts = Object.values(hand)

        if (isFiveOfAKind(counts)) {
            handInfo.handRank = 0;
            hands.push(handInfo);
        }
        else if (isFourOfAKind(counts)) {
            handInfo.handRank = 1;
            hands.push(handInfo);
        }
        else if (isFullHouse(counts)) {
            handInfo.handRank = 2;
            hands.push(handInfo);
        }
        else if (isThreeOfAKind(counts)) {
            handInfo.handRank = 3;
            hands.push(handInfo)
        }
        else if (isTwoPair(counts)) {
            handInfo.handRank = 4;
            hands.push(handInfo);
        }
        else if (isPair(counts)) {
            handInfo.handRank = 5;
            hands.push(handInfo);
        }
        else {
            handInfo.handRank = 6;
            hands.push(handInfo)
        }
    }

    let rankedHands = hands.toSorted(sortHands);

    let total = 0;
    for (let i = 0; i < rankedHands.length; i++) {
        total += rankedHands[i].bid * (i + 1)
    }
    return total;

    function sortHands(a, b) {
        if (a.handRank < b.handRank) return 1
        if (a.handRank > b.handRank) return -1;
        for (let i = 0; i<a.hand.length; i++) {
            if (a.hand[i] === b.hand[i]) continue;
            return cardOrder.indexOf(b.hand[i]) - cardOrder.indexOf(a.hand[i]);
        }
    }

    function isFiveOfAKind(counts) {
        return counts.join("").split("5").length - 1 === 1;
    }
    function isFourOfAKind(counts) {
        return counts.join("").split("4").length - 1 === 1;
    }
    function isFullHouse(counts) {
        return counts.join("").split("2").length - 1 === 1 && counts.join("").split("3").length - 1 === 1;
    }
    function isThreeOfAKind(counts) {
        return counts.join("").split("3").length - 1 === 1
    }
    function isTwoPair(counts) {
        return counts.join("").split("2").length - 1 === 2
    }
    function isPair(counts) {
        return counts.join("").split("2").length - 1 === 1
    }
}