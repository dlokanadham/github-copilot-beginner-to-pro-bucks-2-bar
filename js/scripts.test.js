const { test, expect } = require('@jest/globals');
const { JSDOM } = require("jsdom");

describe("Username input validation", () => {
    let document;
    let dom; // Define dom here

    beforeEach(() => {
        dom = new JSDOM(`
            <input id="username" />
        `);
        document = dom.window.document;

        // Mock the event listener
        document.getElementById("username").addEventListener("input", function () {
            const username = this.value;
            const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?~`-])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,}$/;
            this.style.borderColor = regex.test(username) ? "green" : "red";
        });
    });

    test("should set border color to red for invalid username", () => {
        const usernameInput = document.getElementById("username");
        usernameInput.value = "invalid";
        usernameInput.dispatchEvent(new dom.window.Event("input")); // Use dom here
        expect(usernameInput.style.borderColor).toBe("red");
    });

    test("should set border color to green for valid username", () => {
        const usernameInput = document.getElementById("username");
        usernameInput.value = "Valid1@A"; // Updated to 8 characters
        usernameInput.dispatchEvent(new dom.window.Event("input")); // Use dom here
        expect(usernameInput.style.borderColor).toBe("green");
    });
});

