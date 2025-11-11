import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    const mockCreate = jest.fn().mockReturnValue({
      get: mockGet,
    });
    mockedAxios.create = mockCreate;

    await throttledGetDataFromApi('/test');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    const mockCreate = jest.fn().mockReturnValue({
      get: mockGet,
    });
    mockedAxios.create = mockCreate;

    await throttledGetDataFromApi('/posts/1');

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockData = { id: 1, title: 'Test' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    const mockCreate = jest.fn().mockReturnValue({
      get: mockGet,
    });
    mockedAxios.create = mockCreate;

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
