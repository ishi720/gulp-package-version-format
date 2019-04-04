const gulpPackageVersionFormat = require('./../index');

describe('Prefix Caret Test', () => {
	it('^5.5.5 -> 5.x.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^5.5.5')).toBe('5.x.x');
	});
	it('^5.5.5.5 -> ^5.5.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('^5.5.5.5')).toBe('^5.5.5.5');
	});
	it('^0.5.5 -> 0.5.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^0.5.5')).toBe('0.5.x');
	});
	it('^0.0.5 -> 0.0.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('^0.0.5')).toBe('0.0.5');
	});
	it('^5.5.5-alpha -> 5.x.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^5.5.5-alpha')).toBe('5.x.x');
	});
	it('^0.5.5-alpha -> 0.5.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^0.5.5-alpha')).toBe('0.5.x');
	});
	it('^0.0.5-alpha -> 0.0.5-alpha', () => {
		expect(gulpPackageVersionFormat.versionFormat('^0.0.5-alpha')).toBe('0.0.5-alpha');
	});
	it('^555.555.555 -> 555.x.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^555.555.555')).toBe('555.x.x');
	});
	it('^5 -> 5.x.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^5')).toBe('5.x.x');
	});
	it('^5.5 -> 5.x.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^5.5')).toBe('5.x.x');
	});
	it('^0.5 -> 0.5.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^0.5')).toBe('0.5.x');
	});
	it('^005.5.5 -> 005.x.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^005.5.5')).toBe('005.x.x');
	});
	it('^hello -> ^hello', () => {
		expect(gulpPackageVersionFormat.versionFormat('^hello')).toBe('^hello');
	});
	it('^5.5.5,X -> 5.X.X', () => {
		expect(gulpPackageVersionFormat.versionFormat('^5.5.5','X')).toBe('5.X.X');
	});
	it('^5.5.5,* -> 5.*.*', () => {
		expect(gulpPackageVersionFormat.versionFormat('^5.5.5','*')).toBe('5.*.*');
	});
	it('^5.5.5,test -> 5.x.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('^5.5.5','test')).toBe('5.x.x');
	});
})


describe('Prefix Tilde Test', () => {
	it('~5.5.5 -> ~5.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~5.5.5')).toBe('~5.5.5');
		//expect(gulpPackageVersionFormat.versionFormat('~5.5.5')).toBe('5.5.x');
	});
	it('~5.5.5.5 -> ~5.5.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~5.5.5.5')).toBe('~5.5.5.5');
	});
	it('~0.5.5 -> ~0.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~0.5.5')).toBe('~0.5.5');
		//expect(gulpPackageVersionFormat.versionFormat('~0.5.5')).toBe('0.5.x');
	});
	it('~0.0.5 -> ~0.0.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~0.0.5')).toBe('~0.0.5');
		//expect(gulpPackageVersionFormat.versionFormat('~0.0.5')).toBe('0.0.5');
	});
	it('~5.5.5-alpha -> ~5.5.5-alpha', () => {
		expect(gulpPackageVersionFormat.versionFormat('~5.5.5-alpha')).toBe('~5.5.5-alpha');
		//expect(gulpPackageVersionFormat.versionFormat('~5.5.5-alpha')).toBe('5.5.x');
	});
	it('~0.5.5-alpha -> ~0.5.5-alpha', () => {
		expect(gulpPackageVersionFormat.versionFormat('~0.5.5-alpha')).toBe('~0.5.5-alpha');
		//expect(gulpPackageVersionFormat.versionFormat('~0.5.5-alpha')).toBe('0.5.x');
	});
	it('~0.0.5-alpha -> ~0.0.5-alpha', () => {
		expect(gulpPackageVersionFormat.versionFormat('~0.0.5-alpha')).toBe('~0.0.5-alpha');
		//expect(gulpPackageVersionFormat.versionFormat('~0.0.5-alpha')).toBe('0.0.5-alpha');
	});
	it('~555.555.555 -> ~555.555.555', () => {
		expect(gulpPackageVersionFormat.versionFormat('~555.555.555')).toBe('~555.555.555');
		//expect(gulpPackageVersionFormat.versionFormat('~555.555.555')).toBe('555.555.x');
	});
	it('~5 -> ~5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~5')).toBe('~5');
		//expect(gulpPackageVersionFormat.versionFormat('~5')).toBe('5.x.x');
	});
	it('~5.5 -> ~5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~5.5')).toBe('~5.5');
		//expect(gulpPackageVersionFormat.versionFormat('~5.5')).toBe('5.5.x');
	});
	it('~0.5 -> ~0.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~0.5')).toBe('~0.5');
		//expect(gulpPackageVersionFormat.versionFormat('~0.5')).toBe('0.5.x');
	});
	it('~005.5.5 -> ~005.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~005.5.5')).toBe('~005.5.5');
		//expect(gulpPackageVersionFormat.versionFormat('~005.5.5')).toBe('005.5.x');
	});
	it('~hello -> ~hello', () => {
		expect(gulpPackageVersionFormat.versionFormat('~hello')).toBe('~hello');
	});
	it('~5.5.5,X -> ~5.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~5.5.5','X')).toBe('~5.5.5');
		//expect(gulpPackageVersionFormat.versionFormat('~5.5.5','X')).toBe('5.5.X');
	});
	it('~5.5.5,* -> ~5.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~5.5.5','*')).toBe('~5.5.5');
		//expect(gulpPackageVersionFormat.versionFormat('~5.5.5','*')).toBe('5.5.*');
	});
	it('~5.5.5,test -> ~5.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('~5.5.5','test')).toBe('~5.5.5');
		//expect(gulpPackageVersionFormat.versionFormat('~5.5.5','XtestX')).toBe('5.5.x');
	});
})


