const taskInput = document.getElementById('tasks');
const dailyDisplay = document.getElementById('daily');
const weeklyDisplay = document.getElementById('weekly');
const monthlyDisplay = document.getElementById('monthly');

const RATE_PER_TASK = 500;

function calculateEarnings() {
    const tasks = parseInt(taskInput.value) || 0;
    const daily = tasks * RATE_PER_TASK;
    const weekly = daily * 7;
    const monthly = daily * 30;

    dailyDisplay.innerText = `₦${daily.toLocaleString()}`;
    weeklyDisplay.innerText = `₦${weekly.toLocaleString()}`;
    monthlyDisplay.innerText = `₦${monthly.toLocaleString()}`;
}

taskInput.addEventListener('input', calculateEarnings);