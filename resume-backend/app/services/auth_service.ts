import User from '#models/user'
import env from '#start/env'
import { RegisterPayload } from './interfaces/auth_interface.js'

export default class AuthServices {
  public static async register(data: RegisterPayload) {
    try {
      const user = await User.create(data)
      return user
    } catch (error) {
      throw error
    }
  }
  public static async login(data: any) {
    const user = await User.verifyCredentials(data.email, data.password)
    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: env.get('JWT_EXPIRY', '1h'),
    })
    return { user, token }
  }
}
