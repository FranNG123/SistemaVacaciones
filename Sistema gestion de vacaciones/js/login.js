const $d = document;

$d.addEventListener("DOMContentLoaded", () => {
    const $loginForm = $d.getElementById("login-form");

    $loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = $d.getElementById("username").value;
        const password = $d.getElementById("password").value;
        const rol = $d.getElementById("rol").value;

        try {
            const response = await axios.get("http://localhost:4444/usuarios");
            const dbData = response.data;
            const user = dbData.find((entry) => entry.username === username && entry.password === password && entry.rol === rol);
            if (user.username===username && user.password===password && user.rol==="Administrador") {
                window.location.href = "administracion.html";
            } 
            else if (user.username===username && user.password===password && user.rol==="Empleado") {
                window.location.href = "empleado.html";

            }
            else if (user.username===username && user.password===password && user.rol==="RRHH") {
                window.location.href = "rrhh.html";
            } 
        } catch (error) {
            console.error("Error al obtener datos de db.json:", error);
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    });
});