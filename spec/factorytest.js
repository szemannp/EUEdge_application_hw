describe('Config factory', function() {
  var Config;

  beforeEach(angular.mock.module('personsList'));

  beforeEach(inject(function(_Config_) {
    Config = _Config_;
  }));

  it('should exist', function() {
    expect(Config).toBeDefined();
  });
});

describe('Config factory', function() {
  var Config;

  beforeEach(angular.mock.module('personsList'));

  beforeEach(inject(function(_Config_) {
    Config = _Config_;
  }));

  it('should contain', function() {
    expect(JSON.stringify(Config)).toContain(JSON.stringify({
      filePath: '../../persons.json'
    }));
  });
});

describe('ListService factory', function() {
  var factory;
  beforeEach(function() {
    module('personsList');
    inject(function($injector) {
      factory = $injector.get('ListService');
    });
  });

  describe('personsList', function() {
    it('should exist', function() {
      expect(factory).toBeDefined()
    });
  });
});
