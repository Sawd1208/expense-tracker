# 我的記帳本
![1](https://raw.githubusercontent.com/Sawd1208/expense-tracker/main/public/image/1.png)
![2](https://raw.githubusercontent.com/Sawd1208/expense-tracker/main/public/image/2.png)
![3](https://raw.githubusercontent.com/Sawd1208/expense-tracker/main/public/image/3.png)



## 介紹
這是一個可以註冊登入擁有自己支出明細的記帳本，你可以瀏覽、新增、編輯、分類每一筆支出。

## 特點
- 可以註冊、登入帳號
- 使用臉書帳號登入
- 查看每一筆支出
- 查詢各項分類
- 可以新增、修改和刪除支出
- 清楚標明總金額

## 使用
1. 先確認是否有安裝 npm和 Node.js
2. 將專案clone 到 local server
3. local server開啟後，透過終端機入進資料夾，輸入：
```
npm install
```
4. 新增.env檔案，並請根據.env.example檔案內資訊設置環境變數
5. 製作種子資料：
```
npm run seed
```
6. 啟動伺服器，執行 app.js 檔案：
```
npm run start
or
npm run dev
```
7. 看見這行訊息代表可以順利運行，打開瀏覽器輸入以下網址：
```
Express is listening on http://localhost:3000
```
## 使用
試用帳號Ａ
帳號: user1@example.com
密碼: 123
試用帳號Ｂ
帳號: user2@example.com
密碼: 123

## 開發工具
- node.js 18.15.0
- express 4.18.2
- express-handlebars 7.0.7
- express-session 1.17.1
- bootstrap 5.3.0
- font-awesome 5.8.1
- body-parser 1.20.2
- dotenv 16.0.3
- mongoose 7.1.0
- method-override 3.0.0
- bcryptjs 2.4.3
- connect-flash 0.1.1
- passport 0.4.1,
- passport-facebook 3.0.0
- passport-local 1.0.0
- moment 2.29.4