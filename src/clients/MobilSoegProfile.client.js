'use strict';

import MobilSoegProfile from 'dbc-node-mobilsoeg-profile-client';

const ProfileClient = {
  name: 'mobilSoegProfile',
  init(config) {
    return MobilSoegProfile(config);
  }
};

export default ProfileClient;
