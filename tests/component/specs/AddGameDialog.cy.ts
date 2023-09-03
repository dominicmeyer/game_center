import AddGameDialog from '../../../src/components/dialogs/AddGameDialog.vue'

describe('<AddGameDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AddGameDialog)
  })
})