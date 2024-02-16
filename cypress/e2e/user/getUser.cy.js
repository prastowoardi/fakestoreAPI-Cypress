import { generateRandomId } from "../../support/randomValue"

describe ('Get Users', () => {
    it ('Get All', () => {
        cy.request({
            method: 'GET',
            url: `/users`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            if (response.status === 200) {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                console.log(response.body)
            } else if (response.status === 400 || response.status === 401) {
                expect(response.status).to.eq(400) || expect(response.status).to.eq(401)
                let message = JSON.stringify(response.body.message)
                throw new Error(`ID : ${id}, ${message}`)
            } else if (response.status === 500) {
                expect(response.status).to.eq(500)
                throw new Error('Server Error')
            }
        })
    })
    
    const id = generateRandomId()

    it('Get One User', () => {
        cy.request({
            method: 'GET',
            url: `/users/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            const user = response.body
    
            if (user && user.name && user.name.firstname) {
                cy.log(`User ID: ${user.id}`)
                cy.log(`Email: ${user.email}`)
                cy.log(`Username: ${user.username}`)
                cy.log(`Name: ${user.name.firstname} ${user.name.lastname}`)
                cy.log(`Phone: ${user.phone}`)
                cy.log(`Address: ${user.address.street}, ${user.address.number}, ${user.address.city}, ${user.address.zipcode}`)
                cy.log(`Geolocation: Lat ${user.address.geolocation.lat}, Long ${user.address.geolocation.long}`)
                console.log(response.body)
            } else {
                throw new Error('User data not found')
            }
        })
    })
})