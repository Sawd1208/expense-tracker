const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得註冊者的表單參數
  const { name, email, password, confirmPassword } = req.body
  // 檢查註冊者是否有註冊過
  User.findOne({ email })
    .then((user) => {
      // 如果已經註冊過，返回註冊頁面
      if (user) {
        console.log('User already exist.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        // 沒有註冊過，就寫入資料庫註冊
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

module.exports = router