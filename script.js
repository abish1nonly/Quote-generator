const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const whatsappBtn = document.getElementById('whatsapp');
const loader = document.getElementById('loader');


function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        complete();
    } catch (error) {
        getQuote();
    }
}
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.
    textContent} - ${authorText.textContent}`;
    const url = encodeURIComponent(window.location.href); 
    const via = "abish1nonly"

    window.open(`${twitterUrl} link: ${url} by @${via}`, '_blank'); 
}

function whatsappSend(){
    const whatsappUrl = `whatsapp://send?text=${quoteText.
    textContent} - ${authorText.textContent}`;
    const via = "abish1nonly"

    window.open(whatsappUrl, '_blank'); 
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
whatsappBtn.addEventListener('click', whatsappSend);

getQuote();
