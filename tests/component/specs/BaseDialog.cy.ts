import BaseDialog from '../../../src/components/dialogs/BaseDialog.vue'

const mount = (isOpen: boolean, title?: string) => cy.mount(BaseDialog, {
    props: {
        isOpen: isOpen,
        title: title ? title : "default"
    }
})

describe('<BaseDialog />', () => {
    it('renders opened', () => {
        mount(true)
    })

    it('renders closed', () => {
        mount(false)
    })
})