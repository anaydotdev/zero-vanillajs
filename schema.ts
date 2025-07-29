import {
    ANYONE_CAN_DO_ANYTHING,
    createSchema,
    definePermissions,
    string,
    table,
} from '@rocicorp/zero'

const task = table('task')
  .columns({
    id: string(),
    title: string(),
    description: string(),
  })
  .primaryKey('id')

export const schema = createSchema({
  tables: [task],
})

export type Schema = typeof schema

export const permissions = definePermissions<unknown, Schema>(schema, () => ({
  task: ANYONE_CAN_DO_ANYTHING,
}))
