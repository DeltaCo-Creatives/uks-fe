<?php
session_start();

if (isset($_POST['logout']) && $_POST['logout'] === '1') {
    session_unset();
    session_destroy();
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'])) {
    if ($_POST['username'] === 'adminuks' && $_POST['password'] === 'Adminmager') {
        $_SESSION['cms_logged_in'] = true;
        $_SESSION['cms_user'] = 'adminuks';
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }

    $loginError = 'Username atau password salah.';
} else {
    $loginError = '';
}

$loggedIn = !empty($_SESSION['cms_logged_in']);
$currentUser = $_SESSION['cms_user'] ?? 'Administrator';

if (!$loggedIn) {
    ?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login CMS - Website UKS</title>
<style>
    * {
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
    }

    body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #eafaf3, #dff2e9);
        color: #1d2d25;
    }

    .login-box {
        width: min(100%, 420px);
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 18px 45px rgba(8, 116, 67, 0.15);
        padding: 32px;
    }

    .login-header {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 18px;
    }

    .login-logo {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background: #087443;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 22px;
    }

    h1 {
        margin: 0;
        font-size: 28px;
    }

    p {
        margin: 0 0 20px;
        color: #53615c;
    }

    .login-error {
        background: #ffe4e4;
        color: #9d1a1a;
        border: 1px solid #f0b0b0;
        border-radius: 10px;
        padding: 10px 12px;
        margin-bottom: 18px;
        font-size: 14px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    label {
        font-weight: bold;
        font-size: 14px;
    }

    input {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #d8e1de;
        border-radius: 10px;
        font-size: 14px;
        outline: none;
    }

    input:focus {
        border-color: #087443;
        box-shadow: 0 0 0 3px rgba(8, 116, 67, 0.1);
    }

    button {
        margin-top: 8px;
        border: none;
        border-radius: 10px;
        background: #087443;
        color: white;
        font-weight: bold;
        font-size: 15px;
        padding: 13px 16px;
        cursor: pointer;
    }

    button:hover {
        background: #065d35;
    }
</style>
</head>
<body>
    <div class="login-box">
        <div class="login-header">
            <div class="login-logo">UKS</div>
            <h1>CMS Admin</h1>
        </div>
        <p>Masuk untuk mengelola website UKS.</p>

        <?php if ($loginError): ?>
            <div class="login-error"><?php echo htmlspecialchars($loginError); ?></div>
        <?php endif; ?>

        <form method="post" action="">
            <label for="username">Username</label>
            <input id="username" type="text" name="username" value="<?php echo htmlspecialchars($_POST['username'] ?? ''); ?>" required>

            <label for="password">Password</label>
            <input id="password" type="password" name="password" required>

            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
<?php
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CMS Admin - Website UKS</title>
<link rel="stylesheet" href="./ckeditor5-48.5.0/ckeditor5/ckeditor5.css">

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

body{
    background:#f5f7f6;
    color:#26332e;
}

/* SIDEBAR */
.sidebar{
    position:fixed;
    left:0;
    top:0;
    width:250px;
    height:100vh;
    background:#087443;
    color:white;
    padding:22px 15px;
    z-index:1000;
}

.logo{
    display:flex;
    align-items:center;
    gap:12px;
    padding:10px;
    margin-bottom:25px;
}

.logo-icon{
    width:42px;
    height:42px;
    border-radius:12px;
    background:white;
    color:#087443;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:22px;
    font-weight:bold;
}

.logo h2{
    font-size:19px;
}

.logo small{
    opacity:.8;
}

.menu-title{
    font-size:11px;
    text-transform:uppercase;
    opacity:.65;
    margin:20px 12px 8px;
}

.menu a{
    display:flex;
    align-items:center;
    gap:12px;
    padding:13px 14px;
    color:white;
    text-decoration:none;
    border-radius:10px;
    margin-bottom:5px;
    cursor:pointer;
}

.menu a:hover,
.menu a.active{
    background:rgba(255,255,255,.15);
}

.menu-icon{
    width:23px;
    text-align:center;
}

/* MAIN */
.main{
    margin-left:250px;
    min-height:100vh;
}

.topbar{
    height:70px;
    background:white;
    border-bottom:1px solid #e4e8e5;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 30px;
    position:sticky;
    top:0;
    z-index:500;
}

.topbar h1{
    font-size:22px;
}

.user{
    display:flex;
    align-items:center;
    gap:10px;
}

.avatar{
    width:38px;
    height:38px;
    border-radius:50%;
    background:#e8f5ee;
    color:#087443;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
}

.content{
    padding:30px;
}

/* PAGE */
.page{
    display:none;
}

.page.active{
    display:block;
}

/* DASHBOARD */
.cards{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:20px;
    margin:25px 0;
}

.card{
    background:white;
    padding:22px;
    border-radius:16px;
    border:1px solid #e7ebe8;
    box-shadow:0 5px 20px rgba(0,0,0,.04);
}

.card-top{
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.card-icon{
    width:45px;
    height:45px;
    background:#e9f7ef;
    color:#087443;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:12px;
    font-size:21px;
}

.card h3{
    margin-top:15px;
    font-size:28px;
}

.card p{
    color:#75817c;
    margin-top:5px;
}

/* TABLE */
.panel{
    background:white;
    border:1px solid #e5e9e6;
    border-radius:16px;
    padding:22px;
    margin-bottom:25px;
}

.panel-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:20px;
}

.panel-header h2{
    font-size:18px;
}

.btn{
    border:none;
    padding:10px 16px;
    border-radius:9px;
    cursor:pointer;
    font-weight:bold;
}

.btn-primary{
    background:#087443;
    color:white;
}

.btn-primary:hover{
    background:#065c35;
}

.btn-warning{
    background:#fff1c7;
    color:#8a6500;
}

.btn-danger{
    background:#ffe2e2;
    color:#b42323;
}

.btn-info{
    background:#e4f0ff;
    color:#1769aa;
}

.search{
    padding:10px 14px;
    border:1px solid #dce2de;
    border-radius:9px;
    outline:none;
    width:220px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th,td{
    padding:14px 10px;
    border-bottom:1px solid #edf0ee;
    text-align:left;
    font-size:14px;
}

th{
    color:#65716c;
    font-size:12px;
    text-transform:uppercase;
}

.status{
    display:inline-block;
    padding:6px 10px;
    border-radius:20px;
    font-size:12px;
    font-weight:bold;
}

.status.publish{
    background:#e2f7ea;
    color:#087443;
}

.status.draft{
    background:#f1f3f2;
    color:#66716c;
}

.action{
    display:flex;
    gap:6px;
}

/* MODAL */
.modal{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.45);
    z-index:2000;
    align-items:center;
    justify-content:center;
    padding:20px;
}

.modal.show{
    display:flex;
}

.modal-box{
    background:white;
    width:min(900px, 95vw);
    max-width:100%;
    max-height:90vh;
    overflow:auto;
    border-radius:18px;
    padding:25px;
}

.modal-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:22px;
}

.close{
    border:none;
    background:#f0f2f1;
    width:35px;
    height:35px;
    border-radius:50%;
    cursor:pointer;
    font-size:18px;
}

.form-group{
    margin-bottom:17px;
}

.form-group label{
    display:block;
    font-weight:bold;
    margin-bottom:7px;
    font-size:14px;
}

.form-control{
    width:100%;
    padding:12px 13px;
    border:1px solid #d8dfdb;
    border-radius:9px;
    outline:none;
}

.form-control:focus{
    border-color:#087443;
}

textarea.form-control{
    min-height:120px;
    resize:vertical;
}

.ck-editor__editable_inline{
    min-height:360px;
    max-height:480px;
    overflow:auto;
}

.form-footer{
    display:flex;
    justify-content:flex-end;
    gap:10px;
    margin-top:20px;
}

/* BOOK */
.book-cover{
    width:48px;
    height:60px;
    object-fit:cover;
    border-radius:5px;
    background:#e8efeb;
}

.pdf-link{
    color:#087443;
    text-decoration:none;
    font-weight:bold;
}

/* RESPONSIVE */
.mobile-menu{
    display:none;
    border:none;
    background:white;
    font-size:23px;
    cursor:pointer;
}

@media(max-width:900px){

    .sidebar{
        transform:translateX(-100%);
        transition:.3s;
    }

    .sidebar.show{
        transform:translateX(0);
    }

    .main{
        margin-left:0;
    }

    .mobile-menu{
        display:block;
    }

    .cards{
        grid-template-columns:repeat(2,1fr);
    }

    .content{
        padding:20px;
    }

    table{
        min-width:750px;
    }

    .panel{
        overflow-x:auto;
    }
}

@media(max-width:550px){

    .cards{
        grid-template-columns:1fr;
    }

    .topbar{
        padding:0 15px;
    }

    .topbar h1{
        font-size:17px;
    }

    .user span{
        display:none;
    }

    .search{
        width:150px;
    }
}

.login-status {
    display:flex;
    align-items:center;
    gap:12px;
}
</style>
</head>

