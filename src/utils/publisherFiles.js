import api from '@/utils/api';

export const formatSizeInMb = (sizeInBytes) =>
  `${(Number(sizeInBytes || 0) / (1024 * 1024)).toFixed(2)} MB`;

export const fetchFolderOptions = async (parentId = null, trail = []) => {
  const response = await api.get('/publisher/folders', {
    params: { parentId: parentId || '' },
  });

  const folders = Array.isArray(response.data) ? response.data : [];
  const options = [];

  for (const folder of folders) {
    const nextTrail = [...trail, folder.name];
    options.push({
      id: folder.id,
      label: nextTrail.join(' / '),
    });

    const children = await fetchFolderOptions(folder.id, nextTrail);
    options.push(...children);
  }

  return options;
};
