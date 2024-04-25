it('returns Register when we hit /register', ()=>{
    cy.request('POST','http://localhost:8000/api/user/register').then((res)=> {
        expect(res.status).to.eq(200);
        expect(res.body).property('message').to.eq("Success");
    })
})