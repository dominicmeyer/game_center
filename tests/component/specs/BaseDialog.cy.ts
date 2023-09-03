import BaseDialog from '../../../src/components/dialogs/BaseDialog.vue'

describe('<BaseDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BaseDialog)
  })
})