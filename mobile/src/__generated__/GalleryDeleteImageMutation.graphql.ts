/**
 * @generated SignedSource<<57288f461e87d036244cdf1f5652fbfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GalleryDeleteImageMutation$variables = {
  fileName: string;
};
export type GalleryDeleteImageMutation$data = {
  readonly deleteImage: boolean;
};
export type GalleryDeleteImageMutation = {
  variables: GalleryDeleteImageMutation$variables;
  response: GalleryDeleteImageMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "fileName"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "fileName",
        "variableName": "fileName"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteImage",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GalleryDeleteImageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GalleryDeleteImageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9e5a196c2ed617af1b72adc0787f4033",
    "id": null,
    "metadata": {},
    "name": "GalleryDeleteImageMutation",
    "operationKind": "mutation",
    "text": "mutation GalleryDeleteImageMutation(\n  $fileName: String!\n) {\n  deleteImage(fileName: $fileName)\n}\n"
  }
};
})();

(node as any).hash = "57da950012691849c0141eb00d37096d";

export default node;
