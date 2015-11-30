'use strict';

var React = require('react-native');
var styles = require('./styles.js');

var {
  Component,
  View,
  TouchableWithoutFeedback
} = React;

var childrenforEach = React.Children.forEach;

function noop() {}

class Tabbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var props = this.props;
    var itemList = [];
    childrenforEach(props.children, (item) => {
      var selected = item.props.name == props.selected;
      childrenforEach(item.props.children, (node, index) => {
        node = React.addons.cloneWithProps(node, {
          key: item.props.name,
          selected: selected,
          onPress: () => { props.onTabItemPress(item.props.name) }
        });

        itemList.push(node);
      });
    });

    return (
      <View style={styles.container}>
        <View style={[styles.tabbarView, { height: props.tabHeight }]}>
          {itemList}
        </View>
      </View>
    );
  }
}

Tabbar.propTypes = {
  selected: React.PropTypes.string,
  onTabItemPress: React.PropTypes.func,
  tabHeight: React.PropTypes.number
};

Tabbar.defaultProps = {
  selected: '',
  onTabItemPress: noop,
  tabHeight: 50
};

class Item extends Component {
  constructor(props) {
    super(props);
  }
}

Item.propTypes = {
  name: React.PropTypes.string.isRequired
};

class Icon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var props = this.props;
    var itemList = [];

    childrenforEach(props.children, (node, index) => {
      node = React.cloneElement(node, {
        style: (props.selected) ? node.props.selectedStyle : node.props.defaultStyle
      });
      console.log(node.props.style);
      itemList.push(node);
    });

    return (
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.iconView}>
          {itemList}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Icon.propTypes = {
  onPress: React.PropTypes.func,
  selectedStyle: React.PropTypes.style,
  defaultStyle: React.PropTypes.style
};

Icon.defaultProps = {
  onPress: noop,
};

Item.Icon = Icon;
Tabbar.Item = Item;

module.exports = Tabbar;
