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
        <div className="add-sale-row">
          <span><h4>You may create multiple sale groups. Each of these is for a group of passes in a date range.</h4></span>
          <fieldset className="form-inline">
            <div className="form-group">
              <label htmlFor="addSaleQuantity">Number of Passes:</label>
              <input type="number" min="1" className="form-control" id="addSaleQuantity" placeholder="Number" value={this.state.addSaleQuantity} onChange={this.handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="addSalePrice">Price Per Pass:</label>
              <input type="number" min="0" className="form-control" id="addSalePrice" placeholder="Dollar amount" value={this.state.addSalePrice} onChange={this.handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="addSaleDateStart">Passes are valid start on:</label>
              <input type="date" className="form-control" id="addSaleDateStart" placeholder="Start Date" value={this.state.addSaleDateStart} onChange={this.handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="addSaleDateEnd">Passes are valid until:</label>
              <input type="date" className="form-control" id="addSaleDateEnd" placeholder="End Date" value={this.state.addSaleDateEnd} onChange={this.handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="addSaleAddRestricted">Add New Restricted Studio:</label>
              <input type="text" className="form-control" id="addSaleAddRestricted" placeholder="Type name of studio" value={this.state.addSaleAddRestricted} onChange={this.handleChange} />
              <button onClick={this.addRestricted}>Add Studio</button>
            </div>

            <div className="form-group">
              <label htmlFor="addSaleRestrictedSelect">Restricted Studios:</label>
              <select multiple className="form-control" id="addSaleRestrictedSelect" value={this.state.addSaleRestrictedSelect} onChange={this.handleChangeSelect}>
                {this.state.existingRestricted.map((item) => 
                  <option key={item.studio} value={item.studio}>{item.studio}</option>
                )}
              </select>
            </div>

            <button onClick={this.handleAddSale}>Post passes for sale</button>
          </fieldset>
        </div>
      );
    } else {
      addSaleRow = <div className="add-sale-row"><button onClick={this.toggleShowAdd} >+Add new passes for sale</button></div>;
    }
    
    return (
      <div className="AddSale">        
        {addSaleRow}
      </div>
    );
  }
}

export default SellPassesAddSale;