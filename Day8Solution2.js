function day8Solution2(data) {
    data = data.split("\n");
    const steps = data.shift();
    data.shift();
    const tree = {}
    const startNodes = [];
    const endNodes = [];
    for (let line of data) {
        const parts = line.split(" = ");
        const node = {left: "", right: ""};
        const links = parts[1].split(", ");
        node.left = links[0].substring(1);
        node.right = links[1].substring(0, links[1].length - 1)
        if (parts[0][2] === "A") startNodes.push(parts[0]);
        if (parts[0][2] === "Z") endNodes.push(parts[0]);
        tree[parts[0]] = node;
    }

    const allLengths = [];
    for (let node of startNodes) {
        let currentStep = 0;
        let currentNodeName = node;
        while (endNodes.indexOf(currentNodeName) < 0) {
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
        allLengths.push(currentStep);
    }
    return leastCommonMultiple(allLengths);
}

// from https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
function leastCommonMultiple(arr) {
    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }

    var multiple = arr[0];
    arr.forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}
