import app from "./app";

const main = () => {
  app.listen(3000, (error) => {
    if (error) console.log(error);
    else console.log("Server running on port 3000");
  });
};

main();
