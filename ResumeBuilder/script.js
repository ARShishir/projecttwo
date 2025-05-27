// script.js

function updatePreview() {
  document.getElementById('previewName').textContent = document.getElementById('fullName').value || 'Your Name';
  document.getElementById('previewTitle').textContent = document.getElementById('jobTitle').value || 'Job Title';
  document.getElementById('previewSummary').textContent = document.getElementById('summary').value || '';
  document.getElementById('previewEmail').textContent = document.getElementById('email').value || '';
  document.getElementById('previewPhone').textContent = document.getElementById('phone').value || '';
  document.getElementById('previewLinkedin').textContent = document.getElementById('linkedin').value || '';
  
  const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim()).filter(Boolean);
  const skillsList = document.getElementById('previewSkills');
  skillsList.innerHTML = '';
  skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  document.getElementById('previewExperience').textContent = document.getElementById('experience').value || '';
  document.getElementById('previewEducation').textContent = document.getElementById('education').value || '';
}

function previewImage() {
  const input = document.getElementById('profilePhoto');
  const preview = document.getElementById('previewImage');
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function generatePDF() {
  const element = document.getElementById('resume');
  const opt = {
    margin:       0.3,
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

function toggleTheme() {
  const htmlEl = document.documentElement;
  const current = htmlEl.getAttribute('data-theme');
  htmlEl.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
