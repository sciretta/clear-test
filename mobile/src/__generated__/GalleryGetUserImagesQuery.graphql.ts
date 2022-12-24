/**
 * @generated SignedSource<<3ab9bc2803623b7b253de55c9d37ff22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserInput = {
  username: string;
};
export type GalleryGetUserImagesQuery$variables = {
  data: UserInput;
};
export type GalleryGetUserImagesQuery$data = {
  readonly userImages: ReadonlyArray<{
    readonly fileName: string;
    readonly ownerUsername: string;
  }>;
};
export type GalleryGetUserImagesQuery = {
  variables: GalleryGetUserImagesQuery$variables;
  response: GalleryGetUserImagesQuery$data;
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
        "name": "user",
        "variableName": "data"
      }
    ],
    "concreteType": "Image",
    "kind": "LinkedField",
    "name": "userImages",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fileName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ownerUsername",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GalleryGetUserImagesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GalleryGetUserImagesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1cd0595bff517b585059643a973bcb82",
    "id": null,
    "metadata": {},
    "name": "GalleryGetUserImagesQuery",
    "operationKind": "query",
    "text": "query GalleryGetUserImagesQuery(\n  $data: UserInput!\n) {\n  userImages(user: $data) {\n    fileName\n    ownerUsername\n  }\n}\n"
  }
};
})();

(node as any).hash = "c4ae73a575dc559f040c6a32ad08534f";

export default node;
