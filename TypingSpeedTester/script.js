 const quotes = [
      "The quick brown fox jumps over the lazy dog.",
      "Practice makes perfect.",
      "Typing speed improves with consistent effort.",
      "Hello world! Welcome to the typing speed tester.",
      "Javascript is fun when you know how to use it."
    ];

    const quoteElement = document.getElementById('quote');
    const inputElement = document.getElementById('input');
    const timerElement = document.getElementById('timer');
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const startBtn = document.getElementById('startBtn');

    let startTime, timerInterval, currentQuote = "", charSpans = [];

    function renderQuote(quote) {
      quoteElement.innerHTML = '';
      charSpans = quote.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        quoteElement.appendChild(span);
        return span;
      });
    }

    function calculateWPM(charsTyped, seconds) {
      return seconds > 0 ? Math.round((charsTyped / 5) / (seconds / 60)) : 0;
    }

    function calculateAccuracy(input, quote) {
      let correctChars = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] === quote[i]) correctChars++;
      }
      return input.length > 0 ? Math.round((correctChars / input.length) * 100) : 0;
    }

    function updateTimer() {
      const elapsed = (Date.now() - startTime) / 1000;
      timerElement.textContent = elapsed.toFixed(1);
      const charsTyped = inputElement.value.length;
      wpmElement.textContent = calculateWPM(charsTyped, elapsed);
      accuracyElement.textContent = calculateAccuracy(inputElement.value, currentQuote);
    }

    function checkInput() {
      const input = inputElement.value;
      charSpans.forEach((span, index) => {
        const typedChar = input[index];
        if (typedChar == null) {
          span.classList.remove('correct', 'incorrect');
        } else if (typedChar === span.textContent) {
          span.classList.add('correct');
          span.classList.remove('incorrect');
        } else {
          span.classList.add('incorrect');
          span.classList.remove('correct');
        }
      });

      if (input === currentQuote) {
        clearInterval(timerInterval);
        inputElement.disabled = true;
        startBtn.disabled = false;
        quoteElement.innerHTML = "🎉 <strong>Well done!</strong> Click Start to try again.";
      }
    }

    function startTest() {
      currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
      renderQuote(currentQuote);

      inputElement.value = '';
      inputElement.disabled = false;
      inputElement.focus();

      startBtn.disabled = true;
      startTime = Date.now();

      timerElement.textContent = '0.0';
      wpmElement.textContent = '0';
      accuracyElement.textContent = '0';

      clearInterval(timerInterval);
      timerInterval = setInterval(updateTimer, 100);
    }

    startBtn.addEventListener('click', startTest);
    inputElement.addEventListener('input', () => {
      updateTimer();
      checkInput();
    });