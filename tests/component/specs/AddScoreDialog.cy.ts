import { Player } from '@/types/player'
import AddScoreDialog from '../../../src/components/dialogs/AddScoreDialog.vue'
import { Game } from '@/types/game'
import { qwirkleGameType } from '@/types/gameType'

const mount = (isOpen: boolean, game?: Game, player?: Player) => cy.mount(AddScoreDialog, {
    props: {
        isOpen: isOpen,
        game: game ? game : new Game(qwirkleGameType().id),
        player: player ? player : new Player("default")
    }
})

describe('<AddScoreDialog />', () => {
    it('renders opened', () => {
        mount(true)
    })

    it('renders closed', () => {
        mount(false)
    })
})