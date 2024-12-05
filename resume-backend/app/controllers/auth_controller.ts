import type { HttpContext } from '@adonisjs/core/http'

import AuthServices from '#services/auth_service'
import { registerValidator } from '#validators/auth_validator'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(registerValidator)
    console.log('validatedDate', validatedData)
    const data = await AuthServices.register(validatedData)
    console.log('AuthServices.register', data)
    return response.status(200).json({ ...data })
  }
}
