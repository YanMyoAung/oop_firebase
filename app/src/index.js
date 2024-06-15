import { UserContainer } from "./container/UserContainer.js";

function pageLoad() {
    const user = new UserContainer();
    user.getUsers();
}

function createUser() {
    const name = document.getElementById('fname').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const country = document.getElementById('country').value;
    const profile = document.getElementById('profile');
    const user = new UserContainer(name, age, gender, country, profile);
    user.createUser()
        .then(() => {
            console.log('User created successfully');
        })
        .catch((error) => {
            console.error('Error creating user: ', error);
        });
}

function update_user() {
    const name = document.getElementById('upd_name').value;
    const age = document.getElementById('upd_age').value;
    const gender = document.getElementById('upd_gender').value;
    const country = document.getElementById('upd_country').value;
    const id = document.getElementById('upd_id').value;
    if (id) {
        console.log("reached" + id); 
        const user = new UserContainer(name,age, gender, country);
        user.update_user(id);
    }
    document.getElementById("myModal").style.display = "none";
}
document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById("myModal").style.display = "none";
};

window.addEventListener('load', pageLoad);

document.getElementById('saveUser').addEventListener('click', createUser);
document.getElementById('updateUser').addEventListener("click", update_user);
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
};


