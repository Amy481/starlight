import { ref } from "vue";

export const users = ref([
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://picsum.photos/id/1011/200/200",
    email: "alice.johnson@example.com",
    password: "abc123",
    emailVerified: true,
  },
  {
    id: "2",
    name: "Bob Lee",
    avatar: "https://picsum.photos/id/1012/200/200",
    email: "bob.lee@example.com",
    password: "abc123",
    emailVerified: false,
  },
  ,
  {
    id: "3",
    name: "Carol Smith",
    avatar: "https://picsum.photos/id/1013/200/200",
    email: "carol.smith@example.com",
    password: "abc123",
    emailVerified: true,
  },
]);
