# Учебный проект: серверное приложение для управления списком книг.

### Стек
Express 5 · TypeScript 7 · EJS · Mongoose · MongoDB · Inversify · Multer · nodemon

## Требования
- **Node.js 22+** — компилятор TypeScript 7 не запускается на Node 18
- Docker — нужен только для запуска базы данных


## Быстрый старт
### Зависимости (первый запуск)
npm install

### MongoDB в Docker
docker compose up -d mongo

### Сборка и запуск
npm run build (Компилирует TS в dist/ и копирует шаблоны/статику)
npm start (Запускает уже собранную версию из dist/)

npm run dev (пересобирает и перезапускает при изменении файлов)
Приложение: http://localhost:3000

### MongoDB
docker compose up -d mongo     # запустить
docker compose stop mongo      # остановить
docker compose start mongo     # снова запустить


## Как данные проходят запрос
index.ts → middleware/logger → routes/ → container (Inversify) → books-repository → book (Mongoose) → views/*.ejs → ответ



## Структура
tsconfig.json           настройки компилятора (в корне)
dist/                   результат сборки (генерируется, в git не попадает)
project/server/
├── index.ts            точка входа: Express-приложение, страницы
├── db.ts               подключение к MongoDB
├── container.ts        IoC-контейнер Inversify
├── routes/books.ts     JSON API
├── models/
│   ├── book.ts                     схема и модель Mongoose
│   ├── book.interface.ts           тип книги
│   ├── books-repository.abstract.ts  абстрактный класс (чертёж)
│   └── books-repository.ts         реализация доступа к БД
├── middleware/
│   ├── logger.ts       логгер запросов в server.log
│   ├── err-404.ts      ответ 404
│   └── file.ts         загрузка файлов (multer)
├── views/*.ejs         шаблоны страниц
└── public/             загруженные PDF
