import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {getHomes} from "../redux/reducer";
import {Header} from "react-native-elements";
import PriceSlider from "./PriceSlider";
import ViewDetails from "./ViewDetails";
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

  },
  item: {
    display: 'flex',
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginTop: 10,
    backgroundColor: '#f5ffdb'
  },
  cell: {
    display: 'flex',
    justifyContent: 'center'
  },
  id:{
    flexDirection: 'row',
    marginLeft: 'auto',
    fontWeight: 'bold',
    color: '#888a8c',
    fontSize: 10
  },
  title: {
    fontSize: 18,

  },
  price: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    color: '#00C146'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

class HomeList extends Component {

  renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableWithoutFeedback onPress={() => this.openDetails(item)}>
          <View style={styles.cell}>
            <Text style={styles.id}>{'#'}{item.id}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.pricePerMonth}{item.currencySymbol}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      showFilter: true,
      showDetails: false,
      selectedItem: {},
      currentHomeList: [],
      ascPrice: true,
      range: [],
      filteredRange: []
    };
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentWillMount() {
    this.props.getHomes();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.homes.length !== 0) {
      this.setState({filteredRange: this.getOriginalRange(nextProps.homes)});
    }
  }

  onClearFilter() {
    const {homes} = this.props;
    this.setState({filteredRange: this.getOriginalRange(homes)})
    // TimerMixin.setTimeout(() => {
    //   this.props.store.dispatch(actionCreators.clearFilter(range))
    // }, 500);
  }

  onFilter() {
    const {homes} = this.props;
    const {filteredRange, ascPrice} = this.state;
    if (homes.length !== 0) {

      let filtered = homes.filter((home) => home.pricePerMonth >= filteredRange[0] && home.pricePerMonth <= filteredRange[1])
      return _.orderBy(filtered, 'pricePerMonth', ascPrice ? 'asc' : 'desc')

    } else {
      return [];
    }
  }


  getOriginalRange(homes) {
    // const {homes} = this.props;
    const maxPriceHome = _.maxBy(homes, 'pricePerMonth');
    const minPriceHome = _.minBy(homes, 'pricePerMonth');
    // console.log('maxPriceHome', maxPriceHome)

    return [minPriceHome.pricePerMonth, maxPriceHome.pricePerMonth];
  }

  render() {
    const {homes} = this.props;
    const {showDetails, showFilter, selectedItem, filteredRange} = this.state;
    const data = this.onFilter();
    // const range = this.getOriginalRange(homes);
    const canRender = (homes.length !== 0);
    // const filteredList = this.onFilter();
    // const sortedHomes_.sortBy(homes, 'pricePerMonth'));
    // console.log('currentHomeList', currentHomeList)


    return (
      <View>
        {canRender ?
          <View>
            {showDetails ?
              <View style={styles.details}>
                <ViewDetails
                  goBack={this.closeDetails.bind(this)}
                  details={selectedItem}
                />
              </View>
              :
              <View>
                <Header
                  backgroundColor={'#00BD95'}
                  centerComponent={{text: '[spotahome]', style: {color: '#fff'}}}
                  rightComponent={{icon: 'filter-list', color: '#fff', onPress: this.showFilter.bind(this)}}
                />
                {showFilter ?
                  <PriceSlider
                    onFilterChange={value => this.onFilterChange(value)}
                    onClearFilter={range => this.onClearFilter(range)}
                    onChangeOrder={this.onChangeOrder.bind(this)}
                    rangePrice={this.getOriginalRange(homes)}
                    currency={data.length ? data[0].currencySymbol : '€'}
                  />
                  : null}
                <FlatList
                  styles={styles.container}
                  data={data}
                  renderItem={this.renderItem}
                />

              </View>
            }
          </View>
          :
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </View>
    );
  }

  closeDetails() {
    this.setState({showDetails: false});
  }

  openDetails(item) {
    this.setState({showDetails: true, showFilter: false, selectedItem: item});
  }

  showFilter() {
    const {showFilter} = this.state;
    this.setState({showFilter: !showFilter});
  }

  onFilterChange(value) {
    this.setState({filteredRange: value});
  }

  onChangeOrder() {
    const { ascPrice } = this.state;
    this.setState({ascPrice: !ascPrice});
  }

  handleBackPress() {
    this.state.showDetails ? this.setState({ showDetails: false}) : null;
  }
}

const mapStateToProps = state => {
  let storedHomes = [];
  storedHomes = state.homes.map(home => ({key: home.id.toString(), ...home}));
  return {
    homes: storedHomes
  };
};

const mapDispatchToProps = {
  getHomes
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeList);
