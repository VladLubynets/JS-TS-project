# Automation ComplexApp

Тестовий фреймворк для веб-додатку ComplexApp — соціальної мережі для публікації постів.

**URL:** https://aqa-complexapp.onrender.com

## Що тестується

- Логін/реєстрація користувачів
- CRUD операції через API (користувачі, пости)
- E2E сценарії (UI + API)

## Технології

- **Playwright Test** — UI та API тестування
- **TypeScript** — мова програмування
- **ESLint + Prettier** — якість коду
- **Allure** — звіти
- **GitHub Actions** — CI/CD

## Як запустити

```bash
# Встановити залежності
npm install

# Встановити браузери
npx playwright install

# Запустити тести
npm test
```

## Корисні команди

```bash
npm run test:headed     # з видимим браузером
npm run test:ui         # інтерактивний режим
npm run test:debug      # дебаг

npm run test:login      # тільки UI тести
npm run test:api        # тільки API тести
npm run test:e2e        # тільки E2E

npm run report          # HTML звіт
npm run allure:serve    # Allure звіт

npm run lint            # перевірка коду
npm run format          # форматування
```

## Структура

```
src/
├── api/                 # API хелпер та ендпоінти
├── pages/               # Page Object класи
├── test-data/           # тестові дані
└── tests/
    ├── fixtures/        # фікстури Playwright
    ├── login/           # UI тести (5 файлів)
    ├── api/             # API тести (8 файлів)
    └── e2e/             # E2E сценарії (2 файли)
```

## Конфігурація

За замовчуванням використовуються тестові credentials:
- Login: `QaTsAutomation`
- Password: `QaTsAutomation123`

Можна змінити через змінні оточення:
```bash
VALID_LOGIN=myuser VALID_PASSWORD=mypass npm test
```

## CI/CD

Тести автоматично запускаються при push в main/master/develop та при pull request.
