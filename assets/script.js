const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
}

document.addEventListener('click', (e) => {
  if (!navLinks || !menuBtn) return;
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) navLinks.classList.remove('open');
});

const path = location.pathname;
const page = path.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href') || '';
  const target = href.split('/').pop();
  const isBlogDetail = path.includes('/blog/') && target === 'blog.html';
  if (page === target || isBlogDetail) link.classList.add('active');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('lab-theme');
if (savedTheme && savedTheme !== 'light') root.setAttribute('data-theme', savedTheme);
else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme', 'dark');

function updateThemeIcon() {
  if (!themeBtn) return;
  const dark = root.getAttribute('data-theme') === 'dark';
  themeBtn.innerHTML = dark ? '☀️' : '🌙';
  themeBtn.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
}
updateThemeIcon();

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') === 'dark';
    if (dark) root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'dark');
    const value = root.getAttribute('data-theme') || 'light';
    localStorage.setItem('lab-theme', value);
    updateThemeIcon();
  });
}
