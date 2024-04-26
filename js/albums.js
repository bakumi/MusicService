document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const teamsList = document.querySelector(".teams-ul").children;

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(teamsList).forEach(function (team) {
            const teamName = team.querySelector("h2").textContent.toLowerCase();
            const yearFounded = team.querySelector(".group-description p:nth-child(2)").textContent.toLowerCase();
            const musicStyle = team.querySelector(".group-description p:nth-child(3)").textContent.toLowerCase();
            const country = team.querySelector(".group-description p:nth-child(1)").textContent.toLowerCase();

            const isMatch =
                teamName.includes(searchTerm) ||
                yearFounded.includes(searchTerm) ||
                musicStyle.includes(searchTerm) ||
                country.includes(searchTerm);

            if (isMatch) {
                team.style.opacity = 1; 
            } else {
                team.style.opacity = 0;
            }
        });
    });
});
