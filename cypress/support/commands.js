Cypress.Commands.add('addFixtureWithId', (id) => {
    cy.request('POST', 'http://localhost:3000/fixture', {
        'fixtureId': id,
        'fixtureStatus': {
            'displayed': true,
            'suspended': false
        },
        'footballFullState': {
            'homeTeam': 'Manchester United',
            'awayTeam': 'Leeds United',
            'finished': false,
            'gameTimeInSeconds': 900,
            'goals': [
                {
                    'clockTime': 640,
                    'confirmed': true,
                    'id': 678606,
                    'ownGoal': false,
                    'penalty': false,
                    'period': 'FIRST_HALF',
                    'playerId': 560617,
                    'teamId': '1'
                },
                {
                    'clockTime': 864,
                    'confirmed': true,
                    'id': 164002,
                    'ownGoal': false,
                    'penalty': false,
                    'period': 'FIRST_HALF',
                    'playerId': 60817,
                    'teamId': '2'
                },
            ],
            'period': 'FIRST_HALF',
            'possibles': [],
            'corners': [],
            'redCards': [],
            'yellowCards': [],
            'startDateTime': '2018-03-20T10:49:38.655Z',
            'started': true,
            'teams': [
                {
                    'association': 'HOME',
                    'name': 'Manchester-United',
                    'teamId': 'HOME'
                },
                {
                    'association': 'AWAY',
                    'name': 'Leeds-United',
                    'teamId': 'AWAY'
                }
            ]
        },
    })
})