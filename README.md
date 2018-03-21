#JWT-EXPIRED

##Installation
    npm install jwt-expired --save

##Usage
~~~
const secret_key = 'cyTofmf+llaw2fGWxFyGGZSsYXiEmOBAvmQ92O1alZdNpPjS239VpsABI53CmvHkeIcK'
const jwtExpired = require('./custom_modules/jwt-expired')({
	encode_algo: 'HS512', //default => HS256
	secret_key,
})
const payload = {
	username: 'charliejuc',
	expSecs: 2,
}

let token = jwtExpired.encode(payload)

console.log(token)
//>>> eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImNoYXJsaWVqdWMiLCJleHBTZWNzIjo1LCJjcmVhdGVBdCI6MTUyMTY2NDQ3Mjc3OX0.OFxDZiQjmKuoDId26dmg4ApBoLTN3pYpuhmzEdKg3-E

console.log(jwtExpired.decode(token))
//>>> { username: 'charliejuc', expSecs: 5, createdAt: 1521664472779 }

console.log(jwtExpired.expired(token))
//>>> false

setTimeout(() => {
	//5 seconds after
	console.log(jwtExpired.expired(token))
	//>>> true
}, 2000)
~~~