import { createSlice } from "@reduxjs/toolkit";
import { getCardNameFormat } from "main/utils";


const INITIAL_STATE = {
    server: {
        hostname: "localhost",
        port: "5000",
        gameId: "4000",
        gameName: "Holdem", 
        path: "/api/holdem/beetek/card"
    },
    tables: [
        { gameId: "4000", gameName: "Holdem", path: "/api/holdem/beetek/card" },
        { gameId: "32800", gameName: "Baccarat", path: "/api/baccarat/beetek/card" },
        { gameId: "228000", gameName: "AndarBahar", path: "/api/andarbahar/beetek/card" },
    ],
    status: {
        delivery: false,
        nfc: false,
        network: false,
    },
    drawnCards: [],
    deck52: [],
    nfc: {
        cards: [
            {uid: "23869508", suit: 'c', rank: '2'},
            {uid: "c38a9a08", suit: 'c', rank: '3'},
            {uid: "53aed108", suit: 'c', rank: '4'},
            {uid: "3387740a", suit: 'c', rank: '5'},
            {uid: "73b8d008", suit: 'c', rank: '6'},
        ]
    }
}

const shoeSlice = createSlice({
    name: 'shoe',
    initialState: INITIAL_STATE,
    reducers: {
        shoeServerUpdate(state, { payload }) { state.server = payload },
        shuffleDeck52(state, { payload }) {
            // val beetekCardRegex = "([a-zA-Z])([a-zA-Z0-9]*)".r
            const suits = ['c', 'd', 'h', 's']
            const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a']

            state.deck52 = suits.flatMap((suit) => ranks.map((rank) => { return `${suit}${rank}` }))
            state.drawnCards = []
        },
        drawnCard(state, { payload }) {
            const { suit, rank } = payload

            state.deck52 = state.deck52.filter(card => card != `${suit}${rank}`)
            state.drawnCards = [...state.drawnCards, getCardNameFormat(suit, rank)]
        },

        cardDeliverySuccess(state, {payload}){state.status.delivery = true},
        cardDeliveryError(state, {payload}){state.status.delivery = false},

        nfcReaderAttached(state, {payload}){state.status.nfc = true},
        nfcReaderDetached(state, {payload}){state.status.nfc = false},

    }
})

export default shoeSlice