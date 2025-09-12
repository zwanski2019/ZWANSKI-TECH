# Zwanski Tech - Professional IT Services & Digital Platform

A modern, responsive website showcasing IT services, educational content, and digital tools. No authentication required - all content is publicly accessible.

## Features

- 🌐 Multilingual support (English, Arabic, Hausa, Berber, French)  
- 🎓 Free educational resources and tech academy content
- 💼 Public job board and freelancer directory
- 🛠️ IT services showcase: web development, device repair, cybersecurity
- 📱 Free tools: IMEI checker, 3D computer models  
- 🖥️ Interactive 3D computer model (React Three Fiber)
- 🌙 Dark & light mode, responsive design
- 🔒 Cloudflare Turnstile security for contact forms

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Supabase (Database, Edge Functions)
- **3D Graphics:** Three.js, React Three Fiber  
- **Security:** Cloudflare Turnstile verification
- **Build:** Vite, React Query, Lucide Icons

## Getting Started

```bash
git clone https://github.com/zwanski2019/ZWANSKI-TECH.git
cd ZWANSKI-TECH
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Environment Variables

Required for Cloudflare Turnstile security verification:

```bash
# Create .env.local file (never commit to git)
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Supabase (for backend functionality)
VITE_SUPABASE_URL=your_supabase_url  
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Security Note**: Turnstile keys are also configured via Supabase secrets for edge functions.

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run audit:routes # Validate all routes and links
npm run type-check   # TypeScript validation
npm run lint         # ESLint check
```

## 🔐 Security Features

✅ **Row Level Security (RLS)** - All tables have proper RLS policies  
✅ **Authentication** - Supabase Auth with email verification  
✅ **Enhanced Input Validation** - Client and server-side validation with XSS protection
✅ **Search Output Sanitization** - Search results are sanitized with DOMPurify to prevent XSS
✅ **Rate Limiting** - Contact forms and API endpoints protected from abuse
✅ **Secure CAPTCHA** - Turnstile verification through secure edge functions  
✅ **Enhanced Admin System** - Multi-layer admin validation with audit logging  
✅ **Security Event Logging** - Comprehensive security monitoring and alerts  
✅ **Password Protection** - Leaked password detection enabled  
✅ **Safe Secret Management** - No secrets exposed in frontend code

## 🔐 Authentication Test

You can verify Supabase sign-in and sign-out using the helper script:

```bash
TEST_EMAIL=your@email \
TEST_PASSWORD=yourpassword \
node scripts/test-login.js
```

The script attempts to sign in with the provided credentials and then signs out, reporting any errors.

---

## 📚 Main Sections

- **Academy:** Free programming courses, interactive tutorials, certificates
- **Services:** Web/mobile development, IT support, consulting
- **Marketplace:** Post jobs, hire freelancers, find projects
- **Community:** Forums, chat, Telegram, support
- **Tools:** IMEI checker, 3D computer model, developer utilities

---

## 📝 Contribution Guidelines

We welcome pull requests! To contribute:

1. Fork this repository and create a new branch for your changes.
2. If your update relates to the recent migration from **Turnstile** to **hCaptcha**, mention this in your commit messages.
3. Run `npm run lint` and ensure the project builds successfully with `npm run build`.
4. Open a pull request describing your improvements.

---

## 🤝 Contributing & Support

- **Contact:** [support@zwanski.org](mailto:support@zwanski.org)
- **Telegram:** [Join our channel](https://t.me/zwanski_tech)
- **Support:** [Support page](https://zwanski.org/support)
- **License:** MIT

---

## 📬 Contact & Links

- 🌍 Website: [zwanski.org](https://zwanski.org)
- 🔗 [GitHub](https://github.com/zwanski2019)
- 📷 [Instagram](https://www.instagram.com/mohamed_zwanski)
- 🎥 [TikTok](https://www.tiktok.com/@zwanski.m)
- 🌍 [Linktree](https://linktr.ee/zwanski)

---

> Empowering the next generation of tech innovators and entrepreneurs. Join us today!