<body>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">

    <div class="logo">
        <div class="logo-icon">UKS</div>
        <div>
            <h2>CMS Admin</h2>
            <small>Website UKS</small>
        </div>
    </div>

    <div class="menu-title">Utama</div>

    <nav class="menu">

        <a class="active" onclick="showPage('dashboard',this)">
            <span class="menu-icon">📊</span>
            Dashboard
        </a>

        <div class="menu-title">Konten</div>

        <a onclick="showPage('berita',this)">
            <span class="menu-icon">📰</span>
            Kelola Berita
        </a>

        <a onclick="showPage('program',this)">
            <span class="menu-icon">🌱</span>
            Kelola Program
        </a>

        <a onclick="showPage('buku',this)">
            <span class="menu-icon">📚</span>
            Kelola Buku
        </a>

        <a onclick="showPage('infografisAdmin',this)">
            <span class="menu-icon">📊</span>
            Kelola Infografis
        </a>

        <a onclick="showPage('video',this)">
            <span class="menu-icon">🎥</span>
            Kelola Video
        </a>

        <a onclick="showPage('screenshot',this)">
            <span class="menu-icon">🖼️</span>
            Kelola Logo
        </a>

        <div class="menu-title">Website</div>

        <a onclick="showPage('menu',this)">
            <span class="menu-icon">🧭</span>
            Kelola Menu
        </a>

        <a onclick="showPage('pengaturan',this)">
            <span class="menu-icon">⚙️</span>
            Pengaturan
        </a>

    </nav>

</aside>


<!-- MAIN -->
<main class="main">

    <header class="topbar">

        <div style="display:flex;align-items:center;gap:15px">
            <button class="mobile-menu" onclick="toggleSidebar()">☰</button>
            <h1 id="pageTitle">Dashboard</h1>
        </div>

        <div class="user login-status">
            <span><?php echo htmlspecialchars($currentUser); ?></span>
            <div class="avatar"><?php echo strtoupper(substr($currentUser, 0, 1)); ?></div>
            <form method="post" action="" style="margin:0;">
                <input type="hidden" name="logout" value="1">
                <button type="submit" class="btn btn-warning" style="padding:8px 12px;font-size:12px;">Logout</button>
            </form>
        </div>

    </header>


    <div class="content">


        <!-- DASHBOARD -->
        <section class="page active" id="dashboard">

            <h2>Selamat Datang 👋</h2>
            <p style="color:#75817c;margin-top:7px">
                Kelola konten website UKS melalui halaman admin.
            </p>

            <div class="cards">

                <div class="card">
                    <div class="card-top">
                        <span>Berita</span>
                        <div class="card-icon">📰</div>
                    </div>
                    <h3 id="totalBerita">0</h3>
                    <p>Total berita</p>
                </div>

                <div class="card">
                    <div class="card-top">
                        <span>Buku</span>
                        <div class="card-icon">📚</div>
                    </div>
                    <h3 id="totalBuku">0</h3>
                    <p>Total buku</p>
                </div>

                <div class="card">
                    <div class="card-top">
                        <span>Menu</span>
                        <div class="card-icon">🧭</div>
                    </div>
                    <h3 id="totalMenu">0</h3>
                    <p>Menu website</p>
                </div>

                <div class="card">
                    <div class="card-top">
                        <span>Status</span>
                        <div class="card-icon">🌐</div>
                    </div>
                    <h3 style="font-size:20px">ONLINE</h3>
                    <p>Website aktif</p>
                </div>

            </div>


            <div class="panel">

                <div class="panel-header">
                    <h2>Aktivitas Terbaru</h2>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Aktivitas</th>
                            <th>Waktu</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>CMS berhasil dijalankan</td>
                            <td>Baru saja</td>
                            <td>
                                <span class="status publish">Aktif</span>
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>

        </section>



        <!-- BERITA -->
        <section class="page" id="berita">

            <div class="panel">

                <div class="panel-header">

                    <div>
                        <h2>Kelola Berita</h2>
                        <p style="color:#75817c;margin-top:5px">
                            Tambahkan dan kelola berita website.
                        </p>
                    </div>

                    <button class="btn btn-primary" onclick="openBerita()">
                        + Tambah Berita
                    </button>

                </div>

                <input
                    class="search"
                    placeholder="🔎 Cari berita..."
                    onkeyup="searchTable(this,'tabelBerita')"
                >

                <br><br>

                <table id="tabelBerita">

                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Kategori</th>
                            <th>Tanggal</th>
                            <th>Status</th>
                            <th>Slider</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody></tbody>

                </table>

            </div>

        </section>



        <!-- PROGRAM -->
        <section class="page" id="program">

            <div class="panel">

                <div class="panel-header">

                    <div>
                        <h2>Kelola Program UKS</h2>
                        <p style="color:#75817c;margin-top:5px">
                            Tambahkan dan atur program utama UKS.
                        </p>
                    </div>

                    <button class="btn btn-primary" onclick="openProgram()">
                        + Tambah Program
                    </button>

                </div>

                <input
                    class="search"
                    placeholder="🔎 Cari program..."
                    onkeyup="searchTable(this,'tabelProgram')"
                >

                <br><br>

                <table id="tabelProgram">

                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Gambar</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody></tbody>

                </table>

            </div>

        </section>



        <!-- BUKU -->
        <section class="page" id="buku">

            <div class="panel">

                <div class="panel-header">

                    <div>
                        <h2>Kelola Buku</h2>
                        <p style="color:#75817c;margin-top:5px">
                            Kelola buku panduan, modul dan publikasi.
                        </p>
                    </div>

                    <button class="btn btn-primary" onclick="openBuku()">
                        + Tambah Buku
                    </button>

                </div>

                <input
                    class="search"
                    placeholder="🔎 Cari buku..."
                    onkeyup="searchTable(this,'tabelBuku')"
                >

                <br><br>

                <table id="tabelBuku">

                    <thead>
                        <tr>
                            <th>Cover</th>
                            <th>Judul Buku</th>
                            <th>Kategori</th>
                            <th>Tahun</th>
                            <th>File</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody></tbody>

                </table>

            </div>

        </section>



        <!-- INFOGRAFIS -->
        <section class="page" id="infografisAdmin">

            <div class="panel">

                <div class="panel-header">

                    <div>
                        <h2>Kelola Infografis</h2>
                        <p style="color:#75817c;margin-top:5px">
                            Kelola publikasi infografis website.
                        </p>
                    </div>

                    <button class="btn btn-primary" onclick="openInfografisAdmin()">
                        + Tambah Infografis
                    </button>

                </div>

                <input
                    class="search"
                    placeholder="🔎 Cari infografis..."
                    onkeyup="searchTable(this,'tabelInfografis')"
                >

                <br><br>

                <table id="tabelInfografis">

                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Gambar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody></tbody>

                </table>

            </div>

        </section>



        <!-- VIDEO -->
        <section class="page" id="video">

            <div class="panel">

                <div class="panel-header">

                    <div>
                        <h2>Kelola Video</h2>
                        <p style="color:#75817c;margin-top:5px">
                            Kelola daftar video publikasi UKS.
                        </p>
                    </div>

                    <button class="btn btn-primary" onclick="openVideoAdmin()">
                        + Tambah Video
                    </button>

                </div>

                <input
                    class="search"
                    placeholder="🔎 Cari video..."
                    onkeyup="searchTable(this,'tabelVideo')"
                >

                <br><br>

                <table id="tabelVideo">

                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Thumbnail</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody></tbody>

                </table>

            </div>

        </section>



        <!-- SCREENSHOT -->
        <section class="page" id="screenshot">

            <div class="panel">

                <div class="panel-header">

                    <div>
                        
                    </div>

                    <button class="btn btn-primary" onclick="openScreenshotAdmin()">
                        + Tambah Logo
                    </button>

                </div>

                <input
                    class="search"
                    placeholder="🔎 Cari logo"
                    onkeyup="searchTable(this,'tabelScreenshot')"
                >

            

                <br><br>

                <table id="tabelScreenshot">

                    <thead>
                        <tr>
                            <th>Preview Gambar</th>
                            <th>Nama Gambar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody></tbody>

                </table>

            </div>

        </section>



        <!-- MENU -->
        <section class="page" id="menu">

            <div class="panel">

                <div class="panel-header">

                    <div>
                        <h2>Kelola Menu</h2>
                        <p style="color:#75817c;margin-top:5px">
                            Atur navigasi pada website.
                        </p>
                    </div>

                    <button class="btn btn-primary" onclick="openMenu()">
                        + Tambah Menu
                    </button>

                </div>

                <table id="tabelMenu">

                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Menu</th>
                            <th>URL</th>
                            <th>Posisi</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody></tbody>

                </table>

            </div>

        </section>



        <!-- PENGATURAN -->
        <section class="page" id="pengaturan">

            <div class="panel">

                <div class="panel-header">
                    <div>
                        <h2>Pengaturan Website</h2>
                        <p style="color:#75817c;margin-top:5px">
                            Atur informasi dasar website.
                        </p>
                    </div>
                </div>

                <form onsubmit="saveSettings(event)">

                    <div class="form-group">
                        <label>Nama Website</label>
                        <input
                            class="form-control"
                            id="siteName"
                            value="Website UKS"
                        >
                    </div>

                    <div class="form-group">
                        <label>Deskripsi Website</label>
                        <textarea
                            class="form-control"
                            id="siteDescription"
                        >Portal informasi Usaha Kesehatan Sekolah.</textarea>
                    </div>

                    <div class="form-group">
                        <label>Email Admin</label>
                        <input
                            type="email"
                            class="form-control"
                            id="siteEmail"
                            value="admin@website.sch.id"
                        >
                    </div>

                    <button class="btn btn-primary">
                        Simpan Pengaturan
                    </button>

                </form>

            </div>

        </section>

    </div>