describe('Prefix None Test', () => {
	it('5.5.5 -> 5.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('5.5.5')).toBe('5.5.5');
	});
	it('5.5.5.5 -> 5.5.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('5.5.5.5')).toBe('5.5.5.5');
	});
	it('0.5.5 -> 0.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('0.5.5')).toBe('0.5.5');
	});
	it('0.0.5 -> 0.0.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('0.0.5')).toBe('0.0.5');
	});
	it('5.5.5-alpha -> 5.5.5-alpha', () => {
		expect(gulpPackageVersionFormat.versionFormat('5.5.5-alpha')).toBe('5.5.5-alpha');
	});
	it('0.5.5-alpha -> 0.5.5-alpha', () => {
		expect(gulpPackageVersionFormat.versionFormat('0.5.5-alpha')).toBe('0.5.5-alpha');
	});
	it('0.0.5-alpha -> 0.0.5-alpha', () => {
		expect(gulpPackageVersionFormat.versionFormat('0.0.5-alpha')).toBe('0.0.5-alpha');
	});
	it('555.555.555 -> 555.555.555', () => {
		expect(gulpPackageVersionFormat.versionFormat('555.555.555')).toBe('555.555.555');
	});
	it('5 -> 5', () => {
		expect(gulpPackageVersionFormat.versionFormat('5')).toBe('5');
		//expect(gulpPackageVersionFormat.versionFormat('5')).toBe('5.x.x');
	});
	it('5.5 -> 5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('5.5')).toBe('5.5');
		//expect(gulpPackageVersionFormat.versionFormat('5.5')).toBe('5.5.x');
	});
	it('0.5 -> 0.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('0.5')).toBe('0.5');
		//expect(gulpPackageVersionFormat.versionFormat('0.5')).toBe('0.5.x');
	});
	it('005.5.5 -> 005.5.5', () => {
		expect(gulpPackageVersionFormat.versionFormat('005.5.5')).toBe('005.5.5');
	});
	it('hello -> hello', () => {
		expect(gulpPackageVersionFormat.versionFormat('hello')).toBe('hello');
	});
	it('5.x.x,X -> 5.X.X', () => {
		expect(gulpPackageVersionFormat.versionFormat('5.x.x','X')).toBe('5.X.X');
	});
	it('5.x.x,* -> 5.*.*', () => {
		expect(gulpPackageVersionFormat.versionFormat('5.x.x','*')).toBe('5.*.*');
	});
	it('5.X.X,test -> 5.x.x', () => {
		expect(gulpPackageVersionFormat.versionFormat('5.X.X','test')).toBe('5.x.x');
	});
})
