function ECC_point_addition(P, Q, a, b, p) {
    if (P[0] === -1 && P[1] === -1) {
        return Q;
    } else if (Q[0] === -1 && Q[1] === -1) {
        return P;
    } else {
        let num, den, s;
        if (P[0] === Q[0] && P[1] === Q[1]) {
            // Point doubling case
            if (P[1] === 0) {
                // P is the point at infinity, so the result is also infinity
                return [-1, -1];
            } else {
                num = (3 * P[0] ** 2 + a) % p;
                den = (2 * P[1]) % p;
            }
        } else {
            if (P[0] === Q[0]) {
                // The points are vertically aligned, result is the point at infinity
                return [-1, -1];
            }
            num = (Q[1] - P[1]) % p;
            den = (Q[0] - P[0]) % p;
        }

        // Check if the denominator is zero (mod p)
        if (den < 0) {
            den += p;
        }

        // Compute the modular multiplicative inverse of den (mod p)
        const denInverse = modInverse(den, p);

        // Compute the slope
        s = (num * denInverse) % p;

        // Calculate the x-coordinate of the result
        let x_R = (s ** 2 - P[0] - Q[0]) % p;
        if (x_R < 0) {
            x_R += p;
        }

        // Calculate the y-coordinate of the result
        let y_R = (s * (P[0] - x_R) - P[1]) % p;
        if (y_R < 0) {
            y_R += p;
        }

        return [x_R, y_R];
    }
}

function modInverse(a, m) {
    // Compute the modular multiplicative inverse using the extended Euclidean algorithm
    let m0 = m;
    let x0 = 0;
    let x1 = 1;

    if (m === 1) {
        return 0;
    }

    while (a > 1) {
        const q = Math.floor(a / m);
        let t = m;

        m = a % m;
        a = t;

        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0) {
        x1 += m0;
    }

    return x1;
}

document.getElementById("calculateButton").addEventListener("click", function () {
    // Retrieve input values
    const a = parseInt(document.getElementById("a").value);
    const b = parseInt(document.getElementById("b").value);
    const p = parseInt(document.getElementById("c").value);

    const x1 = parseFloat(document.getElementById("x").value);
    const y1 = parseFloat(document.getElementById("y").value);

    const k = parseInt(document.getElementById("k").value);

    let result = [x1, y1];
    for (let i = 1; i < k; i++) {
        result = ECC_point_addition(result, [x1, y1], a, b, p);
    }

    if (result[0] === -1 && result[1] === -1) {
        document.getElementById("resultContainer").textContent = "Point at infinity: (-1, -1)";
    } else {
        document.getElementById("resultContainer").textContent = `Result after ${k} additions: (${result[0]}, ${result[1]})`;
    }
});

