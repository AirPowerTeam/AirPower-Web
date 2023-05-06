import { Expose } from 'class-transformer'
import { AirEntity } from './AirEntity'
import { IFile } from '../interface/IFile'

/**
 * # 内置文件实体
 * ---
 * 💡 如需扩展, 请自行实现 ```IFile```, 使用 ```AirConfig.defaultFileEntity``` 配置默认实现类
 * @author Hamm
 */
export class AirFileEntity extends AirEntity implements IFile {
  /**
   * # 文件的相对路径
   * 可以调用 ```AirFile.getStaticFileUrl()``` 获取文件的真实地址
   */
  @Expose() url!: string
}
