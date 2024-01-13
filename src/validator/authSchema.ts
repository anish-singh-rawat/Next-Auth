import vine from "@vinejs/vine";

export const registerSchema = vine.object({
    name : vine.string().trim().minLength(3).maxLength(20),
    email : vine.string().email(),
    password : vine.string().trim().minLength(6).maxLength(15).confirmed(),
})


export const loginSchema = vine.object({
    email : vine.string().email(),
    password : vine.string().trim().minLength(6).maxLength(15),
})