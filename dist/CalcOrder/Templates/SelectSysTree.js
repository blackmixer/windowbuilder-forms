import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
const {
  cch: {
    properties
  },
  cat: {
    property_values_hierarchy: vh
  }
} = $p;
const hierarchy = properties.predefined('sys_hierarchy');
const defaultExpanded = vh.find_rows({
  owner: hierarchy,
  parent: vh.get()
}).map(v => v.ref);

const renderItems = parent => {
  if (!parent) {
    parent = vh.get();
  }

  return vh.find_rows({
    owner: hierarchy,
    parent
  }).map(v => {
    return /*#__PURE__*/React.createElement(TreeItem, {
      key: v.ref,
      nodeId: v.ref,
      label: v.name
    }, renderItems(v));
  });
};

var _ref = /*#__PURE__*/React.createElement(ExpandMoreIcon, null);

var _ref2 = /*#__PURE__*/React.createElement(ChevronRightIcon, null);

export default function SelectSysTree({
  group,
  set_group
}) {
  return /*#__PURE__*/React.createElement(TreeView, {
    defaultCollapseIcon: _ref,
    defaultExpandIcon: _ref2,
    defaultExpanded: defaultExpanded,
    onNodeSelect: set_group,
    selected: group
  }, renderItems());
}