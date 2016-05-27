import React from 'react';
import ReactDom from 'react-dom';
import NotificationList from './NotificationList';
import NotificationDetails from './NotificationDetails';
import NotificationHeading from './NotificationHeading';
import NotificationApi from './NotificationApi';

export default class NotificationContainer extends React.Component {

	constructor(props) {
		super(props);
		this.notificationApi = new NotificationApi(this.props.config);
		this.state = {
			isArchive: false,
			displayDetails: false,
			notificationDetails: {
				message: {}
			},
			archivedList: props.archivedList || [],
			list: props.list || [],
			notificationList: props.list || []
		};
	}

	

	showDetails(notification) {
		const state = {
			displayDetails: true,
			notificationDetails: notification
		};
		if(!this.state.isArchive && !notification.isRead) {
			this.notificationApi.markAsRead(notification.id);
			notification.isRead = true;
			state.notificationList = this.updatedNotificationList(notification);
			document.dispatchEvent(new CustomEvent('NotificationBell.ReadNotification'));

		}
	
  		this.refs.heading && this.refs.heading.focus();
		
		this.setState(state);
	}

	showList() {
		this.setState({
			displayDetails: false
		});
	}

	appendArchiveList(archivedNotification) {
		const newList = this.state.list.filter(function(notification) {
			if (notification.id !== archivedNotification.id) {
				return notification;
			}
		});
		const newArchiveList = this.state.archivedList;
		archivedNotification.status = 'ARCHIVED';
		newArchiveList.push(archivedNotification);
		this.setState({
			archivedList: newArchiveList,
			list: newList,
			notificationList:newList,
			displayDetails: false
		});
	}

	goToArchiveList() {
		console.log('entering the list '+this.state.isArchive)
		this.setState({
			list: this.state.archivedList,
			isArchive: true
		});
		console.log('isarchive'+this.state.isArchive)
	}

	updatedNotificationList() {
		console.log('entering the update '+this.state.isArchive)
		this.setState({
			list: this.state.notificationList,
			isArchive: false
		});
	}

	updateNotification(notification) {
		const newList = this.state.list;
		for( let i = 0; i < newList.length; i++) {
			if(newList[i].id === notification.id) {
				newList[i] = notification;
				break;
			}
		}
		return newList;
	}

	render() {
		let archiveCss = 'notification-title--heading';
		if(this.state.isArchive || this.state.displayDetails) {
			archiveCss = 'hide';
		}
		return (
			<div>
				<div className="notification-title">
					<div tabIndex={-1} ref="heading">
						<NotificationHeading back={this.showList.bind(this)} isList={!this.state.isArchive && !this.state.displayDetails} 
						isDetails={this.state.displayDetails}/>
					</div>
					<div className="notification-archive--back " >
						<i className={this.state.isArchive && !this.state.displayDetails ? 'pe-icon--chevron-down pointer' : 'pe-icon--times close-dropdown pointer'} onClick={this.state.isArchive && !this.state.displayDetails ? this.updatedNotificationList.bind(this) : this.props.closeDrawer}></i>
					</div>	
				</div>
				<div className={this.state.displayDetails ? 'hide' : ''} >
					<NotificationList list={this.state.list}  closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} showDetails={this.showDetails.bind(this)}
					 appendArchiveList={this.appendArchiveList.bind(this)} isArchiveTray={this.state.isArchive} goToArchiveList={this.goToArchiveList.bind(this)}/>
				</div>
				<div className={this.state.displayDetails ? '' : 'hide'}>
					<div className="notification-list">
						<NotificationDetails notification={this.state.notificationDetails} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} appendArchiveList={this.appendArchiveList.bind(this)}/>
					</div>
				</div>
				<div className="notification-title">
					<a href="javascript:void(0);" onClick={this.goToArchiveList.bind(this)} className={archiveCss}> Notification Archive </a> 
				</div>
			</div>
		);
	}
}
