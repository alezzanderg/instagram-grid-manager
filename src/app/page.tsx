"use client"

import { useState, useEffect } from 'react';
import { InstagramProfileInfo } from "@/components/InstagramComponents/instagram-profile-info"
import { InstagramHighlights } from "@/components/InstagramComponents/instagram-highlights"
import { InstagramGrid } from "@/components/InstagramComponents/instagram-grid"
import { InstagramHeader } from "@/components/InstagramComponents/instagram-header"



export default function InstagramProfile() {
  const [isClient, setIsClient] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "casarafuel",
    name: "Casa Rafuel",
    avatar: "/placeholder.svg",
    description: [
      "🍽️ La casa de comidas de @rafuel55",
      "🍊 Horario semanal: en stories/destacados",
      "SIN RESERVAS",
      "📍 C/ Còrsega 298, Bcn"
    ],
    website: "pistopisco.com/Casa-Rafuel.html",
    stats: {
      posts: 47,
      followers: "22 mil",
      following: 4
    },
    highlights: [
      { id: "1", name: "Info", image: "/placeholder.svg" },
      { id: "2", name: "Carta", image: "/placeholder.svg" },
    ],
    posts: Array(6).fill(null).map((_, index) => ({
      id: `post-${index + 1}`,
      image: "/placeholder.svg"
    }))
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const updateProfileData = (newData: Partial<typeof profileData>) => {
    setProfileData(prevData => ({ ...prevData, ...newData }))
  }

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen flex flex-col text-white">
      <InstagramHeader username={profileData.username} updateProfileData={updateProfileData} />
      <InstagramProfileInfo profileData={profileData} updateProfileData={updateProfileData} />
      <InstagramHighlights highlights={profileData.highlights} updateProfileData={updateProfileData} />
      <InstagramGrid initialPosts={profileData.posts} />
    </div>
  )
}

