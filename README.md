# Fitness Management Coach (v1.0.0)

這是一個健身紀錄器 ( 後端部分 )

## Feature

- 會員登入 / 會員申請
- 新增個人健身紀錄
- 更新個人健身紀錄
- 刪除個人健身紀錄
- 瀏覽個人健身紀錄

## 測試帳號
```JSON
{
    "email" : "strong1@example.com",
    "password" : "strong1"
}    
```

## API管理
### 端點

| 方法   | 路徑                | 說明                      |
|--------|---------------------|---------------------------|
| POST   | /api/login          | 登入                      |
| POST   | /api/register       | 註冊                      |
| GET    | /api/record         | 瀏覽個人健身紀錄 (需要登入) |
| POST   | /api/record         | 新增個人健身紀錄 (需要登入) |
| PUT    | /api/record/:id     | 更新個人健身紀錄 (需要登入) |
| DELETE | /api/record/:id     | 刪除個人健身紀錄 (需要登入) |

### 請求與回應

#### POST /api/login
##### 請求
```JSON
{
    "email" : "strong1@example.com",
    "password" : "strong1"
}    
```
##### 回應
```JSON
{
    "token": "eyJhbGciO..."
}
```

#### POST /api/register
##### 請求
```JSON
{
    "name" : "strong1",
    "email" : "strong1@example.com",
    "password" : "strong1",
    "gender" : true,
    "height" : "160",
    "weight" : "100",
    "isAdmin" : "member"
}      
```
##### 回應
```JSON
{
    "message": "strong1 is created successfully."
}
```

#### GET /api/record
##### 請求
請求路由並帶著登入token即可
##### 回應
```JSON
{
    "message": "All records feteched successfully!",
    "allRecord": [
        {
            "_id": "6404cca43b327c429749084b",
            "trainingDate": "2023-03-05T17:08:52.811Z",
            "trainingItemId": "63f72f0a1b46a958938db54a",
            "userId": "6404c7110362d1ac353fe3e6",
            "reps": 100,
            "sets": 4,
            "restTime": 30,
            "weightTraining": 10,
            "__v": 0
        }, 
        // 依照該用戶的健身資料排下去
    ]
}
```

#### POST /api/record
##### 請求
```JSON
{
    "trainingItemId": "63f72f0a1b46a958938db54c",
    "reps": 100,
    "sets": 4,
    "restTime": 30,
    "weightTraining": 10
}    
```
##### 回應
```JSON
{
    "message": "Single training created successfully!",
    "singleTraining": {
        "trainingDate": "2023-03-05T17:15:19.984Z",
        "trainingItemId": {
            "_id": "63f72f0a1b46a958938db54c",
            "trainingName": "俯身側平舉",
            "trainingPart": "shoulder",
            "__v": 0
        },
        "userId": {
            "_id": "6404c7110362d1ac353fe3e6",
            "name": "strong1",
            "email": "strong1@example.com",
            "password": "$2b$10$oslhOu19vSFjmV9L4kHSDO/Evvd8qTzemXBqVDj7.2qxn.LPxTvQW",
            "gender": true,
            "height": 160,
            "weight": 100,
            "isAdmin": "member",
            "__v": 0
        },
        "reps": 100,
        "sets": 4,
        "restTime": 30,
        "weightTraining": 10,
        "_id": "6404ce273b327c429749086f",
        "__v": 0
    }
}
```

#### PUT /api/record/:id
##### 請求
```JSON
{
    "trainingItemId": "63f72f0a1b46a958938db556",
    "userId": "6404c7110362d1ac353fe3e6",
    "reps": 10,
    "sets": 40,
    "restTime": 20,
    "weightTraining": 20
}      
```
##### 回應
```JSON
{
    "message": "Record updated successfully!",
    "updatedRecord": {
        "_id": "6404ccf53b327c429749085b",
        "trainingDate": "2023-03-05T17:10:13.674Z",
        "trainingItemId": "63f72f0a1b46a958938db556",
        "userId": "6404c7110362d1ac353fe3e6",
        "reps": 10,
        "sets": 40,
        "restTime": 20,
        "weightTraining": 20,
        "__v": 0
    }
}
```

#### DELETE /api/record/:id
##### 請求
依照路由的:id做刪除
##### 回應
```JSON
{
    "message": "Record deleted successfully!"
}
```

## Quick Start (Local)

1. **Clone**
```
git clone https://github.com/fiveFloorMan/FITNESS-MANAGEMENT-COACH.git
```
2. **安裝套件**
```
npm install --save-dev @types/bcrypt@5.0.0 @types/express@4.17.17 @types/jsonwebtoken@9.0.1 @types/node@18.14.0 @types/passport@1.0.12 @types/passport-jwt@3.0.8 @types/passport-local@1.0.35 nodemon@2.0.20
```
```
npm install --save @types/mongodb@4.0.7 bcrypt@5.1.0 body-parser@1.20.2 dotenv@16.0.3 express@4.18.2 jsonwebtoken@9.0.0 mongodb@5.0.1 mongoose@6.9.2 passport@0.6.0 passport-jwt@4.0.1 passport-local@1.0.0 typescript@4.9.5
```
3. **設定.env**
```
MONGO_URI=請自行設定喔
JWT_SECRET=SECRET"# FITNESS-MANAGEMENT-COACH" 
```

## _id 和動作名稱

| _id                      | 動作名稱        |
|--------------------------|----------------|
| 63f72f0a1b46a958938db54c | 俯身側平舉      |
| 63f72f0a1b46a958938db54e | 三頭肌下壓      |
| 63f72f0a1b46a958938db550 | 俯身三頭肌伸展  |
| 63f72f0a1b46a958938db552 | 窄握臥推        |
| 63f72f0a1b46a958938db554 | 啞鈴三頭肌屈伸  |
| 63f72f091b46a958938db536 | 啞鈴飛鳥       |
| 63f72f091b46a958938db538 | 伏地挺身       |
| 63f72f091b46a958938db53a | 杠鈴卧推       |
| 63f72f091b46a958938db53c | 單手啞鈴卧推   |
| 63f72f091b46a958938db53e | 繃帶捲腹       |
| 63f72f091b46a958938db540 | 仰臥起坐       |
| 63f72f091b46a958938db542 | 懸垂腿上舉     |
| 63f72f091b46a958938db544 | 俄羅斯轉體     |
| 63f72f0a1b46a958938db546 | 坐姿啞鈴推舉   |
| 63f72f0a1b46a958938db548 | 立式平舉       |
| 63f72f0a1b46a958938db54a | 站立杠鈴推舉   |
| 63f72f0a1b46a958938db556 | 啞鈴彎舉       |
| 63f72f0a1b46a958938db558 | 引體向上       |
| 63f72f0a1b46a958938db55c | 錘式彎舉       |
| 63f72f0a1b46a958938db55e | 拉力器下拉     |
| 63f72f0a1b46a958938db560 | 引體向上       |
| 63f72f0a1b46a958938db562 | 杠鈴划船       |
| 63f72f0a1b46a958938db564 | 單手啞鈴划船   |
| 63f72f0a1b46a958938db566 | 腿部推蹬機     |
| 63f72f0a1b46a958938db56a | 杠鈴硬拉       |
| 63f72f0a1b46a958938db56c | 啞鈴弓步       |
| 63f72f0a1b46a958938db56e | 立式小腿推蹬   |
| 63f72f0b1b46a958938db570 | 原地踏步       |
| 63f72f0b1b46a958938db572 | 單腿弓步蹲起   |