'use strict';

import * as Borchk from 'dbc-node-borchk';

const BorrChk = {
  name: 'borchk',
  init(config) {
    Borchk.init(config);
    return Borchk.METHODS;
  }
};

export default BorrChk;
