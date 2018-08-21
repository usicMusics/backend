// const axios = require("axios")
// const moment = require("moment")
// const multer = require('multer')
// const upload = multer({dest: './uploads/'})
// const fs = require('fs')
// const JSAlert = require("js-alert")
// // const localStorage = require('localStorage')

// // 로컬저장소 생성
// if (typeof localStorage === "undefined" || localStorage === null) {
//     const LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
// }

// // 기본 URL
// const baseURL = "http://localhost:3000/api/"

// module.exports = function (app) {
//     // 메인 페이지
//     app.get('/', function (req, res) {
//         res.render('index', {
//             title: '메인 페이지',
//             username: localStorage.getItem("username"),
//             token: localStorage.getItem("token")
//         })
//     })

//     // 로그인 폼
//     app.get('/page/login', function (req, res) {
//         // alert('Hello')
//         res.render('page/login', {
//             title: '로그인 페이지'
//         })
//     })

//     // 로그인 액션
//     app.post('/action/login', function (req, res) {
//         const { username, password } = req.body
//         axios.post(`${baseURL}/auth/login`, { username, password })
//             .then(function (response) {
//                 data = response.data
//                 // localStorage.token= data.token
//                 localStorage.setItem("token", data.token)
//                 localStorage.setItem("username", username)
//                 // console.log(localStorage.token)
//                 // console.log(data)
//             }).catch(function (error) {
//                 // alert('로그인 실패')
//                 // res.redirect('/')
//                 console.log(error)
//             }).then(function () {
//                 // res.render('index', {
//                 //     title: "메인 페이지",
//                 //     username: username
//                 // })
//                 res.redirect('/')
//             })
//     })

//     // 로그아웃
//     app.get('/action/logout', function(req, res) {
//         localStorage.removeItem("token")
//         res.redirect('/')
//     })

//     // 회원가입 폼
//     app.get('/page/register', function (req, res) {
//         res.render('page/register', {
//             title: '회원가입 페이지'
//         })
//     })

//     // 회원가입 액션
//     app.post('/action/register', function(req, res) {
//         const { username, password } = req.body
//         axios.post(`${baseURL}/auth/register`,{ username, password })
//         .then(function(response) {
//             console.log(response.data)
//         }).catch(function(error) {

//         }).then(function() { 
//             res.redirect('/')
//         })
//     })

//     /* 
//         게시판 관련
//     */

//     // 게시글 목록
//     app.get('/board', function (req, res) {
//         axios.get(`${baseURL}/board`).then(function (response) {
//             data = response.data
//         }).catch(function (error) {
//             console.log(error)
//         }).then(function () {
//             res.render('board', {
//                 title: "게시글 목록",
//                 boards: data.boards,
//                 moment: moment
//             })
//         })
//     })

//     // 특정 게시글 보기
//     app.get("/board/list/:id", function (req, res) {
//         axios.get(`${baseURL}/board/${req.params.id}`)
//             .then(function (response) {
//                 data = response.data.message;
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//             .then(function () {
//                 res.render("board/view", {
//                     title: "게시글 상세보기",
//                     board: data,
//                     moment: moment
//                 })
//             });
//     })

//     // 게시글 작성 폼
//     app.get("/board/writeForm", function (req, res) {
//         res.render("board/writeForm", {
//             title: "게시글 작성"
//         })
//     })

//     // 게시글 작성
//     app.post("/board",upload.array('UploadFile'), function (req, res) {
//         const upFile = req.files
//         isSaved(upFile)

//         const { title, content, writer } = req.body
//         axios.post(`${baseURL}/board`, { title, content, writer })
//             .then(function (response) {
//                 console.log(response)
//             })
//             .catch(function (error) {
//                 console.log(error)
//             })
//             .then(function () {
//                 res.redirect('/board');
//             })
//     })

//     // 게시글 수정 폼
//     app.get("/board/editForm/:id", function (req, res) {
//         res.render("board/editForm", {
//             title: "게시글 수정",
//             id: req.params.id
//         })
//     })

//     // 게시글 수정
//     app.post("/board/edit", function (req, res) {
//         const { id, title, content, writer } = req.body
//         axios.put(`${baseURL}/board/${id}`, { title, content, writer })
//             .then(function (response) {
//                 console.log(response)
//             })
//             .catch(function (error) {
//                 console.log(error)
//             })
//             .then(function () {
//                 res.redirect('/board');
//             })
//     })

//     // 게시글 삭제
//     app.get('/board/delete/:id', function(req, res) {
//         const id = req.params.id
//         console.log(id)
//         axios.delete(`${baseURL}/board/${id}`).then(function () {
//             res.redirect('/board')
//         })
//     })

//     // 댓글 작성
//     app.post('/board/:id/comment', function(req,res) {
//         const id = req.params.id
//         console.log(id)
//         const name = localStorage.getItem("username")
//         const comment = req.body.comment
//         axios.post(`${baseURL}/board/${id}/comment`, {name, comment})
//         .then(function(response) {
//             console.log(response)
//         })
//         .catch(function(error) {
//             console.log(error)
//         })
//         .then(function() {
//             res.redirect(`/board/list/${id}`)
//         })
//     })

//     app.get('/board/:id/comment/:c_id', function(req,res) {
//         const id = req.params.id
//         const c_id = req.params.c_id
//         axios.delete(`${baseURL}/board/${id}/comment/${c_id}`)
//         .then(function(response) {
//             console.log(response.data)
//         })
//         .catch(function(error) {
//             console.log(error)
//         })
//         .then(function() {
//             res.redirect(`/board/list/${id}`)
//         })
//     })

