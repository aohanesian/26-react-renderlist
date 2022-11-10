const animals = [
    {type: `turtle`, icon: `🐢`},
    {type: `octopus`, icon: `🐙`},
    {type: `fish`, icon: `🐠`},
    {type: `flamingo`, icon: `🦩`},
    {type: `penguin`, icon: `🐧`}
]

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        const choseItem = setInterval(() => {
            let randomIndex = getRandomInt(0, this.state.listIndex.length);
            let randomItem = this.state.listIndex[randomIndex];
            this.state.list[randomItem].chosen = true;
            this.state.listIndex.splice(randomIndex, 1);
            if (Math.ceil(this.state.list.length / 2) === this.state.listIndex.length) this.state.borderWidth = '10px';
            if (this.state.listIndex.length === 0) {
                this.state.borderWidth = `20px`;
                clearInterval(choseItem);
            }
            this.setState({});
        }, 2000);
    };

    state = {
        list: this.props.list,
        listIndex: Object.keys(this.props.list),
        itemClass: 'chosen',
        borderWidth: '0px'
    };

    render() {
        return <table>
            <tbody style={{borderWidth: this.state.borderWidth}}>
            {this.props.list.map((item, index) => <tr className={item.chosen ? this.state.itemClass : null} key={index}>
                <td>{item.type}</td>
                <td>{item.icon}</td>
            </tr>)}
            </tbody>
        </table>
    };
}

root.render(
    <React.Fragment>
        <Table list={animals}></Table>
    </React.Fragment>
)