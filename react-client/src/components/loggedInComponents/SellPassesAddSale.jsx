import React from 'react';
import $ from 'jquery';

class SellPassesAddSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addSalePrice: '',
      addSaleDateStart: '',
      addSaleDateEnd: '',
      addSaleQuantity: '',
      addSaleAddRestricted: '',
      addSaleRestrictedSelect: [],
      showAdd: false,
      existingRestricted: []
    };
    this.handleAddSale = this.handleAddSale.bind(this);
    this.toggleShowAdd = this.toggleShowAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.getRestricted = this.getRestricted.bind(this);
    this.addRestricted = this.addRestricted.bind(this);
    this.handleCancelPost = this.handleCancelPost.bind(this);
  }
  
  componentDidMount() {
    this.getRestricted();
  }

  toggleShowAdd() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleChangeSelect(event) {
    const selected = [...event.target.options].filter(option => option.selected).map(option => option.value);
    this.setState({
      addSaleRestrictedSelect: selected
    });
  }

  
  handleAddSale() {
    const forSaleBlock = {
      price: this.state.addSalePrice,
      dateStart: this.state.addSaleDateStart,
      dateEnd: this.state.addSaleDateEnd,
      quantity: this.state.addSaleQuantity,
      restrictedSelect: this.state.addSaleRestrictedSelect
    };

    $.ajax({
      url: '/pass/new',
      method: 'POST',
      data: JSON.stringify(forSaleBlock),
      contentType: 'application/json',
      context: this,
      success: (data) => {
        console.log('POST /pass/new SUCCEEDED: ', data);
        this.props.getInfo();
        this.setState({
          addSalePrice: '',
          addSaleDateStart: '',
          addSaleDateEnd: '',
          addSaleQuantity: '',
          addSaleAddRestricted: '',
          addSaleRestrictedSelect: [],
          showAdd: false
        });
      },
      error: (err) => {
        console.log('POST /pass/new FAILED');
      }
    });
  }

  handleCancelPost() {
    this.setState({
      addSalePrice: '',
      addSaleDateStart: '',
      addSaleDateEnd: '',
      addSaleQuantity: '',
      addSaleAddRestricted: '',
      addSaleRestrictedSelect: [],
      showAdd: false
    });
  }

  getRestricted() {
    $.ajax({
      url: '/user/restricted',
      method: 'GET',
      context: this,
      success: (data) => {
        console.log('GET /user/restricted SUCCEEDED');
        this.setState({
          existingRestricted: data
        });
      },
      error: (err) => {
        console.log('GET /user/restricted FAILED');
      }
    });
  }

  addRestricted() {
    if (this.state.existingRestricted.map(({ studio }) => studio.toLowerCase()).includes(this.state.addSaleAddRestricted.toLowerCase())) {
      console.warn('Studio name already exists');
    } else {
      $.ajax({
        url: '/user/restricted',
        method: 'POST',
        data: JSON.stringify({studio: this.state.addSaleAddRestricted}),
        contentType: 'application/json',
        context: this,
        success: (data) => {
          console.log('POST /user/restricted SUCCEEDED');
          this.setState({addSaleAddRestricted: ''});
          this.getRestricted();
        },
        error: (err) => {
          console.log('POST /user/restricted FAILED: ', err);
        }
      });
    }
  }
  
  render() {
    let addSaleRow;
    if (this.state.showAdd) {
      addSaleRow = (
        <div className="sellPassesAddSale">
          <div className="row addSaleRow"><h2 className="col">Add a Group of Passes For Sale</h2></div>
          <div className="row addSaleRow"><h4 className="col">You may create multiple sale groups. Each of these is for a group of passes in a date range.</h4></div>
          <div className="row addSaleRow">
            <div className="addSaleSearchInput col-sm">
              <label htmlFor="addSaleDateStart">Passes are valid starting on:</label>
              <input 
                type="date"
                className="form-control"
                id="addSaleDateStart"
                placeholder="mm/dd/yyyy"
                value={this.state.addSaleDateStart} 
                onChange={this.handleChange} 
                required />
            </div>
            <div className="addSaleSearchInput col-sm">
              <label htmlFor="addSaleDateEnd">Passes are valid until:</label>
              <input 
                type="date"
                className="form-control"
                id="addSaleDateEnd"
                placeholder="mm/dd/yyyy"
                value={this.state.addSaleDateEnd} 
                onChange={this.handleChange} required />
            </div>
          </div>
          <div className="row addSaleRow">
            <div className="addSaleSearchInput col-sm">
              <label htmlFor="addSalePrice">Price Per Pass:</label>
              <input 
                type="number"
                min="0"
                step="0.01"
                className="form-control"
                id="addSalePrice"
                placeholder="e.g. 4.50"
                value={this.state.addSalePrice} 
                onChange={this.handleChange} 
                required />
            </div>
            <div className="addSaleSearchInput col-sm">
              <label htmlFor="addSaleQuantity">Number of Passes:</label>
              <input 
                type="number"
                min="1"
                step="1"
                className="form-control"
                id="addSaleQuantity"
                placeholder="e.g. 3"
                value={this.state.addSaleQuantity} 
                onChange={this.handleChange} 
                required />
            </div>
          </div>
          <div className="row addSaleRow">
            <div className="addSaleSearchInput col-sm">
              <label htmlFor="addSaleRestrictedSelect">Restricted Studios:</label>
              <select multiple className="form-control" id="addSaleRestrictedSelect" value={this.state.addSaleRestrictedSelect} onChange={this.handleChangeSelect}>
                {this.state.existingRestricted.map((item) => 
                  <option key={item.studio} value={item.studio}>{item.studio}</option>
                )}
              </select>
            </div>
            <div className="addSaleSearchInput col-sm">
              <label htmlFor="addSaleAddRestricted">Add New Restricted Studio:</label>
              <input type="text" className="form-control" id="addSaleAddRestricted" placeholder="Type name of studio" value={this.state.addSaleAddRestricted} onChange={this.handleChange} />
              <button className="addStudio btn btn-md btn-info btn-block" onClick={this.addRestricted}>Add Studio</button>
            </div>
          </div>
          <div className="row addSaleRow">
            <div className="addSaleSearchInput col-sm">
              <button className="postSaleButton btn btn-md btn-success btn-block" onClick={this.handleAddSale}>Post passes for sale</button>
            </div>
            <div className="addSaleSearchInput col-sm">
              <button className="cancelSaleButton btn btn-md btn-danger btn-block" onClick={this.handleCancelPost}>Cancel post</button>
            </div>
          </div>
        </div>
      );
    } else {
      addSaleRow = (
        <div className="sellPassesAddSale">
          <div className="row addSaleRow">
            <div className="col-md-3">
              <button className="addSaleButton btn btn-md btn-primary btn-block" onClick={this.toggleShowAdd} >+Sell Passes</button>
            </div>
            <div className="col-md-9">
            </div>
          </div>
        </div>);
    }
    
    return (
      <div className="addSale container">        
        {addSaleRow}
      </div>
    );
  }
}

export default SellPassesAddSale;