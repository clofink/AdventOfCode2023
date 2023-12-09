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

        if (counts.join("").split("5").length - 1 === 1) {
            handInfo.handRank = 0;
            hands.push(handInfo);
        }
        else if (counts.join("").split("4").length - 1 === 1) {
            handInfo.handRank = 1;
            hands.push(handInfo);
        }
        else if (
            counts.join("").split("2").length - 1 === 1 && 
            counts.join("").split("3").length - 1 === 1
        ) {
            handInfo.handRank = 2;
            hands.push(handInfo);
        }
        else if (counts.join("").split("3").length - 1 === 1) {
            handInfo.handRank = 3;
            hands.push(handInfo)
        }
        else if (counts.join("").split("2").length - 1 === 2) {
            handInfo.handRank = 4;
            hands.push(handInfo);
        }
        else if (counts.join("").split("2").length - 1 === 1) {
            handInfo.handRank = 5;
            hands.push(handInfo);
        }
        else {
            handInfo.handRank = 6;
            hands.push(handInfo)
        }
    }

    hands.sort(sortHands);
    let total = 0;
    for (let i = 0; i < hands.length; i++) {
        total += hands[i].bid * (i + 1)
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
}