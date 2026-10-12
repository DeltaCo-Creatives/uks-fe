import { SECTION, SECTION_HEAD, SECTION_TITLE, SECTION_DESC } from '../styles';

const GROUP = 'flex flex-col gap-1.5';
const LABEL = 'text-[13px] font-bold text-ink';
const FIELD_BASE = 'w-full border-[1.5px] border-[rgba(0,0,0,0.08)] bg-white text-[14px] text-ink [outline:none] [transition:var(--spring)] focus:border-brand focus:shadow-[0_0_0_4px_var(--brand-light)]';
const INPUT = `${FIELD_BASE} rounded-[999px] px-5 py-3.5`;
const TEXTAREA = `${FIELD_BASE} rounded-card px-5 py-4`;
const ROW = 'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5';

// There is no ticket backend: submitting opens the visitor's mail app, pre-filled and addressed to the
// official contact email. ponytail: some mail clients cut a mailto: URL near 2000 chars, so a very long
// rincian can be truncated; move to a real endpoint if tickets need tracking.
const composeMailto = (email, form) => {
  const { nama, email: pengirim, satuan, kategori, rincian } = form.elements;
  const topik = kategori.selectedOptions[0].text;
  const subject = `[${topik}] ${satuan.value} - ${nama.value}`;
  const body = [
    `Nama: ${nama.value}`,
    `Email: ${pengirim.value}`,
    `Satuan Pendidikan / Lembaga: ${satuan.value}`,
    `Kategori: ${topik}`,
    '',
    'Rincian:',
    rincian.value,
  ].join('\r\n');
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/** The consultation / support form; sends nothing itself, it hands the message to the visitor's mail app. */
export default function KontakTiket({ email }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    window.location.href = composeMailto(email, e.currentTarget);
  };

  return (
    <section id="sec-kontak-tiket" className={SECTION} data-gsap="reveal">
      <div className="about-bento-frame">
        <div className={SECTION_HEAD}>
          <span className="section-kicker">Layanan Konsultasi Daring</span>
          <h2 className={SECTION_TITLE}>
            Kirim Pertanyaan / Tiket Bantuan Teknis
          </h2>
          <p className={SECTION_DESC}>
            Gunakan formulir ini untuk konsultasi pengisian instrumen stratifikasi, fasilitasi kerja sama Puskesmas, atau panduan modul 5 Sehat.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-panel bg-white p-[clamp(24px,4vw,36px)] shadow-raised"
        >

          <div className={ROW}>
            <div className={GROUP}>
              <label className={LABEL}>Nama Lengkap Pemohon *</label>
              <input
                type="text"
                name="nama"
                required
                placeholder="Contoh: Budi Santoso, S.Pd."
                className={INPUT}
              />
            </div>

            <div className={GROUP}>
              <label className={LABEL}>Email Aktif *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="nama@sekolah.sch.id"
                className={INPUT}
              />
            </div>
          </div>

          <div className={ROW}>
            <div className={GROUP}>
              <label className={LABEL}>Nama Satuan Pendidikan / Lembaga *</label>
              <input
                type="text"
                name="satuan"
                required
                placeholder="Contoh: SDN 01 Rawamangun / TP UKS Kec. Cibinong"
                className={INPUT}
              />
            </div>

            <div className={GROUP}>
              <label className={LABEL}>Kategori Layanan *</label>
              <select name="kategori" required className={`${INPUT} [appearance:auto]`}>
                <option value="">-- Pilih Topik Konsultasi --</option>
                <option value="stratifikasi">Akreditasi &amp; Stratifikasi UKS/M</option>
                <option value="bosp">Penggunaan Dana BOSP untuk UKS</option>
                <option value="puskesmas">Koordinasi Penjaringan Puskesmas</option>
                <option value="mbg">Integrasi Makan Bergizi Gratis (MBG)</option>
                <option value="sarpras">Standardisasi Ruang UKS</option>
                <option value="lainnya">Lain-lain</option>
              </select>
            </div>
          </div>

          <div className={GROUP}>
            <label className={LABEL}>Rincian Pertanyaan / Pengaduan *</label>
            <textarea
              name="rincian"
              rows={4}
              required
              placeholder="Tuliskan detail kendala, pertanyaan, atau permohonan pendampingan sekolah Anda..."
              className={TEXTAREA}
            />
          </div>

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-4">
            <p className="m-0 min-w-[240px] flex-1 text-[13px] leading-[1.6] text-ink-muted">
              {email
                ? `Tombol ini membuka aplikasi email Anda dengan pesan yang sudah terisi, ditujukan ke ${email}.`
                : 'Alamat email layanan belum tersedia saat ini, sehingga formulir belum dapat dikirim. Silakan coba lagi nanti.'}
            </p>
            <button
              type="submit"
              disabled={!email}
              className="btn-massive min-w-[220px] justify-center disabled:pointer-events-none disabled:opacity-50"
            >
              <i className="fa-solid fa-envelope"></i>
              <span>Kirim lewat Email</span>
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
