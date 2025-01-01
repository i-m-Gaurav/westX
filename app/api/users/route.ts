// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import User from '@/models/User';

interface UserData {
  name: string;
  email: string;
  image?: string;
  createdAt?: Date;
  lastLogin?: Date;
}

export async function POST(request: Request) {
  console.log('🟦 POST /api/users - Starting request processing');
  
  try {
    // Log the raw request
    const rawData = await request.text();
    console.log('📨 Raw request data:', rawData);
    
    // Parse the JSON data
    const userData: UserData = JSON.parse(rawData);
    console.log('📦 Parsed user data:', userData);

    // Validate required fields
    if (!userData.email || !userData.name) {
      console.log('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Connect to database
    console.log('🔌 Connecting to database...');
    try {
      await connectToDB();
      console.log('✅ Database connection successful');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      throw dbError;
    }

    // Check for existing user
    console.log('🔍 Checking for existing user with email:', userData.email);
    const existingUser = await User.findOne({ email: userData.email });
    console.log('📋 Existing user check result:', existingUser);

    let result;
    
    if (existingUser) {
      console.log('📝 Updating existing user...');
      const updateData = {
        lastLogin: new Date(),
        name: userData.name,
        image: userData.image,
      };
      console.log('📤 Update data:', updateData);
      
      result = await User.findOneAndUpdate(
        { email: userData.email },
        updateData,
        { new: true }
      );
      console.log('✅ User updated successfully:', result);

      return NextResponse.json(result, { status: 200 });
    }

    // Create new user
    console.log('📝 Creating new user...');
    const newUserData = {
      ...userData,
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    console.log('📤 New user data:', newUserData);
    
    result = await User.create(newUserData);
    console.log('✅ New user created successfully:', result);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('❌ Error in users API route:', error);
    // Log error details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to process user data' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  console.log('🟦 GET /api/users - Starting request processing');
  
  try {
    console.log('🔌 Connecting to database...');
    await connectToDB();
    console.log('✅ Database connection successful');
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    console.log('🔍 Searching for email:', email);

    if (!email) {
      console.log('❌ No email provided in request');
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    console.log('📋 User search result:', user);
    
    if (!user) {
      console.log('❌ User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('✅ User found and returning');
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('❌ Error in users GET route:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}