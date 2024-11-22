"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Grid, Tv, UserSquare2, Plus, Move, Trash2, Edit2 } from 'lucide-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Post {
  id: string
  image: string
}

export interface InstagramGridProps {
  initialPosts: Post[];
}

export function InstagramGrid({ initialPosts }: InstagramGridProps) {
  const [isClient, setIsClient] = useState(false)
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [activeTab, setActiveTab] = useState("posts")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setPosts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = e.target?.result as string
        if (editingPostId) {
          setPosts((prevPosts) => prevPosts.map(post => 
            post.id === editingPostId ? { ...post, image: newImage } : post
          ))
        } else {
          const newPost: Post = { id: Date.now().toString(), image: newImage }
          setPosts((prevPosts) => [...prevPosts, newPost])
        }
        setIsDialogOpen(false)
        setEditingPostId(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePostDelete = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter(post => post.id !== id))
    setIsDialogOpen(false)
    setEditingPostId(null)
  }

  const openEditDialog = (postId: string) => {
    setEditingPostId(postId)
    setIsDialogOpen(true)
  }

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-black text-white shadow-lg rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-around bg-black p-1">
          <TabsTrigger value="posts" className="flex items-center space-x-2 data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all duration-200">
            <Grid className="w-5 h-5" />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          <TabsTrigger value="reels" className="flex items-center space-x-2 data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all duration-200">
            <Tv className="w-5 h-5" />
            <span className="hidden sm:inline">Reels</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center space-x-2 data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all duration-200">
            <UserSquare2 className="w-5 h-5" />
            <span className="hidden sm:inline">Tagged</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-4 px-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={posts} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {posts.map((post) => (
                  <SortablePost key={post.id} post={post} onEdit={openEditDialog} />
                ))}
                <button
                  onClick={() => { setEditingPostId(null); setIsDialogOpen(true) }}
                  className="aspect-square bg-gray-500 rounded-md flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <Plus className="w-8 h-8 text-gray-400" />
                </button>
              </div>
            </SortableContext>
          </DndContext>
        </TabsContent>
        <TabsContent value="reels" className="mt-4 px-4">
          <div className="text-center text-gray-400 py-8">No hay reels disponibles</div>
        </TabsContent>
        <TabsContent value="tagged" className="mt-4 px-4">
          <div className="text-center text-gray-400 py-8">No hay fotos etiquetadas</div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>{editingPostId ? 'Editar Post' : 'Añadir nuevo post'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-image" className="text-right">Imagen</Label>
              <Input
                id="post-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="col-span-3 bg-gray-500 text-white border-gray-700"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {editingPostId && (
              <Button variant="destructive" onClick={() => handlePostDelete(editingPostId)}>
                Eliminar Post
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button type="submit" onClick={() => setIsDialogOpen(false)}>
              {editingPostId ? 'Guardar cambios' : 'Añadir post'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SortablePost({ post, onEdit }: { post: Post; onEdit: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: post.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="aspect-square relative rounded-md overflow-hidden group"
    >
      <div {...attributes} {...listeners} className="absolute inset-0 z-10 cursor-move">
        <Image
          src={post.image}
          alt={`Post ${post.id}`}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center">
          <Move className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
      <button 
        className="absolute top-2 right-2 bg-white text-green rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
        onClick={(e) => {
          e.stopPropagation()
          onEdit(post.id)
        }}
      >
        <Edit2 className="w-5 h-5  bg-white text-black" />
      </button>
    </div>
  )
}

