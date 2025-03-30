function updateDigitalClock() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[now.getDay()];
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    document.getElementById("date").textContent = `${day}, ${date}`;
    document.getElementById("time").textContent = time;
}

function updateWallClock() {
    const now = new Date();
    const canvas = document.getElementById('wallClock');
    const ctx = canvas.getContext('2d');
    const radius = canvas.height / 2;
    ctx.translate(radius, radius);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
    ctx.fillStyle = '#282c34';
    ctx.fill();
    ctx.strokeStyle = '#61dafb';
    ctx.lineWidth = radius * 0.05;
    ctx.stroke();

    // Draw all numbers (1 to 12)
    for (let num = 1; num <= 12; num++) {
        const ang = (num * Math.PI) / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.8);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.font = `${radius * 0.15}px Arial`;
        ctx.fillText(num, 0, 0);
        ctx.translate(0, radius * 0.8);
        ctx.rotate(-ang);
    }

    // Get time
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hour = now.getHours();

    // Draw hour hand
    const hourAng = (hour % 12) * Math.PI / 6 + min * Math.PI / 360;
    drawHand(ctx, radius * 0.5, radius * 0.07, hourAng);

    // Draw minute hand
    const minAng = min * Math.PI / 30 + sec * Math.PI / 1800;
    drawHand(ctx, radius * 0.7, radius * 0.05, minAng);

    // Draw second hand
    const secAng = sec * Math.PI / 30;
    drawHand(ctx, radius * 0.9, radius * 0.02, secAng, '#ff4444');
}

function drawHand(ctx, length, width, angle, color = '#ffffff') {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-angle);
}

function updateClocks() {
    updateDigitalClock();
    const canvas = document.getElementById('wallClock');
    canvas.width = canvas.height; // Reset canvas to clear old drawings
    updateWallClock();
}

// Run the clock updates every second
setInterval(updateClocks, 1000);
updateClocks(); // Initial call to display clocks immediately
