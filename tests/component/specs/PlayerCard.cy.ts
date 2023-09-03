import { Player } from '@/types/player'
import PlayerCard from '../../../src/components/cards/PlayerCard.vue'

const mount = (player?: Player) => cy.mount(PlayerCard, {
    props: {
        player: player ? player : new Player("default"),
    }
})

describe('<PlayerCard />', () => {
    it('renders', () => {
        mount()
    })
})