'use strict';

import * as Profile from 'dbc-node-profile-client';

const ProfileClient = {
  name: 'profile',
  init(config) {
    return Profile.init(config);
  }
};

export default ProfileClient;
