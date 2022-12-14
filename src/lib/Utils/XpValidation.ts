import { ValidationData } from "../Interfaces/index.js";

/**
 * Check if the amount provided is valid
 * @param amount - The amount
 */
export function validateAmount(amount: number): ValidationData {
    if (!amount) return ({ invalid: true, error: "An amount was not provided" });
    if (typeof amount !== "number") return ({ invalid: true, error: "The amount is not a number" });
    if (amount < 1) return ({ invalid: true, error: "Amount must be greater than 1" });

    return ({ invalid: false });
}