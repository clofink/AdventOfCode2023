function day4Solution2(data) {
    data = data.split("\n");
    const cards = [];
    const cardByNum = {}
    for (let i = data.length - 1; i >= 0; i--) {
        const line = data[i];
        const card = parseInt(line.split(/:\s+/)[0].split(/\s+/)[1], 10);
        const cardNums = line.split(/:\s+/)[1].split(/\s+\|\s+/)[0].split(/\s+/);
        const myNums = line.split(/:\s+/)[1].split(/\s+\|\s+/)[1].split(/\s+/);
        let matches = 0;
        for (let num of myNums) {
            if (cardNums.indexOf(num) >= 0) {
                matches++;
            }
        }
        const cardsToAdd = [];
        if (matches > 0) {
            for (let i = 1; i <= matches; i++) {
                cardsToAdd.push(card + i);
            }
        }
        cards.push({cardsToAdd: cardsToAdd})
        cardByNum[card] = {cardsToAdd: cardsToAdd}
    }

    totalCards = 0;
    while (cards.length > 0) {
        totalCards++;
        let currentCard = cards.pop();
        for (let cardToAdd of currentCard.cardsToAdd) {
            cards.push(cardByNum[cardToAdd]);
        }
    }
    return totalCards;
}