</main>



<!-- MODAL BERITA -->
<div class="modal" id="modalBerita">

    <div class="modal-box">

        <div class="modal-header">
            <h2 id="beritaModalTitle">Tambah Berita</h2>
            <button class="close" onclick="closeModal('modalBerita')">×</button>
        </div>

        <form onsubmit="saveBerita(event)">

            <input type="hidden" id="beritaId">
            <input type="hidden" id="beritaGambarCurrent">

            <div class="form-group">
                <label>Judul Berita</label>
                <input class="form-control" id="beritaJudul" required>
            </div>

            <div class="form-group">
                <label>Tanggal</label>
                <input type="date" class="form-control" id="beritaTanggal" required>
            </div>

            <div class="form-group">
                <label>Upload Thumbnail Berita</label>
                <input
                    class="form-control"
                    id="beritaGambar"
                    type="file"
                    accept="image/*"
                    onchange="updateBeritaPreview()"
                >
                <small style="display:block; margin-top:6px; color:#75817c;">
                    Jika tidak dipilih, thumbnail lama akan tetap dipakai. Data gambar akan otomatis tersimpan ke website setelah disimpan.
                </small>

                <div id="beritaPreviewWrap" style="margin-top:12px; display:none;">
                    <img
                        id="beritaGambarPreview"
                        src=""
                        alt="Preview Thumbnail Berita"
                        style="width:100%; max-height:180px; object-fit:cover; border-radius:12px; border:1px solid #dfeae3; background:#f3faf5;"
                    >
                </div>
            </div>

            <div class="form-group">
                <label>Isi Berita</label>
                <textarea class="form-control" id="beritaIsi" required></textarea>
            </div>

            <div class="form-group">
                <label>Status</label>
                <select class="form-control" id="beritaStatus">
                    <option value="publish">Publikasikan</option>
                    <option value="draft">Draft</option>
                </select>
            </div>

            <div class="form-footer">
                <button type="button" class="btn" onclick="closeModal('modalBerita')">
                    Batal
                </button>

                <button class="btn btn-primary">
                    Simpan Berita
                </button>
            </div>

        </form>

    </div>

</div>



<!-- MODAL BUKU -->
<div class="modal" id="modalBuku">

    <div class="modal-box">

        <div class="modal-header">
            <h2>Tambah Buku</h2>
            <button class="close" onclick="closeModal('modalBuku')">×</button>
        </div>

        <form onsubmit="saveBuku(event)">

            <input type="hidden" id="bukuId">

            <div class="form-group">
                <label>Judul Buku</label>
                <input class="form-control" id="bukuJudul" required>
            </div>

            <div class="form-group">
                <label>Kategori</label>
                <select class="form-control" id="bukuKategori">
                    <option>Buku Panduan</option>
                    <option>Modul</option>
                    <option>Infografis</option>
                    <option>Publikasi</option>
                </select>
            </div>

            <div class="form-group">
                <label>Tahun</label>
                <input type="number" class="form-control" id="bukuTahun" value="2026">
            </div>

            <div class="form-group">
                <label>URL Cover</label>
                <input
                    class="form-control"
                    id="bukuCover"
                    placeholder="https://..."
                >
            </div>

            <div class="form-group">
                <label>URL File PDF</label>
                <input
                    class="form-control"
                    id="bukuPDF"
                    placeholder="https://website.sch.id/buku.pdf"
                    required
                >
            </div>

            <div class="form-footer">

                <button
                    type="button"
                    class="btn"
                    onclick="closeModal('modalBuku')">
                    Batal
                </button>

                <button class="btn btn-primary">
                    Simpan Buku
                </button>

            </div>

        </form>

    </div>

</div>



<!-- MODAL SLIDER -->
<div class="modal" id="modalHeroSlide">

    <div class="modal-box">

        <div class="modal-header">
            <h2 id="heroSlideModalTitle">Tambah Slider</h2>
            <button class="close" onclick="closeModal('modalHeroSlide')">×</button>
        </div>

        <form onsubmit="saveHeroSlide(event)">

            <input type="hidden" id="heroSlideId">

            <div class="form-group">
                <label>Label</label>
                <input class="form-control" id="heroSlideLabel" placeholder="Contoh: Edukasi Gizi">
            </div>

            <div class="form-group">
                <label>Judul</label>
                <input class="form-control" id="heroSlideJudul" required>
            </div>

            <div class="form-group">
                <label>Deskripsi</label>
                <textarea class="form-control" id="heroSlideText"></textarea>
            </div>

            <div class="form-group">
                <label>URL Gambar</label>
                <input class="form-control" id="heroSlideImage" placeholder="https://..." required>
            </div>

            <div class="form-group">
                <label>Text Tombol</label>
                <input class="form-control" id="heroSlideButtonText" placeholder="Contoh: Lihat Program">
            </div>

            <div class="form-group">
                <label>Link Tombol</label>
                <input class="form-control" id="heroSlideButtonLink" placeholder="#berita">
            </div>

            <div class="form-group">
                <label>Warna Background</label>
                <input class="form-control" id="heroSlideBackground" placeholder="linear-gradient(...)">
            </div>

            <div class="form-footer">
                <button type="button" class="btn" onclick="closeModal('modalHeroSlide')">Batal</button>
                <button class="btn btn-primary">Simpan Slider</button>
            </div>

        </form>

    </div>

</div>



<!-- MODAL PROGRAM -->
<div class="modal" id="modalProgram">

    <div class="modal-box">

        <div class="modal-header">
            <h2 id="programModalTitle">Tambah Program</h2>
            <button class="close" onclick="closeModal('modalProgram')">×</button>
        </div>

        <form onsubmit="saveProgram(event)">

            <input type="hidden" id="programId">

            <div class="form-group">
                <label>Judul Program</label>
                <input class="form-control" id="programJudul" required>
            </div>

            <div class="form-group">
                <label>URL Gambar</label>
                <input class="form-control" id="programImage" placeholder="https://..." required>
            </div>

            <div class="form-group">
                <label>Deskripsi</label>
                <textarea class="form-control" id="programDeskripsi" required></textarea>
            </div>

            <div class="form-footer">
                <button type="button" class="btn" onclick="closeModal('modalProgram')">Batal</button>
                <button class="btn btn-primary">Simpan Program</button>
            </div>

        </form>

    </div>

</div>



<!-- MODAL INFOGRAFIS -->
<div class="modal" id="modalInfografisAdmin">

    <div class="modal-box">

        <div class="modal-header">
            <h2 id="infografisModalTitle">Tambah Infografis</h2>
            <button class="close" onclick="closeModal('modalInfografisAdmin')">×</button>
        </div>

        <form onsubmit="saveInfografisAdmin(event)">

            <input type="hidden" id="infografisId">

            <div class="form-group">
                <label>Judul Infografis</label>
                <input class="form-control" id="infografisJudul" required>
            </div>

            <div class="form-group">
                <label>URL Gambar</label>
                <input class="form-control" id="infografisImage" placeholder="https://..." required>
            </div>

            <div class="form-footer">
                <button type="button" class="btn" onclick="closeModal('modalInfografisAdmin')">Batal</button>
                <button class="btn btn-primary">Simpan Infografis</button>
            </div>

        </form>

    </div>

</div>



<!-- MODAL VIDEO -->
<div class="modal" id="modalVideoAdmin">

    <div class="modal-box">

        <div class="modal-header">
            <h2 id="videoModalTitle">Tambah Video</h2>
            <button class="close" onclick="closeModal('modalVideoAdmin')">×</button>
        </div>

        <form onsubmit="saveVideoAdmin(event)">

            <input type="hidden" id="videoId">

            <div class="form-group">
                <label>Judul Video</label>
                <input class="form-control" id="videoJudul" required>
            </div>

            <div class="form-group">
                <label>URL Thumbnail</label>
                <input class="form-control" id="videoImage" placeholder="https://..." required>
            </div>

            <div class="form-footer">
                <button type="button" class="btn" onclick="closeModal('modalVideoAdmin')">Batal</button>
                <button class="btn btn-primary">Simpan Video</button>
            </div>

        </form>

    </div>

</div>



