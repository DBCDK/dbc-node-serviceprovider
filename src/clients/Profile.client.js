'use strict';

import * as Profile from 'dbc-node-profile-client';

const ProfileClient = {
  name: 'profile',
  init(config) {
    Profile.init(config);
    return Profile.METHODS;
  }
};

export default ProfileClient;
