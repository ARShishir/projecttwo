const paletteContainer = document.getElementById('palette');
const generateBtn = document.getElementById('generateBtn');

function generateRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

function generatePalette() {
  paletteContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const color = generateRandomColor();
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.style.backgroundColor = color;

    const colorText = document.createElement('span');
    colorText.textContent = color;

    colorDiv.appendChild(colorText);
    paletteContainer.appendChild(colorDiv);

    // Copy color to clipboard on click
    colorDiv.addEventListener('click', () => {
      navigator.clipboard.writeText(color).then(() => {
        alert(`Copied ${color} to clipboard!`);
      });
    });
  }
}

generateBtn.addEventListener('click', generatePalette);

// Generate initial palette
generatePalette();
