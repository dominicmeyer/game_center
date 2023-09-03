import { GameType, qwirkleGameType } from '@/types/gameType'
import AddGameDialog from '../../../src/components/dialogs/AddGameDialog.vue'

const mount = (isOpen: boolean, gameType?: GameType) => cy.mount(AddGameDialog, {
    props: {
        isOpen: isOpen,
        gameType: gameType ? gameType : qwirkleGameType()
    }
})

describe('<AddGameDialog />', () => {
    it('renders opened', () => {
        mount(true)
    })

    it('renders closed', () => {
        mount(false)
    })
})