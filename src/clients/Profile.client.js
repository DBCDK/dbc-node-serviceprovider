'use strict';

import Profile from 'dbc-node-profile-client';

const ProfileClient = {
  name: 'profile',
  init(config) {
    return Profile(config);
  }
};

export default ProfileClient;
