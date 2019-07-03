


let request = new XMLHttpRequest();
console.log(request);
let url = `http://api.open-notify.org/astros.json`; // api for iss location



    request.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200) { //syntax for async with es5
       let response = JSON.parse(this.responseText);

         }

    }

    request.open("GET", url, true); //syntax runs sunced
    request.send();

    console.log(response.people[0].name);

//
promiseArray = [];



    let promise = new Promise(function(resolve,reject){ // promise creates a trade of information only when it is gotten (es6)

      let request = new XMLHttpRequest();

      let url = `http://api.open-notify.org/astros.json`;

      request.onload = function(){
        if(this.status === 200){
          resolve(request.response);

        }else {
          reject(Error(request.statusText));
        }

      }


      request.open("GET", url, true);
      request.send();



    });


    promise.then(function(request){
      console.log(promise);
      console.log(JSON.parse(request));
    })
