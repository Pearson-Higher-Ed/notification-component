let React = require("react");
let NotificationList = require("./NotificationList");
require("./style/notificationDropdown.scss");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			showDropdown: false
		};
	},
	closeDropdown : function() {
		this.setState({showDropdown: false});
	},
	toggle: function() {
		if(this.state.showDropdown) {
			this.setState({showDropdown: false});
			return;
		}
		this.setState({showDropdown: true});


	},
	render: function() {
		return (
			<div>
				<i className="fa fa-bell pointer" onClick={this.toggle}></i>
				<div className={this.state.showDropdown ? "" : "hide"}>
					<div className="notification-dropdown">
						<div className="dropdown-title">
							Notifications
							<i className="fa fa-times close-dropdown pointer" onClick={this.closeDropdown}></i>
						</div>
						<NotificationList />
					</div>
				</div>
			</div>
		);
	}
});