const { expect } = require("@jest/globals");
const axios = require('axios');
const supertest = require("supertest");
const app = require('../server');


test('Testing to see if Jest is working', () => {
    expect(1).toBe(1)
})

test('No search parameters returns all clinics', async () => {
    const vetClinics = await axios({
        url: 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
        method: 'get'
    });
    const dentalClinics = await axios({
        url: 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
        method: 'get'
    });
    await supertest(app).get('/api/clinic')
        .expect(200)
        .then((response) => {
            expect(response.body.vet).toStrictEqual(vetClinics.data);
            expect(response.body.dentist).toStrictEqual(dentalClinics.data);
            expect(response.body).toStrictEqual({ vet: vetClinics.data, dentist: dentalClinics.data });
        });
});

test('Inputing only name parameter returns results filtered by name', async () => {
    await supertest(app).get('api/clinic?name=Mayo%Clinic')
        .expect(200)
        .then((response) => {
            expect(response.body.name).toBe('Mayo Clinic');
        });
});

test('Inputing only state parameter returns results filtered by state name', async () => {
    await supertest(app).get('api/clinic?state=California')
        .expect(200)
        .then((response) => {
            response.body.forEach(clinic => expect(clinic.state).toBe('California'));
        });
});

test('Inputing only abbreviated state parameter returns results filtered by state name', async () => {
    await supertest(app).get('api/clinic?state=CA')
        .expect(200)
        .then((response) => {
            response.body.forEach(clinic => expect(clinic.state).toBe('California'));
        });
});