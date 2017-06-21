import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import Base from '../Base.jsx';
import style from './style.scss';


const type = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

class Toggles extends React.Component {
  onClick(toggle, index) {
    this.props.onChange(toggle.label, index);
  }

  onKeyDown(event, toggle, index) {
    if (event.keyCode === 13 /* enter */) {
      this.onClick(toggle, index);
    }
  }

  render() {
    return (
      <ul className={style.toggles} role="tablist">
        { _.map(this.props.items, (toggle, index) => {
          const toggleClasses = cx(style.toggle, {
            [style.active]: (this.props.selectedIndex === index ||
                             this.props.selectedLabel === toggle.label),
            [style.disabled]: this.props.items[index].disabled,
            [style.horizontal]: this.props.type === type.HORIZONTAL,
            [style.vertical]: this.props.type === type.VERTICAL,
          });

          return (
            <li
              role="tab"
              onClick={() => this.onClick(toggle, index)}
              onKeyDown={(event) => this.onKeyDown(event, toggle, index)}
              className={toggleClasses}
              key={index}
              type={this.props.type}
            >
              { toggle.title }
            </li>
          );
        })}
      </ul>
    );
  }
}

Toggles.defaultProps = {
  items: [],
  type: type.HORIZONTAL,
  onChange: () => { },
};

Toggles.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number,
  selectedLabel: PropTypes.string,
  type: PropTypes.string,
};

Toggles.displayName = 'Toggles';

export default Base(Toggles);