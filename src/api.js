'use strict';

import * as PopSuggest from 'dbc-node-popsuggest';

export function init(config) {
  console.log(config);
}

export const services = {
  PopSuggest: PopSuggest
};
