"use client";

import { useEffect, useState } from "react";
import { getCookies } from "@/lib/authClient";
import { Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]);

  const { toast } = useToast();

  const [inputChecklist, setInputChecklist] = useState("");

  const [inputItem, setInputItem] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      const authToken = getCookies();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checklist`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const { data } = await response.json();

      setNotes(data);
    };

    getNotes();
  }, []);

  const addChecklist = async () => {
    const authToken = getCookies();

    if (!inputChecklist) {
      toast({ title: "Input tidak boleh kosong", variant: "destructive" });
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checklist`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputChecklist }),
      },
    );

    const { data } = await response.json();

    setNotes((prev) => [...prev, data]);
  };

  const deleteChecklist = async (id: string) => {
    const authToken = getCookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checklist/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    if (!response.ok) {
      toast({
        title: "Gagal menghapus checklist",
        variant: "destructive",
      });
      return;
    }

    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const addItemToChecklist = async (id: string) => {
    const authToken = getCookies();

    if (!inputItem) {
      toast({ title: "Input tidak boleh kosong", variant: "destructive" });
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checklist/${id}/item`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: inputItem }),
      },
    );

    const { data } = await response.json();

    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, items: [...note.items, data] } : note,
      ),
    );
  };

  const deleteItemOnChecklist = async (id: string, itemId: string) => {
    const authToken = getCookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checklist/${id}/item/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    if (!response.ok) {
      toast({
        title: "Gagal menghapus item",
        variant: "destructive",
      });
      return;
    }

    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              items: note.items.filter((item) => item.id !== itemId),
            }
          : note,
      ),
    );
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center">
        <Input onChange={(e) => setInputChecklist(e.currentTarget.value)} />
        <Button className="flex items-center" onClick={() => addChecklist()}>
          <Plus />
          Tambah checklist
        </Button>
      </div>
      {notes?.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="rounded-md bg-white/10 p-4 shadow-md">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">{note.name}</h2>
              <Trash
                className="size-5"
                onClick={() => deleteChecklist(note.id)}
              />
            </div>
            <div className="space-y-2">
              {note?.items?.length > 0 &&
                note.items.map((item) => (
                  <div key={item.id} className="flex">
                    {item.name}
                    <Trash
                      className="size-4"
                      onClick={() => deleteItemOnChecklist(note.id, item.id)}
                    />
                  </div>
                ))}
            </div>
            <div className="flex items-center">
              <Input onChange={(e) => setInputItem(e.currentTarget.value)} />
              <Button
                className="flex items-center"
                onClick={() => addItemToChecklist(note.id)}
              >
                <Plus />
                Tambah item
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>belum ada data, tambah terlebih dahulu</p>
      )}
    </div>
  );
}
