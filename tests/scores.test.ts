export {};
let server = require('../server.ts');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Testing scores route POST', () => {
	it('Should return a 401 error as a protected route for a post requeset', (done) => {
		chai
			.request(server)
			.post('/api/scores')
			.set('content-type', 'application/json')
			.send({ user: '1234', sequence: '5678', guesses: 1, solved: false })
			.end((err: any, res: any) => {
				res.should.have.status(401);
				done();
			});
	});
});

describe('Testing scores route GET', () => {
	it('Should return a 401 error as a protected route for a get request', (done) => {
		chai
			.request(server)
			.get('/api/scores')
			.end((err: any, res: any) => {
				res.should.have.status(401);
				done();
			});
	});
});
