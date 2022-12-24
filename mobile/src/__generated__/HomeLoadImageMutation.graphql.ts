/**
 * @generated SignedSource<<36505415f649dc366ac0ca4e9d0487ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FileInput = {
  filename: string;
  mimeType: string;
  encoding: string;
};
export type HomeLoadImageMutation$variables = {
  data: FileInput;
};
export type HomeLoadImageMutation$data = {
  readonly loadImage: boolean;
};
export type HomeLoadImageMutation = {
  variables: HomeLoadImageMutation$variables;
  response: HomeLoadImageMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      }
    ],
    "kind": "ScalarField",
    "name": "loadImage",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeLoadImageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeLoadImageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4fdfbd6199799183d7942cd0d7fa8888",
    "id": null,
    "metadata": {},
    "name": "HomeLoadImageMutation",
    "operationKind": "mutation",
    "text": "mutation HomeLoadImageMutation(\n  $data: FileInput!\n) {\n  loadImage(data: $data)\n}\n"
  }
};
})();

(node as any).hash = "54f28dcf9d01c6cdc918d225acd7f5d8";

export default node;
