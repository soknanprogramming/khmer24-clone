import passport from "passport";
import { Strategy } from "passport-local";
import { usersTable } from "../db/usersTable";
import { drizzle } from "drizzle-orm/mysql2";
import { eq, or } from "drizzle-orm";
import "dotenv/config";
import bcrypt from "bcrypt";


const db = drizzle(process.env.DATABASE_URL!);

// passport.serializeUser and passport.deserializeUser are correct

passport.serializeUser((user: any , done) => {
  done(null, user.ID);
})

passport.deserializeUser(async (id: number, done) => {
  try{
    const findUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.ID, id))
    done(null, findUser[0])
  } catch (err) {
    done(err, null)
  }
})


export default passport.use(
  new Strategy({
    usernameField: "phoneNumber",
    passwordField: "password",
  },
    async (phoneNumber, password, done) => {
    try {
      const findUser = await db
        .select()
        .from(usersTable)
        .where(or(eq(usersTable.PhoneNumber, phoneNumber),
                  eq(usersTable.PhoneNumber2, phoneNumber),
                  eq(usersTable.PhoneNumber3, phoneNumber),
                  ))

      // ✅ Correctly check if the user array is empty
      if (findUser.length === 0) {
        // Use the 'done' callback to signal failure without crashing
        return done(null, false, { message: "User not found" });
      }

      const user = findUser[0];

      // ✅ Check the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) {
        // Use the 'done' callback for incorrect password
        return done(null, false, { message: "Password is incorrect" });
      }

      // ✅ If successful, pass the user object
      return done(null, user);

    } catch (err) {
      // For actual database or server errors
      return done(err);
    }
  })
);