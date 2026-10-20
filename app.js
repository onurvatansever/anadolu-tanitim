/**
 * Anadolu Üniversitesi İnteraktif Öğrenci Rehberi - Uygulama Mantığı (app.js)
 * Teknolojiler: Saf (Vanilla) ES6+ JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global veri kontrolü
  const campusData = window.CAMPUS_DATA;
  if (!campusData) {
    console.error("CAMPUS_DATA bulunamadı! Lütfen data.js dosyasının app.js'den önce yüklendiğinden emin olun.");
    return;
  }

  // Uygulama Durumu (State)
  const state = {
    selectedCategory: "all",
    selectedCampus: "all",
    searchQuery: ""
  };

  // Kategori etiket ve ikon eşleştirmeleri
  const CATEGORY_META = {
    calisma: { label: "📚 Çalışma Alanı", className: "cat-calisma" },
    yemek: { label: "🍲 Yemek", className: "cat-yemek" },
    sosyal: { label: "☕ Sosyal", className: "cat-sosyal" },
    ulasim: { label: "🚊 Ulaşım / Giriş", className: "cat-ulasim" }
  };

  // Ulaşım türü ikon ve etiket eşleştirmeleri
  const TRANSPORT_META = {
    tramvay: { icon: "🚊", label: "Tramvay (Estram)" },
    otobus: { icon: "🚌", label: "Otobüs / Ring" },
    yurume: { icon: "🚶", label: "Yürüyüş Rotası" }
  };

  /* ========================================================================
     YARDIMCI FONKSİYONLAR
     ======================================================================== */

  /**
   * Türkçe karakter duyarlı küçük harfe çevirme (Case-insensitive arama için)
   */
  function normalizeText(text = "") {
    return String(text).toLocaleLowerCase("tr-TR").trim();
  }

  /**
   * XSS güvenliği için metin kaçış (escape) fonksiyonu
   */
  function escapeHTML(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ========================================================================
     1. MEKAN KARTLARI LİSTELEME & FİLTRELEME
     ======================================================================== */

  const placesGridEl = document.getElementById("places-grid");
  const placesCountEl = document.getElementById("places-count");
  const categoryBtns = document.querySelectorAll("#category-filters .filter-btn");
  const campusBtns = document.querySelectorAll("#campus-filters .campus-btn");
  const searchInputEl = document.getElementById("search-input");

  /**
   * State'teki aktif kategori, kampüs ve arama metnine göre mekanları filtreler
   */
  function getFilteredPlaces() {
    const places = Array.isArray(campusData.places) ? campusData.places : [];
    const query = normalizeText(state.searchQuery);

    return places.filter((place) => {
      // 1. Kategori filtresi
      const matchesCategory =
        state.selectedCategory === "all" || place.category === state.selectedCategory;

      // 2. Kampüs filtresi
      const matchesCampus =
        state.selectedCampus === "all" || place.campus === state.selectedCampus;

      // 3. Arama kutusu filtresi (Başlık, açıklama, tüyo, konum ve etiketlerde arar)
      let matchesSearch = true;
      if (query.length > 0) {
        const searchableFields = [
          place.name,
          place.description,
          place.tips,
          place.location,
          place.campus,
          ...(Array.isArray(place.tags) ? place.tags : [])
        ]
          .map(normalizeText)
          .join(" ");

        matchesSearch = searchableFields.includes(query);
      }

      return matchesCategory && matchesCampus && matchesSearch;
    });
  }

  /**
   * Filtrelenen mekanları 'places-grid' içerisine HTML kartı olarak basar
   */
  function renderPlaces() {
    if (!placesGridEl) return;

    const filtered = getFilteredPlaces();

    // Sayaç güncelleme
    if (placesCountEl) {
      placesCountEl.textContent = filtered.length;
    }

    // Sonuç yoksa boş durum (Empty State) göster
    if (filtered.length === 0) {
      placesGridEl.innerHTML = `
        <div class="empty-state">
          <p style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</p>
          <h3 style="color: var(--text-main); margin-bottom: 0.35rem;">Aradığın kriterlere uygun mekan bulunamadı</h3>
          <p style="margin-bottom: 1rem;">Farklı bir anahtar kelime deneyebilir veya filtreleri sıfırlayabilirsin.</p>
          <button type="button" id="reset-filters-btn" class="btn btn-secondary">
            Filtreleri Sıfırla
          </button>
        </div>
      `;

      const resetBtn = document.getElementById("reset-filters-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", resetAllFilters);
      }
      return;
    }

    // Kartları oluştur
    placesGridEl.innerHTML = filtered
      .map((place) => {
        const catInfo = CATEGORY_META[place.category] || {
          label: place.category,
          className: "cat-sosyal"
        };

        const tagsHTML = Array.isArray(place.tags)
          ? place.tags
              .map((tag) => `<span class="tag-chip">#${escapeHTML(tag)}</span>`)
              .join("")
          : "";

        return `
          <article class="place-card" data-id="${escapeHTML(place.id)}">
            <div>
              <div class="place-card-top">
                <span class="category-badge ${catInfo.className}">
                  ${catInfo.label}
                </span>
                <span class="campus-badge">📍 ${escapeHTML(place.campus)}</span>
              </div>

              <h3 class="place-title">${escapeHTML(place.name)}</h3>

              <div class="place-location">
                <span aria-hidden="true">🧭</span>
                <span>${escapeHTML(place.location)}</span>
              </div>

              <p class="place-desc">${escapeHTML(place.description)}</p>

              <blockquote class="place-tip">
                <strong>💡 Öğrenci Tüyosu</strong>
                ${escapeHTML(place.tips)}
              </blockquote>
            </div>

            <div class="place-tags" aria-label="Mekan Etiketleri">
              ${tagsHTML}
            </div>
          </article>
        `;
      })
      .join("");
  }

  /**
   * Tüm filtreleri ve arama çubuğunu varsayılan haline döndürür
   */
  function resetAllFilters() {
    state.selectedCategory = "all";
    state.selectedCampus = "all";
    state.searchQuery = "";

    if (searchInputEl) searchInputEl.value = "";

    categoryBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.category === "all");
    });

    campusBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.campus === "all");
    });

    renderPlaces();
  }

  /**
   * Kategori, kampüs ve arama olay dinleyicilerini (Event Listeners) bağlar
   */
  function initPlaceFilters() {
    // Kategori butonları
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.selectedCategory = btn.dataset.category || "all";
        renderPlaces();
      });
    });

    // Kampüs butonları
    campusBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        campusBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.selectedCampus = btn.dataset.campus || "all";
        renderPlaces();
      });
    });

    // Anlık arama kutusu
    if (searchInputEl) {
      searchInputEl.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        renderPlaces();

        // Kullanıcı üst barda arama yaparken mekanlar bölümüne yumuşak odaklanma
        const kesfetSection = document.getElementById("kesfet");
        if (state.searchQuery.trim().length === 1 && kesfetSection) {
          const rect = kesfetSection.getBoundingClientRect();
          if (rect.top > window.innerHeight || rect.bottom < 0) {
            kesfetSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    }
  }

  /* ========================================================================
     2. ULAŞIM REHBERİ & S.S.S. AKORDİYON RENDER
     ======================================================================== */

  /**
   * Ulaşım hatlarını 'transport-list' içerisine basar
   */
  function renderTransport() {
    const transportListEl = document.getElementById("transport-list");
    if (!transportListEl || !Array.isArray(campusData.transport)) return;

    transportListEl.innerHTML = campusData.transport
      .map((item) => {
        const meta = TRANSPORT_META[item.type] || {
          icon: "🚏",
          label: item.type
        };

        return `
          <article class="transport-card">
            <div class="transport-header">
              <span class="transport-type-badge">
                ${meta.icon} ${escapeHTML(meta.label)}
              </span>
              <span class="transport-duration">⏱️ ${escapeHTML(item.duration)}</span>
            </div>

            <h3 class="transport-title">${escapeHTML(item.title)}</h3>

            <div class="transport-route">
              <span><strong>Başlangıç:</strong> ${escapeHTML(item.from)}</span>
              <span><strong>Varış:</strong> ${escapeHTML(item.to)}</span>
            </div>

            <p class="transport-note">
              <strong>📌 Not:</strong> ${escapeHTML(item.note)}
            </p>
          </article>
        `;
      })
      .join("");
  }

  /**
   * S.S.S. verilerini akordiyon olarak basar ve tek-açılır toggle mantığını kurar
   */
  function renderFAQ() {
    const faqContainer = document.getElementById("faq-accordion");
    if (!faqContainer || !Array.isArray(campusData.faq)) return;

    faqContainer.innerHTML = campusData.faq
      .map((item, index) => {
        const isFirst = index === 0;
        return `
          <div class="faq-item ${isFirst ? "active" : ""}">
            <button
              type="button"
              class="faq-question"
              aria-expanded="${isFirst ? "true" : "false"}"
            >
              <span>${escapeHTML(item.q)}</span>
              <span class="faq-icon" aria-hidden="true">▼</span>
            </button>
            <div class="faq-answer">
              <p>${escapeHTML(item.a)}</p>
            </div>
          </div>
        `;
      })
      .join("");

    // Tıklanan soruyu açıp diğerlerini kapatan akordiyon mantığı
    const faqItems = faqContainer.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector(".faq-question");
      if (!questionBtn) return;

      questionBtn.addEventListener("click", () => {
        const isCurrentlyOpen = item.classList.contains("active");

        // Önce tüm akordiyonları kapat
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
          const btn = otherItem.querySelector(".faq-question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });

        // Tıklanan kapalıysa aç
        if (!isCurrentlyOpen) {
          item.classList.add("active");
          questionBtn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ========================================================================
     3. AYLIK KAMPÜS BÜTÇESİ HESAPLAYICI
     ======================================================================== */

  function initBudgetCalculator() {
    const mealsInput = document.getElementById("meals-per-day");
    const ridesInput = document.getElementById("rides-per-day");
    const daysInput = document.getElementById("days-per-month");

    const mealsValEl = document.getElementById("meals-val");
    const ridesValEl = document.getElementById("rides-val");
    const daysValEl = document.getElementById("days-val");

    const unitMealPriceEl = document.getElementById("unit-meal-price");
    const unitTramPriceEl = document.getElementById("unit-tram-price");

    const mealCostOutput = document.getElementById("meal-cost-output");
    const transportCostOutput = document.getElementById("transport-cost-output");
    const totalCostOutput = document.getElementById("total-cost-output");
    const dailyAverageOutput = document.getElementById("daily-average-output");

    if (!mealsInput || !ridesInput || !daysInput) return;

    // data.js içerisindeki sabit fiyatlar
    const mealPrice = Number(campusData.budgetEstimator?.mealPriceStudent ?? 20);
    const tramFare = Number(campusData.budgetEstimator?.tramFareStudent ?? 10);

    if (unitMealPriceEl) unitMealPriceEl.textContent = mealPrice;
    if (unitTramPriceEl) unitTramPriceEl.textContent = tramFare;

    function calculateBudget() {
      const mealsPerDay = Number(mealsInput.value) || 0;
      const ridesPerDay = Number(ridesInput.value) || 0;
      const daysPerMonth = Number(daysInput.value) || 0;

      // Seçili değer rozetlerini güncelle
      if (mealsValEl) mealsValEl.textContent = mealsPerDay;
      if (ridesValEl) ridesValEl.textContent = ridesPerDay;
      if (daysValEl) daysValEl.textContent = daysPerMonth;

      // Hesaplama Formülleri:
      // Yemek Maliyeti = Yemekhane Fiyatı * Günlük Öğün * Kampüs Günü
      // Ulaşım Maliyeti = Bilet Fiyatı * Günlük Basım * Kampüs Günü
      // Toplam = Yemek + Ulaşım
      const mealCost = mealPrice * mealsPerDay * daysPerMonth;
      const transportCost = tramFare * ridesPerDay * daysPerMonth;
      const totalCost = mealCost + transportCost;
      const dailyCost = daysPerMonth > 0 ? Math.round(totalCost / daysPerMonth) : 0;

      // Sonuçları TR para formatında DOM'a yaz
      if (mealCostOutput) {
        mealCostOutput.textContent = mealCost.toLocaleString("tr-TR");
      }
      if (transportCostOutput) {
        transportCostOutput.textContent = transportCost.toLocaleString("tr-TR");
      }
      if (totalCostOutput) {
        totalCostOutput.textContent = totalCost.toLocaleString("tr-TR");
      }
      if (dailyAverageOutput) {
        dailyAverageOutput.textContent = `Günlük ortalama: ${dailyCost.toLocaleString("tr-TR")} TL`;
      }
    }

    // Inputlar değiştikçe anlık hesapla
    [mealsInput, ridesInput, daysInput].forEach((slider) => {
      slider.addEventListener("input", calculateBudget);
    });

    // İlk yüklemede çalıştır
    calculateBudget();
  }

  /* ========================================================================
     4. KOYU / AÇIK TEMA & MOBİL MENÜ YÖNETİMİ
     ======================================================================== */

  function initThemeAndNavigation() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIconEl = document.getElementById("theme-icon");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mainNav = document.getElementById("main-nav");

    // Kayıtlı temayı veya sistem tercihini kontrol et
    const savedTheme = localStorage.getItem("anadolu_rehber_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (themeIconEl) themeIconEl.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("anadolu_rehber_theme", nextTheme);

        if (themeIconEl) {
          themeIconEl.textContent = nextTheme === "dark" ? "☀️" : "🌙";
        }
      });
    }

    // Mobil menü aç/kapat
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
      });

      // Menü linkine tıklanınca mobilde menüyü kapat
      mainNav.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          mainNav.classList.remove("open");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ========================================================================
     BAŞLATMA (INITIALIZATION)
     ======================================================================== */
  renderPlaces();
  initPlaceFilters();
  renderTransport();
  renderFAQ();
  initBudgetCalculator();
  initThemeAndNavigation();
});
