export const getCardNameFormat = (suit, rank) => {
    let formattedSuit = 'c'
    let formattedRank = '2'

    switch (suit) {
        case 'c':
        case 'C':
            formattedSuit = 'c'; break;
        case 'd':
        case 'D':
            formattedSuit = 'd'; break;
        case 'h':
        case 'H':
            formattedSuit = 'h'; break;
        case 's':
        case 'S':
            formattedSuit = 's'; break;
        default:
            formattedSuit = 'w'
    }

    switch (rank) {
        case '10':
        case 't':
        case 'T':
            formattedRank = 't'; break;
        case 'J':
        case 'j':
            formattedRank = 'j'; break;
        case 'Q':
        case 'q':
            formattedRank = 'q'; break;
        case 'K':
        case 'k':
            formattedRank = 'k'; break;
        case 'A':
        case 'a':
            formattedRank = 'a'; break;
        default:
            formattedRank = rank;

    }

    return formattedRank + formattedSuit

}