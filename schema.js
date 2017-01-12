const { graphql, buildSchema } = require('graphql');
const data = require('./data.json');

exports.schema = buildSchema(`
  type Emoji {
    no: ID!
    code: String!
    char: String!
    name: String!
    date: String!
    keywords: [String!]!
  }

  input EmojiInput {
    code: String!
    char: String!
    name: String!
    date: String!
    keywords: [String!]!
  }

  type Query {
    emojis: [Emoji!]!
    relatedEmoji(keyword: String!): [Emoji!]!
  }

  type Mutation {
    createNewEmoji(input: EmojiInput): Emoji
    updateEmoji(id: ID!, input: EmojiInput): Emoji
    deleteEmoji(id: ID!): [Emoji]
  }
`);

exports.rootValue = {
  emojis: () => Object.keys(data).map(id => data[id]),
  relatedEmoji: ({ keyword }) => Object.keys(data)
    .map(id => data[id])
    .filter(emoji => emoji['keywords'].includes(keyword) ? emoji : null),
  createNewEmoji: ({ input }) => {
    const newEmoji = data[Object.keys(data).length + 1] = input;
    const id = Object.keys(data).length
    newEmoji['no'] = id;

    return newEmoji;
  },
  updateEmoji: ({ id, input }) => {
    data[id] = input;
    data[id]['no'] = id;

    return data[id];
  },
  deleteEmoji: ({ id }) => {
    delete data[id];

    return Object.keys(data).map(id => data[id]);
  }
};
