import { cache } from 'react';

import { NotionAPI } from 'notion-client';

const { NOTION_ACCESS_TOKEN } = process.env;

const client = new NotionAPI({ authToken: NOTION_ACCESS_TOKEN });

export default client;

export const getPage = cache((id: string) => client.getPage(id));
