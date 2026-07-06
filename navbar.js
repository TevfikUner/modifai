/* ================================================
   MODIF-AI - ORTAK NAVBAR JS
   Tüm sayfalarda kullanılan navbar kontrol scripti
   ================================================ */

// Tema kontrolü (sayfa yüklenmeden önce çalışır)
(function() {
    if (localStorage.getItem("tema_gecici") === "acik") {
        document.body.classList.add("acik-tema");
    }
})();

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Navbar Scroll Efekti ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        });
    }

    // --- Hesap Dropdown ---
    const accountBtn = document.getElementById('hesap_btn');
    const accountDropdown = document.getElementById('hesap_dropdown');
    const overlay = document.getElementById('nav_overlay');

    if (accountBtn && accountDropdown) {
        accountBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = accountDropdown.classList.contains('show');
            closeAllDropdowns();
            if (!isOpen) {
                accountDropdown.classList.add('show');
                if (overlay) overlay.classList.add('show');
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            closeAllDropdowns();
        });
    }

    function closeAllDropdowns() {
        if (accountDropdown) accountDropdown.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
    }

    // Sayfa herhangi bir yerine tıklanınca kapat
    document.addEventListener('click', function(e) {
        if (accountDropdown && !accountDropdown.contains(e.target) && e.target !== accountBtn) {
            closeAllDropdowns();
        }
    });

    // --- Tema Değiştirme ---
    const temaBtn = document.getElementById('tema_degistir_btn');
    if (temaBtn) {
        temaBtn.addEventListener('click', function() {
            document.body.classList.toggle('acik-tema');
            if (document.body.classList.contains('acik-tema')) {
                localStorage.setItem('tema_gecici', 'acik');
            } else {
                localStorage.setItem('tema_gecici', 'koyu');
            }
            closeAllDropdowns();
        });
    }

    // --- Mobil Menü ---
    const mobileBtn = document.getElementById('mobil_menu_btn');
    const navLinks = document.getElementById('nav_links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
        });
    }

    // --- Mobil Dropdown Toggle ---
    document.querySelectorAll('.nav-dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const parentItem = this.closest('.nav-item');
                const wasOpen = parentItem.classList.contains('mobile-dropdown-open');
                
                // Diğer dropdown'ları kapat
                document.querySelectorAll('.nav-item.mobile-dropdown-open').forEach(function(item) {
                    item.classList.remove('mobile-dropdown-open');
                });

                if (!wasOpen) {
                    parentItem.classList.add('mobile-dropdown-open');
                }
            }
        });
    });

    // --- Aktif Sayfa İşaretleme ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item > a[href]').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Dropdown içindeki linklere de bak
    document.querySelectorAll('.nav-dropdown a[href]').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            const parentToggle = link.closest('.nav-item').querySelector('.nav-dropdown-toggle');
            if (parentToggle) parentToggle.classList.add('active');
        }
    });
});
