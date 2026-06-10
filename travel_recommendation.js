document.getElementById("searchBtn").addEventListener("click", search);

document.getElementById("resetBtn").addEventListener("click", resetSearch);

async function search() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const response = await fetch("travel_recommendation_api.json");
    const data = await response.json();

    let results = [];

    if(keyword === "beach" || keyword === "beaches"){
        results = data.beaches;
    }

    else if(keyword === "temple" || keyword === "temples"){
        results = data.temples;
    }

    else if(keyword === "country" || keyword === "countries") {

    data.countries.forEach(country => {
        results.push(...country.cities);
    });

}

else {

    data.countries.forEach(country => {

        if(country.name.toLowerCase().includes(keyword)){
            results = country.cities;
        }

    });

}

    displayResults(results);
}

function displayResults(results){

    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";

    results.forEach(item => {

        resultsDiv.innerHTML += `
            <div style="border:1px solid gray;
                        padding:15px;
                        margin:15px;">
                <h3>${item.name}</h3>
                <img src="${item.imageUrl}"
                     width="300">
                <p>${item.description}</p>
            </div>
        `;
    });

}

function resetSearch(){

    document.getElementById("searchInput").value = "";

    document.getElementById("results").innerHTML = "";

}
