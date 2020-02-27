import React from "react";
import ReactDOM from "react-dom";
import Webdatarocks from "webdatarocks";
import WebDataRocks from "webdatarocks";

export class Pivot extends React.Component<WebDataRocks.Params, any> {
	
	webdatarocks: WebDataRocks.Pivot | undefined

	componentDidMount() {
		this.webdatarocks = new Webdatarocks({
			...this.props,
			container: ReactDOM.findDOMNode(this)
		});
	}
	
	shouldComponentUpdate() {
		return false;
	}
	
	componentWillUnmount() {
		if (this.webdatarocks) {
		this.webdatarocks.dispose();
		}
	}

	render() {
		return <div>Pivot</div>;
	}
}

export default Pivot;