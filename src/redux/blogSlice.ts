import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  main_image: string;
  sub_images: string[];
  author_name: string;
  date_created: string;
  last_modified: string;
}

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  status: 'idle',
  error: null,
};

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const response = await axios.get<Blog[]>('/api/blogs');
  return response.data;
});

export const fetchBlogById = createAsyncThunk('blog/fetchBlogById', async (id: string) => {
  const response = await axios.get<Blog>(`/api/blogs/${id}`);
  return response.data;
});

export const createBlog = createAsyncThunk('blog/createBlog', async (blogData: Omit<Blog, 'id' | 'date_created' | 'last_modified'>) => {
  const response = await axios.post<Blog>('/api/blogs', blogData);
  return response.data;
});

export const updateBlog = createAsyncThunk('blog/updateBlog', async ({ id, ...blogData }: Partial<Blog> & { id: string }) => {
  const response = await axios.put<Blog>(`/api/blogs/${id}`, blogData);
  return response.data;
});

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id: string) => {
  await axios.delete(`/api/blogs/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.currentBlog = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.currentBlog = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;