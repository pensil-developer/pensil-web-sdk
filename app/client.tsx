import React from 'react';
import ReactDOM from 'react-dom';
import { PensilService, UIKit } from '@pensil-inc/web-sdk';
import '@pensil-inc/web-sdk/lib/esm/styles/index.css';

// this file is meant for testing the sdk only

const pensil = new PensilService({
    token: process.env.REACT_APP_PENSIL_COMMUNITY_USER_TOKEN,
    baseUrl: process.env.REACT_APP_PENSIL_COMMUNITY_BASE_URL,
});

ReactDOM.render(
    <React.StrictMode>
        <UIKit.SectionDetail service={pensil} groupId={process.env.REACT_APP_PENSIL_COMMUNITY_GROUP_ID} sectionId={process.env.REACT_APP_PENSIL_COMMUNITY_SECTION_ID} />
    </React.StrictMode>,
    document.getElementById('root')
);
