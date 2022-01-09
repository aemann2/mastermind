export {};
let server = require('../server.ts');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Testing randomnum route', () => {
	it('Should return a 4 digit number', (done) => {
		chai
			.request(server)
			.get('/api/randomnum')
			.end((err: any, res: any) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.number.length.should.equal(4);
			});
		done();
	});
	it('Should return a 5 digit number', (done) => {
		chai
			.request(server)
			.get('/api/randomnum?len=5')
			.end((err: any, res: any) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.number.length.should.equal(5);
			});
		done();
	});
	it('Should return a 6 digit number', (done) => {
		chai
			.request(server)
			.get('/api/randomnum?len=6')
			.end((err: any, res: any) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.number.length.should.equal(6);
			});
		done();
	});
	it('Should return a 400 for a number over 6', (done) => {
		chai
			.request(server)
			.get('/api/randomnum?len=8')
			.end((err: any, res: any) => {
				res.should.have.status(400);
				res.body.should.be.a('object');
				res.body.should.have
					.property('message')
					.equal('len param must be a number between 4 and 6');
			});
		done();
	});
	it('Should return a 400 for a number below 4', (done) => {
		chai
			.request(server)
			.get('/api/randomnum?len=3')
			.end((err: any, res: any) => {
				res.should.have.status(400);
				res.body.should.be.a('object');
				res.body.should.have
					.property('message')
					.equal('len param must be a number between 4 and 6');
			});
		done();
	});
	it('Should return a 400 for a non-number', (done) => {
		chai
			.request(server)
			.get('/api/randomnum?len=abcd')
			.end((err: any, res: any) => {
				res.should.have.status(400);
				res.body.should.be.a('object');
				res.body.should.have
					.property('message')
					.equal('len param must be a number between 4 and 6');
			});
		done();
	});
});
