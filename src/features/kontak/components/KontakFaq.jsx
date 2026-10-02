import { useState } from 'react';
import { useFaqList } from '@/hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { SECTION, SECTION_HEAD, SECTION_TITLE } from '../styles';

// jawaban is sanitized HTML from the API, so its paragraphs and links are styled from the wrapper.
const ANSWER_HTML = '[&_a]:font-bold [&_a]:text-brand [&_a]:underline [&_a]:[word-break:break-word] [&_p]:mt-0 [&_p]:mb-2.5 [&_p:last-child]:mb-0';

/** Tanya jawab umum as an accordion, the first one open. */
export default function KontakFaq() {
  const [openFaq, setOpenFaq] = useState(0);
  const { data: faqs, loading, error, retry } = useFaqList();

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="sec-kontak-faq" className={SECTION} data-gsap="reveal">
      <div className="about-bento-frame">
        <div className={SECTION_HEAD}>
          <span className="section-kicker">Pertanyaan Populer</span>
          <h2 className={SECTION_TITLE}>
            Tanya Jawab Seputar Usaha Kesehatan Sekolah
          </h2>
        </div>

        {loading && <LoadingState label="Memuat tanya jawab..." />}

        {!loading && error && (
          <ErrorState
            title="Tanya jawab tidak dapat dimuat"
            text="Terjadi gangguan saat mengambil data FAQ. Silakan coba lagi."
            retry={retry}
          />
        )}

        {!loading && !error && (
          (faqs?.length ?? 0) === 0 ? (
            <EmptyState
              icon="fa-solid fa-circle-question"
              title="Belum ada tanya jawab"
              text="Daftar pertanyaan yang sering diajukan akan tampil di sini begitu tersedia."
            />
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.id}
                    className="overflow-hidden rounded-soft border-[1.5px] border-line bg-white [transition:var(--spring)] hover:border-brand"
                  >
                    <button
                      className="flex w-full cursor-pointer items-center justify-between px-[22px] py-[18px] text-left text-[14px] font-extrabold text-ink"
                      onClick={() => toggleFaq(idx)}
                    >
                      <span>{faq.pertanyaan}</span>
                      <i className={`fa-solid fa-chevron-down ml-3 shrink-0 text-brand [transition:transform_0.3s_ease] ${isOpen ? '[transform:rotate(180deg)]' : ''}`}></i>
                    </button>
                    <div
                      className={`overflow-hidden px-[22px] text-[13px] leading-[1.65] text-ink-muted [transition:max-height_0.4s_cubic-bezier(0.22,1,0.36,1),padding_0.3s] ${isOpen ? 'max-h-[400px] pb-5' : 'max-h-0'}`}
                    >
                      <div className={ANSWER_HTML} dangerouslySetInnerHTML={{ __html: faq.jawaban }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </section>
  );
}
