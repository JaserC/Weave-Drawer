import * as assert from 'assert';
import { List, nil, cons, explode_array } from './list';
import { Color } from './color';
import { leave, replace, weave } from './weave';


describe('weave', function() {

  it('leave - even length', function() {
    // 0-1-many: 0 iterations
    assert.deepEqual(leave(nil, "red"), nil);
    assert.deepEqual(leave(nil, "purple"), nil);
    // 0-1-many: 1 iteration
    assert.deepEqual(leave(cons("red", cons("green", nil)), "purple"),
        cons("red", cons("purple", nil)));
    assert.deepEqual(leave(cons("blue", cons("yellow", nil)), "blue"),
        cons("blue", cons("blue", nil)));
    // 0-1-many: 2+ iterations
    assert.deepEqual(
        leave(cons("green", cons("red", cons("yellow", cons("blue", nil)))), "purple"),
        cons("green", cons("purple", cons("yellow", cons("purple", nil)))));
    assert.deepEqual(
        leave(cons("red", cons("green", cons("purple", cons("green", cons("blue", cons("yellow", nil)))))), "orange"),
        cons("red", cons("orange", cons("purple", cons("orange", cons("blue", cons("orange", nil)))))));
  });

  it('replace - even length', function() {
    // 0-1-many: 0 iterations
    assert.deepEqual(replace(nil, "red"), nil);
    assert.deepEqual(leave(nil, "blue"), nil);
    // 0-1-many: 1 iteration
    assert.deepEqual(replace(cons("red", cons("green", nil)), "yellow"),
        cons("yellow", cons("green", nil)));
    assert.deepEqual(replace(cons("blue", cons("green", nil)), "purple"),
        cons("purple", cons("green", nil)));
    // 0-1-many: 2+ iterations
    assert.deepEqual(
        replace(cons("green", cons("red", cons("yellow", cons("blue", nil)))), "orange"),
        cons("orange", cons("red", cons("orange", cons("blue", nil)))));
    assert.deepEqual(
        replace(cons("red", cons("green", cons("purple", cons("green", cons("blue", cons("yellow", nil)))))), "purple"),
        cons("purple", cons("green", cons("purple", cons("green", cons("purple", cons("yellow", nil)))))));
  });

  it('leave - odd length', function() {
    assert.deepEqual(
        leave(cons("red", nil), "purple"),
        cons("red", nil));
    assert.deepEqual(
        leave(cons("green", nil), "red"),
        cons("green", nil));
    assert.deepEqual(
        leave(cons("blue", cons("red", cons("yellow", nil))), "purple"),
        cons("blue", cons("purple", cons("yellow", nil))));
    assert.deepEqual(
        leave(cons("green", cons("red", cons("orange", nil))), "orange"),
        cons("green", cons("orange", cons("orange", nil))));
    assert.deepEqual(
        leave(cons("green", cons("green", cons("blue", cons("green", cons("green", nil))))), "blue"),
        cons("green", cons("blue", cons("blue", cons("blue", cons("green", nil))))));
    assert.deepEqual(
        leave(cons("red", cons("green", cons("blue", cons("yellow", cons("purple", nil))))), "orange"),
        cons("red", cons("orange", cons("blue", cons("orange", cons("purple", nil))))));
  });

  it('replace - odd length', function() {
    assert.deepEqual(replace(cons("red", nil), "orange"),
        cons("orange", nil));
    assert.deepEqual(replace(cons("orange", nil), "purple"),
        cons("purple", nil));
    assert.deepEqual(
        replace(cons("blue", cons("green", cons("yellow", nil))), "purple"),
        cons("purple", cons("green", cons("purple", nil))));
    assert.deepEqual(
        replace(cons("blue", cons("blue", cons("yellow", nil))), "yellow"),
        cons("yellow", cons("blue", cons("yellow", nil))));
    assert.deepEqual(
        replace(cons("red", cons("green", cons("blue", cons("yellow", cons("purple", nil))))), "orange"),
        cons("orange", cons("green", cons("orange", cons("yellow", cons("orange", nil))))));
    assert.deepEqual(
        replace(cons("red", cons("orange", cons("yellow", cons("green", cons("blue", nil))))), "purple"),
        cons("purple", cons("orange", cons("purple", cons("green", cons("purple", nil))))));
  });

  it('weave', function() {
    const colors: List<Color> = cons("red", cons("orange", cons("yellow", nil)));
    const colors2: List<Color> = cons("purple", cons("blue", cons("green", cons("blue", nil))));
    // 0-1-many: 0 iterations, i = rows branch
    assert.deepEqual(weave(0n, colors, "purple"), nil);
    assert.deepEqual(weave(0n, colors2, "blue"), nil);
    // 0-1-many: 0 iterations, i = 1 branch
    assert.deepEqual(weave(1n, colors, "purple"), explode_array([
        cons("purple", cons("orange", cons("purple", nil)))
      ]));
    assert.deepEqual(weave(1n, colors2, "red"), explode_array([
        cons("red", cons("blue", cons("red", cons("blue", nil))))
      ]));
    // 0-1-many: 1 iteration, even i
    assert.deepEqual(weave(2n, colors, "purple"), explode_array([
        cons("purple", cons("orange", cons("purple", nil))),
        cons("red", cons("purple", cons("yellow", nil)))
      ]));
    assert.deepEqual(weave(2n, colors2, "red"), explode_array([
        cons("red", cons("blue", cons("red", cons("blue", nil)))),
        cons("purple", cons("red", cons("green", cons("red", nil))))
      ]));
    // 0-1-many: 1 iteration, odd i
    assert.deepEqual(weave(3n, colors, "purple"), explode_array([
        cons("purple", cons("orange", cons("purple", nil))),
        cons("red", cons("purple", cons("yellow", nil))),
        cons("purple", cons("orange", cons("purple", nil)))
      ]));
    assert.deepEqual(weave(3n, colors2, "green"), explode_array([
        cons("green", cons("blue", cons("green", cons("blue", nil)))),
        cons("purple", cons("green", cons("green", cons("green", nil)))),
        cons("green", cons("blue", cons("green", cons("blue", nil)))),
      ]));
    // 0-1-many: 2+ iterations
    assert.deepEqual(weave(5n, colors, "green"), explode_array([
        cons("green", cons("orange", cons("green", nil))),
        cons("red", cons("green", cons("yellow", nil))),
        cons("green", cons("orange", cons("green", nil))),
        cons("red", cons("green", cons("yellow", nil))),
        cons("green", cons("orange", cons("green", nil)))
      ]));
    assert.deepEqual(weave(6n, colors2, "yellow"), explode_array([
        cons("yellow", cons("blue", cons("yellow", cons("blue", nil)))),
        cons("purple", cons("yellow", cons("green", cons("yellow", nil)))),
        cons("yellow", cons("blue", cons("yellow", cons("blue", nil)))),
        cons("purple", cons("yellow", cons("green", cons("yellow", nil)))),
        cons("yellow", cons("blue", cons("yellow", cons("blue", nil)))),
        cons("purple", cons("yellow", cons("green", cons("yellow", nil))))
      ]));
  });

});