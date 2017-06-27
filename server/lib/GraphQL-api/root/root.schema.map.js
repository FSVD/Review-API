import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  Query: {
    fields: {
      // add a function to generate the "where condition"
      getUsersJMwithArgs: {
        where: (table, args) => `${table}.id = ${args.id}`
      },
    },
  },
});

export default schemaMap;
