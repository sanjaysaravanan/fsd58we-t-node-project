export const movies = [
  {
    id: "376a24ec-8586-4ebe-9023-ad40727fd2e1",
    title: "Leo",
    duration: "120mins",
    actor: "Vijay",
    director: "Lokesh Kanagaraj",
  },
  {
    id: "0cc65264-22ba-4884-b7d1-a9fdc72e5c36",
    title: "Darbar",
    duration: "122mins",
    actor: "Rajini",
    director: "A.R Murugadoss",
  },
];

export const theaters = [
  {
    id: "6a557b75-1c0d-4cfe-a4c3-ca6b0fc0b829",
    name: "PVR",
    noOfScreens: 4,
    shows: [
      /* {
        movieId: "376a24ec-8586-4ebe-9023-ad40727fd2e1",
        timing: "2:30PM-IST",
      }, */
      {
        movieId: "0cc65264-22ba-4884-b7d1-a9fdc72e5c36",
        timing: "11:30 AM - IST",
      },
    ],
  },
  {
    id: "8d2f0de9-3889-4d7e-9134-7137565fa69c",
    name: "Sathyam",
    noOfScreens: 2,
    shows: [
      {
        movieId: "376a24ec-8586-4ebe-9023-ad40727fd2e1",
        timing: "4:30PM-IST",
      },
      {
        movieId: "0cc65264-22ba-4884-b7d1-a9fdc72e5c36",
        timing: "10:00 AM - IST",
      },
    ],
  },
];
