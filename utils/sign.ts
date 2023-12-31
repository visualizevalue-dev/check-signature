import { signTypedData, type SignTypedDataArgs } from '@wagmi/core'
import isValidURI from '~/utils/is-valid-uri'

export type Signature = {
  signer: string,
  signature: string,
  subjects: string[],
  action: string,
  object: string,
}

export const OPTIONS = {
  said: 'said',
  wrote: 'wrote',
  made: 'made',
  bought: 'bought',

  sign: 'sign',
  approve: 'approve',
  disapprove: 'disapprove',
}
export const OPTIONS_GRAMMAR = {
  // KEY            I              HE/SHE          WE/THEY
  sign:           [ 'sign',        'signs',        'sign'          ],
  said:           [ 'said',        'said',         'said'          ],
  wrote:          [ 'wrote',       'wrote',        'wrote'         ],
  made:           [ 'made',        'made',         'made'          ],
  bought:         [ 'bought',      'bought',       'bought'        ],
  approve:        [ 'approve',     'approves',     'approve'       ],
  disapprove:     [ 'disapprove',  'disapproves',  'disapprove'    ],
}

export const TYPES = {
  URI: 'URI',
  TXT: 'TXT',
}

export const getType = (content: string) => isValidURI(content.trim()) ? TYPES.URI : TYPES.TXT
export const isURI = (type: keyof typeof TYPES) => type === TYPES.URI

export const notabilityCheck712Definition = (subject: string[], action: string, object: string): SignTypedDataArgs => {
  const name = 'Notability Check'
  const domain = {
    name,
    version: '1',
  }

  const types = {
    [name]: [
      { name: 'Subject', type: 'address[]' },
      { name: 'Action', type: 'string' },
      { name: 'Object', type: 'string' },
    ],
  }

  return {
    primaryType: name,
    message: {
      Subject: subject,
      Action: action,
      Object: object,
    },
    domain,
    types,
  }
}

export const signNotabilityCheck = async (subject: string[], action: string, object: string) =>
  await signTypedData(notabilityCheck712Definition(subject, action, object))
