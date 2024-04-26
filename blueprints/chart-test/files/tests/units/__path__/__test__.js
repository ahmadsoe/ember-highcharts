import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('<%= dasherizedModuleName %>', '<%= camelizedModuleName %>', {
  needs: [ 'component:high-charts' ]
});

test('it renders', function(assert) {
  // creates the component instance
  let component = this.subject();
  assert.strictEqual(component._state, 'preRender');

  // appends the component to the page
  this.render(assert);
  assert.strictEqual(component._state, 'inDOM');
});
