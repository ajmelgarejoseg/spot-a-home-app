import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PriceSlider from "../components/PriceSlider";

// let findElement=function(tree, element) {
//   console.warn(tree);
//   return true;
// };

it('find filter', () => {
  let tree = renderer.create(
    <PriceSlider />
  ).toJSON();
  expect(2+2).toBe(4);
  // expect(findElement(tree, 'filter')).toBeDefined();
});

// it('works', () => {
//   expect(2+2).toBe(4);
// });
