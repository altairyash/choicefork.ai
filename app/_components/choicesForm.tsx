'use client'

import { useState } from "react"
import Choices from "./choices"
import axios from "axios"
interface PastChoice {
    index: number,
    choice: string,
    reason: string
}
export default function ChoicesForm() {
    const [loading, setLoading] = useState(false)
    const [choices, setChoices] = useState<string[]>(["", ""]);
    const [pastChoices, setPastChoices] = useState<Array<PastChoice>>([]);

    const handleChoiceChange = (index: number, choice: string) => {
        const updatedChoice = [...choices]
        updatedChoice[index] = choice
        setChoices(updatedChoice)
    }

    const makeDecision = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const prompt = `Choices - ${choices.join(' ::: ')}`
        try {
            const response = await axios.post('/api/getChoice', {
                prompt
            });

            const aiDecision = response.data;
            const firstChoice = aiDecision.completion.choices[0];

            if (firstChoice) {
                try {
                    // Parse the content property of the message into a JavaScript object

                    try {
                        // Remove the leading and trailing curly braces and quotes
                        const dirtyString = firstChoice.message.content;
                        const cleanedString = dirtyString.replace(/^{(.*)}$/, '$1');

                        // Replace escaped double quotes with actual double quotes
                        const validJsonString = cleanedString.replace(/\\"/g, '"');

                        // Parse the string into a JavaScript object
                        const contentObject = JSON.parse(`{${validJsonString}}`);

                        const index = contentObject.index;
                        const reason = contentObject.reason;
                        const newChoice = {
                            index,
                            reason,
                            choice: choices[index - 1]
                        }
                        setPastChoices([...pastChoices, newChoice])
                        setChoices(["", ""])
                        console.log(newChoice)
                        console.log(pastChoices)
                        console.log("Index:", index);
                        console.log("Reason:", reason);
                    } catch (error) {
                        console.error("Error parsing content:", error);
                    }
                } catch (error) {
                    console.error("Error parsing content:", error);
                }
            }
        } catch (error) {
            console.error('Error making API request to Next.js API route:', error);
        }
        setLoading(false)

    }
    return (
        <>
            <div className="block md:max-w-md md:min-w-[500px] w-full mx-4 h-full">
                <div className="flex items-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="neural" className="w-10 mx-4">
                        <path d="M55,39a7,7,0,1,0-6.9-8H37.9a6,6,0,1,0,0,2H48.1a6.7,6.7,0,0,0,1,2.8L35.8,47.4A5.7,5.7,0,0,0,32,46a6.5,6.5,0,0,0-3.6,1.2L18.2,37.4A9.2,9.2,0,0,0,20,32a8.8,8.8,0,0,0-1.7-5.3l9.2-8.3A7.1,7.1,0,0,0,32,20a7,7,0,1,0-7-7,6.7,6.7,0,0,0,1.2,3.9L17,25.3A9.1,9.1,0,0,0,11,23a9,9,0,0,0,0,18,9.2,9.2,0,0,0,5.8-2.1L27,48.6A6.7,6.7,0,0,0,26,52a6,6,0,0,0,12,0,5.6,5.6,0,0,0-.9-3.1L50.4,37.3a7.6,7.6,0,0,0,2.3,1.3L50.9,48A5,5,0,1,0,56,53a4.9,4.9,0,0,0-3.1-4.6L54.7,39ZM32,36a4,4,0,1,1,4-4A4,4,0,0,1,32,36ZM54,53a3,3,0,1,1-3-3A2.9,2.9,0,0,1,54,53ZM32,8a5,5,0,1,1-5,5A5,5,0,0,1,32,8ZM11,39a7,7,0,1,1,7-7A7,7,0,0,1,11,39ZM32,56a4,4,0,1,1,4-4A4,4,0,0,1,32,56ZM50,32a5,5,0,1,1,5,5A5,5,0,0,1,50,32Z" data-name="Neural Network" fill="#ffffff"></path>
                    </svg>
                    <span className="font-bold text-white text-lg">
                        ChoiceFork.ai
                    </span>
                </div>
                <div className="flex flex-col space-y-4 md:max-w-xl items-center w-full justify-center h-full px-4">
                    <form onSubmit={makeDecision} className="flex flex-col w-full items-center justify-center">
                        {choices.length > 0 && choices.map((choice, index) => (
                            <Choices
                                key={index}
                                name={`choice${index}`}
                                placeholder={`Enter choice ${index + 1}`}
                                onChange={(value: string) => handleChoiceChange(index, value)}
                            />
                        ))}
                        <button
                            type="submit"
                            onClick={makeDecision}
                            className="mt-2 w-full py-2 bg-black border-solid border-cyan-700 border bg-opacity-5 backdrop-blur-md backdrop-filter rounded-md text-white"
                        >
                            Submit Choices
                        </button>
                    </form>
                </div>
                {pastChoices && pastChoices.length > 0 && (
                    <div className="mx-4 p-2 mt-4 backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black border border-solid border-cyan-700 rounded-md">
                        <h1 className="my-2 text-white font-bold text-lg">Past Choices</h1>
                        {pastChoices.map((pastChoice, index) => (
                            <>
                                <div className="bg-black bg-opacity-30 p-2 text-white rounded-md border border-solid border-gray-800">
                                    <div className="py-2">
                                        <p className="font-bold">
                                            Choice Selected :
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {pastChoice.choice}
                                        </p>
                                    </div>
                                    <div className="text-white">
                                        <p className="font-bold">
                                            Reason :
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {pastChoice.reason}
                                        </p>
                                    </div>
                                </div>
                                {pastChoices.length > 1 && index !== pastChoices.length - 1 &&
                                    <div className="w-full h-2 flex justify-center">
                                        <div className=" w-[1px] h-2 bg-cyan-500"></div>
                                    </div>
                                }
                            </>
                        ))}
                    </div>
                )}
            </div>
            {loading && <div className="absolute h-full flex w-full bg-black backdrop-filter bg-opacity-20 backdrop-blur-md justify-center items-center text-gray-400">
                loading...
            </div>}
        </>
    )
}