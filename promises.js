BASE_URL = "http://numbersapi.com/"
// Favorite Number Request


axios.get(`${BASE_URL}7?json`)
    .then(res => {
        $('#favNum').text(res.data.text)
    })
    .catch(err => {
        console.log(err)
    })


// Multiple Numbers Request
axios.get(`${BASE_URL}3..10?json`)
    .then(res => {
        for (let i in res.data) {
            $('#multNums').append(`<li>${res.data[i]}</li>`)
        }
    })
    .catch(err => {
        console.log(err)
    })


// Four Facts Requests
let fourNumFacts = [];

for (let i = 1; i < 5; i++) {
  fourNumFacts.push(
    axios.get(`${BASE_URL}7?json`)
  );
}

Promise.all(fourNumFacts)
  .then(numArr => {
    numArr.forEach(p => {
        $('#fourFacts').append(`<div>${p.data.text}</div>`)
        })
    })
  .catch(err => {
      console.log(err)
  })

// *****************************************
// Deck of Cards Exercises

// draw a card from a newly shuffled deck

axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
  .then(res => {
      let suit = res.data.cards[0].suit
      let val = res.data.cards[0].value
      console.log(`${val} of ${suit}`)
  })
  .catch(err => {
      console.log(err)
  })

  // drawing multiple cards from the same deck


let deckId
let firstCard
let secondCard
axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        deckId = res.data.deck_id
        return axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    })
    .then(res1 => {
        let suit = res1.data.cards[0].suit
        let val = res1.data.cards[0].value
        firstCard = `first card is ${val} of ${suit}`
        return axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    })
    .then(res2 => {
        let suit = res2.data.cards[0].suit
        let val = res2.data.cards[0].value
        secondCard = `second card is ${val} of ${suit}`
    })
    .then(() => {
        console.log(firstCard, secondCard)
    })
    .catch(err => {
        console.log(err)
    })