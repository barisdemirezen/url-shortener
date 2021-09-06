const textArea = document.querySelector("#input-box");
const inputButton = document.querySelector("#input-button");
const resultText = document.querySelector("#result-link");
const copyText = document.querySelector("#copy");

textArea.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        sendRequest();
    }
});

inputButton.addEventListener('click', sendRequest);
resultText.addEventListener('click', copyTextToClipboard);

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

    if (res.status == 200)
    {
        resultText.innerText = resText.shortUrl;
        resultText.classList.remove("error");
        copyText.classList.remove("invisible");
    }
    else {
        resultText.innerText = resText.error;
        resultText.classList.add("error");
        copyText.classList.add("invisible");
    }

    resultText.classList.remove('invisible');
}

async function copyTextToClipboard() {
    navigator.clipboard.writeText(window.location.href + resultText.innerText);
}