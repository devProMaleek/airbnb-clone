import React from 'react'
import UserMenu from '@/app/components/Navbar/UserMenu'

describe('UserMenu component', () => {
  it('renders UserMenu component', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserMenu />)
  })
})