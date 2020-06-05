# Weather forcast
## Tree
```
├── dist: project đã được build, mở file auth để khởi chạy
│   └── index.html
│   └── js
│        └── bundle.js: file production của trang index.html
├── src
│   └── index.html
│   └── assets: chứa hình ảnh
│   └── js
│        └── configs: chứa thông tin config
│        └── mocks: dữ liệu mẫu
│        └── modules
│             └── app.js: khởi tạo chương trình
│             └── attribute.js: thuộc tính
│             └── treenode.js: nhánh cây
│             └── id3: thuật toán id3
│        └── index.js: file import modules
│   └── sass
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