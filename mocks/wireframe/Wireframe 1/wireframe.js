/* ============================================================
   WIREFRAME INTERACTION SCRIPTS
   ============================================================ */

// 1. Device Viewport Switching
function setDevice(device) {
  document.body.classList.remove('device-desktop', 'device-tablet', 'device-mobile', 'device-fluid');
  document.body.classList.add('device-' + device);

  document.querySelectorAll('.wf-toolbar-group .wf-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('btn-' + device);
  if (activeBtn) activeBtn.classList.add('active');

  const viewportLabel = document.getElementById('viewport-label');
  if (device === 'desktop') viewportLabel.textContent = '1440 × 900 (Desktop)';
  if (device === 'tablet') viewportLabel.textContent = '768 × 1024 (Tablet)';
  if (device === 'mobile') viewportLabel.textContent = '375 × 812 (Mobile)';
  if (device === 'fluid') viewportLabel.textContent = 'Fluid 100%';
}

// 2. Theme Toggle (Blueprint Dark vs Clean Sketch Light)
function toggleTheme() {
  document.body.classList.toggle('mode-sketch');
}

// 3. Inspector Drawer Toggle
function toggleInspector() {
  const inspector = document.getElementById('inspector');
  inspector.classList.toggle('open');
}

// 4. Trias UKS Pillar Switcher
const pillarsData = [
  {
    title: 'Pendidikan Kesehatan',
    icon: 'fa-solid fa-graduation-cap',
    desc: 'Membentuk pengetahuan, sikap, dan kebiasaan hidup sehat siswa secara menyenangkan melalui Intrakurikuler, Ekstrakurikuler, dan Kokurikuler.',
    stats: [
      { val: '4', lbl: 'Program Utama' },
      { val: '132', lbl: 'Materi Edukasi' },
      { val: '100%', lbl: 'Sekolah Sehat' },
      { val: '24/7', lbl: 'Dukungan Kesehatan' }
    ]
  },
  {
    title: 'Pelayanan Kesehatan',
    icon: 'fa-solid fa-stethoscope',
    desc: 'Menyediakan skrining kesehatan berkala, imunisasi, pertolongan pertama (P3K), serta rujukan medis terpadu bersama Puskesmas mitra.',
    stats: [
      { val: '98%', lbl: 'Skrining Siswa' },
      { val: 'P3K', lbl: 'Layanan Siaga' },
      { val: '100%', lbl: 'Mitra Puskesmas' },
      { val: 'Rutin', lbl: 'Cek Berkala' }
    ]
  },
  {
    title: 'Pembinaan Lingkungan Sehat',
    icon: 'fa-solid fa-leaf',
    desc: 'Menciptakan ekosistem sekolah bersih, sanitasi higienis, kantin bergizi ramah anak, serta pengelolaan sampah mandiri dan bebas jentik.',
    stats: [
      { val: '100%', lbl: 'Bebas Asap Rokok' },
      { val: 'Kantin', lbl: 'Sehat Higienis' },
      { val: 'Bebas', lbl: 'Jentik Nyamuk' },
      { val: 'Adiwiyata', lbl: 'Area Hijau' }
    ]
  }
];

function selectPillar(index, btnEl) {
  document.querySelectorAll('.wf-pillar-pill').forEach(btn => btn.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const p = pillarsData[index];
  document.getElementById('pillar-title').textContent = p.title;
  document.getElementById('pillar-desc').textContent = p.desc;
  document.getElementById('pillar-icon').innerHTML = `<i class="${p.icon}"></i>`;

  const statsContainer = document.getElementById('pillar-stats');
  statsContainer.innerHTML = p.stats.map(s => `
    <div class="wf-stat-item">
      <div style="font-size: 28px; font-weight: 900; color: var(--wf-ink); font-family: var(--font-heading);">${s.val}</div>
      <div style="font-size: 11px; color: var(--wf-muted); text-transform: uppercase; font-weight: 700; margin-top: 4px;">${s.lbl}</div>
    </div>
  `).join('');
}
