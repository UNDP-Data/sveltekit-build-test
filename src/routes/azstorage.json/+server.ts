import type { RequestHandler } from './$types'
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  type ContainerItem,
} from '@azure/storage-blob'

const account = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT
const accountKey = import.meta.env.VITE_AZURE_STORAGE_ACCESS_KEY
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey)

export const GET: RequestHandler = async () => {
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential)
  const containers: ContainerItem[] = []

  for await (const container of blobServiceClient.listContainers()) {
    containers.push(container)
  }

  return new Response(JSON.stringify(containers))
}
