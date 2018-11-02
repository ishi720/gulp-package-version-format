const gulpPackageVersionFormat = require('./../index');


it('^5.5.5 -> 5.x.x', () => {
	expect(gulpPackageVersionFormat.versionFormat('^5.5.5')).toBe('5.x.x');
})
it('^0.5.5 -> 0.5.x', () => {
	expect(gulpPackageVersionFormat.versionFormat('^0.5.5')).toBe('0.5.x');
})
it('^0.0.5 -> 0.0.5', () => {
	expect(gulpPackageVersionFormat.versionFormat('^0.0.5')).toBe('0.0.5');
})
it('5.5.5 -> 5.5.5', () => {
	expect(gulpPackageVersionFormat.versionFormat('5.5.5')).toBe('5.5.5');
})
it('^5.5.5-alpha -> ^5.5.5-alpha', () => {
	expect(gulpPackageVersionFormat.versionFormat('^5.5.5-alpha')).toBe('^5.5.5-alpha');
})
it('~5.5.5 -> ~5.5.5', () => {
	expect(gulpPackageVersionFormat.versionFormat('~5.5.5')).toBe('~5.5.5');
})
it('^555.555.555 -> 555.x.x', () => {
	expect(gulpPackageVersionFormat.versionFormat('^555.555.555')).toBe('555.x.x');
})
it('^5 -> ^5', () => {
	expect(gulpPackageVersionFormat.versionFormat('^5')).toBe('^5');
})
it('^005.5.5 -> 005.x.x', () => {
	expect(gulpPackageVersionFormat.versionFormat('^005.5.5')).toBe('005.x.x');
})
it('hello -> hello', () => {
	expect(gulpPackageVersionFormat.versionFormat('hello')).toBe('hello');
})