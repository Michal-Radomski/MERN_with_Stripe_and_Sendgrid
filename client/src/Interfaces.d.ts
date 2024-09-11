// Types and Interfaces

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type Fetch = typeof store.fetch; //* V1
export type Fetch = () => RootState; //* V2
export type Action = typeof store.action;

export interface ListItem {
  _id: string;
  idempotencyKey: string;
  amount: number | string;
  createdAt: Date;
  greetings: string;
}
