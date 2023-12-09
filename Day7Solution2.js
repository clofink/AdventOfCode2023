function day7Solution2(data) {
    data = data.split("\n");
    const cardOrder = "AKQT98765432J";
    const hands = []
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
        
        if (
            (count5s === 1) || 
            (count4s === 1 && countJs === 1) ||
            (count3s === 1 && countJs === 2) ||
            (count2s === 1 && countJs === 3) ||
            (countJs >= 4)
        ) {
            handInfo.handRank = 0;
            hands.push(handInfo);
        }
        else if (
            (count4s === 1) ||
            (count3s === 1 && countJs === 1) ||
            (count2s === 1 && countJs === 2) ||
            (countJs === 3)
        ) {
            handInfo.handRank = 1;
            hands.push(handInfo);
        }
        else if (
            (count3s === 1 && count2s === 1) ||
            (count2s === 2 && countJs === 1)
        ) {
            handInfo.handRank = 2;
            hands.push(handInfo);
        }
        else if (
            (count3s === 1) ||
            (count2s === 1 && countJs === 1) ||
            (countJs === 2)
        ) {
            handInfo.handRank = 3;
            hands.push(handInfo)
        }
        else if (count2s === 2) {
            handInfo.handRank = 4;
            hands.push(handInfo);
        }
        else if (
            (count2s === 1) || 
            (countJs === 1)
        ) {
            handInfo.handRank = 5;
            hands.push(handInfo);
        }
        else {
            handInfo.handRank = 6;
            hands.push(handInfo)
        }
    }
    hands.sort(sortHands)

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