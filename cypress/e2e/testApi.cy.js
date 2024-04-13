import{ faker} from '@faker-js/faker'
const token = 'your token her'
const titre= faker.person.jobTitle()
const descrip = faker.person.jobDescriptor()
const urlApi= 'https://practice.expandtesting.com/notes/api/notes/'

describe('Tests suite api note', ()=>{
    it('request create note with post', ()=>{

     cy.request({
        method:'POST',
         url: urlApi,
         headers:{
            'x-auth-token': token
         },
         body:{
            title: titre, 
            description: descrip, 
            category: 'Home'
         },
    }).then(response=>{
        expect(response.status).to.eq(200)
       expect(response.body.data.title).to.eq(titre)
    })
    })
    it('request Get all notes', ()=>{

        cy.request({
           method:'GET',
            url:urlApi,
            headers:{
               'x-auth-token': token
            },
       }).then(response=>{
           expect(response.status).to.eq(200)
           cy.log(response.body.data.length)
           //expect(response.body.data.length).to.eq(6)
           //utiliser Cypress loadash
           Cypress._.each(response.body.data, (data) => {
            expect(data.id).to.not.be.null
          })
       })
       })

    it('request Get one note with id', ()=>{
        
        cy.request({
           method:'GET',
            url:urlApi,
            headers:{
               'x-auth-token': token
            },
       }).then(response=>{
           expect(response.status).to.eq(200)
           const id=response.body.data[0].id
      
       cy.request({
        method:'GET',
         url:urlApi+id,
         headers:{
            'x-auth-token': token
         },
    }).then(response=>{
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