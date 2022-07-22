const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable Button 

function toggleButton() {
    button.disabled = !button.disabled;
}


// Passing Joke to VoiceRSS API

function tellMe(joke) {
    VoiceRSS.speech({
        key: '5b84898378d2492ba1e8dba1e119a0b4',
        src: joke,
        hl: 'en-Us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button 
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log("whoops", error);
    }
}

// Event Listeners

button.addEventListener('click', getJokes);
audio.addEventListener('ended', toggleButton);