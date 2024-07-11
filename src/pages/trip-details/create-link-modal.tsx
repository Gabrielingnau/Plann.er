import { Link2 , Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  openCreateLinkModal: () => void;
}

export function CreateLinkModal({
  openCreateLinkModal
}: CreateLinkModalProps) {
  const { tripId } = useParams()

  const [errorLink, setErrorLink] = useState('')
  const [errorURL, setErrorURL] = useState('')
  const [linkText, setLinkText] = useState('')
  const [urlText, setUrlText] = useState('')

  async function createLink(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const data = new FormData(event.currentTarget)

      const link = data.get('link')?.toString()
      const url = data.get('url')?.toString()

      await api.post(`/trips/${tripId}/links`, {
        title: link,
        url
      })

      window.document.location.reload()
      
    } catch (error: any) {
      if(!linkText) {
        setErrorLink('O nome do link deve ter pelo menos 4 caracteres')
        setErrorURL('')
      }
      if(!urlText) {
        setErrorURL('Cadastre uma URL')
        setErrorLink('')
      }
    }

  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar link</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={openCreateLinkModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
          Todos convidados podem visualizar os links importantes.
          </p>
        </div>
        
        <form onSubmit={createLink} className="space-y-3">
          <div>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Tag className="text-zinc-400 size-5" />
              <input
                name="link"
                onChange={(event) => setLinkText(event.target.value)}
                placeholder="Titulo do link"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            {errorLink && (
              <p className="text-xs text-red-500">{errorLink}</p>
            )}
          </div>

          <div>
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link2 className="text-zinc-400 size-5" />
              <input
                type="url"
                name="url"
                onChange={(event) => setUrlText(event.target.value)}
                placeholder="URL"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            {errorURL && (
              <p className="text-xs text-red-500">{errorURL}</p>
            )}
          </div>

          <Button size="full">
            Salvar Link
          </Button>
        </form>
      </div>
    </div>
  )
}