// on page load, generate new shuffled deck
let deckId

$(document).ready(generateDeck())

$('#pickACardbtn').click(pickACard)


async function generateDeck() {
    try {
    let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        deckId = res.data.deck_id
        console.log(deckId)
        return deckId   
    } catch (e) {
        console.log(e)
    } 
}

async function pickACard() {
    try {
        let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        if (res.data.remaining % 3 == 0){
            $('#cardDisplay').append(`<img src="${res.data.cards[0].image}" class="stacked rotated25">`)
        } else if (res.data.remaining % 3 == 1){
            $('#cardDisplay').append(`<img src="${res.data.cards[0].image}" class="stacked rotated45">`)
        } else {
            $('#cardDisplay').append(`<img src="${res.data.cards[0].image}" class="stacked">`)
        }
    } catch (e) {
        console.log(e)
        $('#pickACardbtn').hide()
    }
}