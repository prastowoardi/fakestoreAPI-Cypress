function generateRandomId() {
    return Math.floor(Math.random() * 10) + 1
}

var id = generateRandomId()

describe ('Delete Carts', () => {
    it ('Delete Carts', () => {
        cy.request({
            method: 'DELETE',
            url: `/carts/${id}`,
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