// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav.classList.contains('open')) nav.classList.remove('open');
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Download CSV model for 'Fiche de suivi'
const downloadBtn = document.getElementById('downloadCsvBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const headers = ['Date','Personne','Besoin / Observation','Priorité','Action','Référent','Statut'];
    const rows = [
      ['2025-09-01','','Renouveler ordonnance','Moyenne','Appeler le médecin','Célia','À faire'],
      ['2025-09-05','','Organiser transport consultation','Haute','Réserver VSL','Parfaite','En cours']
    ];
    const csv = [headers, ...rows].map(r => r.map(x => `"${String(x).replaceAll('"','""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fiche-suivi-modele.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}
