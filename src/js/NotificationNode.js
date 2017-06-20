import React from 'react';
import NotificationIcon from './NotificationIcon';

const NotificationNode = ({detailsClick, title, summary, source, archivedNotification, time, isRead, trashIconDisable}) => {

	
	let background = 'new-notification-icon';
	if(!isRead) {
		background += ' new-notification-icon-unread';
	}

	return (
		<div className="notification-node">
			<div className="notification-node--details">
				<div className="notification-node--summary">
					<div className="pe-bold"> 
						<a href="javascript:void(0)" onClick={detailsClick}>
							{title}
						</a>
					</div>
					<p className="notification-node--summary-description pe-label">{summary}</p>
				</div>
				<div className="notification-node--meta">
					<div className="notification-node--meta-course pe-label--small">{time}{source ? ' \u00b7 ' : ''}{source}</div>
				</div>
			</div>		
			<a href="javascript:void(0)" aria-label="Archive" className={trashIconDisable ? 'notification-component--hide' : 'notification-node--dismiss pe-label--small'} onClick={archivedNotification} >
				Archive
			</a>
			<div className={background}>
			 <NotificationIcon iconName="new-notification-9" iconAltText="" />
			</div>
		</div>
	);
};

export default NotificationNode;
