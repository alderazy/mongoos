import * as z from "zod";

export const UserSchema = z.object({
    name: z.string().min(2,"Name must be at least 2 characters").max(20,"ياخرى كتير قوي ده كله "),
    email: z.string().min(6).max(200).email("invaild email"),
    password:z.string().min(6,"password must have up 6 catarter ").max(50,"وحيات امك اذا مفتكرتش كلمة السر دي لاهفشخك")
})