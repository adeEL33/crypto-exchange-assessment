
const request = require('supertest');
const express = require('express');
const crypto_exchange_record = require("../controllers/crypto_exchange_record.controller.js");
const app = express();
app.use(express.json());
app.post('/api/crypto_exchange_record', crypto_exchange_record.create);
describe('POST /api/crypto_exchange_record', function () {
    
    it('responds with json', function (done) {
        const body = {
            currency_from:'BTC',
            currency_to:'USD',
            amount_1:200,
            amount_2:321238,
            type:'exchanged',
        }
        request(app)
            .post('/api/crypto_exchange_record')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }
                
                if(res){
                    expect(res.body.status).toBe('success');
                    return done();
                }
                
            });
    });
});