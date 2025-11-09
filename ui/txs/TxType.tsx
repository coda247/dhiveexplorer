import React from 'react';

import type { TransactionType } from 'types/api/transaction';

import Tag from 'ui/shared/chakra/Tag';

export interface Props {
  types?: Array<TransactionType> | TransactionType; // ✅ safer prop type
  isLoading?: boolean;
}

const TYPES_ORDER = [
  'rootstock_remasc',
  'rootstock_bridge',
  'token_creation',
  'contract_creation',
  'token_transfer',
  'contract_call',
  'coin_transfer',
];

const TxType = ({ types, isLoading }: Props) => {
  // ✅ Always make sure we work with an array
  let safeTypes: Array<TransactionType> = [];

  if (Array.isArray(types)) {
    safeTypes = types;
  } else if (types) {
    safeTypes = [ types ];
  }

  // ✅ Sort safely based on TYPES_ORDER priority
  const typeToShow = safeTypes
    .filter(Boolean)
    .sort((t1, t2) => {
      const i1 = TYPES_ORDER.indexOf(t1);
      const i2 = TYPES_ORDER.indexOf(t2);
      return (i1 === -1 ? TYPES_ORDER.length : i1) - (i2 === -1 ? TYPES_ORDER.length : i2);
    })[0];

  // ✅ Define label and color scheme
  let label: string;
  let colorScheme: string;

  switch (typeToShow) {
    case 'contract_call':
      label = 'Contract call';
      colorScheme = 'blue';
      break;
    case 'contract_creation':
      label = 'Contract creation';
      colorScheme = 'blue';
      break;
    case 'token_transfer':
      label = 'Token transfer';
      colorScheme = 'orange';
      break;
    case 'token_creation':
      label = 'Token creation';
      colorScheme = 'orange';
      break;
    case 'coin_transfer':
      label = 'Coin transfer';
      colorScheme = 'orange';
      break;
    case 'rootstock_remasc':
      label = 'REMASC';
      colorScheme = 'blue';
      break;
    case 'rootstock_bridge':
      label = 'Bridge';
      colorScheme = 'blue';
      break;
    default:
      label = 'Transaction';
      colorScheme = 'purple';
      break;
  }

  return (
    <Tag colorScheme={ colorScheme } isLoading={ isLoading }>
      { label }
    </Tag>
  );
};

export default TxType;
