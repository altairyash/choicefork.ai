import axios from 'axios';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI();


async function handler(req: Request) {
    const prompt = (await req.json()).prompt
    //console.log(body.prompt)
    const completion = await openai.chat.completions.create({
        messages: [
            { "role": "system", "content": "You are a decision maker who given choices count and choice separated by ::: respond back by choosing one choice and reason for it in the format {index:<>,reason:<>} as valid json string where index starts from 1" },
            { "role": "user", "content": "choices - i shall stay at home ::: i shall go outside", },
            { "role": "assistant", "content": '{\"index\":2, \"reason\":\"Because going outside allows you for fresh air and open spaces, which can be good for your physical and mental well-being.\"}' },
            { "role": "user", "content": prompt, },
        ],
        model: "gpt-3.5-turbo",
    });
    return NextResponse.json({ completion })
}
export { handler as GET, handler as POST }