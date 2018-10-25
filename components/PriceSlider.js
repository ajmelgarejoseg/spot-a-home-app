import React, { Component, PropTypes } from 'react'
import {View, StyleSheet, TouchableOpacity, ScrollView, Button} from 'react-native'
import MultiSlider from "@ptomasroos/react-native-multi-slider/MultiSlider";
import {Text} from "react-native-elements";

const styles = StyleSheet.create({
  priceWrapper: {

    backgroundColor: 'antiquewhite',
    display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // height: 100,
    // width: '100%',
    // borderWidth: 2,
    // borderColor: 'black',
  },

  multiSlider: {
    marginLeft: 50,
    marginTop: 20,
  },
  inner: {
    flex: 1,
    margin: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
})

class PriceSlider extends Component {

  constructor(props) {
    super(props);
    const { rangePrice } = this.props;
    this.state = {
      filterValue: rangePrice
    };
  }
  // componentDidMount() {
  //   // this.setState({filterValue: this.formatIndex(this.state.filterValue)});
  // }

  valueChange(value) {
    // this.props.onFilterChange(this.state.filterValue)
    // console.log('value', value);
    this.setState({filterValue: value});
  }

  onClearButton() {
    // console.log(this.state.filterValue);
    this.props.onClearFilter();
    this.setState({filterValue: this.props.rangePrice});
  }

  onApplyButton() {
    this.props.onFilterChange(this.state.filterValue)
  }

  render() {
    console.log('rangePrice', this.props.rangePrice);
    const { rangePrice } = this.props;
    return (
      <View style={styles.priceWrapper}>
        <View style={styles.multiSlider}>
          <MultiSlider
            sliderLength={200}
            onValuesChange={(value) => this.valueChange(value)}
            values={rangePrice}
            min={rangePrice[0]}
            max={rangePrice[1]}
          />
        </View>
        <View>
          <Text>
            {this.state.filterValue[0] + ' - ' + this.state.filterValue[1]}
          </Text>
          <View>
            <Button
              onPress={this.onClearButton.bind(this)}
              title={'CLEAR'}
            />
            <Button
              onPress={this.onApplyButton.bind(this)}
              title={'APPLY'}
            />
          </View>


        </View>
      </View>
    )
  }

  // formatIndex(arr) {
  //   const { rangePrice } = this.props;
  //
  //   return [(rangePrice[0] + arr[0]*5), (300 + arr[1]*5)];
  // }
}
export default PriceSlider;
