import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ViewDetails from "../components/ViewDetails";
const tree = renderer.create(<ViewDetails />).toJSON();

let findElement=function(tree, element) {
  return tree.children.find((child) => child.props.testID === element)
};

it('main component has 2 children', () => {
  expect(tree.children.length).toBe(2);
});

it('card has 3 children', () => {
  expect(findElement(tree, 'card').children.length).toBe(1);
});
