
exports.config = {
 
  specs: ['../test/e2e/**/*.js'],

  onPreoare: function() {
    browser.get('http://localhost:3000');
  }

};