<!-- MODAL SCREENSHOT -->
<div class="modal" id="modalScreenshotAdmin">

    <div class="modal-box">

        <div class="modal-header">
            <h2>Tambah Screenshot</h2>
            <button class="close" onclick="closeModal('modalScreenshotAdmin')">×</button>
        </div>

        <form onsubmit="saveScreenshotAdmin(event)">

            <input type="hidden" id="screenshotId">
            <input type="hidden" id="screenshotImageCurrent">

            <div class="form-group">
                <label>Nama Gambar</label>
                <input class="form-control" id="screenshotName" placeholder="Contoh: Screenshot Halaman Beranda" required>
            </div>

            <div class="form-group">
                <label>Upload Gambar</label>
                <input class="form-control" id="screenshotImage" type="file" accept="image/*">
                <small style="display:block; margin-top:6px; color:#75817c;">
                    Pilih file gambar yang akan ditampilkan di galeri screenshot website. Data ini akan otomatis muncul di halaman website setelah disimpan.
                </small>
            </div>

            <div class="form-footer">
                <button type="button" class="btn" onclick="closeModal('modalScreenshotAdmin')">Batal</button>
                <button class="btn btn-primary">Simpan Screenshot</button>
            </div>

        </form>

    </div>

</div>



<!-- MODAL MENU -->
<div class="modal" id="modalMenu">

    <div class="modal-box">

        <div class="modal-header">
            <h2>Tambah Menu</h2>
            <button class="close" onclick="closeModal('modalMenu')">×</button>
        </div>

        <form onsubmit="saveMenu(event)">

            <input type="hidden" id="menuId">

            <div class="form-group">
                <label>Nama Menu</label>
                <input
                    class="form-control"
                    id="menuNama"
                    placeholder="Contoh: Berita"
                    required
                >
            </div>

            <div class="form-group">
                <label>URL</label>
                <input
                    class="form-control"
                    id="menuUrl"
                    placeholder="/berita"
                    required
                >
            </div>

            <div class="form-group">
                <label>Posisi</label>
                <input
                    type="number"
                    class="form-control"
                    id="menuPosisi"
                    value="1"
                >
            </div>

            <div class="form-group">
                <label>Submenu Dari</label>
                <select class="form-control" id="menuParent">
                    <option value="">- Menu Utama -</option>
                </select>
            </div>

            <div class="form-group">
                <label>Status</label>
                <select class="form-control" id="menuStatus">
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                </select>
            </div>

            <div class="form-footer">

                <button
                    type="button"
                    class="btn"
                    onclick="closeModal('modalMenu')">
                    Batal
                </button>

                <button class="btn btn-primary">
                    Simpan Menu
                </button>

            </div>

        </form>

    </div>

</div>



<script>

/* DATA AWAL */

const initialStorage = {
    berita: [
        {
            id: 1,
            judul: "Belajar Gizi dari Kebun Sekolah, Cara NGTS Ubah Pengetahuan menjadi kebiasaan",
            kategori: "Berita",
            tanggal: "2026-09-09",
            isi: "Jakarta, 25 Agustus 2026 — Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) melalui SEAMEO RECFON (Southeast Asian Ministers of Education Organization Regional Centre for Food and Nutrition) memasuki satu dekade pelaksanaan program Nutrition Goes to School (NGTS). Program ini mendorong edukasi gizi tidak berhenti di ruang kelas, tetapi diterjemalkan menjadi praktik nyata yang membudaya di sekolah.",
            status: "publish",
            gambar: "Aset UKS/beritagambar1.png",
            slider: true
        },
        {
            id: 2,
            judul: "Rapat Koordinasi UPT Implementasi Edukasi Gizi Perkuat Sinergi Pendampingan di Satuan Pendidikan",
            kategori: "Kegiatan",
            tanggal: "2026-09-07",
            isi: "Serpong, Banten, 21 Agustus 2026 — Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) melalui Direktorat Sekolah Menengah Pertama (SMP) menyelenggarakan Rapat Koordinasi UPT Implementasi Edukasi Gizi pada 19–21 Agustus 2026 di Jakarta. Kegiatan ini menjadi momentum untuk memperkuat kesepahaman, sinergi, dan komitmen bersama dalam mendukung implementasi edukasi gizi di satuan pendidikan.",
            status: "publish",
            gambar: "Aset UKS/bertaigambar2.png",
            slider: true
        },
        {
            id: 3,
            judul: "Hari Anak Nasional 2026, Kemendikdasmen Ajak Anak kembali Bermain dan kurangi pemakaian",
            kategori: "Informasi",
            tanggal: "2026-09-05",
            isi: "Aktivitas fisik menjadi salah satu kebiasaan baik untuk mendukung kebugaran peserta didik.",
            status: "publish",
            gambar: "Aset UKS/gambar3.png",
            slider: true
        }
    ],
    buku: [
        {
            id: 1,
            judul: "Panduan Praktis Implementasi Modul Edukasi Gizi pada Program Makanan Bergizi Gratis (MBG)",
            kategori: "Panduan",
            tahun: "2026",
            cover: "Aset UKS/bukucover1.png",
            pdf: "Aset UKS/buku1.pdf"
        },
        {
            id: 2,
            judul: "Pedoman Program Kesehatan Reproduksi",
            kategori: "Panduan",
            tahun: "2026",
            cover: "Aset UKS/coverbuku2.png",
            pdf: "Aset UKS/buku2.pdf"
        },
        {
            id: 3,
            judul: "Edukasi Gizi untuk Peserta Didik",
            kategori: "Buku",
            tahun: "2026",
            cover: "Aset UKS/coverbuku3.png",
            pdf: "Aset UKS/buku3.pdf"
        },
        {
            id: 4,
            judul: "Panduan Lingkungan Sekolah Sehat",
            kategori: "Panduan",
            tahun: "2026",
            cover: "Aset UKS/coverbuku4.png",
            pdf: "Aset UKS/rxtoMtve87W9xvTNE5nyLViQftgG0kutb7QLmRHz.pdf"
        }
    ],
    menus: [
        {
            id: 1,
            nama: "Beranda",
            url: "#beranda",
            posisi: 1,
            status: "Aktif"
        },
        {
            id: 2,
            nama: "UKS/M",
            url: "#tentang",
            posisi: 2,
            status: "Aktif"
        },
        {
            id: 3,
            nama: "Program",
            url: "#berita",
            posisi: 3,
            status: "Aktif"
        },
        {
            id: 4,
            nama: "Informasi",
            url: "#buku",
            posisi: 4,
            status: "Aktif"
        },
        {
            id: 5,
            nama: "Publikasi",
            url: "#infografis",
            posisi: 5,
            status: "Aktif"
        }
    ],
    heroSlides: [
        {
            id: 1,
            label: "Edukasi Gizi",
            judul: "Belajar Gizi dari Kebun Sekolah, Cara NGTS Ubah Pengetahuan menjadi Kebiasaan",
            text: "Edukasi gizi dan sekolah sehat menjadi budaya yang tumbuh dari praktik nyata di lingkungan sekolah.",
            image: "Aset UKS/beritagambar1.png",
            buttonText: "Lihat Program",
            buttonLink: "#berita",
            background: "linear-gradient(110deg, #064d2e 0%, #087a42 55%, #39a96d 100%)"
        },
        {
            id: 2,
            label: "Koordinasi",
            judul: "Rapat Koordinasi UPT Implementasi Edukasi Gizi Perkuat Sinergi Pendampingan",
            text: "Sinergi lintas satuan pendidikan memperkuat pelaksanaan edukasi gizi dan layanan kesehatan sekolah.",
            image: "Aset UKS/bertaigambar2.png",
            buttonText: "Lihat Kegiatan",
            buttonLink: "#berita",
            background: "linear-gradient(110deg, #075f39 0%, #14915a 55%, #58bf88 100%)"
        },
        {
            id: 3,
            label: "Kebugaran",
            judul: "Hari Anak Nasional 2026, Kemendikdasmen Ajak Anak Kembali Bermain",
            text: "Aktivitas fisik, bermain, dan kebugaran menjadi bagian penting dari pendidikan yang sehat.",
            image: "Aset UKS/gambar3.png",
            buttonText: "Baca Selengkapnya",
            buttonLink: "#berita",
            background: "linear-gradient(110deg, #0b5237 0%, #16875a 55%, #6bc99a 100%)"
        }
    ],
    programs: [
        {
            id: 1,
            judul: "Pendidikan Kesehatan",
            image: "Aset UKS/beritagambar1.png",
            deskripsi: "Membekali peserta didik dengan pengetahuan dan kebiasaan hidup bersih serta sehat."
        },
        {
            id: 2,
            judul: "Pelayanan Kesehatan",
            image: "Aset UKS/bertaigambar2.png",
            deskripsi: "Menyediakan layanan promotif, preventif, pertolongan pertama, dan rujukan kesehatan."
        },
        {
            id: 3,
            judul: "Lingkungan Sekolah Sehat",
            image: "Aset UKS/qtu5X5mZ0OG3FyNWd3ylbvUowy0kBlhOi6hAakTU.jpg",
            deskripsi: "Mendorong lingkungan sekolah yang bersih, aman, nyaman, dan mendukung kegiatan belajar."
        },
        {
            id: 4,
            judul: "Gizi Seimbang",
            image: "Aset UKS/infograsi1.png",
            deskripsi: "Mengajak siswa memahami pilihan makanan bergizi dan menerapkan pola makan seimbang."
        },
        {
            id: 5,
            judul: "Aktivitas Fisik",
            image: "Aset UKS/gambar3.png",
            deskripsi: "Membangun kebiasaan bergerak aktif untuk menjaga kebugaran dan kesehatan peserta didik."
        }
    ],
    infografis: [
        {
            id: 1,
            judul: "Informasi Kesehatan Sekolah",
            image: "Aset UKS/infograsi1.png"
        },
        {
            id: 2,
            judul: "Lingkungan Sekolah Sehat",
            image: "Aset UKS/qtu5X5mZ0OG3FyNWd3ylbvUowy0kBlhOi6hAakTU.jpg"
        },
        {
            id: 3,
            judul: "Edukasi Kesehatan Peserta Didik",
            image: "Aset UKS/IoXWcqNbTfrFivbEdyumvg78d4dwkaLhY2ZPRbzW.jpg"
        }
    ],
    videos: [
        {
            id: 1,
            judul: "Edukasi Gizi untuk Peserta Didik",
            image: "Aset UKS/beritagambar1.png"
        },
        {
            id: 2,
            judul: "Pelayanan Kesehatan di Sekolah",
            image: "Aset UKS/bertaigambar2.png"
        },
        {
            id: 3,
            judul: "Gerakan Lingkungan Sekolah Sehat",
            image: "Aset UKS/qtu5X5mZ0OG3FyNWd3ylbvUowy0kBlhOi6hAakTU.jpg"
        },
        {
            id: 4,
            judul: "Aktivitas Fisik dan Kebugaran",
            image: "Aset UKS/gambar3.png"
        }
    ],
    screenshots: [
        { id: 1, image: "Aset UKS/Screenshot 2026-09-09 105341.png" },
        { id: 2, image: "Aset UKS/Screenshot 2026-09-09 105347.png" },
        { id: 3, image: "Aset UKS/Screenshot 2026-09-09 105351.png" },
        { id: 4, image: "Aset UKS/Screenshot 2026-09-09 105355.png" },
        { id: 5, image: "Aset UKS/Screenshot 2026-09-09 105400.png" },
        { id: 6, image: "Aset UKS/Screenshot 2026-09-09 105406.png" },
        { id: 7, image: "Aset UKS/Screenshot 2026-09-09 105412.png" },
        { id: 8, image: "Aset UKS/Screenshot 2026-09-09 105418.png" },
        { id: 9, image: "Aset UKS/Screenshot 2026-09-09 105423.png" },
        { id: 10, image: "Aset UKS/Screenshot 2026-09-09 105428.png" },
        { id: 11, image: "Aset UKS/Screenshot 2026-09-09 105433.png" },
        { id: 12, image: "Aset UKS/Screenshot 2026-09-09 105500.png" },
        { id: 13, image: "Aset UKS/Screenshot 2026-09-09 105505.png" },
        { id: 14, image: "Aset UKS/Screenshot 2026-09-09 105511.png" }
    ],
    siteName: "UKS Indonesia | Sekolah Sehat",
    siteDescription: "Portal informasi, edukasi, berita, dan literasi kesehatan untuk mendukung terwujudnya lingkungan sekolah yang sehat, aman, dan nyaman.",
    siteEmail: "info@uks.id"
};

