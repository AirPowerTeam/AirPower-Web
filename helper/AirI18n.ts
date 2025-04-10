import type { ClassConstructor } from '../type/AirType'
import { AirApi } from '../config/AirApi'
import { AirLanguage } from '../enum/AirLanguage'
import { AirI18nDefault } from '../model/AirI18nDefault'

/**
 * # 语言国际化
 *
 * - #### 声明语言包实现类
 *
 * 实现一个继承 `AirI18n` 的类，加入属性作为语言包的 `Key`, 且可作为默认语言：
 *
 * ```ts
 * export class Strings extends AirI18n {
 *   Hello_World = '你好，世界！'
 * }
 * ```
 * - #### 声明一种新的语言包
 *
 * ```ts
 * const English: Strings = {
 *   language: AirLanguage.English,
 *   Hello_World = 'Hello World!'
 * }
 * ```
 *
 * - #### 添加语言包
 *
 * ```ts
 * Strings.addLanguage(English)
 * ```
 *
 * - #### 设置当前语言
 *
 * ```ts
 * AirI18n.setCurrentLanguage(AirLanguage.ChineseSimplified)
 * ```
 *
 * - #### 使用多语言
 *
 * ```ts
 * console.log(Strings.get().Hello_World)
 * ```
 *
 * @author Hamm.cn
 */
export class AirI18n extends AirI18nDefault {
  /**
   * ### 当前使用的语言
   */
  private static currentLanguage = (AirApi.getStorage(AirI18nDefault.languageCacheKey)
    || AirLanguage.ChineseSimplified) as AirLanguage

  /**
   * ### 当前使用的语言包
   */
  private static currentLanguagePackage?: AirI18n

  /**
   * ### 语言列表
   */
  private static languages: AirI18n[] = []

  /**
   * ### 获取当前使用的语言
   * @returns 当前使用的语言
   */
  static getCurrentLanguage(): AirLanguage {
    return this.currentLanguage
  }

  /**
   * ### 获取支持的语言列表
   * @returns 语言列表
   */
  static getLanguages() {
    return this.languages
  }

  /**
   * ### 获取翻译后的字符串
   * @returns 翻译后的字符串
   */
  static get<T extends AirI18n>(
    this: ClassConstructor<T>,
  ): T {
    return (AirI18n.currentLanguagePackage || new AirI18n()) as T
  }

  /**
   * ### 添加国际化语言
   * @param languages 语言包列表
   */
  static addLanguage<T extends AirI18n>(this: ClassConstructor<T>, ...languages: T[]): void {
    if (languages.length === 0) {
      throw new Error('languages is empty')
    }
    // 添加语言
    languages.push(JSON.parse(JSON.stringify(new this())))
    languages.forEach((item) => {
      AirI18n.languages.push(item)
    })
    // 初始化语言包
    AirI18n.currentLanguagePackage = AirI18n.languages.find(item => item.language === AirI18n.currentLanguage) || AirI18n.languages[0]
  }

  /**
   * ### 设置当前使用的语言
   * @param language 语言
   */
  static setCurrentLanguage(language: AirLanguage): void {
    this.currentLanguage = language
    this.currentLanguagePackage = this.languages.find(item => item.language === this.currentLanguage) || this.languages[0]
    AirApi.setStorage(AirI18nDefault.languageCacheKey, language)
  }
}
