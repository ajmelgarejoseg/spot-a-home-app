import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider/MultiSlider';
import {Button, Icon, Text} from 'react-native-elements';

const styles = StyleSheet.create({
  priceWrapper: {
    backgroundColor: '#e8fce6',
    display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // height: 100,
    // width: '100%',
    // borderWidth: 2,
    // borderColor: 'black',
  },
  priceRange: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeText: {
    fontWeight: 'bold',
    color: '#00C146',
    fontSize: 30
  },

  multiSlider: {
    // marginLeft: 50,
    // marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    margin: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#00C146',
    // color: '#00C146',
    borderWidth: 1,
    borderRadius: 15,
    // borderColor: '#ddd',
    // maxWidth: '20%'
    // color: '#4a6423'
  }
})

class PriceSlider extends Component {

  constructor(props) {
    super(props);
    const {rangePrice} = this.props;
    this.state = {
      filterValue: rangePrice,
      ascPrice: true,
    };
  }

  valueChange(value) {
    this.setState({filterValue: value});
  }

  onClearButton() {
    this.props.onClearFilter();
    this.setState({filterValue: this.props.rangePrice});
  }

  onApplyButton() {
    this.props.onFilterChange(this.state.filterValue)
  }

  onChangeOrder() {
    const {ascPrice} = this.state;
    this.setState({ascPrice: !ascPrice});
    this.props.onChangeOrder();
  }

  render() {
    // console.log('rangePrice', this.props.rangePrice);
    const {rangePrice, currency} = this.props;
    const {filterValue, ascPrice} = this.state;
    return (
      <View style={styles.priceWrapper}>
        <View style={styles.priceRange}>
          <Text style={styles.rangeText}>
            {filterValue[0] + currency  + ' - ' + filterValue[1] + currency}
          </Text>
        </View>
        <View style={styles.multiSlider}>
          <MultiSlider
            sliderLength={280}
            onValuesChange={(value) => this.valueChange(value)}
            values={filterValue}
            min={rangePrice[0]}
            max={rangePrice[1]}
          />
        </View>
        <View>
          <View style={styles.buttonWrapper}>
            <Button
              textStyle={{ color: '#00C146' }}
              buttonStyle={styles.button}
              onPress={this.onClearButton.bind(this)}
              title={'CLEAR'}
            />
            <Button
              textStyle={{ color: '#00C146' }}
              buttonStyle={styles.button}
              onPress={this.onApplyButton.bind(this)}
              title={'APPLY'}
            />
            {ascPrice ?
              <Button
                textStyle={{ color: '#00C146' }}
                buttonStyle={styles.button}
                onPress={this.onChangeOrder.bind(this)}
                title={'DESC'}
              />
              :
              <Button
                textStyle={{ color: '#00C146' }}
                buttonStyle={styles.button}
                onPress={this.onChangeOrder.bind(this)}
                title={'ASC'}
              />

            }
          </View>
        </View>
      </View>
    )
  }
}

export default PriceSlider;
