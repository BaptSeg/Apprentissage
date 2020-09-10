const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function ProductCategoryRow ({category}) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

function ProductRow ({produit}) {
    const name = produit.stocked ? produit.name : <span className="text-danger">{produit.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{produit.price}</td>
    </tr>
}

function ProductTable ({products, filterText, inStockOnly}) {
    const rows = []
    let lastCategory = null

    products.forEach(product => {
        if (inStockOnly && !product.stocked || product.name.indexOf(filterText) === -1) {
            return
        }
        if (product.category !== lastCategory) {
            lastCategory = product.category
            rows.push(<ProductCategoryRow key={lastCategory} category={product.category}/>)
        }
        rows.push(<ProductRow key={product.name} produit={product}/>)
    })

    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}

class SearchBar extends React.Component {

    constructor(props) {
        super(props)

        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterChange (e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange (e) {
        this.props.onInStockChange(e.target.checked)
    }

    render () {
        const {filterText, inStockOnly} = this.props
        return <div className="mb-3 mt-3">
            <div className="form-group">
                <input className="form-control" type="text" name="search" id="search" placeholder="Rechercher" value={filterText} onChange={this.handleFilterChange}/>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="stock" id="stock" checked={inStockOnly} onChange={this.handleInStockChange}/>
                <label htmlFor="stock" className="form-check-label">Produit en stock uniquement</label>
            </div>
        </div>
    }
}

class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange (new_filterText) {
        this.setState({filterText: new_filterText})
    }

    handleInStockChange (new_inStockOnly) {
        this.setState({inStockOnly: new_inStockOnly})
    }

    render () {
        const {products} = this.props
        return <div>
            <SearchBar filtertest={this.state.filterText} inStockOnly={this.state.inStockOnly} onFilterTextChange={this.handleFilterTextChange} onInStockChange={this.handleInStockChange}></SearchBar>
            <ProductTable products={products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}></ProductTable>
        </div>
    }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, document.getElementById("app"))