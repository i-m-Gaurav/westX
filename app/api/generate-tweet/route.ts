// app/api/generate-tweet/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create prompt
    const systemPrompt = "You are a social media expert who writes engaging and informative tweets. Keep the tweets concise, under 280 characters, and include relevant emojis when appropriate.";
    const userPrompt = prompt || "Write an engaging tweet about technology and innovation";
    const fullPrompt = `${systemPrompt}\n\nUser request: ${userPrompt}`;

    // Generate tweet
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedTweet = response.text().trim();

    // Ensure the tweet is not too long
    const finalTweet = generatedTweet.length > 280 
      ? generatedTweet.substring(0, 277) + "..."
      : generatedTweet;

    return NextResponse.json({ tweet: finalTweet });
  } catch (error) {
    console.error('Error generating tweet:', error);
    return NextResponse.json(
      { message: 'Failed to generate tweet' },
      { status: 500 }
    );
  }
}