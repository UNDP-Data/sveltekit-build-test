import type { RequestHandler } from './$types';
import {
	BlobServiceClient,
	StorageSharedKeyCredential,
	type ContainerItem
} from '@azure/storage-blob';
import { AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY } from '$env/static/private';

const sharedKeyCredential = new StorageSharedKeyCredential(
	AZURE_STORAGE_ACCOUNT,
	AZURE_STORAGE_ACCESS_KEY
);

export const GET: RequestHandler = async () => {
	const blobServiceClient = new BlobServiceClient(
		`https://${AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
		sharedKeyCredential
	);
	const containers: ContainerItem[] = [];

	for await (const container of blobServiceClient.listContainers()) {
		containers.push(container);
	}

	return new Response(JSON.stringify(containers));
};
