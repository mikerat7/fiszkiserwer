
const port = 2137 

function POST(uri, data){
  return fetch("http://localhost:" + port + "/" + uri, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
}
function GET(uri){
    return fetch("http://localhost:" + port + "/" + uri, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
}

export async function signup_fetch(user, passwd, mail){
    let res = {
        Username: user,
        Email: mail,
        Password: passwd
    }

    console.log(res)

    const response = await POST("signup/", res)

    return response.status == 200
}

export function login_fetch(user, passwd){
  let res = {
      Username: user,
      Password: passwd
  }

  return POST("login/", res)
}

export async function logout_fetch(token){
  let res = {
      Token: token
  }
  
  const response = await POST("logout/", res)

  return response.status == 200
}

export async function changepfp_fetch(token, file){
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  let res = {
      Token: token,
      Data: await toBase64(file)
  }

  const response = await POST("changepfp/", res)

  return response.status == 200
}

export function userdata_fetch(UserID){
  return GET("users/" + UserID)
}

export function language_fetch(){
  return GET("language/")
}
