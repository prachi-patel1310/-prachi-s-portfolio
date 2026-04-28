 // Cursor
 const cursor = document.getElementById('cursor');
 const ring = document.getElementById('cursor-ring');
 let mx = 0, my = 0, rx = 0, ry = 0;
 document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
 function animateCursor() {
   cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
   rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
   ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
   requestAnimationFrame(animateCursor);
 }
 animateCursor();

 // Intersection Observer for reveal
 const reveals = document.querySelectorAll('.reveal');
 const observer = new IntersectionObserver(entries => {
   entries.forEach((e, i) => {
     if (e.isIntersecting) {
       e.target.style.transitionDelay = (i % 4) * 0.1 + 's';
       e.target.classList.add('visible');
     }
   });
 }, { threshold: 0.15 });
 reveals.forEach(el => observer.observe(el));

 // Timeline
 const tlItems = document.querySelectorAll('.timeline-item');
 const tlObserver = new IntersectionObserver(entries => {
   entries.forEach((e, i) => {
     if (e.isIntersecting) {
       setTimeout(() => e.target.classList.add('visible'), i * 150);
     }
   });
 }, { threshold: 0.2 });
 tlItems.forEach(el => tlObserver.observe(el));

 // Skill card stagger
 const skillCards = document.querySelectorAll('.skill-card');
 const skillObs = new IntersectionObserver(entries => {
   entries.forEach((e, i) => {
     if (e.isIntersecting) {
       setTimeout(() => e.target.classList.add('visible'), i * 80);
     }
   });
 }, { threshold: 0.1 });
 skillCards.forEach(el => skillObs.observe(el));

 // Active nav highlight
 const sections = document.querySelectorAll('section[id]');
 const navLinks = document.querySelectorAll('.nav-links a');
 window.addEventListener('scroll', () => {
   let current = '';
   sections.forEach(s => {
     if (window.scrollY >= s.offsetTop - 120) current = s.id;
   });
   navLinks.forEach(a => {
     a.style.color = a.getAttribute('href') === '#' + current ? 'var(--neon)' : '';
   });
 });

 // Typing effect for code window
 function typeEffect() {
   const lines = document.querySelectorAll('#code-window .code-line');
   lines.forEach((line, i) => {
     line.style.opacity = '0';
     line.style.transform = 'translateX(-10px)';
     setTimeout(() => {
       line.style.transition = 'opacity 0.3s, transform 0.3s';
       line.style.opacity = '1';
       line.style.transform = 'translateX(0)';
     }, 600 + i * 100);
   });
 }
 const codeObs = new IntersectionObserver(entries => {
   if (entries[0].isIntersecting) { typeEffect(); codeObs.disconnect(); }
 }, { threshold: 0.5 });
 codeObs.observe(document.getElementById('code-window'));

 // Counter animation for stats
 function animateCounter(el, target) {
   let current = 0;
   const step = target / 40;
   const timer = setInterval(() => {
     current += step;
     if (current >= target) { current = target; clearInterval(timer); }
     el.textContent = Math.floor(current) + (el.dataset.suffix || '');
   }, 40);
 }
 document.querySelectorAll('.stat-num').forEach(el => {
   const val = parseInt(el.textContent);
   const suffix = el.textContent.replace(/\d/g, '');
   el.dataset.suffix = suffix;
   el.textContent = '0' + suffix;
   setTimeout(() => animateCounter(el, val), 1500);
 });

 // Parallax blobs
 window.addEventListener('scroll', () => {
   const y = window.scrollY;
   document.querySelector('.blob1').style.transform = `translateY(${y * 0.15}px)`;
   document.querySelector('.blob2').style.transform = `translateY(${y * -0.1}px)`;
 });
