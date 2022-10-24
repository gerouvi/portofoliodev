const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');

const colors = document.querySelectorAll('.colors__item');

const rootStyles = document.documentElement.style;

const flagsElement = document.getElementById('flags');

const textsToChange = document.querySelectorAll('[data-section]');

flagsElement.addEventListener('click', (e) => {
  changeLanguage(e.target.parentElement.dataset.language);
});

const changeLanguage = async (language) => {
  const res = await fetch(`./languages/${language}.json`);
  const texts = await res.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.textContent = texts[section][value];
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const mode = localStorage.getItem('mode');

  if (mode === 'dark') {
    toggleIcon.src = 'assets/icons/sun.svg';
    toggleText.textContent = 'Light Mode';
    document.body.classList.add('dark');
  }
});

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (toggleIcon.src.includes('moon.svg')) {
    toggleIcon.src = 'assets/icons/sun.svg';
    toggleText.textContent = 'Light Mode';
    localStorage.setItem('mode', 'dark');
  } else {
    toggleIcon.src = 'assets/icons/moon.svg';
    toggleText.textContent = 'Dark Mode';
    localStorage.setItem('mode', 'light');
  }
});

colors.forEach((color) =>
  color.addEventListener('click', (e) => {
    rootStyles.setProperty('--primary-color', e.target.dataset.color);
  })
);