function seedInitialData() {
    Object.entries(initialStorage).forEach(function ([key, value]) {
        const storedValue = localStorage.getItem(key);

        if (!storedValue) {
            localStorage.setItem(key, JSON.stringify(value));
            return;
        }

        try {
            const parsedValue = JSON.parse(storedValue);

            if (
                Array.isArray(parsedValue) && parsedValue.length === 0
            ) {
                localStorage.setItem(key, JSON.stringify(value));
            }

            if (
                parsedValue === null ||
                parsedValue === undefined ||
                typeof parsedValue !== "object"
            ) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });
}

seedInitialData();

function ensureBeritaSeed() {
    try {
        const storedValue = localStorage.getItem("berita");
        const parsedValue = storedValue ? JSON.parse(storedValue) : null;

        if (!Array.isArray(parsedValue) || parsedValue.length === 0) {
            localStorage.setItem("berita", JSON.stringify(initialStorage.berita));
        }
    } catch (error) {
        localStorage.setItem("berita", JSON.stringify(initialStorage.berita));
    }
}

function syncWebsiteDataToCms() {
    Object.entries(initialStorage).forEach(function ([key, value]) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn("Gagal menyinkronkan data ke CMS untuk key: " + key, error);
        }
    });
}

ensureBeritaSeed();
syncWebsiteDataToCms();

