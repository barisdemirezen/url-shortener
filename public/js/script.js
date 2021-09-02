const textArea = document.querySelector("#input-box");
const inputButton = document.querySelector("#input-button");
const resultText = document.querySelector("#result-link");

inputButton.addEventListener('click', sendRequest);

async function sendRequest(){

    let data = {url: textArea.value};

    let res = await fetch('./create', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    });
    let resText = await res.json();

    resultText.innerText = resText.shortUrl;
    resultText.classList.remove('invisible');
}