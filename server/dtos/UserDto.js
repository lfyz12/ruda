module.exports = class UserDto {
    id;
    email;
    name;
    departmentId;
    role;
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.email = model.email
        this.departmentId = model.departmentId
        this.role = model.role
    }
}