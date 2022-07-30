import { validationResult } from "express-validator";


export const checkFormIsValid = (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    }

    next();
}