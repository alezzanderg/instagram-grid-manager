import { ArrowLeft, Share } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InstagramHeaderProps {
  username: string;
  updateProfileData: (newData: { username: string }) => void;
}

export function InstagramHeader({ username, updateProfileData }: InstagramHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" className="text-white">
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <h1 className="text-xl font-normal cursor-pointer">{username}</h1>
        </DialogTrigger>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>Editar nombre de usuario</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Usuario
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => updateProfileData({ username: e.target.value })}
                className="col-span-3 bg-white text-black border-zinc-700"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Button variant="ghost" size="icon" className="text-white">
        <Share className="h-6 w-6" />
      </Button>
    </header>
  )
}

