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
                                        <div className=" w-0.5 h-2 bg-cyan-500"></div>
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