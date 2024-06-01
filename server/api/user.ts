import { ref } from "vue";

export const users = ref([
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://picsum.photos/id/1011/200/200",
    email: "alice.johnson@example.com",
    password: "$2b$10$UILfZ/Lk4x2Pb8pN4niRWuqyEz.FyJd/lLHkw9Mjjsf3.4WaRqfe.", //AliceJohnson123
    emailVerified: true,
  },
  {
    id: "2",
    name: "Bob Lee",
    avatar: "https://picsum.photos/id/1012/200/200",
    email: "bob.lee@example.com",
    password: "$2b$10$6KLtFaQ.7UuJOK4q3vw4NOS5DxcoEomlgV5/lPBebtVFL/ljmIH16", // BobLee123
    emailVerified: false,
  },
  ,
  {
    id: "3",
    name: "Carol Smith",
    avatar: "https://picsum.photos/id/1013/200/200",
    email: "carol.smith@example.com",
    password: "$2b$10$P8Mp0Cw7dt993goIFGvYBO7ZBiMCZOjZxNgCXCQtD5c8eS1/CAyVu", //CarolSmith123
    emailVerified: true,
  },
]);
