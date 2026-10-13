import { StatistikPengunjung, useKunjungan } from '@/features/pengunjung';
import { FooterBrand, FooterKontak, FooterNavigasi, FooterBottom, useFooterConfig } from '@/features/footer';

export default function Footer() {
  const { brand, kontak, navigasi, statistik, bottom } = useFooterConfig();

  // Counting runs whether or not the block shows; only an explicit "false" hides it.
  const kunjungan = useKunjungan();

  return (
    <footer id="kontak" style={{ marginTop: 'auto' }}>
      <div className="container">
        <div className="footer-content">
          <FooterBrand {...brand} />
          {kontak.visible && <FooterKontak {...kontak} />}
          {navigasi.visible && <FooterNavigasi {...navigasi} />}
          {statistik.visible && (
            <StatistikPengunjung
              ringkasan={kunjungan.ringkasan}
              urutan={kunjungan.urutan}
              error={kunjungan.error}
              judul={statistik.judul}
            />
          )}
        </div>

        <FooterBottom {...bottom} />
      </div>
    </footer>
  );
}
