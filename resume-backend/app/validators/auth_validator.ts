import vine from '@vinejs/vine'
export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),

    firstName: vine.string().maxLength(40),

    lastName: vine.string().maxLength(40),

    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),

    password: vine.string().minLength(4).maxLength(100).confirmed(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('user').where('email', value).first()
        return user
      }),

    password: vine.string().minLength(4).maxLength(100),
  })
)
