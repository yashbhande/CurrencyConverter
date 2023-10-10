// Define an asynchronous function called 'populate' with parameters 'value' and 'currency'.
const populate = async (value, currency) => {
    // Initialize an empty string variable 'myStr'.
    let myStr = "";

    // Construct the URL for the currency conversion API based on the selected 'currency'.
    url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_3clqpCQKMvtkuI3EwyXFirz9KJGRjEtvC06HKI9f&base_currency=" + currency;

    // Send a GET request to the constructed URL and wait for the response.
    let response = await fetch(url);

    // Parse the response body as JSON.
    let rJson = await response.json();

    // Display the element with class 'output'.
    document.querySelector(".output").style.display = "block";

    // Iterate over the keys (currency codes) in the 'data' object of the JSON response.
    for (let key of Object.keys(rJson["data"])) {
        // Build an HTML table row (tr) containing currency information.
        myStr += ` <tr>
                        <td>${key}</td>
                        <td>${rJson["data"][key]["code"]}</td>
                        <td>${Math.round(rJson["data"][key]["value"] * value)}</td>
                    </tr> 
                `;
    }

    // Find the table body (tbody) in the HTML document.
    const tableBody = document.querySelector("tbody");

    // Set the inner HTML of the table body to the constructed 'myStr'.
    tableBody.innerHTML = myStr;
}

// Find the HTML element with the class 'btn'.
const btn = document.querySelector(".btn");

// Add a click event listener to the 'btn'.
btn.addEventListener("click", (e) => {
    // Prevent the default form submission behavior.
    e.preventDefault();

    // Get the 'value' by parsing the input value as an integer.
    const value = parseInt(document.querySelector("input[name='quantity']").value);

    // Get the selected 'currency' from the dropdown.
    const currency = document.querySelector("select[name='currency']").value;

    // Call the 'populate' function with 'value' and 'currency' as parameters.
    populate(value, currency);
})
