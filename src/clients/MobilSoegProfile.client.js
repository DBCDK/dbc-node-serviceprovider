'use strict';

import * as MobilSoegProfile from 'dbc-node-mobilsoeg-profile-client';

const ProfileClient = {
  name: 'mobilSoegProfile',
  init(config) {
    MobilSoegProfile.init(config);
    return MobilSoegProfile.METHODS;
  }
};

export default ProfileClient;
