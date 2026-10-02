import { SECTION, SECTION_HEAD, SECTION_TITLE, SECTION_DESC } from '../styles';

const GROUP = 'flex flex-col gap-1.5';
const LABEL = 'text-[13px] font-bold text-ink';
const FIELD_BASE = 'w-full border-[1.5px] border-[rgba(0,0,0,0.08)] bg-white text-[14px] text-ink [outline:none] [transition:var(--spring)] focus:border-brand focus:shadow-[0_0_0_4px_var(--brand-light)]';
const INPUT = `${FIELD_BASE} rounded-[999px] px-5 py-3.5`;
const TEXTAREA = `${FIELD_BASE} rounded-card px-5 py-4`;
const ROW = 'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5';

const handleTicketSubmit = (e) => {
  e.preventDefault();
  alert('Pengaduan / pertanyaan Anda telah berhasil dikirim ke Helpdesk Sekretariat Pembina UKS/M Pusat. Nomor tiket layanan: #UKS-2026-9812.');
  e.target.reset();
};

/** The consultation / support ticket form. */
export default function KontakTiket() {
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
          onSubmit={handleTicketSubmit}
          className="flex flex-col gap-5 rounded-panel bg-white p-[clamp(24px,4vw,36px)] shadow-raised"
        >

          <div className={ROW}>
            <div className={GROUP}>
              <label className={LABEL}>Nama Lengkap Pemohon *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi Santoso, S.Pd."
                className={INPUT}
              />
            </div>

            <div className={GROUP}>
              <label className={LABEL}>Email Aktif *</label>
              <input
                type="email"
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
                required
                placeholder="Contoh: SDN 01 Rawamangun / TP UKS Kec. Cibinong"
                className={INPUT}
              />
            </div>

            <div className={GROUP}>
              <label className={LABEL}>Kategori Layanan *</label>
              <select required className={`${INPUT} [appearance:auto]`}>
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
              rows={4}
              required
              placeholder="Tuliskan detail kendala, pertanyaan, atau permohonan pendampingan sekolah Anda..."
              className={TEXTAREA}
            />
          </div>

          <div className="mt-2.5 flex justify-end">
            <button type="submit" className="btn-massive min-w-[220px] justify-center">
              <i className="fa-solid fa-paper-plane"></i>
              <span>Kirim Tiket Bantuan</span>
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
