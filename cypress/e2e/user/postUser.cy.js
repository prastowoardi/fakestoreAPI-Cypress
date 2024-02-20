import { faker } from '@faker-js/faker'

describe('Create User', () => {
    it('Create User', () => {
        cy.request({
            method: 'POST',
            url: '/products',
            body: {
                    email:faker.internet.email(),
                    username:faker.internet.userName(),
                    password:faker.internet.password(),
                    name:{
                        firstname:faker.name.firstName('male'),
                        lastname:faker.name.lastName('male')
                    },
                    address:{
                        city:faker.location.city(),
                        street:faker.location.streetAddress(),
                        number:faker.number.int(),
                        zipcode:faker.location.zipCode('####'),
                        geolocation:{
                            lat:faker.location.latitude(),
                            long:faker.location.longitude()
                        }
                    },
                    phone:faker.phone.number()
            },
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            switch (response.status) {
                case 200:
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                    break
                case 400:
                case 401:
                    expect(response.status).to.satisfy((code) => code === 400 || code === 401)
                    let message = JSON.stringify(response.body.message)
                    throw new Error(`${message}`)
                case 500:
                    expect(response.status).to.eq(500)
                    throw new Error('Server Error')
                default:
                    throw new Error(`Unexpected status code: ${response.status}`)
            }
        })
    })
})
