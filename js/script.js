document.addEventListener("DOMContentLoaded", () => {
  // Sertifika bağlantılarının düzgün açılmasını sağla
  document.querySelectorAll(".cert-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Bağlantının kendi sekmede açılmasını engelle
      const filePath = link.getAttribute("href"); // Dosya yolunu al
      if (filePath) {
        window.open(filePath, "_blank", "noopener,noreferrer");
        // Sadece yeni sekmede aç "_blank" yeni sekmede açmayı sağlar, "noopener" güvenlik açısından önemlidir, "noreferrer" ise referans bilgisini kaldırır
      }
    });
  });

  // Aktif sayfa bağlantısını belirleme
  let currentPage = window.location.pathname.split("/").pop(); // Mevcut sayfanın adını al
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      // Eğer bağlantı mevcut sayfaya işaret ediyorsa
      link.classList.add("active"); // Bağlantıya 'active' sınıfını ekle
    }
  });

  // Sayfa açılırken (fade-in) efekti
  document.body.style.opacity = 0; // Sayfa opaklığını 0 yap
  document.body.style.transition = "opacity 0.6s ease-in-out"; // Geçiş efektini ayarla
  setTimeout(() => {
    document.body.style.opacity = 1; // Opaklığı 1 yaparak fade-in efekti oluştur
  }, 150);

  // Sayfa değiştirilirken (fade-out) efekti (Sertifika linklerini hariç tut)
  document.querySelectorAll("a:not(.cert-link)").forEach((link) => {
    // ":not()" metodu ile belirli bir sınıfa sahip olmayan bağlantıları seç
    if (link.href.startsWith(window.location.origin)) {
      // startsWith() Fonksiyonu bir stringin belirli bir kelime veya karakter dizisiyle başlayıp başlamadığını kontrol eder.
      // Eğer bağlantı aynı kök URL ile başlıyorsa
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Varsayılan bağlantı davranışını engelle
        document.body.style.opacity = 0; // Sayfa opaklığını 0 yaparak fade-out efekti oluştur
        setTimeout(() => {
          window.location.href = link.href; // Yeni sayfaya yönlendir
        }, 600);
      });
    }
  });
});
