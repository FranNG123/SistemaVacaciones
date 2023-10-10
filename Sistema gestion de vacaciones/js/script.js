const $d = document;
const $tableUsers = $d.getElementById("users-table");
const $formUsers = $d.getElementById("users-form");
const $tableEmployees = $d.getElementById("employees-table");
const $formEmployees = $d.getElementById("employees-form");
const $title = $d.querySelector(".crud-title");
const $titleE = $d.querySelector(".crud-titleE");
const $templateUser = $d.getElementById("crud-template").content;
const $templateEmployee = $d.getElementById("employee-template").content;
const $fragementUser = $d.createDocumentFragment();
const $fragementEmployee = $d.createDocumentFragment();

const getAllUsers = async () => {
    try {
        let res = await axios.get("http://localhost:4444/usuarios");
        let json = await res.data;
        json.forEach((el) => {
            $templateUser.querySelector(".username").textContent = el.username;
            $templateUser.querySelector(".password").textContent = el.password;
            $templateUser.querySelector(".rol").textContent = el.rol;
            $templateUser.querySelector(".id").textContent = el.id;
            $templateUser.querySelector(".edit-user").dataset.id = el.id;
            $templateUser.querySelector(".edit-user").dataset.username = el.username;
            $templateUser.querySelector(".edit-user").dataset.password = el.password;
            $templateUser.querySelector(".edit-user").dataset.rol = el.rol;
            $templateUser.querySelector(".delete-user").dataset.id = el.id;

            let $clone = $d.importNode($templateUser, true);

            $fragementUser.appendChild($clone);
        });

        $tableUsers.querySelector("tbody").appendChild($fragementUser);
    } catch (error) {
        let message = error.statusText || "Ocurrió un error, no se encontró el servidor local";
        $tableUsers.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
    }
};

const getAllEmployees = async () => {
    try {
        let res = await axios.get("http://localhost:4444/empleados");
        let json = await res.data;
        json.forEach((el) => {
            $templateEmployee.querySelector(".nombre").textContent = el.nombre;
            $templateEmployee.querySelector(".apellido").textContent = el.apellido;
            $templateEmployee.querySelector(".idusuario-employee").textContent = el.idusuario;
            $templateEmployee.querySelector(".dias").textContent = el.dias;
            $templateEmployee.querySelector(".id").textContent = el.id;
            $templateEmployee.querySelector(".edit-employee").dataset.id = el.id;
            $templateEmployee.querySelector(".edit-employee").dataset.nombre = el.nombre;
            $templateEmployee.querySelector(".edit-employee").dataset.apellido = el.apellido;
            $templateEmployee.querySelector(".edit-employee").dataset.idusuario = el.idusuario;
            $templateEmployee.querySelector(".edit-employee").dataset.dias = el.dias;
            $templateEmployee.querySelector(".delete-employee").dataset.id = el.id;

            let $clone = $d.importNode($templateEmployee, true);

            $fragementEmployee.appendChild($clone);
        });

        $tableEmployees.querySelector("tbody").appendChild($fragementEmployee);
    } catch (error) {
        let message = error.statusText || "Ocurrió un error, no se encontró el servidor local";
        $tableEmployees.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
    }
};

$d.addEventListener("DOMContentLoaded", () => {
    getAllUsers();
    getAllEmployees();
});

$d.addEventListener("submit", async (e) => {
    if (e.target === $formUsers) {
        e.preventDefault();

        if (!e.target.id.value) {
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                    data: JSON.stringify({
                        username: e.target.username.value,
                        password: e.target.password.value,
                        rol: e.target.rol.value,
                    }),
                };

                let res = await axios("http://localhost:4444/usuarios", options);
                let json = await res.data;

                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $formUsers.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        } else {
            try {
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                    data: JSON.stringify({
                        username: e.target.username.value,
                        password: e.target.password.value,
                        rol: e.target.rol.value,
                    }),
                };

                let res = await axios(`http://localhost:4444/usuarios/${e.target.id.value}`, options);
                let json = await res.data;

                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $formUsers.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        }
    }

    if (e.target === $formEmployees) {
        e.preventDefault();

        if (!e.target.id.value) {
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        apellido: e.target.apellido.value,
                        idusuario: e.target.idusuario.value,
                        dias: e.target.dias.value,
                    }),
                };

                let res = await axios("http://localhost:4444/empleados", options);
                let json = await res.data;

                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $formEmployees.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        } else {
            try {
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        apellido: e.target.apellido.value,
                        idusuario: e.target.idusuario.value,
                        dias: e.target.dias.value,
                    }),
                };

                let res = await axios(`http://localhost:4444/empleados/${e.target.id.value}`, options);
                let json = await res.data;

                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $formEmployees.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        }
    }
});

$d.addEventListener("click", async (e) => {
    if (e.target.matches(".edit-user")) {
        $title.textContent = "Perfiles - editar un usuario";
        $formUsers.username.value = e.target.dataset.username;
        $formUsers.password.value = e.target.dataset.password;
        $formUsers.rol.value = e.target.dataset.rol;
        $formUsers.id.value = e.target.dataset.id;
    }

    if (e.target.matches(".delete-user")) {
        let confirmacion = confirm("¿Estás seguro que deseas eliminar el usuario seleccionado?");

        if (confirmacion) {
            try {
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                };

                let res = await axios(`http://localhost:4444/usuarios/${e.target.dataset.id}`, options);
                let json = await res.data;

                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $formUsers.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        }
    }

    if (e.target.matches(".edit-employee")) {
        $titleE.textContent = "Empleados - editar un empleado";
        $formEmployees.nombre.value = e.target.dataset.nombre;
        $formEmployees.apellido.value = e.target.dataset.apellido;
        $formEmployees.idusuario.value = e.target.dataset.idusuario;
        $formEmployees.dias.value = e.target.dataset.dias;
        $formEmployees.id.value = e.target.dataset.id;
    }

    if (e.target.matches(".delete-employee")) {
        let confirmacion = confirm("¿Estás seguro que deseas eliminar el empleado seleccionado?");

        if (confirmacion) {
            try {
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                };

                let res = await axios(`http://localhost:4444/empleados/${e.target.dataset.id}`, options);
                let json = await res.data;

                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $formEmployees.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        }
    }
});

//Ingresar en la terminal de Visual Studio Code: json-server -w -p 4444 assets/db.json para abrir el servidor//