//     // 회원목록
//     app.get("/page/users", function(req,res) {
//         console.log(auth())
//         axios.get(`${baseURL}/user/list`, auth())
//         .then(function(response){
//             // console.log(response.data)
//             users = response.data.users
//         })
//         .catch(function(error) {
//             // console.log(error)
//             res.redirect('/')
//         })
//         .then(function () {
//             res.render('page/users', {
//                 title: '회원 목록',
//                 users: users
//             })
//         })
//     })

//     app.get('/a', function(req,res) {
//         axios.post(`${baseURL}/auth/check`, auth()).then(
//             function(response) {
//                 console.log(response.data)
//             }
//         )
//     })

//     app.post('/asdsa', function (req, res) {
//         const { username, password } = req.body
//         axios.post(`${baseURL}/auth/login`, { username, password })
//             .then(function (response) {
//                 const status = response.stauts
//                 const data = response.data

//                 console.log("상태코드"+status)
//                 console.log("데이터"+data)
//                 // data = response.data
//                 // localStorage.setItem("token", data.token)
//                 // localStorage.setItem("username", username)
//             }).catch(function (error) {
//                 // console.log("실패")
                
//                 console.log(""+error)
//                 // console.log("데이터"+error.data)
//                 // alert('로그인 실패')
//                 // res.redirect('/')
//                 // console.log(error)
//             }).then(function () {
//                 // res.render('index', {
//                 //     title: "메인 페이지",
//                 //     username: username
//                 // })
//                 // res.redirect('/')
//             })
//     })

//     // 토큰 인증
//     function auth() {
//         return {headers: {'x-access-token': localStorage.getItem("token")}}
//     }


//     // 파일 저장
//     function isSaved(upFile) {
//         // 파일 저장 여부 확인해서 제대로 저장되면 디비에 저장되는 방식
//         var savedFile = upFile;
//         var count = 0;
//         if(savedFile != null) { // 파일 존재시 -> tmp폴더에 파일 저장여부 확인 -> 있으면 저장, 없으면 에러메시지
//             for (var i = 0; i < savedFile.length; i++) {
//                 if(fs.statSync(getDirname(1) + savedFile[i].path).isFile()){ //fs 모듈을 사용해서 파일의 존재 여부를 확인한다.
//                     count ++; // true인 결과 갯수 세서
//                 };
//             }
//             if(count == savedFile.length){  //올린 파일 갯수랑 같으면 패스
//                 return true;
//             }else{ // 파일이 다를 경우 false를 리턴함.
//                 return false;
//             }
//         }else{ // 파일이 처음부터 없는 경우
//             return true;
//         }
//     }
//     function getDirname(num){
//         //원하는 상위폴더까지 리턴해줌. 0은 현재 위치까지, 1은 그 상위.. 이런 식으로
//         // 리네임과, 파일의 경로를 따오기 위해 필요함.
//         var order = num;
//         var dirname = __dirname.split('/');
//         var result = '';
//         for(var i=0;i<dirname.length-order;i++){
//             result += dirname[i] + '/';
//         }
//         return result;
//     }

//     function renameUploadFile(itemId,upFile){
//         // 업로드 할때 리네이밍 하는 곳!
//         var renameForUpload = {};
//         var newFile = upFile; // 새로 들어 온 파일
//         var tmpPath = [];
//         var tmpType = [];
//         var index = [];
//         var rename = [];
//         var fileName = [];
//         var fullName = []; // 다운로드 시 보여줄 이름 필요하니까 원래 이름까지 같이 저장하자!
//         var fsName = [];
//         for (var i = 0; i < newFile.length; i++) {
//             tmpPath[i] = newFile[i].path;
//             tmpType[i] = newFile[i].mimetype.split('/')[1]; // 확장자 저장해주려고!
//             index[i] = tmpPath[i].split('/').length;
//             rename[i] = tmpPath[i].split('/')[index[i] - 1];
//             fileName [i] = itemId + "_" + getFileDate(new Date()) + "_" + rename[i] + "." + tmpType[i]; // 파일 확장자 명까지 같이 가는 이름 "글아이디_날짜_파일명.확장자"
//             fullName [i] = fileName[i] + ":" + newFile[i].originalname.split('.')[0]; // 원래 이름까지 같이 가는 이름 "글아이디_날짜_파일명.확장자:보여줄 이름"
//             fsName [i] = getDirname(1)+"upload/"+fileName[i]; // fs.rename 용 이름 "./upload/글아이디_날짜_파일명.확장자"
//         }
//         renameForUpload.tmpname = tmpPath;
//         renameForUpload.filename = fileName;
//         renameForUpload.fullname = fullName;
//         renameForUpload.fsname = fsName;
//         return renameForUpload;
//     }

//     function getFileDate(date) {
//         var year = date.getFullYear();
//         var month = date.getMonth()+1;
//         var day = date.getDate();
//         var hour = date.getHours();
//         var min = date.getMinutes();
//         var sec = date.getSeconds();
//         var fullDate = year+""+month+""+day+""+hour+""+min+""+sec;
//         return fullDate
//     }
// }

// const path = require('path')

module.exports = function (app) {
  app.get('/test', function (req, res, next) {
    console.log(1)
    res.json({hello: "as"})
    console.log(1)
  })
}
// const scribble = require('scribbletune')

// const clip = scribble.clip({
//   notes: 'F#m C#m DM Bm EM AM DM C#m AM',
//   pattern: 'x_x_x_--'.repeat(8),
//   sizzle: true
// })

// scribble.midi(clip, './chords.mid')

