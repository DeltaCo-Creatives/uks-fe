(function () {
    const defaultHeroSlides = [
        {
            title: 'Belajar Gizi dari Kebun Sekolah, Cara NGTS Ubah Pengetahuan menjadi Kebiasaan',
            text: 'Edukasi gizi dan sekolah sehat menjadi budaya yang tumbuh dari praktik nyata di lingkungan sekolah.',
            label: 'Edukasi Gizi',
            image: 'Aset UKS/beritagambar1.png',
            buttonText: 'Lihat Program',
            buttonLink: '#berita',
            background: 'linear-gradient(110deg, #064d2e 0%, #087a42 55%, #39a96d 100%)'
        },
        {
            title: 'Rapat Koordinasi UPT Implementasi Edukasi Gizi Perkuat Sinergi Pendampingan',
            text: 'Sinergi lintas satuan pendidikan memperkuat pelaksanaan edukasi gizi dan layanan kesehatan sekolah.',
            label: 'Koordinasi',
            image: 'Aset UKS/bertaigambar2.png',
            buttonText: 'Lihat Kegiatan',
            buttonLink: '#berita',
            background: 'linear-gradient(110deg, #075f39 0%, #14915a 55%, #58bf88 100%)'
        },
        {
            title: 'Hari Anak Nasional 2026, Kemendikdasmen Ajak Anak Kembali Bermain',
            text: 'Aktivitas fisik, bermain, dan kebugaran menjadi bagian penting dari pendidikan yang sehat.',
            label: 'Kebugaran',
            image: 'Aset UKS/gambar3.png',
            buttonText: 'Baca Selengkapnya',
            buttonLink: '#berita',
            background: 'linear-gradient(110deg, #0b5237 0%, #16875a 55%, #6bc99a 100%)'
        }
    ];

    const defaultPrograms = [
        {
            title: 'Pendidikan Kesehatan',
            image: 'Aset UKS/beritagambar1.png',
            description: 'Membekali peserta didik dengan pengetahuan dan kebiasaan hidup bersih serta sehat.'
        },
        {
            title: 'Pelayanan Kesehatan',
            image: 'Aset UKS/bertaigambar2.png',
            description: 'Menyediakan layanan promotif, preventif, pertolongan pertama, dan rujukan kesehatan.'
        },
        {
            title: 'Lingkungan Sekolah Sehat',
            image: 'Aset UKS/qtu5X5mZ0OG3FyNWd3ylbvUowy0kBlhOi6hAakTU.jpg',
            description: 'Mendorong lingkungan sekolah yang bersih, aman, nyaman, dan mendukung kegiatan belajar.'
        },
        {
            title: 'Gizi Seimbang',
            image: 'Aset UKS/infograsi1.png',
            description: 'Mengajak siswa memahami pilihan makanan bergizi dan menerapkan pola makan seimbang.'
        },
        {
            title: 'Aktivitas Fisik',
            image: 'Aset UKS/gambar3.png',
            description: 'Membangun kebiasaan bergerak aktif untuk menjaga kebugaran dan kesehatan peserta didik.'
        }
    ];

    const defaultInfografis = [
        {
            title: 'Informasi Kesehatan Sekolah',
            image: 'Aset UKS/infograsi1.png'
        },
        {
            title: 'Lingkungan Sekolah Sehat',
            image: 'Aset UKS/qtu5X5mZ0OG3FyNWd3ylbvUowy0kBlhOi6hAakTU.jpg'
        },
        {
            title: 'Edukasi Kesehatan Peserta Didik',
            image: 'Aset UKS/IoXWcqNbTfrFivbEdyumvg78d4dwkaLhY2ZPRbzW.jpg'
        }
    ];

    const defaultVideos = [
        {
            title: 'Edukasi Gizi untuk Peserta Didik',
            image: 'Aset UKS/beritagambar1.png'
        },
        {
            title: 'Pelayanan Kesehatan di Sekolah',
            image: 'Aset UKS/bertaigambar2.png'
        },
        {
            title: 'Gerakan Lingkungan Sekolah Sehat',
            image: 'Aset UKS/qtu5X5mZ0OG3FyNWd3ylbvUowy0kBlhOi6hAakTU.jpg'
        },
        {
            title: 'Aktivitas Fisik dan Kebugaran',
            image: 'Aset UKS/gambar3.png'
        }
    ];

    const defaultScreenshots = [
        'Aset UKS/Screenshot 2026-09-09 105341.png',
        'Aset UKS/Screenshot 2026-09-09 105347.png',
        'Aset UKS/Screenshot 2026-09-09 105351.png',
        'Aset UKS/Screenshot 2026-09-09 105355.png',
        'Aset UKS/Screenshot 2026-09-09 105400.png',
        'Aset UKS/Screenshot 2026-09-09 105406.png',
        'Aset UKS/Screenshot 2026-09-09 105412.png',
        'Aset UKS/Screenshot 2026-09-09 105418.png',
        'Aset UKS/Screenshot 2026-09-09 105423.png',
        'Aset UKS/Screenshot 2026-09-09 105428.png',
        'Aset UKS/Screenshot 2026-09-09 105433.png',
        'Aset UKS/Screenshot 2026-09-09 105500.png',
        'Aset UKS/Screenshot 2026-09-09 105505.png',
        'Aset UKS/Screenshot 2026-09-09 105511.png'
    ];

    const defaultStats = [
        { icon: 'fa-solid fa-user-graduate', value: '4', label: 'Program utama' },
        { icon: 'fa-solid fa-book-open', value: '132', label: 'Materi edukasi' },
        { icon: 'fa-solid fa-school', value: '100%', label: 'Sekolah sehat' },
        { icon: 'fa-solid fa-heart-pulse', value: '24/7', label: 'Dukungan kesehatan' }
    ];

    function seedDefaultsIntoStorage() {
        const defaults = {
            berita: [
                {
                    id: 1,
                    judul: 'Belajar Gizi dari Kebun Sekolah, Cara NGTS Ubah Pengetahuan menjadi Kebiasaan',
                    kategori: 'Berita',
                    tanggal: '2026-09-09',
                    isi: 'Jakarta, 25 Agustus 2026 — Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) melalui SEAMEO RECFON (Southeast Asian Ministers of Education Organization Regional Centre for Food and Nutrition) memasuki satu dekade pelaksanaan program Nutrition Goes to School (NGTS). Program ini mendorong edukasi gizi tidak berhenti di ruang kelas, tetapi diterjemahkan menjadi praktik nyata yang membudaya di sekolah.',
                    status: 'publish',
                    gambar: 'Aset UKS/beritagambar1.png',
                    slider: true
                },
                {
                    id: 2,
                    judul: 'Rapat Koordinasi UPT Implementasi Edukasi Gizi Perkuat Sinergi Pendampingan di Satuan Pendidikan',
                    kategori: 'Kegiatan',
                    tanggal: '2026-09-07',
                    isi: 'Serpong, Banten, 21 Agustus 2026 — Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) melalui Direktorat Sekolah Menengah Pertama (SMP) menyelenggarakan Rapat Koordinasi UPT Implementasi Edukasi Gizi pada 19–21 Agustus 2026 di Jakarta. Kegiatan ini menjadi momentum untuk memperkuat kesepahaman, sinergi, dan komitmen bersama dalam mendukung implementasi edukasi gizi di satuan pendidikan.',
                    status: 'publish',
                    gambar: 'Aset UKS/bertaigambar2.png',
                    slider: true
                },
                {
                    id: 3,
                    judul: 'Hari Anak Nasional 2026, Kemendikdasmen Ajak Anak kembali Bermain dan kurangi pemakaian',
                    kategori: 'Informasi',
                    tanggal: '2026-09-05',
                    isi: 'Aktivitas fisik menjadi salah satu kebiasaan baik untuk mendukung kebugaran peserta didik.',
                    status: 'publish',
                    gambar: 'Aset UKS/gambar3.png',
                    slider: true
                }
            ],
            buku: [
                {
                    id: 1,
                    judul: 'Panduan Praktis Implementasi Modul Edukasi Gizi pada Program Makanan Bergizi Gratis (MBG)',
                    kategori: 'Panduan',
                    tahun: '2026',
                    cover: 'Aset UKS/bukucover1.png',
                    pdf: 'Aset UKS/buku1.pdf'
                },
                {
                    id: 2,
                    judul: 'Pedoman Program Kesehatan Reproduksi',
                    kategori: 'Panduan',
                    tahun: '2026',
                    cover: 'Aset UKS/coverbuku2.png',
                    pdf: 'Aset UKS/buku2.pdf'
                },
                {
                    id: 3,
                    judul: 'Edukasi Gizi untuk Peserta Didik',
                    kategori: 'Buku',
                    tahun: '2026',
                    cover: 'Aset UKS/coverbuku3.png',
                    pdf: 'Aset UKS/buku3.pdf'
                },
                {
                    id: 4,
                    judul: 'Panduan Lingkungan Sekolah Sehat',
                    kategori: 'Panduan',
                    tahun: '2026',
                    cover: 'Aset UKS/coverbuku4.png',
                    pdf: 'Aset UKS/rxtoMtve87W9xvTNE5nyLViQftgG0kutb7QLmRHz.pdf'
                }
            ],
            menus: [
                { id: 1, nama: 'Beranda', url: '#beranda', posisi: 1, status: 'Aktif' },
                { id: 2, nama: 'UKS/M', url: '#tentang', posisi: 2, status: 'Aktif' },
                { id: 3, nama: 'Program', url: '#berita', posisi: 3, status: 'Aktif' },
                { id: 4, nama: 'Informasi', url: '#buku', posisi: 4, status: 'Aktif' },
                { id: 5, nama: 'Publikasi', url: '#infografis', posisi: 5, status: 'Aktif' }
            ],
            heroSlides: defaultHeroSlides,
            programs: defaultPrograms,
            infografis: defaultInfografis,
            videos: defaultVideos,
            screenshots: defaultScreenshots,
            stats: defaultStats,
            siteName: 'UKS Indonesia | Sekolah Sehat',
            siteDescription: 'Portal informasi, edukasi, berita, dan literasi kesehatan untuk mendukung terwujudnya lingkungan sekolah yang sehat, aman, dan nyaman.',
            siteEmail: 'info@uks.id'
        };

        Object.entries(defaults).forEach(function ([key, fallback]) {
            try {
                const raw = localStorage.getItem(key);

                if (!raw) {
                    localStorage.setItem(key, JSON.stringify(fallback));
                    return;
                }

                const parsed = JSON.parse(raw);

                if (key === 'berita' && Array.isArray(parsed)) {
                    const normalizedBerita = parsed.map(function (item, index) {
                        if (!item) {
                            return item;
                        }

                        return {
                            ...item,
                            slider: index < 3 ? true : Boolean(item.slider)
                        };
                    });

                    if (JSON.stringify(parsed) !== JSON.stringify(normalizedBerita)) {
                        localStorage.setItem(key, JSON.stringify(normalizedBerita));
                    }
                }

                if (
                    parsed === null ||
                    parsed === undefined ||
                    (Array.isArray(parsed) && parsed.length === 0)
                ) {
                    localStorage.setItem(key, JSON.stringify(fallback));
                }
            } catch (error) {
                localStorage.setItem(key, JSON.stringify(fallback));
            }
        });
    }

    function getStored(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) {
                return fallback;
            }

            const parsed = JSON.parse(raw);
            return parsed ?? fallback;
        } catch (error) {
            console.warn('CMS loader gagal membaca ' + key + ':', error);
            return fallback;
        }
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function stripHtml(value) {
        return String(value ?? '').replace(/<[^>]*>/g, ' ');
    }

    function truncate(text, maxLength) {
        const clean = stripHtml(text).replace(/\s+/g, ' ').trim();

        if (!clean) {
            return '';
        }

        return clean.length > maxLength
            ? clean.slice(0, maxLength).trim() + '...'
            : clean;
    }

    function formatDate(dateValue) {
        if (!dateValue) {
            return '';
        }

        const parsedDate = new Date(dateValue + 'T00:00:00');

        if (Number.isNaN(parsedDate.getTime())) {
            return dateValue;
        }

        return parsedDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    function renderMenus() {
        const navMenu = document.getElementById('navMenu');
        const footerMenu = document.getElementById('footerMenu');

        if (!navMenu && !footerMenu) {
            return;
        }

        const menus = getStored('menus', null);

        if (!Array.isArray(menus)) {
            if (navMenu) {
                navMenu.innerHTML = '';
            }

            if (footerMenu) {
                footerMenu.innerHTML = '';
            }

            return;
        }

        const visibleMenus = menus
            .filter(function (item) {
                const status = String(item.status || '').toLowerCase();
                return status !== 'nonaktif';
            })
            .sort(function (a, b) {
                return (Number(a.posisi) || 0) - (Number(b.posisi) || 0);
            });

        function buildMenuMarkup(items, level) {
            return items.map(function (item) {
                const childItems = visibleMenus.filter(function (child) {
                    return String(child.parentId || '') === String(item.id);
                });

                const childMarkup = childItems.length
                    ? '<ul class="submenu submenu-level-' + level + '">' + buildMenuMarkup(childItems, level + 1) + '</ul>'
                    : '';

                const itemClasses = ['menu-item'];

                if (childItems.length) {
                    itemClasses.push('has-submenu');
                }

                return '<li class="' + itemClasses.join(' ') + '">'
                    + '<a href="' + escapeHtml(item.url || '#') + '">' + escapeHtml(item.nama || 'Menu') + '</a>'
                    + childMarkup
                    + '</li>';
            }).join('');
        }

        const topLevelMenus = visibleMenus.filter(function (item) {
            const parentId = item.parentId;
            return parentId === '' || parentId === null || parentId === undefined || String(parentId) === '0';
        });
        const menuMarkup = buildMenuMarkup(topLevelMenus, 1);

        if (navMenu) {
            navMenu.innerHTML = '<ul class="main-menu">' + menuMarkup + '</ul>';

            navMenu.querySelectorAll('.main-menu li.has-submenu > a').forEach(function (link) {
                link.addEventListener('click', function (event) {
                    if (window.innerWidth > 950) {
                        return;
                    }

                    event.preventDefault();

                    const parentItem = event.currentTarget.parentElement;
                    const alreadyOpen = parentItem.classList.contains('show');

                    navMenu.querySelectorAll('.main-menu li.has-submenu').forEach(function (item) {
                        item.classList.remove('show');
                    });

                    if (!alreadyOpen) {
                        parentItem.classList.add('show');
                    }
                });
            });

            navMenu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    navMenu.classList.remove('show');
                });
            });
        }

        if (footerMenu) {
            footerMenu.innerHTML = '<ul class="main-menu">' + menuMarkup + '</ul>';
        }
    }

    function renderHeroSlides() {
        const slider = document.getElementById('slider');

        if (!slider) {
            return;
        }

        const slideNodes = slider.querySelectorAll('.slide');
        const dotNodes = slider.querySelectorAll('.dot');

        const berita = getStored('berita', []);
        const publishedNews = Array.isArray(berita)
            ? berita.filter(function (item) {
                return item && (item.status === 'publish' || !item.status);
            })
            : [];

        const sliderItems = Array.isArray(berita)
            ? berita.filter(function (item) {
                return item && (
                    item.slider === true
                    || item.slider === 'true'
                    || item.isSlider === true
                    || item.starred === true
                    || item.featured === true
                );
            })
            : [];

        const sourceItems = sliderItems.length ? sliderItems : publishedNews;

        const slides = (sourceItems.length ? sourceItems : defaultHeroSlides)
            .slice(0, slideNodes.length)
            .map(function (item) {
                return {
                    title: item.judul || item.title || 'Berita UKS',
                    text: item.isi || item.text || item.deskripsi || '',
                    label: item.kategori || 'Berita',
                    image: item.gambar || item.image || item.cover || defaultHeroSlides[0].image,
                    buttonText: 'Lihat Berita',
                    buttonLink: '#berita',
                    background: defaultHeroSlides[0].background
                };
            });

        slides.slice(0, Math.min(slides.length, slideNodes.length)).forEach(function (item, index) {
            const slide = slideNodes[index] || slideNodes[0];
            const image = item.image || defaultHeroSlides[index % defaultHeroSlides.length].image;
            const title = item.title || item.judul || defaultHeroSlides[index % defaultHeroSlides.length].title;
            const text = item.text || item.deskripsi || '';
            const label = item.label || 'UKS';
            const buttonText = item.buttonText || item.buttontext || 'Lihat Detail';
            const buttonLink = item.buttonLink || '#';
            const background = item.background || defaultHeroSlides[index % defaultHeroSlides.length].background;

            slide.style.background = background;
            slide.classList.toggle('active', index === 0);
            slide.innerHTML =
                '<div class="slide-content">'
                + (label ? '<div class="slide-label">' + escapeHtml(label) + '</div>' : '')
                + '<h1>' + escapeHtml(title) + '</h1>'
                + (text ? '<p>' + escapeHtml(text) + '</p>' : '')
                + (buttonText ? '<a class="slide-button" href="' + escapeHtml(buttonLink) + '">' + escapeHtml(buttonText) + ' <i class="fa-solid fa-arrow-right"></i></a>' : '')
                + '</div>'
                + '<img class="slide-thumbnail" src="' + escapeHtml(image) + '" alt="' + escapeHtml(title) + '">';
        });

        slideNodes.forEach(function (slide, index) {
            if (index >= slides.length) {
                slide.style.display = 'none';
            } else {
                slide.style.display = '';
            }
        });

        dotNodes.forEach(function (dot, index) {
            dot.classList.toggle('active', index === 0);
        });
    }

    function renderPrograms() {
        const programsGrid = document.querySelector('.programs-grid');

        if (!programsGrid) {
            return;
        }

        const programs = getStored('programs', defaultPrograms);
        const items = Array.isArray(programs) && programs.length ? programs : defaultPrograms;

        programsGrid.innerHTML = items.map(function (item) {
            const title = item.title || item.judul || 'Program UKS';
            const description = item.description || item.deskripsi || '';

            return '<article class="program-card">'
                + '<img class="program-photo" src="' + escapeHtml(item.image || 'Aset UKS/beritagambar1.png') + '" alt="' + escapeHtml(title) + '">'
                + '<h3>' + escapeHtml(title) + '</h3>'
                + '<p>' + escapeHtml(description) + '</p>'
                + '</article>';
        }).join('');
    }

    function renderStats() {
        const statsContainer = document.querySelector('.stats');

        if (!statsContainer) {
            return;
        }

        const stats = getStored('stats', defaultStats);
        const items = Array.isArray(stats) && stats.length ? stats : defaultStats;

        statsContainer.innerHTML = items.map(function (item) {
            return '<div class="stat">'
                + '<i class="' + escapeHtml(item.icon || 'fa-solid fa-chart-column') + '"></i>'
                + '<strong>' + escapeHtml(item.value || '0') + '</strong>'
                + '<span>' + escapeHtml(item.label || '') + '</span>'
                + '</div>';
        }).join('');
    }

    function renderBerita() {
        const newsGrid = document.getElementById('newsGrid');

        if (!newsGrid) {
            return;
        }

        const berita = getStored('berita', null);

        if (!Array.isArray(berita) || berita.length === 0) {
            return;
        }

        const published = berita.filter(function (item) {
            return item.status === 'publish' || !item.status;
        });

        if (published.length === 0) {
            return;
        }

        newsGrid.innerHTML = published.slice(0, 3).map(function (item) {
            const image = item.gambar || item.image || item.cover || 'Aset UKS/beritagambar1.png';
            const description = truncate(item.isi || '', 180);

            return '<article class="news-card">'
                + '<div class="news-image">'
                + '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.judul || 'Berita UKS') + '">'
                + '</div>'
                + '<div class="news-body">'
                + '<div class="news-date">' + escapeHtml(formatDate(item.tanggal)) + '</div>'
                + '<h3>' + escapeHtml(item.judul || 'Berita UKS') + '</h3>'
                + '<p>' + escapeHtml(description) + '</p>'
                + '<a href="#" class="news-read">Baca Selengkapnya <i class="fa-solid fa-arrow-right"></i></a>'
                + '</div>'
                + '</article>';
        }).join('');
    }

    function renderAllBerita() {
        const allNewsGrid = document.getElementById('allNewsGrid');

        if (!allNewsGrid) {
            return;
        }

        const berita = getStored('berita', null);

        if (!Array.isArray(berita) || berita.length === 0) {
            allNewsGrid.innerHTML = '';
            return;
        }

        const published = berita.filter(function (item) {
            return item.status === 'publish' || !item.status;
        });

        if (published.length === 0) {
            allNewsGrid.innerHTML = '';
            return;
        }

        allNewsGrid.innerHTML = published.map(function (item) {
            const image = item.gambar || item.image || item.cover || 'Aset UKS/beritagambar1.png';
            const description = truncate(item.isi || '', 220);

            return '<article class="news-card">'
                + '<div class="news-image">'
                + '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.judul || 'Berita UKS') + '">'
                + '</div>'
                + '<div class="news-body">'
                + '<div class="news-date">' + escapeHtml(formatDate(item.tanggal)) + '</div>'
                + '<h3>' + escapeHtml(item.judul || 'Berita UKS') + '</h3>'
                + '<p>' + escapeHtml(description) + '</p>'
                + '<a href="#" class="news-read">Baca Selengkapnya <i class="fa-solid fa-arrow-right"></i></a>'
                + '</div>'
                + '</article>';
        }).join('');
    }

    function renderBuku() {
        const booksGrid = document.querySelector('.books-grid');

        if (!booksGrid) {
            return;
        }

        const buku = getStored('buku', null);

        if (!Array.isArray(buku) || buku.length === 0) {
            return;
        }

        booksGrid.innerHTML = buku.slice(0, 4).map(function (item) {
            const cover = item.cover || 'Aset UKS/coverbuku1.png';
            const pdf = item.pdf || '#';
            const title = item.judul || 'Buku UKS';
            const category = item.kategori || 'Buku';
            const year = item.tahun || new Date().getFullYear();

            return '<article class="book-card">'
                + '<div class="book-cover">'
                + '<img src="' + escapeHtml(cover) + '" alt="Cover ' + escapeHtml(title) + '">'
                + '</div>'
                + '<h3>' + escapeHtml(title) + '</h3>'
                + '<div class="book-meta">' + escapeHtml(category) + ' • ' + escapeHtml(year) + '</div>'
                + '<div class="book-actions">'
                + '<button class="book-button" type="button" onclick="openBook(\'' + escapeHtml(pdf.replace(/'/g, "\\'")) + '\', \'' + escapeHtml(title.replace(/'/g, "\\'")) + '\')">'
                + '<i class="fa-solid fa-book-open"></i> Baca Buku'
                + '</button>'
                + '<a href="' + escapeHtml(pdf) + '" class="book-download" download>'
                + '<i class="fa-solid fa-download"></i> Unduh'
                + '</a>'
                + '</div>'
                + '</article>';
        }).join('');
    }

    function renderInfografis() {
        const infografisGrid = document.querySelector('.infografis-grid');

        if (!infografisGrid) {
            return;
        }

        const infografis = getStored('infografis', defaultInfografis);
        const items = Array.isArray(infografis) && infografis.length ? infografis : defaultInfografis;

        infografisGrid.innerHTML = items.map(function (item) {
            const title = item.title || item.judul || 'Infografis UKS';

            return '<article class="infografis-card">'
                + '<img src="' + escapeHtml(item.image || 'Aset UKS/infograsi1.png') + '" alt="' + escapeHtml(title) + '">'
                + '<h3>' + escapeHtml(title) + '</h3>'
                + '<div class="infografis-actions">'
                + '<button class="infografis-view" type="button" onclick="openInfografis(this)" data-image="' + escapeHtml(item.image || 'Aset UKS/infograsi1.png') + '" data-alt="' + escapeHtml(title) + '"><i class="fa-solid fa-eye"></i> Lihat</button>'
                + '<a class="infografis-download" href="' + escapeHtml(item.image || 'Aset UKS/infograsi1.png') + '" download><i class="fa-solid fa-download"></i> Download</a>'
                + '</div>'
                + '</article>';
        }).join('');
    }

    function renderVideos() {
        const videosGrid = document.querySelector('.videos-grid');

        if (!videosGrid) {
            return;
        }

        const videos = getStored('videos', defaultVideos);
        const items = Array.isArray(videos) && videos.length ? videos : defaultVideos;

        videosGrid.innerHTML = items.map(function (item) {
            const title = item.title || item.judul || 'Video UKS';

            return '<article class="video-card">'
                + '<div class="video-thumbnail">'
                + '<img src="' + escapeHtml(item.image || 'Aset UKS/beritagambar1.png') + '" alt="' + escapeHtml(title) + '">'
                + '<span class="video-play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>'
                + '</div>'
                + '<h3>' + escapeHtml(title) + '</h3>'
                + '</article>';
        }).join('');
    }

    function renderScreenshots() {
        const strip = document.querySelector('.screenshots-strip');

        if (!strip) {
            return;
        }

        const storedScreenshots = getStored('screenshots', null);
        const items = Array.isArray(storedScreenshots)
            ? storedScreenshots
            : Array.isArray(defaultScreenshots)
                ? defaultScreenshots
                : [];

        const normalizedScreenshots = items
            .map(function (item) {
                if (typeof item === 'string') {
                    return item;
                }

                return item && typeof item.image === 'string' ? item.image : '';
            })
            .filter(function (item) {
                return item && item.trim() !== '';
            });

        if (!normalizedScreenshots.length) {
            strip.innerHTML = '';
            return;
        }

        const rendered = normalizedScreenshots.map(function (image, index) {
            return '<div class="screenshot-item">'
                + '<img src="' + escapeHtml(image) + '" alt="Screenshot UKS ' + (index + 1) + '" loading="lazy">'
                + '</div>';
        }).join('');

        strip.innerHTML = rendered + rendered;
    }

    function renderSettings() {
        const settings = {
            siteName: getStored('siteName', ''),
            siteDescription: getStored('siteDescription', ''),
            siteEmail: getStored('siteEmail', '')
        };

        if (settings.siteName) {
            document.title = settings.siteName;
        }

        const footerParagraph = document.querySelector('footer p');

        if (footerParagraph && settings.siteDescription) {
            footerParagraph.textContent = settings.siteDescription;
        }

        const footerEmail = Array.from(document.querySelectorAll('footer li')).find(function (item) {
            return item.textContent.includes('info@') || item.textContent.includes('admin@');
        });

        if (footerEmail && settings.siteEmail) {
            footerEmail.innerHTML = '<i class="fa-solid fa-envelope"></i> ' + escapeHtml(settings.siteEmail);
        }
    }

    function renderAll() {
        renderMenus();
        renderHeroSlides();
        renderPrograms();
        renderStats();
        renderBerita();
        renderAllBerita();
        renderBuku();
        renderInfografis();
        renderVideos();
        renderScreenshots();
        renderSettings();
    }

    seedDefaultsIntoStorage();
    renderAll();

    window.addEventListener('storage', function (event) {
        if (
            event.key === 'berita'
            || event.key === 'buku'
            || event.key === 'menus'
            || event.key === 'siteName'
            || event.key === 'siteDescription'
            || event.key === 'siteEmail'
            || event.key === 'heroSlides'
            || event.key === 'programs'
            || event.key === 'stats'
            || event.key === 'infografis'
            || event.key === 'videos'
            || event.key === 'screenshots'
        ) {
            renderAll();
        }
    });
})();
