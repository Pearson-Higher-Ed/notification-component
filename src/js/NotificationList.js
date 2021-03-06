import React from 'react';
import NotificationNode from './NotificationNode';
import { defineMessages, injectIntl, intlShape, FormattedMessage, FormattedDate } from 'react-intl';
import DateParser from './DateParser';
import NotificationBlankState from './NotificationBlankState';
import NotificationApi from './NotificationApi';

const messages = defineMessages({
	notificationList: {
		id: 'notificationList.link',
		defaultMessage: 'Archive'
	}
});

export default class NotificationList extends React.Component {

	constructor(props) {
		super(props);
	}

	showDetails(notification) {
		this.props.showDetails(notification);
	}

	onArchived(notification) {
		this.props.appendArchiveList(notification);
	}

	goToArchiveList() {
		this.props.goToArchiveList();
	}


	/**
	 * Render
	 **/
	render() {
		const maxTitleLength = 46;
		const maxBodyLength = 26;
		const maxSourceLength = 66;	
		
		let notificationNodeObjects = {};
		if (this.props.list.length > 0) {
			notificationNodeObjects = this.props.list.map((notification) => {
				const time = DateParser.getFormatDateString(new Date(notification.createdAt))

				let title = (notification.message && notification.message.title) ? notification.message.title : '';
				title = (title.length > maxTitleLength) ? title.substring(0, maxTitleLength) + '\u2026' : title;

				return (
					<NotificationNode key={notification.id} detailsClick={this.showDetails.bind(this, notification)}
					title={this.props.hyphenateWords(title)}
					summary={(notification.message.body && notification.message.body.length > maxBodyLength) ? notification.message.body.substring(0, maxBodyLength)  + '\u2026' : notification.message.body}
					archivedNotification={this.onArchived.bind(this, notification)} trashIconDisable={this.props.isArchiveTray}  time={time}
					isRead={notification.isRead}
					source={(notification.message.source && notification.message.source.length > maxSourceLength) ? notification.message.source.substring(0, maxSourceLength) + '\u2026' : notification.message.source}
					archiveLinkText={<FormattedMessage {...messages.notificationList} />}/>

				);
			});
		}
		if (this.props.list.length === 0) {
			notificationNodeObjects = <NotificationBlankState isError={this.props.isError} isArchivedTray={this.props.isArchiveTray} goToArchiveList={this.goToArchiveList.bind(this)}/>
		}
		
		if(this.props.isArchiveTray) {
			return (
				<div className="archive-list">
					<div className="archive-list--heading pe-title"> 
						<FormattedMessage {...messages.notificationList} />
					</div>
					{notificationNodeObjects}
				</div>
			)
		}
		return (
			<div className="notification-list">
				{notificationNodeObjects}
			</div>
		);
	}
};
