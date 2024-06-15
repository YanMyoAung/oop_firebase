export class UserComponent{
    static template_users(name, gender, age, country, id, img_url, img_name) {
        return `<tr>
        <td><img src=${img_url} class="profile_img"/> </td>
        <td>${name}</td>
        <td>${gender}</td>
        <td>${age}</td>
        <td>${country}</td>
        <td><button class="delete-btn" data-user-id="${id}" data-user-url="${img_name}">Delete</button></td>
        <td><button class="update-btn" data-user-id="${id}" >Update</button></td>
      </tr>`;
    }

    static template_users_th() {
        return `<tr>
        <th>Profile</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Country</th>
        <th>Delete</th>
        <th>Update</th>
      </tr>`;
    }
}