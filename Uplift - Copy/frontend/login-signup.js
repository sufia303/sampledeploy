const API_URL = "http://localhost:5006"; // Change this to your actual backend URL

async function authenticate(event, type) {
    event.preventDefault(); // Prevent form submission reload

    const usernameInput = document.getElementById(`${type}-username`);
    const passwordInput = document.getElementById(`${type}-password`);
    const errorMessage = document.getElementById(`${type}-error-message`);

    if (!usernameInput || !passwordInput || !errorMessage) {
        console.error("Form elements not found!");
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate input
    if (!username || !password) {
        errorMessage.textContent = "Please fill in all fields!";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token); // Store token in localStorage
            alert(`${type === "login" ? "Login" : "Signup"} successful!`);
            window.location.href = "bot.html"; // Redirect to chat page
        } else {
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        console.error(`${type} error:`, error);
        errorMessage.textContent = "Something went wrong. Please try again.";
    }
}

// Attach event listeners only if the elements exist
document.getElementById("login-form")?.addEventListener("submit", (e) => authenticate(e, "login"));
document.getElementById("signup-form")?.addEventListener("submit", (e) => authenticate(e, "signup"));
