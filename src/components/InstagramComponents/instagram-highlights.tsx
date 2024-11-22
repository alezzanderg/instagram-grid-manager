import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, X } from 'lucide-react'

interface Highlight {
  id: string;
  name: string;
  image: string;
}

interface InstagramHighlightsProps {
  highlights: Highlight[];
  updateProfileData: (newData: { highlights: Highlight[] }) => void;
}

export function InstagramHighlights({ highlights, updateProfileData }: InstagramHighlightsProps) {
  const handleHighlightAdd = () => {
    const newHighlight: Highlight = {
      id: Date.now().toString(),
      name: "Nuevo",
      image: "/placeholder.svg"
    }
    updateProfileData({ highlights: [...highlights, newHighlight] })
  }

  const handleHighlightUpdate = (id: string, updates: Partial<Highlight>) => {
    updateProfileData({
      highlights: highlights.map(highlight => 
        highlight.id === id ? { ...highlight, ...updates } : highlight
      )
    })
  }

  const handleHighlightDelete = (id: string) => {
    updateProfileData({
      highlights: highlights.filter(highlight => highlight.id !== id)
    })
  }

  const handleImageChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleHighlightUpdate(id, { image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex space-x-4 p-4 overflow-x-auto">
      {highlights.map((highlight) => (
        <div key={highlight.id} className="flex flex-col items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Avatar className="w-16 h-16 border border-gray-700 cursor-pointer">
                <AvatarImage src={highlight.image} alt={highlight.name} />
                <AvatarFallback>{highlight.name[0]}</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
              <DialogHeader>
                <DialogTitle>Editar Highlight</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`highlight-name-${highlight.id}`} className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id={`highlight-name-${highlight.id}`}
                    value={highlight.name}
                    onChange={(e) => handleHighlightUpdate(highlight.id, { name: e.target.value })}
                    className="col-span-3 bg-white text-black border-zinc-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`highlight-image-${highlight.id}`} className="text-right">
                    Imagen
                  </Label>
                  <Input
                    id={`highlight-image-${highlight.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(highlight.id, e)}
                    className="col-span-3 bg-white text-black border-zinc-700"
                  />
                </div>
              </div>
              <Button variant="destructive" onClick={() => handleHighlightDelete(highlight.id)}>
                Eliminar Highlight
              </Button>
            </DialogContent>
          </Dialog>
          <span className="text-xs mt-1">{highlight.name}</span>
        </div>
      ))}
      <Button variant="ghost" className="w-16 h-16 rounded-full" onClick={handleHighlightAdd}>
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}

