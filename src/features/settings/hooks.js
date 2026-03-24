import { useGetSettingsQuery, useUpdateSettingsMutation } from './api';

export const useSettings = (options) => useGetSettingsQuery(undefined, options);
export const useUpdateSettings = () => useUpdateSettingsMutation();
