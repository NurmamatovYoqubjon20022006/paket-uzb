# Contributing to Paket UZB

Paket UZB loyihasiga hissa qo'shganingiz uchun rahmat! Bu qo'llanma sizga loyihaga qanday qilib to'g'ri hissa qo'shishni ko'rsatadi.

## Kod Standartlari

### JavaScript/React
- ES6+ sintaksisidan foydalaning
- Functional components va React Hooks ishlatish
- PropTypes yoki TypeScript ishlatish (tavsiya etiladi)
- Semantic variable va function nomlar

### CSS/Tailwind
- Tailwind CSS utility classes ishlatish
- Custom CSS faqat zarurat bo'lgandagina
- Responsive design prinsiplari

### Node.js/Express
- Async/await ishlatish (Promise.then o'rniga)
- Proper error handling
- RESTful API patterns

## Git Workflow

### Branch Naming
- `feature/description` - yangi funksiyalar uchun
- `bugfix/description` - xatolarni tuzatish uchun
- `hotfix/description` - kritik tuzatishlar uchun

### Commit Messages
```
type(scope): description

[optional body]

[optional footer]
```

Turlar:
- `feat`: yangi funksiya
- `fix`: xato tuzatish
- `docs`: hujjatlar o'zgarishi
- `style`: kod formatlash
- `refactor`: kod qayta ishlash
- `test`: test qo'shish/o'zgartirish
- `chore`: build yoki auxiliary tool o'zgarishlari

Misollar:
```
feat(cart): add quantity update functionality
fix(api): handle connection timeout errors
docs(readme): update installation instructions
```

## Pull Request Process

1. Fork qiling repository'ni
2. Feature branch yarating (`git checkout -b feature/amazing-feature`)
3. O'zgarishlaringizni commit qiling (`git commit -m 'feat: add amazing feature'`)
4. Branch'ni push qiling (`git push origin feature/amazing-feature`)
5. Pull Request oching

### PR Requirements
- [ ] Kod review qilingan
- [ ] Testlar yozilgan va o'tadi
- [ ] Documentation yangilangan
- [ ] CHANGELOG.md yangilangan

## Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

### Integration Testing
```bash
npm run test:integration
```

## Local Development

### Prerequisites
- Node.js 16+
- MongoDB
- Git

### Setup
```bash
# Repository'ni clone qiling
git clone https://github.com/NurmamatovYoqubjon20022006/paket-uzb.git
cd paket-uzb

# Dependencies o'rnating
npm install

# Environment variables sozlang
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Development server ishga tushiring
npm run dev
```

## Issue Reporting

Bug hisobotini yuborishda quyidagilarni kiriting:

### Bug Reports
- [ ] Bug tavsifi
- [ ] Qayta hosil qilish qadamlari
- [ ] Kutilgan natija
- [ ] Haqiqiy natija
- [ ] Screenshots (agar kerak bo'lsa)
- [ ] Environment ma'lumotlari

### Feature Requests
- [ ] Funksiya tavsifi
- [ ] Nima uchun kerak
- [ ] Qanday ishlashi kerak
- [ ] Alternativ yechimlar

## Code Review Process

1. Kamida bitta team member review qilishi kerak
2. Barcha testlar o'tishi kerak
3. CI/CD checks muvaffaqiyatli bo'lishi kerak
4. Documentation yangilangan bo'lishi kerak

## Community Guidelines

- Hurmatli va professional bo'ling
- Konstruktiv feedback bering
- Yangi contributorlarni qo'llab-quvvatlang
- Code of Conduct'ga rioya qiling

## License

Hissa qo'shish orqali siz o'z kodingizni loyiha litsenziyasi ostida taqdim etishga rozi bo'lasiz.

## Getting Help

Savollaringiz bo'lsa:

- GitHub Issues orqali savol bering
- Email: contribute@paket-uzb.com
- Telegram: @paket_uzb_dev

Hissa qo'shganingiz uchun rahmat! 🚀
