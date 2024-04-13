import{ faker} from '@faker-js/faker'
const token = 'your token her'
const titre= faker.person.jobTitle()
const descrip = faker.person.jobDescriptor()
const urlApi = 'https://practice.expandtesting.com/notes/api/notes/'

const optionUrl ={
     method:'GET',
     url:urlApi,
     headers:{
        'x-auth-token': token
    },
}
describe('Tests suite api note', ()=>{
    const reqPost={
        ...optionUrl, 
         method: 'POST',
         body:{
            title: titre, 
            description: descrip, 
            category: 'Home'
         },
    }
    it('create note with post method', ()=>{
        cy.request(reqPost).then(response=>{
        expect(response.status).to.eq(200)
        expect(response.body.data.title).to.eq(titre)
    })
    })
    
    it('request get all notes', ()=>{

        cy.request(optionUrl).then(response=>{
           expect(response.status).to.eq(200)
           cy.log(response.body.data.length)
          // expect(response.body.data.length).to.eq(8)
           //utiliser Cypress loadash
           Cypress._.each(response.body.data, (data) => {
            expect(data.id).to.not.be.null
          })
       })
       })

    it('request Get one note', ()=>{
        
        cy.request(optionUrl).then(response=>{
           expect(response.status).to.eq(200)
           const id=response.body.data[0].id
        const getById={
            ...optionUrl,
            url:urlApi+id
        }
       cy.request(getById).then(response=>{
        expect(response.status).to.eq(200)
        expect(response.body.data).to.have.property('id')
        expect(typeof response.body.data.id).to.eq('string')
        expect(response.body.data.id).not.to.be.null
        expect(response.body.data).to.have.all.keys('id', 'title', 'description', 'category', 'completed', 'created_at', 'updated_at', 'user_id')

        expect(Object.keys(response.body.data).length).to.eq(8)
        expect(response.body.data.id).to.eq(id)
    })
    })
}) 

})