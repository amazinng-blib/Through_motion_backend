// export function generateUniqueIds(count = 6, length = 8) {
//   const ids = new Set();
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   while (ids.size < count) {
//     let id = '';
//     for (let i = 0; i < length; i++) {
//       id += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     ids.add(id);
//   }

//   return Array.from(ids);
// }

export function generateUniqueId() {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let uniqueId = '';
  for (let i = 0; i < 6; i++) {
    uniqueId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return uniqueId;
}
