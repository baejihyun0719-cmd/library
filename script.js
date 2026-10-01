/* =========================================================
   NU-CLARK LIBRARY PORTAL
   LOGIN AND PAGE ACCESS SYSTEM
   =========================================================

   This JavaScript controls:
   1. Student login
   2. Login-required pages
   3. Protected Home page buttons
   4. Login changing into Logout
   5. Student information saved in the browser

   IMPORTANT:
   This is only a simulated login for a school project.
   It is not connected to the real NU student database.
   ========================================================= */


/* =========================================================
   1. CHECK LOGIN STATUS
   ========================================================= */

/*
   localStorage lets the browser remember whether
   the student has logged in.

   If isLoggedIn contains "true", the student is logged in.
*/
const isLoggedIn = localStorage.getItem("isLoggedIn");


/* =========================================================
   2. PROTECT ENTIRE PAGES
   ========================================================= */

/*
   We identify which HTML page the user is currently viewing.

   Example:
   collection.html
   services.html
   borrowed.html
*/
const currentPage = window.location.pathname.split("/").pop();


/*
   These pages should ONLY be accessible
   after the student has logged in.
*/
const protectedPages = [
    "services.html",
    "collection.html",
    "borrowed.html"
];


/*
   Check if the current page is one of the protected pages.

   includes() checks whether currentPage exists
   inside the protectedPages list.
*/
if (
    protectedPages.includes(currentPage) &&
    isLoggedIn !== "true"
) {

    /*
       If the student is NOT logged in,
       show a message.
    */
    alert(
        "Please log in first to access this library service."
    );


    /*
       Send the student to the Login page.
    */
    window.location.replace("login.html");
}



/* =========================================================
   3. LOGIN FORM
   ========================================================= */

/*
   Find the form with id="loginForm".

   This form only exists inside login.html.
*/
const loginForm = document.getElementById("loginForm");


/*
   Only run this section if the login form exists.
*/
if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        /*
           Prevent the form from automatically
           refreshing the page.
        */
        event.preventDefault();


        /* Get the information entered by the student. */

        const lastName =
            document.getElementById("lastname").value.trim();

        const firstName =
            document.getElementById("firstname").value.trim();

        const studentNumber =
            document.getElementById("studentNumber").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        /*
           Check that none of the fields are empty.
        */
        if (
            lastName === "" ||
            firstName === "" ||
            studentNumber === "" ||
            email === "" ||
            password === ""
        ) {

            alert("Please complete all login information.");

            return;
        }


        /*
           For this school demonstration, completing
           the required information counts as a
           successful login.

           A real university portal would check this
           information using a secure server/database.
        */


        /* Save login status. */
        localStorage.setItem("isLoggedIn", "true");


        /*
           Save basic student information so it can
           be displayed on other pages.
        */
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("studentNumber", studentNumber);
        localStorage.setItem("studentEmail", email);


        /*
           We intentionally DO NOT save the password
           in localStorage.
        */


        alert(
            "Login successful. Welcome, " + firstName + "!"
        );


        /*
           After login, return to the Home page.
        */
        window.location.href = "index.html";

    });

}



/* =========================================================
   4. PROTECT THE THREE HOME PAGE BUTTONS
   ========================================================= */

/*
   On index.html, the three cards have:

   data-protected

   JavaScript finds all elements containing
   that attribute.
*/
const protectedLinks =
    document.querySelectorAll("[data-protected]");


protectedLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        /*
           Check the CURRENT login status.
        */
        const loginStatus =
            localStorage.getItem("isLoggedIn");


        /*
           If the student isn't logged in,
           don't allow the link to open.
        */
        if (loginStatus !== "true") {

            event.preventDefault();


            alert(
                "Please log in first to access this library service."
            );


            /*
               Send the student to Login.
            */
            window.location.href = "login.html";

        }

    });

});



/* =========================================================
   5. LOGIN / LOGOUT BUTTON
   ========================================================= */

/*
   Find the navigation button with:

   id="loginNav"
*/
const loginNav = document.getElementById("loginNav");


if (loginNav) {

    /*
       Check login status again.
    */
    const loginStatus =
        localStorage.getItem("isLoggedIn");


    /*
       If logged in:
       Login becomes Logout.
    */
    if (loginStatus === "true") {

        loginNav.textContent = "Logout";

        loginNav.href = "#";


        /*
           Run this when Logout is clicked.
        */
        loginNav.addEventListener("click", function(event) {

            event.preventDefault();


            /*
               Clear all information associated
               with the simulated student session.
            */
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("studentNumber");
            localStorage.removeItem("studentEmail");


            alert("You have been logged out.");


            /*
               Return to Home.
            */
            window.location.href = "index.html";

        });

    }

    /*
       If NOT logged in, make sure the button
       displays Login and opens login.html.
    */
    else {

        loginNav.textContent = "Login";

        loginNav.href = "login.html";

    }

}



/* =========================================================
   6. DISPLAY STUDENT NAME ON BORROWED BOOKS PAGE
   ========================================================= */

/*
   borrowed.html contains an element with:

   id="studentWelcome"

   We can use the student's saved first and last
   name to personalize that page.
*/
const studentWelcome =
    document.getElementById("studentWelcome");


if (studentWelcome && isLoggedIn === "true") {

    const firstName =
        localStorage.getItem("firstName");

    const lastName =
        localStorage.getItem("lastName");


    studentWelcome.textContent =
        "Borrowed books for " +
        firstName +
        " " +
        lastName +
        ".";

}