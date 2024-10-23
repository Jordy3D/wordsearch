const lettersInput = document.getElementById('letters');
const allToggle = document.getElementById('allToggle');
const minLengthInput = document.getElementById('minLength');
const maxLengthInput = document.getElementById('maxLength');
const lettersAvailableInput = document.getElementById('lettersAvailable');
const excludeToggle = document.getElementById('excludeToggle');
const patternInput = document.getElementById('pattern');
const dictionarySelect = document.getElementById('dictionary');

const output = document.querySelector('.output');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// Fetch the words and store them in an array
let words = [];

fetch('data/words_alpha.txt')
    .then(response => response.text())
    .then(text => {
        // Split the text into an array of words
        words = text.split('\n');
        words = words.map(word => word.trim());

        console.log("Words loaded:", words.length);
        let longestWord = words.reduce((a, b) => a.length > b.length ? a : b);
        console.log(`The longest word is ${longestWord} (${longestWord.length})`);
    })
    .catch(error => {
        console.error("Error fetching or processing words:", error);
    });

const dictionary = {
    full: 'words_alpha.txt',
    small: 'words_small.txt',
    'wordle full': 'words_wordle_full.txt',
    'wordle small': 'words_wordle_small.txt'
};

// Function to fetch the words from the selected dictionary
const fetchWords = () => {
    fetch('data/' + dictionary[dictionarySelect.value])
        .then(response => response.text())
        .then(text => {
            // Split the text into an array of words
            words = text.split('\n');
            words = words.map(word => word.trim());

            console.log("Words loaded:", words.length);
            let longestWord = words.reduce((a, b) => a.length > b.length ? a : b);
            console.log(`The longest word is ${longestWord} (${longestWord.length})`);

            // Find the words that contain the letters
            findWords();
        })
        .catch(error => {
            console.error("Error fetching or processing words:", error);
        });
};

// Function to handle input changes
const handleInputChange = () => {
    // Find the words that contain the letters
    findWords();
};

// Listen for input changes
lettersInput.addEventListener('input', handleInputChange);
allToggle.addEventListener('change', handleInputChange);
minLengthInput.addEventListener('input', handleInputChange);
maxLengthInput.addEventListener('input', handleInputChange);
lettersAvailableInput.addEventListener('input', handleInputChange);
excludeToggle.addEventListener('change', handleInputChange);
patternInput.addEventListener('input', handleInputChange);
dictionarySelect.addEventListener('change', fetchWords);

function splitLetters(input) {
    return input.value.toLowerCase().trim().split('');
}

const isValid = (word) => {
    const letters = splitLetters(lettersInput);
    const lettersAvailable = splitLetters(lettersAvailableInput);

    word = word.toLowerCase();

    function between(x, min, max) {
        return x >= min && x <= max;
    }

    function containsAny(word, letters) {
        for (let i = 0; i < letters.length; i++) {
            if (word.includes(letters[i])) {
                return true;
            }
        }
        return false;
    }

    function containsAll(word, letters) {
        for (let i = 0; i < letters.length; i++) {
            if (!word.includes(letters[i])) {
                return false;
            }
        }
        return true;
    }

    function containsUnavailable(word, lettersAvailable) {
        for (let i = 0; i < word.length; i++) {
            if (!lettersAvailable.includes(word[i])) {
                return true;
            }
        }
        return false;
    }

    function matchesPattern(word, pattern) {
        if (word.length !== pattern.length) {
            return false;
        }

        // store the letters in the word and pattern in arrays
        let wordLetters = word.split('');
        let patternLetters = pattern.split('');

        // check if the letters match the pattern
        // if the pattern is __ice, the first two letters are unknown and the word must contain the letters 'i', 'c', and 'e'
        // if the pattern is __ICE, the first two letters are unknown and the word must contain the letters 'I', 'C', and 'E' in those positions

        for (let i = 0; i < wordLetters.length; i++) {
            let wordLetter = wordLetters[i];
            let patternLetter = patternLetters[i];

            if (patternLetter === '_') {
                // if the pattern is _, the letter can be anything
                continue;
            }

            if (patternLetter === patternLetter.toUpperCase()) {
                // if the pattern is a capital letter, the letter must match the pattern
                if (wordLetter !== patternLetter.toLowerCase()) {
                    return false;
                }
            } else {
                // if the pattern is a lowercase letter, the letter must be in the word
                if (!word.includes(patternLetter)) {
                    return false;
                }
                if (wordLetter == patternLetter) {
                    return false;
                }
            }
        }

        return true;
    }

    // Check if the word is within the min and max length
    let wordLength = word.length;
    let minLength = parseInt(minLengthInput.value);
    let maxLength = parseInt(maxLengthInput.value);

    if (!between(wordLength, minLength, maxLength))
        return false;

    if (letters.length > 0) {
        if (allToggle.checked) {
            if (!containsAll(word, letters))
                return false;
        } else {
            if (!containsAny(word, letters))
                return false;
        }
    }

    if (patternInput.value.length > 0) {
        if (!matchesPattern(word, patternInput.value))
            return false;
    }

    if (lettersAvailable.length > 0) {
        if (excludeToggle.checked) {
            // remove the lettersAvailable from the full alphabet
            let invertedLettersAvailable = alphabet.split('').filter(letter => !lettersAvailable.includes(letter));

            if (containsUnavailable(word, invertedLettersAvailable))
                return false;
        }
        else {
            if (containsUnavailable(word, lettersAvailable))
                return false;
        }
    }

    return true;
}

function findWords() {
    // Get the letters from the input
    const letters = lettersInput.value.trim().split('');
    const lettersAvailable = lettersAvailableInput.value.trim().split('');

    if (letters.length === 0 && lettersAvailable.length === 0 && patternInput.value.length === 0) {
        output.innerHTML = '<span>No letters to search for</span>';
        return;
    }

    output.innerHTML = '<span>Loading...</span>';

    // Allow the browser to render the loading text
    setTimeout(() => {
        // Filter the words
        let foundWords = words.filter(word => {
            return isValid(word);
        });

        output.innerHTML = `<span>Found ${foundWords.length} words</span>`;
        foundWords.forEach(word => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="https://www.theopendictionary.com/word/${word}" target="_blank">${word}</a>`;
            output.appendChild(li);
        });
    }, 0);
}








// responsive inputs

// hide the 
const inputSection = document.querySelector('#inputs');
const inputToggle = document.querySelector('#inputDisplayToggle');

inputToggle.addEventListener('click', () => {
    inputSection.classList.toggle('hidden');
    // inputToggle.innerHTML = inputSection.classList.contains('hidden') ? 'Show Inputs' : 'Hide Inputs';
});

// if the screen is small, remove the toggle's hidden class and add the input's hidden class
if (window.innerWidth < 600) {
    console.log('small screen');
    inputToggle.classList.remove('hidden');
    inputSection.classList.add('hidden');
}