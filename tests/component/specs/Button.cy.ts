import Button, { ButtonType } from '../../../src/components/Button.vue'

const mount = (type: ButtonType) => cy.mount(Button, {
    props: {
        type: type,
    }
})

describe('<Button />', () => {
    it('renders add', () => {
        mount(ButtonType.Add)
    })

    it('renders close', () => {
        mount(ButtonType.Close)
    })

    it('renders delete', () => {
        mount(ButtonType.Delete)
    })

    it('renders edit', () => {
        mount(ButtonType.Edit)
    })

    it('renders save', () => {
        mount(ButtonType.Save)
    })
})