# 🏘️ Website UMKM Desa Kosongan

Portal UMKM (Usaha Mikro Kecil Menengah) Desa Kosongan - Website modern dan mobile-first untuk menampilkan 84 UMKM dari 8 dusun.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Mobile First](https://img.shields.io/badge/Mobile-First-green?style=flat)](#)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue?style=flat)](#)

## ✨ Features

### 🚀 Performance
- **Mobile-First Design** - Optimized untuk pengguna HP (prioritas utama)
- **Fast Loading** - Preloader 200ms di mobile, 500ms di desktop
- **Instant Navigation** - Tidak ada delay saat navigasi di mobile
- **Smart Animations** - Animasi kompleks hanya di desktop

### 📱 Mobile Optimization
- ✅ Particles disabled di mobile (hemat resource)
- ✅ Animasi dipercepat 40% di mobile
- ✅ Preloader auto-hide dalam 1 detik
- ✅ Simple card transitions (200ms)
- ✅ Responsive grid layout
- ✅ Touch-friendly buttons

### 🎨 Design
- Clean UMKM card tanpa gambar
- Category badges dengan icons
- Direct WhatsApp contact button
- Gradient effects & animations
- Glass morphism UI
- Dark theme

### 📊 Content
- **84 UMKM** dari 8 dusun
- Real data dengan kontak WhatsApp
- Informasi RT/RW lengkap
- Kategori usaha (Pembibitan, Pedagang, Kuliner, dll)

## 📂 Project Structure

```
webdesa/
├── assets/
│   └── logo-kragilan.png
├── css/
│   ├── animations.css      # Animasi & transisi
│   ├── components.css      # Komponen UI
│   ├── navigation.css      # Navbar & menu
│   ├── responsive.css      # Media queries
│   ├── sections.css        # Layout sections
│   └── variables.css       # CSS variables
├── js/
│   ├── animations.js       # Scroll reveal & animations
│   ├── dusun.js           # Dusun card interactions
│   ├── gallery.js         # Gallery lightbox
│   ├── navigation.js      # Navigation logic
│   ├── particles.js       # Background particles
│   └── utils.js           # Utilities & helpers
├── index.html             # Homepage
├── dusun-brajan.html      # Dusun pages (8 files)
├── dusun-dalangan.html
├── dusun-dokerso.html
├── dusun-kenangkan.html
├── dusun-kragilan.html
├── dusun-kwalikan.html
├── dusun-mranggen.html
├── dusun-pangkatan.html
├── script.js              # Main entry point
├── style.css              # CSS imports
├── vercel.json            # Vercel config
├── package.json           # Project metadata
├── CHANGELOG.md           # Version history
└── README.md              # This file
```

## 🏘️ Dusun & UMKM Count

| No | Dusun | UMKM | Categories |
|----|-------|------|------------|
| 1  | Brajan | 3 | Pedagang, Kelontong |
| 2  | Dalangan | 4 | Pedagang, Jasa, Pembibitan |
| 3  | Dokerso | 9 | Pedagang, Kelontong, Kerajinan |
| 4  | Kenangkan | 1 | Kuliner |
| 5  | Kragilan | 26 | Pembibitan, Warung, Jasa, Toko |
| 6  | Kwalikan | 23 | Pembibitan, Jasa, Bengkel |
| 7  | Mranggen | 12 | Pedagang, Kuliner, Bengkel |
| 8  | Pangkatan | 6 | Bengkel, Pembibitan, Pedagang |
| **TOTAL** | **8 Dusun** | **84 UMKM** | **8 Categories** |

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Font Awesome 6.5.1** - Icons
- **Google Fonts** - Plus Jakarta Sans, Playfair Display
- **Vercel** - Hosting & deployment
- **Git** - Version control

## 🚀 Deployment

### Automatic Deployment (Vercel)
Website ini ter-deploy otomatis ke Vercel saat ada push ke branch `main`:

1. Push ke GitHub
2. Vercel detect changes
3. Auto build & deploy
4. Live dalam 1-2 menit

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📖 Development

### Local Development
```bash
# Clone repository
git clone https://github.com/royan4321/webdesa.git
cd webdesa

# Open with local server (option 1)
npx http-server -p 3000 -o

# Or use npm script (option 2)
npm run dev

# Or just open index.html in browser (option 3)
```

### File Structure Rules
- **CSS** - Modular, satu file per concern
- **JS** - ES6 modules dengan export/import
- **HTML** - Semantic dan accessible
- **Images** - Optimized, dari Unsplash CDN

## 📝 Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

**Latest:** v3.0 - Mobile-First Optimization
- Redesigned UMKM cards without images
- Mobile performance improvements (60% faster)
- Code cleanup (~170KB removed)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - feel free to use this project for your village website!

## 👥 Credits

- **Development:** KKN Team
- **Design:** Modern minimalist approach
- **Icons:** Font Awesome
- **Images:** Unsplash (royalty-free)
- **Fonts:** Google Fonts

## 📞 Contact

- **GitHub:** [@royan4321](https://github.com/royan4321)
- **Repository:** [webdesa](https://github.com/royan4321/webdesa)

---

<div align="center">
Made with ❤️ for Desa Kosongan
</div>
