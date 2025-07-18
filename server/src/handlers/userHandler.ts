import { Request, Response } from "express"
import { UserLogin } from "../types/userTypes"
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { and, or, eq } from "drizzle-orm";
import { usersTable } from "../db/usersTable";

const db = drizzle(process.env.DATABASE_URL!);

type userRegisterRes = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    username : string,
    } | {
    isNameExist: boolean,
    isPhoneNumberExist: boolean
}

export const userRegister = async (
        req: Request<{}, {}, UserLogin>, 
        res: Response<userRegisterRes>
    ) => {
    try {
        // Check if user with same name or phone number already exists
    const existingUser = await db.select().from(usersTable).where(
        or(
            and(
                eq(usersTable.FirstName, req.body.firstName),
                eq(usersTable.LastName, req.body.lastName)
            ),
            or(
                eq(usersTable.PhoneNumber, req.body.phoneNumber),
                eq(usersTable.PhoneNumber2, req.body.phoneNumber),
                eq(usersTable.PhoneNumber3, req.body.phoneNumber)
            )
        )
    );

    if (existingUser.length > 0) {
        return res.status(400).json({
            isNameExist: existingUser.some(user => 
                user.FirstName.toLowerCase() === req.body.firstName.toLowerCase() && 
                user.LastName.toLowerCase() === req.body.lastName.toLowerCase()
            ),
            isPhoneNumberExist: existingUser.some(user => 
                user.PhoneNumber === req.body.phoneNumber
            )
        });
    }

    // If no existing user found, proceed with insertion
    await db.insert(usersTable).values({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        PhoneNumber: req.body.phoneNumber,
        Password: req.body.password,
        UserName: req.body.firstName + req.body.lastName,
    });

    return res.status(200).json({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        username : req.body.firstName + req.body.lastName,
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            isNameExist: false,
            isPhoneNumberExist: false
        });
    }
}