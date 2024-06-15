import { UserService } from "../services/UserService.js";
import { UserComponent } from "../component/UserComponent.js";
import { Helper } from "../../helper/helper.js";
import { onValue } from "firebase/database";

export class UserContainer {
    #db_ref; #user;
    #name; #age; #gender; #country; #profile;
    constructor(name, age, gender, country, profile) {
        this.#name = name;
        this.#age = age;
        this.#gender = gender;
        this.#country = country;
        this.#profile = profile;
        this.#db_ref = "users/";
        this.#user = new UserService(this.#name, this.#age, this.#gender, this.#country, this.#profile, this.#db_ref);
    }

    async createUser() {
        try {
            await this.#user.createUser();
            document.getElementById('fname').value = '';
            document.getElementById('age').value = '';
            document.getElementById('profile').value = '';
        } catch (error) {
            console.error("Error creating user: ", error);
        }
    }

    async update_user_bind(id) {
        const data = await this.#user.getUser(id);
        document.getElementById('upd_name').value = data.name;
        document.getElementById('upd_age').value = data.age;
        document.getElementById('upd_gender').value = data.gender;
        document.getElementById('upd_country').value = data.country;
        document.getElementById('upd_id').value = id;
        document.getElementById("myModal").style.display = "block";
    }

    async update_user(id) {
        const data = { 
            name : this.#name,
            age : this.#age,
            gender : this.#gender,
            country : this.#country,
        };
        await this.#user.updateUser(id, data);
    }

    async getUsers(){
        const usersRef = this.#user.getUsersRef();
        onValue(usersRef, (snapshot) => {
            const users = snapshot.val();
            if (users) {
                const userList = Helper.object_to_array_data(users);
                this.#loadUsersTable(userList);
            } else {
                document.getElementById('customers').innerHTML = "";
                console.log('No users found.');
            }
        });
    }

    #loadUsersTable(userList) {
        let table = document.getElementById('customers');
        table.innerHTML = "";
        table.innerHTML = UserComponent.template_users_th();;
        if (userList !== null) {
            for (const data of userList) {
                table.innerHTML += UserComponent.template_users(data.name, data.gender, data.age, data.country, data.id, data.url, data.image_name); // pass the user id
            }
            this.#attachEventListeners(); // attach event listeners after creating all delete buttons
        }
    }

    #deleteUser(id, url) {
        this.#user.deleteUser(id, url);
    }

    #attachEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const userId = button.dataset.userId;
                const image_url = button.dataset.userUrl;
                this.#deleteUser(userId, image_url);
            });
        });

        const updateButtons = document.querySelectorAll('.update-btn');
        updateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const userId = button.dataset.userId; // retrieve user id from data attribute
                this.update_user_bind(userId);
            });
        });
    }
}