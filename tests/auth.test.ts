export {};
let server = require('../server.ts');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Testing auth route POST', () => {
	it('Should return a 400 error if email is not submitted', (done) => {
		chai
			.request(server)
			.post('/api/auth')
			.set('content-type', 'application/json')
			.send({ email: 'test', password: '123123' })
			.end((err: any, res: any) => {
				res.should.have.status(400);
				done();
			});
	});
	it('Should return a 400 error if password is too short', (done) => {
		chai
			.request(server)
			.post('/api/auth')
			.set('content-type', 'application/json')
			.send({ email: 'test@test.com', password: '12312' })
			.end((err: any, res: any) => {
				res.should.have.status(400);
				done();
			});
	});
});

describe('Testing auth route GET', () => {
	it('Should return a 401 error as a protected route for a get request', (done) => {
		chai
			.request(server)
			.get('/api/auth')
			.end((err: any, res: any) => {
				res.should.have.status(401);
				done();
			});
	});
});
