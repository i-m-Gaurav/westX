"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Heart, Share2, Sparkles } from "lucide-react";

interface Tweet {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isAIGenerated?: boolean;
}

const sampleTweets: Tweet[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      handle: "@johndoe",
      avatar: "/api/placeholder/400/400", // Using placeholder image
    },
    content: "Just had a great day at the park! 🌳",
    timestamp: "2h",
    likes: 10,
    replies: 2,
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      handle: "@janesmith",
      avatar: "/api/placeholder/400/400", // Using placeholder image
    },
    content: "Excited to start my new project! 🚀",
    timestamp: "5h",
    likes: 15,
    replies: 3,
  },
];

export default function MainFeed() {
  const [tweetContent, setTweetContent] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>(sampleTweets);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndPostAITweet = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "Generate a tweet about technology and innovation",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const generatedTweetContent = data.tweet;

        const newTweet: Tweet = {
          id: Date.now(),
          user: {
            name: "AI Assistant",
            handle: "@ai_assistant",
            avatar: "/api/placeholder/400/400", // Using placeholder image
          },
          content: generatedTweetContent,
          timestamp: "now",
          likes: 0,
          replies: 0,
          isAIGenerated: true,
        };

        setTweets([newTweet, ...tweets]);
        setTweetContent("");
      } else {
        console.error('Failed to generate tweet');
      }
    } catch (error) {
      console.error('Error generating tweet:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePost = async () => {
    if (!tweetContent.trim()) return;

    const newTweet: Tweet = {
      id: Date.now(),
      user: {
        name: "AI Assistant",
        handle: "@ai_assistant",
        avatar: "/api/placeholder/400/400", // Using placeholder image
      },
      content: tweetContent,
      timestamp: "now",
      likes: 0,
      replies: 0,
      isAIGenerated: true,
    };

    setTweets([newTweet, ...tweets]);
    setTweetContent("");
  };

  return (
    <div className="flex-grow max-w-2xl border-r border-border">
      <div className="border-b border-border p-4 sticky top-0 bg-background/95 backdrop-blur">
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0" />
          <div className="flex-grow">
            <Textarea
              placeholder="What's happening?"
              className="border-0 resize-none bg-transparent focus-visible:ring-0"
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2 text-primary">
                <button className="p-2 hover:bg-muted rounded-full">
                  <img src="/path/to/image-icon.png" alt="Image" className="w-5 h-5" />
                </button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={generateAndPostAITweet}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4" />
                  {isGenerating ? "Generating..." : "AI Generate"}
                </Button>
              </div>
              <Button 
                className="rounded-full" 
                onClick={handlePost}
                disabled={!tweetContent.trim()}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id} className="p-4 border-b border-border hover:bg-muted/50">
            <div className="flex gap-4">
              <img
                src={tweet.user.avatar}
                alt={tweet.user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{tweet.user.name}</span>
                  <span className="text-muted-foreground">{tweet.user.handle}</span>
                  <span className="text-muted-foreground">· {tweet.timestamp}</span>
                  {tweet.isAIGenerated && (
                    <Sparkles className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="mt-2">{tweet.content}</p>
                <div className="flex gap-8 mt-4 text-muted-foreground">
                  <button className="flex items-center gap-2 hover:text-primary">
                    <MessageCircle className="w-5 h-5" />
                    <span>{tweet.replies}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                    <span>{tweet.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-primary">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}