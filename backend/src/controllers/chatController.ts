import { Request, Response } from "express";
import { HandleMessages } from "../services/chatService";

export const chatHandler = async (req: Request, res: Response) => {
    const {message, userId} = req.body;
    
    try {
        const response = await HandleMessages(userId, message);
        res.json({
            response
        });
    } catch (error) {
        console.error("Unable to Generate the Response", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};