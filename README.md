# express-test2

- Register
  -> user model(name,email,password)
  -> create register controller
  ->create post route as api/v1/users/register
  -> update req.body in controller as password => bcrypt.js
  -> send email to user about successful signup(optional)

-login
-> create login controller
-> create post route as api/v1/users/login
-> in controller, get req.body (email and password)
->check if user exists in the system or not
-> if user exist, get hashedPw from Database
-> compare user provided password with hashedPw
-> if result false, throw new Error("Email or Password mismatch")
-> else "User logged in Successfully"
