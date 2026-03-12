# خدماتي المنيا 🌿
### منصة الخدمات المحلية الشاملة لمحافظة المنيا

<div dir="rtl">

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-2D6A4F?style=flat-square)](manifest.json)
[![Mobile First](https://img.shields.io/badge/Mobile-First-F4A261?style=flat-square)](#)
[![RTL](https://img.shields.io/badge/RTL-Arabic-2D6A4F?style=flat-square)](#)
[![Version](https://img.shields.io/badge/version-3.0-gold?style=flat-square)](#)
[![Offline](https://img.shields.io/badge/Offline-Supported-40916C?style=flat-square)](#)

> **"كل حاجة في مكان واحد"** — +1400 مزود خدمة من 13 مركز في محافظة المنيا

---

## 📋 نظرة عامة

**خدماتي المنيا** تطبيق ويب تقدمي (PWA) يربط سكان محافظة المنيا بمزودي الخدمات المحلية في جميع القطاعات — من الصيانة والصحة إلى التعليم والزراعة. يعمل بدون إنترنت، خفيف جداً، ومصمم للموبايل 4G أولاً.

---

## ✨ الميزات الرئيسية

### 🗂️ الأقسام (12 قسم)
| القسم | العدد | الرابط |
|-------|-------|--------|
| 🔧 الصيانة | 152 مزود | `maintenance.html` |
| 🍽️ المطاعم | 89 مطعم | `food.html` |
| 🏥 الصحة | 74 طبيب | `health.html` |
| 🛵 التوصيل | 45 مزود | `delivery.html` |
| 📚 التعليم | 120 مدرس | `education.html` |
| 🏠 العقارات | 98 إعلان | `real-estate.html` |
| 🌾 الزراعة | 67 مزود | `agriculture.html` |
| 🛒 السوق | 203 بائع | `market.html` |
| 💼 الوظائف | 34 وظيفة | `jobs.html` |
| 🏛️ الحكومية | 12 مكتب | `government.html` |
| 🎉 الفعاليات | 8 فعاليات | `events.html` |
| 🚌 المواصلات | كل الخطوط | `transport.html` |

### 📱 مميزات التطبيق
- **PWA كاملة** — قابل للتثبيت على الهاتف كتطبيق أصلي
- **وضع أوفلاين** — Service Worker يخزن كل الصفحات
- **بحث صوتي** — بالعربية المصرية (SpeechRecognition API)
- **خريطة ذكية** — تفاعلية مع طبقات حية وباركود جغرافي
- **بورصة الأسعار** — أسعار الخضروات مباشرة لمحافظة المنيا
- **طلب عاجل** — مزود يصلك في 15 دقيقة
- **خدمات المجتمع** — كرتونة الخير، المفقودات، توظيف محلي، أقدم محل

---

## 🎨 التأثيرات البصرية والحركية (v3.0)

### CSS Effects (`css/effects.css`)
```
✅ تأثير Gradient متحرك على الهيرو (8 ثوان)
✅ كرات ضوئية عائمة (Orbs) في الخلفية
✅ Aurora — ألوان دوارة بـ conic-gradient
✅ Hero Stars Canvas — 55 نجمة وميضة متحركة
✅ Shimmer على البانرات والهياكل العظمية
✅ Ripple عند الضغط على أي بطاقة
✅ Neon Border لكل قسم بلونه الخاص
✅ Sonar Rings على الأزرار العائمة
✅ Bourse Ticker — شريط أسعار متحرك
✅ Scroll Progress Bar — شريط ذهبي أعلى الشاشة
✅ 3D Tilt Cards على بطاقات الأقسام
✅ Gradient Border للمزودين عند الهوفر
✅ Divider Wave — موجة ضوئية على الفواصل
✅ Marquee على بطاقة الخريطة
✅ Splash Screen — شاشة بداية ذهبية
✅ Dark Mode تلقائي وبـ class
```

### JS Effects (`js/effects.js`)
```
✅ Counter Animation — أرقام تعد من صفر بـ ease-out
✅ Scroll Reveal — ظهور عند التمرير بـ IntersectionObserver
✅ Auto Banner Slider — تلقائي كل 4 ثوان مع swipe
✅ Countdown Timers — عداد تنازلي حي للعروض
✅ Particle Sparks — جزيئات متطايرة عند الضغط
✅ Glow Trail — ذيل ضوئي عند اللمس (موبايل)
✅ Touch Wave Glow — توهج دائري عند اللمس
✅ Magnetic Buttons — أزرار تتبع الماوس
✅ Stagger Page Entrance — دخول متتالي للأقسام
✅ Urgent Timer Flash — وميض أحمر للعروض القريبة
✅ Logo Easter Egg — اضغط 5 مرات على الشعار 🎉
```

---

## 📁 هيكل المشروع

```
khedmaty/
│
├── 📄 index.html              ← الصفحة الرئيسية
├── 📄 manifest.json           ← إعدادات PWA
├── 📄 service-worker.js       ← كاش أوفلاين
│
├── 📂 css/
│   ├── style.css              ← التصميم الأساسي (Mobile-First, RTL)
│   └── effects.css            ← التأثيرات البصرية والحركية
│
├── 📂 js/
│   └── effects.js             ← التفاعلات والأنيميشن
│
├── 📂 icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-192.png
│   └── icon-512.png
│
├── 📄 vendors.json            ← بيانات المزودين الكاملة
├── 📄 vendors-lite.json       ← نسخة خفيفة للتحميل الأولي
├── 📄 vendors.page1.json      ← صفحة 1 للـ pagination
│
├── 🔧 maintenance.html        ← صيانة منزلية
├── 🍽️ food.html              ← مطاعم
├── 🏥 health.html             ← صحة
├── 🛵 delivery.html           ← توصيل
├── 📚 education.html          ← تعليم
├── 🏠 real-estate.html        ← عقارات
├── 🌾 agriculture.html        ← زراعة
├── 🛒 market.html             ← سوق
├── 💼 jobs.html               ← وظائف
├── 🏛️ government.html         ← خدمات حكومية
├── 🎉 events.html             ← فعاليات
├── 🚌 transport.html          ← مواصلات
│
├── 🗺️ map.html               ← الخريطة الذكية
├── 🔍 search.html             ← البحث
├── 🚨 emergency.html          ← طلب عاجل
├── 📊 bourse.html             ← بورصة الأسعار
├── 🎁 offers.html             ← العروض
│
├── 👤 profile.html            ← حسابي
├── ✏️ edit-profile.html       ← تعديل الملف الشخصي
├── 🔐 login.html              ← تسجيل الدخول
├── 🏪 vendor.html             ← صفحة مزود خدمة
├── 📝 vendor-register.html    ← تسجيل مزود جديد
├── 📋 vendors.html            ← قائمة المزودين
│
├── ❤️  favorites.html         ← المفضلة
├── 🔔 notifications.html      ← الإشعارات
├── ⭐ my-reviews.html         ← تقييماتي
├── 📦 order.html              ← الطلبات
├── ⚙️  settings.html          ← الإعدادات
│
├── ℹ️  about.html             ← عن التطبيق
├── 🗺️  sitemap.html           ← خريطة الموقع
├── 📜 terms.html              ← الشروط والأحكام
├── 🔒 privacy.html            ← الخصوصية
└── ❓ help.html               ← المساعدة
```

---

## 🚀 التشغيل السريع

```bash
# 1. نزّل الملفات
# 2. ارفعها على أي ويب سيرفر (Apache, Nginx, Firebase Hosting...)
# 3. تأكد أن service-worker.js في مجلد الجذر (/)

# تجربة محلية بسرعة:
npx serve .
# أو
python -m http.server 8080
```

> ⚠️ **ملاحظة:** Service Worker يحتاج HTTPS أو localhost للعمل الصحيح.

---

## 🎨 نظام الألوان

| المتغير | اللون | الاستخدام |
|---------|-------|-----------|
| `--green` | `#2D6A4F` | اللون الأساسي |
| `--green-dark` | `#1B4332` | الهيدر، خلفيات داكنة |
| `--green-mid` | `#40916C` | تدرجات |
| `--green-light` | `#74C69D` | عناصر ثانوية |
| `--green-pale` | `#D8F3DC` | خلفيات فاتحة |
| `--gold` | `#F4A261` | مميّز، شعار، أسعار |
| `--gold-dark` | `#E76F51` | طوارئ، أزرار تحذير |

---

## 📱 متطلبات الأداء

| المعيار | الهدف |
|---------|-------|
| First Paint | < 1.5 ثانية على 4G |
| Bundle Size | لا مكتبات خارجية ثقيلة |
| Images | Lazy Loading بـ IntersectionObserver |
| Data | JSON مقسّم (pagination) |
| Cache | Service Worker يخزن كل الصفحات |
| Fonts | Cairo + Tajawal (Google Fonts، preconnect) |

---

## ♿ إمكانية الوصول (Accessibility)

- ✅ جميع الأزرار لها `aria-label`
- ✅ الصور لها `alt`
- ✅ القوائم لها `role="list"` و`role="listitem"`
- ✅ البانرات لها `aria-selected` و`aria-live`
- ✅ الشريط السفلي لديه `aria-current="page"`
- ✅ البحث لديه `role="search"` و`aria-label`
- ✅ اتجاه RTL كامل (`dir="rtl"`, `lang="ar"`)

---

## 🔧 PWA — إعدادات مهمة

```json
// manifest.json
{
  "name": "خدماتي المنيا",
  "short_name": "خدماتي",
  "display": "standalone",
  "theme_color": "#2D6A4F",
  "lang": "ar",
  "dir": "rtl",
  "shortcuts": [
    "طلب عاجل → /emergency.html",
    "البحث     → /search.html",
    "الخريطة   → /map.html"
  ]
}
```

```javascript
// service-worker.js — تشغيل أوفلاين
// يُسجَّل تلقائياً في index.html
navigator.serviceWorker.register('/service-worker.js')
```

---

## 📊 إحصائيات المشروع

| البند | العدد |
|-------|-------|
| صفحات HTML | 39 صفحة |
| أقسام رئيسية | 12 قسم |
| مزودو خدمة | +1,400 |
| مراكز محافظة المنيا | 13 مركز |
| تأثيرات CSS | 30+ تأثير |
| وظائف JS | 20+ وظيفة |
| حجم الملفات (بدون صور) | ~205 KB |

---

## 🔄 سجل الإصدارات

### v3.0 — التأثيرات المتقدمة
- Hero Canvas Stars (نجوم متحركة بـ Canvas API)
- Aurora Effect (أورورا بـ conic-gradient)
- Splash Screen (شاشة بداية ذهبية)
- Scroll Progress Bar (شريط التقدم)
- 3D Tilt Cards (ميل ثلاثي الأبعاد)
- Magnetic Buttons (أزرار مغناطيسية)
- Bourse Live Ticker (شريط الأسعار المتحرك)
- Sonar Rings على الأزرار العائمة

### v2.0 — طبقة التأثيرات الأولى
- ملف `css/effects.css` منفصل
- ملف `js/effects.js` منفصل
- Ripple Effect، Scroll Reveal
- Counter Animation، Banner Slider
- Dark Mode، Logo Easter Egg

### v1.0 — الإطلاق الأول
- كامل هيكل التطبيق
- 12 قسم + 39 صفحة
- PWA + Service Worker
- RTL + Arabic SEO

---

## 📞 التواصل والدعم

| القناة | الرابط |
|--------|--------|
| واتساب | `https://wa.me/201000000000` |
| تسجيل مزود | `vendor-register.html` |
| طلب عاجل | `emergency.html` |

---

## 📄 الرخصة

هذا المشروع مطوَّر خصيصاً لمحافظة **المنيا، مصر** 🇪🇬  
جميع الحقوق محفوظة © 2025 خدماتي المنيا

---

<div align="center">

**صُنع بـ ❤️ لأهل المنيا**

`#2D6A4F` &nbsp;●&nbsp; `#F4A261`

</div>

</div>
