  const startBtn = document.getElementById('start-btn');
  const datetimePicker = document.getElementById('datetime-picker');
  const timer = document.getElementById('timer');
  const message = document.getElementById('message');

  const daysSpan = document.getElementById('days');
  const hoursSpan = document.getElementById('hours');
  const minutesSpan = document.getElementById('minutes');
  const secondsSpan = document.getElementById('seconds');

  let countdownInterval;

  function updateTimer(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      timer.style.display = 'none';
      message.textContent = "🎉 Time's up!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysSpan.textContent = days.toString().padStart(2, '0');
    hoursSpan.textContent = hours.toString().padStart(2, '0');
    minutesSpan.textContent = minutes.toString().padStart(2, '0');
    secondsSpan.textContent = seconds.toString().padStart(2, '0');
  }

  startBtn.addEventListener('click', () => {
    const selectedDate = datetimePicker.value;
    if (!selectedDate) {
      alert('Please select a date and time.');
      return;
    }

    const endTime = new Date(selectedDate).getTime();

    if (endTime <= new Date().getTime()) {
      alert('Please select a future date and time.');
      return;
    }

    message.textContent = '';
    timer.style.display = 'flex';
    updateTimer(endTime);

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => updateTimer(endTime), 1000);
  });