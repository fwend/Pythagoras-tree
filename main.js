const canvas = document.querySelector('canvas');
canvas.width = 832;
canvas.height = 832;

const g = canvas.getContext('2d');

const depthLimit = 7;
const hue = 0.15;

function drawTree(x1, y1, x2, y2, depth) {

    if (depth === depthLimit)
        return;

    const dx = x2 - x1;
    const dy = y1 - y2;

    const x3 = x2 - dy;
    const y3 = y2 - dx;
    const x4 = x1 - dy;
    const y4 = y1 - dx;
    const x5 = x4 + 0.5 * (dx - dy);
    const y5 = y4 - 0.5 * (dx + dy);

    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.lineTo(x3, y3);
    g.lineTo(x4, y4);
    g.closePath();

    g.fillStyle = HSVtoRGB(hue + depth * 0.02, 1, 1);
    g.fill();
    g.strokeStyle = "lightGray";
    g.stroke();

    g.beginPath();
    g.moveTo(x3, y3);
    g.lineTo(x4, y4);
    g.lineTo(x5, y5);
    g.closePath();

    g.fillStyle = HSVtoRGB(hue + depth * 0.035, 1, 1);
    g.fill();
    g.strokeStyle = "lightGray";
    g.stroke();

    drawTree(x4, y4, x5, y5, depth + 1);
    drawTree(x5, y5, x3, y3, depth + 1);
}

/* copied from stackoverflow */
function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return "rgb("
        + Math.round(r * 255) + ","
        + Math.round(g * 255) + ","
        + Math.round(b * 255) + ")";
}

function draw() {
    g.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(357, 650, 487, 650, 0);
}
draw();
