const taskInput = document.getElementById('tasks');
const profitInput = document.getElementById('profit');
const dailyDisplay = document.getElementById('daily');

function calculateEarnings() {
    const tasks = parseFloat(taskInput.value) || 0;
    const profit = parseFloat(profitInput.value) || 0;
    const daily = tasks * profit;

    dailyDisplay.innerText = `$${daily.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}

taskInput.addEventListener('input', calculateEarnings);
profitInput.addEventListener('input', calculateEarnings);