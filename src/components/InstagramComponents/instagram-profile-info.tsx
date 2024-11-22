import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus2 } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface InstagramProfileInfoProps {
  profileData: {
    username: string;
    name: string;
    avatar: string;
    description: string[];
    website: string;
    stats: {
      posts: number;
      followers: string;
      following: number;
    };
  };
  updateProfileData: (newData: Partial<InstagramProfileInfoProps['profileData']>) => void;
}

export function InstagramProfileInfo({ profileData, updateProfileData }: InstagramProfileInfoProps) {
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateProfileData({ avatar: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="px-4 space-y-4">
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="w-20 h-20 border-none cursor-pointer">
              <AvatarImage src={profileData.avatar} alt={profileData.username} className="object-cover" />
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Cambiar avatar</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="bg-white text-black border-zinc-700"
              />
            </div>
          </DialogContent>
        </Dialog>
        <div className="ml-8 flex-grow">
          
          <div className="flex space-x-8">
            <Dialog>
              <DialogTrigger asChild>
                <div className="text-center cursor-pointer">
                  <span className="font-semibold">{profileData.stats.posts}</span>
                  <p className="text-sm">publicaciones</p>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Editar publicaciones</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="posts" className="text-right">
                      Publicaciones
                    </Label>
                    <Input
                      id="posts"
                      type="number"
                      value={profileData.stats.posts}
                      onChange={(e) => updateProfileData({ stats: { ...profileData.stats, posts: parseInt(e.target.value) } })}
                      className="col-span-3 bg-white text-black border-zinc-700"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className="text-center cursor-pointer">
                  <span className="font-semibold">{profileData.stats.followers}</span>
                  <p className="text-sm">seguidores</p>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Editar seguidores</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="followers" className="text-right">
                      Seguidores
                    </Label>
                    <Input
                      id="followers"
                      value={profileData.stats.followers}
                      onChange={(e) => updateProfileData({ stats: { ...profileData.stats, followers: e.target.value } })}
                      className="col-span-3 bg-white text-black border-zinc-700"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className="text-center cursor-pointer">
                  <span className="font-semibold">{profileData.stats.following}</span>
                  <p className="text-sm">seguidos</p>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Editar seguidos</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="following" className="text-right">
                      Seguidos
                    </Label>
                    <Input
                      id="following"
                      type="number"
                      value={profileData.stats.following}
                      onChange={(e) => updateProfileData({ stats: { ...profileData.stats, following: parseInt(e.target.value) } })}
                      className="col-span-3 bg-white text-black border-zinc-700"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <Dialog>
          <DialogTrigger asChild>
            <h2 className="text-sm font-semibold cursor-pointer">{profileData.name}</h2>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Editar nombre</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => updateProfileData({ name: e.target.value })}
                className="bg-white text-black border-zinc-700"
              />
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              {profileData.description.map((line, index) => (
                <p key={index} className="text-sm">{line}</p>
              ))}
            </div>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Editar descripción</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Textarea
                value={profileData.description.join('\n')}
                onChange={(e) => updateProfileData({ description: e.target.value.split('\n') })}
                className="bg-white text-black border-zinc-700"
                rows={4}
              />
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Link href={`https://${profileData.website}`} className="text-sm text-blue-500 cursor-pointer">
              {profileData.website}
            </Link>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Editar sitio web</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                value={profileData.website}
                onChange={(e) => updateProfileData({ website: e.target.value })}
                className="bg-white text-black border-zinc-700"
              />
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex items-center space-x-2">
          <Button className="flex-1 bg-[#0095f6] hover:bg-zinc-700 text-white font-semibold rounded-lg">
            Seguir
          </Button>
          <Button  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg">
            Mensaje
          </Button>
          <Button  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg">
            Contacto
          </Button>
          <Button size="icon" className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg">
            <UserPlus2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

