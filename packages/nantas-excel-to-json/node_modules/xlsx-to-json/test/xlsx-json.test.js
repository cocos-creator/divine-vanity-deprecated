var should = require('should');
var xlsx2json = require('../');
var fs = require('fs')

describe('xlsx to json', function() {

	it('should convert xlsx to json', function() {
		xlsx2json({
			input: './sample/interview.xlsx',
			output: null
		}, function(err, result) {
			should.not.exist(err)
			result.should.be.an.instanceOf(Object)
		})
	})

	it('should convert xlsx to json file', function() {
		xlsx2json({
			input: './sample/interview.xlsx',
			output: './sample/test.json'
		}, function(err, result) {
			should.not.exist(err)
			result.should.be.an.instanceOf(Object)
		})

	})

	it('should exist test.json', function() {
		var exist = fs.existsSync('./sample/test.json')
		exist.should.be.true;
	})
		

})
