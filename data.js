/**
 * Anadolu Üniversitesi İnteraktif Öğrenci Rehberi - Veri Tabanı (data.js)
 * Global Veri Objesi: window.CAMPUS_DATA
 */

window.CAMPUS_DATA = {
  // 1. Mekanlar (En az 8 gerçek kampüs mekanı ve öğrenci tüyoları)
  places: [
    {
      id: 1,
      name: "Merkez Kütüphane",
      category: "calisma",
      campus: "Yunus Emre",
      location: "Yunus Emre Kampüsü Merkez, Rektörlük ve Öğrenci Merkezi Yanı",
      description:
        "Yüz binlerce basılı kaynak, zengin elektronik veri tabanları, bireysel çalışma masaları, grup çalışma odaları ve 7/24 açık çalışma salonuyla kampüsün akademik kalbi.",
      tips: "Priz azdır, özellikle vize ve final haftalarında sabah 08:30'dan önce gelmezsen prizli masa bulmak zorlaşır. Gece çalışanlar için 23:00 civarı dağıtılan ücretsiz sıcak çorbayı kaçırma!",
      tags: ["7/24 Açık", "Sessiz Alan", "Ücretsiz Çorba", "Eduroam", "Prizli Masa"]
    },
    {
      id: 2,
      name: "Öğrenci Yemekhanesi",
      category: "yemek",
      campus: "Yunus Emre",
      location: "Merkez Kütüphane Arkası, Öğrenci Merkezi (ÖM) Bitişiği",
      description:
        "Dört çeşit doyurucu tabldot menüsü, vegan/vejetaryen ve çölyak alternatifleriyle öğrencilerin en ekonomik ve sağlıklı beslenme noktası.",
      tips: "Öğlen 12:00 - 12:45 arası sıra bina dışına kadar uzar; 11:30'da veya 13:15 sonrasında gidersen beklemeden yersin. Öğlen çorba ve tatlı hızlı biter, turnikeye gelmeden kart bakiyeni kontrol et!",
      tags: ["Ekonomik", "4 Çeşit Menü", "Vegan Seçenek", "Kampüs Kart", "Öğle & Akşam"]
    },
    {
      id: 3,
      name: "Anadolu Park Kafe",
      category: "sosyal",
      campus: "Yunus Emre",
      location: "Eğitim Fakültesi ve Kongre Merkezi Arası Yeşil Alan",
      description:
        "Ağaçların altında geniş açık oturma alanı, uygun fiyatlı kahve/çay çeşitleri ve tost-sandviç alternatifleriyle ders aralarının en popüler buluşma mekanı.",
      tips: "Bahar aylarında öğle saatlerinde dışarıdaki masalar tamamen dolar. Grupça oturacaksanız ders bitiminden 10 dakika önce bir arkadaşınızı masa tutmaya gönderin.",
      tags: ["Açık Hava", "Kahve & Çay", "Sosyal Ortam", "Atıştırmalık", "Merkezi Konum"]
    },
    {
      id: 4,
      name: "İki Eylül Spor Kompleksi",
      category: "sosyal",
      campus: "İki Eylül",
      location: "İki Eylül Kampüsü, Spor Bilimleri Fakültesi Yanı",
      description:
        "Kapalı spor salonları, fitness merkezi, koşu pisti, tenis kortları ve açık sahalarıyla hem antrenman hem de kampüs turnuvalarının düzenlendiği modern tesis.",
      tips: "Fitness ve salon kullanımları için dönem başında öğrenci kontenjan kayıtlarını kaçırma. Yanında mutlaka temiz tabanlı salon ayakkabısı ve öğrenci kimliğini bulundur.",
      tags: ["Fitness", "Basketbol & Voleybol", "Tenis Kortu", "Koşu Pisti", "Turnuvalar"]
    },
    {
      id: 5,
      name: "Kongre Merkezi Çim Alanı",
      category: "sosyal",
      campus: "Yunus Emre",
      location: "Atatürk Kültür ve Sanat Merkezi (AKSM) & Kongre Merkezi Önü",
      description:
        "Eskişehir güneşini görünce öğrencilerin termosunu, kamp sandalyesini ve gitarını alıp yayıldığı, bahar şenlikleri ve kulüp etkinlikleriyle canlanan geniş çim alan.",
      tips: "Nisan-Haziran arası kampüsün en keyifli yeridir ancak akşamüstü saatlerinde Eskişehir ayazı bir anda başlayabilir; çantanda mutlaka ince bir hırka veya sweatshirt olsun.",
      tags: ["Çim Alan", "Müzik & Sohbet", "Kamp Sandalyesi", "Bahar Havası", "Etkinlik Alanı"]
    },
    {
      id: 6,
      name: "Tramvay Kampüs Durağı",
      category: "ulasim",
      campus: "Yunus Emre",
      location: "Yunus Emre Kampüsü Ana Giriş Kapısı (Üniversite Evleri Karşısı)",
      description:
        "SSK-Otogar ve OGÜ-SSK tramvay hatlarının geçtiği, şehir merkezi, Espark, Gar ve Otogar'a doğrudan raylı sistem bağlantısı sağlayan ana ulaşım noktası.",
      tips: "Sabah 08:30-09:15 ve akşam 16:30-18:00 saatlerinde turnikeler çok kalabalık olur. Eskart bakiyeni durağa gelmeden önce mobil uygulamadan yükle, dolum cihazında sıra bekleme.",
      tags: ["Estram", "Eskart", "Merkezi Ulaşım", "Aktarma Noktası", "Ana Kapı"]
    },
    {
      id: 7,
      name: "Eczacılık Çardakları",
      category: "sosyal",
      campus: "Yunus Emre",
      location: "Eczacılık Fakültesi Yanı, Bağlar (Cuma Kapısı) Çıkışı Yolu Üzeri",
      description:
        "Çam ağaçlarının gölgesinde yer alan ahşap çardaklar; hem ders notu tekrarı yapmak hem de Bağlar'a çıkmadan önce arkadaşlarla buluşup çay içmek için ideal.",
      tips: "Bağlar (Cuma) kapısına çok yakın olduğu için buluşma noktası olarak harikadır. Sınav haftalarında grupça sesli ders çalışmak isteyenlerin favori açık hava mekanıdır.",
      tags: ["Çardak", "Grup Çalışması", "Bağlar Çıkışı", "Gölgelik", "Buluşma Noktası"]
    },
    {
      id: 8,
      name: "Açıköğretim Binası Önü",
      category: "ulasim",
      campus: "Yunus Emre",
      location: "Açıköğretim Fakültesi Merkez Binası Önü, Çevre Yolu Tarafı",
      description:
        "Kampüs içi ringlerin, İki Eylül Kampüsü otobüslerinin ve şehir içi bağlantı hatlarının kesiştiği, aynı zamanda öğrencilerin hızlı buluşma noktası olan merkezi durak alanı.",
      tips: "İki Eylül Kampüsü'ne giden otobüsler ve ring seferleri ders başlangıç saatlerinden 15-20 dakika önce buradan yoğun geçer; soğuk havalarda bina girişindeki rüzgarlıktan faydalanabilirsin.",
      tags: ["Otobüs & Ring", "İki Eylül Hattı", "Ana Kavşak", "Buluşma Noktası", "Hızlı Geçiş"]
    },
    {
      id: 9,
      name: "İki Eylül Kütüphane ve Çalışma Salonu",
      category: "calisma",
      campus: "İki Eylül",
      location: "İki Eylül Kampüsü, Havacılık ve Spor Bilimleri Yerleşkesi İçi",
      description:
        "İki Eylül Kampüsü'nde eğitim gören öğrenciler için sessiz çalışma masaları, bilgisayar terminalleri ve temel akademik kaynaklar sunan ferah çalışma alanı.",
      tips: "Yunus Emre Merkez Kütüphanesi'ne göre çok daha sakindir. Özellikle proje teslim ve vize dönemlerinde sessiz, priz sorunu olmayan bir yer arıyorsan birebirdir.",
      tags: ["Sakin Ortam", "Prizli Masa", "Eduroam", "Bireysel Çalışma", "İki Eylül"]
    },
    {
      id: 10,
      name: "İki Eylül Öğrenci Yemekhanesi",
      category: "yemek",
      campus: "İki Eylül",
      location: "İki Eylül Kampüsü Sosyal Tesisler Binası",
      description:
        "İki Eylül yerleşkesindeki öğrencilere öğle saatlerinde sıcak, ekonomik 4 çeşit tabldot yemek hizmeti sunan modern yemekhane.",
      tips: "Uygulamalı ders ve antrenman çıkışlarında yoğunluk oluşur; turnike geçişi için ders biter bitmez gitmek sıra beklemeni önler.",
      tags: ["Ekonomik", "Tabldot Menü", "Kampüs Kart", "Sıcak Yemek", "Sosyal Tesis"]
    }
  ],

  // 2. Ulaşım Rehberi (4 temel hat ve rota)
  transport: [
    {
      title: "SSK - Otogar / OGÜ - SSK Tramvay Hattı",
      from: "Şehir Merkezi (Çarşı / Espark / Gar)",
      to: "Yunus Emre Kampüsü (Kampüs & Eczacılık Durakları)",
      type: "tramvay",
      duration: "15 - 22 dk",
      note: "SSK-Otogar ve OGÜ-SSK hatları sabah 08:00-09:30 arası çok yoğun olur. Fakülten Eczacılık, İletişim veya Eğitim tarafındaysa Eczacılık durağında; Hukuk, İİBF veya Mühendislik tarafındaysa Kampüs durağında inmek zaman kazandırır."
    },
    {
      title: "Yunus Emre - İki Eylül Kampüsler Arası Otobüs Hattı",
      from: "Yunus Emre Kampüsü (Açıköğretim Önü / Eczacılık)",
      to: "İki Eylül Kampüsü (Muttalip Yolu Yerleşkesi)",
      type: "otobus",
      duration: "20 - 30 dk",
      note: "Mavi 4 ve Kırmızı 4 numaralı belediye otobüsleri ile kampüs ring saatlerini mutlaka önceden kontrol et. Sabah ilk ders saatlerinde otobüsler tam kapasite dolduğu için bir önceki durağı tercih etmek avantaj sağlar."
    },
    {
      title: "Bağlar (Üniversite Caddesi) - Cuma Kapısı Yürüyüş Rotası",
      from: "Espark AVM / Bağlar Caddesi",
      to: "Yunus Emre Kampüsü (Cuma Kapısı & Eczacılık Girişi)",
      type: "yurume",
      duration: "10 - 15 dk",
      note: "Öğrencilerin en çok kullandığı yaya rotasıdır. Tramvay beklemek yerine Üniversite Caddesi boyunca kafe ve kırtasiyelerin arasından yürüyerek kampüse ulaşmak çoğu zaman daha hızlı ve keyiflidir."
    },
    {
      title: "Kampüs İçi Yürüyüş Aksı (Cuma Kapısı - Kütüphane - AKSM)",
      from: "Cuma Kapısı (Bağlar Girişi)",
      to: "Merkez Kütüphane, Yemekhane ve Fakülteler Bölgesi",
      type: "yurume",
      duration: "8 - 12 dk",
      note: "Yunus Emre Kampüsü geniş ve ağaçlık bir yürüyüş kampüsüdür. Kış aylarında sabah saatlerinde kaldırımlarda buzlanma olabileceği için kaymaz tabanlı bot giymen önerilir."
    }
  ],

  // 3. Hayat Kurtaran Bilgiler (5 temel SSS maddesi)
  faq: [
    {
      q: "Eduroam Wi-Fi bağlantısı nasıl yapılır?",
      a: "Kampüs genelinde ücretsiz ve yüksek hızlı internet sunan 'eduroam' ağına bağlanırken kullanıcı adı kısmına öğrenci e-posta adresini tam olarak (örn: ogrencino@anadolu.edu.tr), şifre kısmına ise Anadolu Üniversitesi portal (Anasis) şifreni girmelisin. Android cihazlarda EAP yöntemi 'PEAP' veya 'TTLS', Faz 2 kimlik doğrulaması 'MSCHAPV2' ya da 'PAP' seçilmeli ve CA sertifikası 'Doğrulama / Sistem Sertifikalarını Kullan' olarak ayarlanmalıdır."
    },
    {
      q: "Yemekhane bakiye yükleme ve rezervasyon sistemi nasıl çalışır?",
      a: "Öğrenci yemekhanesinden faydalanmak için Kampüs Kartına (Öğrenci Kimlik Kartı) anlaşmalı banka ATM'lerinden, mobil bankacılık/online yükleme ekranından veya yemekhane girişindeki kiosk cihazlarından bakiye yükleyebilirsin. Günlük harcama doğrudan turnikede kart okutularak yapılır; haftalık yemek listesini ve besin/kalori değerlerini Anadolu Mobil uygulamasından takip edebilirsin."
    },
    {
      q: "Merkez Kütüphane geceleme kuralları ve çorba dağıtımı saat kaçta?",
      a: "Merkez Kütüphane'nin 7/24 çalışma salonu yıl boyunca, tüm katları ise vize ve final dönemlerinde 24 saat boyunca öğrencilere açıktır. Gece 23:00 - 00:00 saatleri arasında kütüphane giriş alanında ders çalışan öğrencilere üniversite tarafından ücretsiz sıcak çorba, ekmek ve çay/kahve ikramı yapılır. Giriş-çıkışlarda öğrenci kimlik kartını yanından ayırmamalısın."
    },
    {
      q: "Vize ve final dönemlerinde alternatif çalışma salonları nerelerdir?",
      a: "Sınav haftalarında Merkez Kütüphane tamamen dolduğunda; Öğrenci Merkezi (ÖM) içindeki çalışma alanlarını, Hukuk ve İİBF fakültelerinin okuma salonlarını, Yunus Emre Kampüsü'ndeki açık çalışma alanlarını veya çok daha sakin olan İki Eylül Kampüsü Kütüphane ve Çalışma Salonu'nu tercih edebilirsin."
    },
    {
      q: "Kampüs Kart (Öğrenci Kimliği) ve indirimli Eskart nasıl çıkarılır?",
      a: "Kayıt sonrasında Anadolu Üniversitesi Öğrenci Kimlik Kartın (Kampüs Kart) fakülte öğrenci işleri veya kart dağıtım merkezlerinden teslim edilir; bu kart kampüs kapılarında, kütüphanede ve yemekhanede geçerlidir. Şehir içi tramvay ve otobüslerde indirimli ulaşım sağlayan Öğrenci Eskart için ise öğrenci belgen ve vesikalık fotoğrafınla Estram başvuru merkezlerine müracaat edebilir, her akademik yıl başında vizeleme işlemini yapabilirsin."
    }
  ],

  // 4. Bütçe Hesaplayıcı Sabitleri (Varsayılan öğrenci tarifeleri - TL)
  budgetEstimator: {
    mealPriceStudent: 20,
    tramFareStudent: 10
  }
};