function normalizeStorageData() {
    const normalizeArray = function (items, normalizer) {
        if (!Array.isArray(items)) {
            return [];
        }

        return items.map(normalizer).filter(item => item !== null);
    };

    const normalizedPrograms = normalizeArray(
        JSON.parse(localStorage.getItem("programs") || "[]"),
        function (item) {
            if (!item) {
                return null;
            }

            return {
                id: item.id,
                judul: item.judul || item.title || "",
                image: item.image || item.gambar || "",
                deskripsi: item.deskripsi || item.description || ""
            };
        }
    );

    const normalizedInfografis = normalizeArray(
        JSON.parse(localStorage.getItem("infografis") || "[]"),
        function (item) {
            if (!item) {
                return null;
            }

            return {
                id: item.id,
                judul: item.judul || item.title || "",
                image: item.image || item.gambar || ""
            };
        }
    );

    const normalizedVideos = normalizeArray(
        JSON.parse(localStorage.getItem("videos") || "[]"),
        function (item) {
            if (!item) {
                return null;
            }

            return {
                id: item.id,
                judul: item.judul || item.title || "",
                image: item.image || item.gambar || ""
            };
        }
    );

    const normalizedHeroSlides = normalizeArray(
        JSON.parse(localStorage.getItem("heroSlides") || "[]"),
        function (item) {
            if (!item) {
                return null;
            }

            return {
                id: item.id,
                judul: item.judul || item.title || "",
                label: item.label || "",
                text: item.text || item.deskripsi || "",
                image: item.image || item.gambar || "",
                buttonText: item.buttonText || item.buttontext || "",
                buttonLink: item.buttonLink || "#",
                background: item.background || ""
            };
        }
    );

    const normalizedScreenshots = normalizeArray(
        JSON.parse(localStorage.getItem("screenshots") || "[]"),
        function (item) {
            if (!item) {
                return null;
            }

            if (typeof item === "string") {
                return {
                    id: Date.now() + Math.random(),
                    image: item,
                    name: "Screenshot"
                };
            }

            return {
                id: item.id,
                image: item.image || item.gambar || "",
                name: item.name || item.nama || "Screenshot"
            };
        }
    );

    const keys = [
        ["programs", normalizedPrograms],
        ["infografis", normalizedInfografis],
        ["videos", normalizedVideos],
        ["heroSlides", normalizedHeroSlides],
        ["screenshots", normalizedScreenshots]
    ];

    keys.forEach(function ([key, value]) {
        const currentValue = JSON.parse(localStorage.getItem(key) || "[]");

        if (JSON.stringify(currentValue) !== JSON.stringify(value)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });
}

normalizeStorageData();

let berita = JSON.parse(localStorage.getItem("berita")) || initialStorage.berita;
let buku = JSON.parse(localStorage.getItem("buku")) || initialStorage.buku;
let menus = JSON.parse(localStorage.getItem("menus")) || initialStorage.menus;
let heroSlides = JSON.parse(localStorage.getItem("heroSlides")) || initialStorage.heroSlides;
let programs = JSON.parse(localStorage.getItem("programs")) || initialStorage.programs;
let infografis = JSON.parse(localStorage.getItem("infografis")) || initialStorage.infografis;
let videos = JSON.parse(localStorage.getItem("videos")) || initialStorage.videos;
let screenshots = JSON.parse(localStorage.getItem("screenshots")) || initialStorage.screenshots;


/* NAVIGASI */

function showPage(page, element){

    document.querySelectorAll(".page")
        .forEach(p => p.classList.remove("active"));

    document.getElementById(page)
        .classList.add("active");

    document.querySelectorAll(".menu a")
        .forEach(a => a.classList.remove("active"));

    if(element)
        element.classList.add("active");

    const titles = {
        dashboard:"Dashboard",
        berita:"Kelola Berita",
        slider:"Kelola Slider",
        program:"Kelola Program",
        buku:"Kelola Buku",
        infografisAdmin:"Kelola Infografis",
        video:"Kelola Video",
        screenshot:"Kelola Logo",
        menu:"Kelola Menu",
        pengaturan:"Pengaturan"
    };

    document.getElementById("pageTitle").innerText = titles[page];

    document.getElementById("sidebar").classList.remove("show");

    renderAll();
}


/* SIDEBAR MOBILE */

function toggleSidebar(){

    document
        .getElementById("sidebar")
        .classList.toggle("show");

}


/* MODAL */

function openModal(id){
    document.getElementById(id).classList.add("show");
}

function closeModal(id){
    document.getElementById(id).classList.remove("show");
}


/* SLIDER */

function openHeroSlide(){

    document.getElementById("heroSlideId").value="";
    document.getElementById("heroSlideLabel").value="";
    document.getElementById("heroSlideJudul").value="";
    document.getElementById("heroSlideText").value="";
    document.getElementById("heroSlideImage").value="";
    document.getElementById("heroSlideButtonText").value="";
    document.getElementById("heroSlideButtonLink").value="";
    document.getElementById("heroSlideBackground").value="";

    document.getElementById("heroSlideModalTitle").innerText="Tambah Slider";

    openModal("modalHeroSlide");

}


function saveHeroSlide(e){

    e.preventDefault();

    const id=document.getElementById("heroSlideId").value;

    const data={
        id:id ? Number(id) : Date.now(),
        label:document.getElementById("heroSlideLabel").value,
        judul:document.getElementById("heroSlideJudul").value,
        text:document.getElementById("heroSlideText").value,
        image:document.getElementById("heroSlideImage").value,
        buttonText:document.getElementById("heroSlideButtonText").value,
        buttonLink:document.getElementById("heroSlideButtonLink").value,
        background:document.getElementById("heroSlideBackground").value
    };

    if(id){

        heroSlides=heroSlides.map(item =>
            item.id==id ? data : item
        );

    }else{

        heroSlides.push(data);

    }

    localStorage.setItem("heroSlides",JSON.stringify(heroSlides));

    closeModal("modalHeroSlide");

    renderAll();

}


function editHeroSlide(id){

    const item=heroSlides.find(x=>x.id==id);

    document.getElementById("heroSlideId").value=item.id;
    document.getElementById("heroSlideLabel").value=item.label || "";
    document.getElementById("heroSlideJudul").value=item.judul;
    document.getElementById("heroSlideText").value=item.text || "";
    document.getElementById("heroSlideImage").value=item.image;
    document.getElementById("heroSlideButtonText").value=item.buttonText || "";
    document.getElementById("heroSlideButtonLink").value=item.buttonLink || "";
    document.getElementById("heroSlideBackground").value=item.background || "";

    document.getElementById("heroSlideModalTitle").innerText="Edit Slider";

    openModal("modalHeroSlide");

}


function deleteHeroSlide(id){

    if(confirm("Hapus slider ini?")){

        heroSlides=heroSlides.filter(x=>x.id!=id);

        localStorage.setItem("heroSlides",JSON.stringify(heroSlides));

        renderAll();

    }

}


/* PROGRAM */

function openProgram(){

    document.getElementById("programId").value="";
    document.getElementById("programJudul").value="";
    document.getElementById("programImage").value="";
    document.getElementById("programDeskripsi").value="";
    document.getElementById("programModalTitle").innerText="Tambah Program";

    openModal("modalProgram");

}


function saveProgram(e){

    e.preventDefault();

    const id=document.getElementById("programId").value;

    const data={
        id:id ? Number(id) : Date.now(),
        judul:document.getElementById("programJudul").value,
        image:document.getElementById("programImage").value,
        deskripsi:document.getElementById("programDeskripsi").value
    };

    if(id){

        programs=programs.map(item =>
            item.id==id ? data : item
        );

    }else{

        programs.push(data);

    }

    localStorage.setItem("programs",JSON.stringify(programs));

    closeModal("modalProgram");

    renderAll();

}


function editProgram(id){

    const item=programs.find(x=>x.id==id);

    document.getElementById("programId").value=item.id;
    document.getElementById("programJudul").value=item.judul;
    document.getElementById("programImage").value=item.image;
    document.getElementById("programDeskripsi").value=item.deskripsi;
    document.getElementById("programModalTitle").innerText="Edit Program";

    openModal("modalProgram");

}


function deleteProgram(id){

    if(confirm("Hapus program ini?")){

        programs=programs.filter(x=>x.id!=id);

        localStorage.setItem("programs",JSON.stringify(programs));

        renderAll();

    }

}


/* BERITA */

function updateBeritaPreview(){

    const fileInput=document.getElementById("beritaGambar");
    const previewWrap=document.getElementById("beritaPreviewWrap");
    const previewImage=document.getElementById("beritaGambarPreview");
    const currentImage=document.getElementById("beritaGambarCurrent").value || "";

    if(fileInput.files && fileInput.files[0]){

        const reader=new FileReader();

        reader.onload=function(){
            previewImage.src=reader.result;
            previewWrap.style.display="block";
        };

        reader.readAsDataURL(fileInput.files[0]);
        return;

    }

    if(currentImage){
        previewImage.src=currentImage;
        previewWrap.style.display="block";
        return;
    }

    previewImage.src="";
    previewWrap.style.display="none";

}


function openBerita(){

    document.getElementById("beritaId").value="";
    document.getElementById("beritaJudul").value="";
    document.getElementById("beritaTanggal").value=
        new Date().toISOString().split("T")[0];
    document.getElementById("beritaGambar").value="";
    document.getElementById("beritaGambarCurrent").value="";
    document.getElementById("beritaIsi").value="";

    if(window.beritaEditor){
        window.beritaEditor.setData("");
    }

    document.getElementById("beritaStatus").value="publish";
    document.getElementById("beritaPreviewWrap").style.display="none";
    document.getElementById("beritaGambarPreview").src="";

    document.getElementById("beritaModalTitle").innerText=
        "Tambah Berita";

    openModal("modalBerita");
}


async function saveBerita(e){

    e.preventDefault();

    const beritaIsiField=document.getElementById("beritaIsi");
    const beritaContent = window.beritaEditor
        ? window.beritaEditor.getData()
        : (beritaIsiField ? beritaIsiField.value : "");

    if(beritaIsiField){
        beritaIsiField.value = beritaContent;
    }

    const id=document.getElementById("beritaId").value;
    const existingItem=id ? berita.find(x=>x.id==Number(id)) : null;
    const fileInput=document.getElementById("beritaGambar");
    const currentImage=document.getElementById("beritaGambarCurrent").value || existingItem?.gambar || existingItem?.image || existingItem?.cover || "";

    let gambar=currentImage;

    if(fileInput.files && fileInput.files[0]){

        try{
            gambar = await fileToDataUrl(fileInput.files[0]);
        }catch(error){
            alert(error.message);
            return;
        }

    }

    const data={
        ...(existingItem || {}),
        id:id ? Number(id) : Date.now(),
        judul:document.getElementById("beritaJudul").value,
        kategori:existingItem?.kategori || "Berita",
        tanggal:document.getElementById("beritaTanggal").value,
        gambar:gambar,
        isi:beritaContent,
        status:document.getElementById("beritaStatus").value
    };

    if(id){

        berita=berita.map(item =>
            item.id==id ? data : item
        );

    }else{

        berita.push(data);

    }

    localStorage.setItem("berita",JSON.stringify(berita));

    closeModal("modalBerita");

    renderAll();

}


function editBerita(id){

    const item=berita.find(x=>x.id==id);

    document.getElementById("beritaId").value=item.id;
    document.getElementById("beritaJudul").value=item.judul;
    document.getElementById("beritaTanggal").value=item.tanggal;
    document.getElementById("beritaGambarCurrent").value=item.gambar || item.image || item.cover || "";
    document.getElementById("beritaGambar").value="";
    document.getElementById("beritaIsi").value=item.isi || "";

    if(window.beritaEditor){
        window.beritaEditor.setData(item.isi || "");
    }

    document.getElementById("beritaStatus").value=item.status;

    updateBeritaPreview();

    document.getElementById("beritaModalTitle").innerText=
        "Edit Berita";

    openModal("modalBerita");

}


function toggleBeritaSlider(id){

    berita=berita.map(item => {
        if(item.id!=id){
            return item;
        }

        return {
            ...item,
            slider: !Boolean(item.slider)
        };
    });

    localStorage.setItem("berita", JSON.stringify(berita));

    renderAll();

}


function deleteBerita(id){

    if(confirm("Hapus berita ini?")){

        berita=berita.filter(x=>x.id!=id);

        localStorage.setItem(
            "berita",
            JSON.stringify(berita)
        );

        renderAll();

    }

}


/* BUKU */

function openBuku(){

    document.getElementById("bukuId").value="";
    document.getElementById("bukuJudul").value="";
    document.getElementById("bukuCover").value="";
    document.getElementById("bukuPDF").value="";

    openModal("modalBuku");

}


function saveBuku(e){

    e.preventDefault();

    const id=document.getElementById("bukuId").value;

    const data={
        id:id ? Number(id) : Date.now(),
        judul:document.getElementById("bukuJudul").value,
        kategori:document.getElementById("bukuKategori").value,
        tahun:document.getElementById("bukuTahun").value,
        cover:document.getElementById("bukuCover").value,
        pdf:document.getElementById("bukuPDF").value
    };

    if(id){

        buku=buku.map(item =>
            item.id==id ? data : item
        );

    }else{

        buku.push(data);

    }

    localStorage.setItem("buku",JSON.stringify(buku));

    closeModal("modalBuku");

    renderAll();

}


function editBuku(id){

    const item=buku.find(x=>x.id==id);

    document.getElementById("bukuId").value=item.id;
    document.getElementById("bukuJudul").value=item.judul;
    document.getElementById("bukuKategori").value=item.kategori;
    document.getElementById("bukuTahun").value=item.tahun;
    document.getElementById("bukuCover").value=item.cover;
    document.getElementById("bukuPDF").value=item.pdf;

    openModal("modalBuku");

}


function deleteBuku(id){

    if(confirm("Hapus buku ini?")){

        buku=buku.filter(x=>x.id!=id);

        localStorage.setItem(
            "buku",
            JSON.stringify(buku)
        );

        renderAll();

    }

}


/* INFOGRAFIS */

function openInfografisAdmin(){

    document.getElementById("infografisId").value="";
    document.getElementById("infografisJudul").value="";
    document.getElementById("infografisImage").value="";
    document.getElementById("infografisModalTitle").innerText="Tambah Infografis";

    openModal("modalInfografisAdmin");

}


function saveInfografisAdmin(e){

    e.preventDefault();

    const id=document.getElementById("infografisId").value;

    const data={
        id:id ? Number(id) : Date.now(),
        judul:document.getElementById("infografisJudul").value,
        image:document.getElementById("infografisImage").value
    };

    if(id){

        infografis=infografis.map(item =>
            item.id==id ? data : item
        );

    }else{

        infografis.push(data);

    }

    localStorage.setItem("infografis",JSON.stringify(infografis));

    closeModal("modalInfografisAdmin");

    renderAll();

}


function editInfografisAdmin(id){

    const item=infografis.find(x=>x.id==id);

    document.getElementById("infografisId").value=item.id;
    document.getElementById("infografisJudul").value=item.judul;
    document.getElementById("infografisImage").value=item.image;
    document.getElementById("infografisModalTitle").innerText="Edit Infografis";

    openModal("modalInfografisAdmin");

}


function deleteInfografisAdmin(id){

    if(confirm("Hapus infografis ini?")){

        infografis=infografis.filter(x=>x.id!=id);

        localStorage.setItem("infografis",JSON.stringify(infografis));

        renderAll();

    }

}


/* VIDEO */

function openVideoAdmin(){

    document.getElementById("videoId").value="";
    document.getElementById("videoJudul").value="";
    document.getElementById("videoImage").value="";
    document.getElementById("videoModalTitle").innerText="Tambah Video";

    openModal("modalVideoAdmin");

}


function saveVideoAdmin(e){

    e.preventDefault();

    const id=document.getElementById("videoId").value;

    const data={
        id:id ? Number(id) : Date.now(),
        judul:document.getElementById("videoJudul").value,
        image:document.getElementById("videoImage").value
    };

    if(id){

        videos=videos.map(item =>
            item.id==id ? data : item
        );

    }else{

        videos.push(data);

    }

    localStorage.setItem("videos",JSON.stringify(videos));

    closeModal("modalVideoAdmin");

    renderAll();

}


function editVideoAdmin(id){

    const item=videos.find(x=>x.id==id);

    document.getElementById("videoId").value=item.id;
    document.getElementById("videoJudul").value=item.judul;
    document.getElementById("videoImage").value=item.image;
    document.getElementById("videoModalTitle").innerText="Edit Video";

    openModal("modalVideoAdmin");

}


function deleteVideoAdmin(id){

    if(confirm("Hapus video ini?")){

        videos=videos.filter(x=>x.id!=id);

        localStorage.setItem("videos",JSON.stringify(videos));

        renderAll();

    }

}


/* SCREENSHOT */

function fileToDataUrl(file){

    return new Promise(function(resolve, reject){

        if(!file){
            resolve("");
            return;
        }

        const reader = new FileReader();

        reader.onload = function(){
            resolve(reader.result || "");
        };

        reader.onerror = function(){
            reject(new Error("Gagal membaca file gambar."));
        };

        reader.readAsDataURL(file);

    });

}


function openScreenshotAdmin(){

    document.getElementById("screenshotId").value="";
    document.getElementById("screenshotName").value="";
    document.getElementById("screenshotImage").value="";
    document.getElementById("screenshotImageCurrent").value="";

    openModal("modalScreenshotAdmin");

}


async function saveScreenshotAdmin(e){

    e.preventDefault();

    const id=document.getElementById("screenshotId").value;
    const fileInput=document.getElementById("screenshotImage");
    const currentImage=document.getElementById("screenshotImageCurrent").value || "";
    const screenshotName=document.getElementById("screenshotName").value.trim();

    let image=currentImage;

    if(fileInput.files && fileInput.files[0]){

        try{
            image = await fileToDataUrl(fileInput.files[0]);
        }catch(error){
            alert(error.message);
            return;
        }

    }

    if(!image){
        alert("Silakan pilih gambar screenshot terlebih dahulu.");
        return;
    }

    const data={
        id:id ? Number(id) : Date.now(),
        name:screenshotName || (fileInput.files && fileInput.files[0] ? fileInput.files[0].name : "Screenshot " + (id || Date.now())),
        image:image
    };

    if(id){

        screenshots=screenshots.map(item =>
            item.id==id ? data : item
        );

    }else{

        screenshots.push(data);

    }

    localStorage.setItem("screenshots",JSON.stringify(screenshots));

    closeModal("modalScreenshotAdmin");

    renderAll();

}


function editScreenshotAdmin(id){

    const item=screenshots.find(x=>x.id==id);

    document.getElementById("screenshotId").value=item.id;
    document.getElementById("screenshotName").value=item.name || item.nama || "";
    document.getElementById("screenshotImageCurrent").value=item.image || "";
    document.getElementById("screenshotImage").value="";

    openModal("modalScreenshotAdmin");

}


function deleteScreenshotAdmin(id){

    if(confirm("Hapus screenshot ini?")){

        screenshots=screenshots.filter(x=>x.id!=id);

        localStorage.setItem("screenshots",JSON.stringify(screenshots));

        renderAll();

    }

}


/* MENU */

function populateMenuParentOptions(currentId){

    const parentSelect=document.getElementById("menuParent");
    const currentItemId=Number(currentId || 0);

    parentSelect.innerHTML='<option value="">- Menu Utama -</option>';

    menus
        .filter(item => item.id !== currentItemId)
        .sort((a,b)=>a.posisi-b.posisi)
        .forEach(item=>{

        const option=document.createElement("option");
        option.value=item.id;
        option.textContent=item.nama;
        parentSelect.appendChild(option);

    });

    const activeParent = currentId
        ? menus.find(item => item.id==currentId)?.parentId || ""
        : "";

    parentSelect.value=activeParent;

}


function openMenu(){

    document.getElementById("menuId").value="";
    document.getElementById("menuNama").value="";
    document.getElementById("menuUrl").value="";
    document.getElementById("menuPosisi").value=menus.length+1;
    document.getElementById("menuStatus").value="Aktif";
    populateMenuParentOptions("");

    openModal("modalMenu");

}


function saveMenu(e){

    e.preventDefault();

    const id=document.getElementById("menuId").value;
    const parentId=document.getElementById("menuParent").value || "";

    const data={
        id:id ? Number(id) : Date.now(),
        nama:document.getElementById("menuNama").value,
        url:document.getElementById("menuUrl").value,
        posisi:Number(document.getElementById("menuPosisi").value),
        parentId: parentId ? Number(parentId) : "",
        status:document.getElementById("menuStatus").value
    };

    if(id){

        menus=menus.map(item =>
            item.id==id ? data : item
        );

    }else{

        menus.push(data);

    }

    localStorage.setItem("menus",JSON.stringify(menus));

    closeModal("modalMenu");

    renderAll();

}


function editMenu(id){

    const item=menus.find(x=>x.id==id);

    document.getElementById("menuId").value=item.id;
    document.getElementById("menuNama").value=item.nama;
    document.getElementById("menuUrl").value=item.url;
    document.getElementById("menuPosisi").value=item.posisi;
    document.getElementById("menuStatus").value=item.status;
    populateMenuParentOptions(item.id);
    document.getElementById("menuParent").value=item.parentId || "";

    openModal("modalMenu");

}


function deleteMenu(id){

    if(confirm("Hapus menu ini?")){

        menus=menus.filter(x=>x.id!=id);

        localStorage.setItem(
            "menus",
            JSON.stringify(menus)
        );

        renderAll();

    }

}


/* RENDER SLIDER */

function renderHeroSlides(){

    const tbody=document.querySelector("#tabelSlider tbody");

    tbody.innerHTML="";

    heroSlides.forEach(item=>{

        tbody.innerHTML+=`

        <tr>

            <td>
                <strong>${item.judul}</strong>
            </td>

            <td>${item.label || "-"}</td>

            <td>
                <img src="${item.image}" class="book-cover">
            </td>

            <td>

                <div class="action">

                    <button
                        class="btn btn-warning"
                        onclick="editHeroSlide(${item.id})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteHeroSlide(${item.id})">
                        Hapus
                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}


/* RENDER PROGRAM */

function renderPrograms(){

    const tbody=document.querySelector("#tabelProgram tbody");

    tbody.innerHTML="";

    programs.forEach(item=>{

        tbody.innerHTML+=`

        <tr>

            <td>
                <strong>${item.judul}</strong>
            </td>

            <td>
                <img src="${item.image}" class="book-cover">
            </td>

            <td>${item.deskripsi}</td>

            <td>

                <div class="action">

                    <button
                        class="btn btn-warning"
                        onclick="editProgram(${item.id})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteProgram(${item.id})">
                        Hapus
                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}


/* RENDER BERITA */

function renderBerita(){

    const tbody=document.querySelector("#tabelBerita tbody");

    tbody.innerHTML="";

    berita.forEach(item=>{

        tbody.innerHTML+=`

        <tr>

            <td>
                <strong>${item.judul}</strong>
            </td>

            <td>${item.kategori}</td>

            <td>${item.tanggal}</td>

            <td>
                <span class="status ${item.status}">
                    ${item.status=="publish" ? "Dipublikasikan":"Draft"}
                </span>
            </td>

            <td>
                <span class="status ${item.slider ? 'publish' : 'draft'}">
                    ${item.slider ? '★ Masuk Slider' : '☆ Tidak Ada'}
                </span>
            </td>

            <td>

                <div class="action">

                    <button
                        class="btn"
                        style="min-width:42px; font-size:18px; ${item.slider ? 'background:#f2d66d;color:#4a3a00;' : ''}"
                        onclick="toggleBeritaSlider(${item.id})">
                        ${item.slider ? '★' : '☆'}
                    </button>

                    <button
                        class="btn btn-warning"
                        onclick="editBerita(${item.id})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteBerita(${item.id})">
                        Hapus
                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}


/* RENDER BUKU */

function renderBuku(){

    const tbody=document.querySelector("#tabelBuku tbody");

    tbody.innerHTML="";

    buku.forEach(item=>{

        tbody.innerHTML+=`

        <tr>

            <td>

                ${
                    item.cover
                    ?
                    `<img src="${item.cover}" class="book-cover">`
                    :
                    `<div class="book-cover"></div>`
                }

            </td>

            <td>
                <strong>${item.judul}</strong>
            </td>

            <td>${item.kategori}</td>

            <td>${item.tahun}</td>

            <td>
                <a
                    class="pdf-link"
                    href="${item.pdf}"
                    target="_blank">
                    📄 Lihat PDF
                </a>
            </td>

            <td>

                <div class="action">

                    <button
                        class="btn btn-warning"
                        onclick="editBuku(${item.id})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteBuku(${item.id})">
                        Hapus
                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}


/* RENDER INFOGRAFIS */

function renderInfografisAdmin(){

    const tbody=document.querySelector("#tabelInfografis tbody");

    tbody.innerHTML="";

    infografis.forEach(item=>{

        tbody.innerHTML+=`

        <tr>

            <td>
                <strong>${item.judul}</strong>
            </td>

            <td>
                <img src="${item.image}" class="book-cover">
            </td>

            <td>

                <div class="action">

                    <button
                        class="btn btn-warning"
                        onclick="editInfografisAdmin(${item.id})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteInfografisAdmin(${item.id})">
                        Hapus
                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}


/* RENDER VIDEO */

function renderVideoAdmin(){

    const tbody=document.querySelector("#tabelVideo tbody");

    tbody.innerHTML="";

    videos.forEach(item=>{

        tbody.innerHTML+=`

        <tr>

            <td>
                <strong>${item.judul}</strong>
            </td>

            <td>
                <img src="${item.image}" class="book-cover">
            </td>

            <td>

                <div class="action">

                    <button
                        class="btn btn-warning"
                        onclick="editVideoAdmin(${item.id})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteVideoAdmin(${item.id})">
                        Hapus
                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}


/* RENDER SCREENSHOT */

function renderScreenshotsAdmin(){

    const tbody=document.querySelector("#tabelScreenshot tbody");

    tbody.innerHTML="";

    screenshots.forEach(item=>{

        tbody.innerHTML+=`

        <tr>

            <td>
                <img src="${item.image}" class="book-cover">
            </td>

            <td>${item.name || item.nama || 'Screenshot ' + item.id}</td>

            <td>

                <div class="action">

                    <button
                        class="btn btn-warning"
                        onclick="editScreenshotAdmin(${item.id})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteScreenshotAdmin(${item.id})">
                        Hapus
                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}


/* RENDER MENU */

function renderMenu(){

    const tbody=document.querySelector("#tabelMenu tbody");

    tbody.innerHTML="";

    function getChildren(parentId){

        return menus
            .filter(item => String(item.parentId || "") === String(parentId))
            .sort((a,b)=>Number(a.posisi)-Number(b.posisi));

    }

    function renderRows(items, level = 0){

        return items.map((item, index) => {

            const children = getChildren(item.id);
            const prefix = level > 0 ? '↳ ' : '';
            const indent = level > 0 ? `style="padding-left:${level * 22}px"` : '';
            const parentIndex = index + 1;

            return `

                <tr>

                    <td>${level > 0 ? parentIndex : `<strong>${parentIndex}</strong>`}</td>

                    <td ${indent}>
                        <strong>${prefix}${item.nama}</strong>
                    </td>

                    <td>${item.url}</td>

                    <td>${item.posisi}</td>

                    <td>

                        <span class="status ${
                            item.status=="Aktif"
                            ?"publish"
                            :"draft"
                        }">

                            ${item.status}

                        </span>

                    </td>

                    <td>

                        <div class="action">

                            <button
                                class="btn btn-warning"
                                onclick="editMenu(${item.id})">
                                Edit
                            </button>

                            <button
                                class="btn btn-danger"
                                onclick="deleteMenu(${item.id})">
                                Hapus
                            </button>

                        </div>

                    </td>

                </tr>

                ${children.length ? renderRows(children, level + 1) : ''}

            `;

        }).join('');

    }

    const topLevelMenus = menus
        .filter(item => !item.parentId && item.parentId !== 0)
        .sort((a,b)=>Number(a.posisi)-Number(b.posisi));

    tbody.innerHTML = renderRows(topLevelMenus);

}


/* DASHBOARD */

function updateDashboard(){

    document.getElementById("totalBerita")
        .innerText=berita.length;

    document.getElementById("totalBuku")
        .innerText=buku.length;

    document.getElementById("totalMenu")
        .innerText=menus.length;

}


/* SEARCH */

function searchTable(input,id){

    const filter=input.value.toLowerCase();

    document
        .querySelectorAll("#"+id+" tbody tr")
        .forEach(row=>{

            row.style.display=
                row.innerText
                .toLowerCase()
                .includes(filter)
                ?
                ""
                :
                "none";

        });

}


/* SETTINGS */

function saveSettings(e){

    e.preventDefault();

    localStorage.setItem(
        "siteName",
        document.getElementById("siteName").value
    );

    localStorage.setItem(
        "siteDescription",
        document.getElementById("siteDescription").value
    );

    localStorage.setItem(
        "siteEmail",
        document.getElementById("siteEmail").value
    );

    alert("Pengaturan berhasil disimpan.");

}


/* RENDER SEMUA */

function renderAll(){

    renderHeroSlides();
    renderPrograms();
    renderBerita();
    renderBuku();
    renderInfografisAdmin();
    renderVideoAdmin();
    renderScreenshotsAdmin();
    renderMenu();
    updateDashboard();

}


/* START */

renderAll();

</script>

<script type="importmap">
    {
        "imports": {
            "ckeditor5": "./ckeditor5-48.5.0/ckeditor5/ckeditor5.js",
            "ckeditor5/": "./ckeditor5-48.5.0/ckeditor5/"
        }
    }
</script>

<script type="module">
    import {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Underline,
        Heading,
        Link,
        List,
        BlockQuote,
        Font,
        Alignment,
        Image,
        ImageUpload,
        ImageStyle,
        ImageToolbar,
        ImageResize,
        Base64UploadAdapter
    } from 'ckeditor5';

    const beritaTextarea = document.getElementById('beritaIsi');

    if (beritaTextarea) {
        ClassicEditor
            .create(beritaTextarea, {
                licenseKey: 'GPL',
                plugins: [
                    Essentials,
                    Paragraph,
                    Bold,
                    Italic,
                    Underline,
                    Heading,
                    Link,
                    List,
                    BlockQuote,
                    Font,
                    Alignment,
                    Image,
                    ImageUpload,
                    ImageStyle,
                    ImageToolbar,
                    ImageResize,
                    Base64UploadAdapter
                ],
                toolbar: [
                    'undo', 'redo', '|',
                    'heading', '|',
                    'bold', 'italic', 'underline', '|',
                    'alignment:left', 'alignment:center', 'alignment:right', '|',
                    'link', 'blockQuote', '|',
                    'bulletedList', 'numberedList', '|',
                    'imageUpload', '|',
                    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor'
                ],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                    ]
                }
            })
            .then(editor => {
                window.beritaEditor = editor;
                editor.setData(beritaTextarea.value || '');

                editor.model.document.on('change:data', () => {
                    beritaTextarea.value = editor.getData();
                });
            })
            .catch(error => {
                console.error('CKEditor gagal dimuat:', error);
            });
    }
</script>

</body>
</html>
