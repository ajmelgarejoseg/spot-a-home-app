import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {actionCreators, getHomes} from "../redux/reducer";


class HomeList extends Component {


  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  // }

  filterHome = (range) => {
    console.log('inside filterHome inHomelist')
    // console.log(this.props.store);
    console.log(this.props.dispatch);
    const {store} = this.props;
    range = {minPrice: 45, maxPrice: 425};
    store.dispatch(actionCreators.filterHome(range))
  }


  renderItem = ({item}) => (
    <View style={styles.item}>

      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
      <Text>{item.pricePerMonth}</Text>

      <Button
        onPress={this.filterHome}
        title="Learn More"
        color="#841584"
        accessibilityLabel="filter"
      />


    </View>
  );

  componentDidMount() {
    this.props.getHomes();
  }

  render() {
    const {homes} = this.props;
    return (
      <FlatList
        styles={styles.container}
        data={homes}
        renderItem={this.renderItem}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

const mapStateToProps = state => {
  console.log('hola')
  // console.log(state)
  let storedHomes = [];
  // console.log(state.repos);
  if (state.homes.data) {
    console.log('load!!!!!!!!!!!!!')
    storedHomes = state.homes.data.homecards.map(home => ({key: home.id, ...home}));
    // console.log(storedHomes.data.homecards);
  }

  return {
    homes: storedHomes
  };
};

const mapDispatchToProps = {
  getHomes
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeList);
