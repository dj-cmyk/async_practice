BASE_URL = "http://numbersapi.com/"

// Favorite Number Request
async function favNumRequest(favNum) {
    try {
        let res = await axios.get(`${BASE_URL}${favNum}?json`)
        $('#favNum').text(res.data.text)
    } catch(e) {
        console.log(e)
    }
}

favNumRequest(6)


// Multiple Numbers Request
async function multNumsRequest(min, max){
    try {
        let res = await axios.get(`${BASE_URL}${min}..${max}?json`)
        for (let i in res.data) {
            $('#multNums').append(`<li>${res.data[i]}</li>`)
        }
    } catch(e) {
        console.log(e)
    }
}

multNumsRequest(2, 4)



// Four Facts Requests
let fourNumFacts = [];

async function getFourFacts(num){
    try {
        for (let i = 1; i < 5; i++) {
            fourNumFacts.push(
            await axios.get(`${BASE_URL}${num}?json`)
            );
        }
        fourNumFacts.forEach(fact => {
            $('#fourFacts').append(`<div>${fact.data.text}</div>`)
        })
    } catch (e) {
        console.log(e)
    }
}

getFourFacts(4)



// *****************************************
// Deck of Cards Exercises


// draw a card from a newly shuffled deck
async function drawOneCard(){
    try {
        let res = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
        let suit = res.data.cards[0].suit
        let val = res.data.cards[0].value
        console.log(`${val} of ${suit}`)
    } catch (e) {
        console.log(e)
    }  
}

drawOneCard()



// drawing multiple cards from the same deck
let deckId
let firstCard
let secondCard

async function drawCards(){
    try {
        let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        deckId = res.data.deck_id
        firstCard = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        secondCard = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        console.log('first card:', firstCard.data.cards[0].value, firstCard.data.cards[0].suit, 'second card:', secondCard.data.cards[0].value, secondCard.data.cards[0].suit)
    } catch (e) {
        console.log(e)
    }
}

drawCards()

