import axios from "axios";

let refreshTokenTimeout;

function startSessionTimer() {
    const token = localStorage.getItem("access-token");
    const payload = JSON.parse(atob(token.split(".")[1]));

    // set a timeout to refresh the token a minute before it expires
    const expiresAt = new Date(payload.exp * 1000);
    const timeout = expiresAt.getTime() - Date.now() - 30 * 1000;

    refreshTokenTimeout = setTimeout(async () => {
        const response = await axios.post("/api/auth/refresh");
        localStorage.setItem("access-token", response.data.accessToken);
        startSessionTimer()
    }, timeout);
}

function stopSessionTimer() {
    clearTimeout(refreshTokenTimeout);
}

export { startSessionTimer, stopSessionTimer };
