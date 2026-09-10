
(async function () {
  async function getJSON(path) {
    const res = await fetch(path + '?v=' + Date.now());
    if (!res.ok) throw new Error(path);
    return res.json();
  }

  try {
    const site = await getJSON('data/site.json');
    const text = (id, value) => {
      const el = document.getElementById(id);
      if (el && value !== undefined && value !== null) el.textContent = value;
    };

    text('cms-role-top', site.role);
    text('cms-intro-title', site.intro_title);
    text('cms-intro-text', site.intro_text);
    text('cms-location', site.location);
    text('cms-availability', site.availability);

    const portrait = document.getElementById('cms-portrait');
    if (portrait && site.portrait) portrait.src = site.portrait.replace(/^\//,'');

    const emailTop = document.getElementById('cms-email-top');
    if (emailTop && site.email) emailTop.href = 'mailto:' + site.email;

    const linkedinTop = document.getElementById('cms-linkedin-top');
    if (linkedinTop && site.linkedin && site.linkedin !== '#') {
      linkedinTop.href = site.linkedin;
      linkedinTop.removeAttribute('onclick');
    }

    const cvTop = document.getElementById('cms-cv-top');
    if (cvTop && site.cv && site.cv !== '#') {
      cvTop.href = site.cv;
      cvTop.removeAttribute('onclick');
    }

    const statement = document.getElementById('cms-statement');
    if (statement && site.statement) statement.textContent = site.statement;

    const contactTitle = document.getElementById('cms-contact-title');
    if (contactTitle && site.contact_title) contactTitle.innerHTML = site.contact_title.replace(/\s+/g,' ').replace(' ', '<br>');

    const projects = await getJSON('data/projects.json');
    document.querySelectorAll('.project[data-project-index]').forEach((article) => {
      const i = Number(article.dataset.projectIndex);
      const p = projects[i];
      if (!p) return;

      const h2 = article.querySelector('.project-copy h2');
      const meta = article.querySelector('.meta');
      const summary = article.querySelector('.summary');
      const links = article.querySelectorAll('a');
      const visualLabel = article.querySelector('.visual-label');
      const visual = article.querySelector('.project-visual');

      if (h2) h2.textContent = p.title || '';
      if (meta) meta.textContent = p.meta || '';
      if (summary) summary.textContent = p.summary || '';
      if (visualLabel) visualLabel.textContent = p.visual_label || '';
      links.forEach(a => { if (p.link) a.href = p.link; });

      if (visual && p.cover_image) {
        const path = p.cover_image.replace(/^\//,'');
        visual.style.backgroundImage = `linear-gradient(rgba(12,12,10,.20),rgba(12,12,10,.40)), url("${path}")`;
        visual.style.backgroundSize = 'cover';
        visual.style.backgroundPosition = 'center';
      }
    });
  } catch (err) {
    console.warn('CMS content is loaded when the site is served online. Local file preview keeps the built-in fallback content.', err);
  }
})();
