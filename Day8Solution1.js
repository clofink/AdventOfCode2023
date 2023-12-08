function day8Solution1(data) {
    data = data.split("\n");
    const steps = data.shift();
    data.shift();
    const tree = {}
    for (let line of data) {
        const parts = line.split(" = ");
        const node = {left: "", right: ""};
        const links = parts[1].split(", ");
        node.left = links[0].substring(1);
        node.right = links[1].substring(0, links[1].length - 1)
        tree[parts[0]] = node;
    }
    let currentNodeName = "AAA";
    let maxCount = 0;
    let currentStep = 0;
    while (currentNodeName !== "ZZZ") {
        maxCount++;
        const currentIndex = currentStep % steps.length;
        switch(steps[currentIndex]) {
            case "R":
                currentNodeName = tree[currentNodeName].right;
                break;
            case "L":
                currentNodeName = tree[currentNodeName].left;
                break;
            default:
                console.log(`Unknown direction: ${steps[currentIndex]}`);
                break;
        }
        currentStep++;
    }
    return currentStep;
}