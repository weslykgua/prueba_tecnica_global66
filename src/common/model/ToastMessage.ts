export default interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}