import PlayerCard from '../../../src/components/cards/PlayerCard.vue'

describe('<PlayerCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(PlayerCard)
  })
})