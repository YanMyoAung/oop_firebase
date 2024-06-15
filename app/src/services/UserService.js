import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, update , remove } from "firebase/database";
import { ref as storageRef, getStorage, uploadBytes, getDownloadURL , deleteObject} from "firebase/storage";
import { firebaseConfig } from "../../config/firebase_config.js";

export class UserService {
    #app = initializeApp(firebaseConfig);
    #db = getDatabase(this.#app);
    #storage = getStorage(this.#app);
    #name; #age; #gender; #country; #profile; #db_ref;

    constructor(name, age, gender, country, profile, db_ref) {
        this.#name = name;
        this.#age = age;
        this.#gender = gender;
        this.#country = country;
        this.#profile = profile;
        this.#db_ref = db_ref;
    }

    async createUser() {
        if (this.#profile.files.length !== 0) {
            const userStorageRef = storageRef(this.#storage, this.#db_ref + this.#profile.value);
            const image_name = this.#profile.value;
            uploadBytes(userStorageRef, this.#profile.files[0])
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        const data = {
                            name: this.#name,
                            age: this.#age,
                            gender: this.#gender,
                            country: this.#country,
                            url,
                            image_name
                        }
                        const refWithRandomID = push(ref(this.#db, this.#db_ref));
                        set(refWithRandomID, data);
                    })
                })
        }
    }

    getUsersRef() {
        const usersRef = ref(this.#db, this.#db_ref);
        return usersRef;
    }

    async getUser(id) {
        try {
            const userRef = ref(this.#db, this.#db_ref + id);
            const snapshot = await get(userRef);
            return snapshot.val();
        } catch (error) {
            console.error("Error getting user: ", error);
        }
    }

    async updateUser(id, data) {
        const update_ref = ref(this.#db, this.#db_ref + id);
        try {
            update(update_ref, data);
            console.log("success update user");
        } catch {
            console.error("Error updating user: ", error);
        }
    }

    async deleteUser(id, url) {
        let userRef = ref(this.#db, this.#db_ref + id);
        const userStorageRef = storageRef(this.#storage, 'users/' + url);
        try {
            await remove(userRef);
            await deleteObject(userStorageRef);
            console.log("success delete img");
        } catch (error) {
            console.error("Error deleting user or image: ", error);
        }
    }
}