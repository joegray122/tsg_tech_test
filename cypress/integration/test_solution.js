describe('Technical tester assessment', () => {
    it('1. Retrieve all fixtures.', () => {
        // i. Assert that there are 3 fixtures within the returned object.
        cy.request({
            url: '/fixtures'
        }).then((response) => {
            expect(response.body).to.have.length('3')
        })
        // ii. Assert that each of the 3 fixtures has a fixtureId value.
        cy.request({
            url: '/fixture/1'
        }).then((response) => {
            expect(response.body).to.have.property('fixtureId', '1')
        })

        cy.request({
            url: '/fixture/2'
        }).then((response) => {
            expect(response.body).to.have.property('fixtureId', '2')
        })

        cy.request({
            url: '/fixture/3'
        }).then((response) => {
            expect(response.body).to.have.property('fixtureId', '3')
        })
     })
    it('2. Using the model guide in apiDocs.html, store a new fixture in the database.', () => {
        // custom command - see /support/commands.js
        cy.addFixtureWithId('4')
        // i. Get the new fixture
        // store as alias for future use
        cy.request('/fixture/4').as('fixture4')
        cy.get('@fixture4')

        // ii. Assert, within the teams array, that the first object has a teamId of 'HOME'.
        cy.get('@fixture4').should((response) => {
            expect(response.body.footballFullState.teams[0]).to.have.property('teamId', 'HOME')
        })
    })
    it('3. To simulate latency within systems, there is an intentional, random delay to store a new fixture on the server.', () => {
       // i. Bearing the delay in mind, create a new fixture and then retrieve it as soon as it's available
        cy.addFixtureWithId('5')
        cy.request({
            url: '/fixture/5'
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
        /*
        Above method automatically waits for the request to succeed, and immediately retireives. If not triggering
        the post request in the test, i.e triggered by page load or user interaction, could use something similar to 
        the code below:

        cy.server()
        cy.route({
            method: 'POST',
            url: '/fixture/5'
        }).as('addFixtureRequest')
        
        cy.click('whateverTriggersTheRequest')
        cy.wait('@addFixtureRequest')
        cy.request('whateverChecksNeedToBeMade')
        */
    })
    it('4. Create and delete a new fixture.', () => {
        cy.addFixtureWithId('6')
        // i. Assert that the fixture no longer exists.
        cy.request('DELETE', '/fixture/6')
        cy.request({
            url: '/fixture/6',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })
})