'use strict';

import Borchk from 'dbc-node-borchk';

const BorrChk = {
  name: 'borchk',
  init(config) {
    return Borchk(config);
  }
};

export default BorrChk;
