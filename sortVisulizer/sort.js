const n = 20
const a = [];
init();

function init() {
    for (let i = 0; i < n; i++) {
        a[i] = Math.random();
    }
    showBars();
}

function Bubble() {
    const copy = [...a];
    const swaps = bubbleSort(copy);
    animate(swaps);
}

function Select() {
    const copy = [...a];
    const swaps = selectionSort(copy);
    animate(swaps);
}

function insertion(){
    const copy = [...a];
    const swaps = insertionSort(copy);
    animate(swaps);
}

function animate(swaps) {
    if (swaps.length === 0) return;

    const [i, j] = swaps.shift();
    [a[i], a[j]] = [a[j], a[i]];
    showBars([i, j]);
    
    setTimeout(function () {
        animate(swaps);
    }, 100);
}

function bubbleSort(a) {
    const swaps = [];
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                swaps.push([j, j + 1]);
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }
    return swaps;
}

function selectionSort(a) {
    const swaps = [];
    for (let i = 0; i < a.length - 1; i++) {
        let min_idx = i;

        for (let j = i + 1; j < a.length; j++) {
            if (a[j] < a[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx !== i) {
            swaps.push([i, min_idx]);
            [a[i], a[min_idx]] = [a[min_idx], a[i]];
        }
    }
    return swaps;
}

function insertionSort(a) {
    const swaps =[];
    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > key) {
            swaps.push([j,j+1])
            a[j + 1] = a[j];
            j = j - 1;
        }
        a[j + 1] = key;
    }
    return swaps;
}

function showBars(indices) {
    container.innerHTML = "";
    for (let i = 0; i < a.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = a[i] * 100 + "%";
        bar.classList.add("bar");

        if (indices && indices.includes(i)) {
            bar.style.backgroundColor = "red";
        }
        container.appendChild(bar)
    }
}