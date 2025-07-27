const n = 50;
let a = [];
let target = null;

function init() {
    const input = document.getElementById("targetInput").value;
    target = parseInt(input);

    if (isNaN(target) || target < 1 || target > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    a = [];
    for (let i = 0; i < n; i++) {
        a.push(Math.floor(Math.random() * 100) + 1);
    }

    showItems(a);
}

function showItems(array) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    array.forEach((val) => {
        const div = document.createElement("div");
        div.className = "box";
        div.textContent = val;
        container.appendChild(div);
    });
}

function linearSearch(arr) {
    const iterations = [];
    for (let i = 0; i < arr.length; i++) {
        iterations.push({ index: i, element: arr[i] });
        if (arr[i] === target) break;
    }
    return iterations;
}

function binarySearch(arr) {
    const iterations = [];
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        iterations.push({ index: mid, element: arr[mid] });

        if (arr[mid] === target) break;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return iterations;
}

function animate(iterations, sourceArray) {
    const container = document.getElementById("container");
    showItems(sourceArray);
    const elements = container.children;

    let step = 0;

    function stepThrough() {
        if (step >= iterations.length) return;

        const { index, element } = iterations[step];

        Array.from(elements).forEach(el => el.style.backgroundColor = 'black');

        if (element === target) {
            elements[index].style.backgroundColor = 'green';
            document.getElementById("result").innerHTML = `Element:${element} found at index ${index}`
        } else {
            elements[index].style.backgroundColor = 'red';
            document.getElementById("result").innerHTML = `Element Not in the list.`
        }

        step++;
        setTimeout(stepThrough, 200);
    }

    stepThrough();
}

function linear() {
    const copy = [...a];
    const iter = linearSearch(copy);
    animate(iter, copy);
}

function binary() {
    const copy = [...a].sort((a, b) => a - b);
    const iter = binarySearch(copy);
    animate(iter, copy);
}