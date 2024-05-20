document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const errors = [];
    if (data.firstName.trim().length === 0 || data.lastName.trim().length === 0) {
        errors.push("First name and last name are required.");
    }
    if (
        data.firstName.match(/\d/) ||
        data.lastName.match(/\d/) ||
        data.otherNames.match(/\d/)
    ) {
        errors.push("Names cannot contain numbers.");
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.push("Invalid email address.");
    }
    if (data.phone.length !== 11) {
        errors.push("Phone number must be 10 digits.");
    }
    if (data.gender === "") {
        errors.push("Gender is required.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        // Submit form data
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/submit-form", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
        alert("Form submitted successfully!");
        this.reset();
    }
});

