const KMONFTV2 = [
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'previousDao',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: 'newDao',
              type: 'address'
          }
      ],
      name: 'DaoTransferred',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'previousDaoTreasury',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: 'newDaoTreasury',
              type: 'address'
          }
      ],
      name: 'DaoTreasuryTransferred',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'gameManager_',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: 'limit_',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'refreshTime_',
              type: 'uint256'
          }
      ],
      name: 'GameManagerAdded',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'gameManager_',
              type: 'address'
          }
      ],
      name: 'GameManagerRemoved',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'newItemManager_',
              type: 'address'
          }
      ],
      name: 'ItemManagerAdded',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'itemManager_',
              type: 'address'
          }
      ],
      name: 'ItemManagerRemoved',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: false,
              internalType: 'uint256',
              name: '_wearableId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'int8[6]',
              name: '_traitModifiers',
              type: 'int8[6]'
          },
          {
              indexed: false,
              internalType: 'uint8',
              name: '_rarityScoreModifier',
              type: 'uint8'
          }
      ],
      name: 'ItemModifiersSet',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: false,
              internalType: 'uint256[]',
              name: '_itemIds',
              type: 'uint256[]'
          },
          {
              indexed: false,
              internalType: 'uint256[]',
              name: '_maxQuanities',
              type: 'uint256[]'
          }
      ],
      name: 'ItemTypeMaxQuantity',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'migrationManager_',
              type: 'address'
          }
      ],
      name: 'MigrationManagerAdded',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'migrationManager_',
              type: 'address'
          }
      ],
      name: 'MigrationManagerRemoved',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: false,
              internalType: 'uint256[]',
              name: '_tokenIds',
              type: 'uint256[]'
          },
          {
              indexed: false,
              internalType: 'uint256[]',
              name: '_xpValues',
              type: 'uint256[]'
          }
      ],
      name: 'RemoveExperience',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: false,
              internalType: 'uint256',
              name: '_itemId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_priceInWei',
              type: 'uint256'
          }
      ],
      name: 'UpdateItemPrice',
      type: 'event'
  },
  {
      inputs: [
          {
              internalType: 'address[]',
              name: '_newGameManagers',
              type: 'address[]'
          },
          {
              internalType: 'uint256[]',
              name: '_limits',
              type: 'uint256[]'
          }
      ],
      name: 'addGameManagers',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address[]',
              name: '_newMigrationManagers',
              type: 'address[]'
          }
      ],
      name: 'addMigrationManagers',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_manager',
              type: 'address'
          }
      ],
      name: 'gameManagerBalance',
      outputs: [
          {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_manager',
              type: 'address'
          }
      ],
      name: 'gameManagerRefreshTime',
      outputs: [
          {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_manager',
              type: 'address'
          }
      ],
      name: 'isGameManager',
      outputs: [
          {
              internalType: 'bool',
              name: '',
              type: 'bool'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_manager',
              type: 'address'
          }
      ],
      name: 'isMigrationManager',
      outputs: [
          {
              internalType: 'bool',
              name: '',
              type: 'bool'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address[]',
              name: '_gameManagers',
              type: 'address[]'
          }
      ],
      name: 'removeGameManagers',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address[]',
              name: '_migrationManagers',
              type: 'address[]'
          }
      ],
      name: 'removeMigrationManagers',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_newDao',
              type: 'address'
          },
          {
              internalType: 'address',
              name: '_newDaoTreasury',
              type: 'address'
          }
      ],
      name: 'setDao',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              internalType: 'uint256[]',
              name: 'genes',
              type: 'uint256[]'
          },
          {
              internalType: 'uint256',
              name: 'deadline',
              type: 'uint256'
          },
          {
              internalType: 'uint8',
              name: 'v',
              type: 'uint8'
          },
          {
              internalType: 'bytes32',
              name: 'r',
              type: 'bytes32'
          },
          {
              internalType: 'bytes32',
              name: 's',
              type: 'bytes32'
          }
      ],
      name: 'migrate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256[]',
              name: '_tokenIds',
              type: 'uint256[]'
          },
          {
              internalType: 'uint256[][]',
              name: '_genes',
              type: 'uint256[][]'
          },
          {
              internalType: 'uint256[]',
              name: '_deadlines',
              type: 'uint256[]'
          },
          {
              internalType: 'uint8[]',
              name: '_vs',
              type: 'uint8[]'
          },
          {
              internalType: 'bytes32[]',
              name: '_rs',
              type: 'bytes32[]'
          },
          {
              internalType: 'bytes32[]',
              name: '_ss',
              type: 'bytes32[]'
          }
      ],
      name: 'migrateBatch',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_owner',
              type: 'address'
          }
      ],
      name: 'allKryptomonsOfOwner',
      outputs: [
          {
              components: [
                  {
                      internalType: 'uint256',
                      name: 'tokenId',
                      type: 'uint256'
                  },
                  {
                      internalType: 'address',
                      name: 'owner',
                      type: 'address'
                  },
                  {
                      internalType: 'string',
                      name: 'name',
                      type: 'string'
                  },
                  {
                      internalType: 'uint256[]',
                      name: 'genes',
                      type: 'uint256[]'
                  },
                  {
                      internalType: 'uint256[]',
                      name: 'attributes',
                      type: 'uint256[]'
                  },
                  {
                      internalType: 'uint256[]',
                      name: 'extraData',
                      type: 'uint256[]'
                  },
                  {
                      internalType: 'uint256[]',
                      name: 'aspectData',
                      type: 'uint256[]'
                  },
                  {
                      internalType: 'uint256',
                      name: 'matronTokenId',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'sireTokenId',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'timeBorn',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'status',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'timeHatched',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'breedingsLeft',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'breedingCount',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'totalBreedingCount',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'maxBreedingsDuringLifePhase',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'timeCanBreed',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'lastEvolved',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'lastInteracted',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'interactionCount',
                      type: 'uint256'
                  }
              ],
              internalType: 'struct Kryptomon[]',
              name: 'kryptomonInfos_',
              type: 'tuple[]'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_approved',
              type: 'address'
          },
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_owner',
              type: 'address'
          }
      ],
      name: 'balanceOf',
      outputs: [
          {
              internalType: 'uint256',
              name: 'balance_',
              type: 'uint256'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [],
      name: 'contractURI',
      outputs: [
          {
              internalType: 'string',
              name: '',
              type: 'string'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'getApproved',
      outputs: [
          {
              internalType: 'address',
              name: 'approved_',
              type: 'address'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'getKryptomon',
      outputs: [
          {
              components: [
                  {
                      internalType: 'uint256',
                      name: 'tokenId',
                      type: 'uint256'
                  },
                  {
                      internalType: 'address',
                      name: 'owner',
                      type: 'address'
                  },
                  {
                      internalType: 'string',
                      name: 'name',
                      type: 'string'
                  },
                  {
                      internalType: 'uint256[]',
                      name: 'genes',
                      type: 'uint256[]'
                  },
                  {
                      internalType: 'uint256[]',
                      name: 'attributes',
                      type: 'uint256[]'
                  },
                  {
                      internalType: 'uint256[]',
                      name: 'extraData',
                      type: 'uint256[]'
                  },
                  {
                      internalType: 'uint256[]',
                      name: 'aspectData',
                      type: 'uint256[]'
                  },
                  {
                      internalType: 'uint256',
                      name: 'matronTokenId',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'sireTokenId',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'timeBorn',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'status',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'timeHatched',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'breedingsLeft',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'breedingCount',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'totalBreedingCount',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'maxBreedingsDuringLifePhase',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'timeCanBreed',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'lastEvolved',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'lastInteracted',
                      type: 'uint256'
                  },
                  {
                      internalType: 'uint256',
                      name: 'interactionCount',
                      type: 'uint256'
                  }
              ],
              internalType: 'struct Kryptomon',
              name: 'kryptomonInfo_',
              type: 'tuple'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: 'kryptomonId',
              type: 'uint256'
          }
      ],
      name: 'getKryptomonDetails',
      outputs: [
          {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
          },
          {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]'
          },
          {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
          },
          {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]'
          },
          {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]'
          },
          {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
          },
          {
              internalType: 'int256',
              name: '',
              type: 'int256'
          },
          {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_owner',
              type: 'address'
          },
          {
              internalType: 'address',
              name: '_operator',
              type: 'address'
          }
      ],
      name: 'isApprovedForAll',
      outputs: [
          {
              internalType: 'bool',
              name: 'approved_',
              type: 'bool'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [],
      name: 'name',
      outputs: [
          {
              internalType: 'string',
              name: '',
              type: 'string'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [],
      name: 'ownedKryptomons',
      outputs: [
          {
              internalType: 'uint256[]',
              name: 'tokenIds_',
              type: 'uint256[]'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'ownerOf',
      outputs: [
          {
              internalType: 'address',
              name: 'owner_',
              type: 'address'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_from',
              type: 'address'
          },
          {
              internalType: 'address',
              name: '_to',
              type: 'address'
          },
          {
              internalType: 'uint256[]',
              name: '_tokenIds',
              type: 'uint256[]'
          },
          {
              internalType: 'bytes',
              name: '_data',
              type: 'bytes'
          }
      ],
      name: 'safeBatchTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_from',
              type: 'address'
          },
          {
              internalType: 'address',
              name: '_to',
              type: 'address'
          },
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_from',
              type: 'address'
          },
          {
              internalType: 'address',
              name: '_to',
              type: 'address'
          },
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              internalType: 'bytes',
              name: '_data',
              type: 'bytes'
          }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_operator',
              type: 'address'
          },
          {
              internalType: 'bool',
              name: '_approved',
              type: 'bool'
          }
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [],
      name: 'symbol',
      outputs: [
          {
              internalType: 'string',
              name: '',
              type: 'string'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
          }
      ],
      name: 'tokenByIndex',
      outputs: [
          {
              internalType: 'uint256',
              name: 'tokenId_',
              type: 'uint256'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_owner',
              type: 'address'
          }
      ],
      name: 'tokenIdsOfOwner',
      outputs: [
          {
              internalType: 'uint256[]',
              name: 'tokenIds_',
              type: 'uint256[]'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_owner',
              type: 'address'
          },
          {
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
          }
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [
          {
              internalType: 'uint256',
              name: 'tokenId_',
              type: 'uint256'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'tokenURI',
      outputs: [
          {
              internalType: 'string',
              name: '',
              type: 'string'
          }
      ],
      stateMutability: 'pure',
      type: 'function'
  },
  {
      inputs: [],
      name: 'totalSupply',
      outputs: [
          {
              internalType: 'uint256',
              name: 'totalSupply_',
              type: 'uint256'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: '_from',
              type: 'address'
          },
          {
              internalType: 'address',
              name: '_to',
              type: 'address'
          },
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
          }
      ],
      name: 'AddToBreedingCentre',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'kryptomonId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'matronId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'sireId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'timeBorn',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256[]',
              name: 'genes',
              type: 'uint256[]'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'status',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256[]',
              name: 'extraData',
              type: 'uint256[]'
          }
      ],
      name: 'Birth',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_matronTokenId',
              type: 'uint256'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_sireTokenId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_matronCanBreedNext',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_sireCanBreedNext',
              type: 'uint256'
          }
      ],
      name: 'BreedKryptomon',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'ClaimKryptomon',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'EggHatched',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: 'status',
              type: 'uint256'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: 'maxBreedingsDuringLifePhase',
              type: 'uint256'
          }
      ],
      name: 'EvolveKryptomon',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: false,
              internalType: 'uint256',
              name: 'time',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
          }
      ],
      name: 'HatchingParamsChanged',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_time',
              type: 'uint256'
          }
      ],
      name: 'LockKryptomon',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'RemoveFromBreedingCentre',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_batchId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256[]',
              name: 'tokenIds',
              type: 'uint256[]'
          }
      ],
      name: 'SetBatchId',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'string',
              name: '_oldName',
              type: 'string'
          },
          {
              indexed: false,
              internalType: 'string',
              name: '_newName',
              type: 'string'
          }
      ],
      name: 'SetKryptomonName',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'int16[4]',
              name: '_values',
              type: 'int16[4]'
          }
      ],
      name: 'SpendSkillpoints',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_time',
              type: 'uint256'
          }
      ],
      name: 'UnLockKryptomon',
      type: 'event'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: '_price',
              type: 'uint256'
          }
      ],
      name: 'addToBreedingCentre',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_matronTokenId',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: '_sireTokenId',
              type: 'uint256'
          }
      ],
      name: 'breedKryptomons',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: 'kryptomonOwner',
              type: 'address'
          },
          {
              internalType: 'uint256',
              name: 'passedGen',
              type: 'uint256'
          }
      ],
      name: 'createKryptomonOnRequest',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'evolveKryptomon',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256[]',
              name: '_tokenIds',
              type: 'uint256[]'
          }
      ],
      name: 'interact',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [],
      name: 'kmonAddress',
      outputs: [
          {
              internalType: 'address',
              name: 'contract_',
              type: 'address'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'string',
              name: '_name',
              type: 'string'
          }
      ],
      name: 'kryptomonNameAvailable',
      outputs: [
          {
              internalType: 'bool',
              name: 'available_',
              type: 'bool'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'removeFromBreedingCentre',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [],
      name: 'revenueShares',
      outputs: [
          {
              components: [
                  {
                      internalType: 'address',
                      name: 'burnAddress',
                      type: 'address'
                  },
                  {
                      internalType: 'address',
                      name: 'daoAddress',
                      type: 'address'
                  }
              ],
              internalType: 'struct KryptomonGameFacet.RevenueSharesIO',
              name: '',
              type: 'tuple'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_price',
              type: 'uint256'
          }
      ],
      name: 'setBreedingFee',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              internalType: 'string',
              name: '_name',
              type: 'string'
          }
      ],
      name: 'setKryptomonName',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: '_matronTokenId',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: '_sireTokenId',
              type: 'uint256'
          }
      ],
      name: 'simulateBreeding',
      outputs: [
          {
              internalType: 'uint256[]',
              name: 'childGenome',
              type: 'uint256[]'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'uint256[]',
              name: 'evolutionPrices',
              type: 'uint256[]'
          },
          {
              internalType: 'uint256[]',
              name: 'evolutionTimes',
              type: 'uint256[]'
          }
      ],
      name: 'updateEvolutionParams',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: false,
              internalType: 'address',
              name: 'userAddress',
              type: 'address'
          },
          {
              indexed: false,
              internalType: 'address payable',
              name: 'relayerAddress',
              type: 'address'
          },
          {
              indexed: false,
              internalType: 'bytes',
              name: 'functionSignature',
              type: 'bytes'
          }
      ],
      name: 'MetaTransactionExecuted',
      type: 'event'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: 'userAddress',
              type: 'address'
          },
          {
              internalType: 'bytes',
              name: 'functionSignature',
              type: 'bytes'
          },
          {
              internalType: 'bytes32',
              name: 'sigR',
              type: 'bytes32'
          },
          {
              internalType: 'bytes32',
              name: 'sigS',
              type: 'bytes32'
          },
          {
              internalType: 'uint8',
              name: 'sigV',
              type: 'uint8'
          }
      ],
      name: 'executeMetaTransaction',
      outputs: [
          {
              internalType: 'bytes',
              name: '',
              type: 'bytes'
          }
      ],
      stateMutability: 'payable',
      type: 'function'
  },
  {
      inputs: [
          {
              internalType: 'address',
              name: 'user',
              type: 'address'
          }
      ],
      name: 'getNonce',
      outputs: [
          {
              internalType: 'uint256',
              name: 'nonce_',
              type: 'uint256'
          }
      ],
      stateMutability: 'view',
      type: 'function'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_v1TokenId',
              type: 'uint256'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_v2TokenId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256[]',
              name: 'genes',
              type: 'uint256[]'
          }
      ],
      name: 'KmonftV1Migration',
      type: 'event'
  },
  {
      inputs: [
          {
              internalType: 'uint256',
              name: 'parMin',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: 'parMax',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: 'parent1Gene',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: 'parent2Gene',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: 'mutation',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: 'minGenome',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: 'maxGenome',
              type: 'uint256'
          },
          {
              internalType: 'uint256',
              name: 'index',
              type: 'uint256'
          }
      ],
      name: 'Overflow',
      type: 'error'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: 'kinship',
              type: 'uint256'
          }
      ],
      name: 'KryptomonInteract',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'uint256',
              name: '_price',
              type: 'uint256'
          }
      ],
      name: 'SetBreedingFee',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              components: [
                  {
                      internalType: 'address',
                      name: 'facetAddress',
                      type: 'address'
                  },
                  {
                      internalType: 'enum IDiamondCut.FacetCutAction',
                      name: 'action',
                      type: 'uint8'
                  },
                  {
                      internalType: 'bytes4[]',
                      name: 'functionSelectors',
                      type: 'bytes4[]'
                  }
              ],
              indexed: false,
              internalType: 'struct IDiamondCut.FacetCut[]',
              name: '_diamondCut',
              type: 'tuple[]'
          },
          {
              indexed: false,
              internalType: 'address',
              name: '_init',
              type: 'address'
          },
          {
              indexed: false,
              internalType: 'bytes',
              name: '_calldata',
              type: 'bytes'
          }
      ],
      name: 'DiamondCut',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address'
          }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: '_operator',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: '_from',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: '_to',
              type: 'address'
          },
          {
              indexed: false,
              internalType: 'uint256[]',
              name: '_ids',
              type: 'uint256[]'
          },
          {
              indexed: false,
              internalType: 'uint256[]',
              name: '_values',
              type: 'uint256[]'
          }
      ],
      name: 'TransferBatch',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: '_fromContract',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_fromTokenId',
              type: 'uint256'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenTypeId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_value',
              type: 'uint256'
          }
      ],
      name: 'TransferFromParent',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: '_operator',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: '_from',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: '_to',
              type: 'address'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_id',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_value',
              type: 'uint256'
          }
      ],
      name: 'TransferSingle',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: '_toContract',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_toTokenId',
              type: 'uint256'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenTypeId',
              type: 'uint256'
          },
          {
              indexed: false,
              internalType: 'uint256',
              name: '_value',
              type: 'uint256'
          }
      ],
      name: 'TransferToParent',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: false,
              internalType: 'string',
              name: '_value',
              type: 'string'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_id',
              type: 'uint256'
          }
      ],
      name: 'URI',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: '_owner',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: '_approved',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'Approval',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: '_owner',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: '_operator',
              type: 'address'
          },
          {
              indexed: false,
              internalType: 'bool',
              name: '_approved',
              type: 'bool'
          }
      ],
      name: 'ApprovalForAll',
      type: 'event'
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              internalType: 'address',
              name: '_from',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'address',
              name: '_to',
              type: 'address'
          },
          {
              indexed: true,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256'
          }
      ],
      name: 'Transfer',
      type: 'event'
  }
];
//# sourceMappingURL=KMONFTV2.js.map

module.exports = KMONFTV2