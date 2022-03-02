// on page load, generate new shuffled deck
let deckId

$(document).ready(generateDeck())

$('#pickACardbtn').click(pickACard)


function generateDeck() {
    axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => {
            deckId = res.data.deck_id
            console.log(deckId)
            return deckId
        })
        .catch(err => {
            console.log(err)
        })
}

function pickACard() {
    axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res1 => {
            let suit = res1.data.cards[0].suit
            let val = res1.data.cards[0].value
            $('#cards').append(`<li>${val} of ${suit}</li>`)
        })
        .catch(err => {
            console.log(err)
            $('#pickACardbtn').hide()
        })
}