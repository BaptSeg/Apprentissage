function BoilingVerdict({celsius}) {
    if (celsius >= 100) {
        return <div>
            <p className="alert alert-success">L'eau boue.</p>
        </div>
    }
    return <div>
        <p className="alert alert-danger">L'eau ne boue pas.</p>
    </div>
}



class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temp : '',
            temp_F: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        const temp_f = e.target.value * (9/5) + 32
        this.setState({
            temp: e.target.value,
            temp_F : temp_f.toString()
        })
    }

    render () {
        return <div>
            <div className="form-group">
                <label htmlFor="celsius">Température (Celsius)</label>
                <input type="text" id="celsius" value={this.state.temp} className="form-control" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="temp_F">Température (Fahrenheit)</label>
                <input type="text" id="temp_F" value={this.state.temp_F} className="form-control" onChange={this.handleChange}/>
            </div>
            <BoilingVerdict celsius={parseFloat(this.state.temp)}></BoilingVerdict>
        </div>
    }
}

ReactDOM.render(<Calculator/>, document.getElementById("app"))