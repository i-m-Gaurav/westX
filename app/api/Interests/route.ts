// app/api/interests/route.ts
import { NextResponse } from 'next/server';
import Interest from '../../../models/Interest';
import { connectToDB } from '../../../lib/database';
// import { getServerSession } from 'next-auth';



export async function POST(req: Request) {

    
    try {
        await connectToDB();

        const { interest, userId } = await req.json();

        // Validate input
        if (!interest || typeof interest !== 'string' || !userId || typeof userId !== 'string') {
            return NextResponse.json(
                { message: 'Invalid interest or userId' },
                { status: 400 }
            );
        }

        // Check if the interest already exists for the user
        let userInterests = await Interest.findOne({ userId });

        if (userInterests) {
            // Add new interest if it doesn't already exist
            if (!userInterests.interests.includes(interest)) {
                userInterests.interests.push(interest);
                await userInterests.save();
            }
        } else {
            // Create new document for user
            userInterests = new Interest({
                userId,
                interests: [interest]
            });
            await userInterests.save();
        }

        return NextResponse.json(
            { message: 'Interest saved successfully', interests: userInterests.interests },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error saving interest:', error);
        return NextResponse.json(
            { message: 'Failed to save interest' },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        await connectToDB();
        
        // Get userId from query parameters
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { message: 'UserId is required' },
                { status: 400 }
            );
        }

        // Find interests for the user
        const userInterests = await Interest.findOne({ userId });

        return NextResponse.json({
            interests: userInterests?.interests || []
        });
    } catch (error) {
        console.error('Error fetching interests:', error);
        return NextResponse.json(
            { message: 'Failed to fetch interests' },
            { status: 500 }
        );
    }
}