import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PriceSlider from "../components/PriceSlider";
const tree = renderer.create(<PriceSlider />).toJSON();

let findElement=function(tree, element) {
  return tree.children.find((child) => child.props.testID === element)
};

it('main component has 3 children', () => {
  expect(tree.children.length).toBe(3);
});

it('price range has 1 children', () => {
  expect(findElement(tree, 'priceRange').children.length).toBe(1);
});

it('multiSlider has 1 children', () => {
  expect(findElement(tree, 'multiSlider').children.length).toBe(1);
});

it('button wrapper has 3 children', () => {
  expect(findElement(tree, 'buttonWrapper').children.length).toBe(3);
});


it('exists priceRange', () => {
  expect(findElement(tree, 'priceRange')).toBeTruthy();
});

it('exists multiSlider', () => {
  expect(findElement(tree, 'multiSlider')).toBeTruthy();
});

it('exists buttonWrapper', () => {
  expect(findElement(tree, 'buttonWrapper')).toBeTruthy();
});

