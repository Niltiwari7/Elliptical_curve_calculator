const calculateButton = document.getElementById("calculateButton");
const pointsTable = document.getElementById("pointsTable");

calculateButton.addEventListener("click", () => {
    const a = parseInt(document.getElementById("a").value);
    const b = parseInt(document.getElementById("b").value);
    const p = parseInt(document.getElementById("c").value);

    const points = calculatePoints(a, b, p);

    // Clear existing table rows
    pointsTable.querySelector("tbody").innerHTML = "";

    // Add new rows with calculated points
    points.forEach(point => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="px-4 py-2">${point[0]}</td>
            <td class="px-4 py-2">${point[1]}</td>
        `;
        pointsTable.querySelector("tbody").appendChild(newRow);
    });
});

function calculatePoints(a, b, p) {
    const points = [];
    // Perform your elliptical curve calculations and store points in the 'points' array
    // For example, you can calculate points like this:
    for (let x = 0; x < p; x++) {
        const ySquared = (x ** 3 + a * x + b) % p;
        const y = Math.sqrt(ySquared);
        if (Number.isInteger(y)) {
            points.push([x, y]);
        }
    }
    return points;
}
