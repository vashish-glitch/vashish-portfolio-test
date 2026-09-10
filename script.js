const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
  if(!cursor) return;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, .project-visual').forEach(el => {
  el.addEventListener('mouseenter', () => cursor && cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('active'));
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:0, transform:'translateY(24px)'},{opacity:1, transform:'translateY(0)'}],
        {duration:700, easing:'cubic-bezier(.2,.8,.2,1)', fill:'both'}
      );
      obs.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.project-copy, .about-grid, .work-grid > div, .timeline > div').forEach(el => obs.observe(el));
