let di = document.querySelector(".local");
let local = document.querySelector(".local");
let names = document.getElementById("name");
let emails = document.getElementById("email");
let phones = document.getElementById("phone");
document
  .querySelector("form.formdata")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let x = document.querySelector("form.formdata").elements;
    let user_obj = {
      name: x["name"].value,
      email: x["email"].value,
      phone: x["phone"].value,
    };
    if (!names.title) {
      axios
        .post("http://localhost:3000/booking", user_obj)
        .then((data) => {
          let div = document.createElement("div");
          div.className = "d-flex justify-content-between gap-2";
          let p = document.createElement("p");
          div.setAttribute("id", data.data._id);
          p.appendChild(
            document.createTextNode(
              data.data.name + " " + data.data.email + " " + data.data.phone
            )
          );
          let btn = document.createElement("button");
          btn.className = "del_button";
          btn.appendChild(document.createTextNode("Delete"));
          let btn1 = document.createElement("button");
          btn1.className = "edit_btn";
          btn1.appendChild(document.createTextNode("Edit"));
          div.appendChild(p);
          div.appendChild(btn);
          div.appendChild(btn1);
          di.appendChild(div);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put("http://localhost:3000/" + names.title, user_obj)
        .then((data) => {
          let div = document.createElement("div");
          div.className = "d-flex justify-content-between gap-2";
          let p = document.createElement("p");
          div.setAttribute("id", data.data._id);
          p.appendChild(
            document.createTextNode(
              data.data.name + " " + data.data.email + " " + data.data.phone
            )
          );
          let btn = document.createElement("button");
          btn.className = "del_button";
          btn.appendChild(document.createTextNode("Delete"));
          let btn1 = document.createElement("button");
          btn1.className = "edit_btn";
          btn1.appendChild(document.createTextNode("Edit"));
          div.appendChild(p);
          div.appendChild(btn);
          div.appendChild(btn1);
          di.appendChild(div);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  });
//Fetch all data on window loaded
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000")
    .then((res) => {
      let data = res.data.appointments;
      for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        div.className = "d-flex justify-content-between gap-2";
        let p = document.createElement("p");
        div.setAttribute("id", data[i].id);
        p.appendChild(
          document.createTextNode(
            data[i].name + " " + data[i].email + " " + data[i].phone
          )
        );
        let btn = document.createElement("button");
        btn.className = "del_button";
        btn.appendChild(document.createTextNode("Delete"));
        let btn1 = document.createElement("button");
        btn1.className = "edit_btn";
        btn1.appendChild(document.createTextNode("Edit"));
        div.appendChild(p);
        div.appendChild(btn);
        div.appendChild(btn1);
        di.appendChild(div);
      }
    })
    .catch((err) => console.log(err));
});

// let keys = Object.keys(localStorage);
// i = keys.length;
// while (i--) {
//   let div = document.createElement("div");
//   div.className = "d-flex justify-content-between gap-2";
//   let p = document.createElement("p");
//   div.setAttribute("id", JSON.parse(localStorage.getItem(keys[i])).email);
//   console.log(user)
//   p.appendChild(
//     document.createTextNode(
//       user.data.name +
//         " " +
//         JSON.parse(localStorage.getItem(keys[i])).email +
//         " " +
//         JSON.parse(localStorage.getItem(keys[i])).phone
//     )
//   );
//   let btn = document.createElement("button");
//   btn.className = "del_button";
//   btn.appendChild(document.createTextNode("Delete"));
//   let btn1 = document.createElement("button");
//   btn1.className = "edit_btn";
//   btn1.appendChild(document.createTextNode("Edit"));
//   div.appendChild(p);
//   div.appendChild(btn);
//   div.appendChild(btn1);
//   di.appendChild(div);
// }
//delete data server
let local_data = document.querySelector(".local");
local_data.addEventListener("click", delete_data);
function delete_data(e) {
  if (e.target.classList.contains("del_button")) {
    axios
      .delete("http://localhost:3000/" + e.target.parentElement.id)
      .then((res) => {
        console.log("res", res);
        console.log(e.target.parentElement);
        di.removeChild(e.target.parentElement);
      })
      .catch((err) => console.log(err));
  }
}
//edit local storage data

local.addEventListener("click", edit_data);
function edit_data(e) {
  if (e.target.classList.contains("edit_btn")) {
    let edit = e.target.parentElement.id;
    axios.get("http://localhost:3000/" + edit).then((res) => {
      let data = res.data.appointment;
      names.value = data.name;
      names.title = data.id;
      emails.value = data.email;
      phones.value = data.phone;
    });
  }
  // names.value = JSON.parse(localStorage.getItem(edit)).name;
  // emails.value = JSON.parse(localStorage.getItem(edit)).email;
  // phones.value = JSON.parse(localStorage.getItem(edit)).phone;
  // localStorage.removeItem(edit);
  // di.removeChild(e.target.parentElement);
}
