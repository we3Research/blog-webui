/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/blog.json`.
 */
export type Blog = {
  "address": "AGRJdaV5t2rKK7nTYFQiRztu8tKkKgoXMprTECZrLc7A",
  "metadata": {
    "name": "blog",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addAuthor",
      "discriminator": [
        106,
        184,
        56,
        143,
        66,
        222,
        226,
        115
      ],
      "accounts": [
        {
          "name": "author",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "uid"
              }
            ]
          }
        },
        {
          "name": "authorList",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uid",
          "type": "i64"
        },
        {
          "name": "pseudonym",
          "type": "string"
        },
        {
          "name": "introduction",
          "type": "string"
        },
        {
          "name": "updater",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "createBlog",
      "discriminator": [
        221,
        118,
        241,
        5,
        53,
        181,
        90,
        253
      ],
      "accounts": [
        {
          "name": "blogMetadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  111,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "author"
              },
              {
                "kind": "arg",
                "path": "index"
              }
            ]
          }
        },
        {
          "name": "author",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "i64"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "cid",
          "type": "string"
        }
      ]
    },
    {
      "name": "init",
      "discriminator": [
        220,
        59,
        207,
        236,
        108,
        250,
        47,
        100
      ],
      "accounts": [
        {
          "name": "authorList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  95,
                  108,
                  105,
                  115,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateAuthor",
      "discriminator": [
        78,
        222,
        178,
        81,
        116,
        168,
        105,
        169
      ],
      "accounts": [
        {
          "name": "author",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "introduction",
          "type": "string"
        },
        {
          "name": "updater",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateBlog",
      "discriminator": [
        252,
        54,
        5,
        181,
        182,
        6,
        112,
        203
      ],
      "accounts": [
        {
          "name": "blogMetadata",
          "writable": true
        },
        {
          "name": "author",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newTitle",
          "type": "string"
        },
        {
          "name": "newContent",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "author",
      "discriminator": [
        136,
        201,
        168,
        93,
        108,
        12,
        36,
        134
      ]
    },
    {
      "name": "authorList",
      "discriminator": [
        72,
        197,
        183,
        235,
        197,
        208,
        23,
        7
      ]
    },
    {
      "name": "blogMetadata",
      "discriminator": [
        134,
        137,
        176,
        251,
        229,
        53,
        155,
        37
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Unauthorized: Only the creator can modify this blog."
    },
    {
      "code": 6001,
      "name": "notFound",
      "msg": "Blog not found."
    },
    {
      "code": 6002,
      "name": "authorListNotInit",
      "msg": "Author List not init blog."
    },
    {
      "code": 6003,
      "name": "indexWrong",
      "msg": "Index Wrong."
    }
  ],
  "types": [
    {
      "name": "author",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uid",
            "type": "i64"
          },
          {
            "name": "pseudonym",
            "type": "string"
          },
          {
            "name": "introduction",
            "type": "string"
          },
          {
            "name": "total",
            "type": "i64"
          },
          {
            "name": "updater",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "authorList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "total",
            "type": "i64"
          },
          {
            "name": "updater",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "blogMetadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index",
            "type": "i64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "cid",
            "type": "string"
          },
          {
            "name": "createAt",
            "type": "i64"
          },
          {
            "name": "updateAt",
            "type": "i64"
          },
          {
            "name": "history",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "author",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
