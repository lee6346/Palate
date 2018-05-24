import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDistance, setPrice, setSort, setAddress, setKeywords } from '../actions/filters';
import { showAdvancedFilters } from '../actions/ui';
import { retrieveMenus } from '../actions/menus';
import AdvancedFilters from '../components/AdvancedFilters';
import { TextInput } from '../../components/inputs';
import { IconButton } from '../../components/buttons';

class Search extends Component {
  componentDidUpdate(prev) {
    const { lat: prevLat, lng: prevLng } = prev.coordinates;
    const { lat, lng } = this.props.coordinates;
    if (!(lat === prevLat && lng === prevLng)) {
      const { filters, offset, limit } = this.props;
      this.props.retrieveMenus({ lat, lng, ...filters, offset, limit });
    }
  }
  handleSearchUpdate() {
    const { filters, coordinates, offset, limit } = this.props;

    this.props.retrieveMenus({ ...coordinates, ...filters, offset, limit });
  }

  handleSortChange(sort) {
    this.props.setSort(sort);
  }

  handleDistanceChange(distance) {
    this.props.setDistance(distance);
  }

  handlePriceChange(price) {
    this.props.setPrice(price);
  }

  handleAddressChange(address) {
    this.props.setAddress(address);
  }

  handleKeywordsChange(keywords) {
    this.props.setKeywords(keywords);
  }

  handleFilterDisplay() {
    this.props.showAdvancedFilters(!this.props.showFilters);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <TextInput
              placeholder="Key words"
              className="form-control"
              value={this.props.filters.keywords}
              handleInputChange={this.handleKeywordsChange.bind(this)}
            />
          </div>
          <div className="col-md-5">
            <TextInput
              placeholder="Address"
              className="form-control"
              value={this.props.filters.address}
              handleInputChange={this.handleAddressChange.bind(this)}
            />
          </div>
          <div className="col-md-2">
            <IconButton
              icon="search"
              type="button"
              className="btn btn-primary"
              text="Search"
              handleButtonClick={this.handleSearchUpdate.bind(this)}
            />
          </div>
        </div>
        <div className="row">
          <IconButton
            icon="search"
            type="button"
            className="btn btn-secondary"
            text={this.props.showFilters ? 'Hide Filters' : 'Show Filters'}
            handleButtonClick={this.handleFilterDisplay.bind(this)}
          />
        </div>
        {this.props.showFilters ? (
          <AdvancedFilters
            handlePriceChange={this.handlePriceChange.bind(this)}
            handleDistanceChange={this.handleDistanceChange.bind(this)}
            handleSortChange={this.handleSortChange.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { filters, coordinates, menus: { offset, limit }, ui: { showFilters } } = state.caterSearch;
  return {
    filters,
    coordinates,
    offset,
    limit,
    showFilters,
  };
}
export default connect(mapStateToProps, {
  setDistance,
  setPrice,
  setSort,
  setAddress,
  setKeywords,
  showAdvancedFilters,
  retrieveMenus,
})(Search);