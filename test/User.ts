import { Table, WebEntity, WebModel } from '../src'

@WebModel({
  permissionPrefix: 'sssss',
  // addPermission: 'adds',
})
export class User extends WebEntity {
  @Table()
  name!: string
}
