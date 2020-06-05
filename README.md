# Weather forcast
## Tree
```
├── dist: project đã được build, mở file auth để khởi chạy
│   └── index.html
│   └── auth.html
│   └── js
│        └── bundle.js: file production của trang index.html
│        └── bundle2.js file production của trang auth.html
├── src
│   └── index.html
│   └── auth.html
│   └── assets
│   └── helpers
│        └── index.js: chứa cái function global
│   └── js
│        └── modules
│             └── api.js: lưu data vào localStorage
│             └── auth.js: xác thực dữ liệu đầu vào
│             └── validator: validate dữ liệu
│        └── app.js: js file index.html
│        └── main.js: js file auth.html
│   └── scss
├── .babelrc
├── package.json
├── package-lock.json
├── README.md
└── webpack.config.js
```
## Build
```
npm run dev
npm run build: build production
npm run start: start port 8080
```