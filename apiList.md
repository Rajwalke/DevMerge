# List of all dev tinder apis in router

## AuthRouter
- POST/Signup
- POST/Login
- POST/Logout

## ProfileRouter
- GET/Profile/View 
- PATCH/Profile/edit (Update some information)
- PATCH/Profile/editPasssword

## ConnectionRequestRouter
- POST/request/send/interested/:userID
- POST/request/send/ignore/:userID
- POST/request/send/:status/:userID 

- POST/request/send/accept/:userID
- POST/request/send/reject/:userID
- POST/request/send/:status/:userID

## userRouter
- GET/user/connections
- GET/user/request
- GET/user/feed (get other user porfile on platform)