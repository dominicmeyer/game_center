import { Game } from '@/types/game'
import GameCard from '../../../src/components/cards/GameCard.vue'
import { qwirkleGameType } from '@/types/gameType'

const mount = (game?: Game) => cy.mount(GameCard, {
    props: {
        game: game ? game : new Game(qwirkleGameType().id),
    }
})

describe('<GameCard />', () => {
    it('renders', () => {
        mount()
    })
})